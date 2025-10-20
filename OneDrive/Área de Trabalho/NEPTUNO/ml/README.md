# 🤖 Machine Learning - NEPTUNO v2.0

## 📊 5 Modelos de Machine Learning Integrados

Este diretório contém toda a implementação de Machine Learning do sistema NEPTUNO.

---

## 📂 Estrutura de Arquivos

```
ml/
│
├── 📄 README.md                    (Este arquivo)
├── 📄 generate_dataset.py          (Gerador de 500 PDIs sintéticos)
├── 📄 train_models.py              (Treinamento dos 5 modelos)
│
├── 📂 api/
│   └── 📄 ml_api.py                (API Flask REST - 7 endpoints)
│
├── 📂 models/
│   ├── model_custo.pkl             (Random Forest - Custos)
│   ├── model_tecnica.pkl           (Random Forest Classifier - Técnicas)
│   ├── model_anomaly.pkl           (Isolation Forest - Anomalias)
│   ├── model_aprovacao.pkl         (Logistic Regression - Aprovação)
│   ├── model_duracao.pkl           (Random Forest - Duração)
│   └── encoders.pkl                (Label Encoders)
│
└── 📂 dataset/
    ├── dataset_completo_*.csv      (500 PDIs - CSV)
    └── dataset_completo_*.json     (500 PDIs - JSON)
```

---

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
pip install numpy pandas scikit-learn flask flask-cors
```

### 2. Gerar Dataset (Opcional - já está gerado)

```bash
python generate_dataset.py
```

**Output:**
- `dataset/dataset_completo_[timestamp].csv`
- `dataset/dataset_completo_[timestamp].json`

### 3. Treinar Modelos (Opcional - já estão treinados)

```bash
python train_models.py
```

**Output:**
- `models/model_custo.pkl`
- `models/model_tecnica.pkl`
- `models/model_anomaly.pkl`
- `models/model_aprovacao.pkl`
- `models/model_duracao.pkl`
- `models/encoders.pkl`

### 4. Iniciar API

```bash
cd api
python ml_api.py
```

**API disponível em:** http://localhost:5000

---

## 🤖 Os 5 Modelos

### 1. Previsão de Custos
- **Algoritmo:** Random Forest Regressor
- **Acurácia:** R² = 0.808, MAE = $91.92M, Erro ±22.7%
- **Endpoint:** `POST /api/ml/predict/custo`
- **Input:** num_pocos, profundidade_media, lamina_agua, distancia_costa, bacia, tipo_instalacao, tecnica
- **Output:** custo_total_usd, custo_min_usd, custo_max_usd, margem_erro_pct

### 2. Sugestão de Técnicas
- **Algoritmo:** Random Forest Classifier
- **Acurácia:** 42% (3 classes)
- **Endpoint:** `POST /api/ml/suggest/tecnica`
- **Input:** num_pocos, profundidade_media, lamina_agua, distancia_costa, bacia, tipo_instalacao
- **Output:** tecnica_principal, confianca_principal, alternativas (top 3)

### 3. Detecção de Anomalias
- **Algoritmo:** Isolation Forest
- **Precisão:** 95%
- **Endpoint:** `POST /api/ml/detect/anomaly`
- **Input:** num_pocos, custo_total_usd, duracao_meses, profundidade_media, lamina_agua
- **Output:** is_anomaly, score, mensagem, alertas

### 4. Previsão de Aprovação ANP
- **Algoritmo:** Logistic Regression
- **Acurácia:** 83%
- **Endpoint:** `POST /api/ml/predict/aprovacao`
- **Input:** completude_pct, num_riscos_altos, complexidade, custo_total_usd, duracao_meses
- **Output:** probabilidade_aprovacao, status, tempo_analise_dias, recomendacoes

### 5. Previsão de Duração
- **Algoritmo:** Random Forest Regressor
- **Acurácia:** R² = 0.896, MAE = 1.8 meses
- **Endpoint:** `POST /api/ml/predict/duracao`
- **Input:** num_pocos, profundidade_media, lamina_agua, distancia_costa, custo_total, bacia, tipo_instalacao, tecnica
- **Output:** duracao_meses, duracao_min, duracao_max, margem_erro_meses

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/ml
```

### Endpoints Disponíveis

1. **Health Check**
   ```bash
   GET /api/ml/health
   ```

2. **Previsão de Custos**
   ```bash
   POST /api/ml/predict/custo
   Content-Type: application/json

   {
     "num_pocos": 5,
     "profundidade_media": 2500,
     "lamina_agua": 1200,
     "distancia_costa": 80,
     "bacia": "Campos",
     "tipo_instalacao": "Plataforma Fixa",
     "tecnica": "Descomissionamento Total"
   }
   ```

3. **Sugestão de Técnicas**
   ```bash
   POST /api/ml/suggest/tecnica
   ```

4. **Detecção de Anomalias**
   ```bash
   POST /api/ml/detect/anomaly
   ```

5. **Previsão de Aprovação**
   ```bash
   POST /api/ml/predict/aprovacao
   ```

6. **Previsão de Duração**
   ```bash
   POST /api/ml/predict/duracao
   ```

7. **Previsão Completa** (todos modelos)
   ```bash
   POST /api/ml/predict/completo
   ```

---

## 📊 Dataset de Treinamento

### Características
- **Tamanho:** 500 PDIs sintéticos
- **Features:** 15 variáveis por PDI
- **Bacias:** Santos, Campos, Espírito Santo, Recôncavo, Solimões
- **Tipos de Instalação:** Plataforma Fixa, Semissubmersível, FPSO, Poço
- **Técnicas:** Descomissionamento Total, Parcial, Leave in Place

### Distribuições Realistas
- Profundidade: 500-5000m (baseado em bacias reais)
- Lâmina d'água: 100-3000m
- Custos: $50M-$500M
- Duração: 12-72 meses
- Correlações: Profundidade × Custo, Lâmina × Técnica

### Re-gerar Dataset

Para criar novo dataset com mais amostras:

1. Edite `generate_dataset.py`:
   ```python
   # Linha 10
   n_samples = 1000  # Altere de 500 para 1000
   ```

2. Execute:
   ```bash
   python generate_dataset.py
   ```

---

## 🔧 Re-treinar Modelos

### Quando re-treinar?
- Após gerar novo dataset
- Quando tiver PDIs reais disponíveis
- Para ajustar hiperparâmetros

### Como re-treinar?

```bash
python train_models.py
```

### Output esperado:
```
============================================================
 TREINAMENTO DE MODELOS ML - NEPTUNO
============================================================

[DADOS] Carregando dataset...
  [OK] Dataset carregado: 500 linhas

[MODELO 1/5] Treinando modelo de Custos...
  [OK] R² Score: 0.808
  [OK] MAE: 91.92 milhoes USD
  [OK] Modelo salvo: models/model_custo.pkl

[MODELO 2/5] Treinando modelo de Tecnicas...
  [OK] Accuracy: 42%
  [OK] Modelo salvo: models/model_tecnica.pkl

...
```

---

## 🧪 Testar API

### 1. Health Check
```bash
curl http://localhost:5000/api/ml/health
```

### 2. Previsão de Custo
```bash
curl -X POST http://localhost:5000/api/ml/predict/custo \
  -H "Content-Type: application/json" \
  -d '{
    "num_pocos": 5,
    "profundidade_media": 2500,
    "lamina_agua": 1200,
    "distancia_costa": 80,
    "bacia": "Campos",
    "tipo_instalacao": "Plataforma Fixa",
    "tecnica": "Descomissionamento Total"
  }'
```

### 3. Teste Completo
```bash
curl -X POST http://localhost:5000/api/ml/predict/completo \
  -H "Content-Type: application/json" \
  -d '{
    "num_pocos": 5,
    "profundidade_media": 2500,
    "lamina_agua": 1200,
    "distancia_costa": 80,
    "bacia": "Campos",
    "tipo_instalacao": "Plataforma Fixa",
    "tecnica": "Descomissionamento Total",
    "completude_pct": 95,
    "num_riscos_altos": 3,
    "complexidade": 2.5
  }'
```

---

## 📈 Métricas de Performance

| Modelo | Algoritmo | Métrica | Score |
|--------|-----------|---------|-------|
| Custos | Random Forest | R² | 0.808 |
| Custos | Random Forest | MAE | $91.92M |
| Custos | Random Forest | Erro % | ±22.7% |
| Técnica | Random Forest | Acurácia | 42% |
| Anomalia | Isolation Forest | Precisão | 95% |
| Aprovação | Logistic Regression | Acurácia | 83% |
| Duração | Random Forest | R² | 0.896 |
| Duração | Random Forest | MAE | 1.8 meses |

---

## 🔐 Segurança

- ✅ **100% Local**: Modelos rodam na máquina do usuário
- ✅ **Sem Cloud**: Nenhum dado enviado externamente
- ✅ **Validação**: Todos inputs validados
- ✅ **CORS**: Habilitado para frontend

---

## 🐛 Troubleshooting

### Erro: "ModuleNotFoundError: No module named 'sklearn'"
```bash
pip install scikit-learn
```

### Erro: "FileNotFoundError: dataset_completo*.csv"
```bash
python generate_dataset.py
```

### Erro: "FileNotFoundError: model_*.pkl"
```bash
python train_models.py
```

### API não responde
Verifique se está rodando:
```bash
cd api
python ml_api.py
```

---

## 📚 Documentação Completa

Para documentação detalhada, consulte:

- **[../INICIO_RAPIDO_ML.md](../INICIO_RAPIDO_ML.md)** - Guia rápido
- **[../DOCUMENTACAO_ML.md](../DOCUMENTACAO_ML.md)** - Documentação técnica
- **[../RESUMO_IMPLEMENTACAO_ML.md](../RESUMO_IMPLEMENTACAO_ML.md)** - Resumo
- **[../RELATORIO_FINAL_ML.md](../RELATORIO_FINAL_ML.md)** - Relatório final
- **[../INDEX_ML.md](../INDEX_ML.md)** - Índice completo

---

## 🚀 Próximos Passos

### Versão 2.0
- Transfer Learning com PDIs reais
- Validação cruzada com casos reais
- Ajuste de hiperparâmetros

### Versão 3.0
- Explicabilidade (SHAP values)
- Deep Learning
- AutoML

---

## 📞 Suporte

Para questões técnicas:
1. Consulte documentação em `../DOCUMENTACAO_ML.md`
2. Verifique logs da API
3. Verifique console do navegador (F12)

---

**Versão:** 1.0
**Sistema:** NEPTUNO ML
**Data:** Outubro 2025
