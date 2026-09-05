
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Platform } from '../types';
import { Check, ChevronLeft, Shield, Users, Activity, Zap, Lock } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import WinnersDashboard from './WinnersDashboard';

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
    },
    {
      id: 'linebet_v1' as Platform,
      name: 'Greenbet',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10',
      tagline: 'دقة عالية · تغطية عالمية',
      accuracy: '٩٨٪',
      latency: '14ms',
      geo: 'عالمي',
    },
  ];

  const selectedNode = platforms.find(p => p.id === selected) || platforms[0];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', '#0d9488');
    root.style.setProperty('--primary-color-rgb', '13, 148, 136');
    root.style.setProperty('--primary-glow', 'rgba(13, 148, 136, 0.35)');
  }, [selected]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
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
    <div dir="rtl" className="relative flex flex-col min-h-full font-sans overflow-x-hidden max-w-full">
      {/* Soft brand backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-[rgba(57,255,20,0.15)] blur-3xl" />
        <div className="absolute top-40 left-0 w-64 h-64 rounded-full bg-[#39FF14]/10 blur-3xl" />
      </div>


      {/* Hero */}
      <header className="relative z-10 px-6 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black border border-[rgba(57,255,20,0.30)] shadow-[0_6px_18px_rgba(13,148,136,0.12)]">
            <Users className="w-3.5 h-3.5 text-[#39FF14]" />
            <span className="text-[10px] font-black text-white/50">المتصلين</span>
            <span className="text-xs font-mono font-black tabular-nums text-[#39FF14]">
              {onlineUsers.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#39FF14] text-white shadow-[0_6px_18px_rgba(13,148,136,0.35)]">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span className="text-[10px] font-black tracking-wider">مباشر</span>
          </div>
        </div>

        <h1 className="mt-6 text-[26px] leading-tight font-black text-white">
          اختر منصة اللعب
        </h1>
        <p className="mt-1.5 text-[13px] font-semibold text-white/50">
          كل منصة لها محرك تحليل مستقل — اختر واحدة للبدء.
        </p>
      </header>

      {/* Platform cards */}
      <main className="relative z-10 px-6">
        <div className="flex flex-col gap-4">
          {platforms.map((p, idx) => {
            const active = selected === p.id;
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => handlePlatformSelect(p.id)}
                disabled={isConnecting}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full text-right rounded-3xl p-4 border-2 transition-all duration-300 ${
                  active
                    ? 'bg-black border-[#39FF14] shadow-[0_16px_36px_rgba(13,148,136,0.22)]'
                    : 'bg-black/70 border-zinc-200 shadow-[0_6px_18px_rgba(15,23,42,0.06)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`relative w-[70px] h-[70px] shrink-0 rounded-2xl overflow-hidden border-2 ${
                      active ? 'border-[#39FF14]' : 'border-zinc-200'
                    }`}
                  >
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-xl font-black ${active ? 'text-white' : 'text-white/70'}`}>
                        {p.name}
                      </h3>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[rgba(57,255,20,0.10)] text-[#39FF14] border border-[rgba(57,255,20,0.30)]">
                        {p.latency}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-white/50 truncate">{p.tagline}</p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#39FF14] bg-[rgba(57,255,20,0.10)] border border-[rgba(57,255,20,0.30)] rounded-lg px-2 py-1">
                        <Activity className="w-3 h-3" /> دقة {p.accuracy}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-white/70 bg-white/10 border border-zinc-200 rounded-lg px-2 py-1">
                        <Zap className="w-3 h-3 text-[#39FF14]" /> {p.geo}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center ${
                      active ? 'bg-[#39FF14] border-[#39FF14]' : 'bg-black border-white/10'
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-white stroke-[4]" />}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Summary + CTA */}
        <div className="mt-6 rounded-3xl bg-black border border-zinc-200 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">المنصة المختارة</p>
              <p className="text-sm font-black text-white">{selectedNode.name}</p>
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">الحالة</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="text-sm font-black text-[#39FF14]">جاهز</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceed}
            disabled={isConnecting}
            className="mt-4 w-full h-14 rounded-2xl bg-[#39FF14] text-white font-black text-base flex items-center justify-center gap-3 shadow-[0_12px_28px_rgba(13,148,136,0.35)] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            <span>{isConnecting ? 'جاري الاتصال...' : 'متابعة'}</span>
            {!isConnecting && <ChevronLeft className="w-5 h-5" />}
          </button>

          <div className="mt-3 flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5 text-white/50">
              <Shield className="w-3.5 h-3.5 text-[#39FF14]" />
              <span className="text-[10px] font-bold">اتصال آمن</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50">
              <Lock className="w-3.5 h-3.5 text-[#39FF14]" />
              <span className="text-[10px] font-bold">بيانات مشفّرة</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 pt-6 pb-10">
        <WinnersDashboard />
      </footer>
    </div>
  );
};

export default PlatformSelection;
