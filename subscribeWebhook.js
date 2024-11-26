const axios = require('axios');

const API_URL = 'https://apiarte.us/tra/v1/webhooks';
const API_KEY = 'tra_YxStUIYbbMVRmG1U9RFFTchBwZUXhkDd';

/* !! ADD YOUR WEBHOOK LISTENER URL HERE !! */
const WEBHOOK_URL = 'https://apiarte.us/tra/examples/webhook';


const subscribeWebhook = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        url: WEBHOOK_URL,
        event_types: ['session.metadata'],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Webhook subscribed successfully:', response.data);
  } catch (error) {
    console.error('Error subscribing webhook:', error.response?.data || error.message);
  }
};

subscribeWebhook(); 