/**
 * Script para gerar 2 PDFs de exemplo complexos
 * Simula preenchimentos reais de PDI
 */

import { generatePDFFromTemplate } from '../src/services/pdfService.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// EXEMPLO 1: POÇO TERRESTRE - COMPLEXO
// ============================================================================

const exampleWell = {
  title: 'Plano de Desativação de Instalações (PDI)',
  subtitle: 'Poço Terrestre REC-0045 - Campo Buracica - Bacia do Recôncavo',
  sections: [
    {
      title: '1. IDENTIFICAÇÃO DO EMPREENDIMENTO',
      content: {
        'Nome do Poço': 'REC-0045 (Buracica-45)',
        'Tipo': 'Poço Produtor Terrestre',
        'Campo': 'Buracica',
        'Bacia Sedimentar': 'Recôncavo (BA)',
        'Operadora': 'PetroRecôncavo S.A.',
        'Município': 'São Sebastião do Passé',
        'Estado': 'Bahia',
        'Coordenadas UTM': 'E: 565432 / N: 8622154 (Datum SIRGAS 2000)',
        'Ano de Perfuração': '1978',
        'Status Atual': 'Inativo desde 2019',
        'Último fluido produzido': 'Óleo 18° API + Água de formação',
        'Profundidade Total': '1.247 metros'
      }
    },
    {
      title: '2. JUSTIFICATIVA PARA DESATIVAÇÃO',
      content: `O poço REC-0045 encontra-se inativo desde março de 2019 devido ao declínio acentuado da produção (< 1 m³/dia) e elevado BSW (> 95%), tornando sua operação economicamente inviável. Após análise técnico-econômica, a operadora decidiu pela desativação definitiva do ativo, conforme regulamentação ANP nº 46/2016 e suas alterações. A área será recuperada e devolvida às condições ambientais originais conforme PRAD aprovado pelo INEMA-BA.`
    },
    {
      title: '3. DESCRIÇÃO DAS INSTALAÇÕES',
      content: {
        'Cabeça de poço': 'Árvore de natal convencional (4 1/16" x 5.000 psi)',
        'Revestimentos': [
          'Condutor 20" até 30m (cimento até superfície)',
          'Superfície 13 3/8" até 412m (cimento até superfície)',
          'Produção 9 5/8" até 1.247m (cimento até 850m)'
        ],
        'Coluna de produção': '3 1/2" até 1.210m',
        'Equipamentos de superfície': [
          'Tanque pulmão 50 bbl',
          'Separador trifásico',
          'Bomba centrífuga 10 HP',
          'Linha de surgência 4"',
          'Tubulação de escoamento 3"'
        ],
        'Área ocupada': '1.200 m²',
        'Cercamento': 'Alambrado em bom estado'
      }
    },
    {
      title: '4. DIAGNÓSTICO AMBIENTAL ATUAL',
      content: {
        'Uso do solo': 'Pastagem (propriedade rural)',
        'Vegetação': 'Capoeira baixa com espécies nativas em regeneração',
        'Recursos hídricos': 'Riacho intermitente a 150m (direção NE)',
        'Áreas protegidas': 'Não há APPs ou UCs no raio de 5km',
        'Passivos identificados': [
          'Manchas superficiais de óleo no solo (área de 15m²)',
          'Resíduos sólidos (sucata de equipamentos)',
          'Área impermeabilizada (piso de concreto 200m²)'
        ],
        'Qualidade do solo': 'Análises indicam TPH entre 500-1.200 mg/kg em 3 pontos',
        'Águas subterrâneas': 'Poço de monitoramento instalado - sem contaminação detectada'
      }
    },
    {
      title: '5. METODOLOGIA DE DESCOMISSIONAMENTO',
      content: {
        'Método de abandono': 'Abandono permanente com cimentação conforme IBP',
        'Etapas principais': [
          '1. Remoção de equipamentos de superfície',
          '2. Limpeza e retirada de fluidos do poço',
          '3. Corte e retirada da coluna de produção',
          '4. Instalação de tampões de cimento (mínimo 3 tampões)',
          '5. Corte de revestimentos 3m abaixo do nível do solo',
          '6. Instalação de placa de identificação',
          '7. Remoção de instalações auxiliares',
          '8. Descontaminação de solo impactado',
          '9. Demolição de estruturas de concreto',
          '10. Recomposição topográfica e revegetação'
        ],
        'Tampões de cimento': [
          'Tampão 1: 1.247-1.197m (50m) - Fundo do poço',
          'Tampão 2: 850-800m (50m) - Topo do cimento anterior',
          'Tampão 3: 30-0m (30m) - Superfície'
        ],
        'Fluido de abandono': 'Cimento Portland Classe G + retardador',
        'Teste de integridade': 'Teste de pressão nos tampões (500 psi / 24h)'
      }
    },
    {
      title: '6. CRONOGRAMA DE EXECUÇÃO',
      content: {
        'Duração total': '8 meses',
        'Fase 1 - Mobilização (1 mês)': [
          'Obtenção de licenças',
          'Contratação de sonda',
          'Mobilização de equipamentos',
          'Instalação de canteiro'
        ],
        'Fase 2 - Abandono do Poço (2 meses)': [
          'Operações de sonda',
          'Cimentação',
          'Testes',
          'Corte de revestimentos'
        ],
        'Fase 3 - Desmobilização de Superfície (2 meses)': [
          'Remoção de equipamentos',
          'Limpeza de tanques',
          'Destinação de resíduos'
        ],
        'Fase 4 - Recuperação Ambiental (3 meses)': [
          'Remediação de solo',
          'Demolições',
          'Recomposição topográfica',
          'Revegetação'
        ],
        'Data prevista início': 'Janeiro/2026',
        'Data prevista término': 'Agosto/2026'
      }
    },
    {
      title: '7. ESTIMATIVA DE CUSTOS',
      content: {
        'Mobilização/Desmobilização de Sonda': 'R$ 45.000,00',
        'Operação de Sonda (60 dias x R$ 2.500/dia)': 'R$ 150.000,00',
        'Cimento e materiais de abandono': 'R$ 35.000,00',
        'Remoção e destinação de equipamentos': 'R$ 28.000,00',
        'Remediação de solo contaminado': 'R$ 42.000,00',
        'Demolições e obras civis': 'R$ 18.000,00',
        'Recuperação de área (PRAD)': 'R$ 32.000,00',
        'Gerenciamento e consultoria ambiental': 'R$ 25.000,00',
        'Contingências (10%)': 'R$ 37.500,00',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━': '━━━━━━━━━━━━━━━━',
        'CUSTO TOTAL ESTIMADO': 'R$ 412.500,00'
      }
    },
    {
      title: '8. GESTÃO DE RESÍDUOS',
      content: {
        'Classe I - Perigosos': [
          'Solo contaminado: 45 m³ → Aterro Classe I licenciado',
          'Resíduos oleosos: 2 toneladas → Co-processamento',
          'Borras de tanques: 1,5 toneladas → Tratamento térmico'
        ],
        'Classe II - Não Perigosos': [
          'Sucata metálica: 8 toneladas → Reciclagem',
          'Concreto: 35 toneladas → Britagem/reutilização',
          'Madeira: 2 toneladas → Compostagem'
        ],
        'Destinação': 'Empresas licenciadas com MTR/CDR conforme PNRS',
        'Rastreabilidade': 'Sistema de manifesto eletrônico'
      }
    },
    {
      title: '9. PLANO DE RECUPERAÇÃO DE ÁREA DEGRADADA (PRAD)',
      content: {
        'Área total a recuperar': '1.200 m²',
        'Atividades': [
          'Remoção de piso impermeabilizado (200 m²)',
          'Recomposição topográfica com solo local',
          'Descompactação mecânica (grade aradora)',
          'Correção de pH e adubação orgânica',
          'Plantio de espécies nativas (mudas + semeadura)',
          'Cercamento temporário para proteção inicial',
          'Irrigação no período de estiagem (6 meses)'
        ],
        'Espécies a plantar': [
          'Arbóreas: Pau-brasil, Ipê-amarelo, Jequitibá (100 mudas)',
          'Arbustivas: Aroeira, Ingá, Pitanga (150 mudas)',
          'Gramíneas: Mix de sementes nativas'
        ],
        'Monitoramento': 'Trimestral por 24 meses',
        'Meta de cobertura vegetal': '> 80% em 18 meses'
      }
    },
    {
      title: '10. MONITORAMENTO PÓS-DESATIVAÇÃO',
      content: {
        'Duração': '24 meses após conclusão',
        'Frequência': 'Trimestral (8 campanhas)',
        'Parâmetros monitorados': [
          'Integridade dos tampões de cimento',
          'Qualidade de águas subterrâneas (PM-01)',
          'Qualidade do solo (TPH, metais pesados)',
          'Desenvolvimento da vegetação (índice de cobertura)',
          'Sobrevivência de mudas (taxa > 70%)'
        ],
        'Relatórios': 'Enviados à ANP e órgão ambiental estadual',
        'Responsável técnico': 'Eng. Ambiental credenciado'
      }
    },
    {
      title: '11. RESPONSABILIDADES E EQUIPE TÉCNICA',
      content: {
        'Operadora': 'PetroRecôncavo S.A. (CNPJ: XX.XXX.XXX/0001-XX)',
        'Responsável Legal': 'Dr. João Silva - Diretor de Operações',
        'Coordenador do Projeto': 'Eng. Maria Santos (CREA-BA 12345)',
        'Equipe Técnica': [
          'Eng. de Petróleo: Carlos Oliveira (CREA-BA 23456)',
          'Eng. Ambiental: Ana Costa (CREA-BA 34567)',
          'Geólogo: Pedro Alves (CREA-BA 45678)',
          'Técnico de Segurança: José Pereira (MTE 56789)'
        ],
        'Empresas Contratadas': [
          'Sonda: XYZ Serviços de Poço Ltda',
          'Ambiental: ABC Consultoria Ambiental',
          'Resíduos: DEF Gestão de Resíduos S.A.'
        ]
      }
    },
    {
      title: '12. DOCUMENTOS DE REFERÊNCIA',
      content: [
        'Resolução ANP nº 46/2016 - Abandono de Poços',
        'NBR ISO 14001:2015 - Sistema de Gestão Ambiental',
        'Guia IBP - Abandono Permanente de Poços Terrestres',
        'Resolução CONAMA nº 420/2009 - Qualidade de Solo',
        'Lei nº 12.305/2010 - Política Nacional de Resíduos Sólidos',
        'Projeto de Perfuração Original (1978)',
        'Licença de Operação LO nº 12345/2000 - INEMA',
        'Estudo de Análise de Risco (2019)'
      ]
    }
  ],
  metadata: {
    geradoEm: new Date().toLocaleString('pt-BR'),
    versao: '3.0',
    plataforma: 'NEPTUNO ONSHORE',
    revisao: '01',
    responsavel: 'Eng. Tadeu Santana - CREA-RJ XXXXX'
  }
};

// ============================================================================
// EXEMPLO 2: ESTAÇÃO DE PRODUÇÃO - COMPLEXO
// ============================================================================

const exampleStation = {
  title: 'Plano de Desativação de Instalações (PDI)',
  subtitle: 'Estação de Produção EP-15 - Campo Canto do Amaro - Bacia Potiguar',
  sections: [
    {
      title: '1. IDENTIFICAÇÃO DO EMPREENDIMENTO',
      content: {
        'Nome da Instalação': 'Estação de Produção EP-15 (Canto do Amaro)',
        'Tipo': 'Estação de Coleta e Tratamento de Óleo',
        'Campo': 'Canto do Amaro',
        'Bacia Sedimentar': 'Potiguar (RN)',
        'Operadora': '3R Petroleum Potiguar S.A.',
        'Município': 'Mossoró',
        'Estado': 'Rio Grande do Norte',
        'Coordenadas': 'Lat: -5.123456 / Long: -37.654321',
        'Ano de Instalação': '1985',
        'Status Atual': 'Paralisada desde 2020',
        'Capacidade Nominal': '500 m³/dia de fluidos',
        'Área Total': '3.800 m² (área cercada)'
      }
    },
    {
      title: '2. HISTÓRICO OPERACIONAL',
      content: `A Estação EP-15 entrou em operação em setembro de 1985, processando óleo de 12 poços satélites do Campo Canto do Amaro. Durante seus 35 anos de operação, processou aproximadamente 2,8 milhões de barris de óleo. Com o declínio natural do campo e o envelhecimento dos equipamentos, a produção tornou-se antieconômica, levando à decisão de desativação definitiva. A estação encontra-se paralisada desde janeiro de 2020, mantida sob monitoramento de segurança patrimonial.`
    },
    {
      title: '3. DESCRIÇÃO DETALHADA DAS INSTALAÇÕES',
      content: {
        'Equipamentos Principais': [
          'Separadores trifásicos: 3 unidades de 500 bbl (horizontal)',
          'Tanques de armazenamento: 4 tanques de 1.000 bbl cada',
          'Bombas de transferência: 5 bombas centrífugas (10-25 HP)',
          'Aquecedores: 2 aquecedores a gás de 500.000 BTU/h',
          'Tratador eletrostático: 1 unidade de 300 bbl',
          'Sistema de água de injeção: Tanques + bombas (desativado em 2018)'
        ],
        'Tubulações': [
          'Rede de processo: ~2.500 metros (2" a 8")',
          'Linhas de chegada de poços: 12 linhas (3" a 4")',
          'Linha de escoamento: 1 linha de 6" (15 km até bateria central)',
          'Rede de gás combustível: ~800 metros (1" a 2")'
        ],
        'Infraestrutura Civil': [
          'Sala de controle: 60 m² (alvenaria)',
          'Oficina: 40 m² (estrutura metálica)',
          'Vestiários e sanitários: 30 m²',
          'Piso impermeabilizado: 1.200 m² (concreto)',
          'Sistema de drenagem oleosa: Canaletas + caixa separadora'
        ],
        'Utilidades': [
          'Sistema elétrico: Transformador 75 kVA + quadros',
          'Gerador diesel: 50 kVA (backup)',
          'Sistema de combate a incêndio: Hidrantes + extintores',
          'Cerca de alambrado: Perímetro de 250 metros'
        ]
      }
    },
    {
      title: '4. AVALIAÇÃO DE PASSIVOS AMBIENTAIS',
      content: {
        'Investigação Ambiental': 'Fase II concluída em março/2024',
        'Solo': [
          'TPH detectado em 8 pontos (200-3.500 mg/kg)',
          'Área contaminada estimada: 450 m²',
          'Profundidade de contaminação: até 2,5 metros',
          'Metais pesados dentro de valores de referência'
        ],
        'Águas Subterrâneas': [
          'Nível estático: 8-12 metros',
          'Poços de monitoramento: 4 unidades instaladas',
          'Contaminação por TPH detectada em PM-02 (1.200 μg/L)',
          'Direção de fluxo: NE para SW',
          'Receptor potencial: Não há captações a jusante (raio 5 km)'
        ],
        'Resíduos Acumulados': [
          'Borras em tanques: ~15 m³',
          'Solo oleoso em bacia de contenção: ~80 m³',
          'Sucata metálica: ~25 toneladas',
          'Resíduos diversos: ~8 toneladas'
        ],
        'Risco à Saúde Humana': 'Médio (exposição ocupacional)',
        'Risco Ecológico': 'Baixo (área industrial degradada)'
      }
    },
    {
      title: '5. METODOLOGIA DE DESCOMISSIONAMENTO',
      content: {
        'Estratégia Geral': 'Desativação total com remoção de todos os equipamentos e remediação ambiental',
        'Faseamento': [
          'Fase 1: Preparação e Descontaminação (4 meses)',
          'Fase 2: Desmontagem e Remoção (5 meses)',
          'Fase 3: Demolições Civis (2 meses)',
          'Fase 4: Remediação Ambiental (6 meses)',
          'Fase 5: Monitoramento Pós-Obra (18 meses)'
        ],
        'Descontaminação de Equipamentos': [
          'Drenagem de fluidos residuais',
          'Lavagem interna com vapor (steam cleaning)',
          'Neutralização química quando necessário',
          'Inertização com nitrogênio',
          'Certificação de limpeza (gas test)'
        ],
        'Desmontagem': [
          'Corte e segregação de tubulações',
          'Desmontagem de equipamentos (guinchos + munck)',
          'Remoção de tanques (seção em campo)',
          'Desmantelamento de estruturas metálicas',
          'Retirada de sistemas elétricos'
        ],
        'Remediação de Solo': [
          'Escavação de solo contaminado (600 m³ estimados)',
          'Landfarming on-site para material com TPH < 10.000 mg/kg',
          'Destinação off-site para material com TPH > 10.000 mg/kg',
          'Análises confirmatórias (1 amostra/100 m²)',
          'Backfill com solo limpo após aprovação'
        ],
        'Águas Subterrâneas': [
          'Monitoramento intensivo (bimestral)',
          'Atenuação natural monitorada (ANM)',
          'Reavaliação após 12 meses para definir necessidade de intervenção ativa'
        ]
      }
    },
    {
      title: '6. CRONOGRAMA DETALHADO',
      content: {
        'Duração Total': '17 meses (obras) + 18 meses (monitoramento)',
        'Mês 1-4 - Preparação e Descontaminação': [
          'Licenças e autorizações',
          'Mobilização de equipes e equipamentos',
          'Instalação de canteiro e áreas de apoio',
          'Limpeza e descontaminação de tanques',
          'Descontaminação de equipamentos de processo'
        ],
        'Mês 5-9 - Desmontagem e Remoção': [
          'Desmontagem de tubulações',
          'Remoção de equipamentos',
          'Corte e remoção de tanques',
          'Desmantelamento de estruturas',
          'Triagem e destinação de materiais'
        ],
        'Mês 10-11 - Demolições Civis': [
          'Demolição de edificações',
          'Remoção de pisos impermeabilizados',
          'Demolição de fundações',
          'Retirada de sistemas de drenagem'
        ],
        'Mês 12-17 - Remediação Ambiental': [
          'Escavação de solo contaminado',
          'Operação de landfarming',
          'Destinação de resíduos',
          'Recomposição topográfica',
          'Revegetação de área',
          'Desmobilização'
        ],
        'Mês 18-35 - Monitoramento': [
          'Campanhas trimestrais de água subterrânea',
          'Inspeções de revegetação',
          'Relatórios aos órgãos competentes'
        ]
      }
    },
    {
      title: '7. ORÇAMENTO DISCRIMINADO',
      content: {
        'PREPARAÇÃO E MOBILIZAÇÃO': 'R$ 125.000,00',
        '  - Licenciamento e projetos': 'R$ 45.000,00',
        '  - Mobilização/desmobilização': 'R$ 80.000,00',
        'DESCONTAMINAÇÃO': 'R$ 320.000,00',
        '  - Limpeza de tanques': 'R$ 180.000,00',
        '  - Limpeza de equipamentos': 'R$ 140.000,00',
        'DESMONTAGEM E REMOÇÃO': 'R$ 450.000,00',
        '  - Mão de obra especializada': 'R$ 220.000,00',
        '  - Equipamentos (guindaste, munck)': 'R$ 150.000,00',
        '  - Corte e preparação de sucata': 'R$ 80.000,00',
        'DEMOLIÇÕES': 'R$ 185.000,00',
        '  - Demolição de edificações': 'R$ 75.000,00',
        '  - Remoção de pisos': 'R$ 65.000,00',
        '  - Demolição de fundações': 'R$ 45.000,00',
        'REMEDIAÇÃO AMBIENTAL': 'R$ 680.000,00',
        '  - Escavação e transporte': 'R$ 150.000,00',
        '  - Landfarming (instalação + operação)': 'R$ 280.000,00',
        '  - Destinação off-site': 'R$ 120.000,00',
        '  - Análises laboratoriais': 'R$ 80.000,00',
        '  - PRAD (execução)': 'R$ 50.000,00',
        'GESTÃO DE RESÍDUOS': 'R$ 295.000,00',
        '  - Transporte e destinação Classe I': 'R$ 180.000,00',
        '  - Reciclagem/reutilização Classe II': 'R$ 85.000,00',
        '  - Documentação (MTR/CDR)': 'R$ 30.000,00',
        'MONITORAMENTO (18 MESES)': 'R$ 165.000,00',
        '  - Águas subterrâneas (6 campanhas)': 'R$ 90.000,00',
        '  - Solo (análises confirmatórias)': 'R$ 45.000,00',
        '  - Vegetação': 'R$ 30.000,00',
        'CONSULTORIA E GERENCIAMENTO': 'R$ 280.000,00',
        'CONTINGÊNCIAS (15%)': 'R$ 375.000,00',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━': '━━━━━━━━━━━━━━━━',
        'INVESTIMENTO TOTAL': 'R$ 2.875.000,00'
      }
    },
    {
      title: '8. GESTÃO DE RESÍDUOS E DESTINAÇÃO',
      content: {
        'Inventário de Resíduos': [
          'Classe I (Perigosos): 715 toneladas',
          'Classe II-A (Não inertes): 180 toneladas',
          'Classe II-B (Inertes): 450 toneladas',
          'TOTAL: 1.345 toneladas'
        ],
        'Resíduos Classe I - Destinação': [
          'Solo contaminado (600 m³ / 900 ton): Landfarming + Aterro Classe I',
          'Borras de tanques (15 m³ / 22 ton): Co-processamento em cimenteira',
          'Resíduos oleosos (8 ton): Rerrefino ou incineração'
        ],
        'Resíduos Classe II - Destinação': [
          'Sucata metálica ferrosa (220 ton): Reciclagem',
          'Sucata não-ferrosa (alumínio, cobre - 15 ton): Reciclagem',
          'Concreto (380 ton): Britagem para uso em aterro',
          'Madeira (25 ton): Compostagem',
          'Plásticos e borrachas (12 ton): Reciclagem ou aterro'
        ],
        'Empresas Contratadas (Licenciadas)': [
          'Solo contaminado: Ambipar Response S.A.',
          'Resíduos oleosos: Lwart Soluções Ambientais',
          'Sucata metálica: Recicla RN Ltda',
          'Concreto: Britafort Materiais de Construção',
          'Resíduos gerais: Ecopel Serviços Ambientais'
        ],
        'Rastreabilidade': 'MTR eletrônico (SINIR) + CDR para cada destinação'
      }
    },
    {
      title: '9. PLANO DE RECUPERAÇÃO DE ÁREA (PRAD)',
      content: {
        'Área Total': '3.800 m²',
        'Objetivos': 'Restabelecer as condições do ecossistema regional (Caatinga)',
        'Reconformação Topográfica': [
          'Remoção de aterros antropogênicos',
          'Suavização de taludes (inclinação < 30°)',
          'Nivelamento conforme topografia circunvizinha',
          'Compactação moderada para evitar erosão'
        ],
        'Preparo do Solo': [
          'Descompactação mecânica (subsolador)',
          'Correção de pH (calagem se pH < 5,5)',
          'Adubação orgânica (10 ton de composto)',
          'Adubação química NPK (formulação 10-20-10)'
        ],
        'Revegetação': [
          'Herbáceas: Semeadura direta de gramíneas nativas (30 kg/ha)',
          'Arbustivas: 500 mudas (espaçamento 2x2m)',
          'Arbóreas: 200 mudas (espaçamento 4x4m)',
          'Espécies selecionadas: Jurema-preta, Aroeira, Angico, Baraúna, Catingueira'
        ],
        'Proteção Inicial': [
          'Cercamento com arame liso (perímetro)',
          'Placas de sinalização',
          'Irrigação de salvamento (período seco - 6 meses)',
          'Manutenção trimestral (coroamento, replantio)'
        ],
        'Metas': [
          'Sobrevivência de mudas > 70% em 12 meses',
          'Cobertura vegetal > 60% em 18 meses',
          'Cobertura vegetal > 80% em 36 meses',
          'Ausência de processos erosivos'
        ]
      }
    },
    {
      title: '10. COMUNICAÇÃO SOCIAL',
      content: {
        'Público-Alvo': [
          'Proprietários de terras vizinhas',
          'Comunidade de Mossoró',
          'Trabalhadores envolvidos',
          'Órgãos públicos locais'
        ],
        'Ações Previstas': [
          'Reuniões informativas pré-obra (2 reuniões)',
          'Comunicados à prefeitura e defesa civil',
          'Sinalização de obra nas vias de acesso',
          'Canal de comunicação (telefone 0800)',
          'Apresentação de resultados pós-obra'
        ]
      }
    },
    {
      title: '11. SAÚDE, SEGURANÇA E MEIO AMBIENTE (SMS)',
      content: {
        'Análise de Riscos': 'APR realizada para todas as atividades',
        'EPIs Obrigatórios': 'Capacete, óculos, luvas, botinas, protetor auricular',
        'EPCs': 'Sinalização, isolamento de área, guarda-corpos, extintores',
        'Treinamentos Obrigatórios': [
          'NR-10 (eletricidade)',
          'NR-33 (espaços confinados)',
          'NR-35 (trabalho em altura)',
          'NR-20 (inflamáveis)',
          'Emergências e primeiros socorros'
        ],
        'Plano de Emergência': 'PEI aprovado com simulados trimestrais',
        'Monitoramento': [
          'Agentes químicos (VOCs)',
          'Ruído',
          'Material particulado',
          'Águas pluviais'
        ]
      }
    },
    {
      title: '12. EQUIPE TÉCNICA E RESPONSÁVEIS',
      content: {
        'Operadora Responsável': '3R Petroleum Potiguar S.A.',
        'Coordenação Geral': 'Eng. Roberto Mendes (CREA-RN 54321)',
        'Coordenação Ambiental': 'Eng. Lúcia Fernandes (CREA-RN 65432)',
        'Coordenação de SMS': 'Téc. Fernando Costa (MTE 76543)',
        'Responsável Técnico PRAD': 'Eng. Florestal Marcos Almeida (CREA-RN 87654)',
        'Consultoria Especializada': 'GAIA Consultoria Ambiental Ltda',
        'Empreiteira Principal': 'DELTA Montagem e Desmontagem Industrial S.A.',
        'ART/AVCB': 'Todas as atividades com ART registrada no CREA-RN'
      }
    }
  ],
  metadata: {
    geradoEm: new Date().toLocaleString('pt-BR'),
    versao: '3.0',
    plataforma: 'NEPTUNO ONSHORE',
    revisao: '02',
    responsavel: 'Eng. Tadeu Santana - CREA-RJ XXXXX',
    dataAprovacao: 'Aguardando aprovação ANP e IDEMA-RN'
  }
};

// ============================================================================
// GERAR PDFs
// ============================================================================

async function generateExamples() {
  console.log('🚀 Gerando PDFs de exemplo...\n');

  try {
    // PDF 1: Poço
    console.log('📄 Gerando PDF 1: Poço Terrestre Complexo...');
    const mockProjectWell = {
      name: 'REC-0045 Buracica',
      assetType: 'well'
    };
    const pdf1Path = await generatePDFFromTemplate(exampleWell, mockProjectWell);
    console.log(`✅ PDF 1 gerado: ${pdf1Path}\n`);

    // PDF 2: Estação
    console.log('📄 Gerando PDF 2: Estação de Produção Complexa...');
    const mockProjectStation = {
      name: 'EP-15 Canto do Amaro',
      assetType: 'station'
    };
    const pdf2Path = await generatePDFFromTemplate(exampleStation, mockProjectStation);
    console.log(`✅ PDF 2 gerado: ${pdf2Path}\n`);

    console.log('🎉 PDFs gerados com sucesso!');
    console.log('\nArquivos salvos em:');
    console.log(`📁 ${path.dirname(pdf1Path)}`);

  } catch (error) {
    console.error('❌ Erro ao gerar PDFs:', error);
    process.exit(1);
  }
}

// Run
generateExamples();
