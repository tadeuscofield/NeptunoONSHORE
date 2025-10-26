import { Project, Document } from '../models/index.js';
import { logger } from '../config/logger.js';
import { generatePDIContent } from '../services/mlService.js';
import { generatePDFFromTemplate } from '../services/pdfService.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Generate PDI for project
// @route   POST /api/pdi/generate/:projectId
// @access  Private
export const generatePDI = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      where: { id: projectId, userId: req.user.id },
      include: [
        {
          model: Document,
          as: 'documents'
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    // Check if project is complete enough
    if (project.completionPercentage < 70) {
      return res.status(400).json({
        success: false,
        message: 'Projeto precisa estar pelo menos 70% completo para gerar PDI',
        completionPercentage: project.completionPercentage
      });
    }

    logger.info(`Generating PDI for project: ${projectId}`);

    // Generate PDI content using ML
    let pdiContent;
    try {
      pdiContent = await generatePDIContent(project.toJSON());
    } catch (mlError) {
      logger.warn('ML generation failed, using template fallback');
      // Fallback to template-based generation
      pdiContent = generateTemplateBasedPDI(project);
    }

    // Generate PDF
    const pdfPath = await generatePDFFromTemplate(pdiContent, project);

    // Update project
    await project.update({
      pdiGenerated: true,
      pdiPath: pdfPath,
      status: 'completed'
    });

    logger.info(`PDI generated successfully for project: ${projectId}`);

    res.json({
      success: true,
      message: 'PDI gerado com sucesso',
      data: {
        pdiPath: `/uploads/pdis/${path.basename(pdfPath)}`,
        project
      }
    });
  } catch (error) {
    logger.error('PDI generation error:', error);
    next(error);
  }
};

// @desc    Download generated PDI
// @route   GET /api/pdi/download/:projectId
// @access  Private
export const downloadPDI = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      where: { id: projectId, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    if (!project.pdiGenerated || !project.pdiPath) {
      return res.status(404).json({
        success: false,
        message: 'PDI ainda não foi gerado para este projeto'
      });
    }

    res.download(project.pdiPath, `PDI_${project.name}_${Date.now()}.pdf`);
  } catch (error) {
    next(error);
  }
};

// @desc    Get list of generated PDIs
// @route   GET /api/pdi/list/:projectId
// @access  Private
export const getGeneratedPDIs = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      where: { id: projectId, userId: req.user.id },
      attributes: ['id', 'name', 'pdiGenerated', 'pdiPath', 'updatedAt']
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        projectId: project.id,
        projectName: project.name,
        hasPDI: project.pdiGenerated,
        pdiPath: project.pdiPath,
        lastUpdated: project.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper: Template-based PDI generation (fallback)
function generateTemplateBasedPDI(project) {
  const assetTypeNames = {
    well: 'Poço Terrestre',
    station: 'Estação de Produção',
    pipeline: 'Duto Terrestre',
    tank: 'Tanque de Armazenamento'
  };

  return {
    title: `Plano de Desativação de Instalações (PDI)`,
    subtitle: `${assetTypeNames[project.assetType]} - ${project.name}`,
    sections: [
      {
        title: '1. Identificação do Empreendimento',
        content: {
          nome: project.name,
          campo: project.fieldName || 'N/A',
          bacia: project.basin || 'N/A',
          operadora: project.operator || 'N/A',
          tipo: assetTypeNames[project.assetType],
          localizacao: project.location || {}
        }
      },
      {
        title: '2. Justificativa para Desativação',
        content: project.methodology?.justification || 'Instalação inativa conforme regulação ANP.'
      },
      {
        title: '3. Descrição das Instalações',
        content: project.technicalData || {}
      },
      {
        title: '4. Diagnóstico Ambiental',
        content: project.environmentalData || {}
      },
      {
        title: '5. Metodologia de Descomissionamento',
        content: project.methodology || {}
      },
      {
        title: '6. Cronograma de Execução',
        content: {
          duracao: `${project.estimatedDuration || 12} meses`,
          inicio: project.startDate || 'A definir',
          fim: project.endDate || 'A definir'
        }
      },
      {
        title: '7. Estimativa de Custos',
        content: {
          total: `R$ ${(project.estimatedCost || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
      },
      {
        title: '8. Gestão de Resíduos',
        content: 'Conforme normas ABNT e regulação ambiental vigente.'
      },
      {
        title: '9. Plano de Recuperação de Área Degradada (PRAD)',
        content: project.environmentalData?.prad || 'A ser detalhado conforme licenciamento ambiental.'
      },
      {
        title: '10. Responsabilidades',
        content: {
          operadora: project.operator || 'N/A',
          responsavel_tecnico: 'A definir'
        }
      }
    ],
    metadata: {
      geradoEm: new Date().toLocaleString('pt-BR'),
      versao: '3.0',
      plataforma: 'NEPTUNO ONSHORE'
    }
  };
}
