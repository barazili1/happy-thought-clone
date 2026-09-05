import React, { useEffect, useState } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

interface Winner {
  id: string;
  userId: string;
  bet: number;
  win: number;
}

const maskId = (raw: string) => `${raw.slice(0, 2)}*******${raw.slice(-2)}`;

const makeWinner = (): Winner => {
  const raw = String(Math.floor(1000000000 + Math.random() * 8999999999));
  const bet = [10, 20, 25, 50, 75, 100, 150, 200, 250, 500][Math.floor(Math.random() * 10)];
  const mult = 1.8 + Math.random() * 8;
  return {
    id: `${Date.now()}-${Math.random()}`,
    userId: maskId(raw),
    bet,
    win: Math.round(bet * mult),
  };
};

const WinnersDashboard: React.FC<{ title?: string }> = ({ title = 'فوز اللاعبين مباشر' }) => {
  const [rows, setRows] = useState<Winner[]>(() => Array.from({ length: 6 }, makeWinner));

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) => [makeWinner(), ...prev].slice(0, 6));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg" dir="ltr">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/60">
        <div className="flex items-center gap-2">
          <Trophy className="w-3.5 h-3.5" style={{ color: 'var(--primary-color)' }} />
          <span className="text-[11px] font-black text-white tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-color)' }} />
          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--primary-color)' }}>LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white/50 border-b border-white/10">
        <span className="text-left">User id</span>
        <span className="text-center">Bet</span>
        <span className="text-right">Win</span>
      </div>

      <div className="divide-y divide-zinc-200">
        {rows.map((row, idx) => (
          <div
            key={row.id}
            className={`grid grid-cols-3 items-center px-4 py-2 font-mono text-[11px] transition-colors ${
              idx === 0 ? 'bg-black/60' : ''
            }`}
          >
            <span className="text-left text-white/50 tracking-tight">{row.userId}</span>
            <span className="text-center text-white/50">{row.bet}</span>
            <span className="font-black flex items-center gap-1 justify-end" style={{ color: 'var(--primary-color)' }}>
              <TrendingUp className="w-3 h-3" />
              {row.win}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinnersDashboard;
