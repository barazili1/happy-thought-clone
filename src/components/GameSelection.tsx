import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, UserCheck, Snowflake, ChevronLeft, Signal } from 'lucide-react';
import { SelectedGame, Platform } from '../types';
import appleLogo from '../assets/game-apple.png';
import crashLogo from '../assets/game-crash.png';
import diamondLogo from '../assets/diamond.png';

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

  const games: { id: SelectedGame; title: string; badge: string; desc: string; img: string; accuracy: string }[] = [
    {
      id: 'apple',
      title: 'Apple of Fortune',
      badge: 'تفاحة الحظ',
      desc: 'توقعات أماكن التفاح السليم وتجنب التفاح الفاسد',
      img: appleLogo,
      accuracy: '٩٨٪',
    },
    {
      id: 'crash',
      title: 'Crash',
      badge: 'لعبة الطائرة',
      desc: 'توقع معامل هبوط وسقوط الطائرة بدقة عالية',
      img: crashLogo,
      accuracy: '٩٦٪',
    },
    {
      id: 'mines',
      title: 'Gams Mines',
      badge: 'لعبة الألماس',
      desc: 'توقع أماكن الألماس داخل شبكة ٢٥ خانة',
      img: diamondLogo,
      accuracy: '٩٧٪',
    },
  ];

  return (
    <div dir="rtl" className="relative flex min-h-full flex-col font-sans text-white">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-[rgba(125,249,255,0.10)] blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md px-5 pt-6 pb-14">
        {/* Top bar */}
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md transition-all hover:border-[rgba(125,249,255,0.35)] hover:text-[#7DF9FF] active:scale-95"
            title="رجوع"
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-[rgba(125,249,255,0.28)] bg-[rgba(125,249,255,0.08)] px-3 py-1.5 backdrop-blur-sm">
            <Signal className="h-3 w-3 animate-pulse text-[#7DF9FF]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#7DF9FF]">
              {platformName} VIP
            </span>
          </div>
        </div>

        {/* Account slab */}
        {userId && (
          <div className="mb-6 overflow-hidden rounded-3xl border border-[rgba(125,249,255,0.18)] bg-gradient-to-b from-[rgba(125,249,255,0.08)] to-black/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(125,249,255,0.3)] bg-black">
                  <UserCheck className="h-4 w-4 text-[#7DF9FF]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-wider text-white/40">الحساب المفعّل</span>
                  <span className="font-mono text-xs font-bold tracking-wider text-white">ID: {userId}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-[rgba(125,249,255,0.28)] bg-black px-2.5 py-1 text-[9px] font-black text-[#7DF9FF]">
                <ShieldCheck className="h-3 w-3" />
                <span>مضمون ١٠٠٪</span>
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="mb-4 flex items-center gap-2">
          <Snowflake className="h-3.5 w-3.5 text-[#7DF9FF]" />
          <h1 className="text-lg font-black">اختر اللعبة للتوقع</h1>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[rgba(125,249,255,0.25)] to-transparent" />
        </div>

        {/* Game slabs */}
        <div className="flex flex-col gap-4">
          {games.map((g, idx) => (
            <MotionDiv
              key={g.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.35 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGame(g.id)}
              className="group relative cursor-pointer overflow-hidden rounded-[26px] border border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-300 hover:border-[#7DF9FF]/70 hover:shadow-[0_0_30px_rgba(125,249,255,0.16)]"
            >
              <span className="absolute left-4 top-3 font-mono text-[42px] font-black leading-none text-white/[0.05]">
                0{idx + 1}
              </span>

              <div className="relative flex items-center gap-4 p-4">
                <div className="relative flex h-[74px] w-[74px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(125,249,255,0.25)] bg-gradient-to-br from-[rgba(125,249,255,0.10)] to-black">
                  <img
                    src={g.img}
                    alt={g.title}
                    loading="lazy"
                    className="h-14 w-14 object-contain drop-shadow-[0_0_10px_rgba(125,249,255,0.5)] transition-transform group-hover:scale-110"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-black transition-colors group-hover:text-[#7DF9FF]">{g.title}</h2>
                    <span className="rounded-full border border-[rgba(125,249,255,0.28)] bg-[rgba(125,249,255,0.08)] px-2 py-0.5 text-[9px] font-black text-[#7DF9FF]">
                      {g.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/45">{g.desc}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-black text-white/60">دقة التوقع</span>
                    <span className="font-mono text-[11px] font-black text-[#7DF9FF]">{g.accuracy}</span>
                  </div>
                </div>

                <ChevronLeft className="h-5 w-5 shrink-0 text-white/25 transition-all group-hover:-translate-x-1 group-hover:text-[#7DF9FF]" />
              </div>

              <div className="h-[2px] w-0 bg-gradient-to-l from-[#7DF9FF] to-transparent transition-all duration-500 group-hover:w-full" />
            </MotionDiv>
          ))}
        </div>

        <p className="mt-7 text-center font-mono text-[10px] uppercase tracking-widest text-white/30">
          متصل بالسيرفر الرئيسي لـ {platformName}
        </p>
      </div>
    </div>
  );
};

export default GameSelection;
