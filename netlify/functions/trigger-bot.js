const axios = require('axios');

// Função para fazer trigger do bot
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Obter a URL base da função
    const baseUrl = `https://${event.headers.host}`;
    const sendTelegramUrl = `${baseUrl}/.netlify/functions/send-telegram`;
    
    // Chamar a função de envio
    const response = await axios.post(sendTelegramUrl);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Bot acionado com sucesso!',
        timestamp: new Date().toISOString(),
        result: response.data
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

