# 🎰 Bot de Análise RTP - Telegram

Bot inteligente para enviar mensagens dinâmicas sobre jogos com RTP alto para grupos do Telegram, otimizado para deploy na Netlify.

## 🚀 Funcionalidades

- ✅ Análise de 10 jogos com RTP alto (96.81% - 99.00%)
- ✅ Seleção aleatória de jogos a cada envio
- ✅ Cálculo de sinais baseado no RTP real dos jogos
- ✅ Geração dinâmica de horários de entrada
- ✅ Imagens específicas para cada jogo
- ✅ Botão direto para a plataforma 81bet40.com
- ✅ Interface web para teste e monitoramento
- ✅ Funções serverless na Netlify
- ✅ CORS configurado para acesso externo

## 🎮 Jogos Incluídos

| Jogo | RTP | Descrição |
|------|-----|-----------|
| Mega Joker | 99.00% | Clássico com jackpot progressivo |
| Book of 99 | 99.00% | Slot com temática de livros mágicos |
| Aztec Jaguar Megaways | 98.11% | Aventura asteca com Megaways |
| Codex of Fortune | 98.00% | Prêmios crescentes da NetEnt |
| White Rabbit Megaways | 97.72% | Inspirado em Alice no País das Maravilhas |
| Blood Suckers Megaways | 97.66% | Caça vampiros renovado |
| Ratinho Sortudo | 97.57% | Wilds aleatórios da Pragmatic Play |
| Touro Sortudo | 97.55% | Símbolos de dinheiro do zodíaco chinês |
| Macaco Sortudo | 97.50% | Hold & Win com respins |
| Fortune Tiger | 96.81% | Popular no Brasil |

## 📁 Estrutura do Projeto

```
telegram-bot-netlify/
├── netlify/
│   └── functions/
│       ├── send-telegram.js    # Função principal para envio
│       └── trigger-bot.js      # Função para trigger externo
├── index.html                  # Interface de teste
├── package.json               # Dependências
├── netlify.toml              # Configuração da Netlify
├── .env.example              # Exemplo de variáveis
└── README.md                 # Esta documentação
```

## 🔧 Configuração

### 1. Variáveis de Ambiente

Configure as seguintes variáveis no painel da Netlify:

```env
TELEGRAM_BOT_TOKEN=seu_token_aqui
TELEGRAM_GROUPS=["@grupo1", "-1001234567890"]
IMAGE_URL=https://sua-imagem.com/imagem.jpg
```

### 2. Token do Bot

1. Acesse [@BotFather](https://t.me/botfather) no Telegram
2. Crie um novo bot com `/newbot`
3. Copie o token fornecido
4. Configure na variável `TELEGRAM_BOT_TOKEN`

### 3. IDs dos Grupos

Para obter o ID de um grupo:
1. Adicione o bot ao grupo
2. Envie uma mensagem no grupo
3. Acesse: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Procure pelo `chat.id` na resposta

## 🚀 Deploy na Netlify

### Método 1: GitHub (Recomendado)

1. Faça upload do código para um repositório GitHub
2. Conecte o repositório na Netlify
3. Configure as variáveis de ambiente
4. Deploy automático!

### Método 2: Drag & Drop

1. Faça zip da pasta do projeto
2. Arraste para o painel da Netlify
3. Configure as variáveis de ambiente

### Método 3: Netlify CLI

```bash
# Instalar CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 📡 Endpoints Disponíveis

### `/.netlify/functions/send-telegram`
- **Método**: POST
- **Descrição**: Envia mensagem para todos os grupos configurados
- **Resposta**: JSON com status e resultados

### `/.netlify/functions/trigger-bot`
- **Método**: POST
- **Descrição**: Aciona o bot via trigger externo
- **Resposta**: JSON com status da operação

## 🎮 Como Usar

### Interface Web
1. Acesse a URL do seu site na Netlify
2. Clique em "Enviar Mensagem para Telegram"
3. Verifique os grupos configurados

### Via API
```bash
# Enviar mensagem diretamente
curl -X POST https://seu-site.netlify.app/.netlify/functions/send-telegram

# Usar trigger
curl -X POST https://seu-site.netlify.app/.netlify/functions/trigger-bot
```

### Automação Externa
Você pode configurar webhooks ou cron jobs para acionar o bot automaticamente:

```bash
# Exemplo com cron (a cada 2 horas)
0 */2 * * * curl -X POST https://seu-site.netlify.app/.netlify/functions/trigger-bot
```

## 🔄 Personalização

### Modificar Mensagem
Edite a função `criarMensagem()` em `send-telegram.js`:

```javascript
function criarMensagem() {
  // Sua lógica personalizada aqui
  return "Sua mensagem personalizada";
}
```

### Adicionar Novos Grupos
Atualize a variável `TELEGRAM_GROUPS`:

```env
TELEGRAM_GROUPS=["@grupo1", "@grupo2", "-1001234567890"]
```

### Alterar Imagem
Configure a variável `IMAGE_URL` ou modifique diretamente no código.

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Instalar Netlify CLI
npm install -g netlify-cli

# Executar localmente
netlify dev
```

## 📝 Logs e Monitoramento

- Acesse os logs no painel da Netlify
- Monitore as execuções das funções
- Configure alertas para falhas

## 🔒 Segurança

- ✅ Token do bot protegido por variáveis de ambiente
- ✅ CORS configurado adequadamente
- ✅ Validação de requisições
- ✅ Tratamento de erros

## 🆘 Solução de Problemas

### Bot não envia mensagens
1. Verifique se o token está correto
2. Confirme se o bot foi adicionado aos grupos
3. Verifique os IDs dos grupos
4. Consulte os logs da Netlify

### Erro de CORS
- As funções já incluem headers CORS
- Verifique se está fazendo requisições para os endpoints corretos

### Função não executa
- Verifique se o arquivo está em `netlify/functions/`
- Confirme se o `netlify.toml` está configurado
- Verifique os logs de build

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs da Netlify
2. Teste localmente com `netlify dev`
3. Consulte a documentação da API do Telegram

---

**Desenvolvido para Netlify Functions** 🚀

