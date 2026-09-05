import React, { useState, useEffect, useRef } from 'react';
import { Grid, MULTIPLIERS } from './Grid';
import { playSound } from '../services/audio';
import { GameState, PredictionResult, AccessKey, Language, Platform } from '../types';
import { translations } from '../translations';
import { 
    Zap,
    RotateCcw,
    Users,
    Send,
    ArrowLeft,
    Shield,
    Activity,
    Lock,
    ExternalLink,
    Sparkles,
    Gift,
    Trophy,
    Gamepad2,
    X,
    Copy,
    Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WinnersDashboard from './WinnersDashboard';

const MotionDiv = motion.div as any;

interface AppleGameProps {
  onBack: () => void;
  accessKeyData: AccessKey | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  platform: Platform;
}

function generatePredictionBoard(): PredictionResult {
  const path: number[] = [];
  const gridData: boolean[][] = [];

  for (let r = 0; r < 10; r++) {
    const { goodCount, badCount } = MULTIPLIERS[r];
    const rowCells: boolean[] = [
      ...Array(goodCount).fill(true),
      ...Array(badCount).fill(false)
    ];

    // Shuffle row cells
    for (let i = rowCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rowCells[i], rowCells[j]] = [rowCells[j], rowCells[i]];
    }

    // Find all good indices
    const goodIndices = rowCells
      .map((val, idx) => (val ? idx : -1))
      .filter((idx) => idx !== -1);

    // Randomly pick one good index as recommended choice for this row
    const recommendedCol = goodIndices[Math.floor(Math.random() * goodIndices.length)];
    path.push(recommendedCol);
    gridData.push(rowCells);
  }

  return {
    id: `pred-${Date.now()}-${Math.random()}`,
    path,
    gridData,
    confidence: 99.4,
    analysis: 'Optimal safe path computed',
    timestamp: Date.now(),
  };
}

export const AppleGame: React.FC<AppleGameProps> = ({ onBack, accessKeyData, language, onLanguageChange, platform }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [predictionProgress, setPredictionProgress] = useState(0); 
  const [activeOddIndex, setActiveOddIndex] = useState(0);
  const [showPromoDialog, setShowPromoDialog] = useState(true);
  const [promoCopied, setPromoCopied] = useState(false);
  const promoCode = platform === 'linebet_v1' ? 'B10' : 'B11';
  const t = (translations as any)[language];
  const isRtl = language === 'ar';
  const [onlineUsersCount, setOnlineUsersCount] = useState(() => Math.floor(Math.random() * (1000 - 50 + 1)) + 50);

  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const oddsBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        setOnlineUsersCount(prev => {
            const change = Math.floor(Math.random() * 7) - 3;
            return Math.min(1000, Math.max(50, prev + change));
        });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll the Odds Bar when activeOddIndex updates
  useEffect(() => {
    if (oddsBarRef.current && activeOddIndex >= 0) {
      const child = oddsBarRef.current.children[activeOddIndex] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeOddIndex]);

  const handlePredict = async () => {
    if (gameState === GameState.ANALYZING) return;
    
    setGameState(GameState.ANALYZING);
    setPredictionProgress(0);
    playSound('predict');

    // Quick analysis animation with progress simulation
    for (let p = 15; p <= 100; p += 20) {
      setPredictionProgress(Math.min(100, p));
      await new Promise(r => setTimeout(r, 70));
    }

    if (!currentResult) {
      // First click: generate prediction board and show Row 0 (x1.23)
      const res = generatePredictionBoard();
      setCurrentResult(res);
      setActiveOddIndex(0);
    } else if (activeOddIndex < 9) {
      // Subsequent clicks: move to next row (e.g. x1.54, x1.94, ...)
      setActiveOddIndex(prev => prev + 1);
    } else {
      // Reached top (349.68): start new round from Row 0 (x1.23)
      const res = generatePredictionBoard();
      setCurrentResult(res);
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
      playSound('success');
  };

  const isAnalyzing = gameState === GameState.ANALYZING;

  return (
    <div className={`flex flex-col min-h-full relative select-none bg-transparent overflow-hidden font-sans text-white ${isRtl ? 'font-ar' : 'font-en'}`}>
        <div className="flex-1 flex flex-col relative z-10 w-full max-w-2xl mx-auto h-full px-4 sm:px-6 py-6 sm:py-8">
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6 sm:mb-8"
            >
                <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(13,148,136,0.08)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-transparent border border-white/10 flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
                >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
                
                <div className="flex flex-col items-center">
                    <motion.div 
                        animate={{ boxShadow: ['0 0 10px rgba(var(--primary-color-rgb), 0.1)', '0 0 20px rgba(var(--primary-color-rgb), 0.3)', '0 0 10px rgba(var(--primary-color-rgb), 0.1)'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex items-center gap-2 px-3.5 py-1 bg-[rgba(57,255,20,0.10)] border border-[rgba(57,255,20,0.35)] rounded-full" 
                        style={{ backgroundColor: 'rgba(var(--primary-color-rgb), 0.1)', borderColor: 'rgba(var(--primary-color-rgb), 0.3)' } as any}
                    >
                        <div className="w-2 h-2 rounded-full bg-[rgba(57,255,20,0.10)]0 animate-pulse shadow-[0_0_10px_var(--primary-color)]" style={{ backgroundColor: 'var(--primary-color)' } as any} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#39FF14]" style={{ color: 'var(--primary-color)' } as any}>
                            {language === 'ar' ? 'النظام نشط' : 'System Active'}
                        </span>
                    </motion.div>
                </div>

                <motion.div 
                    whileHover={{ rotate: 15 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-transparent border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg"
                >
                    <Users className="w-5 h-5 text-white/50" />
                </motion.div>
            </motion.div>

            {/* Main Game Card */}
            <div className="flex-1 flex flex-col gap-6 sm:gap-8">
                {/* Title Section */}
                <div className="text-center space-y-1.5">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-3 py-1 rounded-lg bg-transparent border border-white/10 text-[9px] font-black text-[#39FF14] uppercase tracking-[0.3em] mb-1"
                    >
                        {language === 'ar' ? 'محرك التنبؤ العصبي' : 'Neural Prediction Engine'}
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl font-black tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(15,23,42,0.12)]"
                    >
                        {language === 'ar' ? 'توقع التفاحة' : 'Apple Predictor'}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs sm:text-sm text-white/50 font-medium tracking-wide"
                    >
                        {language === 'ar' ? 'اكتشف مكان التفاحة الرابحة بدقة 99%' : 'Discover the winning apple location with 99% accuracy'}
                    </motion.p>
                </div>

                {/* Odds Section: High-End Moving Horizontal Auto-Scroll Bar */}
                <div className="w-full bg-transparent border border-white/10 rounded-2xl p-2 relative overflow-hidden backdrop-blur-md">
                    <div 
                        ref={oddsBarRef}
                        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth pointer-events-none"
                    >
                        {MULTIPLIERS.map((item, i) => {
                            const isActive = activeOddIndex === i;
                            return (
                                <div 
                                    key={item.value}
                                    className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all duration-300 select-none ${
                                        isActive 
                                            ? 'bg-[rgba(57,255,20,0.10)] border-[#39FF14] text-[#39FF14] shadow-[0_8px_20px_rgba(13,148,136,0.25)] scale-105' 
                                            : 'bg-transparent border-white/10 text-white/50 opacity-60'
                                    }`}
                                    style={isActive ? { borderColor: 'var(--primary-color)', color: 'var(--primary-color)' } as any : {}}
                                >
                                    {item.label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Grid Container */}
                <div className="relative group">
                    <div className={`relative bg-transparent backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 sm:p-6 min-h-[300px] flex flex-col justify-center transition-all duration-700 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${isAnalyzing ? 'scale-[1.01] border-[rgba(57,255,20,0.35)]' : ''}`}>
                        
                        <Grid 
                            path={currentResult?.path || []} 
                            isAnalyzing={isAnalyzing} 
                            predictionId={currentResult?.id} 
                            gridData={currentResult?.gridData} 
                            activeOddIndex={activeOddIndex}
                            language={language} 
                        />
                        
                        {/* Analysis Progress Overlay */}
                        <AnimatePresence>
                            {isAnalyzing && (
                                <MotionDiv 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl rounded-[2rem]"
                                >
                                    <div className="w-full max-w-[200px] space-y-6">
                                        <div className="relative flex flex-col items-center">
                                            <motion.div 
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="w-20 h-20 border-2 border-[rgba(57,255,20,0.35)] border-t-green-500 rounded-full mb-4"
                                                style={{ borderTopColor: 'var(--primary-color)' } as any}
                                            />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-8px]">
                                                <span className="text-xl font-black tabular-nums text-white">{Math.round(predictionProgress)}%</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 text-center">
                                            <span className="text-[10px] font-black text-[#39FF14] uppercase tracking-[0.3em] animate-pulse" style={{ color: 'var(--primary-color)' } as any}>
                                                {language === 'ar' ? 'مزامنة السيرفر...' : 'Syncing Server...'}
                                            </span>
                                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-[rgba(57,255,20,0.10)]0 shadow-[0_0_15px_var(--primary-color)]"
                                                    style={{ backgroundColor: 'var(--primary-color)' } as any}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${predictionProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-auto pb-4">
                    {/* Row 1: Start Analysis (Green transparent) & Reset (White transparent) side-by-side */}
                    <div className="grid grid-cols-2 gap-3">
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePredict} 
                            disabled={isAnalyzing} 
                            style={{ 
                                borderColor: 'var(--primary-color)', 
                                color: 'var(--primary-color)', 
                                boxShadow: '0 0 20px var(--primary-glow)' 
                            }}
                            className="h-14 rounded-2xl bg-transparent border-2 font-black text-xs sm:text-sm uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-white/10 backdrop-blur-md"
                        >
                            <Zap className="w-5 h-5 fill-current" style={{ color: 'var(--primary-color)' }} />
                            <span>
                                {!currentResult 
                                    ? (language === 'ar' ? 'بدء التحليل' : 'Start Analysis')
                                    : activeOddIndex < 9 
                                    ? (language === 'ar' ? 'الصف التالي' : 'Next Level')
                                    : (language === 'ar' ? 'إعادة بدأ' : 'Restart')}
                            </span>
                        </motion.button>
                        
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleNewGame} 
                            disabled={isAnalyzing} 
                            className="h-14 rounded-2xl bg-transparent border border-white/10 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all disabled:opacity-50 shadow-[0_8px_20px_rgba(13,148,136,0.15)] flex items-center justify-center gap-2 hover:bg-white/10 backdrop-blur-md"
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span>{language === 'ar' ? 'تصفير' : 'Reset'}</span>
                        </motion.button>
                    </div>

                    {/* Row 2: Telegram Button taking full width (Transparent with Telegram blue border & text) */}
                    <motion.a 
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://t.me/+w3sTqpPkfwE0ZjM0" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full h-14 rounded-2xl bg-transparent border border-[#0088cc] text-[#0088cc] font-black text-xs sm:text-sm uppercase tracking-wider transition-all backdrop-blur-md flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(0,136,204,0.3)] hover:bg-[#0088cc]/15"
                    >
                        <Send className="w-5 h-5" />
                        <span>{language === 'ar' ? 'الانضمام لقناة تيليجرام' : 'Join Telegram Channel'}</span>
                    </motion.a>
                </div>

                {/* Live Winners Dashboard */}
                <div className="pb-6">
                    <WinnersDashboard />
                </div>

            </div>
        </div>

        {/* Promo Dialog */}
        <AnimatePresence>
            {showPromoDialog && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-zinc-900/35 backdrop-blur-md p-4 sm:p-6">
                    <MotionDiv 
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full max-w-[360px] bg-black border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.8)]" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--primary-color), transparent)' } as any} />
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[rgba(57,255,20,0.10)] blur-[70px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(var(--primary-color-rgb), 0.12)' } as any} />
                        
                        <button
                            onClick={() => {
                                playSound('click');
                                setShowPromoDialog(false);
                            }}
                            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/60 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all active:scale-90 z-20"
                            title={language === 'ar' ? 'إغلاق' : 'Close'}
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[rgba(57,255,20,0.10)] border border-[rgba(57,255,20,0.35)] rounded-full mb-4 mt-1" style={{ backgroundColor: 'rgba(var(--primary-color-rgb), 0.1)', borderColor: 'rgba(var(--primary-color-rgb), 0.25)' } as any}>
                            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(57,255,20,0.10)]0 animate-pulse shadow-[0_0_8px_var(--primary-color)]" style={{ backgroundColor: 'var(--primary-color)' } as any} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#39FF14]" style={{ color: 'var(--primary-color)' } as any}>
                                {language === 'ar' ? 'تنبيه الأرباح الحصري' : 'Exclusive Profit Alert'}
                            </span>
                        </div>

                        <div className="relative mb-4">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 3, -3, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-[rgba(57,255,20,0.35)] flex items-center justify-center shadow-[0_0_25px_rgba(var(--primary-color-rgb),0.25)] relative z-10" 
                                style={{ borderColor: 'rgba(var(--primary-color-rgb), 0.4)' } as any}
                            >
                                <Gift className="w-8 h-8 text-[#39FF14]" style={{ color: 'var(--primary-color)' } as any} />
                            </motion.div>
                        </div>

                        <div className="space-y-2 mb-4 w-full">
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                                {language === 'ar' ? 'ضاعف فرص ربحك مع السيرفر!' : 'Boost Your Winning Rate!'}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-white/50 font-medium leading-relaxed px-1" dir={isRtl ? 'rtl' : 'ltr'}>
                                {language === 'ar' 
                                    ? 'عند إنشاء حساب جديد وتأكيده بالرمز الترويجي المعتمد يتم تفعيل خوارزمية الربح ومزامنة التوقعات بدقة 99%' 
                                    : 'When creating a new account with the promo code, the winning algorithm is synced with 99% accuracy.'}
                            </p>
                        </div>

                        <div 
                            onClick={() => {
                                navigator.clipboard.writeText(promoCode);
                                setPromoCopied(true);
                                playSound('click');
                                setTimeout(() => setPromoCopied(false), 2000);
                            }}
                            className="w-full bg-black/60 border border-dashed border-[rgba(57,255,20,0.35)] hover:border-[#39FF14] rounded-xl p-3 mb-5 flex items-center justify-between cursor-pointer group/code transition-all"
                            style={{ borderColor: 'rgba(var(--primary-color-rgb), 0.4)' } as any}
                        >
                            <div className="text-right">
                                <span className="text-[8px] text-white/50 font-black uppercase tracking-widest block mb-0.5">
                                    {language === 'ar' ? 'الرمز الترويجي المعتمد' : 'Official Promo Code'}
                                </span>
                                <span className="text-lg font-black text-[#39FF14] tracking-wider font-mono" style={{ color: 'var(--primary-color)' } as any}>
                                    {promoCode}
                                </span>
                            </div>
                            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                                promoCopied ? 'bg-[rgba(57,255,20,0.10)]0 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-white/10 text-white group-hover/code:bg-zinc-200'
                            }`}>
                                {promoCopied ? (
                                    <>
                                        <Check className="w-3 h-3" />
                                        <span>{language === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3 h-3" />
                                        <span>{language === 'ar' ? `نسخ ${promoCode}` : `Copy ${promoCode}`}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-2.5">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    playSound('click');
                                    window.open(platform === 'linebet_v1' ? 'https://refpa79184.com/L?tag=d_5848868m_188307c_&site=5848868&ad=188307' : 'https://refpa49781.com/L?tag=d_5953406m_68383c_&site=5953406&ad=68383', '_blank');
                                }}
                                className="w-full h-11 bg-[rgba(57,255,20,0.10)]0 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 group/btn"
                                style={{ backgroundColor: 'var(--primary-color)' } as any}
                            >
                                <span>{language === 'ar' ? 'التسجيل وتفعيل البروموكود' : 'Register With Promo Code'}</span>
                                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </motion.button>

                            <motion.button 
                                whileHover={{ backgroundColor: 'rgba(13,148,136,0.06)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    playSound('click');
                                    setShowPromoDialog(false);
                                }}
                                className="w-full h-9 bg-black/60 border border-white/10 text-white/50 hover:text-white font-bold text-[11px] uppercase rounded-xl transition-all"
                            >
                                {language === 'ar' ? 'المتابعة إلى التوقعات' : 'Continue to Predictor'}
                            </motion.button>
                        </div>
                    </MotionDiv>
                </div>
            )}
        </AnimatePresence>

        <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
        `}</style>
    </div>
  );
};

export default AppleGame;
