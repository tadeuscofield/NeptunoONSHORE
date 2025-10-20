# 🎬 GUIA: GRAVAÇÃO DE VÍDEO DEMO DO NEPTUNO

## 📋 PRÉ-REQUISITOS

✅ Playwright instalado (FEITO!)
✅ Chromium instalado (FEITO!)
✅ FFMPEG instalado (FEITO!)
✅ NEPTUNO rodando localmente

---

## 🚀 PASSO A PASSO

### 1️⃣ INICIAR O SERVIDOR LOCAL DO NEPTUNO

```bash
# Abra um terminal e navegue até a pasta do projeto NEPTUNO
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"

# Inicie o servidor (ajuste o comando conforme seu setup)
npm run dev
# OU
npm start
# OU
npx vite

# Anote a porta (geralmente 5173 ou 5174)
```

**IMPORTANTE:** Deixe este terminal aberto! O NEPTUNO precisa estar rodando.

---

### 2️⃣ AJUSTAR A URL NO SCRIPT (SE NECESSÁRIO)

Abra o arquivo `demo-neptuno.spec.js` e verifique a linha:

```javascript
await page.goto('http://localhost:5173'); // ← Ajuste a porta se necessário
```

Se seu NEPTUNO roda em outra porta (exemplo: 5174), altere para:

```javascript
await page.goto('http://localhost:5174');
```

---

### 3️⃣ EXECUTAR A GRAVAÇÃO

Abra um **NOVO TERMINAL** (não feche o do NEPTUNO!) e execute:

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"

npx playwright test demo-neptuno.spec.js --headed --project=chromium
```

**O que vai acontecer:**
1. Uma janela do Chrome vai abrir (modo headed = visível)
2. O script vai executar automaticamente as ações
3. O vídeo será gravado em tempo real
4. Ao finalizar, o vídeo será salvo

**Duração total:** ~75 segundos (60s de demo + 15s de setup)

---

### 4️⃣ LOCALIZAR O VÍDEO

Após a execução, o vídeo estará em:

```
C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO\test-results\
```

Procure por uma pasta com nome parecido com:
```
demo-neptuno-Demonstração-completa-do-sistema-NEPTUNO-chromium\
```

Dentro dela você encontrará:
```
video.webm  ← Este é seu vídeo!
```

---

## 🎥 QUALIDADE DO VÍDEO

### **ESPECIFICAÇÕES TÉCNICAS:**

| Parâmetro | Valor |
|-----------|-------|
| **Resolução** | 1920x1080 (Full HD) |
| **Frame Rate** | 25-30 fps |
| **Codec** | VP9 (WebM) |
| **Bitrate** | ~2-5 Mbps |
| **Tamanho** | ~8-15 MB (para 60s) |
| **Qualidade** | Alta (adequado para LinkedIn/YouTube) |

### **CONVERSÃO PARA MP4 (OPCIONAL):**

Se você precisar de MP4 (melhor compatibilidade), use FFmpeg:

```bash
ffmpeg -i video.webm -c:v libx264 -preset slow -crf 18 demo-neptuno.mp4
```

**Parâmetros:**
- `-crf 18`: Qualidade excelente (0-51, menor = melhor)
- `-preset slow`: Compressão eficiente
- Tamanho final: ~10-20 MB

---

## 🎯 OPÇÕES AVANÇADAS

### **MODO 1: Headless (Sem Interface - Mais Rápido)**

Se você não quer ver o navegador abrindo:

```bash
npx playwright test demo-neptuno.spec.js --project=chromium
```

**Vantagem:** Mais rápido, sem distrações
**Desvantagem:** Você não vê o que está sendo gravado

---

### **MODO 2: Debug (Execução Lenta para Ajustar Timing)**

Se quiser ver em câmera lenta para ajustar os tempos:

```bash
npx playwright test demo-neptuno.spec.js --headed --debug
```

**Uso:** Inspecionar elementos, ajustar seletores

---

### **MODO 3: Gravar Múltiplas Versões**

Execute 3 vezes e escolha a melhor:

```bash
npx playwright test demo-neptuno.spec.js --headed --repeat-each=3
```

Você terá 3 vídeos gerados!

---

## 🛠️ TROUBLESHOOTING

### ❌ **Erro: "net::ERR_CONNECTION_REFUSED"**

**Causa:** NEPTUNO não está rodando
**Solução:** Inicie o servidor local antes:
```bash
npm run dev
```

---

### ❌ **Erro: "Timeout waiting for locator"**

**Causa:** Seletores do script não encontram os elementos
**Soluções:**
1. Verifique se a estrutura HTML do NEPTUNO mudou
2. Ajuste os seletores em `demo-neptuno.spec.js`
3. Use modo debug: `npx playwright test --headed --debug`

---

### ❌ **Vídeo muito rápido ou muito lento**

**Ajuste os `waitForTimeout` no script:**

```javascript
// Aumentar pausa (de 1000ms para 2000ms)
await page.waitForTimeout(2000); // 2 segundos

// Diminuir pausa
await page.waitForTimeout(500); // 0.5 segundos
```

---

### ❌ **Qualidade do vídeo ruim**

**Verifique:**
1. Resolução da tela: Deve ser 1920x1080 ou maior
2. Configuração no `playwright.config.js`:
```javascript
video: {
  mode: 'on',
  size: { width: 1920, height: 1080 },
}
```

---

## 📊 TOKENS & PERFORMANCE

### **CONSUMO DE TOKENS:**

✅ **Total usado até agora:** ~46.000 tokens
✅ **Disponível:** ~154.000 tokens
✅ **Margem:** Mais que suficiente!

**Execução do script NÃO consome tokens** (roda localmente)

---

## 🎬 ROTEIRO DO VÍDEO (60 SEGUNDOS)

| Tempo | Ação | Duração |
|-------|------|---------|
| 0-10s | Abertura + Navegação PDI | 10s |
| 10-25s | Preenchimento Step 1 (Dados Gerais) | 15s |
| 25-40s | Step 3 - Inventário (Poços + FPSO) | 15s |
| 40-50s | Step 8 - Cálculo Automático 🤖 | 10s |
| 50-60s | Geração de PDF + Finalização | 10s |

---

## 🔥 PRÓXIMOS PASSOS

### **APÓS GRAVAR:**

1. ✅ Verifique a qualidade do vídeo
2. ✅ Converta para MP4 (se necessário)
3. ✅ Adicione narração (opcional):
   - Use OBS Studio para gravar voz sobre o vídeo
   - Ou use software de edição (DaVinci Resolve, Camtasia)

4. ✅ Edite (opcional):
   - Adicione intro (3-5s): Logo NEPTUNO
   - Adicione legendas (muito recomendado!)
   - Adicione música de fundo sutil
   - Adicione CTA no final: "Agende sua DEMO"

5. ✅ Publique:
   - LinkedIn (nativo, melhor engajamento)
   - YouTube (como unlisted, compartilhe link)
   - Site NEPTUNO (embed)

---

## 📞 SUPORTE

**Dúvidas?**
- Verifique logs no terminal
- Use `--debug` para modo interativo
- Ajuste timing em `demo-neptuno.spec.js`

---

**🚀 BOA GRAVAÇÃO!**

Desenvolvido com Playwright + FFMPEG
Data: 18/10/2025
