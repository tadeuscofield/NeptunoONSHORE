# 📘 Documentação - Machine Learning NEPTUNO

## 🎯 Visão Geral

O sistema NEPTUNO incorpora **5 modelos de Machine Learning** que trabalham em conjunto para fornecer previsões precisas e otimizar o processo de planejamento de desativação de instalações offshore.

---

## 🚀 Como Iniciar o Sistema ML

### 1. Pré-requisitos

Certifique-se de ter instalado:
- Python 3.8+
- pip (gerenciador de pacotes Python)

### 2. Instalação de Dependências

```bash
cd C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO
pip install numpy pandas scikit-learn flask flask-cors
```

### 3. Iniciar a API ML

```bash
cd ml/api
python ml_api.py
```

Você verá a mensagem:
```
============================================================
 API ML INICIADA!
============================================================
 Acesse: http://localhost:5000
```

### 4. Iniciar o Frontend

Em outro terminal:
```bash
cd C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO
python -m http.server 8000
```

Acesse: http://localhost:8000

---

## 🤖 Os 5 Modelos de Machine Learning

### 1️⃣ Modelo de Previsão de Custos

**Algoritmo**: Random Forest Regressor
**Acurácia**: R² = 0.808 (±22.7% erro)

**O que faz:**
- Prevê o custo total do projeto de desativação
- Considera: número de poços, profundidade, lâmina d'água, distância da costa, bacia, tipo de instalação, técnica

**Quando usar:**
- Ao criar um novo PDI
- Para validar orçamentos propostos
- Para comparar diferentes cenários de técnicas

**Exemplo de uso via API:**
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

**Resposta:**
```json
{
  "success": true,
  "custo_total_usd": 155.99,
  "custo_min_usd": 120.58,
  "custo_max_usd": 191.4,
  "margem_erro_pct": 22.7,
  "confianca": "R2: 0.808"
}
```

---

### 2️⃣ Modelo de Sugestão de Técnicas

**Algoritmo**: Random Forest Classifier
**Acurácia**: 42% (3 classes)

**O que faz:**
- Sugere a melhor técnica de desativação
- Retorna top 3 técnicas com probabilidades
- Considera características do projeto e restrições

**Técnicas disponíveis:**
- `leave_in_place` - Deixar no Local
- `remocao_completa` - Remoção Completa
- `remocao_parcial` - Remoção Parcial

**Exemplo de uso:**
```bash
curl -X POST http://localhost:5000/api/ml/suggest/tecnica \
  -H "Content-Type: application/json" \
  -d '{
    "num_pocos": 5,
    "profundidade_media": 2500,
    "lamina_agua": 1200,
    "distancia_costa": 80,
    "bacia": "Campos",
    "tipo_instalacao": "Plataforma Fixa"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "tecnica_principal": "leave_in_place",
  "confianca_principal": 56.0,
  "alternativas": [
    {"tecnica": "leave_in_place", "confianca": 56.0, "recomendacao": 1},
    {"tecnica": "remocao_completa", "confianca": 38.1, "recomendacao": 2},
    {"tecnica": "remocao_parcial", "confianca": 4.9, "recomendacao": 3}
  ]
}
```

---

### 3️⃣ Modelo de Detecção de Anomalias

**Algoritmo**: Isolation Forest
**Precisão**: 95%

**O que faz:**
- Detecta valores fora do padrão normal
- Identifica erros de entrada de dados
- Alerta sobre projetos com características incomuns

**Quando usar:**
- Após preencher dados do PDI
- Para validar dados importados
- Antes de submeter para aprovação

**Exemplo de uso:**
```bash
curl -X POST http://localhost:5000/api/ml/detect/anomaly \
  -H "Content-Type: application/json" \
  -d '{
    "num_pocos": 5,
    "profundidade_media": 2500,
    "lamina_agua": 1200,
    "custo_total_usd": 156,
    "duracao_meses": 36
  }'
```

**Resposta (valores normais):**
```json
{
  "success": true,
  "is_anomaly": false,
  "score": -0.52,
  "mensagem": "Valores dentro do esperado",
  "alertas": [],
  "confianca": 95.0
}
```

**Resposta (anomalia detectada):**
```json
{
  "success": true,
  "is_anomaly": true,
  "score": -1.23,
  "mensagem": "Valores fora do padrao - revisar dados",
  "alertas": [
    {
      "campo": "custo_total_usd",
      "mensagem": "Custo muito baixo para este projeto",
      "valor_atual": 10,
      "valor_tipico": "50-500 milhoes USD"
    }
  ]
}
```

---

### 4️⃣ Modelo de Previsão de Aprovação ANP

**Algoritmo**: Logistic Regression
**Acurácia**: 83%

**O que faz:**
- Prevê a probabilidade de aprovação pela ANP
- Estima tempo de análise
- Fornece recomendações para aumentar chances de aprovação

**Parâmetros:**
- `completude_pct` - Percentual de completude da documentação (0-100)
- `num_riscos_altos` - Número de riscos classificados como "altos"
- `complexidade` - Índice de complexidade do projeto (1-5)
- `custo_total_usd` - Custo total em milhões USD
- `duracao_meses` - Duração prevista em meses

**Exemplo de uso:**
```bash
curl -X POST http://localhost:5000/api/ml/predict/aprovacao \
  -H "Content-Type: application/json" \
  -d '{
    "completude_pct": 95,
    "num_riscos_altos": 3,
    "complexidade": 2.5,
    "custo_total_usd": 200,
    "duracao_meses": 24
  }'
```

**Resposta:**
```json
{
  "success": true,
  "probabilidade_aprovacao": 73.8,
  "status": "Media",
  "tempo_analise_dias": "60-90",
  "recomendacoes": [],
  "confianca_modelo": 83.0
}
```

**Interpretação:**
- **Alta** (>80%): Boa chance de aprovação rápida
- **Média** (60-80%): Aprovação provável com revisões menores
- **Baixa** (<60%): Necessita melhorias antes de submeter

---

### 5️⃣ Modelo de Previsão de Duração

**Algoritmo**: Random Forest Regressor
**Acurácia**: R² = 0.896 (±1.8 meses erro)

**O que faz:**
- Prevê a duração total do projeto em meses
- Mais preciso que o modelo de custos (R² 0.896 vs 0.808)
- Considera características técnicas e operacionais

**Exemplo de uso:**
```bash
curl -X POST http://localhost:5000/api/ml/predict/duracao \
  -H "Content-Type: application/json" \
  -d '{
    "num_pocos": 5,
    "profundidade_media": 2500,
    "lamina_agua": 1200,
    "distancia_costa": 80,
    "custo_total": 156,
    "bacia": "Campos",
    "tipo_instalacao": "Plataforma Fixa",
    "tecnica": "Descomissionamento Total"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "duracao_meses": 7,
  "duracao_min": 5,
  "duracao_max": 9,
  "margem_erro_meses": 1.8,
  "confianca": "R2: 0.896"
}
```

---

## 🔄 Endpoint Completo (Todos os Modelos)

Para executar todos os modelos de uma vez:

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

Retorna previsões de **custo**, **técnica** e **duração** em uma única resposta.

---

## 🎨 Integração com o Frontend

O sistema **automaticamente** utiliza ML quando a API está disponível. Se a API estiver offline, o sistema volta para cálculos paramétricos tradicionais.

### Verificação de Status ML

No console do navegador (F12):
```javascript
// Verificar se ML está ativo
fetch('http://localhost:5000/api/ml/health')
  .then(r => r.json())
  .then(data => console.log('ML Status:', data))
```

### Uso Transparente

O arquivo `PDICalculosML.js` integra automaticamente ML nas seguintes funções:
- `calcularCustosComML()` - Custos com ML
- `sugerirTecnicaComML()` - Sugestão de técnica
- `detectarAnomalias()` - Detecção de anomalias
- `preverAprovacaoANP()` - Previsão de aprovação
- `preverDuracao()` - Previsão de duração

**Não é necessário alterar código existente** - o sistema detecta automaticamente se ML está disponível.

---

## 📊 Dados de Treinamento

### Dataset Sintético

Os modelos foram treinados com **500 PDIs sintéticos** gerados com:
- Correlações realistas entre variáveis
- Distribuições baseadas em dados históricos da indústria
- Bacias: Santos, Campos, Espírito Santo, Recôncavo, Solimões

**Arquivos:**
- `ml/dataset/dataset_completo_[timestamp].csv`
- `ml/dataset/dataset_completo_[timestamp].json`

### Re-treinar Modelos

Para re-treinar com novos dados:

```bash
cd ml
python generate_dataset.py  # Gera novo dataset
python train_models.py      # Treina modelos
```

Modelos treinados são salvos em `ml/models/`:
- `model_custo.pkl`
- `model_tecnica.pkl`
- `model_anomaly.pkl`
- `model_aprovacao.pkl`
- `model_duracao.pkl`
- `encoders.pkl`

---

## ⚙️ Configuração Avançada

### Modificar Porta da API

Edite `ml/api/ml_api.py`:
```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Altere port
```

E atualize `PDICalculosML.js`:
```javascript
const ML_API_URL = 'http://localhost:5000/api/ml';  // Altere porta
```

### CORS (Cross-Origin)

A API já está configurada com CORS habilitado para aceitar requisições do frontend.

### Modo de Produção

Para produção, use Gunicorn ao invés do servidor Flask de desenvolvimento:

```bash
pip install gunicorn
cd ml/api
gunicorn -w 4 -b 0.0.0.0:5000 ml_api:app
```

---

## 🐛 Troubleshooting

### Erro: "Modelos não encontrados"

**Problema:** Arquivos `.pkl` não existem
**Solução:**
```bash
cd ml
python train_models.py
```

### Erro: "Module not found: sklearn"

**Problema:** scikit-learn não instalado
**Solução:**
```bash
pip install scikit-learn
```

### Erro: "CORS policy"

**Problema:** Frontend não consegue acessar API
**Solução:** Certifique-se de que `flask-cors` está instalado:
```bash
pip install flask-cors
```

### API não responde

**Problema:** API não está rodando
**Solução:**
```bash
cd ml/api
python ml_api.py
```

Verifique se a porta 5000 está livre:
```bash
netstat -ano | findstr :5000
```

### Previsões imprecisas

**Problema:** Modelos precisam de re-treinamento
**Solução:** Gere novo dataset com mais amostras:
```bash
cd ml
python generate_dataset.py  # Edite n_samples para 1000+
python train_models.py
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

## 🔐 Segurança e Privacidade

### Dados Locais
- Todos os modelos rodam **localmente** na máquina do usuário
- Nenhum dado é enviado para servidores externos
- Total controle sobre dados sensíveis

### Validação de Entrada
- API valida todos os parâmetros de entrada
- Proteção contra injection attacks
- Tratamento de erros robusto

---

## 🚀 Próximos Passos

### Versão 2.0 (Planejada)

1. **Transfer Learning**: Usar dados reais de PDIs aprovados
2. **Explicabilidade**: Adicionar SHAP values para explicar previsões
3. **AutoML**: Otimização automática de hiperparâmetros
4. **Ensemble**: Combinar múltiplos modelos para maior precisão
5. **Deep Learning**: Redes neurais para padrões complexos
6. **Real-time Learning**: Atualizar modelos conforme novos PDIs são criados

---

## 📞 Suporte

Para questões técnicas ou bugs:
1. Verifique esta documentação
2. Consulte logs da API ML
3. Verifique console do navegador (F12)
4. Entre em contato com o desenvolvedor

---

## 📚 Referências

- [scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Random Forest Algorithm](https://en.wikipedia.org/wiki/Random_forest)
- [Isolation Forest for Anomaly Detection](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html)

---

**Versão:** 1.0
**Data:** Outubro 2025
**Sistema:** NEPTUNO ML
