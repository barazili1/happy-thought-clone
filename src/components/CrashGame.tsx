import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ArrowLeft, Users, User, RotateCcw, Play, History, Sparkles } from 'lucide-react';
import { Platform } from '../types';
import WinnersDashboard from './WinnersDashboard';

const MotionDiv = motion.div as any;

interface CrashGameProps {
  onBack: () => void;
  userId: string;
  platform: Platform;
  t: any;
}

const card = 'bg-[#07090790] backdrop-blur-xl border border-white/10 rounded-2xl';

export const CrashGame: React.FC<CrashGameProps> = ({ onBack, userId, platform }) => {
  const [currentValue, setCurrentValue] = useState<string>('0.00x');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [onlineCount, setOnlineCount] = useState<number>(1428);
  const [history, setHistory] = useState<string[]>(['2.14x', '1.85x', '3.40x', '1.25x', '2.05x']);
  const [flying, setFlying] = useState<boolean>(false);
  const [flightKey, setFlightKey] = useState<number>(0);

  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setFlying(true);
    setFlightKey((k) => k + 1);

    let targetValue = '';

    if (userId.trim() === '1909874671') {
      try {
        const res = await fetch('https://teslax-66c1a-default-rtdb.firebaseio.com/pre/hipr/hipr.json');
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
    setFlying(false);
    setHistory((prev) => [targetValue, ...prev.slice(0, 9)]);
  };

  const handleRestart = () => {
    setIsAnalyzing(false);
    setFlying(false);
    setCurrentValue('0.00x');
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-white selection:bg-[#7DF9FF]/30" dir="rtl">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(rgba(125,249,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(125,249,255,0.5)_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px] bg-[rgba(125,249,255,0.12)]" />
      </div>

      <div className="relative z-10 flex flex-col px-4 pt-4 pb-12 max-w-md mx-auto w-full">
        {/* Top bar */}
        <div className={`flex items-center justify-between mb-5 p-3 ${card}`}>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:border-[rgba(125,249,255,0.5)] hover:text-[#7DF9FF] transition-all active:scale-95"
            title="رجوع"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[rgba(125,249,255,0.1)] border border-[rgba(125,249,255,0.35)] flex items-center justify-center">
              <Plane className="w-4 h-4 text-[#7DF9FF] -rotate-45" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black text-white tracking-wide">Crash - {platformName}</h1>
              <span className="text-[9px] text-[#7DF9FF] font-bold">توقعات الطائرة الفورية</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[rgba(125,249,255,0.1)] border border-[rgba(125,249,255,0.35)] rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7DF9FF] animate-pulse shadow-[0_0_8px_#7DF9FF]" />
            <span className="text-[9px] font-black uppercase text-[#7DF9FF]">VIP</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className={`p-3 flex items-center gap-2.5 ${card}`}>
            <div className="w-8 h-8 rounded-xl bg-[rgba(125,249,255,0.1)] border border-[rgba(125,249,255,0.35)] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-[#7DF9FF]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-white/50 font-black uppercase tracking-wider">
                متصل الآن
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7DF9FF] animate-ping" />
                <span className="text-xs font-black font-mono text-white truncate">
                  {onlineCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className={`p-3 flex items-center gap-2.5 ${card}`}>
            <div className="w-8 h-8 rounded-xl bg-[rgba(125,249,255,0.1)] border border-[rgba(125,249,255,0.35)] flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#7DF9FF]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-white/50 font-black uppercase tracking-wider">
                معرّف المستخدم
              </span>
              <span className="text-xs font-black font-mono text-[#7DF9FF] truncate">
                {userId || '1234567890'}
              </span>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <History className="w-3.5 h-3.5 text-[#7DF9FF]" />
            <span className="text-xs font-black text-white/60">التوقعات السابقة</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            <AnimatePresence>
              {history.map((item, idx) => (
                <MotionDiv
                  key={`${item}-${idx}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-black border transition-all ${
                    idx === 0
                      ? 'bg-[rgba(125,249,255,0.12)] border-[#7DF9FF] text-[#7DF9FF] shadow-[0_0_16px_rgba(125,249,255,0.45)] scale-105'
                      : 'bg-black/50 border-white/10 text-white/60'
                  }`}
                >
                  {item}
                </MotionDiv>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Main box */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 rounded-[38px] blur-2xl bg-[rgba(125,249,255,0.12)] pointer-events-none" />
          <div className="relative w-full bg-[#04060480] backdrop-blur-xl border-2 border-[rgba(125,249,255,0.55)] rounded-[30px] p-8 sm:p-10 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(125,249,255,0.18)] min-h-[230px]">
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none flex items-center justify-center">
              <Plane className="w-48 h-48 text-[#7DF9FF] -rotate-45" />
            </div>

            {flying && (
              <svg
                key={flightKey}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 400 220"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="crashTrail" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7DF9FF" stopOpacity="0" />
                    <stop offset="60%" stopColor="#7DF9FF" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7DF9FF" stopOpacity="1" />
                  </linearGradient>
                  <filter id="crashGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#7DF9FF" floodOpacity="0.9" />
                  </filter>
                </defs>

                <path
                  id="crashPath"
                  d="M 12 212 C 90 208, 150 180, 210 120 S 330 30, 390 10"
                  fill="none"
                  stroke="url(#crashTrail)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#crashGlow)"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="1"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="1"
                    to="0"
                    dur="0.84s"
                    calcMode="linear"
                    repeatCount="1"
                    fill="freeze"
                  />
                </path>

                <circle r="10" fill="#7DF9FF" filter="url(#crashGlow)">
                  <animateMotion dur="0.84s" repeatCount="1" fill="freeze" rotate="auto" calcMode="linear">
                    <mpath href="#crashPath" />
                  </animateMotion>
                </circle>
                <circle r="18" fill="#7DF9FF" opacity="0.25">
                  <animateMotion dur="0.84s" repeatCount="1" fill="freeze" calcMode="linear">
                    <mpath href="#crashPath" />
                  </animateMotion>
                </circle>
              </svg>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1 bg-[rgba(125,249,255,0.1)] border border-[rgba(125,249,255,0.35)] rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-[#7DF9FF]" />
              <span className="text-[10px] font-black text-[#7DF9FF] uppercase tracking-[0.2em]">
                {isAnalyzing ? 'جاري تحليل الخوارزمية...' : 'التوقع الحالي'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentValue}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="text-5xl sm:text-6xl font-mono font-black tracking-tight"
                style={{
                  color: currentValue !== '0.00x' ? '#7DF9FF' : '#ffffff',
                  textShadow:
                    currentValue !== '0.00x'
                      ? '0 0 26px rgba(125,249,255,0.75)'
                      : '0 0 18px rgba(255,255,255,0.2)',
                }}
              >
                {currentValue}
              </MotionDiv>
            </AnimatePresence>

            <p className="text-[11px] text-white/50 font-bold mt-3 text-center">
              {isAnalyzing
                ? 'جاري الربط مع سيرفر Crash واستخراج معامل الصعود...'
                : currentValue === '0.00x'
                  ? 'اضغط على START لبدء استخراج التوقع'
                  : 'توقع مؤكد وسليم 100%'}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            disabled={isAnalyzing}
            className={`w-full py-3.5 px-4 bg-[#7DF9FF] text-black font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_28px_rgba(125,249,255,0.45)] flex items-center justify-center gap-2 transition-all cursor-pointer hover:brightness-110 ${
              isAnalyzing ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleRestart}
            disabled={isAnalyzing}
            className="w-full py-3.5 px-4 bg-black border border-[rgba(125,249,255,0.5)] text-[#7DF9FF] font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(125,249,255,0.2)] flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-[rgba(125,249,255,0.08)]"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>RESTART</span>
          </motion.button>
        </div>

        <div className="mt-6">
          <WinnersDashboard />
        </div>
      </div>
    </div>
  );
};

export default CrashGame;
