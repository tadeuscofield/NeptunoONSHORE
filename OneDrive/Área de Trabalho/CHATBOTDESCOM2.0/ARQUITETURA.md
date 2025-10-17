# 🏗️ Arquitetura do Sistema - Chatbot Descomissionamento

## 📐 Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                     CHATBOT DESCOMISSIONAMENTO                   │
│                        (React Component)                         │
└─────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
         ┌──────────────────┐        ┌──────────────────┐
         │  NLP Processor   │        │ Knowledge Base   │
         │  (AI Engine)     │        │  (100+ Q&A)      │
         └──────────────────┘        └──────────────────┘
```

## 📦 Estrutura de Arquivos

```
CHATBOTDESCOM2.0/
│
├── 📁 src/
│   ├── 📁 components/
│   │   └── 🔷 DecommissioningChatbot.jsx (31.8 KB) ⭐ PRINCIPAL
│   │
│   ├── 📁 utils/
│   │   └── 🧠 nlpProcessor.js (Motor de IA)
│   │
│   ├── 📁 data/
│   │   └── 📚 knowledgeBase.js (Base de Conhecimento)
│   │
│   ├── 🔷 App.jsx (Integração)
│   └── 🎨 index.css (Estilos Tailwind)
│
├── 📄 package.json (Dependências)
├── ⚙️ tailwind.config.js (Configuração CSS)
├── 📖 README.md (Documentação Principal)
├── 📘 GUIA_RAPIDO.md (Tutorial)
├── 🧪 TESTES.md (Plano de Testes)
├── 📋 RESUMO_IMPLEMENTACAO.md (Resumo)
└── 🏗️ ARQUITETURA.md (Este arquivo)
```

## 🔄 Fluxo de Dados

### 1. Input do Usuário → Processamento
```
┌─────────────┐
│   Usuário   │
│  digita     │
│  pergunta   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  handleSendMessage()                │
│  - Valida input                     │
│  - Adiciona msg ao estado           │
│  - Chama processMessage()           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  processMessage(query)              │
│  1. Extrai entidades                │
│  2. Classifica intenção             │
│  3. Busca semântica                 │
│  4. Verifica sugestão PDIDESCOM     │
│  5. Gera resposta                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Resposta exibida no chat           │
│  - Conteúdo formatado               │
│  - Score de confiança               │
│  - Botões de ação                   │
│  - Debug info (se ativado)          │
└─────────────────────────────────────┘
```

### 2. Busca Semântica (NLP)
```
Query: "Qual o prazo do PDI marítimo?"
   │
   ▼
┌─────────────────────────────────┐
│ 1. TOKENIZAÇÃO                  │
│ "qual prazo pdi maritimo"       │
│ (remove stopwords)              │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 2. EXTRAÇÃO DE ENTIDADES        │
│ Documentos: [PDI]               │
│ Instalações: [marítimo]         │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 3. CLASSIFICAÇÃO DE INTENÇÃO    │
│ Intent: "prazo"                 │
│ Confidence: 0.8                 │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 4. BUSCA SEMÂNTICA (4 FATORES)  │
│                                 │
│ Para cada pergunta na base:     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Similaridade Pergunta (40%) │ │
│ │ Jaccard(query, question)    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Similaridade Resposta (20%) │ │
│ │ Jaccard(query, answer)      │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Entidades (30%)             │ │
│ │ PDI match? +15%             │ │
│ │ Marítimo match? +15%        │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Categoria Relevante (10%)   │ │
│ │ Intent=prazo & Cat=Prazos?  │ │
│ └─────────────────────────────┘ │
│                                 │
│ Score Total = Soma dos fatores  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 5. ORDENAÇÃO E FILTRAGEM        │
│ - Remove scores < 15%           │
│ - Ordena decrescente            │
│ - Retorna top 3                 │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ 6. RESULTADO                    │
│ [                               │
│   {                             │
│     question: "...",            │
│     answer: "5 anos antes...",  │
│     category: "Prazos",         │
│     score: 0.85,                │
│     entities: {...},            │
│     intent: {...}               │
│   }                             │
│ ]                               │
└─────────────────────────────────┘
```

## 🧩 Componentes do Sistema

### DecommissioningChatbot (Principal)

#### Estados (useState)
```javascript
1. messages          // Array de mensagens
2. inputMessage      // Texto do input
3. isTyping          // Bot digitando?
4. showPDIButton     // Mostrar PDIDESCOM?
5. savedMessages     // Mensagens salvas
6. isSidebarOpen     // Sidebar aberta?
7. activeTab         // Tab ativa (chat/search/saved)
8. searchQuery       // Query de busca
9. searchResults     // Resultados da busca
10. selectedCategory // Categoria filtrada
11. devMode          // Modo desenvolvedor?
12. lastAnalysis     // Última análise NLP
```

#### Refs (useRef)
```javascript
1. messagesEndRef  // Para auto-scroll
2. inputRef        // Para focar input
```

#### Funções Principais
```javascript
1. handleSendMessage()      // Envia mensagem
2. processMessage(query)    // Processa com NLP
3. handleFeedback(id, type) // Feedback 👍👎
4. handleSaveMessage(msg)   // Salva mensagem 💾
5. handleSearch()           // Busca avançada
6. addSearchResultToChat()  // Adiciona resultado ao chat
7. handleKeyPress(e)        // Tecla Enter
```

### NLPProcessor (Motor de IA)

#### Métodos Principais
```javascript
1. tokenize(text)
   → Remove acentos, normaliza, filtra stopwords
   → Retorna: ['token1', 'token2', ...]

2. jaccardSimilarity(set1, set2)
   → Calcula: intersecção / união
   → Retorna: 0.0 a 1.0

3. extractEntities(text)
   → Usa regex patterns
   → Retorna: { documentos[], prazos[], instalacoes[], normas[] }

4. classifyIntent(text)
   → Conta palavras-chave por categoria
   → Retorna: { intent: 'prazo', confidence: 0.8 }

5. semanticSearch(query, limit=5)
   → Busca multifatorial (4 fatores)
   → Retorna: Array ordenado por score

6. shouldSuggestPDIDESCOM(query, results)
   → Analisa triggers e confiança
   → Retorna: { should: true/false, reason, confidence }
```

### Knowledge Base (Dados)

#### Estrutura
```javascript
{
  categoria1: {
    title: "Nome da Categoria",
    icon: IconeComponente,
    questions: [
      {
        q: "Pergunta?",
        a: "Resposta detalhada...",
        relatedLaws: ["Lei X", "Resolução Y"]
      }
    ]
  },
  // ... 10 categorias
}
```

#### Categorias (10)
```
1. conceitos           → Conceitos Básicos
2. prazos              → Prazos e Procedimentos
3. documentacao        → Documentação Obrigatória
4. responsabilidades   → Responsabilidades
5. tecnicoMaritimo     → Técnico Marítimo
6. tecnicoTerrestre    → Técnico Terrestre
7. ambiental           → Questões Ambientais
8. internacional       → Normas Internacionais
9. custosFinanceiro    → Custos e Financeiro
10. sustentabilidadeESG → ESG e Sustentabilidade
```

## 🎨 Interface (Layout)

```
┌────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
│  ┌─────┐ ┌──────────────────────┐      ┌───────┐ ┌─────────┐ │
│  │ ☰   │ │ Brain  Chatbot       │      │PDICOM │ │WhatsApp │ │
│  └─────┘ │        Descom         │      └───────┘ └─────────┘ │
│          └──────────────────────┘                             │
├────────┬──────────────────────────────────────────────────────┤
│        │                                                       │
│ SIDE   │  MESSAGES AREA                                       │
│ BAR    │  ┌─────────────────────────────────────────────────┐│
│        │  │ Bot: Olá! Sou o assistente...                   ││
│ Tabs:  │  │      [👍] [👎] [💾]                              ││
│ ┌─────┐│  │                                  22:30  ✅ 95%   ││
│ │Chat ││  └─────────────────────────────────────────────────┘│
│ └─────┘│  ┌─────────────────────────────────────────────────┐│
│ ┌─────┐│  │                          User: Qual o prazo?    ││
│ │Busca││  │                                         22:31    ││
│ └─────┘│  └─────────────────────────────────────────────────┘│
│ ┌─────┐│  ┌─────────────────────────────────────────────────┐│
│ │Salvos│  │ Bot: O prazo é 5 anos...                        ││
│ └─────┘│  │      [👍] [👎] [💾]                              ││
│        │  │                                  22:31  ✅ 87%   ││
│ ┌─────┐│  └─────────────────────────────────────────────────┘│
│ │🔧Dev││  │                                                   ││
│ └─────┘│  │ [Typing indicator: •••]                          ││
│        │  │                                                   ││
├────────┴──┴─────────────────────────────────────────────────┬─┤
│  INPUT AREA                                                  │ │
│  ┌────────────────────────────────────────────────────────┐ │ │
│  │ [Prazos] [EJD] [Custos] [Procedimentos]                │ │ │
│  ├────────────────────────────────────────────────────────┤ │ │
│  │ Digite sua pergunta...               [Enviar ▶]       │ │ │
│  └────────────────────────────────────────────────────────┘ │ │
│  Baseado na Resolução ANP 817/2020                          │ │
└─────────────────────────────────────────────────────────────┴─┘
```

## 🔀 Estados e Transições

### Estado da Mensagem
```
PENDING → PROCESSING → COMPLETED
                    ↓
                  ERROR
```

### Estado do Chatbot
```
IDLE → TYPING → RESPONDING → IDLE
       (•••)    (mensagem)
```

### Estado da Sidebar
```
CLOSED ⟷ OPEN (mobile)
OPEN (always, desktop)
```

### Tabs da Sidebar
```
CHAT ⟷ SEARCH ⟷ SAVED
```

## 🔌 Integrações

### Externas
```
┌─────────────────┐
│   WhatsApp      │ → wa.me/5521964462281
└─────────────────┘

┌─────────────────┐
│   PDIDESCOM     │ → pdidescom.com
└─────────────────┘
```

### Internas
```
┌─────────────────┐
│  React Hooks    │ → useState, useRef, useEffect
└─────────────────┘

┌─────────────────┐
│  Tailwind CSS   │ → Classes utilitárias
└─────────────────┘

┌─────────────────┐
│  Lucide React   │ → Ícones (20+)
└─────────────────┘
```

## 📊 Fluxo de Decisão - Sugestão PDIDESCOM

```
┌─────────────────────────────────────┐
│ shouldSuggestPDIDESCOM(query, res)  │
└───────────────┬─────────────────────┘
                │
        ┌───────┴────────┐
        │                │
        ▼                ▼
┌───────────────┐  ┌──────────────┐
│ Has Trigger?  │  │ Has PDI      │
│ (elaborar PDI,│  │ Entity?      │
│  plataforma)  │  │              │
└───┬───────┬───┘  └───┬──────┬───┘
    │ Yes   │ No       │ Yes  │ No
    ▼       │          ▼      │
┌────────┐  │      ┌────────┐ │
│Suggest │  │      │Low     │ │
│Conf:0.9│  │      │Conf?   │ │
└────────┘  │      └───┬────┘ │
            │          │ Yes  │ No
            │          ▼      ▼
            │      ┌────────┐ ┌────────┐
            │      │Suggest │ │Don't   │
            │      │Conf:0.7│ │Suggest │
            │      └────────┘ └────────┘
            │          │          │
            └──────────┴──────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │ Return Decision      │
            │ {should, reason,     │
            │  confidence}         │
            └──────────────────────┘
```

## 🎯 Pontos de Extensão

### 1. Adicionar Nova Categoria
```javascript
// Em knowledgeBase.js
minhaCategoria: {
  title: "Minha Categoria",
  icon: MeuIcone,
  questions: [...]
}
```

### 2. Adicionar Novo Trigger PDIDESCOM
```javascript
// Em nlpProcessor.js, shouldSuggestPDIDESCOM()
const pdiTriggers = [
  'elaborar pdi',
  'meu novo trigger', // ← Adicione aqui
  ...
];
```

### 3. Ajustar Pesos de Busca
```javascript
// Em nlpProcessor.js, semanticSearch()
score += similarity1 * 0.4; // ← Ajuste aqui
score += similarity2 * 0.2; // ← Ajuste aqui
```

### 4. Adicionar Nova Entidade
```javascript
// Em nlpProcessor.js, extractEntities()
const novaPattern = /\b(padrão)\b/gi;
const matches = text.match(novaPattern);
if (matches) entities.novaEntidade = [...matches];
```

### 5. Integrar com API Externa
```javascript
// Em DecommissioningChatbot.jsx
const fetchExternalData = async (query) => {
  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json();
  return data;
};
```

## 🔒 Segurança e Privacidade

### Dados do Usuário
```
✅ Processamento local (browser)
✅ Nenhum dado enviado para servidor
✅ Sem tracking por padrão
✅ Feedback anônimo (opcional)
```

### XSS Protection
```javascript
// Texto sempre escapado
dangerouslySetInnerHTML={{ __html: processedLine }}
// Apenas após sanitização de Markdown básico
```

## 📈 Performance

### Otimizações Implementadas
```
✅ Auto-scroll otimizado (smooth behavior)
✅ Estados minimizados
✅ Re-renders controlados
✅ Threshold de busca (15%) reduz processamento
✅ Limite de resultados (3-10)
```

### Possíveis Melhorias
```
🔄 Memoization (useMemo, useCallback)
🔄 Virtual scrolling para muitas mensagens
🔄 Web Workers para NLP pesado
🔄 IndexedDB para cache persistente
```

## 🌐 Responsividade

### Breakpoints
```css
Mobile:  < 640px   (sm)
Tablet:  640-1024px (md, lg)
Desktop: > 1024px  (xl, 2xl)
```

### Adaptações
```
Mobile:
- Sidebar em overlay
- Botão menu hamburger
- WhatsApp sem texto
- PDIDESCOM flutuante

Desktop:
- Sidebar fixa
- Todas as funcionalidades visíveis
- Layout otimizado
```

## 🎨 Design System

### Cores
```
Primária:   blue-600  (#2563eb)
Secundária: green-600 (#16a34a)
Acento:     purple-600 (#9333ea)
Alerta:     yellow-500 (#eab308)
Cinza:      gray-500  (#6b7280)
```

### Tipografia
```
Título:     text-xl, font-bold
Subtítulo:  text-sm, font-medium
Corpo:      text-sm, text-gray-700
Metadata:   text-xs, text-gray-500
```

### Espaçamento
```
Pequeno:  gap-2, p-2  (0.5rem)
Médio:    gap-4, p-4  (1rem)
Grande:   gap-6, p-6  (1.5rem)
```

---

## 📚 Referências Técnicas

### React
- Hooks: https://react.dev/reference/react
- Performance: https://react.dev/learn/render-and-commit

### Tailwind CSS
- Docs: https://tailwindcss.com/docs
- Customization: https://tailwindcss.com/docs/configuration

### Lucide Icons
- Gallery: https://lucide.dev/icons

### NLP Concepts
- Jaccard Similarity: https://en.wikipedia.org/wiki/Jaccard_index
- Named Entity Recognition: https://en.wikipedia.org/wiki/Named-entity_recognition
- Intent Classification: https://www.ibm.com/topics/intent-classification

---

**Arquitetura criada em: 10/10/2025**
**Versão: 2.0.0**
**Status: ✅ Documentado e Completo**
