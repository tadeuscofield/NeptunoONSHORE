# Guia de Início Rápido - Chatbot Descomissionamento 2.0

Bem-vindo ao **Chatbot Descomissionamento 2.0**! Este guia vai ajudá-lo a começar a usar a aplicação em poucos minutos.

---

## Índice

1. [Antes de Começar](#antes-de-começar)
2. [Instalação Rápida](#instalação-rápida)
3. [Primeiro Uso](#primeiro-uso)
4. [Explorando as Funcionalidades](#explorando-as-funcionalidades)
5. [Exemplos Práticos](#exemplos-práticos)
6. [Dicas e Truques](#dicas-e-truques)
7. [Solução de Problemas](#solução-de-problemas)
8. [Próximos Passos](#próximos-passos)

---

## Antes de Começar

### O que você precisa

- **Computador** com Windows, macOS ou Linux
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)
- **Node.js** versão 14 ou superior ([Baixar aqui](https://nodejs.org/))
- **10 minutos** do seu tempo

### O que você vai aprender

- Como instalar e executar o chatbot
- Como fazer perguntas e obter respostas
- Como usar a busca avançada
- Como salvar informações importantes
- Como ativar o modo desenvolvedor

---

## Instalação Rápida

### Passo 1: Verificar Node.js

Abra o terminal (ou prompt de comando) e verifique se o Node.js está instalado:

```bash
node --version
```

Você deve ver algo como `v18.x.x` ou `v20.x.x`. Se não estiver instalado, [baixe aqui](https://nodejs.org/).

### Passo 2: Baixar o Projeto

**Opção A: Com Git** (Recomendado)
```bash
git clone https://github.com/seu-usuario/chatbot-descomissionamento-2.0.git
cd chatbot-descomissionamento-2.0
```

**Opção B: Download Manual**
1. Baixe o ZIP do repositório
2. Extraia para uma pasta de sua preferência
3. Abra o terminal na pasta extraída

### Passo 3: Instalar Dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

Aguarde alguns minutos enquanto as dependências são instaladas (pode demorar 3-5 minutos na primeira vez).

### Passo 4: Iniciar a Aplicação

Execute o comando:

```bash
npm start
```

Aguarde a mensagem:
```
Compiled successfully!

You can now view chatbot-descomissionamento-2.0 in the browser.

Local:            http://localhost:3000
```

Seu navegador abrirá automaticamente! Se não abrir, acesse manualmente: [http://localhost:3000](http://localhost:3000)

---

## Primeiro Uso

### Interface Inicial

Quando a aplicação abrir, você verá:

1. **Menu Lateral (Esquerda)**: Categorias e opções de busca
2. **Área Central**: Conversas do chat
3. **Caixa de Entrada (Inferior)**: Digite suas perguntas aqui
4. **Botão WhatsApp (Superior Direito)**: Contato direto

### Primeira Pergunta

Vamos fazer sua primeira pergunta! Digite na caixa de entrada:

```
O que é descomissionamento?
```

Pressione **Enter** ou clique em **Enviar**.

### Resultado

O chatbot irá:
1. Processar sua pergunta com IA
2. Buscar na base de conhecimento
3. Retornar uma resposta detalhada com:
   - Resposta principal
   - Categoria da informação
   - Referências legais (ANP, CONAMA, etc.)
   - Score de confiança (%)

---

## Explorando as Funcionalidades

### 1. Usar Sugestões Rápidas

Logo acima da caixa de entrada, você verá botões coloridos:

- **Prazos PDI** - Informações sobre cronogramas
- **Sobre EJD** - Detalhes do Estudo de Justificativas
- **Custos** - Valores e orçamentos
- **Procedimentos** - Como fazer processos

Clique em qualquer um para fazer a pergunta automaticamente!

### 2. Explorar Categorias

No menu lateral esquerdo, clique na aba **Chat** e verá 10 categorias:

- Conceitos Básicos
- Prazos e Procedimentos
- Documentação Obrigatória
- Responsabilidades e Obrigações
- Aspectos Técnicos Marítimos
- Aspectos Técnicos Terrestres
- Questões Ambientais
- Normas Internacionais
- Custos e Aspectos Financeiros
- Profissionais e Aspectos Técnicos

Clique em qualquer categoria para ver perguntas relacionadas!

### 3. Fazer Busca Avançada

**Passo a passo:**

1. Clique na aba **Busca** no menu lateral
2. Digite uma palavra-chave (ex: "PDI marítimo")
3. (Opcional) Selecione uma categoria específica no dropdown
4. Clique no ícone de lupa ou pressione Enter
5. Veja os resultados com score de relevância
6. Clique em qualquer resultado para adicioná-lo ao chat

### 4. Dar Feedback

Abaixo de cada resposta do bot, você encontra botões:

- **👍 (Útil)**: A resposta foi boa
- **👎 (Não útil)**: A resposta não ajudou
- **💾 (Salvar)**: Guardar para consultar depois

Clique em **💾** para salvar respostas importantes!

### 5. Acessar Mensagens Salvas

1. Clique na aba **Salvos** no menu lateral
2. Veja todas as mensagens que você marcou
3. Clique em qualquer uma para revisar

---

## Exemplos Práticos

### Exemplo 1: Consultando Prazos

**Pergunta:**
```
Quando devo apresentar o PDI conceitual para instalações marítimas?
```

**Resposta esperada:**
O chatbot vai informar que é **5 anos antes** do término da produção, com referência ao Art. 11, inciso I da Resolução ANP 817/2020.

### Exemplo 2: Entendendo Documentos

**Pergunta:**
```
Diferença entre PDI conceitual e PDI executivo
```

**Resposta esperada:**
Explicação detalhada das duas fases do PDI, prazos de apresentação e conteúdo de cada um.

### Exemplo 3: Custos de Projeto

**Pergunta:**
```
Quanto custa um descomissionamento de plataforma offshore?
```

**Resposta esperada:**
Faixa de valores (R$ 50-500 milhões para plataformas fixas), fatores que influenciam e referências.

### Exemplo 4: Questões Técnicas

**Pergunta:**
```
Como deve ser feito o arrasamento de poços terrestres?
```

**Resposta esperada:**
Procedimentos técnicos detalhados conforme Resolução ANP 817/2020 e normas ABNT.

### Exemplo 5: Normas Internacionais

**Pergunta:**
```
O que é a Convenção de Hong Kong?
```

**Resposta esperada:**
Explicação da convenção internacional para reciclagem de navios e sua aplicação em FPSOs.

---

## Dicas e Truques

### Dicas de Uso

1. **Seja específico**: Quanto mais específica sua pergunta, melhor a resposta
   - ❌ "Como funciona?"
   - ✅ "Como funciona o abandono permanente de poços submarinos?"

2. **Use termos técnicos**: O chatbot conhece jargões do setor
   - PDI, EJD, RDI, FPSO, offshore, onshore, ANP, etc.

3. **Perguntas em partes**: Para questões complexas, divida em perguntas menores
   - Primeiro: "O que é EJD?"
   - Depois: "Qual o conteúdo mínimo do EJD?"
   - Por último: "Quem pode elaborar o EJD?"

4. **Ative o Modo Desenvolvedor**: Para ver como a IA analisou sua pergunta
   - Vá até o rodapé do menu lateral
   - Ative "Modo Desenvolvedor"
   - Veja entidades detectadas, intenção e scores

5. **Use a busca para explorar**: Quando não souber o que perguntar
   - Digite palavras-chave gerais
   - Navegue pelos resultados
   - Clique para ver detalhes

### Atalhos de Teclado

- **Enter**: Enviar mensagem
- **Shift + Enter**: Quebra de linha (para perguntas longas)

### Score de Confiança

O chatbot mostra um percentual de confiança em cada resposta:

- **70-100%**: Alta confiança - resposta muito relevante
- **40-69%**: Média confiança - resposta relevante
- **15-39%**: Baixa confiança - resposta pode não ser ideal

Se o score for baixo, tente reformular a pergunta!

---

## Solução de Problemas

### Problema: "npm: command not found"

**Solução:** Node.js não está instalado ou não está no PATH
1. Instale Node.js: [https://nodejs.org/](https://nodejs.org/)
2. Reinicie o terminal
3. Tente novamente

### Problema: Erro ao executar `npm install`

**Solução:** Conflitos de dependências
```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Instale novamente
npm install
```

### Problema: Aplicação não abre no navegador

**Solução:** Porta 3000 já está em uso
1. Feche outros projetos React
2. Ou use outra porta:
```bash
PORT=3001 npm start
```

### Problema: Tela branca após carregar

**Solução:** Erro de build ou cache
1. Pressione **Ctrl + Shift + R** (ou **Cmd + Shift + R** no Mac) para recarregar sem cache
2. Verifique o console do navegador (F12) para erros
3. Pare o servidor (Ctrl+C) e inicie novamente:
```bash
npm start
```

### Problema: Respostas sempre com baixa confiança

**Solução:** Reformule a pergunta
- Use termos mais específicos
- Mencione documentos (PDI, EJD, RDI)
- Inclua contexto (marítimo/terrestre, prazo, custo, etc.)

### Problema: Botão PDIDESCOM não aparece

**Solução:** É normal! O botão só aparece quando você pergunta sobre:
- Elaboração de PDI
- Criação de documentos
- Automação de processos
- Softwares para descomissionamento

Tente perguntar: "Como elaborar um PDI?"

---

## Próximos Passos

Agora que você já sabe usar o chatbot, explore mais:

### Aprofunde seu Conhecimento

1. **Leia a documentação completa**: Veja o arquivo [README.md](./README.md)
2. **Explore todas as categorias**: Navegue pelo menu lateral
3. **Faça perguntas avançadas**: Combine temas (ex: "custos de garantias financeiras")
4. **Use o Modo Desenvolvedor**: Entenda como a IA funciona

### Integre ao Seu Fluxo de Trabalho

1. **Consulte durante projetos reais**: Use o chatbot para tirar dúvidas
2. **Salve informações importantes**: Use a função de salvamento
3. **Compartilhe com a equipe**: Mostre para colegas de trabalho
4. **Entre em contato via WhatsApp**: Para dúvidas mais específicas - [(21) 96446-2281](https://wa.me/5521964462281)

### Conheça a Plataforma PDIDESCOM

Se você precisa **elaborar PDIs completos**, conheça nossa plataforma:

- **PDIDESCOM**: Geração automática de documentação
- **Conformidade ANP 817/2020**: 100% em compliance
- **Cálculos automáticos**: Custos, cronogramas, análises de risco
- **Acesse**: [https://pdidescom.com.br](https://pdidescom.com.br)

### Contribua com o Projeto

- **Reporte bugs**: Encontrou algum erro? Nos avise!
- **Sugira melhorias**: Tem ideias? Compartilhe!
- **Contribua com código**: Veja o [README.md](./README.md) seção "Contribuindo"

---

## Recursos Adicionais

### Documentação Técnica

- [README.md](./README.md) - Documentação completa
- [ARQUITETURA.md](./ARQUITETURA.md) - Arquitetura do sistema
- [EXEMPLOS_CODIGO.md](./EXEMPLOS_CODIGO.md) - Exemplos de código

### Base Legal

- [Resolução ANP 817/2020](https://atosoficiais.com.br/anp/resolucao-n-817-2020-estabelece-os-procedimentos-e-criterios-para-o-descomissionamento-de-instalacoes-de-exploracao-e-producao-de-petroleo-e-gas-natural?origin=instituicao) - Texto completo
- [Lei 9.478/1997](http://www.planalto.gov.br/ccivil_03/leis/l9478.htm) - Lei do Petróleo
- [Lei 12.305/2010](http://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12305.htm) - Política Nacional de Resíduos Sólidos

### Suporte e Contato

- **WhatsApp**: [(21) 96446-2281](https://wa.me/5521964462281)
- **Email**: contato@pdidescom.com.br
- **Website**: [https://pdidescom.com.br](https://pdidescom.com.br)

---

## Perguntas Frequentes (FAQ)

### Posso usar offline?

Não. O chatbot precisa estar rodando em um servidor (localhost ou online) para funcionar.

### Os dados das conversas são salvos?

Apenas localmente no seu navegador. Não enviamos dados para servidores externos.

### Posso adicionar minhas próprias perguntas?

Sim! Edite o arquivo `src/data/knowledgeBase.js`. Veja detalhes no [README.md](./README.md) seção "Customização".

### Quanto custa usar?

O chatbot é **gratuito e open source** (Licença MIT). Use à vontade!

### Posso usar comercialmente?

Sim! A licença MIT permite uso comercial. Veja [LICENSE](./LICENSE) para detalhes.

### Como atualizar a base de conhecimento?

Quando houver atualizações:
```bash
git pull origin main
npm install
npm start
```

### O chatbot substitui um consultor?

Não. O chatbot é uma **ferramenta de apoio** para consultas rápidas. Para projetos complexos, recomendamos consultar especialistas.

### Há limite de perguntas?

Não há limites! Pergunte o quanto precisar.

---

## Checklist de Início Rápido

Use este checklist para garantir que configurou tudo corretamente:

- [ ] Node.js instalado e funcionando
- [ ] Repositório clonado ou baixado
- [ ] Dependências instaladas (`npm install`)
- [ ] Aplicação iniciada (`npm start`)
- [ ] Navegador aberto em http://localhost:3000
- [ ] Primeira pergunta feita com sucesso
- [ ] Explorei as categorias no menu lateral
- [ ] Testei a busca avançada
- [ ] Salvei uma mensagem importante
- [ ] Entendi o sistema de score de confiança
- [ ] Ativei o Modo Desenvolvedor
- [ ] Sei como acessar o WhatsApp para suporte

---

## Conclusão

Parabéns! Você concluiu o **Guia de Início Rápido** do Chatbot Descomissionamento 2.0.

Agora você está pronto para:
- Fazer perguntas sobre Resolução ANP 817/2020
- Explorar a base de conhecimento de 100+ perguntas
- Usar a busca avançada e filtros
- Salvar e organizar informações importantes
- Entender como a IA processa suas perguntas

**Lembre-se:** Este chatbot é uma ferramenta viva! Quanto mais você usar, mais familiarizado ficará com os recursos e melhores serão seus resultados.

**Próximo passo recomendado:** Leia o [README.md](./README.md) para entender todas as funcionalidades avançadas e opções de customização.

---

**Dúvidas? Entre em contato!**

WhatsApp: [(21) 96446-2281](https://wa.me/5521964462281)

---

**Desenvolvido com dedicação para o setor de Petróleo e Gás**

![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![NLP](https://img.shields.io/badge/NLP-Powered-orange.svg)
![ANP 817/2020](https://img.shields.io/badge/ANP-817%2F2020-blue.svg)
