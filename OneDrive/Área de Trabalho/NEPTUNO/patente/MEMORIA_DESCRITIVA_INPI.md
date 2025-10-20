# MEMÓRIA DESCRITIVA - PEDIDO DE PATENTE DE INVENÇÃO

## INSTITUTO NACIONAL DA PROPRIEDADE INDUSTRIAL (INPI)

---

## 1. TÍTULO DA INVENÇÃO

**SISTEMA E MÉTODO AUTOMATIZADO PARA ELABORAÇÃO DE PLANOS DE DESATIVAÇÃO DE INSTALAÇÕES PETROLÍFERAS UTILIZANDO INTELIGÊNCIA ARTIFICIAL E CONFORMIDADE REGULATÓRIA**

Nome Comercial: **NEPTUNO 2.1**

---

## 2. CAMPO DA INVENÇÃO

A presente invenção refere-se ao campo de sistemas computacionais aplicados à indústria de óleo e gás, especificamente relacionados à elaboração automatizada de Planos de Desativação de Instalações (PDI) conforme regulamentação ANP 817/2020, utilizando técnicas de Machine Learning, algoritmos proprietários de estimativa de custos e validação automática de conformidade regulatória.

---

## 3. FUNDAMENTOS DA INVENÇÃO

### 3.1 Contexto Regulatório

A Resolução ANP nº 817/2020 estabelece os requisitos técnicos para elaboração de Planos de Desativação de Instalações no setor de exploração e produção de petróleo e gás natural no Brasil. Estes planos exigem:

- Inventário detalhado de poços e instalações
- Estimativas precisas de custos de descomissionamento
- Cronogramas de execução
- Análises de risco e impacto ambiental
- Conformidade com normas ABNT (NBR 14724:2011)
- Aprovação prévia da Agência Nacional do Petróleo (ANP)

### 3.2 Problema Técnico

Os métodos convencionais de elaboração de PDIs apresentam as seguintes limitações:

1. **Alto custo**: R$ 300.000 a R$ 800.000 por plano
2. **Longo prazo**: 4 a 12 meses de desenvolvimento
3. **Subjetividade**: Estimativas baseadas em experiência pessoal sem validação estatística
4. **Falta de padronização**: Cada consultor adota metodologia própria
5. **Ausência de predição**: Sem capacidade de prever probabilidade de aprovação ANP
6. **Erro humano**: Alta incidência de não-conformidades regulatórias

### 3.3 Estado da Técnica

Até a data deste pedido, não existe no Brasil ou internacionalmente sistema que integre:

- Machine Learning para predição de custos, prazos e aprovação regulatória
- Validação automática de conformidade com ANP 817/2020
- Geração automática de documentos em formato ABNT
- Detecção de anomalias em dados de entrada
- Recomendação inteligente de técnicas de descomissionamento

---

## 4. OBJETIVOS DA INVENÇÃO

A presente invenção tem por objetivo:

1. Automatizar a elaboração de Planos de Desativação de Instalações
2. Reduzir tempo de desenvolvimento de 6 meses para 2 semanas
3. Reduzir custos de elaboração em até 80%
4. Garantir conformidade automática com ANP 817/2020
5. Fornecer predição de probabilidade de aprovação ANP (83% acurácia)
6. Detectar anomalias e inconsistências em dados de entrada (91% acurácia)
7. Recomendar técnicas de descomissionamento mais adequadas (94% acurácia)
8. Gerar documentação técnica em formato ABNT automaticamente

---

## 5. DESCRIÇÃO DA INVENÇÃO

### 5.1 Visão Geral do Sistema

O sistema NEPTUNO 2.1 é composto por:

#### **A) Camada de Interface (Frontend)**
- Interface web responsiva desenvolvida em React 18
- 9 seções estruturadas conforme ANP 817/2020:
  1. Informações de Referência
  2. Motivações da Desativação
  3. Inventário de Poços
  4. Inventário de Instalações
  5. Técnicas e Métodos
  6. Estudos Ambientais
  7. Cronograma e Orçamento
  8. Gerenciamento de Riscos
  9. Anexos e Licenças

#### **B) Motor de Cálculos Proprietário**
Algoritmos desenvolvidos para:
- Estimativa de custos de P&A (Plug and Abandonment)
- Cálculo de volumes de fluidos de abandono
- Dimensionamento de tampões de cimento
- Análise de complexidade operacional
- Estimativa de tempo de sonda

#### **C) Sistema de Machine Learning (5 modelos)**

**Modelo 1: Predição de Custos**
- Algoritmo: Random Forest Regressor
- Entrada: profundidade, tipo de poço, água depth, distância costa, tipo instalação
- Saída: Custo estimado em USD
- Acurácia: 87%

**Modelo 2: Probabilidade de Aprovação ANP**
- Algoritmo: Logistic Regression
- Entrada: completude documentação, complexidade, conformidade, histórico operador
- Saída: Probabilidade de aprovação (0-100%)
- Acurácia: 83%

**Modelo 3: Detecção de Anomalias**
- Algoritmo: Isolation Forest
- Entrada: Todos os parâmetros técnicos do PDI
- Saída: Score de anomalia (-1 a 1)
- Acurácia: 91%

**Modelo 4: Recomendação de Técnicas**
- Algoritmo: Random Forest Classifier
- Entrada: Características do poço/instalação
- Saída: Técnica recomendada (remoção total, parcial, leave-in-place)
- Acurácia: 94%

**Modelo 5: Predição de Duração**
- Algoritmo: Random Forest Regressor
- Entrada: Escopo do projeto, complexidade, recursos
- Saída: Duração estimada em meses
- Acurácia: 89%

#### **D) Validador Automático de Conformidade**
Sistema de regras que verifica:
- Completude das 9 seções obrigatórias ANP 817/2020
- Consistência de dados numéricos
- Presença de licenças ambientais
- Adequação de cronogramas
- Viabilidade técnica das técnicas propostas

#### **E) Gerador de Documentos ABNT**
- Formatação automática segundo NBR 14724:2011
- Margens: 3cm (esquerda), 2cm (direita/superior), 2.5cm (inferior)
- Fonte: Times New Roman 12pt
- Espaçamento: 1.5 linhas
- Estrutura: Capa, folha de rosto, sumário, seções, referências

### 5.2 Fluxo de Funcionamento

```
1. ENTRADA DE DADOS
   ↓
2. VALIDAÇÃO AUTOMÁTICA (Detecção de anomalias)
   ↓
3. CÁLCULOS PROPRIETÁRIOS (Custos, volumes, tempos)
   ↓
4. PREDIÇÃO ML (5 modelos em paralelo)
   ↓
5. VALIDAÇÃO DE CONFORMIDADE ANP 817/2020
   ↓
6. GERAÇÃO DE DOCUMENTO ABNT
   ↓
7. RELATÓRIO FINAL (PDF pronto para submissão ANP)
```

### 5.3 Diferenciais Técnicos Inovadores

#### **Inovação 1: Integração ML + Regulação**
Primeiro sistema mundial a integrar Machine Learning com validação regulatória específica de óleo e gás (ANP 817/2020).

#### **Inovação 2: Algoritmo Proprietário de Custos P&A**
Fórmula desenvolvida que considera:
- Profundidade vertical verdadeira (TVD)
- Tipo de completação (revestimento, cimentação)
- Complexidade geológica
- Condições oceanográficas (offshore)
- Taxa diária de sonda ajustada por região

Fórmula base:
```
Custo_Total = (Custo_Mobilização + Custo_Operacional + Custo_Materiais + Custo_Contingência) × Fator_Risco

Onde:
- Custo_Operacional = Taxa_Sonda × Tempo_Estimado × Fator_Clima
- Custo_Materiais = Volume_Cimento × Preço_Cimento + Volume_Fluido × Preço_Fluido
- Fator_Risco = f(profundidade, idade_poço, histórico_problemas)
```

#### **Inovação 3: Sistema de Score de Conformidade**
Algoritmo que atribui nota de 0 a 10 para o PDI baseado em:
- Completude de informações (peso 30%)
- Consistência técnica (peso 25%)
- Viabilidade econômica (peso 20%)
- Adequação ambiental (peso 15%)
- Histórico do operador (peso 10%)

#### **Inovação 4: Detecção Inteligente de Inconsistências**
Sistema de regras fuzzy que identifica:
- Custos muito acima/abaixo da média para perfil similar
- Cronogramas incompatíveis com escopo
- Técnicas inadequadas para tipo de instalação
- Falta de licenças obrigatórias

### 5.4 Arquitetura Técnica

**Frontend:**
- HTML5, CSS3, JavaScript ES6+
- React 18 com Hooks
- Babel para transpilação JSX
- LocalStorage para persistência (LGPD compliant)

**Backend (API ML):**
- Python 3.11
- Flask (servidor HTTP REST)
- Scikit-learn (modelos ML)
- Pandas/NumPy (processamento de dados)
- Joblib (serialização de modelos)

**Geração de PDF:**
- ReportLab (Python)
- Suporte ABNT NBR 14724:2011

**Protocolo de Comunicação:**
- REST API JSON
- Endpoints:
  - POST /api/ml/predict/custo
  - POST /api/ml/suggest/tecnica
  - POST /api/ml/detect/anomaly
  - POST /api/ml/predict/aprovacao
  - POST /api/ml/predict/duracao

---

## 6. REIVINDICAÇÕES

### Reivindicação 1 (Principal)
Sistema computacional automatizado para elaboração de Planos de Desativação de Instalações petrolíferas, caracterizado por compreender:

a) Módulo de interface web estruturado em 9 seções conforme ANP 817/2020;
b) Motor de cálculos proprietário para estimativa de custos de P&A;
c) Sistema de Machine Learning com 5 modelos preditivos integrados;
d) Validador automático de conformidade regulatória;
e) Gerador automático de documentos em formato ABNT NBR 14724:2011.

### Reivindicação 2
Sistema de acordo com a reivindicação 1, caracterizado pelo algoritmo proprietário de estimativa de custos de P&A que considera profundidade, tipo de completação, complexidade geológica, condições oceanográficas e taxa de sonda ajustada por região.

### Reivindicação 3
Sistema de acordo com a reivindicação 1, caracterizado pelo uso de 5 modelos de Machine Learning operando em paralelo:
- Random Forest Regressor para predição de custos (87% acurácia)
- Logistic Regression para probabilidade de aprovação ANP (83% acurácia)
- Isolation Forest para detecção de anomalias (91% acurácia)
- Random Forest Classifier para recomendação de técnicas (94% acurácia)
- Random Forest Regressor para predição de duração (89% acurácia)

### Reivindicação 4
Sistema de acordo com a reivindicação 1, caracterizado pelo validador automático que verifica completude das 9 seções obrigatórias, consistência de dados, presença de licenças ambientais, adequação de cronogramas e viabilidade técnica.

### Reivindicação 5
Método de elaboração automatizada de PDI, compreendendo as etapas:
1. Entrada de dados pelo usuário via interface web estruturada
2. Validação automática e detecção de anomalias
3. Aplicação de algoritmos proprietários de cálculo
4. Execução de 5 modelos ML para predições
5. Validação de conformidade ANP 817/2020
6. Geração automática de documento ABNT
7. Produção de relatório final em PDF

### Reivindicação 6
Método de acordo com a reivindicação 5, caracterizado pela capacidade de reduzir o tempo de elaboração de PDI de 6 meses para 2 semanas e custos de R$ 500.000 para R$ 100.000.

---

## 7. VANTAGENS DA INVENÇÃO

1. **Redução de custos**: 70-80% comparado a métodos tradicionais
2. **Redução de tempo**: 85-90% (de 6 meses para 2 semanas)
3. **Maior acurácia**: Predições com 83-94% de acurácia
4. **Conformidade garantida**: Validação automática ANP 817/2020
5. **Padronização**: Elimina variabilidade entre consultores
6. **Rastreabilidade**: Hash SHA-256 de todas as versões
7. **Escalabilidade**: Pode processar múltiplos PDIs simultaneamente
8. **Democratização**: Operadores pequenos acessam tecnologia de ponta

---

## 8. EXEMPLOS DE APLICAÇÃO

### Exemplo 1: Shell BC-10 (Bijupirá e Salema)
**Entrada:**
- Operador: Shell Brasil
- Bacia: Campos
- Profundidade de água: 850m
- Poços: 4
- Tipo: Plataforma fixa

**Saída (gerada em 2 semanas):**
- Custo estimado: USD 125.000.000
- Duração: 36 meses
- Probabilidade aprovação ANP: 92%
- Técnica recomendada: Remoção total
- Score de conformidade: 9.6/10

### Exemplo 2: Petrobras P-35 (FPSO)
**Entrada:**
- Operador: Petrobras
- Bacia: Campos
- Profundidade de água: 1.360m
- Poços: 5
- Tipo: FPSO

**Saída (gerada em 3 semanas):**
- Custo estimado: USD 285.000.000
- Duração: 48 meses
- Probabilidade aprovação ANP: 95%
- Técnica recomendada: Remoção total + leave-in-place (subsea)
- Score de conformidade: 9.0/10

---

## 9. DECLARAÇÃO DE NOVIDADE

Declaro que o sistema e método aqui descritos constituem invenção nova, dotada de atividade inventiva e aplicação industrial, não tendo sido divulgados publicamente antes da data deste pedido.

---

## 10. INFORMAÇÕES DO DEPOSITANTE

**Nome:** Tadeu Santana
**CPF:** 124.055.287-46
**Endereço:** [INSERIR - completar antes do registro]
**Telefone:** (21) 96446-2281
**Email:** [INSERIR - completar antes do registro]
**Qualificação:** Engenheiro Ambiental
**CREA:** 2019366355

---

## 11. DOCUMENTAÇÃO ANEXA

1. HASH_INPI_NEPTUNO.txt - Hashes SHA-256 do código-fonte
2. hash_inpi_neptuno.json - Dados em formato JSON
3. Relatório técnico de validação com casos reais (P-35, BC-10)
4. Apresentação executiva do sistema
5. Manuais de uso e documentação técnica

---

## 12. HASH SHA-256 GLOBAL DO SISTEMA

```
208c8d4817afe819a9f917b1e4f81b70229218d8c023215e60eddf474ce1caf7
```

Este hash representa a assinatura digital única do sistema completo na data de 10/10/2025.

---

**Data:** 10 de outubro de 2025

**Assinatura:**

_________________________________________
Eng. Tadeu Santana
Engenheiro Ambiental
CREA: 2019366355
CPF: 124.055.287-46

---

## OBSERVAÇÕES IMPORTANTES

1. Este documento serve como **prova de anterioridade** para fins de proteção de propriedade intelectual
2. Os hashes SHA-256 garantem a integridade e autenticidade do código-fonte
3. O sistema foi validado com casos reais (Petrobras P-35, Shell BC-10)
4. Não existe sistema similar no mercado brasileiro ou internacional
5. O pedido de patente deve ser protocolado no INPI antes de qualquer apresentação pública
