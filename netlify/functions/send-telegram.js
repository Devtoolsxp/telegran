const axios = require('axios');

// Configurações do bot
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '6444055280:AAGLBSmANKK4JRMtjavOKK_kvAcnC1_74YI';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

// Lista de grupos (pode ser configurada via variáveis de ambiente)
const GRUPOS = process.env.TELEGRAM_GROUPS ? 
  JSON.parse(process.env.TELEGRAM_GROUPS) : 
  ["-1001770830283"];

// Base de dados dos jogos com RTP alto
const JOGOS_RTP = [
  {
    name: "Mega Joker",
    rtp: "99.00%",
    image_url: "https://via.placeholder.com/400x300/FFD700/000000?text=MEGA+JOKER",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Book of 99",
    rtp: "99.00%",
    image_url: "https://via.placeholder.com/400x300/4169E1/FFFFFF?text=BOOK+OF+99",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Aztec Jaguar Megaways",
    rtp: "98.11%",
    image_url: "https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=AZTEC+JAGUAR",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Codex of Fortune",
    rtp: "98.00%",
    image_url: "https://via.placeholder.com/400x300/1E90FF/FFFFFF?text=CODEX+FORTUNE",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "White Rabbit Megaways",
    rtp: "97.72%",
    image_url: "https://via.placeholder.com/400x300/32CD32/FFFFFF?text=WHITE+RABBIT",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Blood Suckers Megaways",
    rtp: "97.66%",
    image_url: "https://via.placeholder.com/400x300/DC143C/FFFFFF?text=BLOOD+SUCKERS",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Ratinho Sortudo",
    rtp: "97.57%",
    image_url: "https://via.placeholder.com/400x300/FF69B4/FFFFFF?text=RATINHO+SORTUDO",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Touro Sortudo",
    rtp: "97.55%",
    image_url: "https://via.placeholder.com/400x300/FF4500/FFFFFF?text=TOURO+SORTUDO",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Macaco Sortudo",
    rtp: "97.50%",
    image_url: "https://via.placeholder.com/400x300/8B4513/FFFFFF?text=MACACO+SORTUDO",
    platform_url: "https://www.81bet40.com/?id=222636640"
  },
  {
    name: "Fortune Tiger",
    rtp: "96.81%",
    image_url: "https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=FORTUNE+TIGER",
    platform_url: "https://www.81bet40.com/?id=222636640"
  }
];

// Função para gerar horário atual e próximo
function gerarHorarios() {
  const agora = new Date();
  const opcoes = {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  
  const entradaAtual = agora.toLocaleTimeString('pt-BR', opcoes);
  
  const proximaEntrada = new Date(agora.getTime() + 2 * 60000); // +2 minutos
  const entradaProxima = proximaEntrada.toLocaleTimeString('pt-BR', opcoes);
  
  return { entradaAtual, entradaProxima };
}

// Função para gerar número aleatório baseado no RTP
function gerarSinalAleatorio(rtp) {
  const rtpNumerico = parseFloat(rtp.replace('%', ''));
  // Gera um sinal baseado no RTP com variação de ±5%
  const variacao = (Math.random() - 0.5) * 10; // -5% a +5%
  const sinal = Math.max(60, Math.min(99, rtpNumerico + variacao));
  return Math.round(sinal * 100) / 100;
}

// Função para selecionar jogo aleatório
function selecionarJogoAleatorio() {
  const indiceAleatorio = Math.floor(Math.random() * JOGOS_RTP.length);
  return JOGOS_RTP[indiceAleatorio];
}

// Função para criar a mensagem
function criarMensagem() {
  const { entradaAtual, entradaProxima } = gerarHorarios();
  const jogoSelecionado = selecionarJogoAleatorio();
  const sinal = gerarSinalAleatorio(jogoSelecionado.rtp);
  
  return {
    texto: `🎰 OPORTUNIDADE IDENTIFICADA:
🔥 JOGO: ${jogoSelecionado.name} 🔥
 
📊 RTP: ${jogoSelecionado.rtp}
🚀 SINAL: ${sinal}%
 
⏰ ENTRADA: ${entradaAtual} ⏰
⏰ PRÓXIMA: ${entradaProxima} ⏰
 
💡 Máximo 30 jogadas por entrada
💰 Se não pagar, aguarde a próxima oportunidade

🚨 VÁLIDO APENAS PARA A PLATAFORMA ABAIXO 🚨`,
    jogo: jogoSelecionado
  };
}

// Função para enviar mensagem para um grupo
async function enviarMensagemParaGrupo(chatId, dadosMensagem) {
  const params = {
    chat_id: chatId,
    photo: dadosMensagem.jogo.image_url,
    caption: dadosMensagem.texto,
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: '🎮 JOGAR AGORA', url: dadosMensagem.jogo.platform_url }
        ]
      ]
    })
  };

  try {
    const response = await axios.post(TELEGRAM_API_URL, params);
    return { success: true, chatId, response: response.data };
  } catch (error) {
    return { success: false, chatId, error: error.message };
  }
}

// Função principal da Netlify
exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Responder a requisições OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Criar mensagem dinâmica com jogo aleatório
    const dadosMensagem = criarMensagem();
    
    // Enviar para todos os grupos
    const resultados = await Promise.all(
      GRUPOS.map(chatId => enviarMensagemParaGrupo(chatId, dadosMensagem))
    );
    
    // Contar sucessos e falhas
    const sucessos = resultados.filter(r => r.success).length;
    const falhas = resultados.filter(r => !r.success).length;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Mensagens enviadas com sucesso para ${sucessos} grupo(s). ${falhas} falha(s).`,
        jogoEnviado: {
          nome: dadosMensagem.jogo.name,
          rtp: dadosMensagem.jogo.rtp
        },
        resultados,
        mensagemEnviada: dadosMensagem.texto
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};

