# 🚀 Guia Rápido - Chatbot Descomissionamento

## ⚡ Início Rápido

### 1. Instalação e Execução

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Executar em modo desenvolvimento
npm start

# Abrir no navegador
# http://localhost:3000
```

### 2. Primeiros Passos

1. **Abra o navegador** em `http://localhost:3000`
2. **Digite uma pergunta** no campo de entrada
3. **Pressione Enter** ou clique em "Enviar"
4. **Veja a resposta** com score de confiança

## 💬 Exemplos de Perguntas

### Perguntas sobre Prazos
```
- "Qual o prazo para apresentar o PDI conceitual marítimo?"
- "Em quanto tempo devo submeter o RDI?"
- "Quando apresentar o PDI executivo?"
```

### Perguntas sobre Documentação
```
- "O que é o EJD?"
- "Quais documentos são obrigatórios?"
- "O que deve conter o memorial descritivo?"
```

### Perguntas Técnicas
```
- "Como fazer arrasamento de poços?"
- "É permitido alijamento no mar?"
- "Qual a profundidade de corte submarino?"
```

### Perguntas sobre Custos
```
- "Quanto custa um descomissionamento offshore?"
- "Como calcular a provisão financeira?"
- "Quais são as garantias financeiras aceitas?"
```

## 🎯 Funcionalidades Principais

### 1. Sistema de Feedback
- Clique em 👍 se a resposta foi útil
- Clique em 👎 se não foi útil
- Ajuda a melhorar o sistema

### 2. Salvar Respostas
- Clique no ícone 💾 para salvar
- Acesse no menu lateral > "Salvos"

### 3. Busca Avançada
- Abra o menu lateral (☰)
- Clique em "Busca"
- Digite sua pesquisa
- Filtre por categoria
- Clique no resultado para adicionar ao chat

### 4. Navegação por Categorias
- Menu lateral > "Chat"
- Clique em uma categoria
- Veja perguntas relacionadas

### 5. Modo Desenvolvedor 🔧
- Menu lateral (parte inferior)
- Ative "Modo Desenvolvedor"
- Veja análise NLP completa:
  - Entidades detectadas
  - Classificação de intenção
  - Scores de fontes
  - JSON estruturado

### 6. Botão PDIDESCOM
- Aparece quando o chatbot identifica necessidade
- Link direto para plataforma
- Sugestão inteligente baseada em contexto

### 7. WhatsApp
- Botão fixo no topo
- Clique para contato direto
- (21) 96446-2281

## 🔍 Como Funciona a IA

### 1. Processamento da Pergunta
```
Usuário digita → Tokenização → Remoção de stopwords → Normalização
```

### 2. Extração de Entidades
```
Texto → Regex Patterns → Entidades Detectadas
- Documentos: PDI, EJD, RDI, TLD, SPA
- Prazos: X anos, X meses, X dias
- Instalações: marítimo, terrestre, FPSO
- Normas: ANP, 817, CONAMA, IBAMA
```

### 3. Classificação de Intenção
```
Palavras-chave → Score → Intenção Principal
- Pergunta (o que, qual, como)
- Prazo (quando, dias, cronograma)
- Custo (preço, orçamento)
- Processo (procedimento, etapas)
- Normativo (lei, resolução)
- Técnico (equipamento, instalação)
```

### 4. Busca Semântica (4 Fatores)
```
40% - Similaridade com pergunta (Jaccard)
20% - Similaridade com resposta
30% - Entidades encontradas
10% - Categoria relevante
────────────────────────────
100% - Score total
```

### 5. Threshold de Confiança
```
Score > 70% → Alta confiança ✅
Score 40-70% → Média confiança ⚠️
Score < 40% → Baixa confiança ❌
Score < 15% → Não retornado
```

## 🛠️ Customização

### Alterar Threshold Mínimo
Arquivo: `src/components/DecommissioningChatbot.jsx`

```javascript
// Linha ~135 (dentro de processMessage)
if (score > 0.15) { // Altere para 0.10 (mais permissivo) ou 0.25 (mais restritivo)
```

### Adicionar Nova Categoria
Arquivo: `src/data/knowledgeBase.js`

```javascript
export default {
  // ... categorias existentes ...

  minhaNovaCategoria: {
    title: "Minha Nova Categoria",
    icon: IconeDesejado, // Importe de lucide-react
    questions: [
      {
        q: "Pergunta 1?",
        a: "Resposta detalhada...",
        relatedLaws: ["Lei X", "Resolução Y"]
      }
    ]
  }
}
```

### Ajustar Peso dos Fatores de Busca
Arquivo: `src/utils/nlpProcessor.js`

```javascript
// Linha ~105-110 (dentro de semanticSearch)
score += this.jaccardSimilarity(queryTokens, questionTokens) * 0.4; // Peso pergunta
score += this.jaccardSimilarity(queryTokens, answerTokens) * 0.2;   // Peso resposta
// ... entidades (0.15 + 0.15 = 0.3)
// ... categoria (0.1)
```

### Adicionar Stopwords
Arquivo: `src/utils/nlpProcessor.js`

```javascript
// Linha ~7-11
this.stopWords = new Set([
  'o', 'a', 'os', 'as', // ... existentes
  'sua', 'nova', 'palavra' // adicione aqui
]);
```

## 🐛 Troubleshooting

### Problema: Chatbot não responde
**Solução:**
1. Verifique o console do navegador (F12)
2. Confirme que `nlpProcessor.js` e `knowledgeBase.js` estão no local correto
3. Verifique se há erros de importação

### Problema: Respostas com baixa confiança
**Solução:**
1. Reformule a pergunta com termos mais específicos
2. Use palavras-chave da base de conhecimento
3. Ative o modo desenvolvedor para ver análise NLP
4. Ajuste o threshold (ver Customização)

### Problema: Botão PDIDESCOM não aparece
**Solução:**
1. Use gatilhos específicos: "elaborar PDI", "plataforma", "calcular custo"
2. Verifique a função `shouldSuggestPDIDESCOM` no código
3. Reduza `pdiSuggestion.confidence > 0.6` para `> 0.4`

### Problema: Sidebar não abre no mobile
**Solução:**
1. Clique no ícone ☰ (menu hamburger)
2. Verifique se há overlay escuro (clique para fechar)
3. Limpe cache do navegador

### Problema: Modo desenvolvedor não mostra dados
**Solução:**
1. Envie uma pergunta primeiro
2. Verifique se `devMode` está `true`
3. A resposta do bot deve ter dados de `entities`, `intent`, `sources`

## 📊 Métricas de Qualidade

### Bom Score (> 70%)
- Pergunta corresponde exatamente a uma da base
- Entidades detectadas corretamente
- Categoria relevante identificada

### Score Médio (40-70%)
- Pergunta similar mas não idêntica
- Algumas entidades detectadas
- Resposta parcialmente relevante

### Score Baixo (< 40%)
- Pergunta muito genérica ou fora do escopo
- Poucas entidades detectadas
- Sugestão de reformular

## 🎓 Dicas de Uso Avançado

### 1. Combinar Filtros na Busca
```
Busca: "prazo"
Categoria: "Prazos e Procedimentos"
Resultado: Respostas específicas sobre prazos
```

### 2. Explorar Mensagens Salvas
```
1. Salve respostas importantes durante navegação
2. Acesse "Salvos" no menu lateral
3. Revise informações consolidadas
```

### 3. Usar Sugestões Rápidas
```
Clique nos botões:
- "Prazos PDI"
- "Sobre EJD"
- "Custos"
- "Procedimentos"
```

### 4. Modo Desenvolvedor para Aprendizado
```
Ative para entender:
- Como a IA interpreta perguntas
- Quais entidades são detectadas
- Score de cada fonte
- Processo de classificação
```

### 5. Exportar Conversa (Manual)
```
1. Selecione mensagens importantes
2. Copie com Ctrl+C
3. Cole em documento Word/PDF
4. (Funcionalidade automática em roadmap)
```

## 📱 Atalhos de Teclado

- **Enter** - Enviar mensagem
- **Shift + Enter** - Nova linha (não implementado nesta versão)
- **Esc** - Fechar sidebar (desktop)

## 🔗 Links Úteis

- **PDIDESCOM**: https://pdidescom.com
- **WhatsApp Suporte**: https://wa.me/5521964462281
- **Resolução ANP 817/2020**: [Link oficial ANP]
- **Documentação React**: https://react.dev

## 💡 Próximos Passos

1. ✅ Explore todas as categorias
2. ✅ Teste o modo desenvolvedor
3. ✅ Salve respostas úteis
4. ✅ Use a busca avançada
5. ✅ Entre em contato via WhatsApp para dúvidas

---

**Desenvolvido com ❤️ para facilitar o descomissionamento no Brasil**

*Versão 2.0 - Powered by NLP & AI*
