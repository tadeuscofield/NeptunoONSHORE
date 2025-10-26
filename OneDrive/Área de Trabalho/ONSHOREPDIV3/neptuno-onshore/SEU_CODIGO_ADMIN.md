# 🔐 SEU CÓDIGO DE ADMIN PERMANENTE

## ✅ CÓDIGO CRIADO PARA VOCÊ

```
📧 Email: tadeu@neptunodescom.com
🔑 Código Permanente: admin2025
👤 Cargo: Administrador Master
⏰ Validade: PERMANENTE (nunca expira)
```

---

## 🚀 COMO USAR SEU CÓDIGO

### Na tela de login:

1. Digite seu email: `tadeu@neptunodescom.com`
2. Cole o código: `admin2025`
3. Clique em "ACESSAR"

**Pronto!** Você terá acesso total como ADMIN!

---

## 💪 PODERES DO ADMIN

### ✅ Acesso Ilimitado:
- Projetos ilimitados (sem limite de 5)
- Nunca expira
- Todos os tipos de ativos
- Geração ilimitada de PDI

### ✅ Painel Administrativo:
- Ver todos os usuários trial
- Estatísticas de uso
- Monitorar projetos criados
- Gerenciar acessos

### ✅ Controle Total:
- Criar/editar/excluir qualquer projeto
- Acesso a todas as funcionalidades
- Ver dados de todos os usuários
- Dashboard com analytics completo

---

## 📊 SISTEMA TRIAL (Para outros usuários)

### Como funciona:

1. **Usuário acessa:** `neptunodescom.com`
2. **Insere email:** exemplo@empresa.com
3. **Recebe código:** Via email (Resend)
4. **Código válido:** 72 horas
5. **Limite:** 5 projetos

### Email que usuário recebe:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 NEPTUNO ONSHORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bem-vindo ao Trial de 72 horas!

SEU CÓDIGO DE ACESSO
┌──────────────────┐
│     A1B2C3       │  ← Código de 6 dígitos
└──────────────────┘

⏰ Válido até: 26/10/2025 às 10:30
📧 Email: exemplo@empresa.com

COMO USAR:
1. Acesse: neptunodescom.com
2. Insira seu email
3. Cole o código acima
4. Explore por 72 horas!

O QUE VOCÊ PODE FAZER:
✅ Criar até 5 projetos
✅ Testar todos os tipos de ativos
✅ Upload de documentos
✅ Gerar PDFs profissionais
✅ Explorar o Wizard Adaptativo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEPTUNO ONSHORE v3.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎛️ PAINEL ADMIN

### Rota: `/admin/users`

Você verá:

```
╔════════════════════════════════════════════════════════╗
║  PAINEL ADMINISTRATIVO - Usuários Trial               ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  📊 Estatísticas                                       ║
║  ┌─────────┐ ┌─────────┐ ┌─────────┐                 ║
║  │   45    │ │   32    │ │   13    │                 ║
║  │ Total   │ │ Ativos  │ │Expirados│                 ║
║  └─────────┘ └─────────┘ └─────────┘                 ║
║                                                        ║
║  👥 Usuários Trial                                     ║
║  ┌────────────────────────────────────────────────┐   ║
║  │ usuario@empresa.com  | 3 projetos | 48h rest  │   ║
║  │ outro@exemplo.com    | 5 projetos | 12h rest  │   ║
║  │ teste@teste.com      | 0 projetos | EXPIRADO  │   ║
║  └────────────────────────────────────────────────┘   ║
║                                                        ║
║  [Filtrar: Todos ▼] [Exportar CSV]                    ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

### Informações disponíveis:
- Email do usuário
- Data de cadastro
- Projetos criados (atual/limite)
- Tempo restante de trial
- Status (ativo/expirado)
- Último acesso
- Código de acesso (oculto por segurança)

---

## 🔧 CONFIGURAÇÃO DO RESEND

### No `.env` do backend:

```env
# Resend API
RESEND_API_KEY=re_sua_key_aqui

# Admin
ADMIN_EMAIL=tadeu@neptunodescom.com

# Frontend URL
FRONTEND_URL=https://neptunodescom.com
```

### Obter chave Resend:

1. Acesse: https://resend.com
2. Crie conta com seu email
3. Verify domain: `neptunodescom.com`
4. Copie API Key
5. Cole no `.env`

---

## 📝 ARQUIVOS CRIADOS PARA TRIAL

### Backend:
✅ `src/services/emailService.js` - Envio via Resend
✅ `src/controllers/trial.controller.js` - Lógica trial + admin
✅ `src/routes/trial.routes.js` - Rotas trial
✅ `src/models/User.v2.js` - User model atualizado

### Rotas API:

**Públicas:**
- `POST /api/trial/request` - Solicitar código
- `POST /api/trial/login` - Login com código

**Admin apenas:**
- `GET /api/trial/users` - Listar usuários trial

---

## 🧪 TESTANDO LOCAL

### 1. Criar conta trial (simular):

```bash
curl -X POST http://localhost:5000/api/trial/request \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com"}'
```

Resposta:
```json
{
  "success": true,
  "message": "Código de acesso enviado para seu email!",
  "expiresAt": "2025-10-26T10:30:00.000Z"
}
```

### 2. Login com seu código admin:

```bash
curl -X POST http://localhost:5000/api/trial/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"tadeu@neptunodescom.com",
    "accessCode":"admin2025"
  }'
```

Resposta:
```json
{
  "success": true,
  "message": "Bem-vindo, Admin!",
  "data": {
    "user": {
      "id": "uuid",
      "email": "tadeu@neptunodescom.com",
      "name": "Eng. Tadeu Santana",
      "role": "admin",
      "company": "NEPTUNO"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "..."
  }
}
```

### 3. Listar usuários trial (como admin):

```bash
curl http://localhost:5000/api/trial/users \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🎨 FRONTEND - Tela de Login

### Componente a criar:

`frontend/src/pages/TrialLogin.jsx`:

```jsx
<div className="min-h-screen gradient-primary flex items-center">
  <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
    <h1 className="text-3xl font-bold text-center mb-2">
      NEPTUNO ONSHORE
    </h1>
    <p className="text-gray-600 text-center mb-8">
      Acesse com seu email e código
    </p>

    <input
      type="email"
      placeholder="seu@email.com"
      className="input-default mb-4"
    />

    <input
      type="text"
      placeholder="Código de acesso"
      className="input-default mb-6"
    />

    <button className="btn-primary w-full">
      ACESSAR PLATAFORMA
    </button>

    <p className="text-sm text-gray-500 text-center mt-6">
      Não tem código?{' '}
      <button className="text-primary-600">
        Solicitar Trial Gratuito
      </button>
    </p>
  </div>
</div>
```

---

## 📋 RESUMO

### ✅ VOCÊ TEM:
- Código admin permanente
- Acesso total e ilimitado
- Painel de controle de usuários
- Sistema trial 72h para clientes
- Email automático via Resend

### ✅ CLIENTES TRIAL TÊM:
- 72 horas de acesso
- Limite de 5 projetos
- Todas as funcionalidades
- Código via email

### ✅ PRÓXIMOS PASSOS:
1. Configurar Resend API key
2. Testar localhost
3. Deploy
4. Começar a usar!

---

**🔐 GUARDE SEU CÓDIGO COM SEGURANÇA!**

```
admin2025
```

Este código te dá acesso total e permanente à plataforma! 🚀

