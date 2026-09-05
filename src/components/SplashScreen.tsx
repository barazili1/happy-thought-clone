import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../utils/translations';
import { ShieldCheck, Zap, Flame } from 'lucide-react';
import dragonLogo from '../assets/dragon-logo.png';
import { preloadAllImages } from '../utils/preloadImages';

const MotionDiv = motion.div as any;

interface SplashScreenProps {
  onComplete: () => void;
  language?: Language;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, language = 'en' }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const duration = 4000;
    const startTime = Date.now();
    let imagesReady = false;
    let finished = false;

    // Preload + cache every image used across the app before entering.
    preloadAllImages().then(() => {
      imagesReady = true;
    });

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = (elapsed / duration) * 100;
      const cap = imagesReady ? 100 : 96;
      setProgress(Math.min(timeProgress, cap));

      if (!finished && imagesReady && timeProgress >= 100) {
        finished = true;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setExit(true), 500);
        setTimeout(() => onCompleteRef.current(), 1200);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const isArabic = language === 'ar';

  const loadingSteps = isArabic
    ? ['تأمين الاتصال...', 'مزامنة البيانات...', 'تحسين الأداء...', 'النظام جاهز']
    : ['SECURING CONNECTION...', 'SYNCING DATA...', 'OPTIMIZING PERFORMANCE...', 'SYSTEM READY'];

  const currentStep = Math.min(
    Math.floor((progress / 100) * loadingSteps.length),
    loadingSteps.length - 1
  );

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black transition-all duration-1000 ease-in-out
      ${exit ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
    >
      {/* Neon ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full blur-[130px] bg-[rgba(125,249,255,0.16)] animate-pulse" />
        <div
          className="absolute bottom-[-15%] right-[-15%] w-[55%] h-[55%] rounded-full blur-[130px] bg-[rgba(125,249,255,0.12)] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(125,249,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(125,249,255,0.35) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(circle at 50% 45%, black, transparent 72%)',
          }}
        />
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="h-24 w-full bg-gradient-to-b from-transparent via-[rgba(125,249,255,0.10)] to-transparent animate-scan" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-6">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative mb-12"
        >
          <div className="absolute -inset-14 rounded-full blur-[70px] bg-[rgba(125,249,255,0.22)] animate-pulse" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-5 rounded-[3.2rem] border border-[rgba(125,249,255,0.45)]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-9 rounded-[3.6rem] border border-dashed border-[rgba(125,249,255,0.18)]"
          />

          <div className="relative w-52 h-52 rounded-[2.5rem] overflow-hidden border border-[rgba(125,249,255,0.4)] bg-[#050705] shadow-[0_0_60px_rgba(125,249,255,0.28)] flex items-center justify-center">
            <img
              src={dragonLogo}
              className="w-40 h-40 object-contain drop-shadow-[0_0_22px_rgba(125,249,255,0.65)]"
              alt="DRAGON VIP"
              width={1024}
              height={1024}
            />
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(125,249,255,0.22)] to-transparent skew-x-12"
            />
          </div>

        </MotionDiv>

        {/* Brand */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-[0.18em] uppercase text-white">
              DRAGON{' '}
              <span className="text-[#7DF9FF] drop-shadow-[0_0_18px_rgba(125,249,255,0.75)]">VIP</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[rgba(125,249,255,0.6)]" />
              <Flame className="w-4 h-4 text-[#7DF9FF] animate-pulse" />
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[rgba(125,249,255,0.6)]" />
            </div>
          </motion.div>

          <div className="h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] font-bold text-[#7DF9FF]/90 uppercase tracking-[0.32em]"
              >
                {loadingSteps[currentStep]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-20 w-full max-w-[290px] space-y-4 z-10">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.25em]">
            {isArabic ? 'تحميل النظام' : 'System Load'}
          </span>
          <span className="text-[10px] font-black font-mono text-[#7DF9FF]">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="relative h-1.5 w-full rounded-full overflow-hidden bg-white/10 border border-[rgba(125,249,255,0.25)]">
          <motion.div
            className="h-full bg-gradient-to-r from-[rgba(125,249,255,0.35)] via-[#7DF9FF] to-white shadow-[0_0_16px_rgba(125,249,255,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: progress > (i + 1) * 20 ? 1 : 0.2,
                scale: progress > (i + 1) * 20 ? 1.25 : 1,
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#7DF9FF] shadow-[0_0_8px_rgba(125,249,255,0.9)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
