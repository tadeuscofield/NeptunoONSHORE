# CHECKLIST - REGISTRO DE PATENTE NO INPI
## NEPTUNO 2.1 - Sistema de Planos de Desativação com IA

---

## ✅ PASSO 1: PREPARAÇÃO DOS DOCUMENTOS (CONCLUÍDO)

- [x] Hash SHA-256 do código-fonte gerado
- [x] Memória descritiva elaborada
- [x] Relatório técnico com casos de validação
- [ ] Preencher dados pessoais na memória descritiva:
  - CPF
  - Endereço completo
  - Email
  - Número do CREA

---

## 📋 PASSO 2: DOCUMENTOS NECESSÁRIOS PARA INPI

### 2.1 Documentos Obrigatórios

- [ ] **Requerimento** (Formulário do INPI)
  - Tipo: Patente de Invenção (PI)
  - Categoria: Programa de Computador + Método

- [ ] **Relatório Descritivo**
  - Arquivo: MEMORIA_DESCRITIVA_INPI.md (já criado)
  - Converter para PDF

- [ ] **Reivindicações** (6 reivindicações)
  - Já incluídas na memória descritiva

- [ ] **Resumo** (máximo 250 palavras)
  - Criar resumo executivo

- [ ] **Desenhos/Diagramas** (se aplicável)
  - Arquitetura do sistema
  - Fluxograma de funcionamento
  - Screenshots da interface

- [ ] **Comprovante de Pagamento**
  - GRU (Guia de Recolhimento da União)
  - Valor: R$ 70,00 (pessoa física) ou R$ 175,00 (pessoa jurídica)
  - Desconto de 60% para microempresa/MEI

### 2.2 Documentos de Identificação

- [ ] **RG e CPF** (cópia autenticada)
- [ ] **Comprovante de residência** (últimos 3 meses)
- [ ] **Registro CREA** (cópia)

### 2.3 Documentos Técnicos Complementares

- [ ] **Hash criptográfico**
  - ✅ HASH_INPI_NEPTUNO.txt (já criado)

- [ ] **Código-fonte** (opcional, mas recomendado)
  - Incluir principais arquivos em anexo

- [ ] **Casos de teste validados**
  - ✅ Shell BC-10 (já validado)
  - ✅ Petrobras P-35 (já validado)

- [ ] **Relatório de acurácia dos modelos ML**
  - ✅ Já incluído na memória descritiva

---

## 🌐 PASSO 3: CADASTRO NO SISTEMA INPI

### 3.1 Criar conta no e-INPI

1. Acesse: https://www.gov.br/inpi/pt-br
2. Clique em "e-INPI" > "Patentes"
3. Crie login e senha
4. Cadastre seus dados pessoais

### 3.2 Gerar GRU (Guia de Pagamento)

1. Acesse o sistema de pagamentos do INPI
2. Selecione: "Depósito de Pedido de Patente de Invenção"
3. Código do serviço: **200** (Depósito de Pedido de Patente - Pessoa Física)
4. Valor: **R$ 70,00** (pessoa física) ou **R$ 28,00** (com desconto 60% se MEI)
5. Gere e imprima a GRU
6. Pague em qualquer banco
7. Guarde o comprovante

---

## 📝 PASSO 4: PROTOCOLO DO PEDIDO

### 4.1 Preencher Formulário Online

1. Acesse: https://www.gov.br/inpi/pt-br/servicos/patentes/e-patentes
2. Sistema: **e-Patentes**
3. Escolha: "Novo Pedido"
4. Tipo: **Patente de Invenção (PI)**

### 4.2 Classificação Internacional (IPC)

Códigos IPC recomendados:
- **G06Q 50/02** - Sistemas de processamento de dados especialmente adaptados para mineração, óleo e gás
- **G06N 20/00** - Machine Learning
- **G06F 16/00** - Recuperação e gestão de informação
- **E21B 41/00** - Equipamentos e métodos de perfuração de poços

### 4.3 Upload dos Documentos

- [ ] Relatório Descritivo (PDF) - Max 100 MB
- [ ] Reivindicações (PDF)
- [ ] Resumo (PDF)
- [ ] Desenhos/Diagramas (PDF ou imagem)
- [ ] Comprovante de pagamento GRU
- [ ] Hash SHA-256 (como anexo técnico)

### 4.4 Revisão e Submissão

- [ ] Revisar todos os campos preenchidos
- [ ] Verificar anexos carregados corretamente
- [ ] Confirmar dados de contato (email e telefone)
- [ ] Submeter o pedido
- [ ] **ANOTAR O NÚMERO DO PEDIDO** (formato: BR XX XXXX XXXXXX X)

---

## ⏱️ PASSO 5: PÓS-DEPÓSITO

### 5.1 Acompanhamento

- [ ] Guardar número do pedido em local seguro
- [ ] Configurar alertas no sistema e-INPI
- [ ] Acompanhar Revista de Propriedade Industrial (RPI) semanalmente
  - Publicada toda terça-feira: http://revistas.inpi.gov.br/rpi/

### 5.2 Prazos Importantes

| Evento | Prazo | Ação |
|--------|-------|------|
| Publicação do pedido | 18 meses | Pedido torna-se público |
| Exame técnico | Até 36 meses | INPI analisa mérito da invenção |
| Resposta a exigências | 60 dias | Responder questionamentos do INPI |
| Concessão da patente | 2-5 anos | Patente concedida (se aprovada) |

### 5.3 Taxas Anuais (Anuidades)

Após concessão, pagar anuidades para manter patente ativa:
- Anos 1-3: Isento
- Ano 4: R$ 80 (pessoa física)
- Ano 5: R$ 120
- Ano 6+: Valores progressivos

---

## 🚨 AÇÕES URGENTES ANTES DE APRESENTAR PUBLICAMENTE

### ⚠️ CRÍTICO - FAZER ANTES DO EVENTO

- [ ] **Protocolar pedido de patente NO INPI ANTES de apresentar no evento**
  - **Motivo:** Apresentação pública = divulgação prévia = perda do direito à patente
  - **Prazo:** Pelo menos 7 dias antes do evento (para garantir protocolo)

- [ ] **Assinar NDA (Non-Disclosure Agreement)** com participantes do evento (opcional, mas recomendado)

- [ ] **Registrar software no INPI** como Programa de Computador (proteção adicional)
  - Sistema: e-Software
  - Prazo: 1-3 meses
  - Custo: R$ 185 (pessoa física)
  - **Vantagem:** Proteção mais rápida que patente (1-3 meses vs 2-5 anos)

---

## 🔒 PASSO 6: REGISTRO ADICIONAL DE SOFTWARE (RECOMENDADO)

### Por que registrar também como software?

- ✅ Proteção imediata (1-3 meses)
- ✅ Custo menor (R$ 185 vs R$ 70 + anuidades)
- ✅ Processo mais simples
- ✅ Proteção complementar à patente
- ✅ Prova de autoria e anterioridade

### Como registrar software no INPI:

1. Acesse: https://www.gov.br/inpi/pt-br/servicos/programas-de-computador
2. Sistema: **e-Software**
3. Preencher formulário eletrônico
4. Anexar:
   - Hash SHA-256 (✅ já temos)
   - Trechos representativos do código-fonte (primeiras e últimas 50 páginas)
   - Documentação técnica
   - Manual de uso
5. Pagar GRU: R$ 185 (pessoa física)
6. Prazo de análise: 1-3 meses

**RECOMENDAÇÃO:** Faça os dois registros (patente + software) para proteção máxima.

---

## 📊 RESUMO - CUSTOS TOTAIS

| Item | Valor Pessoa Física | Valor MEI (60% desconto) |
|------|---------------------|--------------------------|
| Depósito patente | R$ 70 | R$ 28 |
| Registro software | R$ 185 | R$ 74 |
| Anuidades (ano 4) | R$ 80 | R$ 32 |
| **TOTAL INICIAL** | **R$ 255** | **R$ 102** |

**Custos opcionais:**
- Advogado especializado: R$ 3.000 - R$ 10.000
- Busca de anterioridade profissional: R$ 500 - R$ 2.000

---

## ✅ CHECKLIST FINAL ANTES DE PROTOCOLAR

- [ ] Todos os documentos estão em PDF (não Word/Markdown)
- [ ] Dados pessoais completos (CPF, endereço, CREA)
- [ ] GRU paga e comprovante em mãos
- [ ] Hash SHA-256 anexado
- [ ] Memória descritiva revisada (sem erros de português)
- [ ] Reivindicações claras e objetivas
- [ ] Classificação IPC correta
- [ ] Email e telefone atualizados para receber notificações
- [ ] Cópia de todos os documentos guardada em local seguro

---

## 🎯 PRAZO RECOMENDADO

**PROTOCOLAR ATÉ:** 20/10/2025 (10 dias a partir de hoje)

**Motivo:** Garantir que o pedido seja protocolado ANTES de qualquer apresentação pública no evento de descomissionamento.

---

## 📞 CONTATOS ÚTEIS

**INPI - Instituto Nacional da Propriedade Industrial**
- Site: https://www.gov.br/inpi/pt-br
- Telefone: 21 3037-3400
- Email: patentes@inpi.gov.br
- Endereço: Rua Mayrink Veiga, 9 - Centro, Rio de Janeiro - RJ

**Ouvidoria INPI:** 0800-0940-090

**Atendimento presencial:** Segunda a sexta, 8h às 17h (agendar online)

---

## ⚡ PRÓXIMOS PASSOS IMEDIATOS (HOJE)

1. [ ] Preencher dados pessoais na MEMORIA_DESCRITIVA_INPI.md
2. [ ] Converter todos os arquivos .md para PDF
3. [ ] Criar conta no e-INPI
4. [ ] Gerar e pagar GRU
5. [ ] Protocolar pedido (com comprovante de pagamento)

---

**Data de criação deste checklist:** 10/10/2025
**Status:** 60% concluído (documentos técnicos prontos, falta apenas protocolar)

---

## 💡 DICA FINAL

Se você for apresentar no evento ANTES de conseguir protocolar no INPI:

1. **NÃO mostre o código-fonte**
2. **NÃO revele os algoritmos proprietários**
3. Mostre apenas:
   - Interface de usuário (telas)
   - Resultados (casos Shell BC-10, P-35)
   - Vídeo demo (sem revelar implementação)
4. Faça os participantes assinarem **NDA** (acordo de confidencialidade)

**Mas o ideal é protocolar ANTES!**
