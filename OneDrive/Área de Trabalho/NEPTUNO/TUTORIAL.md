# 🎓 Tutorial Completo - NEPTUNO

## 🚀 Início Rápido (5 minutos)

### Passo 1: Abrir o Sistema
**Opção A** (Mais Fácil):
- Clique duas vezes em `INICIAR.bat`
- O navegador abrirá automaticamente

**Opção B** (Manual):
- Clique duas vezes em `index.html`
- O sistema abrirá no seu navegador padrão

---

## 📖 Preenchimento Passo a Passo

### 🏁 Tela de Carregamento
Ao abrir, você verá:
- 🏭 Logo NEPTUNO
- "Sistema de Plano de Desativação de Instalações"
- Barra de loading
- Aguarde 1-2 segundos

### 📋 Cabeçalho do Sistema
No topo você verá:
- **Logo e Título**: 🏭 NEPTUNO
- **Botão de Dark Mode**: 🌙/☀️ (clique para alternar)

---

## Step 1️⃣: Informações de Referência

### O que preencher:
1. **Nome do Operador** ✏️
   - Exemplo: "Petrobras S.A."
   - Obrigatório

2. **CNPJ** 🔢
   - Exemplo: "12.345.678/0001-99"
   - Obrigatório

3. **Tipo de PDI** 📑
   - Conceitual: Para estudos iniciais
   - Executivo: Para aprovação final da ANP
   - **Dica**: Escolha "Executivo" se for submeter à ANP

4. **Tipo de Instalação** 🏭
   - Marítima: Plataformas offshore
   - Terrestre: Instalações onshore
   - **Dica**: Marítima é mais comum

5. **Bacia Sedimentar** 🗺️
   - Escolha no dropdown
   - Opções: Campos, Santos, Espírito Santo, etc.
   - **Importante**: Afeta o cálculo de custos!

6. **Profundidade da Lâmina d'Água** 🌊 ⚠️ **ESSENCIAL**
   - Em metros
   - Exemplo: "2000" (2.000 metros)
   - **Crítico para cálculo automático!**

7. **Distância da Costa** 📏 ⚠️ **ESSENCIAL**
   - Em quilômetros
   - Exemplo: "150" (150 km)
   - **Crítico para cálculo automático!**

8. **Latitude/Longitude** (Opcional)
   - Coordenadas geográficas
   - Exemplo: "-23.5505, -46.6333"

9. **Datas** (Opcional)
   - Data de Início/Término planejados
   - Data de Submissão (pré-preenchida com hoje)

### Navegação:
- Clique em **"Próximo Step"** para ir ao Step 2
- Ou clique diretamente em **"2"** na barra de navegação

---

## Step 2️⃣: Descrição e Motivação

### O que preencher:
1. **Tipo de Motivação** 📝
   - Fim de vida útil
   - Inviabilidade econômica
   - Requisitos regulatórios
   - Outro

2. **Justificativa Detalhada** ✍️
   - Por que está descomissionando?
   - Exemplo: "O campo atingiu o fim da vida útil após 25 anos de operação, com produção declinando abaixo da viabilidade econômica."
   - Mínimo 100 caracteres recomendado

3. **Condições Atuais** 🔍
   - Estado da instalação
   - Riscos identificados
   - Exemplo: "Instalação em bom estado de conservação, sem vazamentos ou riscos iminentes."

### Dica:
- Seja detalhado, essas informações vão para o PDF final!

---

## Step 3️⃣: Inventário de Instalações

### Parte A: Poços 🛢️

#### Adicionar Poço:
1. Clique em **"+ Adicionar Poço"**
2. Preencha o modal:
   - **Nome**: "Poço 1-ABC-123"
   - **Tipo**: Produtor / Injetor / Exploratório
   - **Status**: Ativo / Suspenso / Abandonado
   - **Profundidade Total**: "4200" metros ⚠️ **ESSENCIAL**
   - **Latitude/Longitude**: (opcional)
3. Clique em **"Adicionar"**

#### Exemplo Prático:
```
Nome: Poço Produtor 1
Tipo: Produtor
Status: Suspenso
Profundidade: 4200m
```

**Repita** para todos os poços (3-10 poços é comum)

### Parte B: Instalações 🏗️

#### Adicionar Instalação:
1. Clique em **"+ Adicionar Instalação"**
2. Escolha o **Tipo**:

   **Se for FPSO ou Plataforma**:
   - Nome: "FPSO Cidade de Santos"
   - Peso: "80000" toneladas

   **Se for Manifold ou Árvore de Natal**:
   - Nome: "Manifold MAT-01"
   - Quantidade: "3" unidades

   **Se for Duto ou Umbilical**:
   - Nome: "Duto de Exportação"
   - Extensão: "45000" metros (45 km)

3. Clique em **"Adicionar"**

#### Exemplo de Inventário Completo:
```
POÇOS:
- 3 Poços Produtores (4200m cada)
- 2 Poços Injetores (3800m cada)

INSTALAÇÕES:
- 1 FPSO (80.000 ton)
- 3 Manifolds
- 1 Duto (45 km)
```

---

## Step 4️⃣: Justificativa Técnica

### O que preencher:
1. **Análise de Viabilidade** 📊
   - Estudos técnicos realizados
   - Análise de risco
   - Exemplo: "Foram realizados estudos de integridade estrutural, análise de risco ambiental e avaliação de alternativas de descomissionamento."

2. **Estudos Realizados** 🔬
   - Liste os estudos
   - Exemplo:
     - "Estudo de Impacto Ambiental (EIA/RIMA)"
     - "Análise de Risco Ambiental"
     - "Inspeção Submarina por ROV"

3. **Conclusões** ✅
   - Síntese da análise
   - Exemplo: "A análise concluiu que a remoção completa é a alternativa mais adequada sob os aspectos técnico, econômico e ambiental."

---

## Step 5️⃣: Alternativas de Descomissionamento

### Técnicas Disponíveis:

#### 1. Remoção Completa 🔧
- **Custo**: R$ 50M
- **Prazo**: 24 meses
- **Impacto Ambiental**: Baixo
- **Aplicável a**: Plataformas, FPSOs, Manifolds
- ✅ Marque se for usar

#### 2. Rigs-to-Reefs 🐟
- **Custo**: R$ 15M (-70%)
- **Prazo**: 12 meses
- **Impacto Ambiental**: Positivo (cria habitat)
- **Aplicável a**: Plataformas fixas, Jaquetas
- ✅ Marque se for usar

#### 3. Abandono In-Situ 💤
- **Custo**: R$ 8M (-84%)
- **Prazo**: 6 meses
- **Impacto Ambiental**: Moderado
- **Aplicável a**: Dutos enterrados, Cabos
- ✅ Marque se for usar

#### 4. P&A de Poços 🚧
- **Custo**: R$ 5M-120M (variável)
- **Prazo**: 18 meses
- **Impacto Ambiental**: Baixo
- **Aplicável a**: Todos os poços
- ✅ **SEMPRE marque se tiver poços**

### Dica:
- Você pode marcar **múltiplas técnicas**
- O sistema vai usar essas informações no cálculo de custos

---

## Step 6️⃣: Responsabilidades e Procedimentos

### O que preencher:
1. **Procedimentos de Segurança** 🦺
   - Clique em "Adicionar Procedimento"
   - Exemplo:
     - "Procedimento de Isolamento de Poços (API 65)"
     - "Plano de Resposta a Emergências"
     - "Análise Preliminar de Risco (APR)"

2. **Equipe Técnica** 👷
   - Responsável Técnico
   - Qualificações
   - Exemplo: "João Silva - Engenheiro Naval, 15 anos de experiência"

3. **Normas Aplicáveis** 📚
   - Pré-carregadas:
     - API 65 (Well Abandonment)
     - ISO 16530 (Well Integrity)
     - NORSOK D-010 (Decommissioning)
     - NR-30 (Segurança Aquaviária)
     - MARPOL (Prevenção de Poluição)
     - CONAMA 01/86 (EIA/RIMA)

---

## Step 7️⃣: Cronograma

### Adicionar Atividades:
1. Clique em **"+ Adicionar Atividade"**
2. Preencha:
   - **Descrição**: "Mobilização de embarcação"
   - **Data Início**: 2025-01-15
   - **Data Término**: 2025-02-15
   - **Responsável**: "Empresa X"
   - **Status**: Planejada

3. Clique em **"Adicionar"**

### Exemplo de Cronograma:
```
1. Mobilização: 15/01/25 - 15/02/25 (1 mês)
2. P&A Poço 1: 16/02/25 - 15/05/25 (3 meses)
3. P&A Poço 2: 16/05/25 - 15/08/25 (3 meses)
4. Remoção FPSO: 16/08/25 - 15/12/25 (4 meses)
5. Desmobilização: 16/12/25 - 15/01/26 (1 mês)
```

### Dica:
- As atividades aparecem em uma tabela ordenada
- O sistema calcula a duração automaticamente

---

## Step 8️⃣: Custos 💰 (O MAIS IMPORTANTE!)

### 🤖 Opção A: Cálculo Automático (RECOMENDADO)

1. Clique no botão verde **"🤖 Calcular Automaticamente"**
2. O sistema vai:
   - Analisar todos os dados preenchidos
   - Aplicar benchmarks da indústria
   - Considerar profundidade, lâmina d'água, distância
   - Aplicar fatores regionais da bacia
   - Gerar 8+ itens de custo

3. **Resultado**:
   - Tabela completa de custos
   - Total estimado (R$ 150M - R$ 300M típico)
   - Score de confiança (0-100%)
   - Gráfico de pizza com percentuais

### Exemplo de Saída:
```
✅ Custos Calculados Automaticamente!

1. P&A - Poço 1 (produtor, 4200m): R$ 42.500.000
2. P&A - Poço 2 (produtor, 4200m): R$ 42.500.000
3. P&A - Poço 3 (injetor, 3800m): R$ 38.200.000
4. Remoção - FPSO: R$ 95.000.000
5. Mobilização e Desmobilização: R$ 25.000.000
6. Engenharia e Projetos: R$ 8.000.000
7. Licenciamento Ambiental: R$ 4.000.000
8. Gestão de Resíduos: R$ 18.000.000
9. Logística e Transporte: R$ 15.000.000
10. Contingência (20%): R$ 57.000.000

TOTAL: R$ 285.000.000
Score de Confiança: 85%
```

### ✏️ Opção B: Adicionar Manualmente

1. Clique em **"+ Adicionar Item de Custo"**
2. Preencha:
   - **Descrição**: "Mobilização de sonda"
   - **Categoria**: Mobilização/Desmobilização
   - **Valor**: 25000000 (sem pontos/vírgulas)
3. Clique em **"Adicionar"**

### 📊 Visualizações:

**Tabela de Custos**:
- Lista completa
- Categoria colorida
- Valor formatado
- Botões Editar/Excluir

**Gráfico de Pizza**:
- Percentual por categoria
- Cores distintas
- Legenda interativa

**Card de Total**:
- Custo total destacado
- Score de confiança
- Alertas (se houver)

### 🚨 Validações:

**⚠️ Avisos** (amarelo):
- "Custo por poço abaixo da média"
- "P&A representa apenas X% do custo"

**❌ Erros** (vermelho):
- "Custo muito baixo por poço"
- "Custo total muito baixo"

### 📤 Exportações:

#### 1. Gerar PDF 📄
1. Clique em **"📄 Gerar PDF Profissional"**
2. Aguarde processamento (2-5 segundos)
3. PDF será baixado automaticamente
4. **Conteúdo do PDF**:
   - Capa com logo e título
   - Dados do operador
   - Inventário completo
   - Cronograma
   - Tabela de custos
   - Gráfico de percentuais
   - Rodapé com data e página

#### 2. Exportar para ML 🤖
1. Clique em **"🤖 Exportar p/ Machine Learning"**
2. JSON será baixado
3. **Conteúdo**:
   - 25+ features (variáveis de entrada)
   - Target (custos por categoria)
   - Metadata de qualidade
   - Score de confiança

**Uso**: Futura integração com modelos de ML para predição

---

## 🎯 Fluxo Completo Recomendado (30 minutos)

### Preparação (5 min):
- [ ] Tenha os dados básicos em mãos:
  - CNPJ do operador
  - Lista de poços (nomes e profundidades)
  - Tipo e peso das instalações
  - Profundidade lâmina d'água
  - Distância da costa

### Preenchimento (20 min):
1. **Step 1** (3 min): Dados básicos + profundidade + distância
2. **Step 2** (2 min): Justificativa simples
3. **Step 3** (8 min): Cadastrar todos os poços e instalações
4. **Step 4** (2 min): Justificativa técnica breve
5. **Step 5** (1 min): Marcar técnicas aplicáveis
6. **Step 6** (1 min): Procedimentos básicos
7. **Step 7** (2 min): Atividades principais do cronograma
8. **Step 8** (1 min): Clicar em "Calcular Automaticamente"

### Revisão e Exportação (5 min):
- [ ] Revisar custos gerados
- [ ] Ajustar valores se necessário
- [ ] Gerar PDF
- [ ] Exportar para ML (opcional)
- [ ] Salvar/imprimir PDF

---

## 💡 Dicas Profissionais

### Para Máxima Precisão de Custos:
1. ✅ Preencha **profundidade da lâmina** com precisão
2. ✅ Cadastre **TODOS os poços com profundidades**
3. ✅ Informe **peso real** dos FPSOs/plataformas
4. ✅ Escolha a **bacia correta** (afeta custos em até 30%)
5. ✅ Selecione as **técnicas que realmente vai usar**

### Para Evitar Alertas:
1. ✅ Custo total > R$ 20M
2. ✅ Custo por poço > R$ 5M
3. ✅ P&A representa 40-60% do total
4. ✅ Preencher dados essenciais do Step 1

### Para Melhor Apresentação:
1. ✅ Justificativas com mínimo 200 caracteres
2. ✅ Cronograma com 8-12 atividades
3. ✅ Listar todas as normas aplicáveis
4. ✅ Incluir coordenadas geográficas

---

## 🆘 Solução de Problemas

### Problema: "Score de confiança muito baixo"
**Solução**:
- Preencha profundidade da lâmina d'água (Step 1)
- Adicione profundidades nos poços (Step 3)
- Escolha a bacia correta (Step 1)

### Problema: "Custo total muito baixo"
**Solução**:
- Verifique se cadastrou todos os poços
- Verifique profundidades dos poços
- Use "Calcular Automaticamente" ao invés de manual

### Problema: "PDF não gera"
**Solução**:
- Desabilite bloqueador de pop-ups
- Aguarde 5 segundos e tente novamente
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### Problema: "Dados não salvaram"
**Solução**:
- Verifique se o LocalStorage está habilitado
- Não use modo anônimo/privado
- Limpe dados antigos: F12 > Application > Local Storage > Clear

---

## 📞 Ajuda Adicional

### Documentação Completa:
- 📚 `README.md` - Visão geral do sistema
- 📊 `PDI_SISTEMA_COMPLETO.md` - Memória de cálculo detalhada
- 🔬 `PDI_ANALISE_TECNICA.md` - Arquitetura e ML
- ✅ `CHECKLIST_STEPS.md` - Validação dos steps

### Atalhos de Teclado:
- `Alt + 1-8`: Ir para Step 1-8
- `Tab`: Navegar entre campos
- `Enter`: Enviar formulários

---

## 🎓 Conceitos Importantes

### O que é PDI?
**Plano de Desativação de Instalações** é um documento obrigatório exigido pela ANP (Agência Nacional do Petróleo) para operadores de campos de petróleo e gás que pretendem descomissionar instalações.

### O que é ANP 817/2020?
Resolução da ANP que regulamenta os procedimentos para desativação de instalações da indústria de petróleo e gás no Brasil.

### O que é P&A?
**Plugging and Abandonment** (Plugueamento e Abandono) - Processo de selamento permanente de poços de petróleo.

### O que é FPSO?
**Floating Production Storage and Offloading** - Navio-plataforma de produção, armazenamento e transferência de petróleo.

---

**Boa sorte no preenchimento do seu PDI!** 🚀

Se precisar de ajuda, consulte os arquivos de documentação ou entre em contato com suporte técnico.

---

**NEPTUNO © 2025**
*Tutorial v2.0*
