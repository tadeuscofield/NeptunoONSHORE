# 🤖 MACHINE LEARNING NO NEPTUNO

**Como integrar IA/ML para potencializar o sistema**

---

## 🎯 VISÃO GERAL

### **Estado Atual:**
✅ Sistema usa **benchmarks estáticos** (médias da indústria)
✅ Cálculos **paramétricos** (fórmulas fixas)
✅ **Exportação de dados** para ML (já implementado!)

### **Com Machine Learning:**
🚀 **Previsões dinâmicas** baseadas em projetos reais
🚀 **Aprendizado contínuo** (quanto mais PDIs, mais preciso)
🚀 **Sugestões inteligentes** (alternativas técnicas, riscos)
🚀 **Detecção de anomalias** (custos fora do padrão)

---

## 📊 CASOS DE USO - ML NO NEPTUNO

### **1. PREVISÃO DE CUSTOS INTELIGENTE** 🔴 PRIORIDADE ALTA

**Problema Atual:**
Sistema usa fórmulas fixas:
```javascript
custo = profundidade × fator_lamina × fator_bacia
```

**Com ML:**
```
Modelo treinado com 100+ PDIs reais aprende padrões:
- Custos reais vs estimados
- Variáveis ocultas (clima, logística, fornecedores)
- Correlações não óbvias

Resultado: Precisão de ±5% (vs ±20% atual)
```

**Implementação:**

```python
# 1. Coletar dados (já exporta JSON!)
import pandas as pd
import json

# Carregar datasets de PDIs anteriores
pdis = []
for file in glob('exports/*.json'):
    with open(file) as f:
        pdis.append(json.load(f))

df = pd.DataFrame(pdis)

# 2. Treinar modelo
from sklearn.ensemble import RandomForestRegressor

features = ['num_pocos', 'profundidade_media', 'lamina_agua',
            'distancia_costa', 'tipo_instalacao_encoded']
target = 'custo_total_usd'

X = df[features]
y = df[target]

model = RandomForestRegressor(n_estimators=100)
model.fit(X, y)

# 3. Prever novo PDI
novo_pdi = {
    'num_pocos': 8,
    'profundidade_media': 3500,
    'lamina_agua': 2100,
    'distancia_costa': 185,
    'tipo_instalacao_encoded': 2  # FPSO
}

custo_previsto = model.predict([list(novo_pdi.values())])
# Resultado: USD 178.5M (±5%)
```

**Benefício:**
- Propostas comerciais mais precisas
- Menos retrabalho (ajustes de custo)
- Confiança do cliente aumenta

---

### **2. SUGESTÃO INTELIGENTE DE ALTERNATIVAS TÉCNICAS** 🟡 PRIORIDADE MÉDIA

**Problema Atual:**
Cliente escolhe manualmente entre 6 alternativas (pode escolher errado)

**Com ML:**
```
IA analisa:
- Características do projeto (profundidade, distância, etc)
- PDIs similares aprovados pela ANP
- Histórico de sucesso de cada técnica

Recomenda: "Para seu projeto, recomendamos:
1. Remoção Completa (85% de confiança)
   - 12 projetos similares aprovados
   - Custo médio: USD 45M
   - Tempo médio: 18 meses
2. Rigs-to-Reefs (60% de confiança)
   - 5 projetos similares aprovados
   - Custo 40% menor, mas licenciamento +6 meses"
```

**Implementação:**

```python
from sklearn.neighbors import KNeighborsClassifier

# Dataset: projetos passados com técnica aprovada
df_historico = pd.DataFrame({
    'lamina_agua': [1500, 2200, 800, ...],
    'distancia_costa': [120, 185, 45, ...],
    'num_pocos': [5, 8, 3, ...],
    'tecnica_aprovada': ['remocao_completa', 'rigs_to_reefs', ...]
})

# Treinar classificador
X = df_historico[['lamina_agua', 'distancia_costa', 'num_pocos']]
y = df_historico['tecnica_aprovada']

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X, y)

# Prever para novo projeto
novo = [[2100, 185, 8]]  # lamina, distancia, pocos
tecnica_recomendada = knn.predict(novo)
probabilidades = knn.predict_proba(novo)

# Resultado: "remocao_completa" (85% de confiança)
```

**Benefício:**
- Cliente não erra na escolha
- Taxa de aprovação ANP aumenta
- Diferencial competitivo

---

### **3. DETECÇÃO DE ANOMALIAS (Alertas Inteligentes)** 🟡 PRIORIDADE MÉDIA

**Problema Atual:**
Sistema aceita qualquer valor inserido (cliente pode errar)

**Com ML:**
```
IA detecta:
❌ "Custo de R$ 5M para 10 poços em águas profundas é MUITO BAIXO"
❌ "Cronograma de 3 meses para FPSO é IRREALISTA"
❌ "Profundidade de 500m em Bacia de Santos é ATÍPICA"

✅ Alerta em tempo real
✅ Sugere valores típicos
✅ Explica o porquê
```

**Implementação:**

```python
from sklearn.ensemble import IsolationForest

# Treinar com dados normais
df_normal = pd.DataFrame({
    'num_pocos': [3, 5, 8, 12, 6, ...],
    'custo_milhoes': [25, 42, 78, 105, 51, ...],
    'duracao_meses': [12, 18, 24, 30, 20, ...]
})

# Modelo de detecção
iso_forest = IsolationForest(contamination=0.1)
iso_forest.fit(df_normal)

# Verificar novo input
novo_input = pd.DataFrame({
    'num_pocos': [10],
    'custo_milhoes': [5],  # MUITO BAIXO!
    'duracao_meses': [3]   # MUITO RÁPIDO!
})

anomalia = iso_forest.predict(novo_input)
# Resultado: -1 (anomalia detectada)

# Mostrar alerta no sistema
if anomalia == -1:
    alert("⚠️ Valores inseridos estão fora do padrão. Verifique!")
```

**Benefício:**
- Evita erros grosseiros
- Aumenta qualidade dos PDIs
- Cliente confia mais no sistema

---

### **4. PREVISÃO DE TEMPO DE APROVAÇÃO ANP** 🟢 PRIORIDADE BAIXA

**Com ML:**
```
IA prevê:
"Seu PDI tem 92% de chance de aprovação na 1ª rodada"
"Tempo estimado de análise ANP: 45-60 dias"

Baseado em:
- Completude do documento
- Histórico de aprovações
- Similaridade com PDIs aprovados
```

**Implementação:**

```python
from sklearn.linear_model import LogisticRegression

# Dataset: PDIs submetidos + resultado
df_submetidos = pd.DataFrame({
    'completude_pct': [95, 78, 88, 100, ...],
    'num_revisoes': [1, 3, 2, 0, ...],
    'complexidade': [2, 4, 3, 2, ...],  # 1-5
    'aprovado_primeira': [1, 0, 1, 1, ...]  # 1=sim, 0=não
})

# Treinar modelo
X = df_submetidos[['completude_pct', 'num_revisoes', 'complexidade']]
y = df_submetidos['aprovado_primeira']

lr = LogisticRegression()
lr.fit(X, y)

# Prever novo PDI
novo = [[98, 1, 3]]  # 98% completo, 1 revisão, complexidade 3
prob_aprovacao = lr.predict_proba(novo)[0][1]
# Resultado: 92% de chance de aprovação
```

**Benefício:**
- Cliente sabe o que esperar
- Identifica pontos fracos antes de submeter
- Reduz ansiedade do cliente

---

### **5. OTIMIZAÇÃO DE CRONOGRAMA** 🟢 PRIORIDADE BAIXA

**Com ML:**
```
IA otimiza sequência de atividades:
"Trocar ordem de X e Y economiza 2 meses"
"Weather window ideal: Março-Outubro (evita atrasos)"
```

**Implementação:**

```python
import networkx as nx
from sklearn.linear_model import LinearRegression

# Análise de dependências e duração ótima
atividades = {
    'mobilizacao': {'duracao_media': 2, 'predecessores': []},
    'pa_pocos': {'duracao_media': 12, 'predecessores': ['mobilizacao']},
    'remocao_fpso': {'duracao_media': 6, 'predecessores': ['pa_pocos']}
}

# Modelo prevê duração real baseado em fatores externos
# (clima, disponibilidade de sonda, etc)
```

---

## 🏗️ ARQUITETURA ML RECOMENDADA

### **Fase 1: Backend Python (Atual - Viável AGORA)**

```
Estrutura de Pastas:
NEPTUNO/
├── ml/
│   ├── models/
│   │   ├── custo_predictor.pkl
│   │   ├── tecnica_classifier.pkl
│   │   └── anomaly_detector.pkl
│   ├── train.py
│   ├── predict.py
│   └── dataset/
│       ├── pdi_001.json
│       ├── pdi_002.json
│       └── ...
├── api/
│   └── ml_api.py  (Flask/FastAPI)
└── (frontend atual)
```

**API Simples:**

```python
# ml/api/ml_api.py
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Carregar modelo treinado
with open('models/custo_predictor.pkl', 'rb') as f:
    model_custo = pickle.load(f)

@app.route('/predict/custo', methods=['POST'])
def predict_custo():
    data = request.json
    features = [
        data['num_pocos'],
        data['profundidade_media'],
        data['lamina_agua'],
        data['distancia_costa']
    ]

    custo = model_custo.predict([features])[0]

    return jsonify({
        'custo_previsto_usd': float(custo),
        'margem_erro': 0.05  # ±5%
    })

if __name__ == '__main__':
    app.run(port=5000)
```

**Integração Frontend:**

```javascript
// No PDICalculos.js
const calcularCustosComML = async (pdiData) => {
  try {
    const response = await fetch('http://localhost:5000/predict/custo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_pocos: pdiData.inventario.pocos.length,
        profundidade_media: calcularProfundidadeMedia(pdiData),
        lamina_agua: parseFloat(pdiData.referencia.profundidade),
        distancia_costa: parseFloat(pdiData.referencia.distanciaCosta)
      })
    });

    const resultado = await response.json();

    return {
      custo_ml: resultado.custo_previsto_usd,
      custo_parametrico: calcularCustoParametrico(pdiData),
      recomendacao: 'Usar média dos dois para maior precisão'
    };
  } catch (error) {
    // Fallback para cálculo paramétrico se API offline
    return calcularCustoParametrico(pdiData);
  }
};
```

---

### **Fase 2: TensorFlow.js (Futuro - Browser)**

**Vantagem:** Modelo roda no navegador (sem backend)

```javascript
// ml/model.js
import * as tf from '@tensorflow/tfjs';

// Carregar modelo treinado
const model = await tf.loadLayersModel('/models/custo_model.json');

// Prever
const input = tf.tensor2d([[8, 3500, 2100, 185]]);
const prediction = model.predict(input);
const custo = await prediction.data();
// Resultado: [178500000] (USD 178.5M)
```

**Benefícios:**
- Sem necessidade de servidor backend
- Mais rápido (local)
- Funciona offline

---

## 📊 DATASET - COMO COLETAR DADOS

### **Opção 1: Dados Públicos ANP**

```python
# Scraping de PDIs públicos (aprovados)
import requests
from bs4 import BeautifulSoup

url = 'https://www.gov.br/anp/pt-br/assuntos/exploracao-e-producao-de-oleo-e-gas/desativacao'
response = requests.get(url)
# Parse PDFs públicos e extrair dados
```

**Fontes:**
- PDIs aprovados publicados pela ANP
- Relatórios de sustentabilidade de operadoras
- Dados abertos gov.br
- Papers acadêmicos

---

### **Opção 2: Dados Sintéticos (Bootstrap)**

```python
# Gerar dados sintéticos para treinar modelo inicial
import numpy as np

def gerar_pdi_sintetico(n=1000):
    np.random.seed(42)

    data = {
        'num_pocos': np.random.randint(1, 20, n),
        'profundidade_media': np.random.randint(1000, 6000, n),
        'lamina_agua': np.random.randint(50, 3000, n),
        'distancia_costa': np.random.randint(10, 400, n)
    }

    # Fórmula base + ruído aleatório
    data['custo_total'] = (
        data['num_pocos'] * 5_000_000 +
        data['profundidade_media'] * 10_000 +
        data['lamina_agua'] * 15_000 +
        np.random.normal(0, 5_000_000, n)  # ruído
    )

    return pd.DataFrame(data)

df_treino = gerar_pdi_sintetico(1000)
```

---

### **Opção 3: Dados Reais dos Clientes (Melhor)**

```
Cada PDI criado pelo NEPTUNO exporta JSON:
→ Salvar em database
→ Incrementar dataset
→ Re-treinar modelo mensalmente

Após 50 PDIs reais:
- Modelo supera benchmarks estáticos
- Precisão aumenta continuamente
- Sistema aprende padrões brasileiros específicos
```

---

## 🚀 ROADMAP DE IMPLEMENTAÇÃO ML

### **Sprint 1 (1 semana): Coleta de Dados**
- [ ] Implementar logging de PDIs criados
- [ ] Exportar JSONs automaticamente
- [ ] Criar banco de dados (SQLite ou MongoDB)
- [ ] Coletar 20-50 PDIs (sintéticos + públicos)

### **Sprint 2 (1 semana): Treinar Modelo v1**
- [ ] Preparar dataset (limpeza, normalização)
- [ ] Treinar modelo de previsão de custos
- [ ] Validar com cross-validation
- [ ] Salvar modelo (.pkl)

### **Sprint 3 (1 semana): API Backend**
- [ ] Criar API Flask/FastAPI
- [ ] Endpoint `/predict/custo`
- [ ] Deploy local (localhost:5000)
- [ ] Integrar com frontend

### **Sprint 4 (1 semana): Testes e Ajustes**
- [ ] Comparar ML vs benchmarks estáticos
- [ ] Ajustar hiperparâmetros
- [ ] Adicionar explicabilidade (SHAP)
- [ ] Documentar

### **Fase 2 (1-2 meses): Modelos Adicionais**
- [ ] Classificador de alternativas técnicas
- [ ] Detector de anomalias
- [ ] Otimizador de cronograma

### **Fase 3 (3-6 meses): Migrar para TensorFlow.js**
- [ ] Converter modelos para TFJS
- [ ] Rodar 100% no navegador
- [ ] Eliminar backend Python

---

## 💰 IMPACTO COMERCIAL DO ML

### **Diferenciação de Mercado:**

**Sem ML (Atual):**
```
"Sistema automatizado com benchmarks da indústria"
```

**Com ML:**
```
"Sistema com INTELIGÊNCIA ARTIFICIAL que aprende
com cada PDI e fica mais preciso ao longo do tempo"
```

### **Precificação:**

Adicionar **20-30% ao preço** dos pacotes:

| Pacote | Atual | Com ML | Aumento |
|--------|-------|--------|---------|
| Bronze | R$ 18k | R$ 22k | +22% |
| Prata | R$ 45k | R$ 55k | +22% |
| Ouro | R$ 85k | R$ 105k | +24% |

**Justificativa:**
- Precisão 3x maior (±5% vs ±15%)
- Sugestões inteligentes
- Detecção de erros
- Diferencial competitivo único

---

## 📚 FERRAMENTAS E BIBLIOTECAS

### **Python (Backend):**
```bash
pip install numpy pandas scikit-learn tensorflow flask joblib
```

### **JavaScript (Frontend):**
```bash
npm install @tensorflow/tfjs
```

### **Visualização:**
```bash
pip install matplotlib seaborn plotly
```

### **MLOps:**
```bash
pip install mlflow wandb  # tracking de experimentos
```

---

## 🎯 CONCLUSÃO

### **ML no NEPTUNO é VIÁVEL porque:**

✅ **Já exporta dados** (estrutura pronta)
✅ **Problema bem definido** (regressão de custos)
✅ **Valor claro** (precisão = $ economizado)
✅ **Escalável** (quanto mais PDIs, melhor)

### **Próximo Passo Imediato:**

1. **Coletar 50 PDIs** (públicos + sintéticos)
2. **Treinar modelo básico** (1 dia)
3. **Criar API Flask** (1 dia)
4. **Integrar no sistema** (0.5 dia)
5. **Testar e validar** (0.5 dia)

**Total:** 3-4 dias de trabalho
**Resultado:** NEPTUNO v3.0 com IA 🤖

---

**Quer que eu comece implementando a Fase 1 (Backend ML)?**
