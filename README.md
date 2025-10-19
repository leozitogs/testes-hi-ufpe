# Hi UFPE - Hub Inteligente 🎓

**Versão:** 1.0.0 (17 de Outubro de 2025)
**Status:** ✅ Pronto para Apresentação

## 📋 Sumário Executivo

O **Hi UFPE** é um sistema acadêmico inteligente desenvolvido para revolucionar a experiência do estudante da Universidade Federal de Pernambuco (UFPE), oferecendo uma alternativa moderna, intuitiva e superior ao sistema SIGAA tradicional. O projeto se destaca pela integração de um **Assistente Virtual com Inteligência Artificial** que permite gerenciar disciplinas, notas, horários e frequência de forma natural e conversacional.

O diferencial central é o **Chatbot com IA** que, através da tecnologia de *Function Calling*, consegue executar ações no sistema (como lançar notas ou registrar faltas) e fornecer cálculos e previsões automáticas, transformando tarefas burocráticas em interações simples por linguagem natural.

## 🚀 Funcionalidades Principais

O sistema foi concebido com uma abordagem **Self-Service**, garantindo total autonomia ao aluno na gestão de seus dados acadêmicos.

### 1. Gestão Acadêmica Autônoma

| Funcionalidade | Descrição | Vantagem em relação ao SIGAA |
| :--- | :--- | :--- |
| **Self-Service de Disciplinas** | O aluno adiciona e gerencia suas próprias disciplinas, sem depender da administração. | **Autonomia Total** |
| **Sistema de Avaliação Flexível** | Configuração personalizada do método de avaliação (pesos, provas, trabalhos) por disciplina. | **Flexibilidade** (SIGAA não permite) |
| **Cálculo Automático de Médias** | Média calculada em tempo real com base no método configurado. | **Automação** (SIGAA exige cálculo manual) |
| **Grade de Horários Automática** | Visualização em grade semanal gerada automaticamente ao adicionar horários. | **Intuitividade** |
| **Registro de Faltas** | Gestão e acompanhamento da frequência com alertas automáticos. | **Acompanhamento e Alertas** |
| **Dashboard Interativo** | Visão geral e personalizável do status acadêmico. | **UX Superior** |
| **Painel Administrativo** | Interface para upload de planilhas (horários, notas, alunos) e gestão de comunicados (para professores/administradores). | **Gestão Simplificada** |

### 2. Chatbot Inteligente com IA (Diferencial Competitivo)

O assistente virtual utiliza a **OpenAI GPT-4o-mini** e o recurso de *Function Calling* para interagir com o sistema.

#### Funções de IA Implementadas:

| Função | Descrição | Exemplo de Interação |
| :--- | :--- | :--- |
| `lancar_nota` | Lança nota em uma avaliação específica. | *"Tirei 8.5 na prova 1 de Desenvolvimento de Software"* |
| `registrar_falta` | Registra falta em uma disciplina. | *"Faltei na aula de Banco de Dados hoje"* |
| `consultar_media` | Consulta a média atual em uma disciplina. | *"Qual minha média em Desenvolvimento de Software?"* |
| `calcular_projecao` | Calcula a nota mínima necessária para aprovação. | *"Quanto preciso tirar na próxima prova para passar?"* |
| `simular_nota` | Simula a média final com uma nota hipotética. | *"Se eu tirar 7 na prova 2, qual será minha média final?"* |
| `consultar_faltas` | Consulta o número de faltas e a frequência. | *"Quantas faltas eu tenho em Banco de Dados?"* |
| `consultar_proxima_aula` | Informa a próxima aula do aluno. | *"Tenho aula amanhã?"* |
| `consultar_situacao_geral` | Fornece um resumo do status em todas as disciplinas. | *"Qual minha situação em todas as disciplinas?"* |

#### Insights e Alertas Automáticos:

O chatbot é capaz de fornecer **insights e alertas proativos** sobre a situação acadêmica do aluno, como:
*   **Alerta de Risco:** "⚠️ Atenção! Você está com risco de reprovação em Cálculo (média atual: 4.2)"
*   **Alerta de Frequência:** Notifica o aluno quando está próximo do limite de faltas.
*   **Parabéns:** "🎉 Parabéns! Você já está aprovado em Desenvolvimento de Software (média: 8.5)"

## 🏗️ Arquitetura Técnica

O projeto segue uma arquitetura moderna e *full-stack*, utilizando o conceito de *type-safety* de ponta a ponta.

### Stack Tecnológica

| Componente | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Frontend** | **React 19, TypeScript, Tailwind CSS 4, shadcn/ui** | Interface moderna, responsiva e tipada. Utiliza **Wouter** para roteamento e **React Query** para gestão de cache/estado. |
| **Backend** | **Node.js, Express, tRPC 11** | Servidor robusto com APIs *type-safe*, garantindo comunicação segura e tipada entre frontend e backend. |
| **Banco de Dados** | **MySQL/TiDB, Drizzle ORM** | Banco de dados relacional com ORM moderno e *type-safe* para consultas. |
| **IA** | **OpenAI GPT-4o-mini** | Motor do chatbot, com suporte a **Function Calling** e **Streaming** de respostas. |
| **Autenticação** | **OAuth via Manus** | Login seguro e padronizado. |
| **Armazenamento** | **S3** | Utilizado para armazenamento de arquivos, como planilhas de upload. |

### Estrutura do Banco de Dados (10 Tabelas)

O schema do banco de dados (`drizzle/schema.ts`) foi atualizado para suportar todas as funcionalidades de avaliação flexível e registro de faltas, incluindo:

| Tabela | Descrição |
| :--- | :--- |
| `users` | Usuários do sistema (alunos, professores, admin). |
| `disciplinas` | Disciplinas (oficiais e criadas por alunos). |
| `professores` | Cadastro de professores. |
| `horarios` | Grade horária das disciplinas. |
| `matriculas` | Matrículas dos alunos, incluindo `mediaCalculada` e `faltas`. |
| `metodos_avaliacao` | Armazena métodos de avaliação personalizados (ex: "2 Provas + 3 APs"). |
| `avaliacoes` | Avaliações individuais (provas, APs, trabalhos) com `peso` e `notaObtida`. |
| `registro_faltas` | Registro detalhado das faltas dos alunos. |
| `comunicados` | Avisos e comunicados importantes. |
| `conversas` + `mensagens` | Histórico de conversas do chatbot. |

### Compatibilidade tRPC (CHANGELOG)

Houve ajustes de compatibilidade (`CHANGELOG-trpc-compat.md`) para garantir a tipagem correta do tRPC após a evolução do projeto, incluindo:
*   Criação de **Aliases de Rotas** (`matriculas.minhas`, `horarios.meusHorarios`) para manter a compatibilidade com o frontend.
*   Normalização de *payloads* e validação de `status` com *enums* para proteger contra erros de tipagem.
*   Resultado: `pnpm check` limpo e tipagem restaurada entre client ↔ server.

## 💻 Configuração e Instalação (Guia Detalhado)

### Pré-requisitos

*   **Node.js** (v18+)
*   **pnpm**
*   **Git**
*   **MySQL** (para ambiente local, pode ser via MySQL Community Server ou XAMPP)

### Guia de Instalação Local (Windows)

1.  **Instalar pnpm:**
    ```bash
    npm install -g pnpm
    ```

2.  **Clonar e Instalar Dependências:**
    ```bash
    git clone https://github.com/leozitogs/testes-hi-ufpe.git
    cd testes-hi-ufpe
    pnpm install
    ```

3.  **Configurar Banco de Dados Local (MySQL):**
    *   Crie um banco de dados chamado `hiufpe`.
    *   Crie o arquivo `.env` com a string de conexão, por exemplo: `DATABASE_URL=mysql://root:root123@localhost:3306/hiufpe`.
    *   **Usuários de Teste:** O projeto pode ser testado com usuários de exemplo após o `seed` (ex: `admin@ufpe.br` / `admin123`).

4.  **Inicializar Banco de Dados (Drizzle ORM):**
    ```bash
    # Aplica o schema (cria as tabelas)
    pnpm db:push
    
    # Popula o banco com dados reais do CIn 2025.2 (Opcional)
    pnpm tsx scripts/seed-cin-2025-2.ts
    ```

5.  **Iniciar o Servidor de Desenvolvimento:**
    ```bash
    pnpm dev
    ```
    *   **Frontend:** `http://localhost:5173`
    *   **Backend:** `http://localhost:3000`

### Scripts de Desenvolvimento Úteis

| Comando | Descrição |
| :--- | :--- |
| `pnpm dev` | Inicia o servidor de desenvolvimento (frontend e backend). |
| `pnpm build` | Gera a *build* de produção. |
| `pnpm db:push` | Aplica o schema Drizzle no banco de dados. |
| `pnpm db:studio` | Abre a interface visual do Drizzle para o banco de dados. |
| `pnpm tsx scripts/seed.ts` | Popula o banco com dados de exemplo. |
| `pnpm check` | Verifica erros de tipagem (TypeScript/tRPC). |

## 🎯 Diferenciais Competitivos

O **Hi UFPE** se posiciona como uma solução superior ao SIGAA, focando na experiência e autonomia do estudante.

| Aspecto | SIGAA | Hi UFPE |
|:--------|:------|:--------|
| **Interface** | Antiga, burocrática | Moderna, intuitiva (React + TailwindCSS) |
| **Gestão de Dados** | Dependente do Administrador | **Self-service** (Aluno gerencia) |
| **Consultas** | Navegação de menus complexos | **Chatbot com IA** (Linguagem Natural) |
| **Cálculo de Média** | Manual | **Automático** |
| **Avaliação Flexível** | ❌ Não suporta | ✅ Suporte total por disciplina |
| **Inteligência Artificial** | ❌ Não possui | ✅ **GPT-4o-mini com Function Calling** |
| **Insights** | ❌ Não possui | ✅ Alertas automáticos e projeções de notas |

## 🚀 Próximos Passos (Roadmap Futuro)

1.  **App Mobile** - Versão nativa para iOS e Android.
2.  **Notificações Push** - Alertas em tempo real.
3.  **Integração SIGAA** - Importar dados do SIGAA oficial.
4.  **OAuth UFPE** - Login com credenciais da universidade.
5.  **Análise de Desempenho** - Gráficos e estatísticas avançadas.
6.  **Gamificação** - Badges e conquistas.

---

**Desenvolvido com ❤️ para a comunidade UFPE**

**Disciplina:** Desenvolvimento de Software  
**Curso:** Ciência da Computação - UFPE  
**Período:** 2025.2

