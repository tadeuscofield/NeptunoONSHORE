# 🚀 Decisão de Deploy - NEPTUNO ML

## ✅ **RECOMENDAÇÃO: Usar RENDER.COM (Plano Grátis)**

### Por quê Render e não Railway?

| Critério | Render (Grátis) | Railway (Trial $5) | Vencedor |
|----------|-----------------|---------------------|----------|
| **Custo** | $0 permanente | $5/mês (expira) | 🏆 Render |
| **Duração** | Ilimitado | 15-30 dias | 🏆 Render |
| **Spin down** | 15 min inativo | Opcional | Empate |
| **Deploy** | 5 minutos | 5 minutos | Empate |
| **Documentação** | Excelente | Excelente | Empate |
| **Melhor para MVP** | ✅ Sim | ⚠️ Limitado | 🏆 Render |

### Vantagens do Render para Você:

1. **$0 custo** - Perfeito para validar sem gastar
2. **Não expira** - Pode ficar 6 meses testando grátis
3. **750h/mês** - Suficiente com spin down
4. **Demos funcionam** - Acorda em 30-60s (aceitável)
5. **Upgrade fácil** - Quando tiver clientes, paga $7/mês

### Como Lidar com Spin Down (30-60s delay):

```javascript
// Frontend - acordar API antes de usar
async function garantirAPIAcordada() {
  const inicio = Date.now();

  try {
    await fetch('https://neptuno-ml.onrender.com/api/ml/health');
    const tempo = Date.now() - inicio;

    if (tempo > 5000) {
      console.log('API estava dormindo, acordou em', tempo/1000, 's');
    }
  } catch (err) {
    console.error('API offline:', err);
  }
}

// Chamar quando app carrega
window.addEventListener('load', garantirAPIAcordada);
```

### Para Demos/Workshops:

**5 minutos antes de apresentar:**
```bash
# Acorde a API acessando qualquer endpoint
curl https://neptuno-ml.onrender.com/api/ml/health
```

Depois disso, API fica acordada por 15 minutos. Durante a demo, faça várias requisições para manter acordada.

---

## 📋 **Plano de Deploy - Render.com**

### Passo 1: Preparar Repositório (5 min)

Já criamos:
- ✅ `ml/requirements.txt`
- ✅ `ml/build.sh`
- ✅ `ml/api/ml_api.py` (configurado para produção)

Falta apenas:
- [ ] Subir código no GitHub

### Passo 2: Deploy no Render (10 min)

1. Acesse: https://render.com
2. Cadastre com GitHub
3. "New" → "Web Service"
4. Conecte repositório
5. Configure:
   ```
   Name: neptuno-ml
   Region: Oregon (US West)
   Branch: main
   Root Directory: ml
   Runtime: Python 3
   Build Command: bash build.sh
   Start Command: cd api && gunicorn ml_api:app
   ```
6. "Create Web Service"
7. Aguarde deploy (~5 min)

### Passo 3: Testar (2 min)

```bash
# URL será algo como:
# https://neptuno-ml.onrender.com

curl https://neptuno-ml.onrender.com/api/ml/health
```

### Passo 4: Atualizar Frontend (3 min)

Editar `PDICalculosML.js`:
```javascript
// Trocar:
const ML_API_URL = 'http://localhost:5000/api/ml';

// Por:
const ML_API_URL = 'https://neptuno-ml.onrender.com/api/ml';
```

### Passo 5: Deploy Frontend no Vercel (5 min)

```bash
cd C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO
vercel deploy --prod
```

---

## ⏰ **Timeline Total: 30 minutos**

✅ **Resultado Final:**
- Frontend: https://neptuno.vercel.app
- API ML: https://neptuno-ml.onrender.com
- Custo: $0

---

## 🔄 **Quando Migrar do Render?**

### Cenário 1: Tráfego Alto (muitos acessos)
**Sinal:** Spin down atrapalha experiência
**Solução:** Render Starter $7/mês (sem spin down)

### Cenário 2: Primeiro Cliente Pago
**Sinal:** Cliente pagando $500+/mês
**Solução:** Railway $15/mês OU Render Pro $25/mês

### Cenário 3: 10+ Clientes
**Sinal:** Precisa alta disponibilidade
**Solução:** AWS/GCP com load balancer

---

## 💡 **Decisão Final:**

### **AGORA (Validação):**
```
Render.com (Grátis) + Vercel (Grátis) = $0/mês
```

### **Com 1º Cliente (3-6 meses):**
```
Render Starter $7/mês + Vercel (Grátis) = $7/mês
```

### **Com 5+ Clientes (6-12 meses):**
```
Railway/AWS $25-50/mês + Vercel Pro $20/mês = $45-70/mês
```

**ROI:** Se cada cliente paga $500-1000/mês, $70/mês de infra é 7-14% do revenue (aceitável!)

---

## ✅ **Próximo Passo Imediato:**

Quer que eu ajude a:

1. **Criar repositório GitHub** e fazer push do código? (10 min)
2. **Configurar deploy no Render passo a passo**? (15 min)
3. **Atualizar frontend** para apontar para Render? (5 min)

**Qual você quer fazer agora?**
