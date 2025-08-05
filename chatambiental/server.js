const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Base de conhecimento expandida do chatbot
const knowledgeBase = {
    // Legislação e regulamentações
    'anp 817': {
        response: `A Resolução ANP nº 817/2020 dispõe sobre o descomissionamento de instalações de exploração e produção de petróleo e gás natural.

📋 **Principais aspectos:**
• Procedimentos para descomissionamento
• Inclusão de área terrestre sob contrato
• Alienação e reversão de bens
• Cumprimento de obrigações remanescentes

📎 **Link oficial:** https://atosoficiais.com.br/anp/resolucao-n-817-2020-dispoe-sobreo-descomissionamento-de-instalacoes-de-exploracao-e-de-producao-de-petroleo-e-gas-natural-a-inclusao-de-area-terrestre-sob-contrato-em-processo-de-licitacao-a-alienacao-e-a-reversao-de-bens-o-cumprimento-de-obrigacoes-remanescentes-a-devolucao-de-areae-da-outras-providencias?origin=instituicao&q=817/2020`,
        keywords: ['resolução 817', '817/2020', 'anp 817', 'resolução anp 817', '817', 'resolução', 'anp', 'agência nacional petróleo']
    },
    
    'descomissionamento': {
        response: `🛠️ **Descomissionamento** é o processo de desativação permanente de instalações de exploração e produção de petróleo e gás natural.

🎯 **Definição:**
• Desativação permanente e segura de instalações petrolíferas
• Processo regulamentado pela ANP através da Resolução 817/2020
• Envolve aspectos técnicos, ambientais, econômicos e legais

📌 **Etapas principais:**
• Remoção de equipamentos
• Limpeza e descontaminação
• Restauração ambiental
• Monitoramento pós-descomissionamento

🔧 **Aspectos técnicos:**
• Planejamento antecipado (EJD, PDI Conceitual, PDI Executivo)
• Avaliação de alternativas de descomissionamento
• Gestão de bens reversíveis e não-reversíveis
• Cumprimento de obrigações remanescentes

⚖️ **Base legal:** Resolução ANP nº 817/2020`,
        keywords: ['descomissionamento', 'desativação', 'remoção', 'abandono', 'desativar', 'finalizar', 'encerrar', 'desmonte', 'desmantelamento', 'o que é descomissionamento', 'conceito descomissionamento']
    },
    
    'pnrs': {
        response: `📋 **PNRS (Política Nacional de Resíduos Sólidos)** - Lei 12.305/2010

⏰ **Prazo:** Estabelecida em 2010, com implementação gradual
🎯 **Objetivo:** Gestão integrada e gerenciamento ambientalmente adequado dos resíduos sólidos

📍 **Princípios fundamentais:**
• Responsabilidade compartilhada
• Logística reversa
• Não geração, redução, reutilização e reciclagem`,
        keywords: ['pnrs', 'política nacional', 'resíduos sólidos', 'lei 12305', 'resíduos', 'lixo', 'reciclagem', 'logística reversa']
    },
    
    'licenciamento': {
        response: `🏛️ **Licenciamento Ambiental** é o procedimento administrativo obrigatório para atividades que possam causar impacto ambiental.

📝 **Tipos de licença:**
• LP - Licença Prévia
• LI - Licença de Instalação  
• LO - Licença de Operação

⚖️ **Base legal:** Lei 6.938/1981 e Resolução CONAMA 237/1997`,
        keywords: ['licenciamento', 'licença ambiental', 'lp', 'li', 'lo', 'licença prévia', 'licença instalação', 'licença operação', 'ibama']
    },
    
    'eia rima': {
        response: `📊 **EIA/RIMA** são estudos obrigatórios para empreendimentos de significativo impacto ambiental.

🔍 **EIA (Estudo de Impacto Ambiental):**
• Documento técnico detalhado
• Análise de impactos ambientais
• Medidas mitigadoras

📋 **RIMA (Relatório de Impacto Ambiental):**
• Versão simplificada do EIA
• Linguagem acessível ao público
• Audiências públicas`,
        keywords: ['eia', 'rima', 'estudo impacto', 'relatório impacto', 'impacto ambiental', 'audiência pública']
    },
    
    'conama': {
        response: `🏛️ **CONAMA (Conselho Nacional do Meio Ambiente)** é o órgão consultivo e deliberativo do Sistema Nacional do Meio Ambiente.

📋 **Principais funções:**
• Estabelecer normas e critérios ambientais
• Criar resoluções ambientais
• Deliberar sobre padrões de qualidade ambiental

⚖️ **Base legal:** Lei 6.938/1981`,
        keywords: ['conama', 'conselho nacional', 'meio ambiente', 'resoluções conama', 'normas ambientais']
    },
    
    'snuc': {
        response: `🌳 **SNUC (Sistema Nacional de Unidades de Conservação)** - Lei 9.985/2000

🎯 **Objetivo:** Estabelecer critérios para criação e gestão de unidades de conservação.

📍 **Categorias:**
• Proteção Integral
• Uso Sustentável

🏞️ **Exemplos:** Parques Nacionais, Reservas Biológicas, APAs`,
        keywords: ['snuc', 'unidades conservação', 'parques nacionais', 'reservas', 'apa', 'proteção integral', 'uso sustentável']
    },
    
    'iso 14001': {
        response: `♻️ **ISO 14001** é a norma internacional para Sistemas de Gestão Ambiental.

📋 **Principais benefícios:**
• Melhoria contínua do desempenho ambiental
• Conformidade legal
• Redução de custos
• Melhoria da imagem corporativa

🔄 **Ciclo PDCA:** Plan-Do-Check-Act`,
        keywords: ['iso 14001', 'gestão ambiental', 'sistema gestão', 'certificação', 'pdca', 'melhoria contínua']
    },
    
    // === NOVOS DOCUMENTOS ESPECÍFICOS DA ANP 817/2020 ===
    'ejd estudo': {
        response: `📋 **EJD - Estudo de Justificativas para o Descomissionamento**

🎯 **Finalidade principal:**
• Demonstrar viabilidade técnica e econômica do descomissionamento
• Justificar as opções de descomissionamento escolhidas
• Avaliar alternativas de remoção vs. abandono no local
• Análise de riscos e impactos ambientais

📊 **Conteúdo obrigatório:**
• Caracterização técnica da instalação
• Avaliação de alternativas de descomissionamento
• Análise de riscos ambientais e à segurança
• Cronograma preliminar de atividades
• Estimativa de custos por alternativa

⚖️ **Base legal:** Art. 7º da Resolução ANP 817/2020`,
        keywords: ['ejd', 'estudo justificativas', 'estudo de justificativas', 'justificativas descomissionamento']
    },
    
    'pdi conceitual': {
        response: `📋 **PDI Conceitual - Plano de Descomissionamento Conceitual**

🔍 **Características:**
• Primeira versão do PDI com informações preliminares
• Base para aprovação inicial pela ANP
• Permite refinamentos posteriores no PDI Executivo
• Fundamentado no EJD aprovado

📅 **Prazos de submissão:**
• **Instalações marítimas:** Até 5 anos antes do fim da concessão
• **Instalações terrestres:** Até 2 anos antes do fim da concessão

📋 **Conteúdo mínimo:**
• Metodologia de descomissionamento escolhida
• Cronograma macro das atividades
• Estimativa preliminar de custos
• Identificação dos principais riscos

⚖️ **Base legal:** Arts. 10º e 11º da Resolução ANP 817/2020`,
        keywords: ['pdi conceitual', 'plano conceitual', 'pdi preliminar']
    },
    
    'pdi executivo': {
        response: `📋 **PDI Executivo - Plano de Descomissionamento Executivo**

🔧 **Características:**
• Versão final e detalhada do PDI
• Deve ser submetido após aprovação do PDI Conceitual
• Contém informações técnicas completas e definitivas
• Base para execução efetiva do descomissionamento

📅 **Prazo de submissão:**
• Até 2 anos antes do início efetivo do descomissionamento
• Após aprovação do PDI Conceitual pela ANP

📋 **Conteúdo detalhado:**
• Especificações técnicas completas
• Cronograma executivo detalhado
• Orçamento final discriminado
• Planos de segurança e meio ambiente definitivos
• Especificação de equipamentos e metodologias
• Plano de gerenciamento de resíduos

⚖️ **Base legal:** Art. 13º da Resolução ANP 817/2020`,
        keywords: ['pdi executivo', 'plano executivo', 'pdi final', 'pdi detalhado']
    },
    
    'tld teste': {
        response: `🧪 **TLD - Teste de Longa Duração**

🎯 **Definição:**
• Teste prolongado de produção em poços exploratórios
• Permite avaliação da comercialidade do reservatório
• Pode preceder a fase de desenvolvimento do campo

📋 **Aspectos do descomissionamento:**
• TLD deve ser incluído no PDI quando aplicável
• Equipamentos temporários devem ser considerados
• Cronograma deve prever remoção após conclusão
• Análise de impacto ambiental específica

🔧 **Características técnicas:**
• Duração típica: 6 meses a 2 anos
• Equipamentos modulares e temporários
• Facilidade de remoção e transporte
• Possibilidade de reutilização em outros projetos

⏰ **Considerações de prazo:**
• Descomissionamento deve ser planejado desde o início
• Cronograma integrado ao desenvolvimento do campo
• Equipamentos podem ser reutilizados ou removidos

⚖️ **Base legal:** Resolução ANP 817/2020`,
        keywords: ['tld', 'teste longa duração', 'teste de longa duração', 'teste longa duracao', 'teste de longa duracao', 'teste prolongado', 'tld teste', 'teste extendido']
    },
    
    'spa sistema': {
        response: `⚡ **SPA - Sistema de Produção Antecipada**

🎯 **Definição:**
• Sistema temporário para produção inicial de hidrocarbonetos
• Permite produção enquanto se desenvolve o sistema definitivo
• Geralmente utiliza equipamentos modulares e flexíveis

📋 **Aspectos do descomissionamento:**
• SPA deve ser incluído no planejamento de descomissionamento
• Equipamentos temporários exigem cronograma específico
• Pode haver transição para sistema definitivo
• Remoção deve ser coordenada com desenvolvimento do campo

🔧 **Características técnicas:**
• Instalações modulares e temporárias
• Facilidade de remoção e transporte
• Possibilidade de reutilização em outros projetos
• Menor complexidade de descomissionamento
• Sistemas de ancoragem temporários
• Equipamentos de superfície móveis

⚖️ **Base legal:** Resolução ANP 817/2020`,
        keywords: ['spa', 'sistema produção antecipada', 'sistema de produção antecipada', 'sistema producao antecipada', 'produção antecipada', 'producao antecipada']
    },
    
    // === ASPECTOS ESPECÍFICOS DA ANP 817/2020 ===
    'procedimentos descomissionamento': {
        response: `📋 **Procedimentos para Descomissionamento** (ANP 817/2020)

🔧 **Etapas obrigatórias:**
• Elaboração do PDI (Plano de Descomissionamento)
• Aprovação prévia pela ANP
• Execução conforme cronograma aprovado
• Relatórios periódicos de acompanhamento
• Certificação de conclusão

⚖️ **Base legal:** Arts. 5º, 10º e 11º da Resolução ANP 817/2020`,
        keywords: ['procedimentos descomissionamento', 'procedimentos de descomissionamento', 'etapas descomissionamento', 'etapas de descomissionamento', 'como descomissionar', 'processo descomissionamento', 'processo de descomissionamento']
    },
    
    'area terrestre contrato': {
        response: `🏞️ **Inclusão de Área Terrestre sob Contrato** (ANP 817/2020)

📍 **Principais aspectos:**
• Áreas terrestres devem ser incluídas no PDI
• Análise de passivos ambientais terrestres
• Recuperação de áreas degradadas
• Monitoramento pós-descomissionamento

📋 **Documentação:** RDI (Relatório de Dados de Instalação)`,
        keywords: ['área terrestre', 'terrestre contrato', 'passivos terrestres', 'áreas degradadas', 'inclusão área terrestre', 'terrestre sob contrato']
    },
    
    'alienacao reversao bens': {
        response: `💼 **Alienação e Reversão de Bens** (ANP 817/2020)

🔄 **Opções disponíveis:**
• Alienação: Venda dos bens a terceiros
• Reversão: Transferência para a União
• Reutilização: Aproveitamento em outros projetos
• Descarte: Destinação ambientalmente adequada

📋 **Requisitos:** Avaliação prévia e aprovação da ANP`,
        keywords: ['alienação bens', 'reversão bens', 'venda equipamentos', 'destinação bens', 'alienação reversão', 'bens terceiros', 'transferência união']
    },
    
    'obrigacoes remanescentes': {
        response: `⚖️ **Cumprimento de Obrigações Remanescentes** (ANP 817/2020)

📋 **Obrigações após descomissionamento:**
• Monitoramento ambiental contínuo
• Manutenção de seguros ambientais
• Relatórios periódicos à ANP
• Responsabilidade por passivos futuros
• Cumprimento de condicionantes ambientais

⏰ **Prazo:** Definido caso a caso pela ANP`,
        keywords: ['obrigações remanescentes', 'responsabilidade pós-descomissionamento', 'monitoramento contínuo', 'passivos futuros', 'cumprimento obrigações', 'obrigações após', 'responsabilidade após']
    },
    
    // === ETAPAS ESPECÍFICAS DO DESCOMISSIONAMENTO ===
    'remocao equipamentos': {
        response: `🏗️ **Remoção de Equipamentos** - Primeira etapa do descomissionamento

🎯 **Definição:**
• Primeira fase do processo de descomissionamento
• Envolve desmontagem sistemática de todas as estruturas
• Requer planejamento detalhado e especializado

🔧 **Atividades principais:**
• Desmontagem de estruturas e equipamentos
• Retirada de materiais perigosos
• Descontaminação prévia
• Transporte seguro para destinação final
• Documentação de todas as operações

📋 **Aspectos técnicos:**
• Sequenciamento lógico das operações
• Uso de equipamentos especializados (guindastes, barcaças)
• Corte e soldagem subaquática quando necessário
• Classificação de materiais para reciclagem/descarte

⚠️ **Cuidados especiais:** 
• Materiais com amianto, PCBs e outros contaminantes
• Procedimentos de segurança rigorosos
• Proteção ambiental durante as operações`,
        keywords: ['remoção equipamentos', 'desmontagem', 'retirada equipamentos', 'desmonte estruturas', 'remover equipamentos', 'desmonte equipamentos', 'retirada estruturas']
    },
    
    'limpeza descontaminacao': {
        response: `🧽 **Limpeza e Descontaminação** - Segunda etapa do descomissionamento

🎯 **Definição:**
• Processo de remoção de contaminantes do solo e água
• Etapa crítica para restauração ambiental
• Requer técnicas especializadas e monitoramento rigoroso

🔬 **Processo detalhado:**
• Análise de contaminação do solo e água
• Remoção de contaminantes identificados
• Tratamento in-situ ou ex-situ
• Confirmação analítica da limpeza
• Certificação de descontaminação

📋 **Aspectos técnicos:**
• Caracterização inicial da contaminação
• Seleção de tecnologias de remediação adequadas
• Estabelecimento de níveis de limpeza (cleanup levels)
• Validação através de análises laboratoriais

🧪 **Parâmetros analisados:** 
• Hidrocarbonetos totais de petróleo (TPH)
• Metais pesados (chumbo, mercúrio, cádmio)
• Compostos orgânicos voláteis (VOCs)
• Hidrocarbonetos policíclicos aromáticos (PAHs)

🔧 **Técnicas de remediação:**
• Bioestimulação e bioaumentação
• Oxidação química in-situ
• Extração de vapores (soil vapor extraction)
• Lavagem de solo (soil washing)`,
        keywords: ['limpeza descontaminação', 'descontaminação solo', 'tratamento contaminação', 'análise contaminantes', 'limpeza solo', 'descontaminação', 'remediação', 'tratamento solo']
    },
    
    'restauracao ambiental': {
        response: `🌱 **Restauração Ambiental** - Terceira etapa do descomissionamento

🌿 **Ações de recuperação:**
• Recomposição topográfica do terreno
• Plantio de espécies nativas
• Recuperação de habitats naturais
• Restabelecimento de drenagem natural
• Controle de erosão

📋 **Documento base:** PRAD (Plano de Recuperação de Áreas Degradadas)`,
        keywords: ['restauração ambiental', 'recuperação área', 'revegetação', 'recomposição ambiental', 'prad', 'restauração área', 'recuperação ambiental', 'recomposição área']
    },
    
    'monitoramento pos': {
        response: `📊 **Monitoramento Pós-Descomissionamento** - Etapa final e contínua

🎯 **Definição:**
• Acompanhamento sistemático das condições ambientais após descomissionamento
• Verificação da eficácia das medidas de restauração implementadas
• Garantia de que não há impactos residuais significativos

🔍 **Atividades de monitoramento:**
• Análises periódicas de solo e água subterrânea
• Acompanhamento da revegetação
• Verificação da estabilidade geotécnica
• Monitoramento de fauna local
• Relatórios semestrais/anuais

📋 **Aspectos técnicos:**
• Rede de monitoramento com pontos estratégicos
• Protocolos padronizados de coleta e análise
• Comparação com valores de referência (background)
• Avaliação estatística de tendências temporais

🔬 **Parâmetros monitorados:**
• Qualidade da água subterrânea
• Contaminantes residuais no solo
• Indicadores biológicos (biodiversidade)
• Estabilidade estrutural da área

⏰ **Duração:** Tipicamente 5-10 anos ou conforme determinação da ANP

📋 **Relatórios obrigatórios:**
• Relatórios semestrais de monitoramento
• Relatório anual consolidado
• Relatório final de encerramento`,
        keywords: ['monitoramento pós-descomissionamento', 'acompanhamento ambiental', 'monitoramento contínuo', 'análises periódicas']
    },
    
    // === NOVOS ASPECTOS AMBIENTAIS E TÉCNICOS ===
    'norm materiais': {
        response: `☢️ **NORM - Material Radioativo de Ocorrência Natural**

🔬 **Definição:**
• Materiais com radioatividade natural concentrada por processos industriais
• Comum em incrustações e sedimentos de equipamentos petrolíferos
• Requer manuseio e destinação especializados

⚠️ **Aspectos no descomissionamento:**
• Identificação obrigatória durante caracterização
• Análise radiológica de equipamentos e estruturas
• Pessoal especializado para manuseio
• Destinação conforme normas da CNEN
• Descontaminação ou isolamento adequado

📋 **Procedimentos específicos:**
• Levantamento radiológico completo
• Classificação dos materiais contaminados
• Plano de proteção radiológica
• Licenciamento específico para transporte
• Destinação em repositórios autorizados

⚖️ **Regulamentação:** CNEN e Resolução ANP 817/2020`,
        keywords: ['norm', 'material radioativo', 'radioatividade natural', 'materiais radioativos']
    },
    
    'bens reversiveis': {
        response: `🔄 **Bens Reversíveis no Descomissionamento**

📋 **Definição:**
• Bens que devem retornar à União ao final da concessão
• Incluem infraestrutura, equipamentos e instalações
• Diferem dos bens não-reversíveis (consumíveis, etc.)

🎯 **Opções de destinação:**
• **Reversão:** Transferência gratuita para a União
• **Alienação:** Venda autorizada pela ANP
• **Aproveitamento:** Uso em outras atividades do concessionário
• **Descarte:** Destinação ambientalmente adequada

📋 **Processo de avaliação:**
• Inventário completo dos bens reversíveis
• Avaliação do estado de conservação
• Análise de viabilidade de reaproveitamento
• Proposta fundamentada à ANP
• Aprovação prévia obrigatória

⚖️ **Base legal:** Art. 2º, III e Arts. 52º-55º da Resolução ANP 817/2020`,
        keywords: ['bens reversíveis', 'reversão bens', 'bens da união', 'inventário bens']
    },
    
    'instalacoes compartilhadas': {
        response: `🏗️ **Instalações Compartilhadas no Descomissionamento**

🤝 **Definição:**
• Instalações utilizadas por múltiplos concessionários
• Infraestrutura comum entre diferentes blocos ou campos
• Requer coordenação entre operadores

📋 **Aspectos especiais:**
• Acordo entre operadores sobre responsabilidades
• Cronograma coordenado de descomissionamento
• Divisão proporcional de custos
• Aprovação conjunta dos PDI pelos envolvidos
• Garantias solidárias quando aplicável

🔧 **Exemplos comuns:**
• Sistemas de escoamento compartilhados
• Infraestrutura de apoio logístico
• Sistemas de tratamento de efluentes
• Bases de apoio e helipontos

⚖️ **Base legal:** Art. 2º, XIII e Arts. 53º-54º da Resolução ANP 817/2020`,
        keywords: ['instalações compartilhadas', 'infraestrutura compartilhada', 'operadores múltiplos']
    },
    
    'abandono poços': {
        response: `🕳️ **Abandono de Poços no Descomissionamento**

🔧 **Procedimentos obrigatórios:**
• Remoção de equipamentos de superfície e subsuperfície
• Isolamento permanente com cimento das zonas produtoras
• Tamponamento de acordo com normas técnicas da ANP
• Corte da cabeça do poço abaixo do leito marinho/solo
• Documentação completa do abandono

📋 **Etapas principais:**
• Preparação e limpeza do poço
• Instalação de tampões de cimento
• Teste de integridade dos tampões
• Remoção da árvore de natal e equipamentos
• Corte e remoção do condutor
• Nivelamento com o fundo do mar/solo

📊 **Monitoramento:**
• Verificação da integridade dos tampões
• Monitoramento de possíveis vazamentos
• Relatórios periódicos à ANP

⚖️ **Base legal:** Resolução ANP 817/2020 e normas técnicas ANP`,
        keywords: ['abandono poços', 'abandono poço', 'tamponamento poços', 'tamponamento', 'isolamento poços', 'poços abandonados', 'poço tamponado', 'isolamento poço', 'fechamento poços', 'vedação poços', 'cimentação poços', 'cimentação poço']
    },
    
    'garantias descomissionamento': {
        response: `💰 **Garantias para Descomissionamento**

📋 **Tipos de garantia aceitos:**
• Carta de fiança bancária
• Seguro garantia
• Títulos da dívida pública
• Fundo específico de descomissionamento
• Garantia corporativa (casos especiais)

💵 **Valores das garantias:**
• **Fase conceitual:** 25% do custo estimado
• **Fase executiva:** 100% do custo aprovado
• Atualização anual conforme inflação
• Revisão a cada 5 anos ou quando solicitado

🎯 **Finalidade:**
• Assegurar recursos para descomissionamento
• Proteger a União contra inadimplência
• Garantir cumprimento das obrigações ambientais
• Cobrir custos de emergência

⚖️ **Base legal:** Regulamentação específica de garantias (não especificada na ANP 817/2020)`,
        keywords: ['garantias descomissionamento', 'seguro descomissionamento', 'fiança bancária']
    },
    
    // === DOCUMENTOS E RELATÓRIOS ===
    'pdi plano': {
        response: `📋 **PDI - Plano de Descomissionamento de Instalação**

📝 **Conteúdo obrigatório:**
• Caracterização da instalação
• Cronograma de atividades
• Metodologias de descomissionamento
• Planos de segurança e meio ambiente
• Destinação de resíduos e equipamentos

⚖️ **Base legal:** Anexo I da Resolução ANP 817/2020`,
        keywords: ['pdi', 'plano descomissionamento', 'plano de descomissionamento', 'plano descomissionamento instalação', 'plano de descomissionamento de instalação', 'pdi plano', 'plano pdi']
    },
    
    'rdi relatorio': {
        response: `📊 **RDI - Relatório de Dados de Instalação**

📋 **Informações contidas:**
• Histórico operacional da instalação
• Inventário de equipamentos e estruturas
• Registro de acidentes ambientais
• Caracterização de passivos ambientais
• Dados técnicos da instalação

🎯 **Finalidade:** Base para elaboração do PDI`,
        keywords: ['rdi', 'relatório dados instalação', 'relatório de dados instalação', 'relatorio dados instalacao', 'inventário equipamentos', 'rdi relatório', 'dados instalação', 'relatório dados']
    },
    
    // === PRAZOS ESPECÍFICOS ===
    'prazo rdi': {
        response: `⏰ **Prazo do RDI - Relatório de Dados de Instalação**

📅 **Cronograma típico:**
• **Elaboração:** 3-6 meses (depende da complexidade)
• **Revisão interna:** 30 dias
• **Submissão à ANP:** Até 60 dias antes do fim da concessão
• **Análise pela ANP:** 60-90 dias

⚠️ **Importante:** Deve ser entregue ANTES do PDI`,
        keywords: ['prazo rdi', 'cronograma rdi', 'tempo rdi', 'quando entregar rdi']
    },
    
    'prazo pdi': {
        response: `⏰ **Prazos do PDI - Diferenciados por Tipo e Localização**

📅 **PDI CONCEITUAL:**
• **Instalações marítimas:** Até 5 anos antes do fim da concessão
• **Instalações terrestres:** Até 2 anos antes do fim da concessão
• **Base legal:** Arts. 10º e 11º da ANP 817/2020

📅 **PDI EXECUTIVO:**
• **Todas as instalações:** Até 2 anos antes do início do descomissionamento
• **Pré-requisito:** PDI Conceitual aprovado pela ANP
• **Base legal:** Art. 13º da ANP 817/2020

🔄 **CRONOGRAMA TÍPICO:**
• **Elaboração conceitual:** 6-8 meses
• **Análise ANP (conceitual):** 6-12 meses
• **Elaboração executiva:** 8-12 meses
• **Análise ANP (executiva):** 6-12 meses

⚖️ **Observação importante:** Prazos diferenciados refletem maior complexidade das instalações marítimas`,
        keywords: ['prazo pdi', 'cronograma pdi', 'tempo pdi', 'quando entregar pdi']
    },
    
    'prazo descomissionamento': {
        response: `⏰ **Prazos para Descomissionamento Completo**

📅 **Cronograma geral:**
• **Planejamento:** 2-3 anos
• **Execução total:** 3-7 anos (varia por instalação)
• **Remoção equipamentos:** 6-18 meses
• **Descontaminação:** 1-2 anos
• **Restauração:** 2-3 anos
• **Monitoramento:** 5-10 anos

⚠️ **Fatores que influenciam:** Tamanho, localização, contaminação`,
        keywords: ['prazo descomissionamento', 'tempo descomissionamento', 'cronograma descomissionamento', 'duração descomissionamento']
    },
    
    // === ETAPAS DETALHADAS COM PRAZOS ===
    'etapas descomissionamento': {
        response: `📋 **Etapas Completas do Descomissionamento com Prazos**

**🔄 FASE 1 - PLANEJAMENTO (2-3 anos)**
• Elaboração do RDI (3-6 meses)
• Elaboração do PDI (6-12 meses)
• Aprovações regulatórias (6-18 meses)

**🏗️ FASE 2 - EXECUÇÃO (3-7 anos)**
• Remoção de equipamentos (6-18 meses)
• Limpeza e descontaminação (1-2 anos)
• Restauração ambiental (2-3 anos)

**📊 FASE 3 - MONITORAMENTO (5-10 anos)**
• Monitoramento pós-descomissionamento
• Relatórios periódicos à ANP`,
        keywords: ['etapas descomissionamento', 'fases descomissionamento', 'cronograma etapas', 'processo completo descomissionamento', 'etapas completas', 'fases completas', 'processo etapas']
    },
    
    'como fazer descomissionamento': {
        response: `🛠️ **Como Fazer Descomissionamento - Passo a Passo**

**📋 PASSO 1 - DOCUMENTAÇÃO**
• Contratar consultoria especializada
• Elaborar RDI (3-6 meses)
• Elaborar PDI (6-12 meses)
• Obter aprovação da ANP

**🔧 PASSO 2 - EXECUÇÃO**
• Mobilizar equipes e equipamentos
• Remover equipamentos (6-18 meses)
• Fazer descontaminação (1-2 anos)
• Restaurar área (2-3 anos)

**📊 PASSO 3 - FINALIZAÇÃO**
• Monitorar continuamente (5-10 anos)
• Emitir relatórios semestrais/anuais
• Manter responsabilidade pós-descomissionamento`,
        keywords: ['como fazer descomissionamento', 'passo a passo descomissionamento', 'processo descomissionamento', 'método descomissionamento', 'como descomissionar', 'fazer descomissionamento', 'passos descomissionamento']
    },
    
    // === PROFISSIONAIS HABILITADOS ===
    'profissional descomissionamento': {
        response: `👨‍🔬 **Profissionais Habilitados para Estudos de Descomissionamento**

**🎓 RESPONSÁVEL TÉCNICO:**
• Engenheiro de Petróleo (CREA)
• Engenheiro Ambiental (CREA)
• Geólogo (CREA)

**👥 EQUIPE MULTIDISCIPLINAR:**
• Engenheiro de Segurança
• Biólogo (análises ambientais)
• Oceanógrafo (ambiente marinho)
• Engenheiro Civil (estruturas)
• Químico (análises laboratoriais)

**📋 REQUISITOS:**
• Registro no conselho profissional
• Experiência mínima de 5 anos
• Curso de especialização em petróleo/meio ambiente
• ART (Anotação de Responsabilidade Técnica)`,
        keywords: ['profissional descomissionamento', 'responsável técnico', 'quem pode fazer', 'consultor descomissionamento', 'engenheiro habilitado', 'profissionais habilitados', 'quem pode elaborar', 'técnico habilitado']
    },
    
    'consultor descomissionamento': {
        response: `🏢 **Como Escolher Consultor para Descomissionamento**

**✅ CRITÉRIOS DE SELEÇÃO:**
• Registro CREA ativo
• Portfolio em descomissionamento
• Equipe multidisciplinar
• Experiência com ANP
• Certificações ambientais (ISO 14001)

**📋 DOCUMENTAÇÃO NECESSÁRIA:**
• Proposta técnica detalhada
• Cronograma de execução
• Orçamento discriminado
• Currículo da equipe
• Certificados e registros

**💰 CUSTOS TÍPICOS:**
• RDI: R$ 50.000 - 200.000
• PDI: R$ 200.000 - 800.000
• Acompanhamento: R$ 50.000/ano`,
        keywords: ['consultor descomissionamento', 'empresa consultoria', 'como contratar', 'custo consultoria', 'preço descomissionamento', 'consultoria especializada', 'contratar consultor', 'empresa especializada']
    },
    
    // === CUSTOS E ORÇAMENTOS ===
    'custo descomissionamento': {
        response: `💰 **Custos de Descomissionamento - Estimativas**

**📊 CUSTOS POR FASE:**
• **Estudos (RDI+PDI):** R$ 250.000 - 1.000.000
• **Remoção equipamentos:** R$ 5-50 milhões
• **Descontaminação:** R$ 2-20 milhões  
• **Restauração:** R$ 1-10 milhões
• **Monitoramento (10 anos):** R$ 500.000 - 2 milhões

**🔍 FATORES QUE INFLUENCIAM:**
• Tamanho da instalação
• Localização (terra/mar)
• Grau de contaminação
• Complexidade logística
• Condições meteorológicas

**💡 DICA:** Reservar 10-15% do CAPEX total para descomissionamento`,
        keywords: ['custo descomissionamento', 'custo de descomissionamento', 'preço descomissionamento', 'preco descomissionamento', 'orçamento descomissionamento', 'orcamento descomissionamento', 'investimento descomissionamento']
    }
};

// Glossário expandido de siglas
const glossary = {
    'anp': 'Agência Nacional do Petróleo, Gás Natural e Biocombustíveis',
    'ibama': 'Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis',
    'conama': 'Conselho Nacional do Meio Ambiente',
    'pnrs': 'Política Nacional de Resíduos Sólidos',
    'eia': 'Estudo de Impacto Ambiental',
    'rima': 'Relatório de Impacto Ambiental',
    'aap': 'Avaliação Ambiental Preliminar',
    'pca': 'Plano de Controle Ambiental',
    'pgr': 'Plano de Gerenciamento de Riscos',
    'snuc': 'Sistema Nacional de Unidades de Conservação',
    'sisnama': 'Sistema Nacional do Meio Ambiente',
    'apa': 'Área de Proteção Ambiental',
    'rppn': 'Reserva Particular do Patrimônio Natural',
    'arie': 'Área de Relevante Interesse Ecológico',
    'flona': 'Floresta Nacional',
    'resex': 'Reserva Extrativista',
    'rds': 'Reserva de Desenvolvimento Sustentável',
    'mma': 'Ministério do Meio Ambiente',
    'icmbio': 'Instituto Chico Mendes de Conservação da Biodiversidade',
    'lp': 'Licença Prévia',
    'li': 'Licença de Instalação',
    'lo': 'Licença de Operação',
    'apo': 'Autorização Prévia de Operação',
    'car': 'Cadastro Ambiental Rural',
    'pra': 'Programa de Regularização Ambiental',
    'app': 'Área de Preservação Permanente',
    'rl': 'Reserva Legal',
    'cra': 'Cota de Reserva Ambiental',
    'iso': 'Organização Internacional para Padronização',
    'sga': 'Sistema de Gestão Ambiental',
    'pdca': 'Plan-Do-Check-Act (Planejar-Fazer-Verificar-Agir)',
    'ohsas': 'Occupational Health and Safety Assessment Series',
    'nbr': 'Norma Brasileira',
    'abnt': 'Associação Brasileira de Normas Técnicas',
    'ejd': 'Estudo de Justificativas para o Descomissionamento',
    'tld': 'Teste de Longa Duração',
    'spa': 'Sistema de Produção Antecipada',
    'norm': 'Material Radioativo de Ocorrência Natural',
    'cnen': 'Comissão Nacional de Energia Nuclear',
    'rdi': 'Relatório de Dados de Instalação',
    'pdi': 'Plano de Descomissionamento de Instalação',
    'prad': 'Plano de Recuperação de Áreas Degradadas',
    'rca': 'Relatório de Controle Ambiental',
    'pba': 'Plano Básico Ambiental',
    'pcp': 'Plano de Controle da Poluição',
    'pgas': 'Plano de Gestão Ambiental Simplificado',
    'tcra': 'Termo de Compromisso de Recuperação Ambiental',
    'tac': 'Termo de Ajustamento de Conduta'
};

function findBestMatch(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Verifica se é uma pergunta sobre sigla (melhor detecção)
    const siglaPatterns = [
        /(?:o que (?:é|significa a?)|que (?:é|significa a?)|significado d[aeo]?|define)\s+([a-z]+)/i,
        /^([a-z]+)\s*\?*$/i, // sigla sozinha
        /sigla\s+([a-z]+)/i
    ];
    
    for (const pattern of siglaPatterns) {
        const siglaMatch = message.match(pattern);
        if (siglaMatch) {
            const sigla = siglaMatch[1].toLowerCase();
            if (glossary[sigla]) {
                return {
                    type: 'sigla',
                    response: `🔤 **${sigla.toUpperCase()}** significa: ${glossary[sigla]}`
                };
            }
        }
    }
    
    // Sistema de pontuação para encontrar melhor correspondência
    let bestMatch = null;
    let highestScore = 0;
    
    for (const [key, data] of Object.entries(knowledgeBase)) {
        let score = 0;
        let keywordMatches = 0;
        
        for (const keyword of data.keywords) {
            const keywordLower = keyword.toLowerCase();
            
            // Pontuação por correspondência exata
            if (message.includes(keywordLower)) {
                keywordMatches++;
                // Mais pontos para palavras mais específicas
                if (keywordLower.length > 3) {
                    score += keywordLower.length;
                } else {
                    score += 2;
                }
                
                // Bonus se a palavra está no início da frase
                if (message.startsWith(keywordLower)) {
                    score += 5;
                }
                
                // Bonus para correspondência exata completa
                if (message === keywordLower || message === keywordLower + '?') {
                    score += 10;
                }
            }
            
            // Pontuação parcial para palavras que contém o termo
            const words = message.split(' ');
            for (const word of words) {
                if (word.length > 2 && keywordLower.includes(word)) {
                    score += 1;
                }
            }
        }
        
        // Só considera se teve pelo menos uma correspondência de palavra-chave
        if (keywordMatches > 0 && score > highestScore) {
            highestScore = score;
            bestMatch = {
                type: 'knowledge',
                response: data.response,
                key: key
            };
        }
    }
    
    if (bestMatch) {
        return bestMatch;
    }
    
    // Verifica palavras-chave gerais
    if (message.includes('prazo')) {
        return {
            type: 'prazo',
            response: '⏰ Para consultar prazos específicos, preciso saber sobre qual regulamentação você está perguntando. Pode especificar? (Ex: PNRS, ANP 817, etc.)'
        };
    }
    
    // Verifica algumas palavras isoladas importantes
    if (message === 'anp' || message === 'anp?') {
        return {
            type: 'sigla',
            response: '🔤 **ANP** significa: Agência Nacional do Petróleo, Gás Natural e Biocombustíveis'
        };
    }
    
    return null;
}

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
        return res.json({ 
            success: true, 
            response: 'Por favor, digite sua pergunta sobre regulamentações ambientais.' 
        });
    }
    
    // Busca resposta na base de conhecimento
    const match = findBestMatch(message);
    
    if (match) {
        return res.json({ 
            success: true, 
            response: match.response 
        });
    }
    
    // Resposta padrão quando não encontra correspondência
    const defaultResponse = `❓ Não encontrei informações específicas para sua pergunta.

🛠️ DESCOMPETRO pode ajudar com:
• Resolução ANP 817/2020 (EJD, PDI, RDI)
• Descomissionamento (prazos, etapas, custos)
• Aspectos técnicos (TLD, SPA, NORM, poços)
• Glossário das siglas de descomissionamento
• Profissionais habilitados e garantias

💬 **Não encontrou o que procura?** 
Clique no botão do WhatsApp para enviar uma sugestão!`;
    
    res.json({ success: true, response: defaultResponse });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log('Servidor rodando na porta ' + PORT);
        console.log('Abra: http://localhost:' + PORT);
    });
}

// Para Vercel
module.exports = app;
