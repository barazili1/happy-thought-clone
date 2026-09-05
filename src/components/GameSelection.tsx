import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, ShieldCheck, UserCheck } from 'lucide-react';
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
  t,
}) => {
  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-zinc-900 selection:bg-teal-500/30" dir="rtl">
      <div className="relative z-10 flex flex-col px-4 pt-4 pb-12 max-w-md mx-auto w-full">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-300 flex items-center justify-center hover:border-teal-500/40 hover:text-teal-600 transition-all active:scale-95 shadow-lg"
            title="رجوع"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-500/40 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_var(--primary-color)]" />
            <span className="text-[10px] font-black tracking-widest uppercase text-teal-600">
              {platformName} Server VIP
            </span>
          </div>
        </div>

        {/* User Info Bar */}
        {userId && (
          <div className="mb-6 p-3 bg-white/95 backdrop-blur-xl border border-zinc-300 rounded-2xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-500/40 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-teal-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-zinc-600 font-black uppercase tracking-wider">الحساب المفعّل</span>
                <span className="text-xs font-mono font-bold text-zinc-900 tracking-wider">ID: {userId}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-500/40">
              <ShieldCheck className="w-3 h-3" />
              <span>مضمون 100%</span>
            </div>
          </div>
        )}

        {/* Main Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-300 mb-2">
            <Gamepad2 className="w-3.5 h-3.5 text-teal-600 animate-bounce" />
            <span className="text-[10px] font-bold text-zinc-600">اختر السيرفر المباشر</span>
          </div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-wide">
            اختر اللعبة للتوقع
          </h1>
          <p className="text-xs text-zinc-600 mt-1">
            حدّد اللعبة المراد استخراج خوارزمية التوقعات الخاصة بها
          </p>
        </div>

        {/* Game Cards */}
        <div className="flex flex-col gap-4">
          {/* Apple of Fortune Option */}
          <MotionDiv
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame('apple')}
            className="group relative bg-white/95 backdrop-blur-xl border border-zinc-300 hover:border-teal-500/80 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-teal-50 blur-2xl rounded-full group-hover:bg-teal-50 transition-all" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-100 border border-teal-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform overflow-hidden">
                  <img src={appleLogo} alt="Apple of Fortune" loading="lazy" width={512} height={512} className="w-10 h-10 object-contain drop-shadow-[0_0_8px_var(--primary-glow)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-black text-zinc-900 group-hover:text-teal-600 transition-colors">
                      Apple of Fortune
                    </h2>
                    <span className="text-[9px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full border border-teal-500/40">
                      تفاحة الحظ
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    توقعات أماكن التفاح السليم وتجنب التفاح الفاسد
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Crash Game Option */}
          <MotionDiv
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame('crash')}
            className="group relative bg-white/95 backdrop-blur-xl border border-zinc-300 hover:border-teal-500/80 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-teal-50 blur-2xl rounded-full group-hover:bg-teal-50 transition-all" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-100 border border-teal-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform overflow-hidden">
                  <img src={crashLogo} alt="Crash" loading="lazy" width={512} height={512} className="w-10 h-10 object-contain drop-shadow-[0_0_8px_var(--primary-glow)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-black text-zinc-900 group-hover:text-teal-600 transition-colors">
                      Crash
                    </h2>
                    <span className="text-[9px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full border border-teal-500/40">
                      لعبة الطائرة
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    توقع معامل هبوط وسقوط الطائرة بدقة عالية
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Mines Game Option */}
          <MotionDiv
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame('mines')}
            className="group relative bg-white/95 backdrop-blur-xl border border-zinc-300 hover:border-teal-500/80 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-teal-50 blur-2xl rounded-full group-hover:bg-teal-50 transition-all" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-100 border border-teal-500/40 flex items-center justify-center shadow-[0_0_20px_var(--primary-glow)] group-hover:scale-110 transition-transform overflow-hidden">
                  <img src={diamondLogo} alt="Gams Mines" loading="lazy" width={512} height={512} className="w-9 h-9 object-contain drop-shadow-[0_0_8px_var(--primary-glow)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-black text-zinc-900 group-hover:text-teal-600 transition-colors">
                      Gams Mines
                    </h2>
                    <span className="text-[9px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full border border-teal-500/40">
                      لعبة الألماس
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    توقع أماكن الألماس داخل شبكة 25 خانة
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            متصل بالسيرفر الرئيسي لـ {platformName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;
