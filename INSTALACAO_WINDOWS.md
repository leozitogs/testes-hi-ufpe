# 🪟 Guia de Instalação - Windows

## ⚡ Instalação Rápida (5 minutos)

### 1️⃣ Instalar Node.js

1. Baixe o Node.js: https://nodejs.org/ (versão LTS recomendada)
2. Execute o instalador
3. Marque a opção "Add to PATH"
4. Clique em "Next" até finalizar

### 2️⃣ Instalar pnpm

Abra o **PowerShell** ou **CMD** como administrador e execute:

```powershell
npm install -g pnpm
```

### 3️⃣ Extrair o Projeto

1. Extraia o arquivo ZIP do projeto
2. Ou baixe do Manus usando o link `manus-webdev://60ad4fb4`

### 4️⃣ Instalar Dependências

Abra o **PowerShell** ou **CMD** na pasta do projeto:

```powershell
cd caminho\para\hiufpe-app
pnpm install
```

### 5️⃣ Iniciar o Projeto

```powershell
pnpm dev
```

✅ **Pronto!** Acesse http://localhost:5173

---

## 🔧 Configuração Completa

### Variáveis de Ambiente

O projeto já vem configurado com as variáveis necessárias. Se precisar alterar, edite o arquivo `.env`:

```env
# Banco de Dados (fornecido automaticamente)
DATABASE_URL=mysql://...

# Chaves da API (fornecidas automaticamente)
BUILT_IN_FORGE_API_KEY=...
BUILT_IN_FORGE_API_URL=https://api.manus.im

# OAuth Manus
VITE_APP_ID=...
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im

# Configurações do App
VITE_APP_TITLE=Hi UFPE
VITE_APP_LOGO=/logo.svg
```

### Inicializar Banco de Dados

```powershell
# Aplicar schema
pnpm db:push

# Popular com dados de exemplo (opcional)
pnpm tsx scripts/seed.ts
```

---

## 🌐 Acessando o Sistema

### URLs

- **Frontend (Interface):** http://localhost:5173
- **Backend (API):** http://localhost:3000
- **tRPC Playground:** http://localhost:3000/api/trpc

### Login

1. Acesse http://localhost:5173
2. Clique em "Entrar"
3. Faça login com sua conta Manus
4. Você será redirecionado para o Dashboard

---

## 📱 Testando em Dispositivos Móveis

### Opção 1: Usar IP Local

1. Descubra seu IP local:
   ```powershell
   ipconfig
   ```
   Procure por "IPv4" (ex: 192.168.1.100)

2. No celular, acesse:
   ```
   http://192.168.1.100:5173
   ```

### Opção 2: Usar ngrok

```powershell
# Instalar ngrok
choco install ngrok

# Expor porta
ngrok http 5173
```

---

## 🐛 Problemas Comuns

### ❌ "pnpm não é reconhecido"

**Solução:**
```powershell
npm install -g pnpm
```

Feche e abra o terminal novamente.

### ❌ "Port 3000 already in use"

**Solução:**
```powershell
# Matar processo na porta 3000
npx kill-port 3000

# Ou usar outra porta
set PORT=3001
pnpm dev
```

### ❌ "Cannot connect to database"

**Solução:**
- Verifique se o arquivo `.env` existe
- Certifique-se de que `DATABASE_URL` está correto
- Execute `pnpm db:push` novamente

### ❌ Erro de permissão no PowerShell

**Solução:**
```powershell
# Executar como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### ❌ Chatbot não responde

**Solução:**
- Verifique se `BUILT_IN_FORGE_API_KEY` está configurado
- Reinicie o servidor: `Ctrl+C` e `pnpm dev`

---

## 🚀 Build para Produção

### Gerar Build

```powershell
pnpm build
```

Os arquivos serão gerados em:
- `client/dist` - Frontend
- `server/dist` - Backend

### Testar Build Localmente

```powershell
pnpm preview
```

---

## 📦 Deploy

### Vercel (Recomendado)

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Railway

1. Acesse https://railway.app
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Deploy automático!

---

## 🔄 Atualizações

### Atualizar Dependências

```powershell
pnpm update
```

### Limpar Cache

```powershell
# Remover node_modules
Remove-Item -Recurse -Force node_modules

# Reinstalar
pnpm install
```

---

## 💡 Dicas

### Atalhos Úteis

- `Ctrl + C` - Parar servidor
- `Ctrl + Shift + R` - Recarregar página (hard refresh)
- `F12` - Abrir DevTools no navegador

### Melhor Performance

```powershell
# Usar cache do pnpm
pnpm config set store-dir C:\.pnpm-store

# Habilitar strict peer dependencies
pnpm config set auto-install-peers true
```

### Desenvolvimento Paralelo

```powershell
# Terminal 1 - Backend
cd server
pnpm dev

# Terminal 2 - Frontend
cd client
pnpm dev
```

---

## 📞 Precisa de Ajuda?

- 📖 Leia o `README.md` completo
- 🐛 Verifique os logs de erro no terminal
- 🔍 Abra o DevTools do navegador (F12)
- 💬 Entre em contato com a equipe

---

**Hi UFPE** - Instalação simples e rápida! 🚀

