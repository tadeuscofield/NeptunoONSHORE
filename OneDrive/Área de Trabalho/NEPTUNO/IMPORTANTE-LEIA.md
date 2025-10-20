# ⚠️ IMPORTANTE - Como Usar o NEPTUNO

## 🔴 Problema Identificado: CORS

Quando você abre o `index.html` **diretamente** (clicando duas vezes), o navegador bloqueia o carregamento de arquivos JavaScript externos (`PDIComponent.jsx`) por questões de segurança (**política CORS**).

**Erro que aparece:**
```
Access to XMLHttpRequest at 'file:///C:/Users/.../PDIComponent.jsx'
has been blocked by CORS policy
```

---

## ✅ SOLUÇÃO: Usar Servidor HTTP Local

### 🚀 Opção 1: SERVIDOR.bat (RECOMENDADO)

**Mais fácil - Use este arquivo:**

```
1. Duplo clique em: SERVIDOR.bat
2. Aguarde aparecer: "Acesse: http://localhost:8080"
3. Abra o navegador em: http://localhost:8080
```

O arquivo `SERVIDOR.bat` inicia automaticamente um servidor HTTP usando Python (que está instalado no seu sistema).

**Vantagens:**
- ✅ Sem erro CORS
- ✅ Todos os arquivos carregam corretamente
- ✅ Sistema funciona 100%

---

### 🌐 Opção 2: Abrir Manualmente

Se preferir, você pode:

1. Abrir o terminal/cmd na pasta NEPTUNO
2. Executar:
   ```bash
   python -m http.server 8080
   ```
3. Abrir navegador em: `http://localhost:8080`

---

## ❌ NÃO FUNCIONA: Duplo clique no index.html

**Não use:**
- ❌ INICIAR.bat (abre file://, gera erro CORS)
- ❌ Duplo clique em index.html (abre file://, gera erro CORS)

**Por quê?**
- Navegadores modernos (Chrome, Edge, Firefox) bloqueiam por segurança
- Arquivos JSX externos precisam de protocolo HTTP (http://)

---

## 🎯 PASSO A PASSO CORRETO

### 1️⃣ Iniciar o Servidor

```
Duplo clique em: SERVIDOR.bat
```

Você verá:
```
========================================
  NEPTUNO - Servidor HTTP
========================================

Iniciando servidor local...

Acesse: http://localhost:8080

Serving HTTP on :: port 8080 (http://[::]:8080/) ...
```

### 2️⃣ Abrir o Navegador

**URL correta:**
```
http://localhost:8080
```

**OU**
```
http://localhost:8080/index.html
```

### 3️⃣ Usar o Sistema

Agora o sistema vai funcionar 100%:
- ✅ Loading "NEPTUNO" aparece
- ✅ Formulário carrega
- ✅ Todos os 8 steps funcionam
- ✅ Cálculo automático funciona
- ✅ PDF gera corretamente

---

## 🛑 Para Parar o Servidor

Quando terminar de usar:

1. Volte na janela do terminal (CMD)
2. Pressione **Ctrl + C**
3. Confirme com **S** (Sim)

---

## 🔧 Solução Alternativa: Navegador com CORS Desabilitado

**⚠️ NÃO RECOMENDADO (inseguro)**

Se realmente não quiser usar servidor, pode abrir o Chrome com CORS desabilitado:

```bash
chrome.exe --disable-web-security --user-data-dir="C:\temp-chrome"
```

**Mas isso é inseguro e não recomendado!**

---

## 📊 Comparação das Opções

| Método | Funciona? | Seguro? | Facilidade |
|--------|-----------|---------|------------|
| **SERVIDOR.bat** | ✅ SIM | ✅ SIM | ⭐⭐⭐⭐⭐ |
| Duplo clique | ❌ NÃO | ✅ SIM | ⭐⭐⭐⭐⭐ |
| Chrome --disable-security | ✅ SIM | ❌ NÃO | ⭐⭐ |

---

## 🎓 Por Que Isso Acontece?

### Explicação Técnica:

1. **Babel Standalone** precisa carregar e transformar JSX em tempo real
2. Quando você abre `file:///C:/...`, o navegador aplica **mesma origem (same-origin policy)**
3. Carregar `PDIComponent.jsx` via `<script src>` é bloqueado por CORS
4. Com servidor HTTP (`http://localhost`), não há bloqueio CORS

### Alternativas Futuras:

Para evitar isso, poderíamos:
- ✅ Compilar o código com Webpack/Vite (mas você pediu **sem Vite**)
- ✅ Colocar todo o código inline no HTML (arquivo ficaria muito grande)
- ✅ Usar servidor HTTP (solução atual - **melhor opção**)

---

## ✅ Resumo - Como Usar

```
1. Duplo clique em: SERVIDOR.bat
2. Aguarde servidor iniciar
3. Abra: http://localhost:8080
4. Use o sistema normalmente
5. Quando terminar: Ctrl+C no terminal
```

---

## 📞 Arquivos Atualizados

- ✅ `SERVIDOR.bat` - Inicia servidor HTTP automaticamente
- ✅ `IMPORTANTE-LEIA.md` - Este arquivo (instruções)
- ✅ Sistema funcionando em `http://localhost:8080`

---

## 🎉 Testado e Funcionando!

O servidor está **RODANDO AGORA** em `http://localhost:8080`

Acesse no navegador e o sistema deve funcionar perfeitamente!

---

**NEPTUNO © 2025**
*Sistema Profissional de Plano de Desativação de Instalações*

**Versão**: 2.0.3 (com servidor HTTP)
**Data**: 08/10/2025
**Status**: ✅ FUNCIONANDO via localhost:8080
