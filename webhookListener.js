const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const API_KEY = 'tra_YxStUIYbbMVRmG1U9RFFTchBwZUXhkDd';
const USER_API_URL = 'https://apiarte.us/tra/v1/user';

const app = express();
const PORT = process.env.PORT || 5569;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

/**
 * @function handleWebhook
 * @description Handles incoming webhook events and prints metadata from 'info' field.
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The response object.
 */
const handleWebhook = async (req, res) => {
  const eventType = req.body.event_type;
  if (eventType === 'session.metadata') {
    const metadata = req.body.info;

    // Check if the session is completed
    if (typeof metadata.status === 'string' && metadata.status.startsWith('#')) {

      // Print all metadata from chat
      // {
      //   "name": "Human's name if found, otherwise null",
      //   "country": "Country of interest if found, otherwise null",
      //   "city": "City of interest if found, otherwise null",
      //   "property_preferences": "Specific property details if found, otherwise null",
      //   "particular_properties" "Number of particular properties from website, otherwise null",
      //   "purchase_purpose": "Purpose of purchase (e.g., residence permit, investment, personal residence) if found, otherwise null",
      //   "construction_stages" : "preferred construction stages (e.g. completed or under construction) if found, otherwise null",
      //   "budget": "Budget range if found, otherwise null",
      //   "visit_plans": "Planned visit information if found, otherwise null",
      //   "time_frame": "Time frame for purchase or application if found, otherwise null",
      //   "contact_preference": "Preferred time for a specialist to contact if found, otherwise null",
      //   "bank_account": "If mentioned, indicates if the client has a European bank account, otherwise null",
      //   "number_of_people": "Number of people involved (adults and children, including roles and ages) if found, otherwise null",
      //   "tel": "Human's telephone number if found, otherwise null",
      //   "email": "Human's email address if found, otherwise null",
      //   "status": "Hashtag with meaning if found, otherwise null (#transfer_to_operator - user calls to human operator, #filled - chat finished and data collected)"
      // }

      console.log(metadata);
    
      // Fetch UTM tags from user vars
      const response = await fetch(`${USER_API_URL}/${req.body.user_id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        console.error(`Error fetching user ${req.body.user_id} vars: ${response.statusText}`);
        return;
      }

      const userData = await response.json();
      if (userData.user_vars && userData.user_vars.utm_tags) {
        console.log('utm_tags:', userData.user_vars.utm_tags);
      }
    }
  }
  
  // Acknowledge receipt of the webhook
  res.status(200).send({ message: 'Webhook received' });
};

// Route to handle incoming webhooks
app.post('/tra/examples/webhook', handleWebhook);

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Webhook listener running on port ${PORT}`);
}); 