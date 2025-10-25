# 🌊 NEPTUNO ONSHORE

> Plataforma SaaS profissional para criação de PDI (Plano de Desativação de Instalações) para ativos onshore de petróleo e gás.

[![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff?logo=vite)](https://vitejs.dev/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

**Versão:** 2.1.1
**Stack:** React + Node.js + PDFKit + ML (Em Desenvolvimento)

---

## 📋 Visão Geral

Sistema profissional para geração automatizada de **Planos de Desativação de Instalações (PDI)** para ativos terrestres de petróleo e gás.

### Tipos de Ativos Suportados:
1. 💧 **Poços Terrestres** (foco principal - 60-70% do mercado)
2. 🏭 **Estações de Produção**
3. 📏 **Dutos Terrestres**
4. ⚫ **Tanques e Armazenamento**

---

## 🎯 Diferenciais

- ✅ **Wizard Adaptativo** - Formulário muda conforme tipo de ativo
- ✅ **ML Híbrido** - Transfer learning (offshore → onshore)
- ✅ **Geração Automática** - PDI completo em minutos
- ✅ **Compliance ANP/IBAMA** - Templates regulatórios atualizados
- ✅ **Multi-tenant** - Suporta múltiplas operadoras
- ✅ **Cloud Ready** - Deploy Vercel/Railway

---

## 🏗️ Arquitetura

```
neptuno-onshore/
├── backend/              # API Node.js + Express
│   ├── src/
│   │   ├── controllers/  # Lógica de negócio
│   │   ├── models/       # Modelos PostgreSQL
│   │   ├── routes/       # Rotas API
│   │   ├── services/     # Serviços (ML, PDF, Upload)
│   │   ├── middleware/   # Auth, validação
│   │   └── config/       # Configurações
│   ├── package.json
│   └── server.js
│
├── frontend/             # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas principais
│   │   ├── wizards/      # Wizards por tipo de ativo
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API calls
│   │   ├── utils/        # Utilitários
│   │   └── assets/       # Imagens, ícones
│   ├── package.json
│   └── vite.config.js
│
├── database/             # Schema PostgreSQL
│   ├── migrations/       # Migrações
│   ├── seeds/            # Dados iniciais
│   └── schema.sql        # Schema principal
│
├── ml-engine/            # Motor ML Python
│   ├── models/           # Modelos treinados
│   ├── datasets/         # Datasets (offshore + onshore)
│   ├── train.py          # Script de treinamento
│   ├── api.py            # API Flask para geração
│   └── requirements.txt
│
└── docs/                 # Documentação
    ├── API.md
    ├── DEPLOYMENT.md
    └── USER_GUIDE.md
```

---

## 🚀 Stack Tecnológica

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** PostgreSQL 15+
- **ORM:** Prisma / Sequelize
- **Auth:** JWT + bcrypt
- **Upload:** Multer + AWS S3
- **PDF:** PDFKit

### Frontend
- **Framework:** React 18+
- **Build:** Vite
- **Styling:** TailwindCSS 3+
- **Forms:** React Hook Form + Zod
- **State:** Zustand / React Query
- **Router:** React Router v6
- **UI:** Shadcn/ui + Radix UI

### ML Engine
- **Language:** Python 3.11+
- **Framework:** TensorFlow / PyTorch
- **NLP:** Transformers (Hugging Face)
- **API:** Flask / FastAPI
- **Dataset:** Offshore (15-20) + Onshore (50+)

### DevOps
- **Deploy Backend:** Railway / Render
- **Deploy Frontend:** Vercel
- **Database:** Neon / Supabase
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry

---

## ⚡ Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL, JWT_SECRET, etc.
npm run migrate
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Configure VITE_API_URL
npm run dev
```

### 3. ML Engine

```bash
cd ml-engine
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python api.py
```

### 4. Database

```bash
cd database
psql -U postgres -f schema.sql
```

---

## 📊 Funcionalidades

### MVP (Fase 1) - 3 semanas
- [x] Autenticação (Login/Registro)
- [x] Dashboard administrativo
- [x] Wizard para Poços Terrestres (5 passos)
- [x] Upload de documentos
- [x] Geração de PDI básico (template)
- [x] Download PDF

### Fase 2 - 2 semanas
- [ ] Wizard para Estações
- [ ] Wizard para Dutos
- [ ] Wizard para Tanques
- [ ] ML integrado (geração automática)
- [ ] Preview de PDI antes de gerar

### Fase 3 - 2 semanas
- [ ] Multi-tenant completo
- [ ] Gestão de usuários/equipes
- [ ] Histórico de projetos
- [ ] Versionamento de PDIs
- [ ] Dashboard de analytics

### Fase 4 - 1 semana
- [ ] Assinatura digital
- [ ] Integração com ANP/IBAMA
- [ ] Exportação múltiplos formatos
- [ ] API pública

---

## 🎨 Fluxo do Usuário

```
1. LOGIN/REGISTRO
   ↓
2. DASHBOARD
   ↓
3. NOVO PROJETO → Escolher tipo de ativo
   ↓
4. WIZARD ADAPTATIVO (5-6 passos)
   ├─ Poço: 5 passos
   ├─ Estação: 6 passos
   ├─ Duto: 6 passos
   └─ Tanque: 4 passos
   ↓
5. UPLOAD DOCUMENTOS
   ↓
6. PREVIEW PDI
   ↓
7. GERAR + DOWNLOAD PDF
   ↓
8. SALVAR NO HISTÓRICO
```

---

## 🔐 Autenticação

- JWT tokens (access + refresh)
- Roles: `admin`, `operator`, `viewer`
- Multi-tenant: Operadoras isoladas
- Rate limiting
- Password reset via email

---

## 📄 Templates de PDI

### Poço Terrestre (Simplificado)
1. Identificação do Empreendimento
2. Justificativa para Desativação
3. Descrição das Instalações
4. Diagnóstico Ambiental
5. Metodologia de Abandono
6. Cronograma
7. Estimativa de Custos
8. Gestão de Resíduos
9. PRAD (Plano de Recuperação)
10. Responsabilidades

### Estação (Detalhado)
1-10 (acima) +
11. Descontaminação de Equipamentos
12. Destinação de Ativos

---

## 🤖 Machine Learning

### Estratégia: Transfer Learning

**Modelo Base (Offshore):**
- 15-20 PDIs offshore
- Aprende estrutura geral

**Fine-tuning (Onshore):**
- Templates onshore (3 tipos)
- 50 PDIs sintéticos
- Dados reais (crescimento orgânico)

**Resultado:**
- Modelo híbrido (offshore + onshore)
- Geração automática de seções
- Melhora com uso

---

## 🌐 Deploy

### Opção 1: Vercel + Railway (Recomendado)
- Frontend: Vercel
- Backend: Railway
- Database: Neon (Postgres)
- ML: Hugging Face Spaces

### Opção 2: AWS
- Frontend: S3 + CloudFront
- Backend: EC2 / ECS
- Database: RDS
- ML: SageMaker

### Opção 3: Google Cloud
- Frontend: Firebase Hosting
- Backend: Cloud Run
- Database: Cloud SQL
- ML: Vertex AI

---

## 📈 Mercado

### Público-Alvo
- PetroRecôncavo, 3R Petroleum, Potiguar E&P
- Operadoras independentes médio porte
- Bacias: Recôncavo, Potiguar, Sergipe-Alagoas

### Potencial
- 1.500 - 3.000 poços inativos
- R$ 150 - 600 milhões de mercado
- 60-70% do mercado onshore

---

## 📞 Suporte

**Desenvolvido por:** NEPTUNO Team
**Email:** contato@neptuno.com.br
**Versão:** 3.0 - Onshore Focus

---

**🚀 Let's Build!**
