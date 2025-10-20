# ▲ NEPTUNO - Deploy Vercel + Domínio

## Guia Completo: Frontend + Domínio Personalizado

---

## 🎯 Objetivo

Fazer deploy do frontend NEPTUNO no Vercel e comprar domínio personalizado.

**Resultado final:**
- ✅ Frontend rodando em `https://neptuno.vercel.app`
- ✅ Domínio personalizado: `https://neptuno.com.br`
- ✅ SSL automático
- ✅ CDN global
- ✅ Deploy automático via GitHub

---

## 📋 PARTE 1: Deploy Manual no Vercel (SEM CLI)

### PASSO 1.1: Criar Conta Vercel

1. Acesse: **https://vercel.com**
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"** (recomendado)
4. Autorize Vercel a acessar sua conta GitHub
5. Confirme email (se pedido)

**Tempo: 2 minutos**

---

### PASSO 1.2: Importar Projeto do GitHub

1. No dashboard Vercel, clique em **"Add New..."** → **"Project"**
2. Na lista de repositórios, procure **"Neptuno"**
3. Clique em **"Import"** no repositório `tadeuscofield/Neptuno`

**Tempo: 1 minuto**

---

### PASSO 1.3: Configurar Projeto

Vercel vai mostrar tela de configuração:

#### Build Settings:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Other |
| **Root Directory** | `./` (deixe vazio ou "./") |
| **Build Command** | (deixe vazio - é SPA estático) |
| **Output Directory** | `./` (raiz) |
| **Install Command** | (deixe vazio) |

**Por quê deixar vazio?**
- NEPTUNO é 100% estático (HTML + JS + CSS)
- Não precisa de build (Webpack, Vite, etc.)
- Arquivos já estão prontos para produção

#### Environment Variables:

Adicione (opcional - se quiser chamar Railway API):

```
Nome: NEXT_PUBLIC_API_URL
Valor: https://neptuno-ml-api-production.up.railway.app
```

**Nota**: Mesmo não sendo Next.js, Vercel respeita variáveis com `NEXT_PUBLIC_`

#### Clique em **"Deploy"**

**Tempo: 2 minutos**

---

### PASSO 1.4: Aguardar Deploy

Vercel vai:
1. Clone seu repositório
2. Detectar arquivos estáticos
3. Fazer deploy
4. Gerar URL

**Progresso:**
- ⏳ Building... (30s)
- ✅ Deploy complete!

**URL gerada**: `https://neptuno-xyz123.vercel.app`

**Tempo de deploy: 1-2 minutos**

---

### PASSO 1.5: Testar Deploy

1. Clique na URL gerada
2. NEPTUNO deve abrir normalmente
3. Teste navegação entre steps
4. Teste cálculo de custos
5. Teste exportação PDF

**Se algo der errado:**
- Verifique logs no Vercel
- Veja console do browser (F12)
- Verifique se todos os arquivos foram commitados

**Tempo: 3 minutos**

---

### PASSO 1.6: Configurar Domínio Padrão Vercel (Opcional)

Por padrão, Vercel gera nome aleatório. Você pode personalizar:

1. No projeto, vá para **"Settings"** → **"Domains"**
2. Em **"Vercel Domain"**, clique em **"Edit"**
3. Escolha: `neptuno.vercel.app`
4. Salvar

**Agora sua URL é**: `https://neptuno.vercel.app` ✅

**Tempo: 1 minuto**

---

## 💰 PARTE 2: Comprar Domínio no Vercel

### Por que comprar no Vercel?

✅ **Configuração automática** (zero DNS manual)
✅ **SSL grátis** (automático)
✅ **Sem surpresas** (preço fixo, sem taxas ocultas)
✅ **Renovação simples** (1 clique)
✅ **Suporte Vercel** (se algo der errado)

### Preços Domínios Vercel (2025):

| TLD | Preço/ano | Ideal para |
|-----|-----------|------------|
| `.com` | $15 (~R$ 75) | Global, profissional |
| `.com.br` | $10 (~R$ 50) | Brasil, local |
| `.io` | $40 (~R$ 200) | Tech, startups |
| `.ai` | $80 (~R$ 400) | AI/ML companies |
| `.app` | $15 (~R$ 75) | Web apps |
| `.tech` | $50 (~R$ 250) | Tech companies |

**Recomendação para NEPTUNO**: `.com.br` (R$ 50/ano)

---

### PASSO 2.1: Verificar Disponibilidade

1. No projeto Vercel, vá para **"Settings"** → **"Domains"**
2. Clique em **"Buy a domain"**
3. Digite: `neptuno.com.br`
4. Clique em **"Search"**

**Possíveis resultados:**

✅ **Disponível**: "neptuno.com.br is available - $10/year"
❌ **Indisponível**: "neptuno.com.br is not available"

**Se indisponível**, tente:
- `meuceptuno.com.br`
- `neptuno-pdi.com.br`
- `neptunosystem.com.br`
- `neptunobr.com.br`
- `neptuno.com` (mais caro, mas global)

**Tempo: 2 minutos**

---

### PASSO 2.2: Comprar Domínio

Se disponível:

1. Clique em **"Purchase neptuno.com.br"**
2. Preencha informações de contato:
   ```
   Nome: Tadeu Santana
   Email: seu@email.com
   Telefone: (21) 96446-2281
   Endereço: [seu endereço completo]
   CPF: [seu CPF]
   ```

3. **Importante para .com.br**:
   - Registro.br exige CPF válido
   - Email deve ser verificável
   - Dados devem ser reais (auditoria)

4. Revisar pedido:
   ```
   neptuno.com.br - $10.00/year
   Auto-renewal: ON (recomendado)
   ```

5. Adicionar cartão de crédito
6. Confirmar compra

**Cobrança:**
- Primeira cobrança: $10 (R$ ~50)
- Renovação anual: automática
- Cancelamento: a qualquer momento

**Tempo: 5 minutos**

---

### PASSO 2.3: Aguardar Aprovação

**Para .com.br:**

1. Registro.br vai enviar email de confirmação
2. **IMPORTANTE**: Clique no link de verificação!
3. Aguarde aprovação (geralmente 1-24h)
4. Vercel notifica quando aprovado

**Para .com (internacional):**
- Aprovação instantânea (5 minutos)

**Status no Vercel:**
- ⏳ Pending verification
- ✅ Active

**Tempo de espera: 1-24h (.com.br) ou 5min (.com)**

---

### PASSO 2.4: Configurar Domínio (Automático!)

Vercel configura **TUDO automaticamente**:

✅ DNS apontando para Vercel
✅ SSL/TLS certificado (Let's Encrypt)
✅ CDN global ativado
✅ HTTPS forçado
✅ HTTP → HTTPS redirect

**Você NÃO precisa fazer nada!**

**Verificação:**
1. Vá para **"Settings"** → **"Domains"**
2. Veja: `neptuno.com.br` com ícone ✅ verde
3. SSL Status: **Active**

**Tempo: automático (5-30min)**

---

### PASSO 2.5: Testar Domínio

Abra browser:

```
https://neptuno.com.br
```

✅ Deve abrir NEPTUNO normalmente
✅ Cadeado verde (SSL ativo)
✅ Rápido (CDN global)

**Testes:**
- `http://neptuno.com.br` → redirect para HTTPS ✅
- `www.neptuno.com.br` → redirect para apex ✅
- HTTPS funcionando ✅

**Se não funcionar ainda:**
- Aguardar propagação DNS (até 48h, geralmente 1h)
- Limpar cache do browser (Ctrl+F5)
- Testar em navegador anônimo

**Tempo: 5 minutos**

---

## 🌐 PARTE 3: Configurar Subdomínios

### PASSO 3.1: Adicionar api.neptuno.com.br (Railway)

Para que `api.neptuno.com.br` aponte para Railway:

**No Vercel:**
1. **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite: `api.neptuno.com.br`
4. Selecione: **"Add as redirect"** ou **"Add as CNAME"**

**Opção A: Redirect (Simples)**
- Redirect `api.neptuno.com.br` → Railway URL
- Não recomendado (URL muda no browser)

**Opção B: CNAME (Profissional - RECOMENDADO)**

1. No Vercel, clique em **"DNS Records"** → **"Add Record"**
2. Configure:
   ```
   Type: CNAME
   Name: api
   Value: neptuno-ml-api-production.up.railway.app
   TTL: Auto
   ```
3. Clique em **"Add"**

**No Railway:**
1. Vá para serviço da API
2. **Settings** → **Domains**
3. Clique em **"Custom Domain"**
4. Digite: `api.neptuno.com.br`
5. Railway verifica e ativa

**Resultado:**
- ✅ `neptuno.com.br` → Frontend (Vercel)
- ✅ `api.neptuno.com.br` → Backend (Railway)
- ✅ SSL em ambos

**Tempo: 10 minutos**

---

## ⚙️ PARTE 4: Configurações Avançadas (Opcional)

### PASSO 4.1: Configurar Redirects

No Vercel, criar `vercel.json` na raiz do projeto:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://api.neptuno.com.br/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

**O que isso faz:**
- `/api/*` no frontend → proxy para Railway API
- Security headers automáticos
- CORS facilitado

Commit:
```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"
git add vercel.json
git commit -m "Add Vercel configuration"
git push origin main
```

Vercel redeploy automático!

---

### PASSO 4.2: Configurar Analytics (Grátis)

1. No projeto Vercel, vá para **"Analytics"**
2. Clique em **"Enable Analytics"**
3. Vercel adiciona automaticamente

**Métricas:**
- Visitantes únicos
- Pageviews
- Países
- Devices (mobile/desktop)
- Performance (Core Web Vitals)

**Custo**: Grátis até 100k requests/mês

---

### PASSO 4.3: Configurar Speed Insights

1. No projeto, vá para **"Speed Insights"**
2. Clique em **"Enable"**
3. Adicione snippet ao `index.html`:

```html
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

**Métricas:**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

---

## 📊 PARTE 5: Monitoramento

### Vercel Dashboard:

**Deployments:**
- Histórico de deploys
- Logs de build
- Preview deploys (branches)

**Analytics:**
- Tráfego em tempo real
- Origem geográfica
- Referrers

**Logs:**
- Function logs (se usar functions)
- Edge logs
- Build logs

**Alerts:**
- Email quando deploy falha
- Slack integration (opcional)

---

## 💰 PARTE 6: Custos Finais

### Custos Anuais:

| Item | Custo/ano | Custo/mês |
|------|-----------|-----------|
| **Domínio .com.br** | R$ 50 | R$ 4,17 |
| **Vercel Hobby** | R$ 0 | R$ 0 |
| **Railway Hobby** | R$ 300 | R$ 25 |
| **TOTAL** | **R$ 350/ano** | **R$ 29/mês** |

### Limites Free Tier Vercel:

- ✅ **Bandwidth**: 100GB/mês
- ✅ **Builds**: Ilimitados
- ✅ **Deployments**: Ilimitados
- ✅ **Team members**: 1
- ✅ **Projects**: Ilimitados
- ✅ **Domains**: Ilimitados

**Quando escalar para Vercel Pro ($20/mês)?**
- Bandwidth > 100GB/mês
- Precisa de múltiplos team members
- Analytics avançados
- Suporte prioritário

**Para NEPTUNO, Free tier é PERFEITO para começar!**

---

## 🔄 PARTE 7: Workflow de Deploy

### Deploy Automático (Git Push):

```bash
# 1. Fazer mudanças
Edit: index.html

# 2. Commit
git add .
git commit -m "Update: Add ML prediction button"

# 3. Push
git push origin main

# 4. Aguardar deploys automáticos:
# ⏳ Vercel: Deploy frontend (1-2min)
# ⏳ Railway: Deploy backend (2-3min)

# 5. Testar:
# ✅ https://neptuno.com.br
# ✅ https://api.neptuno.com.br
```

**Zero esforço adicional!** 🎉

---

### Preview Deploys (Branches):

```bash
# Criar branch feature
git checkout -b feature/new-design
Edit: index.html
git add .
git commit -m "Redesign Step 8"
git push origin feature/new-design

# Vercel cria preview automaticamente:
# https://neptuno-git-feature-new-design-tadeuscofield.vercel.app

# Testar preview
# Se OK, merge para main
git checkout main
git merge feature/new-design
git push origin main

# Deploy production automático!
```

**Testes sem risco em produção!**

---

## ✅ CHECKLIST FINAL

### Deploy Vercel:
- [ ] Conta Vercel criada
- [ ] Projeto importado do GitHub
- [ ] Build settings configurados
- [ ] Deploy bem-sucedido
- [ ] URL testada (.vercel.app)
- [ ] Frontend funcionando

### Domínio:
- [ ] Domínio verificado disponibilidade
- [ ] Domínio comprado
- [ ] Email verificado
- [ ] DNS configurado (automático)
- [ ] SSL ativo
- [ ] Domínio testado

### Subdomínios:
- [ ] `api.neptuno.com.br` configurado
- [ ] CNAME apontando para Railway
- [ ] Railway custom domain ativo
- [ ] SSL em subdomínio ativo
- [ ] API testada via subdomínio

### Integrações:
- [ ] Frontend chamando Railway API
- [ ] CORS configurado
- [ ] Analytics ativado
- [ ] Speed Insights ativo
- [ ] Logs funcionando

---

## 🎯 RESUMO EXECUTIVO

```
┌─────────────────────────────────────────────┐
│       NEPTUNO - ARQUITETURA FINAL           │
├─────────────────────────────────────────────┤
│                                             │
│  Frontend (Vercel)                          │
│  └─> https://neptuno.com.br                 │
│      ├─> HTML/React estático                │
│      ├─> SSL grátis                         │
│      ├─> CDN 70+ cidades                    │
│      └─> Deploy automático (GitHub)         │
│                                             │
│  Backend (Railway)                          │
│  └─> https://api.neptuno.com.br             │
│      ├─> Flask API                          │
│      ├─> PostgreSQL                         │
│      ├─> Machine Learning                   │
│      └─> Always-on ($5/mês)                 │
│                                             │
│  Repositório (GitHub)                       │
│  └─> github.com/tadeuscofield/Neptuno       │
│      ├─> Versionamento                      │
│      ├─> CI/CD automático                   │
│      └─> Backup automático                  │
│                                             │
│  CUSTO TOTAL: R$ 29/mês                     │
│  ESCALÁVEL: Milhões de usuários             │
│  UPTIME: 99.99%                             │
│  SUPORTE: 24/7 (dashboards)                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📞 Suporte

### Vercel:
- **Docs**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Status**: https://vercel-status.com
- **Email**: support@vercel.com

### Registro.br (.com.br):
- **Site**: https://registro.br
- **Telefone**: 0800 887 4000
- **Email**: cobranca@registro.br

---

## 🎉 PARABÉNS!

Você agora tem:

✅ Frontend profissional no Vercel
✅ Backend escalável no Railway
✅ Domínio personalizado
✅ SSL em tudo
✅ Deploy automático
✅ Monitoramento completo
✅ Stack pronta para produção

**Custo: R$ 29/mês**
**Uptime: 99.99%**
**Escalabilidade: Milhões de users**

**Você está PRONTO para ir ao mercado!** 🚀

---

**Desenvolvido por Eng. Tadeu Santana**
**NEPTUNO © 2025**
**https://neptuno.com.br**
