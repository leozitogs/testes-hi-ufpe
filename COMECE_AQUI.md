# 🚀 COMECE AQUI - Hi UFPE

## 📦 Você recebeu 2 arquivos:

1. **hiufpe-app-completo.zip** - Código fonte completo
2. **COMECE_AQUI.md** - Este arquivo (instruções)

---

## ⚡ Instalação Rápida (Windows)

### Passo 1: Instalar Node.js
1. Baixe: https://nodejs.org/ (versão LTS)
2. Instale normalmente
3. Reinicie o computador

### Passo 2: Instalar pnpm
Abra o **PowerShell** ou **CMD** e execute:
```bash
npm install -g pnpm
```

### Passo 3: Extrair o Projeto
1. Extraia o arquivo `hiufpe-app-completo.zip`
2. Você terá uma pasta `hiufpe-app`

### Passo 4: Instalar Dependências
Abra o terminal na pasta do projeto:
```bash
cd hiufpe-app
pnpm install
```

### Passo 5: Iniciar o Projeto
```bash
pnpm dev
```

### Passo 6: Acessar
Abra o navegador em: **http://localhost:5173**

---

## 📚 Documentação Completa

Dentro da pasta `hiufpe-app` você encontrará:

- **README.md** - Documentação completa do projeto
- **INSTALACAO_WINDOWS.md** - Guia detalhado para Windows
- **drizzle/schema.ts** - Estrutura do banco de dados
- **server/routers.ts** - APIs do backend
- **client/src/pages/** - Páginas do frontend

---

## 🎯 Estrutura do Projeto

```
hiufpe-app/
├── README.md                    ← Leia este arquivo!
├── INSTALACAO_WINDOWS.md        ← Guia detalhado
├── package.json                 ← Dependências
├── client/                      ← Frontend (React)
│   └── src/
│       ├── pages/              ← Páginas da aplicação
│       │   ├── Home.tsx        ← Landing page
│       │   ├── Dashboard.tsx   ← Dashboard principal
│       │   ├── Chat.tsx        ← Chatbot IA
│       │   ├── Horarios.tsx    ← Grade horária
│       │   ├── Notas.tsx       ← Notas
│       │   ├── Comunicados.tsx ← Avisos
│       │   └── AdminPanel.tsx  ← Painel admin
│       └── components/         ← Componentes UI
├── server/                      ← Backend (Express + tRPC)
│   ├── routers.ts              ← APIs
│   └── db.ts                   ← Banco de dados
├── drizzle/                     ← Schema do banco
│   └── schema.ts               ← Tabelas
└── scripts/                     ← Scripts úteis
    └── seed.ts                 ← Popular banco
```

---

## 🔧 Comandos Úteis

```bash
# Instalar dependências
pnpm install

# Iniciar desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Aplicar schema no banco
pnpm db:push

# Popular banco com dados de exemplo
pnpm tsx scripts/seed.ts
```

---

## 🌐 URLs do Sistema

Após executar `pnpm dev`:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **API tRPC:** http://localhost:3000/api/trpc

---

## 🎨 Funcionalidades

✅ Landing page moderna  
✅ Dashboard interativo  
✅ Chatbot com IA (Gemini)  
✅ Visualização de horários  
✅ Acompanhamento de notas  
✅ Comunicados  
✅ Painel administrativo  
✅ Design responsivo  
✅ Tema UFPE (azul e amarelo)  

---

## 🐛 Problemas Comuns

### "pnpm não é reconhecido"
```bash
npm install -g pnpm
```
Feche e abra o terminal novamente.

### "Port 3000 already in use"
```bash
npx kill-port 3000
pnpm dev
```

### Erro de conexão com banco
O projeto usa banco de dados gerenciado pelo Manus. Para rodar localmente, você precisará:
1. Configurar um banco MySQL local, OU
2. Usar o banco fornecido pelo Manus (recomendado)

---

## 📞 Precisa de Ajuda?

1. Leia o **README.md** completo
2. Consulte **INSTALACAO_WINDOWS.md**
3. Verifique os logs de erro no terminal
4. Abra o DevTools do navegador (F12)

---

## 🚀 Próximos Passos

1. ✅ Instale as dependências
2. ✅ Execute `pnpm dev`
3. ✅ Acesse http://localhost:5173
4. ✅ Faça login com Manus OAuth
5. ✅ Explore o sistema!
6. ✅ Leia a documentação completa
7. ✅ Personalize conforme necessário
8. ✅ Faça deploy em produção

---

## 📊 Banco de Dados

O projeto já vem com o schema configurado. As tabelas principais são:

- **users** - Usuários
- **disciplinas** - Disciplinas
- **professores** - Professores
- **horarios** - Grade horária
- **matriculas** - Matrículas e notas
- **comunicados** - Avisos
- **conversas** - Histórico do chatbot
- **mensagens** - Mensagens do chat
- **uploads** - Arquivos administrativos
- **eventos** - Calendário acadêmico

Para popular com dados de exemplo:
```bash
pnpm tsx scripts/seed.ts
```

---

## 🎓 Sobre o Projeto

**Hi UFPE** é um sistema acadêmico moderno desenvolvido para melhorar a experiência dos estudantes da UFPE, oferecendo uma alternativa mais intuitiva e responsiva ao SIGAA tradicional.

**Tecnologias:**
- Frontend: React 19 + TypeScript + Tailwind CSS
- Backend: Express + tRPC + Drizzle ORM
- Banco: MySQL/TiDB
- IA: Gemini API (chatbot)
- Auth: Manus OAuth

---

**Desenvolvido com ❤️ para a comunidade UFPE**

🎓 **Bons estudos!**

