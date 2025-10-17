# Chatbot Descomissionamento 2.0

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![NLP](https://img.shields.io/badge/NLP-Powered-orange.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## Sobre o Projeto

O **Chatbot Descomissionamento 2.0** é uma aplicação web inteligente que utiliza **Inteligência Artificial** e **Processamento de Linguagem Natural (NLP)** para responder perguntas sobre descomissionamento de instalações de petróleo e gás no Brasil, com base na **Resolução ANP 817/2020** e melhores práticas internacionais.

O sistema conta com **mais de 100 perguntas e respostas** organizadas em 10 categorias especializadas, oferecendo respostas instantâneas e precisas para profissionais do setor de óleo e gás.

### Principais Diferenciais

- **Base de Conhecimento Completa**: 100+ perguntas sobre Resolução ANP 817/2020
- **IA com NLP Avançado**: Sistema de scoring semântico com similaridade Jaccard
- **Integração WhatsApp**: Atendimento direto via (21) 96446-2281
- **Botão PDIDESCOM Dinâmico**: Sugestão inteligente da plataforma de elaboração de PDI
- **Interface Responsiva**: Design moderno com Tailwind CSS
- **Modo Desenvolvedor**: Debug e análise de entidades/intenções em tempo real

---

## Índice

- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Funcionalidades de IA](#funcionalidades-de-ia)
- [Base de Conhecimento](#base-de-conhecimento)
- [Customização](#customização)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

---

## Características

### Principais Funcionalidades

- **Chat Inteligente com IA/NLP**
  - Processamento de linguagem natural avançado
  - Análise de similaridade semântica
  - Extração automática de entidades (documentos, prazos, normas)
  - Classificação de intenção do usuário
  - Score de confiança para cada resposta

- **Base de Conhecimento Especializada**
  - 10 categorias temáticas organizadas
  - 100+ perguntas e respostas detalhadas
  - Referências legais completas (ANP, CONAMA, IMO, etc.)
  - Informações sobre custos, prazos e procedimentos
  - Boas práticas internacionais

- **Interface Moderna e Intuitiva**
  - Design responsivo para desktop e mobile
  - Sidebar com busca avançada e filtros por categoria
  - Sistema de feedback (like/dislike)
  - Salvamento de mensagens importantes
  - Sugestões rápidas de perguntas

- **Integração PDIDESCOM**
  - Detecção inteligente de necessidade da plataforma
  - Botão dinâmico exibido conforme contexto
  - Link direto para elaboração automatizada de PDI

- **Funcionalidades Avançadas**
  - Modo desenvolvedor com debug completo
  - Análise de entidades e intenções
  - Histórico de conversas
  - Busca semântica na base de conhecimento
  - Filtros por categoria

---

## Tecnologias Utilizadas

### Frontend Framework
- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **React DOM 18.2.0** - Renderização de componentes

### UI/UX
- **Tailwind CSS 3.3.0** - Framework CSS utility-first
- **Lucide React 0.263.1** - Biblioteca de ícones moderna
- **PostCSS 8.4.24** - Processador CSS

### Inteligência Artificial e NLP
- **Natural 6.0.0** - Biblioteca de processamento de linguagem natural
- **Compromise 14.9.0** - Parser de texto em inglês/português
- **Fuse.js 6.6.2** - Fuzzy search e busca semântica

### Outras Dependências
- **React Helmet Async 1.3.0** - Gerenciamento de head/meta tags
- **Web Vitals 2.1.4** - Métricas de performance
- **React Scripts 5.0.1** - Scripts de build do Create React App

### Ferramentas de Desenvolvimento
- **gh-pages 4.0.0** - Deploy no GitHub Pages
- **Autoprefixer 10.4.14** - Prefixos CSS automáticos

---

## Instalação

### Pré-requisitos

- **Node.js** 14.0.0 ou superior
- **npm** 6.0.0 ou superior (ou yarn)
- **Git** para clonar o repositório

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/chatbot-descomissionamento-2.0.git
cd chatbot-descomissionamento-2.0
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário:
```env
REACT_APP_WHATSAPP_NUMBER=5521964462281
REACT_APP_PDIDESCOM_URL=https://pdidescom.com.br
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_ML_SUGGESTIONS=true
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

5. **Build para produção (opcional)**
```bash
npm run build
```

---

## Como Usar

### Interface Principal

1. **Chat Principal**
   - Digite sua pergunta na caixa de entrada
   - Use as sugestões rápidas para perguntas comuns
   - Pressione Enter ou clique em "Enviar"
   - Receba respostas instantâneas com referências legais

2. **Sidebar (Menu Lateral)**
   - **Aba Chat**: Explore categorias da base de conhecimento
   - **Aba Busca**: Faça buscas avançadas com filtros
   - **Aba Salvos**: Acesse mensagens marcadas como favoritas

3. **Feedback e Interação**
   - Clique em 👍 (útil) ou 👎 (não útil) para avaliar respostas
   - Use o ícone 💾 para salvar mensagens importantes
   - Ative o "Modo Desenvolvedor" para ver análises técnicas

### Exemplos de Perguntas

```
"Qual o prazo para apresentar o PDI conceitual marítimo?"
"O que é o EJD?"
"Quanto custa um descomissionamento offshore?"
"Como fazer arrasamento de poços terrestres?"
"Quais são as garantias financeiras exigidas?"
"O que é a Convenção de Hong Kong?"
```

### Integração WhatsApp

- Clique no botão verde "(21) 96446-2281" no canto superior direito
- Fale diretamente com especialistas via WhatsApp
- Tire dúvidas específicas do seu projeto

### Botão PDIDESCOM

- Aparece automaticamente quando você pergunta sobre elaboração de PDI
- Clique para acessar a plataforma de geração automática de documentação
- Crie PDIs completos em conformidade com ANP 817/2020

---

## Funcionalidades de IA

### Sistema de NLP (Processamento de Linguagem Natural)

O chatbot utiliza algoritmos avançados de NLP implementados na classe `NLPProcessor`:

#### 1. Tokenização e Limpeza
- Remove acentos e caracteres especiais
- Filtra stop words em português
- Normaliza texto para análise

#### 2. Extração de Entidades Nomeadas
Identifica automaticamente:
- **Documentos**: EJD, PDI, RDI, TLD, SPA
- **Prazos**: Anos, meses, dias
- **Instalações**: Marítimas, terrestres, offshore, FPSO, plataformas
- **Normas**: ANP, 817, Resolução, Lei, CONAMA, IBAMA

#### 3. Classificação de Intenção
Detecta o tipo de pergunta:
- **Pergunta**: "O que é...", "Qual...", "Como..."
- **Prazo**: Perguntas sobre cronogramas e tempos
- **Custo**: Orçamentos e valores
- **Processo**: Procedimentos e etapas
- **Normativo**: Legislação e normas
- **Técnico**: Aspectos técnicos e equipamentos

#### 4. Busca Semântica com Scoring Multifatorial

O algoritmo de scoring considera:

- **40%** - Similaridade com a pergunta (Jaccard Similarity)
- **20%** - Similaridade com a resposta
- **30%** - Bonus por entidades encontradas
- **10%** - Bonus por categoria relevante

**Fórmula de Similaridade Jaccard:**
```
Similaridade = |A ∩ B| / |A ∪ B|
```

Onde:
- A = Conjunto de tokens da pergunta do usuário
- B = Conjunto de tokens da pergunta na base de conhecimento

#### 5. Sistema de Sugestão PDIDESCOM

Detecta automaticamente quando sugerir a plataforma baseado em:
- Triggers específicos ("elaborar PDI", "fazer PDI", "criar PDI")
- Entidades PDI detectadas
- Baixa confiança nas respostas (< 30%)

### Threshold de Confiança

- **Alta confiança**: Score > 70% - Resposta muito relevante
- **Média confiança**: Score 40-70% - Resposta relevante
- **Baixa confiança**: Score < 40% - Resposta pode não ser adequada
- **Mínimo**: Score > 15% para exibir resultado

---

## Base de Conhecimento

### Estrutura Organizada em 10 Categorias

1. **Conceitos Básicos** (5+ perguntas)
   - Definições fundamentais
   - Tipos de instalações
   - Ciclo de vida de projetos

2. **Prazos e Procedimentos** (5+ perguntas)
   - Prazos para PDI conceitual e executivo
   - Cronogramas de execução
   - RDI e relatórios parciais

3. **Documentação Obrigatória** (7+ perguntas)
   - EJD, PDI, RDI
   - Memoriais descritivos
   - Planos de monitoramento

4. **Responsabilidades e Obrigações** (5+ perguntas)
   - Custos e responsabilidades
   - Garantias financeiras
   - Penalidades e sanções

5. **Aspectos Técnicos Marítimos** (6+ perguntas)
   - Alijamento e remoção
   - Profundidade de corte
   - Sinalização náutica
   - Permanência in situ

6. **Aspectos Técnicos Terrestres** (4+ perguntas)
   - Arrasamento de poços
   - Recuperação de áreas
   - Dutos terrestres

7. **Questões Ambientais** (5+ perguntas)
   - NORM (material radioativo)
   - Contaminantes no solo
   - Técnicas de remediação
   - Monitoramento pós-descomissionamento

8. **Normas Internacionais** (7+ perguntas)
   - Convenção de Hong Kong
   - Resolução IMO A.672(16)
   - Economia circular
   - Rigs-to-reefs

9. **Custos e Aspectos Financeiros** (4+ perguntas)
   - Custos típicos
   - Provisões financeiras
   - Garantias aceitas
   - Otimização de custos

10. **Profissionais e Aspectos Técnicos** (4+ perguntas)
    - Profissionais habilitados
    - Consultoria especializada
    - Certificações
    - Tecnologias utilizadas

### Referências Legais Incluídas

- Resolução ANP nº 817/2020 (completa)
- Lei nº 9.478/1997 (Lei do Petróleo)
- Lei nº 12.305/2010 (PNRS)
- Resoluções CONAMA
- Normas IMO (Organização Marítima Internacional)
- Convenção de Hong Kong
- Convenção de Londres
- NORMAM-11 e NORMAM-17 (Marinha do Brasil)
- Normas CNEN (radioatividade)
- Boas práticas internacionais

---

## Customização

### Adicionar Novas Perguntas

Edite o arquivo `src/data/knowledgeBase.js`:

```javascript
{
  q: "Sua pergunta aqui?",
  a: "Resposta detalhada...",
  relatedLaws: ["Resolução ANP nº 817/2020 - Art. X"]
}
```

### Criar Nova Categoria

```javascript
novaCategoria: {
  title: "Nome da Categoria",
  icon: IconeComponente, // do lucide-react
  questions: [
    // array de perguntas
  ]
}
```

### Ajustar Algoritmo de NLP

Edite `src/utils/nlpProcessor.js`:

- **Adicionar stop words**: Modifique o Set `this.stopWords`
- **Ajustar pesos do scoring**: Altere os multiplicadores em `semanticSearch()`
- **Novos patterns de entidades**: Adicione regex em `extractEntities()`
- **Classificação de intenção**: Expanda `classifyIntent()`

### Personalizar Aparência

Edite as classes Tailwind em `src/components/DecommissioningChatbot.jsx`:

```jsx
// Exemplo: Mudar cor primária de azul para roxo
className="bg-blue-600" → className="bg-purple-600"
```

### Configurar WhatsApp e PDIDESCOM

No arquivo `.env`:
```env
REACT_APP_WHATSAPP_NUMBER=seu_numero
REACT_APP_PDIDESCOM_URL=https://sua-url.com
```

---

## Deploy

### GitHub Pages

1. Configure o `homepage` no `package.json`:
```json
"homepage": "https://seu-usuario.github.io/chatbot-descomissionamento-2.0"
```

2. Execute o deploy:
```bash
npm run deploy
```

### Netlify

1. Faça build da aplicação:
```bash
npm run build
```

2. Arraste a pasta `build/` para o Netlify Drop

Ou conecte seu repositório Git ao Netlify para deploy automático.

### Vercel

```bash
npm i -g vercel
vercel
```

Siga as instruções no terminal.

### Servidor Próprio

1. Build de produção:
```bash
npm run build
```

2. Sirva os arquivos estáticos da pasta `build/` com:
   - Apache
   - Nginx
   - Serve: `npm install -g serve && serve -s build`

---

## Contribuindo

Contribuições são bem-vindas! Siga estas etapas:

1. **Fork o projeto**
2. **Crie uma branch** para sua feature
   ```bash
   git checkout -b feature/MinhaNovaFuncionalidade
   ```
3. **Commit suas mudanças**
   ```bash
   git commit -m "Adiciona nova funcionalidade X"
   ```
4. **Push para a branch**
   ```bash
   git push origin feature/MinhaNovaFuncionalidade
   ```
5. **Abra um Pull Request**

### Diretrizes

- Siga os padrões de código existentes
- Adicione testes quando aplicável
- Documente novas funcionalidades
- Atualize o README se necessário
- Mantenha commits claros e descritivos

---

## Licença

Este projeto está licenciado sob a **Licença MIT**.

```
MIT License

Copyright (c) 2024 Tadeco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contato

**Tadeco**
- WhatsApp: [(21) 96446-2281](https://wa.me/5521964462281)
- Email: contato@pdidescom.com.br
- Website: [https://pdidescom.com.br](https://pdidescom.com.br)

---

## Agradecimentos

- **ANP** - Agência Nacional do Petróleo, Gás Natural e Biocombustíveis
- **Comunidade React** - Framework e ecossistema
- **Desenvolvedores de NLP** - Natural.js, Compromise, Fuse.js
- **Profissionais do setor de O&G** - Feedback e validação

---

## Roadmap

### Versão 2.1 (Planejado)
- [ ] Integração com API REST para atualização dinâmica da base
- [ ] Sistema de analytics e métricas de uso
- [ ] Exportação de conversas em PDF
- [ ] Chatbot multilíngue (EN/ES)
- [ ] Integração com plataforma PDIDESCOM via API

### Versão 3.0 (Futuro)
- [ ] Machine Learning para melhorar respostas ao longo do tempo
- [ ] Geração automática de documentos (EJD, PDI preliminar)
- [ ] Integração com bases de dados de projetos reais
- [ ] Calculadora de custos de descomissionamento
- [ ] Módulo de cronograma automático

---

**Desenvolvido com paixão para o setor de Petróleo e Gás no Brasil**

![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb)
![Powered by AI](https://img.shields.io/badge/Powered%20by-AI-orange)
![ANP 817/2020](https://img.shields.io/badge/ANP-817%2F2020-blue)
