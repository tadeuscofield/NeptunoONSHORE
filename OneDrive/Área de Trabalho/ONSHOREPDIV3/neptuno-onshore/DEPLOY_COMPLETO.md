# NEPTUNO ONSHORE - Deploy Completo em Produção

## Status do Deploy

### Frontend (Vercel)
- **URL**: https://frontend-73vm75buj-tadeu-santanas-projects-bff2e2e9.vercel.app
- **Status**: Deployado com sucesso
- **Último commit**: `e783fd1` - Connect frontend to Vercel backend
- **Framework**: React 18.2 + Vite 6.4 + TailwindCSS 3.3
- **Build**: Automático via GitHub integration

### Backend (Vercel Serverless)
- **URL**: https://backend-8r5oihcm1-tadeu-santanas-projects-bff2e2e9.vercel.app
- **Status**: Deployado com sucesso
- **Último commit**: `15e274b` - Add Vercel serverless config for backend
- **Runtime**: Node.js (Vercel Serverless Functions)
- **Servidor**: Express.js (server-mock.js)

---

## Credenciais de Acesso

### Admin
- **Email**: tadeu@neptunodescom.com
- **Senha**: admin2025

### Trial (Demonstração)
- **Código de Acesso**: TRIAL-DEMO-2025
- **Duração**: 7 dias
- **Limitações**: 2 projetos

---

## Arquitetura em Produção

```
┌─────────────┐
│   Usuário   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│  Frontend (Vercel)               │
│  React + Vite + TailwindCSS      │
│                                  │
│  URL: frontend-73vm75buj...      │
└──────────┬──────────────────────┘
           │
           │ HTTPS API Calls
           │
           ▼
┌─────────────────────────────────┐
│  Backend (Vercel Serverless)     │
│  Node.js + Express               │
│  PDFKit para geração de PDFs     │
│                                  │
│  URL: backend-8r5oihcm1...       │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  In-Memory Storage (Mock)        │
│  Usuários, Projetos, PDFs        │
└─────────────────────────────────┘
```

---

## Funcionalidades em Produção

### Login e Autenticação
- Login admin com email e senha
- Login trial com código de acesso
- JWT token authentication
- Sessão persistente (7 dias)

### Geração de PDI
- Criação de projetos (poços, estações, dutos)
- Cadastro de dados técnicos
- Avaliação de riscos
- Geração de PDF completo (11 páginas)
- Download direto do navegador

### Dashboard
- Visualização de projetos
- Estatísticas em tempo real
- Gráficos de progresso
- Filtros e busca

---

## Como Testar o Sistema em Produção

### 1. Acesso Admin
1. Abra: https://frontend-73vm75buj-tadeu-santanas-projects-bff2e2e9.vercel.app
2. Clique em "Sou Admin"
3. Email: `tadeu@neptunodescom.com`
4. Senha: `admin2025`
5. Clique em "Entrar"

### 2. Criar Projeto de Teste
1. No dashboard, clique em "Novo Projeto PDI"
2. Preencha os dados:
   - **Nome**: "Poço REC-347 - Teste Produção"
   - **Tipo**: Poço
   - **Localização**: Recôncavo Baiano
3. Clique em "Criar Projeto"

### 3. Gerar PDF
1. Clique em "Continuar Projeto"
2. Preencha as seções (dados técnicos, ambientais, etc.)
3. Ao final, clique em "Gerar PDF"
4. O PDF será gerado e baixado automaticamente

---

## Variáveis de Ambiente

### Frontend (.env)
```
VITE_API_URL=https://backend-8r5oihcm1-tadeu-santanas-projects-bff2e2e9.vercel.app/api
VITE_APP_NAME=NEPTUNO ONSHORE
VITE_APP_VERSION=2.1.1
```

### Backend (Vercel Environment)
```
NODE_ENV=production
```

---

## Configurações de Deploy

### Frontend (frontend/vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "https://backend-8r5oihcm1-tadeu-santanas-projects-bff2e2e9.vercel.app/api",
    "VITE_APP_NAME": "NEPTUNO ONSHORE",
    "VITE_APP_VERSION": "2.1.1"
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend (backend/vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server-mock.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server-mock.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## Histórico de Commits

```
e783fd1 🔗 Connect frontend to Vercel backend in production
15e274b ⚙️ Add Vercel serverless config for backend
126d66d 🚀 Add complete backend folder
2619998 🚂 Prepare backend for Railway deployment
a141739 📚 Add documentation and Vercel deployment config
5915618 🐛 Fix PDF blank pages - Remove unnecessary page breaks
```

---

## Próximos Passos (Opcional)

### 1. Domínio Personalizado
- Comprar domínio: `neptunoonshore.com`
- Configurar no Vercel:
  - Frontend: `app.neptunoonshore.com`
  - Backend: `api.neptunoonshore.com`

### 2. Melhorias Futuras
- [ ] Integrar com PostgreSQL (substituir mock storage)
- [ ] Adicionar envio de email (trial code)
- [ ] Implementar ML real (substituir heurísticas)
- [ ] Adicionar analytics (Google Analytics ou Mixpanel)
- [ ] Criar API documentation (Swagger)
- [ ] Implementar rate limiting
- [ ] Adicionar monitoring (Sentry)

### 3. Unificação OFFSHORE + ONSHORE
- [ ] Criar arquitetura unificada
- [ ] Integrar ML do NEPTUNOV2
- [ ] Dashboard único para ambos sistemas
- [ ] Compartilhar autenticação

---

## Suporte e Manutenção

### Logs e Debug
- **Frontend**: `vercel logs frontend-73vm75buj... --follow`
- **Backend**: `vercel logs backend-8r5oihcm1... --follow`

### Redeploy Manual
```bash
# Frontend
cd frontend
vercel --prod

# Backend
cd backend
vercel --prod
```

### Verificar Status
- Frontend: https://vercel.com/tadeu-santanas-projects-bff2e2e9/frontend
- Backend: https://vercel.com/tadeu-santanas-projects-bff2e2e9/backend

---

## Conclusão

O sistema NEPTUNO ONSHORE está 100% funcional em produção no Vercel!

Todas as funcionalidades foram testadas:
- ✅ Login (admin e trial)
- ✅ Dashboard
- ✅ Criação de projetos
- ✅ Geração de PDFs
- ✅ Download de documentos

O sistema está pronto para demonstrações, feira e apresentações aos clientes!

---

**Desenvolvido com:** React 18.2 + Node.js + Express + PDFKit + TailwindCSS
**Deploy:** Vercel (Frontend + Backend Serverless)
**Versão:** 2.1.1
**Data:** 26 de Outubro de 2025
