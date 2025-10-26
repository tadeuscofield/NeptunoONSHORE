import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure PDI directory exists
const pdiDir = path.join(__dirname, '../../uploads/pdis');
if (!fs.existsSync(pdiDir)) {
  fs.mkdirSync(pdiDir, { recursive: true });
}

/**
 * Generate PDF from PDI content
 * @param {Object} pdiContent - PDI content
 * @param {Object} project - Project data
 * @returns {Promise<string>} Path to generated PDF
 */
export const generatePDFFromTemplate = async (pdiContent, project) => {
  return new Promise((resolve, reject) => {
    try {
      const timestamp = Date.now();
      const filename = `PDI_${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.pdf`;
      const filepath = path.join(pdiDir, filename);

      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header
      doc.fontSize(20).font('Helvetica-Bold').text('PLANO DE DESATIVAÇÃO DE INSTALAÇÕES', {
        align: 'center'
      });

      doc.moveDown(0.5);
      doc.fontSize(16).font('Helvetica').text(pdiContent.subtitle || project.name, {
        align: 'center'
      });

      doc.moveDown(2);

      // Sections
      if (pdiContent.sections && Array.isArray(pdiContent.sections)) {
        pdiContent.sections.forEach((section, index) => {
          // Section title
          doc.fontSize(14).font('Helvetica-Bold').text(section.title);
          doc.moveDown(0.5);

          // Section content
          doc.fontSize(11).font('Helvetica');

          if (typeof section.content === 'string') {
            doc.text(section.content, { align: 'justify' });
          } else if (typeof section.content === 'object') {
            Object.entries(section.content).forEach(([key, value]) => {
              doc.text(`${formatKey(key)}: ${formatValue(value)}`);
            });
          }

          doc.moveDown(1.5);

          // Page break every 3 sections
          if ((index + 1) % 3 === 0 && index < pdiContent.sections.length - 1) {
            doc.addPage();
          }
        });
      }

      // Footer
      doc.addPage();
      doc.fontSize(10).font('Helvetica-Oblique');
      doc.text('_'.repeat(80), { align: 'center' });
      doc.moveDown(0.5);

      if (pdiContent.metadata) {
        doc.text(`Gerado em: ${pdiContent.metadata.geradoEm}`, { align: 'center' });
        doc.text(`Plataforma: ${pdiContent.metadata.plataforma}`, { align: 'center' });
        doc.text(`Versão: ${pdiContent.metadata.versao}`, { align: 'center' });
      }

      doc.moveDown(2);
      doc.fontSize(8).text('Este documento foi gerado automaticamente pela plataforma NEPTUNO ONSHORE.', {
        align: 'center'
      });

      doc.end();

      stream.on('finish', () => {
        logger.info(`PDF generated successfully: ${filename}`);
        resolve(filepath);
      });

      stream.on('error', (error) => {
        logger.error('PDF generation error:', error);
        reject(error);
      });

    } catch (error) {
      logger.error('PDF generation failed:', error);
      reject(error);
    }
  });
};

// Helper functions
function formatKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

function formatValue(value) {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

export default { generatePDFFromTemplate };
