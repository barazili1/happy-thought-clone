import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Platform } from '../types';
import { Check, ChevronLeft, Snowflake, Users, Activity, Radio, Lock, Gauge, Globe2 } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import WinnersDashboard from './WinnersDashboard';
import dragonLogo from '../assets/dragon-logo.png';

const MotionDiv = motion.div as any;

interface PlatformSelectionProps {
  onSelect: (platform: Platform) => void;
  t: any;
}

const PlatformSelection: React.FC<PlatformSelectionProps> = ({ onSelect, t }) => {
  const [selected, setSelected] = useState<Platform>('linebet_v2');
  const [isConnecting, setIsConnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * (2500 - 1800) + 1800));

  const platforms = [
    {
      id: 'linebet_v2' as Platform,
      name: 'Winwin',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10',
      tagline: 'استقرار ممتاز · تغطية إقليمية',
      accuracy: '٩٦٪',
      latency: '18ms',
      geo: 'إقليمي',
      load: 72,
    },
    {
      id: 'linebet_v1' as Platform,
      name: 'Greenbet',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10',
      tagline: 'دقة عالية · تغطية عالمية',
      accuracy: '٩٨٪',
      latency: '14ms',
      geo: 'عالمي',
      load: 88,
    },
  ];

  const selectedNode = platforms.find((p) => p.id === selected) || platforms[0]!;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', '#7DF9FF');
    root.style.setProperty('--primary-color-rgb', '125, 249, 255');
    root.style.setProperty('--primary-glow', 'rgba(125, 249, 255, 0.35)');
  }, [selected]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const next = prev + (Math.floor(Math.random() * 11) - 5);
        return Math.max(1500, Math.min(3000, next));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isConnecting) return;
    const finishTimer = setTimeout(() => onSelect(selected), 900);
    return () => clearTimeout(finishTimer);
  }, [isConnecting, onSelect, selected]);

  const handleProceed = () => {
    audioManager.playClick();
    setIsConnecting(true);
  };

  const handlePlatformSelect = (id: Platform) => {
    if (!isConnecting) {
      audioManager.playClick();
      setSelected(id);
    }
  };

  return (
    <div dir="rtl" className="relative flex flex-col min-h-full font-sans text-white overflow-x-hidden">
      {/* Frost backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[rgba(125,249,255,0.10)] blur-[110px]" />
        <div className="absolute bottom-0 right-[-15%] w-72 h-72 rounded-full bg-[rgba(125,249,255,0.06)] blur-[90px]" />
      </div>

      {/* Ice hero */}
      <header className="relative z-10 px-5 pt-7 pb-5">
        <div className="relative overflow-hidden rounded-[28px] border border-[rgba(125,249,255,0.22)] bg-gradient-to-b from-[rgba(125,249,255,0.08)] via-black/70 to-black p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(125,249,255,0.10)]">
          <div className="absolute -top-16 -left-10 w-48 h-48 rounded-full bg-[rgba(125,249,255,0.14)] blur-3xl" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-2 rounded-full border border-[rgba(125,249,255,0.28)] bg-black/70 px-3 py-1.5">
              <Users className="w-3.5 h-3.5 text-[#7DF9FF]" />
              <span className="text-[10px] font-black text-white/50">المتصلين</span>
              <span className="text-xs font-mono font-black tabular-nums text-[#7DF9FF]">
                {onlineUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#7DF9FF] px-3 py-1.5 text-black">
              <Radio className="w-3 h-3" />
              <span className="text-[10px] font-black tracking-wider">مباشر</span>
            </div>
          </div>

          <div className="relative mt-5 flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-[rgba(125,249,255,0.18)] blur-xl" />
              <img src={dragonLogo} alt="DRAGON VIP" className="relative w-16 h-16 object-contain drop-shadow-[0_0_16px_rgba(125,249,255,0.55)]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[24px] leading-tight font-black tracking-tight">
                اختر <span className="text-[#7DF9FF]">منصة</span> اللعب
              </h1>
              <p className="mt-1 text-[12px] font-semibold text-white/45">
                كل منصة لها محرك تحليل مستقل — اختر واحدة للبدء.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Ice slab platform cards */}
      <main className="relative z-10 px-5">
        <div className="mb-3 flex items-center gap-2">
          <Snowflake className="w-3.5 h-3.5 text-[#7DF9FF]" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Servers</span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[rgba(125,249,255,0.25)] to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {platforms.map((p, idx) => {
            const active = selected === p.id;
            return (
              <MotionDiv
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handlePlatformSelect(p.id)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border p-4 transition-all duration-300 ${
                  active
                    ? 'border-[#7DF9FF] bg-gradient-to-br from-[rgba(125,249,255,0.12)] to-black shadow-[0_0_30px_rgba(125,249,255,0.22)]'
                    : 'border-white/10 bg-black/60 hover:border-[rgba(125,249,255,0.35)]'
                }`}
              >
                {active && (
                  <div className="absolute top-0 right-0 h-full w-[3px] bg-gradient-to-b from-[#7DF9FF] to-transparent" />
                )}

                <div className="flex items-center gap-3.5">
                  <div
                    className={`relative h-[62px] w-[62px] shrink-0 overflow-hidden rounded-2xl border bg-black ${
                      active ? 'border-[#7DF9FF]' : 'border-white/10'
                    }`}
                  >
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-lg font-black ${active ? 'text-white' : 'text-white/75'}`}>{p.name}</h3>
                      <span className="rounded-md border border-[rgba(125,249,255,0.28)] bg-[rgba(125,249,255,0.10)] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#7DF9FF]">
                        {p.latency}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] font-bold text-white/40">{p.tagline}</p>

                    {/* load meter */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[9px] font-black text-white/35">
                        <span>قوة السيرفر</span>
                        <span className="text-[#7DF9FF]">{p.load}%</span>
                      </div>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-l from-[#7DF9FF] to-white/70"
                          style={{ width: `${p.load}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      active ? 'border-[#7DF9FF] bg-[#7DF9FF]' : 'border-white/15 bg-black'
                    }`}
                  >
                    {active && <Check className="h-4 w-4 stroke-[4] text-black" />}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Activity className="h-3 w-3 text-[#7DF9FF]" />
                    <span className="text-[10px] font-black text-white/60">دقة {p.accuracy}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe2 className="h-3 w-3 text-[#7DF9FF]" />
                    <span className="text-[10px] font-black text-white/60">{p.geo}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3 w-3 text-[#7DF9FF]" />
                    <span className="text-[10px] font-black text-white/60">فوري</span>
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </div>

        {/* Summary + CTA */}
        <div className="mt-5 overflow-hidden rounded-3xl border border-[rgba(125,249,255,0.18)] bg-black/70 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/35">المنصة المختارة</p>
              <p className="text-sm font-black text-white">{selectedNode.name}</p>
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/35">الحالة</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7DF9FF]" />
                <span className="text-sm font-black text-[#7DF9FF]">جاهز</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceed}
            disabled={isConnecting}
            className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#7DF9FF] to-white text-base font-black text-black shadow-[0_10px_30px_rgba(125,249,255,0.30)] transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <span>{isConnecting ? 'جاري الاتصال...' : 'متابعة'}</span>
            {!isConnecting && <ChevronLeft className="h-5 w-5" />}
          </button>

          <div className="mt-3 flex items-center justify-center gap-6 text-white/35">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-[#7DF9FF]" />
              <span className="text-[10px] font-bold">بيانات مشفّرة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Snowflake className="h-3 w-3 text-[#7DF9FF]" />
              <span className="text-[10px] font-bold">اتصال آمن</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pb-10">
          <WinnersDashboard />
        </div>
      </main>
    </div>
  );
};

export default PlatformSelection;
