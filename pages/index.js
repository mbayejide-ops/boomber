import React, { useState } from 'react';

export default function BomberUI() {
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [pass, setPass] = useState('');
  const [isUltimate, setIsUltimate] = useState(false);
  const [status, setStatus] = useState('READY');

  // 1. Connection Test Function
  const testConnection = async () => {
    setStatus('TESTING...');
    try {
      const res = await fetch('/api/test-signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: number || "01700000000", amount: 1, isUltimate: false }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('CONNECTION SUCCESS! ✅');
      } else {
        setStatus('CONNECTION FAILED! ❌');
      }
    } catch (err) {
      setStatus('ERROR: ' + err.message);
    }
  };

  // 2. Unlock Ultimate Mode
  const handleUnlock = () => {
    if (pass === "PROVIDER_1_KEY") {
      setIsUltimate(true);
      alert("ULTIMATE MODE UNLOCKED!");
    } else {
      alert("WRONG PASS!");
    }
  };

  // 3. Main Attack Function
  const startAttack = async () => {
    setStatus('ATTACKING...');
    try {
      const res = await fetch('/api/attack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, amount, isUltimate }),
      });
      const data = await res.json();
      setStatus(data.message || 'ATTACK STARTED!');
    } catch (err) {
      setStatus('ERROR: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-5 font-mono">
      <h1 className="text-5xl font-bold mb-4 glitch-text text-white">ULTIMATE BOMBER</h1>
      <p className="text-red-400 mb-8 animate-pulse">SYSTEM STATUS: {status}</p>

      <div className="bg-zinc-900 p-8 rounded-lg border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)] w-full max-w-md">
        <label className="block mb-2 text-white">TARGET NUMBER</label>
        <input type="text" placeholder="+8801XXXXXXXXX" className="w-full p-2 mb-4 bg-black border border-red-500 text-white outline-none" value={number} onChange={(e) => setNumber(e.target.value)} />

        {!isUltimate ? (
          <>
            <label className="block mb-2 text-white">SMS AMOUNT (MAX 100)</label>
            <input type="number" className="w-full p-2 mb-4 bg-black border border-red-500 text-white outline-none" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <p className="text-xs text-yellow-500 mb-4 text-center">ENTER ultimate pass for unlimited sms attempt</p>
            <input type="password" placeholder="Enter Pass" className="w-full p-2 mb-4 bg-black border border-blue-500 text-white outline-none" value={pass} onChange={(e) => setPass(e.target.value)} />
            <button onClick={handleUnlock} className="w-full bg-blue-600 text-white p-2 mb-4 hover:bg-blue-700 transition">UNLOCK ULTIMATE</button>
          </>
        ) : (
          <div className="mb-4">
            <label className="block mb-2 text-green-400">ULTIMATE MODE ACTIVE</label>
            <input type="text" placeholder="Target Number" className="w-full p-2 bg-black border border-green-500 text-white outline-none" value={number} onChange={(e) => setNumber(e.target.value)} />
          </div>
        )}

        <button onClick={startAttack} className="w-full bg-red-600 text-white py-3 font-bold rounded hover:bg-red-700 transition mt-4">SEND SMS</button>
        
        <div className="flex gap-2 mt-4">
          <button onClick={testConnection} className="w-1/2 bg-zinc-700 text-white py-2 rounded text-xs hover:bg-zinc-600 transition">TEST SIGNAL</button>
          <button onClick={() => setStatus('STOPPED')} className="w-1/2 bg-zinc-800 text-white py-2 rounded text-xs hover:bg-zinc-700">STOP</button>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75), 0.025em 0.05em 0 rgba(0,0,255,.75);
          animation: glitch 500ms infinite;
        }
        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75); }
          50% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,.75), 0.05em 0.05em 0 rgba(0,255,0,.75); }
          100% { text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75); }
        }
      `}</style>
    </div>
  );
    }
