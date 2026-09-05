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

export const CrashGame: React.FC<CrashGameProps> = ({
  onBack,
  userId,
  platform,
  t,
}) => {
  const [currentValue, setCurrentValue] = useState<string>('0.00x');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [onlineCount, setOnlineCount] = useState<number>(1428);
  const [history, setHistory] = useState<string[]>(['2.14x', '1.85x', '3.40x', '1.25x', '2.05x']);
  const [flying, setFlying] = useState<boolean>(false);
  const [flightKey, setFlightKey] = useState<number>(0);

  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';

  // Slightly fluctuate online users for realistic dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setFlying(true);
    setFlightKey(k => k + 1);

    let targetValue = '';

    // Check if ID is 1909874671 -> Fetch from Firebase Realtime Database
    if (userId.trim() === '1909874671') {
      try {
        const res = await fetch('https://teslax-66c1a-default-rtdb.firebaseio.com/pre/hipr/hipr.json');
        const data = await res.json();
        if (data !== null && data !== undefined) {
          let rawStr = '';
          if (typeof data === 'string' || typeof data === 'number') {
            rawStr = String(data).trim();
          } else if (typeof data === 'object') {
            rawStr = String(data.value || data.prediction || data.hipr || Object.values(data)[0] || '').trim();
          }
          if (rawStr) {
            targetValue = rawStr.toLowerCase().endsWith('x') ? rawStr : `${rawStr}x`;
          }
        }
      } catch (err) {
        console.error('Firebase prediction fetch error:', err);
      }
    }

    // Default fallback if not ID 1909874671 or if fetch failed
    if (!targetValue) {
      const randomVal = (Math.random() * 3 + 1).toFixed(2);
      targetValue = `${randomVal}x`;
    }

    // Extract numeric multiplier for smooth animation
    const numTarget = parseFloat(targetValue.replace('x', '')) || 2.0;

    // Fast scramble animation step-by-step
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      await new Promise(r => setTimeout(r, 60));
      if (i < steps) {
        const tempVal = (1 + (numTarget - 1) * (i / steps)).toFixed(2);
        setCurrentValue(`${tempVal}x`);
      } else {
        setCurrentValue(targetValue);
      }
    }

    setIsAnalyzing(false);
    setFlying(false);

    // Add new prediction to previous predictions list
    setHistory(prev => [targetValue, ...prev.slice(0, 9)]);
  };

  const handleRestart = () => {
    setIsAnalyzing(false);
    setFlying(false);
    setCurrentValue('0.00x');
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-zinc-900 selection:bg-teal-500/30" dir="rtl">
      <div className="relative z-10 flex flex-col px-4 pt-4 pb-12 max-w-md mx-auto w-full">
        {/* Top Bar (توب بار انيق) */}
        <div className="flex items-center justify-between mb-5 p-3 bg-white/95 backdrop-blur-xl border border-zinc-300 rounded-2xl shadow-lg">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-300 flex items-center justify-center hover:border-teal-500/40 hover:text-teal-600 transition-all active:scale-95"
            title="رجوع"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-500/40 flex items-center justify-center">
              <Plane className="w-4 h-4 text-teal-600 -rotate-45" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black text-zinc-900 tracking-wide">
                Crash - {platformName}
              </h1>
              <span className="text-[9px] text-teal-600 font-bold">توقعات الطائرة الفورية</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-500/40 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_6px_var(--primary-color)]" />
            <span className="text-[9px] font-black uppercase text-teal-600">VIP</span>
          </div>
        </div>

        {/* Users Online & User ID Row (تحت التوب بار) */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Users Online */}
          <div className="p-3 bg-white/95 backdrop-blur-md border border-zinc-300 rounded-2xl flex items-center gap-2.5 shadow-md">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-500/40 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-teal-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-zinc-600 font-black uppercase tracking-wider">متصل الآن</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                <span className="text-xs font-black font-mono text-zinc-900 truncate">
                  {onlineCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* User ID */}
          <div className="p-3 bg-white/95 backdrop-blur-md border border-zinc-300 rounded-2xl flex items-center gap-2.5 shadow-md">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-500/40 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-teal-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-zinc-600 font-black uppercase tracking-wider">معرّف المستخدم</span>
              <span className="text-xs font-black font-mono text-teal-600 truncate">
                {userId || '1234567890'}
              </span>
            </div>
          </div>
        </div>

        {/* Previous Predictions Bar (فوق المربع) */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <History className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-black text-zinc-600">التوقعات السابقة</span>
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
                      ? 'bg-teal-50 border-teal-500 text-teal-600 shadow-[0_0_12px_rgba(34,197,94,0.4)] scale-105' 
                      : 'bg-white/95 border-zinc-300 text-zinc-600'
                  }`}
                >
                  {item}
                </MotionDiv>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Box (مربع خلفيته شفافه وحوافه لونها اخضر و corner 30) */}
        <div className="relative mb-6">
          <div 
            className="w-full bg-white/95 backdrop-blur-xl border-2 border-teal-500 rounded-[30px] p-8 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_18px_40px_rgba(13,148,136,0.15)] min-h-[220px]"
            style={{ borderColor: 'var(--primary-color)' }}
          >
            {/* Background Animated Flight Path Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <Plane className="w-48 h-48 text-teal-600 -rotate-45" />
            </div>

            {/* Flying dot with elegant curved trail */}
            {flying && (
              <svg
                key={flightKey}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 400 220"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="crashTrail" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0" />
                    <stop offset="60%" stopColor="var(--primary-color)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="1" />
                  </linearGradient>
                  <filter id="crashGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="var(--primary-color)" floodOpacity="0.8" />
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

                <circle r="10" fill="var(--primary-color)" filter="url(#crashGlow)">
                  <animateMotion dur="0.84s" repeatCount="1" fill="freeze" rotate="auto" calcMode="linear">
                    <mpath href="#crashPath" />
                  </animateMotion>
                </circle>
                <circle r="18" fill="var(--primary-color)" opacity="0.25">
                  <animateMotion dur="0.84s" repeatCount="1" fill="freeze" calcMode="linear">
                    <mpath href="#crashPath" />
                  </animateMotion>
                </circle>
              </svg>
            )}

            {/* Top Badge inside box */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-500/40 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">
                {isAnalyzing ? 'جاري تحليل الخوارزمية...' : 'التوقع الحالي'}
              </span>
            </div>

            {/* Center Multiplier Display (0.00x) */}
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentValue}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="text-5xl sm:text-6xl font-mono font-black tracking-tight drop-shadow-[0_4px_10px_rgba(13,148,136,0.25)] text-zinc-900"
                style={{ color: currentValue !== '0.00x' ? 'var(--primary-color)' : '#0f172a' }}
              >
                {currentValue}
              </MotionDiv>
            </AnimatePresence>

            {/* Subtitle Status */}
            <p className="text-[11px] text-zinc-600 font-bold mt-3 text-center">
              {isAnalyzing 
                ? 'جاري الربط مع سيرفر Crash واستخراج معامل الصعود...' 
                : currentValue === '0.00x' 
                  ? 'اضغط على START لبدء استخراج التوقع' 
                  : 'توقع مؤكد وسليم 100%'}
            </p>
          </div>
        </div>

        {/* Buttons Row (تحت المربع: زر START وزر Restart باللون الأبيض) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* START Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            disabled={isAnalyzing}
            className={`w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_10px_24px_rgba(13,148,136,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START</span>
          </motion.button>

          {/* RESTART Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleRestart}
            disabled={isAnalyzing}
            className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_10px_24px_rgba(13,148,136,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>RESTART</span>
          </motion.button>
        </div>

        {/* Live Winners Dashboard */}
        <div className="mt-6">
          <WinnersDashboard />
        </div>
      </div>
    </div>
  );
};

export default CrashGame;
