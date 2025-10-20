# 📊 Guia de Uso - Planilha de Prospecção

## 📁 Arquivo: TRACKING_PROSPECÇÃO.csv

### 🎯 O Que É

Planilha para rastrear todos os contatos feitos durante a prospecção de clientes.

**Abrir com:** Excel, Google Sheets, ou qualquer editor de planilhas.

---

## 📋 Colunas Explicadas

| Coluna | O Que É | Como Preencher |
|--------|---------|----------------|
| **Empresa** | Nome da empresa | Petrobras, Shell, etc |
| **Nome** | Nome completo | João Silva |
| **Cargo** | Função na empresa | Gerente de Desativação |
| **LinkedIn** | URL do perfil | https://linkedin.com/in/joaosilva |
| **Email** | Email corporativo | joao.silva@petrobras.com.br |
| **Telefone** | Telefone (opcional) | 11-99999-9999 |
| **Status** | Estágio atual | Ver tabela abaixo |
| **Data_Envio** | Quando enviou email | 10/10/2025 |
| **Data_Follow_up** | Quando fez follow-up | 17/10/2025 |
| **Respondeu** | Sim ou Não | Sim / Não |
| **Resposta_Tipo** | Tipo de resposta | Interessado / Não / Talvez |
| **Reuniao_Agendada** | Sim ou Não | Sim / Não |
| **Data_Reuniao** | Quando é a reunião | 20/10/2025 15h |
| **Resultado** | Resultado final | Piloto / Cliente / Perdido |
| **Notas** | Observações | Mencionar P-35 no email |

---

## 🚦 Status Possíveis

| Status | Significado | Quando Usar |
|--------|-------------|-------------|
| **A_Enviar** | Ainda não contatou | Início |
| **Enviado** | Email enviado, aguardando | Após enviar |
| **Aberto** | Abriu o email (Mailtrack) | Se tiver tracking |
| **Respondeu** | Deu alguma resposta | Após resposta |
| **Follow_up** | Precisa fazer follow-up | 5-7 dias sem resposta |
| **Reunião** | Reunião agendada | Após agendar |
| **Piloto** | Aceitou testar grátis | Após demo |
| **Cliente** | Virou cliente pagante | Fechou contrato! 🎉 |
| **Perdido** | Não se interessou | Após 3 tentativas |
| **Pausado** | Pediu contato futuro | "Me procure em 3 meses" |

---

## 📝 Como Usar (Workflow)

### Passo 1: Pesquisa no LinkedIn (5-10 min por pessoa)

1. Abra LinkedIn
2. Pesquise: "Petrobras" + "desativação"
3. Encontre 3 pessoas
4. Para cada pessoa:
   - Copie nome → coluna **Nome**
   - Copie cargo → coluna **Cargo**
   - Copie URL perfil → coluna **LinkedIn**
   - Anote algo específico → coluna **Notas**

### Passo 2: Encontrar Email (2-3 min por pessoa)

**Opção A:** LinkedIn direto (melhor)
- Se tiver conexão → Enviar mensagem

**Opção B:** Hunter.io
- Buscar email → colar coluna **Email**

**Opção C:** Deduzir padrão
```
Petrobras: nome.sobrenome@petrobras.com.br
Shell: nome.sobrenome@shell.com
```

### Passo 3: Personalizar Email (10 min)

1. Abra [EMAIL_TEMPLATES.md](EMAIL_TEMPLATES.md)
2. Escolha Template 1 ou 2
3. Personalize com informação da coluna **Notas**
4. Exemplo:
```
Genérico: "Vi que você trabalha com descomissionamento"
Personalizado: "Vi que você liderou o projeto P-35"
```

### Passo 4: Enviar (1 min)

1. Envie o email
2. Atualize planilha:
   - **Status** → "Enviado"
   - **Data_Envio** → Hoje
   - **Data_Follow_up** → Hoje + 5 dias

### Passo 5: Acompanhar

**Se abriu (Mailtrack):**
- **Status** → "Aberto"

**Se respondeu:**
- **Status** → "Respondeu"
- **Respondeu** → "Sim"
- **Resposta_Tipo** → "Interessado" / "Talvez" / "Não"
- **Notas** → Resumo da resposta

**Se NÃO respondeu em 5 dias:**
- **Status** → "Follow_up"
- Enviar Template 4 (follow-up)
- **Data_Follow_up** → Data que enviou

### Passo 6: Reunião Agendada

- **Status** → "Reunião"
- **Reuniao_Agendada** → "Sim"
- **Data_Reuniao** → "20/10/2025 15h"
- **Notas** → Preparar demo, casos específicos

### Passo 7: Resultado Final

**Se virou piloto:**
- **Status** → "Piloto"
- **Resultado** → "Piloto - $0/mês por 3 meses"

**Se virou cliente:**
- **Status** → "Cliente" 🎉
- **Resultado** → "Cliente - $1.500/mês"

**Se perdeu:**
- **Status** → "Perdido"
- **Resultado** → "Perdido - Motivo: sem budget"

---

## 📊 Análise de Resultados

### Calcular Taxas (a cada 30 dias):

```
Taxa de Abertura = (Emails Abertos ÷ Emails Enviados) × 100
Meta: 40-60%

Taxa de Resposta = (Respostas ÷ Emails Enviados) × 100
Meta: 10-20%

Taxa de Reunião = (Reuniões ÷ Emails Enviados) × 100
Meta: 5-10%

Taxa de Conversão = (Clientes ÷ Emails Enviados) × 100
Meta: 2-5%
```

### Exemplo:
```
30 emails enviados
18 abertos (60% ✅)
6 responderam (20% ✅)
3 reuniões (10% ✅)
1 cliente (3.3% ✅)

1 cliente × $1.500/mês = $18k/ano
ROI: Excelente!
```

---

## 🎯 Filtros Úteis no Excel

### Ver apenas "A_Enviar":
```
Filtro → Status → A_Enviar
```
→ Lista de quem você precisa contactar

### Ver "Follow_up" pendentes:
```
Filtro → Status → Follow_up
Ordenar → Data_Follow_up (mais antigo primeiro)
```
→ Quem você precisa fazer follow-up

### Ver reuniões próximas:
```
Filtro → Status → Reunião
Ordenar → Data_Reuniao
```
→ Preparar suas demos

### Ver taxa de sucesso por empresa:
```
Tabela Dinâmica:
Linhas: Empresa
Valores: Count de Status (Cliente)
```
→ Quais empresas convertem mais

---

## 💡 Dicas Pro

### 1. Atualizar TODO DIA (5 min)
Antes de terminar o dia, atualize a planilha.
Não confie na memória!

### 2. Usar cores (Excel)
- 🟢 Verde: Cliente/Piloto
- 🟡 Amarelo: Reunião agendada
- 🔴 Vermelho: Follow_up atrasado
- ⚪ Cinza: Perdido

### 3. Backup semanal
Salve cópia: `TRACKING_backup_10-10-2025.csv`

### 4. Compartilhar (se tiver sócio)
Google Sheets → Compartilhar → Editar em tempo real

---

## 📅 Checklist Semanal

**Segunda:**
- [ ] Revisar planilha
- [ ] Planejar 10 novos emails para a semana

**Terça-Quinta:**
- [ ] Enviar 3-5 emails/dia
- [ ] Fazer follow-ups pendentes

**Sexta:**
- [ ] Atualizar todos status
- [ ] Calcular taxas da semana
- [ ] Planejar próxima semana

---

## 🎯 Meta (Primeiros 30 dias)

| Métrica | Meta | Seu Resultado |
|---------|------|---------------|
| Emails enviados | 30 | ___ |
| Taxa abertura | 50% | ___% |
| Taxa resposta | 15% | ___% |
| Reuniões agendadas | 3 | ___ |
| Pilotos iniciados | 1 | ___ |

**Se atingir: Você está no caminho certo! 🚀**

---

## ✅ Próxima Ação

1. **Abra a planilha** no Excel/Google Sheets
2. **Vá na primeira linha** (Petrobras - João Silva)
3. **Abra LinkedIn** e pesquise o cargo
4. **Atualize LinkedIn URL** e **Email**
5. **Personalize Template 1**
6. **Envie amanhã 10h**
7. **Marque Status** → "Enviado"

**Faça isso AGORA para as 3 primeiras pessoas da Petrobras! 🎯**

---

## 📞 Suporte

Dúvidas sobre a planilha?
- Consulte [LISTA_PROSPECÇÃO_10_EMPRESAS.md](LISTA_PROSPECÇÃO_10_EMPRESAS.md)
- Ou [EMAIL_TEMPLATES.md](EMAIL_TEMPLATES.md)

**Você tem tudo que precisa! Hora de agir! 🚀**
