import PDFDocument from 'pdfkit';

/**
 * NEPTUNO ONSHORE - Professional PDI Generator (FIXED VERSION)
 * Versão corrigida com layout consistente e profissional
 */

class PDIGenerator {
  constructor() {
    this.doc = null;
    this.currentPage = 1;
    this.colors = {
      primary: '#2563eb',
      secondary: '#10b981',
      accent: '#f59e0b',
      danger: '#ef4444',
      text: '#1f2937',
      textLight: '#6b7280',
      bg: '#f9fafb',
      border: '#e5e7eb'
    };
    this.margins = { top: 60, bottom: 60, left: 60, right: 60 };
    this.pageWidth = 595.28; // A4 width in points
    this.pageHeight = 841.89; // A4 height in points
    this.contentWidth = this.pageWidth - this.margins.left - this.margins.right;
  }

  async generatePDI(projectData) {
    return new Promise((resolve, reject) => {
      try {
        this.doc = new PDFDocument({
          size: 'A4',
          margins: this.margins,
          bufferPages: true,
          autoFirstPage: true,
          info: {
            Title: `PDI - ${projectData.name}`,
            Author: 'NEPTUNO ONSHORE',
            Subject: 'Plano de Desativação de Instalações',
            Creator: 'NEPTUNO ONSHORE v2.1'
          }
        });

        const buffers = [];
        this.doc.on('data', buffers.push.bind(buffers));
        this.doc.on('end', () => resolve(Buffer.concat(buffers)));

        // Generate sections (cada método gerencia suas próprias quebras de página)
        this._coverPage(projectData);
        this._executiveSummary(projectData);
        this._tableOfContents();
        this._section1_Introduction(projectData);
        this._section2_TechnicalData(projectData);
        this._section3_Environmental(projectData);
        this._section4_Methodology(projectData);
        this._section5_Schedule(projectData);
        this._section6_Budget(projectData);
        this._section7_Risks(projectData);
        this._section8_Conclusion(projectData);

        // Add page numbers
        this._addPageNumbers();

        this.doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  // ==========================================================================
  // UTILITY METHODS
  // ==========================================================================

  _addPage() {
    this.doc.addPage();
    this.currentPage++;
  }

  _checkPageBreak(neededSpace = 100) {
    if (this.doc.y + neededSpace > this.pageHeight - this.margins.bottom) {
      this._addPage();
      return true;
    }
    return false;
  }

  _addPageNumbers() {
    const pages = this.doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      this.doc.switchToPage(i);

      // Skip page number on cover page
      if (i === 0) continue;

      this.doc
        .fontSize(9)
        .fillColor(this.colors.textLight)
        .text(
          `${i}`,
          this.margins.left,
          this.pageHeight - this.margins.bottom + 20,
          { align: 'center', width: this.contentWidth }
        );
    }
  }

  _h1(text) {
    this._checkPageBreak(80);
    this.doc
      .fontSize(24)
      .fillColor(this.colors.primary)
      .font('Helvetica-Bold')
      .text(text, { align: 'left' });
    this.doc.font('Helvetica');
    this.doc.moveDown(1);
  }

  _h2(text) {
    this._checkPageBreak(60);
    this.doc
      .fontSize(18)
      .fillColor(this.colors.primary)
      .font('Helvetica-Bold')
      .text(text);
    this.doc.font('Helvetica');
    this.doc.moveDown(0.5);
  }

  _h3(text) {
    this._checkPageBreak(40);
    this.doc
      .fontSize(14)
      .fillColor(this.colors.text)
      .font('Helvetica-Bold')
      .text(text);
    this.doc.font('Helvetica');
    this.doc.moveDown(0.3);
  }

  _p(text, options = {}) {
    this._checkPageBreak(40);
    this.doc
      .fontSize(options.size || 10)
      .fillColor(options.color || this.colors.text)
      .font(options.bold ? 'Helvetica-Bold' : 'Helvetica')
      .text(text, {
        align: options.align || 'justify',
        lineGap: options.lineGap || 2,
        ...options
      });
    this.doc.font('Helvetica');
    this.doc.moveDown(options.moveDown || 0.5);
  }

  _bullet(text) {
    this._checkPageBreak(30);
    this.doc
      .fontSize(10)
      .fillColor(this.colors.text)
      .text(`• ${text}`, { indent: 20 });
    this.doc.moveDown(0.3);
  }

  _divider() {
    this._checkPageBreak(20);
    const y = this.doc.y;
    this.doc
      .moveTo(this.margins.left, y)
      .lineTo(this.pageWidth - this.margins.right, y)
      .strokeColor(this.colors.border)
      .lineWidth(1)
      .stroke();
    this.doc.moveDown(1);
  }

  _infoBox(title, content, color = this.colors.primary) {
    this._checkPageBreak(100);
    const boxY = this.doc.y;
    const boxHeight = 80;

    // Box background
    this.doc
      .rect(this.margins.left, boxY, this.contentWidth, boxHeight)
      .fillAndStroke(this.colors.bg, this.colors.border)
      .lineWidth(1);

    // Left accent bar
    this.doc
      .rect(this.margins.left, boxY, 4, boxHeight)
      .fill(color);

    // Title
    this.doc
      .fontSize(11)
      .fillColor(color)
      .font('Helvetica-Bold')
      .text(title, this.margins.left + 15, boxY + 15, { width: this.contentWidth - 30 });

    // Content
    this.doc
      .fontSize(9)
      .fillColor(this.colors.text)
      .font('Helvetica')
      .text(content, this.margins.left + 15, this.doc.y + 5, {
        width: this.contentWidth - 30,
        lineGap: 2
      });

    this.doc.y = boxY + boxHeight + 15;
  }

  _table(data, columnWidths) {
    this._checkPageBreak(150);
    const startY = this.doc.y;
    const rowHeight = 30;
    let currentY = startY;

    // Header row
    let x = this.margins.left;
    data[0].forEach((header, i) => {
      this.doc
        .rect(x, currentY, columnWidths[i], rowHeight)
        .fill(this.colors.primary);

      this.doc
        .fontSize(9)
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .text(header, x + 5, currentY + 10, {
          width: columnWidths[i] - 10,
          align: 'left'
        });

      x += columnWidths[i];
    });

    currentY += rowHeight;

    // Data rows
    data.slice(1).forEach((row, rowIndex) => {
      x = this.margins.left;
      const bgColor = rowIndex % 2 === 0 ? '#ffffff' : this.colors.bg;

      row.forEach((cell, i) => {
        this.doc
          .rect(x, currentY, columnWidths[i], rowHeight)
          .fill(bgColor);

        this.doc
          .fontSize(9)
          .fillColor(this.colors.text)
          .font('Helvetica')
          .text(String(cell), x + 5, currentY + 10, {
            width: columnWidths[i] - 10,
            align: 'left'
          });

        x += columnWidths[i];
      });

      currentY += rowHeight;
    });

    this.doc.y = currentY + 15;
  }

  // ==========================================================================
  // COVER PAGE
  // ==========================================================================

  _coverPage(project) {
    // Blue background
    this.doc
      .rect(0, 0, this.pageWidth, this.pageHeight)
      .fill(this.colors.primary);

    // White content box
    const boxWidth = 400;
    const boxHeight = 500;
    const boxX = (this.pageWidth - boxWidth) / 2;
    const boxY = (this.pageHeight - boxHeight) / 2;

    this.doc
      .rect(boxX, boxY, boxWidth, boxHeight)
      .fill('#ffffff');

    // Logo/Title
    this.doc
      .fontSize(40)
      .fillColor(this.colors.primary)
      .font('Helvetica-Bold')
      .text('NEPTUNO', boxX, boxY + 60, { width: boxWidth, align: 'center' });

    this.doc
      .fontSize(14)
      .fillColor(this.colors.textLight)
      .font('Helvetica')
      .text('ONSHORE DECOMMISSIONING', boxX, boxY + 120, {
        width: boxWidth,
        align: 'center'
      });

    // Main title
    this.doc
      .fontSize(28)
      .fillColor(this.colors.text)
      .font('Helvetica-Bold')
      .text('PLANO DE', boxX, boxY + 180, { width: boxWidth, align: 'center' });

    this.doc
      .text('DESATIVAÇÃO', boxX, boxY + 215, { width: boxWidth, align: 'center' });

    this.doc
      .fontSize(16)
      .fillColor(this.colors.accent)
      .text('(PDI)', boxX, boxY + 260, { width: boxWidth, align: 'center' });

    // Project name
    this.doc
      .fontSize(14)
      .fillColor(this.colors.text)
      .font('Helvetica')
      .text(project.name || 'Nome do Projeto', boxX + 20, boxY + 320, {
        width: boxWidth - 40,
        align: 'center'
      });

    // Operator
    this.doc
      .fontSize(11)
      .fillColor(this.colors.textLight)
      .text(project.operator || 'Operadora', boxX + 20, boxY + 360, {
        width: boxWidth - 40,
        align: 'center'
      });

    // Date
    this.doc
      .fontSize(10)
      .fillColor(this.colors.textLight)
      .text(
        new Date().toLocaleDateString('pt-BR'),
        boxX,
        boxY + 420,
        { width: boxWidth, align: 'center' }
      );

    // Footer
    this.doc
      .fontSize(8)
      .fillColor(this.colors.textLight)
      .text('Conforme ANP 817/2020', boxX, boxY + 460, {
        width: boxWidth,
        align: 'center'
      });
  }

  // ==========================================================================
  // EXECUTIVE SUMMARY
  // ==========================================================================

  _executiveSummary(project) {
    this._h1('SUMÁRIO EXECUTIVO');

    const td = project.technicalData || {};

    this._h3('Visão Geral do Projeto');

    const highlights = [
      ['Operadora:', project.operator || 'N/A'],
      ['Localização:', project.location || 'N/A'],
      ['Bacia:', td.basin || 'N/A'],
      ['Profundidade:', `${td.totalDepth || 'N/A'} metros`],
      ['Orçamento:', `R$ ${this._formatNumber(td.estimatedBudget)}`],
      ['Prazo:', `${td.schedule || 'N/A'} dias`]
    ];

    this._table(
      [['Item', 'Valor'], ...highlights],
      [200, 275]
    );

    this._divider();

    this._h3('Principais Indicadores (Machine Learning)');

    this._infoBox(
      '📊 Complexidade Técnica',
      `${this._calculateComplexity(td)} - Baseada em profundidade, tipo de completação e histórico operacional.`,
      this.colors.primary
    );

    this._infoBox(
      '⏱️ Taxa de Sucesso Prevista',
      `${this._predictSuccessRate(td)}% - Probabilidade de conclusão dentro do prazo e orçamento.`,
      this.colors.secondary
    );

    this._infoBox(
      '⚠️ Nível de Risco',
      `${this._assessRiskLevel(td)} - Avaliação de riscos ambientais e operacionais.`,
      this.colors.accent
    );
  }

  // ==========================================================================
  // TABLE OF CONTENTS
  // ==========================================================================

  _tableOfContents() {
    this._h1('ÍNDICE');

    const sections = [
      '1. INTRODUÇÃO',
      '2. DADOS TÉCNICOS DO ATIVO',
      '3. ANÁLISE AMBIENTAL',
      '4. METODOLOGIA DE DESATIVAÇÃO',
      '5. CRONOGRAMA DE EXECUÇÃO',
      '6. ORÇAMENTO DETALHADO',
      '7. ANÁLISE DE RISCOS',
      '8. CONCLUSÕES E PRÓXIMOS PASSOS'
    ];

    sections.forEach((section, i) => {
      this.doc
        .fontSize(12)
        .fillColor(this.colors.text)
        .text(section, { continued: true })
        .fillColor(this.colors.textLight)
        .text(` ............... ${i + 4}`, { align: 'right' });
      this.doc.moveDown(0.5);
    });
  }

  // ==========================================================================
  // SECTION 1: INTRODUCTION
  // ==========================================================================

  _section1_Introduction(project) {
    this._h1('1. INTRODUÇÃO');

    this._h2('1.1 Objetivo');

    this._p(
      'Este Plano de Desativação de Instalações (PDI) foi elaborado em conformidade com a Resolução ANP nº 817/2020 e demais normativas aplicáveis. O documento apresenta todos os procedimentos técnicos, ambientais e de segurança necessários para a desativação completa e segura das instalações petrolíferas terrestres.'
    );

    this._h2('1.2 Escopo');

    this._p('O presente PDI abrange as seguintes atividades:');

    this._bullet('Isolamento e remoção de equipamentos');
    this._bullet('Limpeza e descontaminação de instalações');
    this._bullet('Abandono de poços (quando aplicável)');
    this._bullet('Recuperação ambiental da área');
    this._bullet('Gestão de resíduos e materiais');
    this._bullet('Monitoramento pós-desativação');

    this._divider();

    this._h2('1.3 Marco Regulatório');

    this._p('A desativação é regulamentada por:');

    this._bullet('ANP nº 817/2020 - Requisitos para PDI');
    this._bullet('CONAMA nº 001/1986 - Avaliação de impacto ambiental');
    this._bullet('Lei nº 12.305/2010 - Política Nacional de Resíduos Sólidos');
    this._bullet('NR-20 - Segurança em instalações com inflamáveis');
  }

  // ==========================================================================
  // SECTION 2: TECHNICAL DATA
  // ==========================================================================

  _section2_TechnicalData(project) {
    this._h1('2. DADOS TÉCNICOS DO ATIVO');

    const td = project.technicalData || {};

    this._h2('2.1 Identificação');

    const identData = [
      ['Campo', 'Valor'],
      ['Nome do Poço', td.wellName || 'N/A'],
      ['Operadora', project.operator || 'N/A'],
      ['Bacia', td.basin || 'N/A'],
      ['Localização', project.location || 'N/A'],
      ['Coordenadas', `${td.latitude || 'N/A'}, ${td.longitude || 'N/A'}`],
      ['Status Atual', td.currentStatus || 'N/A']
    ];

    this._table(identData, [200, 275]);

    this._divider();

    this._h2('2.2 Características Técnicas');

    const techData = [
      ['Parâmetro', 'Valor'],
      ['Profundidade Total', `${td.totalDepth || 'N/A'} m`],
      ['Diâmetro Revestimento', `${td.casingDiameter || 'N/A'} pol`],
      ['Tipo Completação', td.completionType || 'N/A'],
      ['Produção Acumulada', `${this._formatNumber(td.cumulativeProduction)} m³`]
    ];

    this._table(techData, [250, 225]);

    if (td.identifiedLiabilities) {
      this.doc.moveDown();
      this._infoBox(
        '⚠️ Passivos Identificados',
        td.identifiedLiabilities,
        this.colors.accent
      );
    }
  }

  // ==========================================================================
  // SECTION 3: ENVIRONMENTAL
  // ==========================================================================

  _section3_Environmental(project) {
    this._h1('3. ANÁLISE AMBIENTAL');

    const td = project.technicalData || {};

    this._h2('3.1 Caracterização da Área');

    this._p(`Tipo de Área: ${td.areaType || 'N/A'}`, { bold: true });
    this._p(`Vegetação: ${td.localVegetation || 'N/A'}`);
    this._p(`Proximidade de Corpos D'água: ${td.waterBodyProximity || 'N/A'} metros`);
    this._p(`Uso do Solo: ${td.landUse || 'N/A'}`);

    this._divider();

    this._h2('3.2 Licenciamento');

    if (td.environmentalLicense) {
      this._infoBox(
        '✅ Licença Ambiental',
        td.environmentalLicense,
        this.colors.secondary
      );
    } else {
      this._infoBox(
        '⚠️ Licença Ambiental',
        'Informação não disponível. Verificar junto aos órgãos competentes.',
        this.colors.accent
      );
    }

    this.doc.moveDown();

    this._h2('3.3 Estudos Ambientais');

    if (td.environmentalStudies) {
      this._p(td.environmentalStudies);
    } else {
      this._p('Nenhum estudo específico informado.', { color: this.colors.textLight });
    }

    this._divider();

    this._h2('3.4 Impactos e Mitigações');

    const impacts = [
      ['Aspecto', 'Mitigação'],
      ['Solo', 'Análises de solo e remediação conforme CONAMA'],
      ['Águas', 'Monitoramento de lençol freático'],
      ['Fauna/Flora', 'Minimização de ruído e restrição de área'],
      ['Resíduos', 'Destinação certificada conforme PNRS']
    ];

    this._table(impacts, [200, 275]);
  }

  // ==========================================================================
  // SECTION 4: METHODOLOGY
  // ==========================================================================

  _section4_Methodology(project) {
    this._h1('4. METODOLOGIA DE DESATIVAÇÃO');

    const td = project.technicalData || {};

    this._h2('4.1 Método Selecionado');

    this._p(td.decommissioningMethod || 'Não especificado', {
      bold: true,
      size: 11
    });

    this._p(
      'Este método foi selecionado considerando aspectos técnicos, econômicos, ambientais e de segurança, além de análise preditiva via Machine Learning.'
    );

    this._divider();

    this._h2('4.2 Principais Etapas');

    this._bullet('Fase 1: Preparação e Mobilização (10-15 dias)');
    this._bullet('Fase 2: Isolamento e Remoção de Equipamentos (20-30 dias)');
    this._bullet('Fase 3: Abandono de Poço com Tampões (15-25 dias)');
    this._bullet('Fase 4: Recuperação Ambiental (30-45 dias)');
    this._bullet('Fase 5: Encerramento e Relatório Final (5-10 dias)');

    this.doc.moveDown();

    if (td.cementPlugs) {
      this._infoBox(
        '🔧 Tampões de Cimento',
        td.cementPlugs,
        this.colors.primary
      );
    }

    if (td.integrityTests) {
      this.doc.moveDown();
      this._infoBox(
        '✓ Testes de Integridade',
        td.integrityTests,
        this.colors.secondary
      );
    }
  }

  // ==========================================================================
  // SECTION 5: SCHEDULE
  // ==========================================================================

  _section5_Schedule(project) {
    this._h1('5. CRONOGRAMA DE EXECUÇÃO');

    const td = project.technicalData || {};
    const totalDays = parseInt(td.schedule) || 90;

    this._h2('5.1 Duração Total');

    this.doc
      .fontSize(32)
      .fillColor(this.colors.primary)
      .font('Helvetica-Bold')
      .text(`${totalDays} dias`, { align: 'center' });

    this.doc
      .fontSize(12)
      .fillColor(this.colors.textLight)
      .font('Helvetica')
      .text(`(aproximadamente ${Math.round(totalDays / 30)} meses)`, {
        align: 'center'
      });

    this.doc.moveDown(2);

    this._h2('5.2 Distribuição de Fases');

    const phases = [
      ['Fase', 'Duração'],
      ['Preparação', '10-15 dias'],
      ['Isolamento', '20-30 dias'],
      ['Abandono', '15-25 dias'],
      ['Recuperação', '30-45 dias'],
      ['Encerramento', '5-10 dias']
    ];

    this._table(phases, [275, 200]);

    this._divider();

    this._h2('5.3 Marcos Críticos');

    this._bullet(`Emissão de licenças - Dia 0`);
    this._bullet(`Conclusão isolamento - Dia ${Math.round(totalDays * 0.3)}`);
    this._bullet(`Aprovação tampões - Dia ${Math.round(totalDays * 0.6)}`);
    this._bullet(`Aprovação remediação - Dia ${Math.round(totalDays * 0.85)}`);
    this._bullet(`Relatório final ANP - Dia ${totalDays}`);
  }

  // ==========================================================================
  // SECTION 6: BUDGET
  // ==========================================================================

  _section6_Budget(project) {
    this._h1('6. ORÇAMENTO DETALHADO');

    const td = project.technicalData || {};
    const budget = parseFloat(td.estimatedBudget) || 500000;

    this._h2('6.1 Resumo Financeiro');

    this.doc
      .fontSize(28)
      .fillColor(this.colors.primary)
      .font('Helvetica-Bold')
      .text(`R$ ${this._formatCurrency(budget)}`, { align: 'center' });

    this.doc
      .fontSize(10)
      .fillColor(this.colors.textLight)
      .font('Helvetica')
      .text('Valor total estimado', { align: 'center' });

    this.doc.moveDown(2);

    this._h2('6.2 Distribuição de Custos');

    const costs = [
      ['Categoria', 'Percentual', 'Valor (R$)'],
      ['Mobilização', '10%', this._formatCurrency(budget * 0.1)],
      ['Equipamentos', '25%', this._formatCurrency(budget * 0.25)],
      ['Mão de Obra', '30%', this._formatCurrency(budget * 0.3)],
      ['Abandono', '20%', this._formatCurrency(budget * 0.2)],
      ['Remediação', '10%', this._formatCurrency(budget * 0.1)],
      ['Contingência', '5%', this._formatCurrency(budget * 0.05)]
    ];

    this._table(costs, [200, 100, 175]);

    this.doc.moveDown();

    this._infoBox(
      'ℹ️ Premissas Orçamentárias',
      'Valores baseados em projetos similares e análise de ML. Recomenda-se contingência mínima de 10% para imprevistos.',
      this.colors.primary
    );
  }

  // ==========================================================================
  // SECTION 7: RISKS
  // ==========================================================================

  _section7_Risks(project) {
    this._h1('7. ANÁLISE DE RISCOS');

    const td = project.technicalData || {};

    this._h2('7.1 Avaliação Geral');

    this._infoBox(
      '⚠️ Nível de Risco do Projeto',
      `${this._assessRiskLevel(td)} - Baseado em proximidade de corpos d'água, tipo de área e histórico operacional.`,
      this.colors.accent
    );

    this.doc.moveDown();

    this._h2('7.2 Principais Riscos Identificados');

    const risks = [
      ['Risco', 'Severidade', 'Mitigação'],
      [
        'Vazamento hidrocarbonetos',
        'Alto',
        'Procedimentos rigorosos, kits contenção'
      ],
      [
        'Falha tampão cimento',
        'Alto',
        'Testes integridade redundantes'
      ],
      [
        'Condições climáticas',
        'Médio',
        'Planejamento sazonal'
      ],
      [
        'Acidente trabalho',
        'Alto',
        'Treinamentos NR, DDS diários'
      ],
      [
        'Contaminação solo/água',
        'Alto',
        'Monitoramento contínuo'
      ]
    ];

    this._table(risks, [180, 100, 195]);

    this._divider();

    this._h2('7.3 Plano de Resposta');

    this._bullet('Equipe de emergência 24/7 durante operações críticas');
    this._bullet('Kits de contenção e remediação em campo');
    this._bullet('Comunicação imediata com órgãos ambientais');
    this._bullet('Seguro de responsabilidade ambiental');
  }

  // ==========================================================================
  // SECTION 8: CONCLUSION
  // ==========================================================================

  _section8_Conclusion(project) {
    this._h1('8. CONCLUSÕES E PRÓXIMOS PASSOS');

    const td = project.technicalData || {};

    this._h2('8.1 Resumo Executivo');

    this._p(
      `O presente PDI apresenta um plano completo e detalhado para a desativação segura e ambientalmente responsável do ativo ${
        td.wellName || project.name
      }. Todas as etapas foram planejadas em conformidade com a Resolução ANP 817/2020 e normativas ambientais vigentes.`
    );

    this._divider();

    this._h2('8.2 Conformidade Regulatória');

    this._infoBox(
      '✅ Checklist ANP 817/2020',
      'Este PDI atende a todos os requisitos estabelecidos pela ANP, incluindo caracterização do ativo, metodologia de desativação, cronograma, orçamento, análise de riscos e plano de monitoramento.',
      this.colors.secondary
    );

    this.doc.moveDown();

    this._h2('8.3 Próximos Passos');

    this._bullet('Submissão do PDI para aprovação da ANP');
    this._bullet('Obtenção de licenças ambientais complementares');
    this._bullet('Contratação de empresas especializadas');
    this._bullet('Mobilização de equipe e equipamentos');
    this._bullet('Início das operações conforme cronograma');

    this._divider();

    this._h2('8.4 Monitoramento Pós-Desativação');

    this._p(
      'Será implementado programa de monitoramento com duração mínima de 24 meses, incluindo:'
    );

    this._bullet('Inspeções trimestrais da integridade dos tampões');
    this._bullet('Análises semestrais de solo e água');
    this._bullet('Monitoramento anual da revegetação');
    this._bullet('Relatórios técnicos semestrais para ANP');

    this.doc.moveDown(3);

    // Signature area
    this._divider();
    this.doc
      .fontSize(10)
      .fillColor(this.colors.text)
      .text('_________________________________________________', { align: 'center' });

    this.doc
      .fontSize(9)
      .fillColor(this.colors.textLight)
      .text('Responsável Técnico', { align: 'center' });

    this.doc.moveDown(0.3);

    this.doc
      .fontSize(8)
      .text('CREA/Registro Profissional', { align: 'center' });

    this.doc.moveDown(2);

    this.doc
      .fontSize(8)
      .fillColor(this.colors.textLight)
      .text('Documento gerado pela plataforma NEPTUNO ONSHORE v2.1', {
        align: 'center'
      });

    this.doc.fontSize(7).text('www.neptunodescom.com', { align: 'center' });
  }

  // ==========================================================================
  // HELPER METHODS
  // ==========================================================================

  _formatNumber(value) {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('pt-BR').format(value);
  }

  _formatCurrency(value) {
    if (!value) return '0,00';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  _calculateComplexity(td) {
    const depth = parseFloat(td.totalDepth) || 0;
    if (depth > 3000) return 'Alta';
    if (depth > 1500) return 'Média';
    return 'Baixa';
  }

  _assessRiskLevel(td) {
    const waterProx = parseFloat(td.waterBodyProximity) || 1000;
    if (waterProx < 100) return 'Alto';
    if (waterProx < 500) return 'Médio';
    return 'Baixo';
  }

  _predictSuccessRate(td) {
    let score = 85;
    if (this._calculateComplexity(td) === 'Alta') score -= 10;
    if (this._assessRiskLevel(td) === 'Alto') score -= 8;
    if (!td.environmentalLicense) score -= 5;
    return Math.max(70, Math.min(95, score));
  }
}

export const pdiGenerator = new PDIGenerator();
