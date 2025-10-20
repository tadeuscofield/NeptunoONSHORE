# 🤗 Guia Completo: Deploy Machine Learning no Hugging Face

## 📋 Índice
1. [O que é Hugging Face?](#o-que-e-hugging-face)
2. [Por que usar Hugging Face?](#por-que-usar-hugging-face)
3. [Passo a Passo Completo](#passo-a-passo-completo)
4. [Preparação dos Dados](#preparacao-dos-dados)
5. [Deploy da Aplicação](#deploy-da-aplicacao)
6. [Integração com GitHub](#integracao-com-github)
7. [Custos e Limites](#custos-e-limites)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 O que é Hugging Face?

**Hugging Face** é a plataforma líder mundial para Machine Learning, oferecendo:

- **Spaces**: Deploy gratuito de apps ML (Streamlit, Gradio, Flask)
- **Datasets**: Hospedagem gratuita de datasets até 300GB
- **Models**: Repositório de modelos pré-treinados
- **Inference API**: Testes rápidos de modelos
- **Integracao Git**: Sincronização automática com GitHub

### Comparação com outras plataformas:

| Recurso | Hugging Face | Render | Railway | Vercel |
|---------|--------------|---------|---------|---------|
| **ML Nativo** | ✅ Sim | ⚠️ Limitado | ⚠️ Limitado | ❌ Não |
| **GPU Grátis** | ✅ Sim (limitado) | ❌ Não | ❌ Não | ❌ Não |
| **Datasets** | ✅ 300GB grátis | ❌ Não | ❌ Não | ❌ Não |
| **Custo** | 💰 Grátis | 💰 $7/mês | 💰 $5/mês | 💰 Grátis (limitado) |
| **Deploy ML** | ⚡ Otimizado | 🐌 Lento | 🐌 Lento | ❌ Não suporta |

---

## 🚀 Por que usar Hugging Face?

### Para o NEPTUNO:

1. **Dataset de PDIs**
   - Armazene os 500+ casos sintéticos de PDI
   - Versionamento automático de datasets
   - Compartilhamento público ou privado
   - API para acesso aos dados

2. **Modelo de Machine Learning**
   - Treine modelo de predição de custos
   - Deploy do modelo treinado
   - Inference API automática
   - Versionamento de modelos

3. **Aplicação Web**
   - Deploy da API Flask de ML
   - Interface Gradio para testes
   - Integração com frontend NEPTUNO
   - SSL gratuito

---

## 📝 Passo a Passo Completo

### PASSO 1: Criar Conta no Hugging Face

1. Acesse: https://huggingface.co/join
2. Crie conta (pode usar GitHub OAuth)
3. Verifique email
4. Faça login

**Tempo: 2 minutos**

---

### PASSO 2: Configurar Token de Acesso

1. Vá para: https://huggingface.co/settings/tokens
2. Clique em "New token"
3. Nome: `neptuno-ml-token`
4. Tipo: **Write** (para upload de datasets e modelos)
5. Copie o token (guarde em local seguro!)

**Exemplo de token:**
```
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Tempo: 1 minuto**

---

### PASSO 3: Instalar Hugging Face CLI

No terminal (Git Bash):

```bash
# Instalar Hugging Face Hub
pip install huggingface_hub

# Login com token
huggingface-cli login

# Cole o token quando solicitado
# Token: hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Tempo: 2 minutos**

---

### PASSO 4: Upload do Dataset de PDI

#### 4.1 Preparar Dataset

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO\ml"

# Verificar dataset
ls -lh dataset/dataset_completo_*.json
ls -lh dataset/dataset_completo_*.csv
```

#### 4.2 Criar Dataset no Hugging Face

1. Acesse: https://huggingface.co/new-dataset
2. Preencha:
   - **Owner**: seu usuário
   - **Dataset name**: `neptuno-pdi-dataset`
   - **License**: MIT
   - **Visibility**: Public (ou Private se preferir)
3. Clique "Create dataset"

#### 4.3 Upload via CLI

```bash
# Upload do dataset
huggingface-cli upload tadeuscofield/neptuno-pdi-dataset \
  dataset/dataset_completo_20251008_144410.json \
  --repo-type=dataset

# Upload CSV também
huggingface-cli upload tadeuscofield/neptuno-pdi-dataset \
  dataset/dataset_completo_20251008_144410.csv \
  --repo-type=dataset

# Upload pasta individual (casos individuais)
huggingface-cli upload tadeuscofield/neptuno-pdi-dataset \
  dataset/individual/ \
  --repo-type=dataset
```

**Tempo: 5-10 minutos (dependendo da internet)**

#### 4.4 Criar README do Dataset

Crie arquivo `dataset_README.md`:

```markdown
# NEPTUNO - Dataset de Planos de Desativação de Instalações

## Descrição

Dataset sintético com 500+ casos de Planos de Desativação de Instalações (PDI)
conforme Resolução ANP 817/2020.

## Estrutura

- **Features**: 25+ variáveis (lâmina d'água, bacia, nº poços, etc.)
- **Target**: Custos totais e por categoria
- **Formato**: JSON e CSV
- **Qualidade**: Score de confiança 0-100%

## Uso

```python
from datasets import load_dataset

dataset = load_dataset("tadeuscofield/neptuno-pdi-dataset")
print(dataset['train'])
```

## Licença

MIT License - Uso livre para pesquisa e desenvolvimento
```

Upload:
```bash
huggingface-cli upload tadeuscofield/neptuno-pdi-dataset \
  dataset_README.md \
  --repo-type=dataset \
  README.md
```

**Tempo: 3 minutos**

---

### PASSO 5: Deploy da API de Machine Learning

#### 5.1 Preparar Aplicação Gradio

Crie `ml/app_gradio.py`:

```python
import gradio as gr
import json
import sys
sys.path.append('.')
from api.ml_api import predict_costs

def predict_interface(
    profundidade_lamina,
    distancia_costa,
    bacia,
    num_pocos,
    num_instalacoes
):
    """Interface para predição de custos."""

    # Preparar dados
    data = {
        "features": {
            "profundidadeLamina": float(profundidade_lamina),
            "distanciaCosta": float(distancia_costa),
            "bacia": bacia,
            "numeroPocos": int(num_pocos),
            "numeroInstalacoes": int(num_instalacoes)
        }
    }

    # Predição
    result = predict_costs(data)

    # Formatar resultado
    output = f"""
    ## Predição de Custos PDI

    **Custo Total**: R$ {result['prediction']['custo_total']/1000000:.1f}M

    **Breakdown**:
    - P&A Poços: R$ {result['prediction']['breakdown'].get('pa_pocos', 0)/1000000:.1f}M
    - Remoção: R$ {result['prediction']['breakdown'].get('remocao', 0)/1000000:.1f}M
    - Mobilização: R$ {result['prediction']['breakdown'].get('mobilizacao', 0)/1000000:.1f}M
    - Engenharia: R$ {result['prediction']['breakdown'].get('engenharia', 0)/1000000:.1f}M

    **Confiança**: {result['confidence']:.0f}%
    """

    return output

# Interface
demo = gr.Interface(
    fn=predict_interface,
    inputs=[
        gr.Number(label="Profundidade Lâmina d'Água (m)", value=1000),
        gr.Number(label="Distância da Costa (km)", value=100),
        gr.Dropdown(
            choices=[
                "Bacia de Campos",
                "Bacia de Santos",
                "Bacia do Espírito Santo",
                "Bacia Potiguar"
            ],
            label="Bacia Sedimentar",
            value="Bacia de Campos"
        ),
        gr.Number(label="Número de Poços", value=5),
        gr.Number(label="Número de Instalações", value=3)
    ],
    outputs=gr.Markdown(label="Resultado"),
    title="🏭 NEPTUNO ML - Predição de Custos PDI",
    description="Sistema de Machine Learning para estimativa de custos de Plano de Desativação de Instalações",
    examples=[
        [1000, 100, "Bacia de Campos", 5, 3],
        [2000, 150, "Bacia de Santos", 10, 5],
        [500, 50, "Bacia Potiguar", 3, 2]
    ]
)

if __name__ == "__main__":
    demo.launch()
```

#### 5.2 Criar requirements.txt

```txt
gradio==4.8.0
flask==3.0.0
numpy==1.24.3
pandas==2.0.3
scikit-learn==1.3.0
```

#### 5.3 Criar Space no Hugging Face

1. Acesse: https://huggingface.co/new-space
2. Preencha:
   - **Owner**: seu usuário
   - **Space name**: `neptuno-ml-api`
   - **License**: MIT
   - **SDK**: **Gradio**
   - **Hardware**: CPU basic (grátis)
   - **Visibility**: Public
3. Clique "Create Space"

#### 5.4 Clone e Push

```bash
# Clone o Space
git clone https://huggingface.co/spaces/tadeuscofield/neptuno-ml-api
cd neptuno-ml-api

# Copiar arquivos
cp -r ../ml/* .

# Commit e push
git add .
git commit -m "Initial commit: NEPTUNO ML API"
git push
```

**Tempo: 10-15 minutos**

---

### PASSO 6: Sincronização com GitHub

#### 6.1 Criar Repositório no GitHub (já criado!)

```bash
# Você já tem: https://github.com/tadeuscofield/Neptuno.git
```

#### 6.2 Sincronizar Dataset com GitHub

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"

# Verificar remote
git remote -v

# Commit dataset (se ainda não commitou)
git add ml/dataset/
git commit -m "Add ML dataset for Hugging Face"
git push origin main
```

#### 6.3 Sincronizar Hugging Face Dataset com GitHub

No Hugging Face Dataset:
1. Vá para Settings
2. Em "Repository settings"
3. Habilite "Mirror from GitHub"
4. Cole URL: `https://github.com/tadeuscofield/Neptuno`
5. Path: `ml/dataset/`

**Agora, toda vez que você fizer push no GitHub, o dataset no Hugging Face atualiza automaticamente!**

**Tempo: 5 minutos**

---

### PASSO 7: Treinar Modelo de ML

#### 7.1 Criar Script de Treinamento

Crie `ml/train_model.py`:

```python
import json
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Carregar dataset
with open('dataset/dataset_completo_20251008_144410.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Preparar dados
df = pd.json_normalize(data['casos'])

# Features
features = [
    'features.profundidadeLamina',
    'features.distanciaCosta',
    'features.numeroPocos',
    'features.numeroInstalacoes'
]

# Target
target = 'target.custoTotal'

X = df[features]
y = df[target]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Treinar modelo
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=10,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# Avaliar
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"MAE: R$ {mae/1000000:.1f}M")
print(f"R²: {r2:.3f}")

# Salvar modelo
joblib.dump(model, 'model/neptuno_rf_model.pkl')
print("Modelo salvo!")
```

#### 7.2 Treinar

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO\ml"
python train_model.py
```

#### 7.3 Upload do Modelo para Hugging Face

```bash
# Criar model repository
huggingface-cli repo create neptuno-cost-predictor --type model

# Upload
huggingface-cli upload tadeuscofield/neptuno-cost-predictor \
  model/neptuno_rf_model.pkl \
  --repo-type=model
```

**Tempo: 10 minutos**

---

## 💰 Custos e Limites

### Tier Gratuito (Forever Free):

✅ **Spaces**:
- CPU: Ilimitado
- RAM: 16GB
- Storage: 50GB por Space
- Uptime: 48h sem uso = sleep

✅ **Datasets**:
- Storage: 300GB grátis
- Bandwidth: Ilimitado
- Repositórios: Ilimitados

✅ **Models**:
- Storage: Ilimitado
- Download: Ilimitado
- Inference API: 30.000 requests/mês grátis

### Tier Pago (PRO - $9/mês):

- GPU: T4 (16GB VRAM)
- Persistent storage
- Always-on Spaces
- Priority support
- 1M inference requests/mês

**Para NEPTUNO, o tier gratuito é mais que suficiente!**

---

## 🔗 Links Úteis

### NEPTUNO no Hugging Face:

- **Dataset**: https://huggingface.co/datasets/tadeuscofield/neptuno-pdi-dataset
- **Model**: https://huggingface.co/tadeuscofield/neptuno-cost-predictor
- **Space**: https://huggingface.co/spaces/tadeuscofield/neptuno-ml-api

### Documentação:

- **Hugging Face Docs**: https://huggingface.co/docs
- **Datasets**: https://huggingface.co/docs/datasets
- **Spaces**: https://huggingface.co/docs/hub/spaces
- **CLI**: https://huggingface.co/docs/huggingface_hub/guides/cli

---

## ❓ Troubleshooting

### Erro: "Repository not found"
```bash
# Verificar login
huggingface-cli whoami

# Re-login
huggingface-cli login
```

### Space não inicia
- Verificar logs no Space
- Checar `requirements.txt`
- Testar localmente primeiro:
```bash
cd neptuno-ml-api
python app_gradio.py
```

### Dataset muito grande
```bash
# Upload em partes
huggingface-cli upload tadeuscofield/neptuno-pdi-dataset \
  dataset/ \
  --repo-type=dataset \
  --every=10
```

### Git LFS error
```bash
# Instalar Git LFS
git lfs install

# Track arquivos grandes
git lfs track "*.pkl"
git lfs track "*.h5"
git lfs track "*.bin"
```

---

## ✅ Checklist Final

- [ ] Conta Hugging Face criada
- [ ] Token de acesso gerado
- [ ] CLI instalado e autenticado
- [ ] Dataset uploadado
- [ ] README do dataset criado
- [ ] Space criado e deployado
- [ ] Modelo treinado e uploadado
- [ ] Sincronização GitHub configurada
- [ ] Testes de inference funcionando
- [ ] Links compartilhados com equipe

---

## 🎯 Próximos Passos

1. **Integrar com Frontend NEPTUNO**
   - Adicionar botão "Predição ML" no Step 8
   - Chamar API do Hugging Face Space
   - Mostrar resultado lado a lado com cálculo paramétrico

2. **Expandir Dataset**
   - Adicionar casos reais (quando disponíveis)
   - Aumentar diversidade de cenários
   - Melhorar qualidade dos dados

3. **Melhorar Modelo**
   - Testar outros algoritmos (XGBoost, LightGBM)
   - Feature engineering
   - Hyperparameter tuning

4. **Monetização**
   - API premium com mais features
   - Relatórios personalizados
   - Consultoria com ML

---

**Desenvolvido por Eng. Tadeu Santana**
**NEPTUNO © 2025 - Sistema Profissional de PDI**
