import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Platform } from '../types';
import { Check, ChevronLeft, Snowflake, Users, Lock, Signal } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import dragonLogo from '../assets/dragon-logo.png';

const MotionDiv = motion.div as any;

interface PlatformSelectionProps {
  onSelect: (platform: Platform) => void;
  t: any;
}

const PlatformSelection: React.FC<PlatformSelectionProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<Platform>('linebet_v2');
  const [isConnecting, setIsConnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * (2500 - 1800) + 1800));

  const platforms = [
    {
      id: 'linebet_v2' as Platform,
      name: 'Winwin',
      mono: 'W',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10',
      tagline: 'استقرار ممتاز · تغطية إقليمية',
      accuracy: '٩٦٪',
      latency: '18ms',
    },
    {
      id: 'linebet_v1' as Platform,
      name: 'Greenbet',
      mono: 'G',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10',
      tagline: 'دقة عالية · تغطية عالمية',
      accuracy: '٩٨٪',
      latency: '14ms',
    },
  ];

  const selectedNode = platforms.find((p) => p.id === selected) || platforms[0]!;

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => Math.max(1500, Math.min(3000, prev + (Math.floor(Math.random() * 11) - 5))));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isConnecting) return;
    const finishTimer = setTimeout(() => onSelect(selected), 900);
    return () => clearTimeout(finishTimer);
  }, [isConnecting, onSelect, selected]);

  return (
    <div dir="rtl" className="relative flex min-h-full flex-col overflow-x-hidden font-sans text-white">
      {/* aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-[rgba(125,249,255,0.09)] blur-[130px]" />
        <div className="absolute bottom-10 right-[-20%] h-72 w-72 rounded-full bg-[rgba(125,249,255,0.05)] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md px-6 pt-10 pb-12">
        {/* Masthead */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 backdrop-blur-md">
            <Users className="h-3.5 w-3.5 text-[#7DF9FF]" />
            <span className="font-mono text-[11px] font-black tabular-nums text-[#7DF9FF]">
              {onlineUsers.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[rgba(125,249,255,0.25)] bg-[rgba(125,249,255,0.07)] px-3 py-1.5">
            <Signal className="h-3 w-3 animate-pulse text-[#7DF9FF]" />
            <span className="text-[10px] font-black tracking-widest text-[#7DF9FF]">مباشر</span>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-9 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[rgba(125,249,255,0.20)] blur-2xl" />
            <img
              src={dragonLogo}
              alt="DRAGON VIP"
              className="relative h-24 w-24 object-contain drop-shadow-[0_0_24px_rgba(125,249,255,0.5)]"
            />
          </div>
          <span className="mt-4 text-[10px] font-black uppercase tracking-[0.45em] text-white/30">Dragon VIP</span>
          <h1 className="mt-2 text-[30px] font-black leading-tight tracking-tight">
            اختر <span className="text-[#7DF9FF]">منصتك</span>
          </h1>
          <p className="mt-2 max-w-[270px] text-[12px] font-medium leading-relaxed text-white/40">
            لكل منصة محرك تحليل مستقل. اختر واحدة وابدأ استخراج التوقعات.
          </p>
          <span className="mt-6 h-[1px] w-16 bg-gradient-to-l from-transparent via-[rgba(125,249,255,0.5)] to-transparent" />
        </div>

        {/* Platform cards */}
        <div className="mt-8 flex flex-col gap-4">
          {platforms.map((p, idx) => {
            const active = selected === p.id;
            return (
              <MotionDiv
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  if (!isConnecting) {
                    audioManager.playClick();
                    setSelected(p.id);
                  }
                }}
                className={`group relative cursor-pointer overflow-hidden rounded-[28px] border p-5 backdrop-blur-xl transition-all duration-400 ${
                  active
                    ? 'border-[rgba(125,249,255,0.55)] bg-gradient-to-b from-[rgba(125,249,255,0.10)] to-black/70 shadow-[0_20px_50px_-20px_rgba(125,249,255,0.5)]'
                    : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20'
                }`}
              >
                {/* glass sheen */}
                <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-[130%] -translate-x-1/2 rounded-full bg-white/[0.04] blur-2xl" />

                <div className="relative flex items-center gap-4">
                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border transition-colors ${
                      active ? 'border-[rgba(125,249,255,0.5)]' : 'border-white/10'
                    }`}
                  >
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className={`text-[19px] font-black tracking-tight ${active ? 'text-white' : 'text-white/70'}`}>
                      {p.name}
                    </h3>
                    <p className="mt-0.5 truncate text-[11px] font-medium text-white/35">{p.tagline}</p>
                  </div>

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                      active ? 'border-[#7DF9FF] bg-[#7DF9FF]' : 'border-white/15'
                    }`}
                  >
                    {active && <Check className="h-4 w-4 stroke-[3.5] text-black" />}
                  </div>
                </div>

                <div className="relative mt-4 flex items-center gap-5 border-t border-white/[0.06] pt-3.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">دقة</span>
                    <span className="text-[13px] font-black text-[#7DF9FF]">{p.accuracy}</span>
                  </div>
                  <span className="h-3 w-[1px] bg-white/10" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">استجابة</span>
                    <span className="font-mono text-[13px] font-black text-white/70">{p.latency}</span>
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">المحددة</span>
            <span className="text-[12px] font-black text-white">{selectedNode.name}</span>
          </div>
          <button
            onClick={() => {
              audioManager.playClick();
              setIsConnecting(true);
            }}
            disabled={isConnecting}
            className="flex h-15 w-full items-center justify-center gap-3 rounded-[22px] bg-gradient-to-l from-[#7DF9FF] to-white py-4 text-[15px] font-black text-black shadow-[0_16px_40px_-14px_rgba(125,249,255,0.75)] transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <span>{isConnecting ? 'جاري الاتصال...' : 'متابعة'}</span>
            {!isConnecting && <ChevronLeft className="h-5 w-5" />}
          </button>

          <div className="mt-5 flex items-center justify-center gap-6 text-white/25">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3 w-3" />
              <span className="text-[10px] font-bold">بيانات مشفّرة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Snowflake className="h-3 w-3" />
              <span className="text-[10px] font-bold">اتصال آمن</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSelection;
