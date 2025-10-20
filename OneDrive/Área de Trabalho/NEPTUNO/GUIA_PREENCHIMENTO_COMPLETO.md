# 📋 Guia Completo de Preenchimento - NEPTUNO

## 🎯 Como Preencher Cada Step e O Que Gera no PDF

---

## Step 1️⃣: Informações de Referência

### 📝 Campos e Propósito

#### **Nome do Operador** ⭐ ESSENCIAL
- **O que preencher:** Razão social completa da empresa operadora
- **Exemplo:** "Petróleo Brasileiro S.A. - Petrobras"
- **Motivo:** Identificação oficial do responsável pela instalação
- **No PDF:** Aparece no cabeçalho e seção "Dados do Operador"

#### **CNPJ** ⭐ ESSENCIAL
- **O que preencher:** CNPJ da empresa no formato XX.XXX.XXX/XXXX-XX
- **Exemplo:** "33.000.167/0001-01"
- **Motivo:** Identificação fiscal obrigatória ANP
- **No PDF:** Seção "Dados Cadastrais" e rodapé

#### **Número do Contrato de Concessão**
- **O que preencher:** Número do contrato ANP
- **Exemplo:** "BM-S-11"
- **Motivo:** Vinculação à autorização de E&P
- **No PDF:** Seção "Referências Regulatórias"

#### **Tipo de PDI** ⭐ ESSENCIAL
- **Opções:**
  - **Conceitual:** Estudos iniciais, viabilidade
  - **Executivo:** Aprovação final ANP
- **Motivo:** Define o nível de detalhamento exigido
- **No PDF:** Marca d'água e classificação do documento

#### **Tipo de Instalação** ⭐ ESSENCIAL
- **Opções:**
  - **Marítima:** Plataformas offshore, FPSOs
  - **Terrestre:** Instalações onshore
- **Motivo:** Determina regulamentações aplicáveis
- **No PDF:** Seção "Caracterização da Instalação"

#### **Bacia Sedimentar** ⭐ CRÍTICO PARA CÁLCULO
- **Opções:** 9 bacias brasileiras
- **Exemplo:** "Bacia de Santos"
- **Motivo:**
  - Afeta custos regionais (fator 0.85x a 1.15x)
  - Determina weather window
  - Influencia logística
- **No PDF:** Seção "Localização Geográfica"
- **Impacto no Cálculo:** ±15% nos custos totais

#### **Bloco/Campo**
- **Exemplo:** "Campo de Marlim"
- **Motivo:** Identificação específica da área
- **No PDF:** Mapa de localização (se houver)

#### **Coordenadas (Latitude/Longitude)**
- **Exemplo:** "-23.5505 / -46.6333"
- **Motivo:** Georreferenciamento preciso
- **No PDF:** Mapa e tabela de coordenadas

#### **Profundidade da Lâmina d'Água** 🔥 CRÍTICO PARA CÁLCULO
- **O que preencher:** Profundidade em metros
- **Exemplo:** "2000" (2.000 metros)
- **Motivo:**
  - **Principal fator de custo** (impacto de +30% a cada 1.000m)
  - Determina tipo de equipamentos (ROV, sondas)
  - Afeta cronograma
- **Classificação:**
  - Rasa: <500m (fator 1.0x)
  - Média: 500-1500m (fator 1.3x)
  - Profunda: 1500-3000m (fator 1.6x)
  - Ultra Profunda: >3000m (fator 2.2x)
- **No PDF:** Destaque em tabela técnica
- **Impacto no Cálculo:** **30-120% nos custos**

#### **Distância da Costa** 🔥 CRÍTICO PARA CÁLCULO
- **O que preencher:** Distância em quilômetros
- **Exemplo:** "150" (150 km)
- **Motivo:**
  - Afeta logística e transporte
  - Determina tempo de mobilização
  - Influencia custos de pessoal (helicóptero vs barco)
- **Classificação:**
  - Próxima: <50km (fator 1.0x)
  - Média: 50-150km (fator 1.15x)
  - Distante: 150-300km (fator 1.35x)
  - Muito Distante: >300km (fator 1.6x)
- **No PDF:** Seção "Logística e Acesso"
- **Impacto no Cálculo:** **15-60% nos custos logísticos**

#### **Datas de Início/Término**
- **Formato:** AAAA-MM-DD
- **Motivo:** Planejamento temporal do projeto
- **No PDF:** Cronograma macro e timeline

#### **Data de Submissão à ANP**
- **Pré-preenchido:** Data atual
- **Motivo:** Protocolo de envio
- **No PDF:** Carimbo de data no cabeçalho

---

## Step 2️⃣: Descrição e Motivação

### 📝 Campos e Propósito

#### **Tipo de Motivação** ⭐ ESSENCIAL
- **Opções:**
  1. **Fim do período de concessão/autorização**
     - Quando: Contrato ANP expirou
     - Exemplo: "Concessão encerrada em 31/12/2024"

  2. **Término da vida produtiva**
     - Quando: Campo não produz mais economicamente
     - Exemplo: "Produção <100 bbl/dia, inviável"

  3. **Decisão econômica/estratégica**
     - Quando: Mudança de portfólio, redirecionamento
     - Exemplo: "Foco em energias renováveis"

  4. **Abandono de área não comercial**
     - Quando: Exploração sem viabilidade
     - Exemplo: "Poços exploratórios sem resultado"

  5. **Outros**
     - Especificar no campo de justificativa

- **Motivo:** Contexto regulatório e estratégico
- **No PDF:** Seção "Motivação e Contexto" em destaque

#### **Justificativa Detalhada** ⭐ ESSENCIAL
- **O que preencher:**
  - Histórico da instalação
  - Razões técnicas/econômicas
  - Análise de viabilidade
  - Decisão corporativa
- **Tamanho recomendado:** 200-500 palavras
- **Exemplo:**
  ```
  "O Campo de Marlim Sul, em operação desde 1998, atingiu
  o fim da vida produtiva com declínio de produção de 85%
  nos últimos 5 anos. A produção atual de 150 bbl/dia não
  justifica os custos operacionais de R$ 2M/mês. Estudos
  de viabilidade indicaram que investimentos em revitalização
  demandariam R$ 500M sem retorno garantido. A decisão
  estratégica da empresa é descomissionar o campo conforme
  ANP 817/2020 e redirecionar investimentos para projetos
  do pré-sal."
  ```
- **Motivo:** Base técnica para aprovação ANP
- **No PDF:** Seção principal do Executive Summary

#### **Condições Atuais da Instalação**
- **O que preencher:**
  - Estado físico das estruturas
  - Integridade dos equipamentos
  - Riscos identificados
  - Última inspeção
- **Exemplo:**
  ```
  "Inspeção por ROV (Julho/2024) identificou:
  - Plataforma: Integridade estrutural OK, corrosão leve
  - FPSO: 25 anos de operação, sistemas em degradação
  - Manifolds: 3 de 5 com vazamentos controlados
  - Poços: 8 poços suspensos, 2 em abandono temporário
  - Risco ambiental: BAIXO (sem vazamentos ativos)"
  ```
- **Motivo:** Avaliação de risco e complexidade
- **No PDF:** Seção "Diagnóstico Atual"

---

## Step 3️⃣: Inventário de Instalações

### 🛢️ POÇOS

#### **Por que inventariar poços?**
- Base para cálculo de P&A (40-60% do custo total)
- Determina cronograma (1-3 meses por poço)
- Define técnicas de abandono

#### **Como Adicionar Poços:**
1. Clique em "+ Adicionar Poço"
2. Preencha o modal:

#### **Nome/Identificação do Poço** ⭐ ESSENCIAL
- **Exemplo:** "MLS-1", "7-MRL-119D-RJS"
- **Motivo:** Rastreabilidade e documentação ANP
- **No PDF:** Tabela de inventário de poços

#### **Tipo de Poço** ⭐ ESSENCIAL
- **Opções:**
  - **Produtor:** Extração de óleo/gás (fator 1.0x)
  - **Injetor:** Injeção de água/gás (fator 1.15x - mais complexo)
  - **Exploratório:** Sem produção (fator 0.85x - mais simples)
- **Motivo:** Define complexidade do P&A
- **No PDF:** Classificação em tabela
- **Impacto no Cálculo:** ±15% no custo por poço

#### **Status do Poço** ⭐ ESSENCIAL
- **Opções:**
  - **Ativo:** Em produção (fator 1.2x - precisa despressurização)
  - **Suspenso:** Parado temporariamente (fator 1.0x)
  - **Abandonado:** Já em processo de abandono (fator 0.7x)
- **Motivo:** Determina etapas de P&A
- **No PDF:** Status visual (cores)
- **Impacto no Cálculo:** 20-40% no custo por poço

#### **Profundidade Total do Poço** 🔥 CRÍTICO
- **O que preencher:** Profundidade total perfurada (metros)
- **Exemplo:** "4200" (4.200 metros)
- **Motivo:**
  - **Principal fator de custo de P&A**
  - Determina número de barreiras
  - Afeta tempo de intervenção
- **Classificação:**
  - Raso: <1500m → R$ 5M
  - Intermediário: 1500-3000m → R$ 15M
  - Profundo: 3000-5000m → R$ 35M
  - Ultra Profundo: >5000m → R$ 80M
- **No PDF:** Tabela técnica detalhada
- **Impacto no Cálculo:** **Maior impacto individual (R$ 5M-120M por poço)**

#### **Coordenadas do Poço**
- **Opcional mas recomendado**
- **Motivo:** Georreferenciamento
- **No PDF:** Mapa de distribuição de poços

#### **Resultado no PDF:**
```
INVENTÁRIO DE POÇOS
─────────────────────────────────────────────
Poço        | Tipo      | Status   | Prof.(m) | Custo P&A
─────────────────────────────────────────────
MLS-1       | Produtor  | Suspenso | 4.200    | R$ 42,5M
MLS-2       | Produtor  | Ativo    | 4.500    | R$ 54,0M
MLS-3       | Injetor   | Suspenso | 3.800    | R$ 38,2M
─────────────────────────────────────────────
TOTAL: 3 poços                      | R$ 134,7M
```

---

### 🏗️ INSTALAÇÕES

#### **Por que inventariar instalações?**
- Base para cálculo de remoção (30-40% do custo total)
- Define metodologia de desmontagem
- Determina destinação final

#### **Como Adicionar Instalações:**
1. Clique em "+ Adicionar Instalação"
2. Escolha o tipo e preencha:

#### **Tipo de Instalação** ⭐ ESSENCIAL
- **Opções:**
  1. **Plataforma Fixa**
     - Custo: R$ 8.000/tonelada + R$ 15M mobilização
     - Quando: Plataformas jaqueta fixas no fundo

  2. **FPSO (Floating Production)**
     - Custo: R$ 6.000/tonelada + R$ 8M mobilização
     - Quando: Navio-plataforma flutuante

  3. **Manifold Submarino**
     - Custo: R$ 15.000/tonelada + R$ 5M mobilização
     - Quando: Equipamentos no leito marinho

  4. **Duto/Pipeline**
     - Custo: R$ 250.000/km + R$ 3M mobilização
     - Quando: Tubulações submarinas/terrestres

  5. **Umbilical**
     - Custo: R$ 250.000/km + R$ 3M mobilização
     - Quando: Cabos de controle e energia

  6. **Árvore de Natal**
     - Custo: R$ 15.000/tonelada + R$ 5M mobilização
     - Quando: Equipamento de cabeça de poço

#### **Nome da Instalação**
- **Exemplo:** "FPSO Cidade de São Paulo"
- **Motivo:** Identificação específica
- **No PDF:** Lista de ativos

#### **Peso (para FPSO/Plataforma)** 🔥 CRÍTICO PARA CÁLCULO
- **O que preencher:** Peso em toneladas
- **Exemplo:** "80000" (80.000 toneladas para FPSO típico)
- **Referências:**
  - FPSO pequeno: 40.000-60.000 ton
  - FPSO médio: 70.000-90.000 ton
  - FPSO grande: 100.000-150.000 ton
  - Plataforma fixa: 5.000-30.000 ton
- **Motivo:** Base para cálculo de remoção (custo/ton)
- **No PDF:** Especificações técnicas
- **Impacto no Cálculo:** R$ 240M-900M para FPSO (80.000 ton)

#### **Extensão (para Duto/Umbilical)** 🔥 CRÍTICO
- **O que preencher:** Comprimento em metros
- **Exemplo:** "45000" (45 km)
- **Motivo:** Custo por quilômetro de remoção/abandono
- **No PDF:** Mapa de rotas
- **Impacto no Cálculo:** R$ 250K/km × extensão

#### **Quantidade (para Manifolds/Árvores)**
- **Exemplo:** "5" (5 manifolds)
- **Motivo:** Múltiplas unidades
- **No PDF:** Contagem de equipamentos
- **Impacto no Cálculo:** Multiplicador de custo unitário

#### **Resultado no PDF:**
```
INVENTÁRIO DE INSTALAÇÕES
─────────────────────────────────────────────────
Instalação           | Tipo      | Espec.      | Custo Remoção
─────────────────────────────────────────────────
FPSO Marlim          | FPSO      | 80.000 ton  | R$ 95,0M
Manifold MAT-01      | Manifold  | Qtd: 3      | R$ 18,5M
Duto Exportação      | Duto      | 45 km       | R$ 14,3M
─────────────────────────────────────────────────
TOTAL: 3 instalações                    | R$ 127,8M
```

---

## Step 4️⃣: Justificativa Técnica

### 📝 Campos e Propósito

#### **Análise de Viabilidade**
- **O que preencher:**
  - Estudos técnicos realizados
  - Análises de risco
  - Avaliação de alternativas
  - Conclusões técnicas
- **Exemplo:**
  ```
  "Foram realizados os seguintes estudos técnicos:

  1. Análise de Integridade Estrutural (AIS)
     - Executado: Maio/2024
     - Responsável: Bureau Veritas
     - Conclusão: Estruturas em estado regular, corrosão
       acelerada em jaquetas, vida útil remanescente <2 anos

  2. Análise de Risco Ambiental (ARA)
     - Executado: Junho/2024
     - Responsável: Wood Group
     - Conclusão: Risco MÉDIO de vazamentos por deterioração,
       recomenda descomissionamento em 12-18 meses

  3. Estudo de Viabilidade Econômica
     - ROI de revitalização: Negativo (TIR <5%)
     - Custo de manutenção: R$ 24M/ano
     - Produção projetada: Declínio de 15%/ano
     - Conclusão: Descomissionamento é mais viável

  4. Avaliação de Alternativas de Abandono
     - Remoção completa: R$ 285M, 24 meses
     - Abandono parcial: R$ 180M, 18 meses
     - Recomendação: Remoção completa por questões ambientais"
  ```
- **Motivo:** Embasamento técnico para decisão
- **No PDF:** Seção "Estudos e Análises" com destaque

#### **Estudos Realizados**
- **O que listar:**
  - Nome do estudo
  - Data de execução
  - Empresa responsável
  - Principais conclusões
- **Exemplo de estudos típicos:**
  - EIA/RIMA (Estudo de Impacto Ambiental)
  - Inspeção Submarina por ROV
  - Análise de Integridade de Poços
  - Levantamento Batimétrico
  - Estudo de Dispersão de Contaminantes
  - Análise de Risco (Hazid/Hazop)
- **Motivo:** Documentação da due diligence
- **No PDF:** Lista com referências e datas

#### **Conclusões**
- **O que preencher:** Síntese executiva das análises
- **Exemplo:**
  ```
  "Com base nos estudos realizados, conclui-se que:

  ✓ Descomissionamento é tecnicamente viável
  ✓ Remoção completa é a alternativa mais adequada
  ✓ Riscos ambientais são gerenciáveis
  ✓ Prazo estimado: 24 meses
  ✓ Custo estimado: R$ 285 milhões
  ✓ Impacto socioambiental: BAIXO a MODERADO
  ✓ Conformidade com ANP 817/2020: TOTAL"
  ```
- **Motivo:** Executive summary técnico
- **No PDF:** Box de destaque no sumário executivo

---

## Step 5️⃣: Alternativas de Descomissionamento

### 🔧 Seleção de Técnicas

#### **4 Técnicas Pré-Cadastradas:**

#### **1. Remoção Completa** 🔨
- **Quando selecionar:**
  - Plataformas em águas rasas/médias
  - FPSOs e estruturas flutuantes
  - Manifolds e equipamentos submarinos
  - Exigência regulatória de remoção total
- **Custo:** R$ 50M (base)
- **Prazo:** 24 meses
- **Impacto Ambiental:** BAIXO (restauração total)
- **Risco Operacional:** ALTO (complexidade)
- **No PDF:** Descrito em "Metodologia Selecionada"

#### **2. Rigs-to-Reefs (Recife Artificial)** 🐟
- **Quando selecionar:**
  - Plataformas fixas em águas profundas
  - Jaquetas robustas
  - Área com potencial para habitat marinho
  - Aprovação de órgãos ambientais
- **Custo:** R$ 15M (-70% vs remoção)
- **Prazo:** 12 meses
- **Impacto Ambiental:** POSITIVO (cria habitat)
- **Risco Operacional:** MÉDIO (licenciamento especial)
- **Vantagens:**
  - Economia significativa
  - Benefício ambiental
  - Preservação de biodiversidade
- **Desafios:**
  - Licenciamento complexo no Brasil
  - Monitoramento de longo prazo
- **No PDF:** Seção especial com benefícios ambientais

#### **3. Abandono In-Situ** 💤
- **Quando selecionar:**
  - Dutos enterrados
  - Cabos submarinos
  - Estruturas não navegáveis
  - Custo de remoção > Benefício
- **Custo:** R$ 8M (-84% vs remoção)
- **Prazo:** 6 meses
- **Impacto Ambiental:** MODERADO (requer monitoramento)
- **Risco Operacional:** BAIXO (mínima intervenção)
- **Condições:**
  - Não interfere na navegação
  - Sem risco ambiental
  - Monitoramento periódico
- **No PDF:** Justificativa técnica e plano de monitoramento

#### **4. P&A de Poços** 🚧 (SEMPRE SELECIONAR SE TIVER POÇOS)
- **Quando selecionar:** SEMPRE que houver poços
- **Custo:** R$ 5M-120M (variável por poço)
- **Prazo:** 18 meses (média)
- **Impacto Ambiental:** BAIXO (isolamento efetivo)
- **Risco Operacional:** ALTO (alta complexidade técnica)
- **Etapas:**
  1. Despressurização
  2. Remoção de equipamentos
  3. Instalação de barreiras (plugs de cimento)
  4. Testes de integridade
  5. Corte e abandono de cabeça
- **No PDF:** Seção técnica detalhada com procedimentos

#### **Resultado no PDF:**
```
ALTERNATIVAS SELECIONADAS
─────────────────────────────────────────────
Técnica              | Aplicação        | Custo Est.  | Prazo
─────────────────────────────────────────────
P&A de Poços        | 3 poços          | R$ 134,7M   | 18 meses
Remoção Completa    | FPSO + Manifolds | R$ 127,8M   | 24 meses
─────────────────────────────────────────────
CUSTO TOTAL TÉCNICAS:                  R$ 262,5M
```

---

## Step 6️⃣: Responsabilidades e Procedimentos

### 🦺 Campos e Propósito

#### **Procedimentos de Segurança**
- **O que listar:**
  - Procedimentos operacionais
  - Análises de risco
  - Planos de emergência
  - Treinamentos
- **Exemplo:**
  ```
  1. Procedimento de Isolamento de Poços (API RP 65)
  2. Análise Preliminar de Risco (APR)
  3. Plano de Resposta a Emergências (PRE)
  4. Procedimento de Trabalho em Altura (NR-35)
  5. Procedimento de Trabalho Aquaviário (NR-30)
  6. Plano de Combate a Incêndio
  7. Procedimento de Operação com ROV
  8. Análise de Riscos Ambientais
  ```
- **Motivo:** Conformidade com normas de segurança
- **No PDF:** Seção "Gestão de Riscos e Segurança"

#### **Equipe Técnica**
- **O que preencher:**
  - Responsável técnico principal
  - Qualificações e certificações
  - Equipe de apoio
  - Empresas contratadas
- **Exemplo:**
  ```
  Responsável Técnico Principal:
  - Nome: Eng. João Silva
  - CREA: 123456/SP
  - Especialização: Engenharia Naval e Oceânica
  - Experiência: 15 anos em descomissionamento offshore
  - Certificações: API 65, NORSOK D-010

  Equipe Técnica:
  - Coordenador de P&A: Eng. Maria Santos (Petróleo/UFBA)
  - Coordenador Ambiental: Biólogo Carlos Oliveira (IBAMA)
  - Coordenador de Segurança: Téc. Pedro Costa (NR-30)

  Empresas Contratadas:
  - P&A de Poços: Halliburton
  - Remoção de Estruturas: Heerema Marine Contractors
  - Consultoria Ambiental: Wood Group
  - ROV e Inspeção: Fugro
  ```
- **Motivo:** Demonstrar capacitação técnica
- **No PDF:** Organograma e tabela de responsabilidades

#### **Normas Aplicáveis** (Pré-carregadas)
- ✅ API 65 (Well Abandonment)
- ✅ ISO 16530 (Well Integrity)
- ✅ NORSOK D-010 (Decommissioning)
- ✅ NR-30 (Segurança Aquaviária)
- ✅ MARPOL (Prevenção de Poluição)
- ✅ CONAMA 01/86 (EIA/RIMA)
- **Motivo:** Conformidade regulatória
- **No PDF:** Seção "Referências Normativas"

---

## Step 7️⃣: Cronograma

### 📅 Campos e Propósito

#### **Como Adicionar Atividades:**

#### **Descrição da Atividade** ⭐ ESSENCIAL
- **Exemplos típicos:**
  ```
  1. Mobilização de embarcação e equipe
  2. Inspeção ROV pré-abandono
  3. P&A Poço MLS-1 (Produtor)
  4. P&A Poço MLS-2 (Produtor)
  5. P&A Poço MLS-3 (Injetor)
  6. Remoção de manifolds submarinos
  7. Preparação FPSO para reboque
  8. Desconexão de risers e umbilicais
  9. Reboque FPSO para estaleiro
  10. Desmontagem e reciclagem FPSO
  11. Limpeza do leito marinho
  12. Inspeção final por ROV
  13. Monitoramento pós-descomissionamento
  14. Relatório final à ANP
  15. Desmobilização
  ```
- **Motivo:** Planejamento temporal detalhado
- **No PDF:** Timeline/Gantt

#### **Data de Início**
- **Formato:** AAAA-MM-DD
- **Exemplo:** "2025-01-15"
- **Motivo:** Marco inicial da atividade

#### **Data de Término**
- **Formato:** AAAA-MM-DD
- **Exemplo:** "2025-03-30"
- **Motivo:** Marco final da atividade
- **Cálculo automático:** Sistema calcula duração em dias

#### **Responsável**
- **Exemplo:** "Halliburton", "Heerema", "Equipe Interna"
- **Motivo:** Accountability

#### **Status**
- **Opções:**
  - Planejada (cinza)
  - Em Andamento (azul)
  - Concluída (verde)
- **Motivo:** Acompanhamento de progresso

#### **Exemplo de Cronograma Completo:**
```
CRONOGRAMA EXECUTIVO
────────────────────────────────────────────────────────
Atividade                  | Início     | Fim        | Duração | Status
────────────────────────────────────────────────────────
Mobilização                | 15/01/2025 | 14/02/2025 | 30 dias | Planejada
P&A Poço 1                 | 15/02/2025 | 14/05/2025 | 90 dias | Planejada
P&A Poço 2                 | 15/05/2025 | 14/08/2025 | 90 dias | Planejada
P&A Poço 3                 | 15/08/2025 | 14/11/2025 | 90 dias | Planejada
Remoção FPSO               | 15/11/2025 | 14/03/2026 | 120 dias| Planejada
Desmobilização             | 15/03/2026 | 14/04/2026 | 30 dias | Planejada
────────────────────────────────────────────────────────
PRAZO TOTAL: 15 meses (450 dias)
```

#### **No PDF:**
- Gráfico de Gantt visual
- Tabela detalhada
- Marcos principais (milestones)
- Caminho crítico destacado

---

## Step 8️⃣: Custos 💰

### 🧮 O STEP MAIS IMPORTANTE!

#### **Opção 1: Cálculo Automático** 🤖 (RECOMENDADO)

1. **Clique em "🤖 Calcular Automaticamente"**
2. **O sistema analisa:**
   - Todos os dados do Step 1 (profundidade lâmina, distância, bacia)
   - Inventário do Step 3 (poços e instalações)
   - Alternativas do Step 5 (técnicas selecionadas)

3. **Gera automaticamente 8-10 itens:**
   ```
   ✅ P&A - Poço MLS-1 (produtor, 4200m): R$ 42,5M
   ✅ P&A - Poço MLS-2 (produtor, 4500m): R$ 48,3M
   ✅ P&A - Poço MLS-3 (injetor, 3800m): R$ 38,2M
   ✅ Remoção - FPSO (80.000 ton): R$ 95,0M
   ✅ Remoção - 3 Manifolds: R$ 18,5M
   ✅ Mobilização e Desmobilização: R$ 25,0M
   ✅ Engenharia e Projetos: R$ 8,0M
   ✅ Licenciamento Ambiental: R$ 4,0M
   ✅ Gestão de Resíduos (8%): R$ 18,0M
   ✅ Logística e Transporte: R$ 15,0M
   ✅ Contingência (20% ANP): R$ 62,5M

   TOTAL: R$ 285.000.000
   Score de Confiança: 85%
   ```

4. **Validações automáticas:**
   - ⚠️ Aviso se custo por poço <R$ 5M
   - ⚠️ Aviso se P&A não representa 40-60% do total
   - ❌ Erro se custo total <R$ 20M

#### **Opção 2: Entrada Manual**

1. **Clique em "+ Novo Item Manual"**
2. **Preencha:**
   - Descrição: "Mobilização de sonda"
   - Categoria: Mobilização/Desmobilização
   - Valor: 25000000 (sem pontuação)
3. **Adicione todos os itens**

#### **Categorias de Custo (10 opções):**
1. **Mobilização/Desmobilização**
   - Embarcações, sondas, equipamentos
   - Típico: 5-10% do total

2. **P&A de Poços**
   - Plugueamento e abandono
   - Típico: 40-60% do total ⭐ MAIOR CUSTO

3. **Remoção de Estruturas**
   - Desmontagem e transporte
   - Típico: 30-40% do total

4. **Gestão de Resíduos**
   - Destinação adequada
   - Típico: 8% do subtotal (ANP)

5. **Logística e Transporte**
   - Movimentação de pessoas/materiais
   - Típico: 5-8% do total

6. **Engenharia e Projetos**
   - Projeto executivo, FEED
   - Típico: 3-5% do total

7. **Licenciamento Ambiental**
   - EIA/RIMA, monitoramento
   - Típico: 1-3% do total

8. **Monitoramento Pós-Descomissionamento**
   - Inspeções periódicas (5-10 anos)
   - Típico: 1-2% do total

9. **Contingência**
   - Reserva técnica (ANP recomenda 20%)
   - Obrigatório: 20% do subtotal

10. **Outros**
    - Custos não classificados

#### **Visualizações no Step 8:**

**1. Tabela de Custos:**
```
Descrição                      | Categoria       | Valor
────────────────────────────────────────────────────
P&A - Poço MLS-1              | P&A de Poços    | R$ 42.500.000
Remoção - FPSO                | Remoção         | R$ 95.000.000
Mobilização                   | Mobilização     | R$ 25.000.000
────────────────────────────────────────────────────
TOTAL:                                          R$ 285.000.000
```

**2. Gráfico de Pizza:**
- Percentual por categoria
- Cores distintas
- Legenda interativa

**3. Card de Total:**
```
╔═══════════════════════════════════════════╗
║  CUSTO TOTAL DO PROJETO                   ║
║                                           ║
║  R$ 285.000.000,00                        ║
║  (Duzentos e oitenta e cinco milhões)     ║
║                                           ║
║  Score de Confiança: 85% ✅               ║
╚═══════════════════════════════════════════╝
```

#### **Exportações:**

**1. Gerar PDF 📄**
- Relatório completo profissional
- Logo e cabeçalho personalizados
- Todas as seções preenchidas
- Tabelas e gráficos
- Pronto para submissão ANP

**Conteúdo do PDF:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PLANO DE DESATIVAÇÃO DE INSTALAÇÕES
  PDI EXECUTIVO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. IDENTIFICAÇÃO DO OPERADOR
   - Razão Social: [Nome do Operador]
   - CNPJ: [CNPJ]
   - Contrato: [Número]

2. CARACTERIZAÇÃO DA INSTALAÇÃO
   - Tipo: [Marítima/Terrestre]
   - Bacia: [Nome da Bacia]
   - Profundidade Lâmina: [metros]
   - Distância Costa: [km]

3. MOTIVAÇÃO E JUSTIFICATIVA
   [Texto da justificativa detalhada]

4. INVENTÁRIO
   4.1 Poços (tabela completa)
   4.2 Instalações (tabela completa)

5. ESTUDOS E ANÁLISES TÉCNICAS
   [Estudos realizados e conclusões]

6. ALTERNATIVAS SELECIONADAS
   [Descrição das técnicas]

7. RESPONSABILIDADES
   [Equipe técnica e procedimentos]

8. CRONOGRAMA EXECUTIVO
   [Gráfico de Gantt + tabela]

9. ESTIMATIVA DE CUSTOS
   [Tabela detalhada + gráfico pizza]

   CUSTO TOTAL: R$ XXX.XXX.XXX

10. ANEXOS
    - Normas técnicas aplicáveis
    - Referências bibliográficas
    - Declarações de conformidade

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gerado em: [Data/Hora]
Conforme ANP 817/2020
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**2. Exportar para ML 🤖**
- JSON estruturado
- 25+ features (variáveis de entrada)
- Target (custos por categoria)
- Metadata de qualidade
- Uso futuro: treinar modelo de Machine Learning

---

## 🎯 Resumo do Fluxo Completo

```
PREENCHIMENTO RECOMENDADO (30-45 minutos)

Step 1 (5 min) → Dados básicos + PROFUNDIDADE + DISTÂNCIA ⚠️
Step 2 (3 min) → Justificativa (200-500 palavras)
Step 3 (10 min) → INVENTÁRIO COMPLETO (poços + instalações) ⚠️
Step 4 (3 min) → Estudos e conclusões
Step 5 (2 min) → Marcar técnicas aplicáveis
Step 6 (3 min) → Procedimentos e equipe
Step 7 (5 min) → Cronograma (10-15 atividades)
Step 8 (2 min) → CALCULAR AUTOMATICAMENTE ⚠️

TOTAL: ~35 minutos
```

---

## ⚠️ CAMPOS CRÍTICOS (Não Pule!)

1. **Profundidade da Lâmina d'Água** (Step 1)
   - Impacto: 30-120% nos custos

2. **Distância da Costa** (Step 1)
   - Impacto: 15-60% na logística

3. **Profundidade de TODOS os Poços** (Step 3)
   - Impacto: R$ 5M-120M por poço

4. **Peso do FPSO/Plataforma** (Step 3)
   - Impacto: R$ 240M-900M

5. **Bacia Sedimentar** (Step 1)
   - Impacto: ±15% nos custos totais

---

## 📊 Resultado Final Típico

```
PDI EXECUTIVO - CAMPO MARLIM SUL
══════════════════════════════════════

Operador: Petrobras
Bacia: Santos
Profundidade: 2.000m
Distância: 150km

INVENTÁRIO:
- 3 Poços (produtor/injetor)
- 1 FPSO (80.000 ton)
- 3 Manifolds

CRONOGRAMA: 24 meses
CUSTO TOTAL: R$ 285 milhões
CONFIANÇA: 85%

STATUS: Pronto para submissão ANP ✅
══════════════════════════════════════
```

---

**NEPTUNO © 2025**
*Sistema Profissional de Plano de Desativação de Instalações*
*Conforme Resolução ANP 817/2020 | Versão 2.0*
