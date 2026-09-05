import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Snowflake } from 'lucide-react';
import { SelectedGame, Platform } from '../types';
import appleLogo from '../assets/logo-apple.png';
import crashLogo from '../assets/logo-crash.png';

const MotionDiv = motion.div as any;

interface GameSelectionProps {
  onSelectGame: (game: SelectedGame) => void;
  onBack: () => void;
  userId: string;
  platform: Platform;
  t: any;
}

export const GameSelection: React.FC<GameSelectionProps> = ({
  onSelectGame,
  onBack,
  userId,
  platform,
}) => {
  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';

  const games: { id: SelectedGame; title: string; sub: string; img: string; accuracy: string }[] = [
    {
      id: 'apple',
      title: 'تفاحة الحظ',
      sub: 'Apple of Fortune',
      img: appleLogo,
      accuracy: '٩٨٪',
    },
    {
      id: 'crash',
      title: 'الطائرة',
      sub: 'Crash Predictor',
      img: crashLogo,
      accuracy: '٩٦٪',
    },
  ];

  return (
    <AnimatePresence>
      <MotionDiv
        dir="rtl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-5 backdrop-blur-xl font-sans text-white"
      >
        <MotionDiv
          initial={{ scale: 0.94, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 240 }}
          className="relative w-full max-w-[380px] overflow-hidden rounded-[30px] border border-white/[0.09] bg-gradient-to-b from-[rgba(125,249,255,0.09)] via-black/90 to-black p-6 shadow-[0_40px_100px_-30px_rgba(125,249,255,0.35)]"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[rgba(125,249,255,0.20)] blur-[80px]" />

          <button
            onClick={onBack}
            aria-label="إغلاق"
            className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:text-white active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>

          {/* header */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 rounded-full border border-[rgba(125,249,255,0.25)] bg-[rgba(125,249,255,0.07)] px-3 py-1">
              <Snowflake className="h-3 w-3 text-[#7DF9FF]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7DF9FF]">
                {platformName} VIP
              </span>
            </div>
            <h2 className="mt-3 text-[22px] font-black leading-tight">اختر اللعبة</h2>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
              ID: {userId || '----------'}
            </p>
          </div>

          {/* games */}
          <div className="relative mt-6 flex flex-col gap-3.5">
            {games.map((g, idx) => (
              <MotionDiv
                key={g.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectGame(g.id)}
                className="group flex cursor-pointer items-center gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[rgba(125,249,255,0.5)] hover:bg-[rgba(125,249,255,0.06)]"
              >
                <div className="relative h-16 w-16 shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-[rgba(125,249,255,0.14)] blur-lg" />
                  <img
                    src={g.img}
                    alt={g.title}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="relative h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(125,249,255,0.5)] transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[17px] font-black tracking-tight">{g.title}</h3>
                  <p className="mt-0.5 text-[10px] font-black uppercase tracking-widest text-white/30">{g.sub}</p>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">دقة</span>
                    <span className="text-[12px] font-black text-[#7DF9FF]">{g.accuracy}</span>
                  </div>
                </div>
                <ChevronLeft className="h-5 w-5 shrink-0 text-white/20 transition-all group-hover:-translate-x-1 group-hover:text-[#7DF9FF]" />
              </MotionDiv>
            ))}
          </div>

          <p className="relative mt-6 text-center text-[10px] font-medium text-white/25">
            التوقعات مرتبطة بسيرفر {platformName} المباشر
          </p>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  );
};

export default GameSelection;
