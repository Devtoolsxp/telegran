# 🚀 Instruções de Deploy - Telegram Bot

## Opção 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar Repositório
1. Acesse [GitHub](https://github.com) e crie um novo repositório
2. Faça upload de todos os arquivos deste projeto
3. Commit e push para o repositório

### Passo 2: Conectar na Netlify
1. Acesse [Netlify](https://netlify.com)
2. Clique em "New site from Git"
3. Conecte sua conta GitHub
4. Selecione o repositório criado
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.`

### Passo 3: Configurar Variáveis
No painel da Netlify, vá em Site settings > Environment variables:

```
TELEGRAM_BOT_TOKEN = seu_token_do_bot
TELEGRAM_GROUPS = ["@seu_grupo", "-1001234567890"]
IMAGE_URL = https://sua-imagem.com/imagem.jpg
```

## Opção 2: Deploy Direto (Drag & Drop)

### Passo 1: Preparar Arquivos
1. Faça zip de toda a pasta `telegram-bot-netlify`
2. Certifique-se de incluir todos os arquivos

### Passo 2: Upload na Netlify
1. Acesse [Netlify](https://netlify.com)
2. Arraste o arquivo ZIP para a área de deploy
3. Aguarde o processamento

### Passo 3: Configurar Variáveis
Mesmo processo da Opção 1, passo 3.

## Opção 3: Netlify CLI

```bash
# Instalar CLI globalmente
npm install -g netlify-cli

# Login na Netlify
netlify login

# Deploy do projeto
netlify deploy --prod

# Configurar variáveis via CLI
netlify env:set TELEGRAM_BOT_TOKEN "seu_token"
netlify env:set TELEGRAM_GROUPS '["@grupo1", "-1001234567890"]'
netlify env:set IMAGE_URL "https://sua-imagem.com/imagem.jpg"
```

## ⚙️ Configuração do Bot do Telegram

### 1. Criar Bot
1. Acesse [@BotFather](https://t.me/botfather)
2. Digite `/newbot`
3. Escolha um nome para o bot
4. Escolha um username (deve terminar com 'bot')
5. Copie o token fornecido

### 2. Obter ID dos Grupos
```bash
# Método 1: Via API
curl "https://api.telegram.org/bot<SEU_TOKEN>/getUpdates"

# Método 2: Adicionar @userinfobot ao grupo
```

### 3. Adicionar Bot aos Grupos
1. Adicione o bot aos grupos desejados
2. Dê permissão para enviar mensagens
3. Teste com uma mensagem

## 🧪 Testando o Bot

### Após o Deploy
1. Acesse a URL fornecida pela Netlify
2. Use a interface web para testar
3. Verifique se as mensagens chegam nos grupos

### Endpoints para Teste
```bash
# Enviar mensagem
curl -X POST https://seu-site.netlify.app/.netlify/functions/send-telegram

# Trigger do bot
curl -X POST https://seu-site.netlify.app/.netlify/functions/trigger-bot
```

## 🔧 Personalização Rápida

### Alterar Mensagem
Edite o arquivo `netlify/functions/send-telegram.js`, função `criarMensagem()`.

### Alterar Botões
Modifique a seção `reply_markup` no mesmo arquivo.

### Alterar Horários
Ajuste a lógica em `gerarHorarios()`.

## 📱 Automação

### Webhook
Configure um webhook para acionar automaticamente:
```
POST https://seu-site.netlify.app/.netlify/functions/trigger-bot
```

### Cron Job
Use serviços como cron-job.org para execução periódica.

## 🆘 Problemas Comuns

### Bot não envia mensagens
- ✅ Verifique o token
- ✅ Confirme se o bot está nos grupos
- ✅ Verifique os IDs dos grupos
- ✅ Consulte os logs da Netlify

### Erro 500
- ✅ Verifique as variáveis de ambiente
- ✅ Consulte os logs de função
- ✅ Teste localmente primeiro

### CORS Error
- ✅ As funções já incluem CORS
- ✅ Use os endpoints corretos

---

**Pronto para usar! 🎉**

