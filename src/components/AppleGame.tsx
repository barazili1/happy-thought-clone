import React, { useState, useEffect, useRef } from 'react';
import { Grid, MULTIPLIERS } from './Grid';
import { playSound } from '../services/audio';
import { GameState, PredictionResult, AccessKey, Language, Platform } from '../types';
import { ArrowLeft, Zap, RotateCcw, Send, Users, Snowflake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import appleLogo from '../assets/logo-apple.png';

const MotionDiv = motion.div as any;

interface AppleGameProps {
  onBack: () => void;
  accessKeyData: AccessKey | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  platform: Platform;
  userId?: string;
}

const ADMIN_ID = '1729018123';
const APPLE_FEED = 'https://evoioi-default-rtdb.europe-west1.firebasedatabase.app/m11.json';

// bad apples per row (rows 0..9 => m1..m50)
const BAD_PER_ROW = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

function boardFromServer(data: any): PredictionResult | null {
  if (!data || typeof data !== 'object') return null;
  const gridData: boolean[][] = [];
  const path: number[] = [];

  for (let r = 0; r < 10; r++) {
    const cells: boolean[] = [];
    for (let c = 0; c < 5; c++) {
      const key = `m${r * 5 + c + 1}`;
      const node = data[key];
      const raw = node && typeof node === 'object' ? node[key] : node;
      if (raw === undefined || raw === null) return null;
      cells.push(String(raw).trim() === '0'); // 0 = سليمة
    }
    const good = cells.map((v, i) => (v ? i : -1)).filter((i) => i !== -1);
    if (!good.length) return null;
    path.push(good[Math.floor(Math.random() * good.length)]);
    gridData.push(cells);
  }

  return {
    id: `pred-fb-${Date.now()}`,
    path,
    gridData,
    confidence: 99.4,
    analysis: 'Server board',
    timestamp: Date.now(),
  };
}

function buildServerPayload() {
  const payload: Record<string, Record<string, string>> = {};
  for (let r = 0; r < 10; r++) {
    const cols = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);
    const bad = new Set(cols.slice(0, BAD_PER_ROW[r]));
    for (let c = 0; c < 5; c++) {
      const key = `m${r * 5 + c + 1}`;
      payload[key] = { [key]: bad.has(c) ? '1' : '0' };
    }
  }
  return payload;
}


export const AppleGame: React.FC<AppleGameProps> = ({ onBack, language, userId }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [predictionProgress, setPredictionProgress] = useState(0);
  const [activeOddIndex, setActiveOddIndex] = useState(0);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const [onlineUsersCount, setOnlineUsersCount] = useState(
    () => Math.floor(Math.random() * (1000 - 50 + 1)) + 50
  );
  const oddsBarRef = useRef<HTMLDivElement>(null);
  const isRtl = language === 'ar';
  const isAdmin = (userId || '').trim() === ADMIN_ID;

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsersCount((prev) =>
        Math.min(1000, Math.max(50, prev + (Math.floor(Math.random() * 7) - 3)))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (oddsBarRef.current && activeOddIndex >= 0) {
      const child = oddsBarRef.current.children[activeOddIndex] as HTMLElement;
      if (child) child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeOddIndex]);

  const buildBoard = async (): Promise<PredictionResult> => {
    if (isAdmin) {
      try {
        const res = await fetch(`${APPLE_FEED}?t=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();
        const serverPath = parseServerPath(data);
        if (serverPath) return buildBoardFromPath(serverPath);
      } catch (err) {
        console.error('Apple prediction fetch error:', err);
      }
    }
    return generatePredictionBoard();
  };

  const handlePredict = async () => {
    if (gameState === GameState.ANALYZING) return;

    setGameState(GameState.ANALYZING);
    setPredictionProgress(0);
    playSound('predict');

    for (let p = 15; p <= 100; p += 20) {
      setPredictionProgress(Math.min(100, p));
      await new Promise((r) => setTimeout(r, 70));
    }

    if (!currentResult) {
      setCurrentResult(await buildBoard());
      setActiveOddIndex(0);
    } else if (activeOddIndex < 9) {
      setActiveOddIndex((prev) => prev + 1);
    } else {
      setCurrentResult(await buildBoard());
      setActiveOddIndex(0);
    }


    playSound('success');
    setGameState(GameState.PREDICTED);
  };

  const handleNewGame = () => {
    playSound('click');
    setGameState(GameState.IDLE);
    setCurrentResult(null);
    setActiveOddIndex(0);
  };

  const isAnalyzing = gameState === GameState.ANALYZING;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative flex min-h-full select-none flex-col font-sans text-white"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(125,249,255,0.08)] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col px-6 pt-7 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label={language === 'ar' ? 'رجوع' : 'Back'}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all hover:border-[rgba(125,249,255,0.4)] hover:text-[#7DF9FF] active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
              <Users className="h-3 w-3 text-[#7DF9FF]" />
              <span className="font-mono text-[11px] font-black tabular-nums text-white/70">
                {onlineUsersCount}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-[rgba(125,249,255,0.25)] bg-[rgba(125,249,255,0.07)] px-3 py-1.5">
              <Snowflake className="h-3 w-3 animate-pulse text-[#7DF9FF]" />
              <span className="text-[10px] font-black tracking-widest text-[#7DF9FF]">
                {language === 'ar' ? 'نشط' : 'LIVE'}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mt-7 flex items-center gap-4 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-md">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[rgba(125,249,255,0.3)] bg-black">
            <div className="absolute inset-0 rounded-2xl bg-[rgba(125,249,255,0.12)] blur-lg" />
            <img
              src={appleLogo}
              alt={language === 'ar' ? 'تفاحة الحظ' : 'Apple'}
              loading="lazy"
              width={512}
              height={512}
              className="relative h-11 w-11 object-contain drop-shadow-[0_0_16px_rgba(125,249,255,0.6)]"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-[22px] font-black leading-tight tracking-tight">
              {language === 'ar' ? 'توقع التفاحة' : 'Apple Predictor'}
            </h1>
            <p className="mt-1 text-[11px] font-medium leading-relaxed text-white/40">
              {language === 'ar'
                ? 'اكتشف التفاحة السليمة بدقة ٩٩٪ لكل مستوى'
                : 'Find the safe apple with 99% accuracy per level'}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[rgba(125,249,255,0.25)] bg-[rgba(125,249,255,0.07)] px-2 py-0.5">
              <span className="font-mono text-[10px] font-black text-[#7DF9FF]">
                {language === 'ar' ? `المستوى ${activeOddIndex + 1}/10` : `LVL ${activeOddIndex + 1}/10`}
              </span>
            </div>
          </div>
        </div>

        {/* Odds strip */}
        <div className="mt-6">
          <div
            ref={oddsBarRef}
            className="no-scrollbar pointer-events-none flex items-center gap-2 overflow-x-auto scroll-smooth py-1"
          >
            {MULTIPLIERS.map((item, i) => {
              const isActive = activeOddIndex === i;
              return (
                <div
                  key={item.value}
                  className={`shrink-0 rounded-xl border px-3.5 py-1.5 text-[11px] font-black transition-all duration-300 ${
                    isActive
                      ? 'border-[rgba(125,249,255,0.6)] bg-[rgba(125,249,255,0.10)] text-[#7DF9FF] shadow-[0_0_22px_-6px_rgba(125,249,255,0.8)]'
                      : 'border-white/[0.07] bg-white/[0.02] text-white/35'
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Board */}
        <div className="relative mt-5 overflow-hidden rounded-[24px] border border-dashed border-[rgba(125,249,255,0.28)] bg-[#02060a] p-5">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[rgba(125,249,255,0.16)] blur-[80px]" />

          <Grid
            path={currentResult?.path || []}
            isAnalyzing={isAnalyzing}
            predictionId={currentResult?.id}
            gridData={currentResult?.gridData}
            activeOddIndex={activeOddIndex}
            language={language}
          />

          <AnimatePresence>
            {isAnalyzing && (
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[24px] bg-black/90 backdrop-blur-xl"
              >
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-[rgba(125,249,255,0.18)] border-t-[#7DF9FF]"
                  />
                  <span className="font-mono text-lg font-black tabular-nums">
                    {Math.round(predictionProgress)}%
                  </span>
                </div>
                <span className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#7DF9FF]">
                  {language === 'ar' ? 'مزامنة السيرفر' : 'Syncing server'}
                </span>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePredict}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 rounded-[20px] bg-gradient-to-l from-[#7DF9FF] to-white py-4 text-[13px] font-black uppercase tracking-wider text-black shadow-[0_16px_40px_-16px_rgba(125,249,255,0.8)] transition-all active:scale-[0.97] disabled:opacity-50"
            >
              <Zap className="h-4 w-4 fill-black" />
              <span>
                {!currentResult
                  ? language === 'ar'
                    ? 'بدء التحليل'
                    : 'Start'
                  : activeOddIndex < 9
                    ? language === 'ar'
                      ? 'المستوى التالي'
                      : 'Next'
                    : language === 'ar'
                      ? 'إعادة'
                      : 'Restart'}
              </span>
            </button>

            <button
              onClick={handleNewGame}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 rounded-[20px] border border-[rgba(125,249,255,0.3)] bg-white/[0.03] py-4 text-[13px] font-black uppercase tracking-wider text-[#7DF9FF] transition-all active:scale-[0.97] disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{language === 'ar' ? 'تصفير' : 'Reset'}</span>
            </button>
          </div>

          <a
            href="https://t.me/theeagelss1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-[20px] border border-white/[0.08] bg-white/[0.02] py-4 text-[12px] font-black uppercase tracking-wider text-white/60 transition-all hover:border-white/20 hover:text-white active:scale-[0.98]"
          >
            <Send className="h-4 w-4" />
            <span>{language === 'ar' ? 'قناة التلجرام' : 'Telegram channel'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppleGame;
