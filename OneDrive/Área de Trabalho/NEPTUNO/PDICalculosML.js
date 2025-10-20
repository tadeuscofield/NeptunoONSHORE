// 🤖 PDI - INTEGRAÇÃO MACHINE LEARNING
// Funções para chamar API ML e usar previsões inteligentes

const ML_API_URL = 'http://localhost:5000/api/ml';

// ==========================================
// 1. PREVISÃO DE CUSTOS COM ML
// ==========================================

const calcularCustosComML = async (pdiData) => {
  try {
    const response = await fetch(`${ML_API_URL}/predict/custo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_pocos: pdiData.inventario?.pocos?.length || 0,
        profundidade_media: calcularProfundidadeMedia(pdiData),
        lamina_agua: parseFloat(pdiData.referencia?.profundidade || 0),
        distancia_costa: parseFloat(pdiData.referencia?.distanciaCosta || 0),
        bacia: pdiData.referencia?.bacia || 'Bacia de Campos',
        tipo_instalacao: mapearTipoInstalacao(pdiData),
        tecnica: pdiData.alternativas?.[0]?.id || 'remocao_completa'
      })
    });

    if (!response.ok) {
      throw new Error('API ML offline');
    }

    const resultado = await response.json();

    return {
      success: true,
      metodo: 'ml',
      custo_total: resultado.custo_total_usd,
      custo_min: resultado.custo_min_usd,
      custo_max: resultado.custo_max_usd,
      margem_erro: resultado.margem_erro_pct,
      confianca: resultado.confianca,
      fonte: resultado.fonte
    };

  } catch (error) {
    console.warn('[ML] API offline, usando cálculo paramétrico:', error.message);
    // Fallback para cálculo tradicional
    return {
      success: false,
      metodo: 'parametrico',
      error: error.message
    };
  }
};

// ==========================================
// 2. SUGESTÃO INTELIGENTE DE TÉCNICAS
// ==========================================

const sugerirTecnicaML = async (pdiData) => {
  try {
    const response = await fetch(`${ML_API_URL}/suggest/tecnica`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_pocos: pdiData.inventario?.pocos?.length || 0,
        profundidade_media: calcularProfundidadeMedia(pdiData),
        lamina_agua: parseFloat(pdiData.referencia?.profundidade || 0),
        distancia_costa: parseFloat(pdiData.referencia?.distanciaCosta || 0),
        bacia: pdiData.referencia?.bacia || 'Bacia de Campos',
        tipo_instalacao: mapearTipoInstalacao(pdiData)
      })
    });

    const resultado = await response.json();

    return {
      success: true,
      tecnica_recomendada: resultado.tecnica_principal,
      confianca: resultado.confianca_principal,
      alternativas: resultado.alternativas,
      fonte: resultado.fonte
    };

  } catch (error) {
    console.warn('[ML] Sugestão de técnica offline:', error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// 3. DETECÇÃO DE ANOMALIAS
// ==========================================

const detectarAnomalias = async (pdiData, custoCalculado, duracaoMeses) => {
  try {
    const response = await fetch(`${ML_API_URL}/detect/anomaly`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_pocos: pdiData.inventario?.pocos?.length || 0,
        custo_total_usd: custoCalculado,
        duracao_meses: duracaoMeses,
        profundidade_media: calcularProfundidadeMedia(pdiData),
        lamina_agua: parseFloat(pdiData.referencia?.profundidade || 0)
      })
    });

    const resultado = await response.json();

    if (resultado.is_anomaly) {
      // Exibir alertas ao usuário
      return {
        success: true,
        anomalia_detectada: true,
        alertas: resultado.alertas,
        mensagem: resultado.mensagem,
        score: resultado.score
      };
    }

    return {
      success: true,
      anomalia_detectada: false,
      mensagem: 'Valores dentro do padrão esperado'
    };

  } catch (error) {
    console.warn('[ML] Detecção de anomalias offline:', error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// 4. PREVISÃO DE APROVAÇÃO ANP
// ==========================================

const preverAprovacaoANP = async (pdiData, custoTotal, duracaoMeses) => {
  try {
    // Calcular completude (% de campos preenchidos)
    const completude = calcularCompletudePDI(pdiData);

    // Contar riscos altos
    const numRiscosAltos = (pdiData.riscos || []).filter(r =>
      r.probabilidade >= 4 || r.impacto >= 4
    ).length;

    // Calcular complexidade
    const complexidade = calcularComplexidade(pdiData);

    const response = await fetch(`${ML_API_URL}/predict/aprovacao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completude_pct: completude,
        num_riscos_altos: numRiscosAltos,
        complexidade: complexidade,
        custo_total_usd: custoTotal,
        duracao_meses: duracaoMeses
      })
    });

    const resultado = await response.json();

    return {
      success: true,
      probabilidade_aprovacao: resultado.probabilidade_aprovacao,
      status: resultado.status,
      tempo_analise: resultado.tempo_analise_dias,
      recomendacoes: resultado.recomendacoes,
      confianca_modelo: resultado.confianca_modelo
    };

  } catch (error) {
    console.warn('[ML] Previsão de aprovação offline:', error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// 5. PREVISÃO DE DURAÇÃO
// ==========================================

const preverDuracaoML = async (pdiData) => {
  try {
    const response = await fetch(`${ML_API_URL}/predict/duracao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_pocos: pdiData.inventario?.pocos?.length || 0,
        lamina_agua: parseFloat(pdiData.referencia?.profundidade || 0),
        tecnica: pdiData.alternativas?.[0]?.id || 'remocao_completa',
        tipo_instalacao: mapearTipoInstalacao(pdiData),
        distancia_costa: parseFloat(pdiData.referencia?.distanciaCosta || 0)
      })
    });

    const resultado = await response.json();

    return {
      success: true,
      duracao_meses: resultado.duracao_meses,
      duracao_min: resultado.duracao_min,
      duracao_max: resultado.duracao_max,
      confianca: resultado.confianca
    };

  } catch (error) {
    console.warn('[ML] Previsão de duração offline:', error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// 6. PREVISÃO COMPLETA (TODOS OS MODELOS)
// ==========================================

const preverTudoComML = async (pdiData) => {
  try {
    // Preparar dados completos
    const payload = {
      num_pocos: pdiData.inventario?.pocos?.length || 0,
      profundidade_media: calcularProfundidadeMedia(pdiData),
      lamina_agua: parseFloat(pdiData.referencia?.profundidade || 0),
      distancia_costa: parseFloat(pdiData.referencia?.distanciaCosta || 0),
      bacia: pdiData.referencia?.bacia || 'Bacia de Campos',
      tipo_instalacao: mapearTipoInstalacao(pdiData),
      tecnica: pdiData.alternativas?.[0]?.id || 'remocao_completa',
      completude_pct: calcularCompletudePDI(pdiData),
      num_riscos_altos: (pdiData.riscos || []).filter(r =>
        r.probabilidade >= 4 || r.impacto >= 4
      ).length,
      complexidade: calcularComplexidade(pdiData),
      custo_total_usd: 0, // Será preenchido após calcular
      duracao_meses: 0    // Será preenchido após calcular
    };

    const response = await fetch(`${ML_API_URL}/predict/completo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const resultado = await response.json();

    return {
      success: true,
      previsoes: resultado,
      timestamp: resultado.timestamp
    };

  } catch (error) {
    console.warn('[ML] Previsão completa offline:', error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

const calcularProfundidadeMedia = (pdiData) => {
  const pocos = pdiData.inventario?.pocos || [];
  if (pocos.length === 0) return 2000; // Default

  const soma = pocos.reduce((acc, poco) =>
    acc + (parseFloat(poco.profundidade) || 0), 0
  );

  return soma / pocos.length;
};

const mapearTipoInstalacao = (pdiData) => {
  const instalacoes = pdiData.inventario?.instalacoes || [];
  if (instalacoes.length === 0) return 'plataforma_fixa';

  // Priorizar FPSO se existir
  const temFPSO = instalacoes.some(i =>
    i.tipo?.toLowerCase().includes('fpso')
  );
  if (temFPSO) return 'fpso';

  // Depois manifold
  const temManifold = instalacoes.some(i =>
    i.tipo?.toLowerCase().includes('manifold')
  );
  if (temManifold) return 'manifold';

  return 'plataforma_fixa';
};

const calcularCompletudePDI = (pdiData) => {
  let camposPreenchidos = 0;
  let camposTotal = 0;

  // Step 1: Dados gerais (12 campos)
  camposTotal += 12;
  if (pdiData.referencia?.nomeOperador) camposPreenchidos++;
  if (pdiData.referencia?.cnpj) camposPreenchidos++;
  if (pdiData.referencia?.bacia) camposPreenchidos++;
  if (pdiData.referencia?.tipoPDI) camposPreenchidos++;
  if (pdiData.referencia?.tipoInstalacao) camposPreenchidos++;
  if (pdiData.referencia?.latitude) camposPreenchidos++;
  if (pdiData.referencia?.longitude) camposPreenchidos++;
  if (pdiData.referencia?.profundidade) camposPreenchidos++;
  if (pdiData.referencia?.distanciaCosta) camposPreenchidos++;
  if (pdiData.referencia?.dataInicio) camposPreenchidos++;
  if (pdiData.referencia?.dataTermino) camposPreenchidos++;
  if (pdiData.referencia?.bloco) camposPreenchidos++;

  // Step 2: Alternativas (1 campo)
  camposTotal += 1;
  if (pdiData.alternativas && pdiData.alternativas.length > 0) camposPreenchidos++;

  // Step 3: Inventário (2 campos)
  camposTotal += 2;
  if (pdiData.inventario?.pocos?.length > 0) camposPreenchidos++;
  if (pdiData.inventario?.instalacoes?.length > 0) camposPreenchidos++;

  // Step 4: Cronograma (1 campo)
  camposTotal += 1;
  if (pdiData.cronograma && pdiData.cronograma.length > 0) camposPreenchidos++;

  // Step 5: Custos (1 campo)
  camposTotal += 1;
  if (pdiData.custos?.total > 0) camposPreenchidos++;

  // Step 6: Riscos (1 campo)
  camposTotal += 1;
  if (pdiData.riscos && pdiData.riscos.length > 0) camposPreenchidos++;

  return (camposPreenchidos / camposTotal) * 100;
};

const calcularComplexidade = (pdiData) => {
  const numPocos = pdiData.inventario?.pocos?.length || 0;
  const laminaAgua = parseFloat(pdiData.referencia?.profundidade || 0);
  const distanciaCosta = parseFloat(pdiData.referencia?.distanciaCosta || 0);

  return (numPocos / 10) + (laminaAgua / 2000) + (distanciaCosta / 300);
};

// ==========================================
// VERIFICAR STATUS DA API
// ==========================================

const verificarStatusML = async () => {
  try {
    const response = await fetch(`${ML_API_URL}/health`);
    const status = await response.json();

    console.log('[ML] Status da API:', status);

    return {
      online: true,
      modelos: status.modelos_carregados
    };

  } catch (error) {
    console.warn('[ML] API offline:', error.message);
    return {
      online: false,
      modelos: {}
    };
  }
};

// ==========================================
// EXPORTAR FUNÇÕES
// ==========================================

window.PDICalculosML = {
  calcularCustosComML,
  sugerirTecnicaML,
  detectarAnomalias,
  preverAprovacaoANP,
  preverDuracaoML,
  preverTudoComML,
  verificarStatusML,

  // Funções auxiliares também exportadas
  calcularProfundidadeMedia,
  mapearTipoInstalacao,
  calcularCompletudePDI,
  calcularComplexidade
};

// Verificar status ao carregar
verificarStatusML().then(status => {
  if (status.online) {
    console.log('✅ [ML] API Machine Learning conectada!');
  } else {
    console.log('⚠️ [ML] API offline - usando cálculos paramétricos');
  }
});
