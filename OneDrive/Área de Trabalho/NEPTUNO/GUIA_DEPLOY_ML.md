# 🚀 Guia de Deploy - NEPTUNO com Machine Learning

## 🎯 Estratégia Recomendada: Deploy Híbrido

### Arquitetura:
```
Frontend (Vercel)              Backend ML (Railway/Render)
http://neptuno.vercel.app ←→ https://neptuno-ml.railway.app
```

---

## 📦 Opção 1: Railway.app (RECOMENDADO)

### Vantagens:
✅ Suporta Python + Flask
✅ Deploy automático via GitHub
✅ Grátis: $5 crédito/mês (suficiente para começar)
✅ Fácil de usar
✅ HTTPS automático

### Passo a Passo:

#### 1. Preparar Backend para Deploy

Criar `ml/requirements.txt`:
```txt
flask==3.0.0
flask-cors==4.0.0
scikit-learn==1.3.2
numpy==1.26.2
pandas==2.1.3
gunicorn==21.2.0
```

Criar `ml/Procfile`:
```
web: cd api && gunicorn ml_api:app
```

Criar `ml/runtime.txt`:
```
python-3.11.6
```

#### 2. Deploy no Railway

1. Acesse: https://railway.app
2. Conecte com GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecione pasta `ml/`
5. Railway detecta Python automaticamente
6. Aguarde deploy (2-3 minutos)
7. Copie URL gerada: `https://neptuno-ml.railway.app`

#### 3. Atualizar Frontend

Edite `PDICalculosML.js`:
```javascript
// Antes:
const ML_API_URL = 'http://localhost:5000/api/ml';

// Depois:
const ML_API_URL = 'https://neptuno-ml.railway.app/api/ml';
```

#### 4. Deploy Frontend no Vercel

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"
vercel deploy
```

---

## 📦 Opção 2: Render.com

### Vantagens:
✅ Suporta Python + Flask
✅ Grátis até 750h/mês
✅ HTTPS automático
✅ CI/CD automático

### Passo a Passo:

1. Acesse: https://render.com
2. "New Web Service" → GitHub repo
3. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd api && gunicorn ml_api:app`
   - **Environment**: Python 3.11
4. Deploy automático

---

## 📦 Opção 3: Tudo no Render (Frontend + Backend)

Se quiser tudo em um lugar:

### Estrutura:
```
render.yaml:
services:
  - type: web
    name: neptuno-ml-api
    env: python
    buildCommand: cd ml && pip install -r requirements.txt
    startCommand: cd ml/api && gunicorn ml_api:app

  - type: static
    name: neptuno-frontend
    buildCommand: echo "Static files"
    staticPublishPath: .
```

---

## 🔧 Modificações Necessárias

### 1. Criar `ml/requirements.txt`
```txt
flask==3.0.0
flask-cors==4.0.0
scikit-learn==1.3.2
numpy==1.26.2
pandas==2.1.3
gunicorn==21.2.0
```

### 2. Atualizar `ml/api/ml_api.py`

Adicionar no final:
```python
if __name__ == '__main__':
    # Desenvolvimento
    app.run(host='0.0.0.0', port=5000, debug=True)
else:
    # Produção (Gunicorn)
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
```

### 3. Configurar CORS para produção

Em `ml/api/ml_api.py`:
```python
# Antes:
CORS(app)

# Depois:
CORS(app, origins=[
    'http://localhost:8000',
    'https://neptuno.vercel.app',  # Seu domínio Vercel
    'https://*.vercel.app'
])
```

---

## 🌐 Variáveis de Ambiente

### No Railway/Render:
```
FLASK_ENV=production
PORT=5000
```

### No Vercel (frontend):
```
VITE_ML_API_URL=https://neptuno-ml.railway.app/api/ml
```

---

## ✅ Checklist de Deploy

### Backend (Railway/Render):
- [ ] Criar `requirements.txt`
- [ ] Criar `Procfile` (Railway) ou configurar Start Command (Render)
- [ ] Atualizar CORS com domínio de produção
- [ ] Fazer deploy
- [ ] Testar endpoint: `https://[seu-app].railway.app/api/ml/health`

### Frontend (Vercel):
- [ ] Atualizar `ML_API_URL` em `PDICalculosML.js`
- [ ] Fazer deploy: `vercel deploy --prod`
- [ ] Testar no navegador

---

## 💰 Custos

| Plataforma | Grátis | Pago |
|------------|--------|------|
| **Vercel** | 100GB bandwidth/mês | $20/mês (Pro) |
| **Railway** | $5 crédito/mês | $0.000231/min |
| **Render** | 750h/mês | $7/mês (Starter) |

**Recomendação inicial**: Usar tier grátis até validar com clientes.

---

## 🔒 Segurança

### Adicionar autenticação (Futuro):
```python
from flask import request

@app.before_request
def check_api_key():
    api_key = request.headers.get('X-API-Key')
    if api_key != os.environ.get('API_KEY'):
        return jsonify({'error': 'Unauthorized'}), 401
```

---

## 📊 Monitoramento

### Railway/Render Dashboard:
- Logs em tempo real
- Uso de CPU/RAM
- Requisições/segundo
- Erros

### Adicionar logging:
```python
import logging
logging.basicConfig(level=logging.INFO)

@app.route('/api/ml/predict/custo', methods=['POST'])
def predict_custo():
    logging.info(f"Requisição de custo: {request.json}")
    # ...
```

---

## 🚀 Deploy Rápido (5 minutos)

### 1. Backend no Railway:
```bash
cd ml
# Criar requirements.txt (copiar conteúdo acima)
git add .
git commit -m "Deploy ML API"
git push

# No Railway:
# - Connect GitHub repo
# - Deploy automático
```

### 2. Frontend no Vercel:
```bash
cd ..
# Atualizar ML_API_URL em PDICalculosML.js
vercel deploy --prod
```

### 3. Testar:
```
Frontend: https://neptuno.vercel.app
API: https://neptuno-ml.railway.app/api/ml/health
```

---

## ❓ FAQ

**P: E se Railway/Render ficar lento?**
R: Upgrade para plano pago ($7-20/mês) ou migrar para AWS/GCP.

**P: Modelos .pkl são grandes demais?**
R: Comprima com `pickle.dumps(..., protocol=4)` ou use joblib.

**P: Como fazer deploy automático?**
R: Conecte GitHub ao Railway/Render. Cada push = deploy automático.

**P: Preciso de GPU para ML?**
R: Não. Esses modelos são leves (Random Forest, Logistic Regression).

---

## 📚 Recursos

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Flask Deployment: https://flask.palletsprojects.com/en/3.0.x/deploying/

---

**Próximo passo**: Criar `requirements.txt` e fazer primeiro deploy no Railway!
