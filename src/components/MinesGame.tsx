import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Play, Snowflake, Gem } from 'lucide-react';
import { Platform } from '../types';
import WinnersDashboard from './WinnersDashboard';
import diamondImg from '../assets/diamond.png';

const MotionDiv = motion.div as any;
const NEON = '#7DF9FF';

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
    <div dir="rtl" className="flex min-h-full flex-col font-sans text-white">
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col px-4 pt-5 pb-12">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md transition-all hover:border-[rgba(125,249,255,0.4)] hover:text-[#7DF9FF] active:scale-95"
            title="رجوع"
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-[rgba(125,249,255,0.28)] bg-[rgba(125,249,255,0.08)] px-3 py-1.5">
            <Snowflake className="h-3 w-3 animate-pulse text-[#7DF9FF]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#7DF9FF]">
              {platformName} VIP
            </span>
          </div>
        </div>

        {/* Title block */}
        <div className="relative mb-5 overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-b from-[rgba(125,249,255,0.10)] to-black/80 p-5 text-center backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[rgba(125,249,255,0.18)] blur-[80px]" />
          <img
            src={diamondImg}
            alt="ألماس"
            loading="lazy"
            width={512}
            height={512}
            className="relative mx-auto h-16 w-16 object-contain drop-shadow-[0_0_16px_rgba(125,249,255,0.55)]"
          />
          <h1 className="relative mt-2 text-2xl font-black tracking-[0.18em] text-[#7DF9FF]">GAMS MINES</h1>
          <p className="relative mt-1 font-mono text-[10px] uppercase tracking-widest text-white/35">
            ID: {userId || '----------'}
          </p>
        </div>

        {/* Grid */}
        <div className="mb-6 rounded-[26px] border border-white/[0.08] bg-black/70 p-3 backdrop-blur-xl">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
              const isDiamond = revealed.includes(i);
              return (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-2xl border transition-all duration-300"
                  style={{
                    borderColor: isDiamond ? NEON : 'rgba(255,255,255,0.07)',
                    backgroundColor: isDiamond ? 'rgba(125,249,255,0.12)' : 'rgba(255,255,255,0.03)',
                    boxShadow: isDiamond ? '0 0 20px rgba(125,249,255,0.35)' : 'none',
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
                        className="h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(125,249,255,0.6)]"
                      />
                    </MotionDiv>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Count picker */}
        <div className="mb-5">
          <div className="mb-2.5 flex items-center justify-center gap-2">
            <Gem className="h-3.5 w-3.5 text-[#7DF9FF]" />
            <p className="text-xs font-black text-white/50">عدد الألماس</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {DIAMOND_OPTIONS.map((n) => {
              const active = count === n;
              return (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className="h-12 rounded-2xl border font-black text-base transition-all active:scale-95"
                  style={{
                    borderColor: active ? NEON : 'rgba(255,255,255,0.08)',
                    color: active ? '#000' : 'rgba(255,255,255,0.45)',
                    backgroundColor: active ? NEON : 'rgba(255,255,255,0.03)',
                    boxShadow: active ? '0 8px 24px rgba(125,249,255,0.3)' : 'none',
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#7DF9FF] to-white py-3.5 font-black text-black shadow-[0_10px_30px_rgba(125,249,255,0.3)] transition-all active:scale-95 disabled:opacity-40"
          >
            <Play className="h-4 w-4" />
            بدأ
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[rgba(125,249,255,0.35)] bg-white/[0.03] py-3.5 font-black text-[#7DF9FF] transition-all active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            اعاده بدأ
          </button>
        </div>

        <WinnersDashboard />
      </div>
    </div>
  );
};

export default MinesGame;
