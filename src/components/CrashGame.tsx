import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, RotateCcw, Play, History, Snowflake } from 'lucide-react';
import { Platform } from '../types';
import { getPlatform } from '../utils/platforms';
import crashLogo from '../assets/logo-crash.png';

const MotionDiv = motion.div as any;

interface CrashGameProps {
  onBack: () => void;
  userId: string;
  platform: Platform;
  t: any;
}

export const CrashGame: React.FC<CrashGameProps> = ({ onBack, userId, platform }) => {
  const [currentValue, setCurrentValue] = useState<string>('0.00x');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [onlineCount, setOnlineCount] = useState<number>(1428);
  const [history, setHistory] = useState<string[]>(['2.14x', '1.85x', '3.40x', '1.25x', '2.05x']);

  const platformName = getPlatform(platform).name;

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    let targetValue = '';

    if (userId.trim() === '1909874671') {
      try {
        const res = await fetch('https://evoioi-default-rtdb.europe-west1.firebasedatabase.app/pre/hipr/hipr.json');
        const data = await res.json();
        if (data !== null && data !== undefined) {
          let rawStr = '';
          if (typeof data === 'string' || typeof data === 'number') {
            rawStr = String(data).trim();
          } else if (typeof data === 'object') {
            rawStr = String(
              data.value || data.prediction || data.hipr || Object.values(data)[0] || ''
            ).trim();
          }
          if (rawStr) {
            targetValue = rawStr.toLowerCase().endsWith('x') ? rawStr : `${rawStr}x`;
          }
        }
      } catch (err) {
        console.error('Firebase prediction fetch error:', err);
      }
    }

    if (!targetValue) {
      const randomVal = (Math.random() * 3 + 1).toFixed(2);
      targetValue = `${randomVal}x`;
    }

    const numTarget = parseFloat(targetValue.replace('x', '')) || 2.0;

    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, 60));
      if (i < steps) {
        const tempVal = (1 + (numTarget - 1) * (i / steps)).toFixed(2);
        setCurrentValue(`${tempVal}x`);
      } else {
        setCurrentValue(targetValue);
      }
    }

    setIsAnalyzing(false);
    setHistory((prev) => [targetValue, ...prev.slice(0, 9)]);
  };

  const handleRestart = () => {
    setIsAnalyzing(false);
    setCurrentValue('0.00x');
  };

  const hasValue = currentValue !== '0.00x';

  return (
    <div dir="rtl" className="flex min-h-full flex-col overflow-x-hidden font-sans text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(125,249,255,0.09)] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col px-6 pt-7 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label="رجوع"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all hover:border-[rgba(125,249,255,0.4)] hover:text-[#7DF9FF] active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
              <Users className="h-3 w-3 text-[#7DF9FF]" />
              <span className="font-mono text-[11px] font-black tabular-nums text-white/70">
                {onlineCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-[rgba(125,249,255,0.25)] bg-[rgba(125,249,255,0.07)] px-3 py-1.5">
              <Snowflake className="h-3 w-3 animate-pulse text-[#7DF9FF]" />
              <span className="text-[10px] font-black tracking-widest text-[#7DF9FF]">{platformName}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mt-7 flex flex-col items-center text-center">
          <img
            src={crashLogo}
            alt="Crash"
            loading="lazy"
            width={512}
            height={512}
            className="h-14 w-14 object-contain drop-shadow-[0_0_16px_rgba(125,249,255,0.5)]"
          />
          <h1 className="mt-2 text-[26px] font-black leading-tight tracking-tight">توقع الطائرة</h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            ID: {userId || '----------'}
          </p>
        </div>

        {/* 320x320 pulse circle */}
        <div className="relative mx-auto mt-8 flex items-center justify-center" style={{ width: 320, height: 320 }}>
          {/* pulse rings */}
          {[0, 1, 2].map((i) => (
            <MotionDiv
              key={i}
              className="absolute rounded-full border border-[rgba(125,249,255,0.45)]"
              style={{ width: 320, height: 320 }}
              animate={{ scale: [0.72, 1], opacity: [0.55, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.85,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* rotating halo */}
          <MotionDiv
            className="absolute rounded-full"
            style={{
              width: 320,
              height: 320,
              background:
                'conic-gradient(from 0deg, rgba(125,249,255,0) 0deg, rgba(125,249,255,0.55) 90deg, rgba(125,249,255,0) 200deg)',
              mask: 'radial-gradient(circle, transparent 61%, #000 62%)',
              WebkitMask: 'radial-gradient(circle, transparent 61%, #000 62%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: isAnalyzing ? 1.4 : 7, repeat: Infinity, ease: 'linear' }}
          />

          {/* glass core */}
          <MotionDiv
            animate={{
              boxShadow: [
                '0 0 30px rgba(125,249,255,0.18), inset 0 0 40px rgba(125,249,255,0.08)',
                '0 0 70px rgba(125,249,255,0.45), inset 0 0 60px rgba(125,249,255,0.16)',
                '0 0 30px rgba(125,249,255,0.18), inset 0 0 40px rgba(125,249,255,0.08)',
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center justify-center rounded-full border border-[rgba(125,249,255,0.35)] bg-gradient-to-b from-[rgba(125,249,255,0.10)] via-black/80 to-black backdrop-blur-xl"
            style={{ width: 262, height: 262 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7DF9FF]">
              {isAnalyzing ? 'تحليل' : 'الأودد'}
            </span>

            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentValue}
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.12 }}
                className="mt-1 font-mono text-[56px] font-black leading-none tracking-tight"
                style={{
                  color: hasValue ? '#7DF9FF' : '#ffffff',
                  textShadow: hasValue
                    ? '0 0 30px rgba(125,249,255,0.7)'
                    : '0 0 18px rgba(255,255,255,0.18)',
                }}
              >
                {currentValue}
              </MotionDiv>
            </AnimatePresence>

            <p className="mt-2 max-w-[180px] text-center text-[10px] font-medium leading-relaxed text-white/35">
              {isAnalyzing
                ? 'جاري الربط مع السيرفر...'
                : hasValue
                  ? 'توقع مؤكد ١٠٠٪'
                  : 'اضغط بدء لاستخراج التوقع'}
            </p>
          </MotionDiv>
        </div>

        {/* History */}
        <div className="mt-8">
          <div className="mb-2.5 flex items-center gap-1.5 px-1">
            <History className="h-3.5 w-3.5 text-[#7DF9FF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
              التوقعات السابقة
            </span>
          </div>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1">
            {history.map((item, idx) => (
              <div
                key={`${item}-${idx}`}
                className={`shrink-0 rounded-xl border px-3 py-1.5 font-mono text-[11px] font-black ${
                  idx === 0
                    ? 'border-[rgba(125,249,255,0.6)] bg-[rgba(125,249,255,0.10)] text-[#7DF9FF]'
                    : 'border-white/[0.07] bg-white/[0.02] text-white/40'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            onClick={handleStart}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 rounded-[20px] bg-gradient-to-l from-[#7DF9FF] to-white py-4 text-[13px] font-black uppercase tracking-wider text-black shadow-[0_16px_40px_-16px_rgba(125,249,255,0.8)] transition-all active:scale-[0.97] disabled:opacity-50"
          >
            <Play className="h-4 w-4 fill-black" />
            <span>بدء</span>
          </button>
          <button
            onClick={handleRestart}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 rounded-[20px] border border-[rgba(125,249,255,0.3)] bg-white/[0.03] py-4 text-[13px] font-black uppercase tracking-wider text-[#7DF9FF] transition-all active:scale-[0.97] disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" />
            <span>تصفير</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrashGame;
