# 🛠️ CLIs RECOMENDADOS PARA O PROJETO NEPTUNO

---

## ✅ JÁ INSTALADOS:

1. **Node.js + npm** ✅
2. **Marp CLI** ✅ (para PowerPoint)
3. **Python** ✅ (para servidor HTTP)

---

## 🔴 ESSENCIAIS - Instalar AGORA:

### **1. Git (Controle de Versão)**
**Por quê:** Versionamento do código, backup, colaboração

```bash
# Verificar se já tem
git --version

# Se não tiver, baixar:
https://git-scm.com/download/win

# Após instalar, configurar:
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Inicializar no projeto
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"
git init
git add .
git commit -m "Initial commit - NEPTUNO v2.0"
```

**Benefícios:**
- Histórico completo de mudanças
- Voltar para versões anteriores
- Deploy fácil (Netlify, Vercel)
- Colaboração com equipe

---

### **2. Netlify CLI (Deploy)**
**Por quê:** Publicar sistema online (HTTPS grátis)

```bash
# Instalar
npm install -g netlify-cli

# Deploy do projeto
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"
netlify deploy --prod

# Resultado: https://neptuno.netlify.app (ou domínio custom)
```

**Benefícios:**
- HTTPS automático
- Deploy em 2 minutos
- Grátis para projetos pequenos
- URL profissional

---

### **3. Vercel CLI (Alternativa ao Netlify)**
**Por quê:** Outra opção de deploy (mais rápido)

```bash
# Instalar
npm install -g vercel

# Deploy
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"
vercel --prod

# Resultado: https://neptuno.vercel.app
```

**Benefícios:**
- Extremamente rápido
- Analytics grátis
- Domínio custom fácil

---

## 🟡 IMPORTANTES - Instalar em BREVE:

### **4. Pandoc (Conversão de Documentos)**
**Por quê:** Converter MD → Word, PDF profissional

```bash
# Baixar instalador:
https://pandoc.org/installing.html

# Uso:
pandoc PLANO_VENDAS.md -o PLANO_VENDAS.docx
pandoc VALIDACAO_COMPLETA.md -o VALIDACAO_COMPLETA.pdf
```

**Benefícios:**
- Converter qualquer MD para Word/PDF
- Formatação profissional
- Templates customizáveis

---

### **5. degit (Clonar Templates)**
**Por quê:** Criar novos projetos rapidamente

```bash
npm install -g degit

# Exemplo: criar nova landing page
degit user/repo meu-novo-projeto
```

---

### **6. serve (Servidor HTTP Simples)**
**Por quê:** Alternativa ao Python HTTP server (mais rápido)

```bash
npm install -g serve

# Usar:
serve "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO" -p 8080
```

**Benefícios:**
- Mais rápido que Python
- CORS automático
- Compressão GZIP

---

## 🟢 OPCIONAIS - Para Produtividade:

### **7. prettier (Formatação de Código)**
**Por quê:** Código sempre formatado

```bash
npm install -g prettier

# Formatar todos os arquivos
prettier --write "*.{js,jsx,html,css,md}"
```

---

### **8. ESLint (Análise de Código)**
**Por quê:** Encontrar erros antes de rodar

```bash
npm install -g eslint

# Analisar código
eslint *.js *.jsx
```

---

### **9. Lighthouse CLI (Performance)**
**Por quê:** Testar performance do site

```bash
npm install -g lighthouse

# Testar
lighthouse http://localhost:8080 --view
```

**Resultado:** Relatório com score de:
- Performance
- Acessibilidade
- SEO
- Best Practices

---

### **10. http-server (Alternativa ao serve)**
**Por quê:** Servidor HTTP com mais opções

```bash
npm install -g http-server

# Usar
http-server "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO" -p 8080 -c-1
```

---

## 🤖 MACHINE LEARNING - Para o Futuro:

### **11. TensorFlow.js CLI**
**Por quê:** Treinar modelos ML no navegador

```bash
npm install -g @tensorflow/tfjs-node

# Para treinar modelo de previsão de custos
```

---

### **12. Python + Scikit-learn (Backend ML)**
**Por quê:** Treinar modelos mais complexos

```bash
# Python já instalado ✅

# Instalar bibliotecas ML
pip install numpy pandas scikit-learn tensorflow jupyter
```

**Uso:**
- Treinar modelo com dados de PDIs anteriores
- Prever custos com mais precisão
- Sugerir alternativas técnicas

---

## 📊 RESUMO - O QUE INSTALAR AGORA:

### **Prioridade ALTA (Instalar HOJE):**
```bash
# 1. Git (se não tiver)
# 2. Netlify CLI ou Vercel CLI
npm install -g netlify-cli
# ou
npm install -g vercel

# 3. Pandoc (baixar instalador)
```

### **Prioridade MÉDIA (Esta Semana):**
```bash
npm install -g serve
npm install -g prettier
npm install -g lighthouse
```

### **Prioridade BAIXA (Futuro):**
```bash
npm install -g eslint
npm install -g degit
```

---

## 🎯 COMANDO ÚNICO - INSTALAR TODOS (Recomendado):

```bash
# Instalar todos os CLIs úteis de uma vez
npm install -g netlify-cli vercel serve prettier lighthouse http-server degit eslint
```

**Tempo:** ~5 minutos
**Espaço:** ~200 MB

---

## ✅ CHECKLIST DE INSTALAÇÃO:

- [x] Node.js + npm
- [x] Marp CLI
- [x] Python
- [ ] Git
- [ ] Netlify CLI ou Vercel CLI
- [ ] Pandoc
- [ ] serve
- [ ] prettier
- [ ] lighthouse

---

## 🚀 APÓS INSTALAR - PRÓXIMOS PASSOS:

1. **Inicializar Git** (versionamento)
2. **Deploy no Netlify/Vercel** (publicar online)
3. **Converter documentos com Pandoc** (Word/PDF)
4. **Testar performance com Lighthouse** (otimizar)
5. **Configurar domínio próprio** (www.neptuno.com.br)
