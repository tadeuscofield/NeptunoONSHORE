// Serverless function para o endpoint /api/chat no Vercel
export default function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Apenas POST é permitido
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Base de conhecimento expandida do chatbot
    let resposta = '';
    const msgLower = message.toLowerCase();

    if (msgLower.includes('descomissionamento') || msgLower.includes('descomissionamento')) {
        resposta = `**🛠️ DESCOMISSIONAMENTO - ANP 817/2020**

**📋 Definição:**
Descomissionamento é o processo de desativação de instalações de petróleo e gás ao final de sua vida útil, seguindo as diretrizes da Resolução ANP 817/2020.

**⏰ Prazos Principais:**
• **RDI (Relatório de Descomissionamento de Instalações):** 2 anos antes do término da concessão
• **PDI (Plano de Descomissionamento de Instalações):** 1 ano antes do término da concessão
• **Execução:** Conforme cronograma aprovado pela ANP

**🎯 Objetivos:**
• Remoção completa das instalações
• Restauração ambiental da área
• Segurança das atividades marítimas
• Compliance regulatório com ANP 817/2020`;

    } else if (msgLower.includes('rdi')) {
        resposta = `**📋 RDI - Relatório de Descomissionamento de Instalações**

**📌 O que é:**
Documento técnico que apresenta diagnóstico das condições atuais das instalações e estudos preliminares para o descomissionamento.

**⏰ Prazo:**
• Deve ser entregue **2 anos antes** do término da concessão/autorização

**📎 Conteúdo principal:**
• Diagnóstico atual das instalações
• Avaliação de riscos
• Estudos de alternativas de descomissionamento
• Cronograma preliminar
• Estimativa de custos
• Impactos ambientais preliminares

**🔤 Base legal:** Resolução ANP 817/2020, Art. 8º`;

    } else if (msgLower.includes('pdi')) {
        resposta = `**📌 PDI - Plano de Descomissionamento de Instalações**

**📌 O que é:**
Documento executivo detalhado com o planejamento completo das atividades de descomissionamento.

**⏰ Prazo:**
• Deve ser entregue **1 ano antes** do término da concessão/autorização

**📎 Conteúdo principal:**
• Metodologia detalhada de remoção
• Cronograma executivo
• Análise de riscos operacionais
• Medidas de segurança
• Plano de gestão de resíduos
• Estudos ambientais detalhados
• Custos finais e garantias

**🔤 Base legal:** Resolução ANP 817/2020, Art. 9º`;

    } else if (msgLower.includes('anp') || msgLower.includes('817')) {
        resposta = `**⚖️ RESOLUÇÃO ANP 817/2020**

**📌 Sobre:**
Estabelece os procedimentos para descomissionamento de instalações de exploração e produção de petróleo e gás natural.

**🎯 Principais pontos:**
• Responsabilidades do operador
• Prazos para entrega de documentos
• Critérios técnicos de remoção
• Requisitos ambientais
• Garantias financeiras

**📍 Aplicação:**
• Plataformas marítimas
• Instalações terrestres
• Dutos e equipamentos submarinos
• Poços de petróleo e gás

**📎 Documentos principais:** RDI e PDI`;

    } else if (msgLower.includes('prazo') || msgLower.includes('cronograma')) {
        resposta = `**⏰ PRAZOS DE DESCOMISSIONAMENTO ANP 817/2020**

**📋 Cronograma obrigatório:**

**2 anos antes do término:**
• Entrega do RDI (Relatório de Descomissionamento)

**1 ano antes do término:**
• Entrega do PDI (Plano de Descomissionamento)

**No término da concessão:**
• Início das atividades de descomissionamento
• Conforme cronograma aprovado pela ANP

**⚠️ Importante:**
• Prazos são improrrogáveis
• Descumprimento gera multas e sanções
• ANP pode exigir adequações nos documentos`;

    } else if (msgLower.includes('custo') || msgLower.includes('garantia') || msgLower.includes('financeiro')) {
        resposta = `**💰 CUSTOS E GARANTIAS FINANCEIRAS**

**🎯 Estimativa de custos deve incluir:**
• Remoção de instalações
• Limpeza ambiental
• Destinação de resíduos
• Monitoramento pós-descomissionamento
• Contingências (mín. 10%)

**📎 Garantias financeiras:**
• Seguro garantia
• Fiança bancária
• Fundo de descomissionamento

**⚖️ Base legal:**
• Resolução ANP 817/2020
• Lei do Petróleo (Lei 9.478/97)

**🔤 Valor:** Conforme estimativas aprovadas pela ANP no PDI`;

    } else if (msgLower.includes('meio ambiente') || msgLower.includes('ambiental') || msgLower.includes('impacto')) {
        resposta = `**🌍 ASPECTOS AMBIENTAIS DO DESCOMISSIONAMENTO**

**📋 Estudos obrigatórios:**
• Avaliação de Impacto Ambiental
• Diagnóstico da fauna e flora
• Qualidade da água/solo
• Gestão de resíduos perigosos

**🎯 Objetivos ambientais:**
• Restauração do ecossistema
• Remoção de contaminantes
• Proteção da biodiversidade
• Monitoramento de longo prazo

**📌 Licenciamento:**
• Licença ambiental específica
• Aprovação pelos órgãos competentes (IBAMA/órgãos estaduais)

**⚖️ Legislação aplicável:**
• Resolução ANP 817/2020
• Legislação ambiental (CONAMA)
• Política Nacional de Resíduos Sólidos`;

    } else if (msgLower.includes('glossário') || msgLower.includes('sigla')) {
        resposta = `**🔤 GLOSSÁRIO - SIGLAS DE DESCOMISSIONAMENTO**

**📋 Principais siglas:**
• **ANP** - Agência Nacional do Petróleo
• **RDI** - Relatório de Descomissionamento de Instalações  
• **PDI** - Plano de Descomissionamento de Instalações
• **FPSO** - Floating Production Storage and Offloading
• **UEP** - Unidade Estacionária de Produção

**🌍 Ambientais:**
• **IBAMA** - Instituto Brasileiro do Meio Ambiente
• **AIA** - Avaliação de Impacto Ambiental
• **PNRS** - Política Nacional de Resíduos Sólidos
• **CONAMA** - Conselho Nacional do Meio Ambiente

**⚖️ Jurídicas:**
• **TAC** - Termo de Ajustamento de Conduta
• **MP** - Ministério Público`;

    } else if (msgLower.includes('olá') || msgLower.includes('oi') || msgLower.includes('ajuda') || msgLower.includes('help')) {
        resposta = `Olá! Sou o **DESCOMPETRO**, especialista em descomissionamento ANP 817/2020! 🛠️

**🎯 Posso ajudar com:**
• Resolução ANP 817/2020
• RDI e PDI (prazos e conteúdo)
• Custos e garantias financeiras
• Aspectos ambientais
• Glossário de siglas
• Cronogramas e prazos

**❓ Digite sua dúvida sobre descomissionamento!**`;

    } else {
        resposta = `Olá! Sou especialista em **descomissionamento ANP 817/2020**! 🛠️

**🔍 Não encontrei informações específicas sobre "${message}"**

**💬 Tente perguntar sobre:**
• "**descomissionamento**" - Conceitos gerais
• "**RDI**" - Relatório de Descomissionamento  
• "**PDI**" - Plano de Descomissionamento
• "**prazos**" - Cronogramas ANP 817/2020
• "**custos**" - Garantias financeiras
• "**meio ambiente**" - Aspectos ambientais
• "**glossário**" - Siglas do setor

💬 **Não encontrou o que procura?** 
Clique no botão do WhatsApp para enviar uma sugestão!`;
    }

    res.json({ success: true, response: resposta });
}