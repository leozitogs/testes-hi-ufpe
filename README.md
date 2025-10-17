# Hi UFPE - Hub Inteligente 🎓

Sistema acadêmico moderno e intuitivo para estudantes da UFPE, com chatbot IA, interface responsiva e experiência superior ao SIGAA tradicional.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Landing Page Moderna** - Design atrativo com informações do sistema
- **Dashboard Interativo** - Visão geral das atividades acadêmicas
- **Chatbot com IA** - Assistente virtual para tirar dúvidas (Gemini API)
- **Horários** - Visualização clara da grade horária
- **Notas** - Acompanhamento do desempenho acadêmico
- **Comunicados** - Avisos e notícias importantes
- **Painel Administrativo** - Upload de planilhas e gestão de comunicados
- **Autenticação OAuth** - Login seguro via Manus
- **Design Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- **Tema UFPE** - Cores azul e amarelo da universidade

### 🎨 Design
- Interface moderna com Tailwind CSS
- Componentes shadcn/ui
- Animações suaves
- Cards com hover effects
- Gradientes e glassmorphism
- Totalmente responsivo

### 🛠️ Stack Tecnológica

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Wouter (routing)
- tRPC (type-safe API)

**Backend:**
- Node.js + Express
- tRPC 11
- Drizzle ORM
- MySQL/TiDB
- Gemini API (chatbot IA)
- S3 (armazenamento)

## 📋 Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** ([Instalar](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))

## 🔧 Instalação no Windows

### 1. Instalar Node.js e pnpm

```bash
# Instalar Node.js (baixar do site oficial)
# Depois instalar pnpm globalmente
npm install -g pnpm
```

### 2. Clonar/Extrair o Projeto

Se você recebeu o arquivo `manus-webdev://60ad4fb4`:
- Abra no Manus e faça download
- Ou extraia o ZIP fornecido

### 3. Instalar Dependências

```bash
cd hiufpe-app
pnpm install
```

### 4. Configurar Variáveis de Ambiente

O projeto já vem com as variáveis configuradas automaticamente pelo Manus. Se for rodar localmente sem Manus, crie um arquivo `.env`:

```env
# Banco de Dados (fornecido pelo Manus)
DATABASE_URL=mysql://...

# JWT Secret
JWT_SECRET=seu-secret-aqui

# OAuth (Manus)
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im

# App Info
VITE_APP_TITLE=Hi UFPE
VITE_APP_LOGO=/logo.svg

# APIs Internas (Manus)
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-aqui
```

### 5. Inicializar Banco de Dados

```bash
# Aplicar schema no banco
pnpm db:push
```

### 6. Popular Dados de Exemplo (Opcional)

```bash
# Executar script de seed
pnpm tsx scripts/seed.ts
```

### 7. Iniciar Servidor de Desenvolvimento

```bash
# Inicia frontend e backend simultaneamente
pnpm dev
```

O sistema estará disponível em:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 🎯 Como Usar

### Para Estudantes

1. **Acesse a página inicial** e clique em "Entrar"
2. **Faça login** com suas credenciais Manus
3. **Explore o Dashboard** com visão geral das atividades
4. **Use o Chatbot** para tirar dúvidas sobre horários, notas, etc.
5. **Navegue pelas seções:**
   - **Horários:** Veja sua grade horária organizada por dia
   - **Notas:** Acompanhe seu desempenho em cada disciplina
   - **Comunicados:** Fique por dentro dos avisos importantes

### Para Administradores/Professores

1. **Acesse o Painel Admin** (menu ou /admin)
2. **Upload de Planilhas:**
   - Planilhas de horários
   - Planilhas de notas
   - Lista de alunos
3. **Criar Comunicados:**
   - Avisos gerais
   - Comunicados acadêmicos
   - Eventos importantes

## 🗂️ Estrutura do Projeto

```
hiufpe-app/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   │   ├── Home.tsx           # Landing page
│   │   │   ├── Dashboard.tsx      # Dashboard principal
│   │   │   ├── Chat.tsx           # Chatbot IA
│   │   │   ├── Horarios.tsx       # Grade horária
│   │   │   ├── Notas.tsx          # Notas e desempenho
│   │   │   ├── Comunicados.tsx    # Avisos
│   │   │   └── AdminPanel.tsx     # Painel admin
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/          # Configurações (tRPC)
│   │   └── index.css     # Estilos globais
│   └── public/           # Assets estáticos
├── server/               # Backend Express + tRPC
│   ├── routers.ts       # Rotas da API
│   ├── db.ts            # Funções de banco de dados
│   └── _core/           # Configurações internas
├── drizzle/             # Schema do banco de dados
│   └── schema.ts        # Definição das tabelas
├── scripts/             # Scripts utilitários
│   └── seed.ts          # Popular banco com dados
└── package.json         # Dependências
```

## 📊 Banco de Dados

### Tabelas Principais

- **users** - Usuários do sistema (alunos, professores, admin)
- **disciplinas** - Disciplinas oferecidas
- **professores** - Cadastro de professores
- **horarios** - Grade horária das disciplinas
- **matriculas** - Matrículas dos alunos com notas
- **comunicados** - Avisos e comunicados
- **conversas** - Histórico de conversas do chatbot
- **mensagens** - Mensagens do chatbot
- **uploads** - Arquivos enviados por administradores
- **eventos** - Calendário acadêmico (provas, trabalhos, etc.)

## 🤖 Chatbot IA

O chatbot utiliza a **Gemini API** para responder perguntas sobre:
- Horários de aula
- Notas e desempenho
- Disciplinas matriculadas
- Comunicados importantes
- Informações gerais da UFPE

### Exemplos de Perguntas

- "Quais são meus horários de hoje?"
- "Como estão minhas notas?"
- "Há algum comunicado importante?"
- "Quando é a próxima prova?"
- "Qual minha frequência em Cálculo?"

## 🎨 Personalização

### Alterar Cores

Edite `client/src/index.css`:

```css
:root {
  --primary: oklch(0.55 0.2 250);  /* Azul UFPE */
  --secondary: oklch(0.75 0.15 85); /* Amarelo UFPE */
}
```

### Alterar Logo

Substitua o arquivo em `client/public/logo.svg` e atualize a variável `VITE_APP_LOGO`.

## 🚀 Deploy

### Opção 1: Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opção 2: Railway

1. Conecte seu repositório no [Railway](https://railway.app)
2. Configure as variáveis de ambiente
3. Deploy automático

### Opção 3: Docker

```bash
# Build
docker build -t hiufpe-app .

# Run
docker run -p 3000:3000 hiufpe-app
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia dev server (frontend + backend)

# Build
pnpm build            # Build para produção

# Banco de Dados
pnpm db:push          # Aplica schema no banco
pnpm db:studio        # Abre interface visual do banco

# Testes
pnpm test             # Executa testes (se configurados)

# Seed
pnpm tsx scripts/seed.ts  # Popula banco com dados de exemplo
```

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"
- Verifique se `DATABASE_URL` está configurado corretamente
- Certifique-se de que o banco de dados está acessível

### Erro: "Port 3000 already in use"
- Mude a porta no arquivo de configuração
- Ou mate o processo: `npx kill-port 3000`

### Chatbot não responde
- Verifique se `BUILT_IN_FORGE_API_KEY` está configurado
- Certifique-se de que a API Gemini está acessível

### Páginas em branco após login
- Limpe o cache do navegador
- Verifique o console do navegador para erros
- Reinicie o servidor de desenvolvimento

## 🔐 Segurança

- ✅ Autenticação OAuth via Manus
- ✅ JWT para sessões
- ✅ API keys no backend (nunca expostas no frontend)
- ✅ Validação de dados com Zod
- ✅ CORS configurado
- ✅ Sanitização de inputs

## 📱 Responsividade

O sistema foi desenvolvido com **mobile-first** e funciona perfeitamente em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1920px+)

## 🎯 Roadmap Futuro

- [ ] Notificações push
- [ ] Modo offline (PWA)
- [ ] Integração com calendário
- [ ] Sistema de mensagens entre alunos
- [ ] Fórum de discussões
- [ ] Biblioteca virtual
- [ ] Sistema de avaliação de professores

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

## 🙏 Créditos

- **Desenvolvido por:** Equipe Hi UFPE
- **Universidade:** UFPE - Universidade Federal de Pernambuco
- **Centro:** CIn - Centro de Informática
- **Tecnologias:** React, tRPC, Drizzle ORM, Gemini AI

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

**Hi UFPE** - Transformando a experiência acadêmica 🎓✨

