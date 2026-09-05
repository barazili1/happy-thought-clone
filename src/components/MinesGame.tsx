import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bomb, RotateCcw, Play } from 'lucide-react';
import { Platform } from '../types';
import WinnersDashboard from './WinnersDashboard';
import diamondImg from '../assets/diamond.png';

const MotionDiv = motion.div as any;

interface MinesGameProps {
  onBack: () => void;
  userId: string;
  platform: Platform;
  t?: any;
}

const DIAMOND_OPTIONS = [1, 3, 5, 9];
const TOTAL_CELLS = 25;

export const MinesGame: React.FC<MinesGameProps> = ({ onBack, userId, platform }) => {
  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';
  const [count, setCount] = useState<number>(1);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    setRevealed([]);

    const pool = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const picks = pool.slice(0, count);

    picks.forEach((cell, idx) => {
      setTimeout(() => {
        setRevealed((prev) => [...prev, cell]);
        if (idx === picks.length - 1) setIsRunning(false);
      }, 260 * (idx + 1));
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setRevealed([]);
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-white" dir="rtl">
      <div className="relative z-10 flex flex-col px-4 pt-4 pb-12 max-w-md mx-auto w-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-5 p-3 bg-black/60 backdrop-blur-xl border rounded-2xl shadow-lg"
          style={{ borderColor: 'rgba(var(--primary-color-rgb),0.35)' }}
        >
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center transition-all active:scale-95"
            title="رجوع"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center border"
              style={{ borderColor: 'rgba(var(--primary-color-rgb),0.4)', backgroundColor: 'rgba(var(--primary-color-rgb),0.12)' }}
            >
              <Bomb className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-wide">Mines - {platformName}</h1>
              <span className="text-[9px] font-bold" style={{ color: 'var(--primary-color)' }}>توقعات أماكن الألماس</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
            style={{ borderColor: 'rgba(var(--primary-color-rgb),0.25)', backgroundColor: 'rgba(var(--primary-color-rgb),0.1)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-color)' }} />
            <span className="text-[9px] font-black uppercase" style={{ color: 'var(--primary-color)' }}>VIP</span>
          </div>
        </div>

        {/* Game Name */}
        <div className="text-center mb-5">
          <h2 className="text-2xl font-black tracking-widest hud-text-glow" style={{ color: 'var(--primary-color)' }}>
            GAMS MINES
          </h2>
          <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest mt-1">
            ID: {userId || '----------'}
          </p>
        </div>

        {/* Grid 5x5 */}
        <div className="p-3 rounded-3xl bg-black border border-white/10 shadow-[0_18px_40px_rgba(15,23,42,0.08)] mb-6 mx-auto">
          <div className="grid grid-cols-5 gap-2 mx-auto">
            {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
              const isDiamond = revealed.includes(i);
              return (
                <div
                  key={i}
                  className="aspect-square w-[64px] rounded-2xl border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: isDiamond ? 'var(--primary-color)' : 'rgba(15,23,42,0.14)',
                    backgroundColor: isDiamond ? 'rgba(var(--primary-color-rgb),0.12)' : '#f3f6f4',
                    boxShadow: isDiamond
                      ? '0 8px 20px rgba(var(--primary-color-rgb),0.28)'
                      : 'inset 0 -3px 0 rgba(15,23,42,0.06)',
                  }}
                >
                  {isDiamond ? (
                    <MotionDiv
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    >
                      <img
                        src={diamondImg}
                        alt="ألماس"
                        loading="lazy"
                        width={512}
                        height={512}
                        className="w-10 h-10 object-contain drop-shadow-[0_4px_10px_rgba(13,148,136,0.35)]"
                      />
                    </MotionDiv>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Diamond count */}
        <div className="mb-5">
          <p className="text-center text-xs font-black text-white/50 mb-2.5">عدد الألماس</p>
          <div dir="ltr" className="flex items-center gap-2 overflow-x-auto no-scrollbar px-1">
            {DIAMOND_OPTIONS.map((n) => {
              const active = count === n;
              return (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  style={{
                    width: 120,
                    height: 45,
                    borderColor: active ? 'var(--primary-color)' : 'rgba(15,23,42,0.15)',
                    color: active ? 'var(--primary-color)' : '#a1a1aa',
                    boxShadow: active ? '0 0 18px var(--primary-glow)' : 'none',
                  }}
                  className="rounded-xl border-2 bg-black/60 backdrop-blur-md font-black text-base transition-all active:scale-95 shrink-0"
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start / Reset */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="h-12 rounded-xl bg-[#7DF9FF] text-black font-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            بدأ
          </button>
          <button
            onClick={handleReset}
            className="h-12 rounded-xl bg-transparent border-2 font-black flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)', boxShadow: '0 0 15px var(--primary-glow)' }}
          >
            <RotateCcw className="w-4 h-4" />
            اعاده بدأ
          </button>
        </div>

        <WinnersDashboard />
      </div>
    </div>
  );
};

export default MinesGame;
