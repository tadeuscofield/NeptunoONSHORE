# 💻 Exemplos de Código - Chatbot Descomissionamento

## 📚 Índice
1. [Uso Básico](#uso-básico)
2. [Customização de Cores](#customização-de-cores)
3. [Adicionar Categoria](#adicionar-categoria)
4. [Modificar NLP](#modificar-nlp)
5. [Integração com Analytics](#integração-com-analytics)
6. [Adicionar Persistência](#adicionar-persistência)
7. [Exportar Conversa](#exportar-conversa)
8. [Testes Unitários](#testes-unitários)

---

## 1. Uso Básico

### Importar e Usar o Componente
```javascript
// src/App.jsx
import React from 'react';
import DecommissioningChatbot from './components/DecommissioningChatbot';

function App() {
  return (
    <div className="App">
      <DecommissioningChatbot />
    </div>
  );
}

export default App;
```

### Usar com Props (Customização Futura)
```javascript
// Exemplo de como adicionar props ao componente

// DecommissioningChatbot.jsx - modificação
const DecommissioningChatbot = ({
  initialMessage = 'Olá! Como posso ajudar?',
  whatsappNumber = '5521964462281',
  pdiLink = 'https://pdidescom.com',
  theme = 'default' // 'default', 'dark', 'light'
}) => {
  // ... resto do código
}

// App.jsx - uso
<DecommissioningChatbot
  initialMessage="Bem-vindo ao suporte técnico!"
  theme="dark"
/>
```

---

## 2. Customização de Cores

### Alterar Tema Completo
```javascript
// Criar arquivo: src/themes.js
export const themes = {
  default: {
    primary: 'from-blue-600 to-green-600',
    secondary: 'bg-blue-600',
    accent: 'bg-purple-600',
    background: 'from-blue-50 via-white to-green-50'
  },
  dark: {
    primary: 'from-gray-800 to-gray-900',
    secondary: 'bg-gray-800',
    accent: 'bg-blue-500',
    background: 'from-gray-900 via-gray-800 to-gray-900'
  },
  ocean: {
    primary: 'from-cyan-600 to-blue-800',
    secondary: 'bg-cyan-600',
    accent: 'bg-teal-500',
    background: 'from-cyan-50 via-blue-50 to-teal-50'
  }
};

// Em DecommissioningChatbot.jsx
import { themes } from '../themes';

const DecommissioningChatbot = ({ theme = 'default' }) => {
  const colors = themes[theme];

  return (
    <div className={`flex h-screen bg-gradient-to-br ${colors.background}`}>
      {/* ... resto do código usando colors.* */}
    </div>
  );
};
```

### Cores Específicas
```javascript
// Mudar cor do botão de envio
<button
  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white..."
>
  Enviar
</button>

// Mudar cor das mensagens do bot
<div className="rounded-2xl p-4 bg-gradient-to-r from-purple-100 to-pink-100">
  {message.content}
</div>

// Mudar cor da sidebar
<div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
  <h2>Menu</h2>
</div>
```

---

## 3. Adicionar Nova Categoria

### Passo 1: Criar Categoria na Knowledge Base
```javascript
// src/data/knowledgeBase.js
import { Wrench } from 'lucide-react'; // Importar novo ícone

const knowledgeBase = {
  // ... categorias existentes ...

  manutencao: {
    title: "Manutenção e Inspeção",
    icon: Wrench,
    questions: [
      {
        q: "Qual a frequência de inspeção recomendada?",
        a: "As inspeções devem ser realizadas trimestralmente durante a fase operacional e semestralmente durante o descomissionamento, conforme boas práticas internacionais.",
        relatedLaws: ["API 510", "ASME B31.3"]
      },
      {
        q: "Como realizar inspeção de tanques de armazenamento?",
        a: "A inspeção deve incluir: avaliação visual externa, medição de espessura por ultrassom, teste de vácuo, inspeção interna (quando aplicável) e documentação fotográfica completa.",
        relatedLaws: ["API 653", "NBR 17505"]
      }
    ]
  }
};

export default knowledgeBase;
```

### Passo 2: Atualizar Classificação de Intenção (Opcional)
```javascript
// src/utils/nlpProcessor.js - método classifyIntent()
classifyIntent(text) {
  const tokens = this.tokenize(text);
  const intents = {
    pergunta: ['o que', 'qual', 'quais', 'como', 'quando', 'onde', 'por que'],
    prazo: ['prazo', 'tempo', 'quando', 'dias', 'meses', 'anos'],
    custo: ['custo', 'preço', 'valor', 'quanto custa', 'orçamento'],
    processo: ['como fazer', 'procedimento', 'etapas', 'passo a passo'],
    normativo: ['lei', 'resolução', 'norma', 'anp', 'legislação'],
    tecnico: ['tecnic', 'equipamento', 'instalação', 'remoção'],
    manutencao: ['inspeção', 'manutenção', 'verificação', 'teste'] // ← Novo
  };

  // ... resto do código
}
```

### Passo 3: Adicionar Bonus de Categoria na Busca (Opcional)
```javascript
// src/utils/nlpProcessor.js - método semanticSearch()

// Linha ~131-133 (adicionar nova condição)
if (intent.intent === 'manutencao' && categoryKey === 'manutencao') {
  score += 0.1;
}
```

---

## 4. Modificar NLP

### Adicionar Novas Entidades
```javascript
// src/utils/nlpProcessor.js - método extractEntities()
extractEntities(text) {
  const entities = {
    documentos: [],
    prazos: [],
    instalacoes: [],
    normas: [],
    equipamentos: [], // ← Novo
    localizacao: []   // ← Novo
  };

  const docPatterns = /\b(ejd|pdi|rdi|tld|spa)\b/gi;
  const prazoPatterns = /\b(\d+\s*(anos?|meses|dias))\b/gi;
  const instalacaoPatterns = /\b(marítim[ao]s?|terrestres?|offshore|onshore|fpso|plataforma)\b/gi;
  const normaPatterns = /\b(anp|817|resolução|lei|conama|ibama)\b/gi;

  // ← Novos patterns
  const equipPatterns = /\b(bomba|compressor|válvula|tanque|gerador)\b/gi;
  const locPatterns = /\b(bacia\s+de\s+\w+|campo\s+de\s+\w+|poço\s+\w+)\b/gi;

  // Extrair com regex
  const docMatches = text.match(docPatterns);
  const prazoMatches = text.match(prazoPatterns);
  const instalacaoMatches = text.match(instalacaoPatterns);
  const normaMatches = text.match(normaPatterns);
  const equipMatches = text.match(equipPatterns);      // ← Novo
  const locMatches = text.match(locPatterns);          // ← Novo

  if (docMatches) entities.documentos = [...new Set(docMatches.map(m => m.toUpperCase()))];
  if (prazoMatches) entities.prazos = [...new Set(prazoMatches)];
  if (instalacaoMatches) entities.instalacoes = [...new Set(instalacaoMatches)];
  if (normaMatches) entities.normas = [...new Set(normaMatches)];
  if (equipMatches) entities.equipamentos = [...new Set(equipMatches)];     // ← Novo
  if (locMatches) entities.localizacao = [...new Set(locMatches)];          // ← Novo

  return entities;
}
```

### Ajustar Stopwords
```javascript
// src/utils/nlpProcessor.js - constructor
constructor(knowledgeBase) {
  this.knowledgeBase = knowledgeBase;
  this.stopWords = new Set([
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem',
    'é', 'são', 'foi', 'ser', 'ter', 'que', 'qual', 'quais',
    // Adicione mais aqui
    'muito', 'mais', 'menos', 'também', 'pode', 'deve'
  ]);
}
```

### Modificar Threshold
```javascript
// src/utils/nlpProcessor.js - método semanticSearch()

// Linha ~135 (alterar threshold)
if (score > 0.10) { // Era 0.15, agora 0.10 (mais permissivo)
  results.push({...});
}

// Ou tornar mais restritivo
if (score > 0.25) { // Mais restritivo
  results.push({...});
}
```

---

## 5. Integração com Analytics

### Google Analytics
```javascript
// src/utils/analytics.js (criar arquivo)
export const logEvent = (eventName, params) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const logPageView = (page) => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: page,
    });
  }
};
```

```javascript
// Em DecommissioningChatbot.jsx
import { logEvent } from '../utils/analytics';

// No handleFeedback
const handleFeedback = (messageId, feedbackType) => {
  setMessages(prev => prev.map(msg =>
    msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
  ));

  // Analytics
  logEvent('chatbot_feedback', {
    message_id: messageId,
    feedback_type: feedbackType,
    timestamp: new Date().toISOString()
  });
};

// No handleSendMessage
const handleSendMessage = async () => {
  // ... código existente ...

  logEvent('chatbot_message_sent', {
    message_length: inputMessage.length,
    timestamp: new Date().toISOString()
  });
};
```

### Mixpanel
```javascript
// Instalar: npm install mixpanel-browser

// src/utils/mixpanel.js
import mixpanel from 'mixpanel-browser';

mixpanel.init('YOUR_TOKEN');

export const trackEvent = (eventName, properties) => {
  mixpanel.track(eventName, properties);
};

// Em DecommissioningChatbot.jsx
import { trackEvent } from '../utils/mixpanel';

const processMessage = (query) => {
  // ... processamento NLP ...

  trackEvent('Message Processed', {
    query_length: query.length,
    confidence: searchResults[0]?.score || 0,
    entities_found: Object.values(entities).flat().length,
    intent: intent.intent
  });
};
```

---

## 6. Adicionar Persistência

### LocalStorage para Mensagens Salvas
```javascript
// src/utils/storage.js (criar arquivo)
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};
```

```javascript
// Em DecommissioningChatbot.jsx
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

// Inicializar estado com localStorage
const [savedMessages, setSavedMessages] = useState(() =>
  loadFromLocalStorage('chatbot_saved_messages', [])
);

// Salvar sempre que mudar
useEffect(() => {
  saveToLocalStorage('chatbot_saved_messages', savedMessages);
}, [savedMessages]);

// Também para histórico de conversas
const [messages, setMessages] = useState(() =>
  loadFromLocalStorage('chatbot_history', [
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou o assistente...',
      timestamp: new Date(),
    }
  ])
);

useEffect(() => {
  saveToLocalStorage('chatbot_history', messages);
}, [messages]);
```

### IndexedDB para Grandes Volumes
```javascript
// Instalar: npm install idb

// src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'chatbot-db';
const STORE_NAME = 'messages';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveMessage = async (message) => {
  const db = await initDB();
  return db.add(STORE_NAME, message);
};

export const getAllMessages = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const clearMessages = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).clear();
  await tx.done;
};
```

```javascript
// Em DecommissioningChatbot.jsx
import { saveMessage, getAllMessages } from '../utils/db';

// Carregar mensagens ao iniciar
useEffect(() => {
  const loadMessages = async () => {
    const storedMessages = await getAllMessages();
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    }
  };
  loadMessages();
}, []);

// Salvar cada nova mensagem
const handleSendMessage = async () => {
  // ... código existente ...

  const userMessage = {
    id: Date.now(),
    type: 'user',
    content: inputMessage,
    timestamp: new Date(),
  };

  await saveMessage(userMessage);
  setMessages(prev => [...prev, userMessage]);

  // ... resto do código
};
```

---

## 7. Exportar Conversa

### Exportar como PDF (usando jsPDF)
```javascript
// Instalar: npm install jspdf

// src/utils/exportPDF.js
import jsPDF from 'jspdf';

export const exportChatToPDF = (messages) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Conversa - Chatbot Descomissionamento', 10, 10);

  doc.setFontSize(10);
  doc.text(`Data: ${new Date().toLocaleString('pt-BR')}`, 10, 20);

  let y = 30;

  messages.forEach((msg, index) => {
    if (y > 280) { // Nova página
      doc.addPage();
      y = 10;
    }

    const type = msg.type === 'user' ? 'Você' : 'Bot';
    const time = new Date(msg.timestamp).toLocaleTimeString('pt-BR');

    doc.setFontSize(10);
    doc.text(`[${time}] ${type}:`, 10, y);

    y += 5;

    doc.setFontSize(9);
    const lines = doc.splitTextToSize(msg.content, 180);
    doc.text(lines, 10, y);

    y += lines.length * 5 + 5;
  });

  doc.save('conversa-chatbot.pdf');
};
```

```javascript
// Em DecommissioningChatbot.jsx
import { exportChatToPDF } from '../utils/exportPDF';

// Adicionar botão no header
<button
  onClick={() => exportChatToPDF(messages)}
  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
>
  <Download size={18} />
  Exportar PDF
</button>
```

### Exportar como JSON
```javascript
// src/utils/exportJSON.js
export const exportChatToJSON = (messages) => {
  const dataStr = JSON.stringify(messages, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `chatbot-conversa-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
```

### Exportar como Markdown
```javascript
// src/utils/exportMarkdown.js
export const exportChatToMarkdown = (messages) => {
  let markdown = '# Conversa - Chatbot Descomissionamento\n\n';
  markdown += `**Data:** ${new Date().toLocaleString('pt-BR')}\n\n`;
  markdown += '---\n\n';

  messages.forEach((msg) => {
    const type = msg.type === 'user' ? '👤 Você' : '🤖 Bot';
    const time = new Date(msg.timestamp).toLocaleTimeString('pt-BR');

    markdown += `### ${type} - ${time}\n\n`;
    markdown += `${msg.content}\n\n`;

    if (msg.confidence !== undefined) {
      markdown += `*Confiança: ${(msg.confidence * 100).toFixed(0)}%*\n\n`;
    }

    markdown += '---\n\n';
  });

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `chatbot-conversa-${Date.now()}.md`;
  link.click();
  URL.revokeObjectURL(url);
};
```

---

## 8. Testes Unitários

### Testes para NLP Processor (Jest)
```javascript
// src/utils/__tests__/nlpProcessor.test.js
import NLPProcessor from '../nlpProcessor';
import knowledgeBase from '../../data/knowledgeBase';

describe('NLPProcessor', () => {
  let nlp;

  beforeEach(() => {
    nlp = new NLPProcessor(knowledgeBase);
  });

  describe('tokenize', () => {
    test('deve remover acentos', () => {
      const result = nlp.tokenize('Instalação marítima');
      expect(result).toContain('instalacao');
      expect(result).toContain('maritima');
    });

    test('deve filtrar stopwords', () => {
      const result = nlp.tokenize('o que é PDI');
      expect(result).not.toContain('o');
      expect(result).not.toContain('que');
      expect(result).toContain('pdi');
    });
  });

  describe('jaccardSimilarity', () => {
    test('deve retornar 1.0 para sets idênticos', () => {
      const set1 = new Set(['pdi', 'conceitual']);
      const set2 = new Set(['pdi', 'conceitual']);
      expect(nlp.jaccardSimilarity(set1, set2)).toBe(1.0);
    });

    test('deve retornar 0.0 para sets sem overlap', () => {
      const set1 = new Set(['pdi', 'conceitual']);
      const set2 = new Set(['custo', 'prazo']);
      expect(nlp.jaccardSimilarity(set1, set2)).toBe(0.0);
    });

    test('deve calcular corretamente overlap parcial', () => {
      const set1 = new Set(['pdi', 'conceitual']);
      const set2 = new Set(['pdi', 'executivo']);
      // 1 em comum / 3 total = 0.333...
      expect(nlp.jaccardSimilarity(set1, set2)).toBeCloseTo(0.333, 2);
    });
  });

  describe('extractEntities', () => {
    test('deve extrair documentos', () => {
      const result = nlp.extractEntities('O PDI e o EJD são obrigatórios');
      expect(result.documentos).toEqual(['PDI', 'EJD']);
    });

    test('deve extrair prazos', () => {
      const result = nlp.extractEntities('Apresentar em 5 anos');
      expect(result.prazos).toContain('5 anos');
    });

    test('deve extrair instalações', () => {
      const result = nlp.extractEntities('instalações marítimas offshore');
      expect(result.instalacoes).toContain('marítimas');
      expect(result.instalacoes).toContain('offshore');
    });
  });

  describe('classifyIntent', () => {
    test('deve classificar intenção de prazo', () => {
      const result = nlp.classifyIntent('Quando devo apresentar o PDI?');
      expect(result.intent).toBe('prazo');
    });

    test('deve classificar intenção de custo', () => {
      const result = nlp.classifyIntent('Quanto custa o descomissionamento?');
      expect(result.intent).toBe('custo');
    });
  });

  describe('semanticSearch', () => {
    test('deve retornar resultados ordenados por score', () => {
      const results = nlp.semanticSearch('prazo PDI marítimo', 5);
      expect(results.length).toBeGreaterThan(0);

      // Verificar ordenação
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
      }
    });

    test('deve filtrar resultados abaixo do threshold', () => {
      const results = nlp.semanticSearch('xyzabc123', 10);
      // Não deve retornar resultados para query sem sentido
      expect(results.every(r => r.score >= 0.15)).toBe(true);
    });
  });

  describe('shouldSuggestPDIDESCOM', () => {
    test('deve sugerir quando tiver trigger', () => {
      const query = 'Como elaborar PDI automaticamente?';
      const results = nlp.semanticSearch(query);
      const suggestion = nlp.shouldSuggestPDIDESCOM(query, results);

      expect(suggestion.should).toBe(true);
      expect(suggestion.reason).toBe('trigger_detected');
      expect(suggestion.confidence).toBeGreaterThan(0.8);
    });

    test('não deve sugerir para queries normais com alta confiança', () => {
      const query = 'Qual o prazo do PDI marítimo?';
      const results = [{ score: 0.9 }]; // Alta confiança
      const suggestion = nlp.shouldSuggestPDIDESCOM(query, results);

      expect(suggestion.should).toBe(false);
    });
  });
});
```

### Testes para Componente React (React Testing Library)
```javascript
// src/components/__tests__/DecommissioningChatbot.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DecommissioningChatbot from '../DecommissioningChatbot';

describe('DecommissioningChatbot', () => {
  test('renderiza mensagem inicial', () => {
    render(<DecommissioningChatbot />);
    expect(screen.getByText(/Olá! Sou o assistente/i)).toBeInTheDocument();
  });

  test('envia mensagem ao clicar no botão', async () => {
    render(<DecommissioningChatbot />);

    const input = screen.getByPlaceholderText(/Digite sua pergunta/i);
    const sendButton = screen.getByRole('button', { name: /enviar/i });

    fireEvent.change(input, { target: { value: 'Teste' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Teste')).toBeInTheDocument();
    });
  });

  test('não envia mensagem vazia', () => {
    render(<DecommissioningChatbot />);

    const input = screen.getByPlaceholderText(/Digite sua pergunta/i);
    const sendButton = screen.getByRole('button', { name: /enviar/i });

    fireEvent.change(input, { target: { value: '   ' } });

    expect(sendButton).toBeDisabled();
  });

  test('mostra indicador de digitação', async () => {
    render(<DecommissioningChatbot />);

    const input = screen.getByPlaceholderText(/Digite sua pergunta/i);
    fireEvent.change(input, { target: { value: 'Teste' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(screen.getByText(/Analisando/i)).toBeInTheDocument();
    });
  });

  test('salva mensagem ao clicar no botão', async () => {
    render(<DecommissioningChatbot />);

    // Enviar mensagem primeiro
    const input = screen.getByPlaceholderText(/Digite sua pergunta/i);
    fireEvent.change(input, { target: { value: 'Qual o prazo?' } });
    fireEvent.submit(input);

    // Aguardar resposta do bot
    await waitFor(() => {
      expect(screen.queryByText(/Analisando/i)).not.toBeInTheDocument();
    });

    // Clicar em salvar
    const saveButtons = screen.getAllByTitle(/Salvar mensagem/i);
    fireEvent.click(saveButtons[0]);

    // Verificar alert
    expect(window.alert).toHaveBeenCalledWith('Mensagem salva com sucesso!');
  });
});
```

---

## 9. Snippets Úteis

### Copiar Mensagem para Clipboard
```javascript
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => alert('Copiado para a área de transferência!'),
    (err) => console.error('Erro ao copiar:', err)
  );
};

// Adicionar botão
<button onClick={() => copyToClipboard(message.content)}>
  <Copy size={14} />
</button>
```

### Limpar Histórico
```javascript
const clearHistory = () => {
  if (window.confirm('Deseja realmente limpar todo o histórico?')) {
    setMessages([{
      id: 1,
      type: 'bot',
      content: 'Histórico limpo. Como posso ajudar?',
      timestamp: new Date(),
    }]);
    localStorage.removeItem('chatbot_history');
  }
};
```

### Alterar Velocidade de Digitação
```javascript
// Simular digitação caractere por caractere
const typeMessage = (message, delay = 50) => {
  let index = 0;
  const interval = setInterval(() => {
    setTypingText(prev => prev + message[index]);
    index++;
    if (index === message.length) {
      clearInterval(interval);
    }
  }, delay);
};
```

### Detecção de Linguagem
```javascript
const detectLanguage = (text) => {
  const portugueseChars = /[áàâãéêíóôõúüç]/i;
  return portugueseChars.test(text) ? 'pt' : 'en';
};
```

---

**Estes exemplos cobrem as principais customizações e extensões possíveis!** 🚀

*Última atualização: 10/10/2025*
