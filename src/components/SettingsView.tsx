import React, { useState } from 'react';
import {
  Copy,
  Check,
  ArrowRight,
  Download,
  CreditCard,
  ShieldCheck,
  Fingerprint,
  Lock,
  ArrowLeft,
  Zap,
  Sparkles,
  Globe,
  CheckCircle2,
  Send,
  ExternalLink,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Platform } from '../types';
import { getPlatform } from '../utils/platforms';
import { audioManager } from '../utils/audioManager';
import condInstall from '../assets/neon-install.png';
import condTelegram from '../assets/neon-telegram.png';
import condPromo from '../assets/neon-promo.png';
import condDeposit from '../assets/neon-deposit.png';
import condVerify from '../assets/neon-verify.png';
import dragonLogo from '../assets/dragon-logo.png';

const MotionDiv = motion.div as any;
const NEON = '#7DF9FF';

interface SettingsViewProps {
  onComplete: (userId: string) => void;
  onBack: () => void;
  lang: Language;
  t: any;
  platform: Platform;
}

const SectionCard: React.FC<{
  number: string;
  label: string;
  title: string;
  icon: React.ElementType;
  image?: string;
  children: React.ReactNode;
}> = ({ number, label, title, icon: Icon, image, children }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.45 }}
    className="relative flex overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/70 backdrop-blur-xl"
  >
    {/* icy rail */}
    <div className="relative flex w-11 shrink-0 flex-col items-center justify-between border-l border-[rgba(125,249,255,0.18)] bg-gradient-to-b from-[rgba(125,249,255,0.14)] to-transparent py-4">
      <span className="font-mono text-[13px] font-black text-[#7DF9FF]">{number}</span>
      <span className="h-full w-[1px] my-3 bg-gradient-to-b from-[rgba(125,249,255,0.5)] to-transparent" />
      <Icon className="h-4 w-4 text-[#7DF9FF]/70" />
    </div>

    <div className="min-w-0 flex-1 p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <span className="mb-1 block text-[9px] font-black uppercase tracking-[0.28em] text-white/35">
            {label}
          </span>
          <h2 className="text-base font-black leading-tight text-white sm:text-lg">{title}</h2>
          <span className="mt-2 block h-[2px] w-10 rounded-full bg-[#7DF9FF]" />
        </div>
        {image && (
          <div className="relative h-[68px] w-[68px] shrink-0">
            <div className="absolute inset-0 rounded-full bg-[rgba(125,249,255,0.16)] blur-xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[rgba(125,249,255,0.3)] bg-black/80">
              <img
                src={image}
                alt={title}
                loading="lazy"
                width={512}
                height={512}
                className="h-12 w-12 object-contain drop-shadow-[0_0_10px_rgba(125,249,255,0.6)]"
              />
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  </MotionDiv>
);

const panel = 'bg-white/[0.04] border border-white/[0.07] rounded-2xl';
const neonBtn =
  'w-full h-14 rounded-2xl bg-gradient-to-l from-[#7DF9FF] to-white text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(125,249,255,0.30)] hover:brightness-105 group';


const SettingsView: React.FC<SettingsViewProps> = ({ onComplete, onBack, lang, t, platform }) => {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ userId?: boolean; userIdLength?: boolean; password?: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationStage, setVerificationStage] = useState<'step1' | 'step2' | 'ready'>('step1');

  const cfg = getPlatform(platform);
  const platformName = cfg.name;
  const promoCode = cfg.promo;
  const platformImg = cfg.img;
  const downloadUrl = cfg.downloadUrl;
  const telegramUrl = 'https://t.me/theeagelss1';

  const handleCopy = () => {
    audioManager.playCopy();
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 15) {
      setUserId(val);
      if (val.length >= 10) setErrors({ userId: false, userIdLength: false });
    }
  };

  const validateAndSubmit = () => {
    audioManager.playClick();
    const trimmedId = userId.trim();
    const isLengthValid = trimmedId.length >= 10 && trimmedId.length <= 15;
    const newErrors = { userId: !trimmedId, userIdLength: !isLengthValid };
    setErrors(newErrors);

    if (!newErrors.userId && !newErrors.userIdLength) {
      setIsModalOpen(true);
      setVerificationStage('step1');
      setTimeout(() => setVerificationStage('step2'), 1500);
      setTimeout(() => setVerificationStage('ready'), 3000);
    }
  };

  const handleDownloadAndProceed = () => {
    audioManager.playClick();
    setIsModalOpen(false);
    onComplete(userId.trim());
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-white selection:bg-[#7DF9FF]/30" dir="rtl">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(rgba(125,249,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(125,249,255,0.5)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full blur-[110px] bg-[rgba(125,249,255,0.12)]" />
      </div>

      <div className="relative z-10 flex flex-col px-3 sm:px-6 pt-4 pb-16 max-w-2xl mx-auto w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:border-[rgba(125,249,255,0.5)] hover:text-[#7DF9FF] transition-all active:scale-95"
            title="رجوع"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[rgba(125,249,255,0.08)] border border-[rgba(125,249,255,0.35)] rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#7DF9FF] animate-pulse shadow-[0_0_10px_#7DF9FF]" />
            <span className="text-xs font-black tracking-widest uppercase text-[#7DF9FF]">
              شروط تفعيل {platformName}
            </span>
          </div>
        </div>

        {/* Brand hero */}
        <div className="relative mb-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-gradient-to-b from-[rgba(125,249,255,0.10)] via-black/80 to-black p-5 backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(125,249,255,0.18)] blur-[90px]" />

          <div className="relative flex flex-col items-center text-center">
            <img
              src={dragonLogo}
              alt="DRAGON VIP"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-24 w-24 object-contain drop-shadow-[0_0_22px_rgba(125,249,255,0.55)]"
            />
            <h1 className="mt-2 text-2xl font-black leading-tight tracking-[0.14em] text-white">
              DRAGON <span className="text-[#7DF9FF]">VIP</span>
            </h1>
            <p className="mt-2 max-w-[300px] text-[11px] leading-relaxed text-white/50 sm:text-xs">
              نفّذ الشروط الخمسة بالترتيب من الأعلى للأسفل، ثم أدخل ID حسابك في نهاية الصفحة لتفعيل
              التوقعات.
            </p>

            {/* steps rail */}
            <div className="mt-4 flex w-full items-center justify-center gap-1.5">
              {['01', '02', '03', '04', '05'].map((s) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className="rounded-lg border border-[rgba(125,249,255,0.28)] bg-black/70 px-2 py-1 font-mono text-[9px] font-black text-[#7DF9FF]">
                    {s}
                  </span>
                  {s !== '05' && <span className="h-[1px] w-2 bg-[rgba(125,249,255,0.3)]" />}
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 animate-pulse text-[#7DF9FF]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7DF9FF]">
                تفعيل فوري · 5 خطوات
              </span>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4">
          {/* 01 */}
          <SectionCard
            number="01"
            label="الشرط الأول"
            title={t.install_app || 'تثبيت التطبيق الرسمي'}
            icon={Download}
            image={condInstall}
          >
            <div className="flex flex-col gap-4">
              <div className={`flex items-center gap-3 p-3 ${panel}`}>
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 p-1.5 flex items-center justify-center shrink-0">
                  <img src={platformImg} alt={platformName} className="w-7 h-7 object-contain" />
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  قم بتنزيل وتثبيت تطبيق منصة{' '}
                  <span className="text-[#7DF9FF] font-bold">{platformName}</span> الرسمي لربط الحساب
                  مع سيرفر التوقعات.
                </p>
              </div>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playClick()}
                className={neonBtn}
              >
                <span>{t.install_btn || 'تثبيت التطبيق الآن'}</span>
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </SectionCard>

          {/* 02 */}
          <SectionCard
            number="02"
            label="الشرط الثاني"
            title="الاشتراك في قناة التلجرام"
            icon={Send}
            image={condTelegram}
          >
            <div className="flex flex-col gap-4">
              <p className={`text-xs sm:text-sm text-white/70 leading-relaxed p-4 ${panel}`}>
                انضم إلى القناة الرسمية على التلجرام لمتابعة التحديثات الحصرية واستلام الإشارات
                الفورية.
              </p>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playClick()}
                className="w-full h-14 rounded-2xl bg-black border border-[rgba(125,249,255,0.5)] text-[#7DF9FF] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_22px_rgba(125,249,255,0.22)] hover:bg-[rgba(125,249,255,0.08)] group"
              >
                <span>الانضمام لقناة التلجرام</span>
                <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </SectionCard>

          {/* 03 */}
          <SectionCard
            number="03"
            label="الشرط الثالث"
            title={t.registration || 'التسجيل بالبروموكود'}
            icon={Lock}
            image={condPromo}
          >
            <div className="flex flex-col gap-4">
              <p className={`text-xs sm:text-sm text-white/70 leading-relaxed p-4 ${panel}`}>
                عند إنشاء حسابك الجديد على المنصة، أدخل الرمز الترويجي التالي لتفعيل خصم السيرفر
                وضمان مزامنة التوقعات:
              </p>
              <div
                onClick={handleCopy}
                className="relative bg-black/60 rounded-2xl border-2 border-dashed border-[rgba(125,249,255,0.4)] hover:border-[#7DF9FF] p-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] mb-1 block">
                      كود البروموكود المعتمد
                    </span>
                    <span className="text-2xl sm:text-3xl font-black tracking-[0.2em] text-[#7DF9FF] drop-shadow-[0_0_14px_rgba(125,249,255,0.6)]">
                      {promoCode}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                      copied
                        ? 'bg-[#7DF9FF] text-black shadow-[0_0_20px_rgba(125,249,255,0.5)]'
                        : 'bg-white/5 text-white/80 group-hover:bg-[rgba(125,249,255,0.12)] group-hover:text-[#7DF9FF]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>نسخ الكود</span>
                      </>
                    )}
                  </div>
                </div>
                <Sparkles className="absolute top-2 left-2 w-3.5 h-3.5 text-[#7DF9FF]/60" />
              </div>
            </div>
          </SectionCard>

          {/* 04 */}
          <SectionCard
            number="04"
            label="الشرط الرابع"
            title={t.activation_deposit || 'إيداع التفعيل الأول'}
            icon={CreditCard}
            image={condDeposit}
          >
            <div className="flex flex-col gap-4">
              <p className={`text-xs sm:text-sm text-white/70 leading-relaxed p-4 ${panel}`}>
                يتطلب تفعيل الخوارزمية إجراء أول عملية إيداع بالحساب للحد الأدنى المطلوب:
              </p>
              <div className="grid grid-cols-2 gap-3" dir="ltr">
                {[
                  { label: 'USD ($)', value: '$5.00' },
                  { label: 'EGP (L.E)', value: '250 L.E' },
                ].map((c) => (
                  <div
                    key={c.label}
                    className={`p-4 flex flex-col items-center justify-center text-center ${panel}`}
                  >
                    <span className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] mb-1">
                      {c.label}
                    </span>
                    <span className="text-2xl font-black text-[#7DF9FF] drop-shadow-[0_0_12px_rgba(125,249,255,0.5)]">
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/50">
                <Globe className="w-3.5 h-3.5" />
                <span>يتم تأكيد الإيداع تلقائياً عبر السيرفر خلال ثوانٍ.</span>
              </div>
            </div>
          </SectionCard>

          {/* 05 */}
          <SectionCard
            number="05"
            label="الشرط الخامس والأخير"
            title={t.verify_account || 'تأكيد ومعرفة ID الحساب'}
            icon={Fingerprint}
            image={condVerify}
          >
            <div className="flex flex-col gap-4">
              <p className={`text-xs sm:text-sm text-white/70 leading-relaxed p-4 ${panel}`}>
                أدخل رقم معرف حسابك (ID) المكون من 10 إلى 15 رقم للتحقق من المزامنة وبدء التوقعات
                فوراً:
              </p>

              <div>
                <label className="block text-[10px] text-white/50 mb-1.5 uppercase font-black tracking-[0.2em]">
                  {t.userid_label || 'معرف حسابك (User ID)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center justify-center border-l border-white/10 px-3">
                    <Fingerprint className={`w-6 h-6 ${userId ? 'text-[#7DF9FF]' : 'text-white/30'}`} />
                  </div>
                  <input
                    type="tel"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="مثال: 1234567890"
                    maxLength={15}
                    className={`w-full bg-black/60 border text-white font-mono text-lg pr-16 pl-4 py-3.5 rounded-2xl focus:outline-none transition-all text-right placeholder:text-white/25 ${
                      errors.userId || errors.userIdLength
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-white/10 focus:border-[#7DF9FF]'
                    }`}
                  />
                </div>
                {(errors.userId || errors.userIdLength) && (
                  <p className="text-red-400 text-xs font-bold mt-2 mr-1">
                    يرجى إدخال رقم ID صحيح مكون من 10 إلى 15 أرقام.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] text-white/50 mb-1.5 uppercase font-black tracking-[0.2em]">
                  كلمة المرور (البروموكود)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center justify-center border-l border-white/10 px-3">
                    <Lock className={`w-6 h-6 ${password ? 'text-[#7DF9FF]' : 'text-white/30'}`} />
                  </div>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value.toUpperCase());
                      if (errors.password) setErrors((p) => ({ ...p, password: false }));
                    }}
                    placeholder={`مثال: ${promoCode}`}
                    className={`w-full bg-black/60 border text-white font-mono text-lg pr-16 pl-4 py-3.5 rounded-2xl focus:outline-none transition-all text-right placeholder:text-white/25 ${
                      errors.password
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-white/10 focus:border-[#7DF9FF]'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs font-bold mt-2 mr-1">
                    كلمة المرور غير صحيحة، اكتب البروموكود الخاص بالمنصة.
                  </p>
                )}
              </div>


              <button onClick={validateAndSubmit} className={neonBtn}>
                <span>{t.submit_verification || 'تأكيد وتفعيل الحساب'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </SectionCard>
        </div>

        <div className={`mt-5 p-4 flex items-center gap-2 text-[11px] text-white/50 ${panel}`}>
          <ShieldCheck className="w-4 h-4 text-[#7DF9FF]" />
          <span>يتم التأكد من صحة البيانات تلقائياً عبر السيرفر الفوري</span>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1.5 opacity-40">
          <div className="h-px w-10 bg-[rgba(125,249,255,0.4)]" />
          <span className="text-[7.5px] font-black uppercase tracking-[0.3em] text-center text-white/60">
            تشفير حماية عالي الأمان | DRAGON VIP
          </span>
        </div>
      </div>

      {/* Verification modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/90 p-4 backdrop-blur-2xl sm:items-center"
          >
            <MotionDiv
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative w-full max-w-[400px] overflow-hidden rounded-[26px] border border-[rgba(125,249,255,0.22)] bg-[#02060a]"
            >
              {/* top status strip */}
              <div className="flex items-center justify-between border-b border-white/[0.07] bg-[rgba(125,249,255,0.05)] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7DF9FF] shadow-[0_0_10px_#7DF9FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#7DF9FF]">
                    dragon terminal
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playClick();
                    setIsModalOpen(false);
                  }}
                  aria-label="إغلاق"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-all hover:text-white active:scale-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-5 py-6">
                {/* id card */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(125,249,255,0.3)] bg-[rgba(125,249,255,0.08)]">
                    <Fingerprint className="h-5 w-5 text-[#7DF9FF]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-black uppercase tracking-[0.24em] text-white/35">
                      معرف الحساب
                    </span>
                    <span className="block font-mono text-lg font-black tracking-wider text-white">
                      {userId}
                    </span>
                  </div>
                  <div className="mr-auto rounded-lg border border-[rgba(125,249,255,0.25)] bg-black px-2.5 py-1 font-mono text-[10px] font-black text-[#7DF9FF]">
                    {promoCode}
                  </div>
                </div>

                {/* checklist */}
                <div className="mt-5 flex flex-col gap-2.5">
                  {[
                    { key: 'step1', text: 'فحص المعرف على السيرفر' },
                    { key: 'step2', text: 'مطابقة البروموكود والمزامنة' },
                    { key: 'ready', text: 'ربط حسابك بخوارزمية التوقع' },
                  ].map((row, i) => {
                    const order = ['step1', 'step2', 'ready'];
                    const idx = order.indexOf(verificationStage);
                    const done = idx > i || verificationStage === 'ready';
                    const active = idx === i && verificationStage !== 'ready';
                    return (
                      <div
                        key={row.key}
                        className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-500 ${
                          done
                            ? 'border-[rgba(125,249,255,0.35)] bg-[rgba(125,249,255,0.07)]'
                            : active
                              ? 'border-white/15 bg-white/[0.04]'
                              : 'border-white/[0.06] bg-transparent'
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black">
                          {done ? (
                            <Check className="h-3.5 w-3.5 text-[#7DF9FF]" />
                          ) : active ? (
                            <MotionDiv
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                              className="h-3.5 w-3.5 rounded-full border border-[rgba(125,249,255,0.2)] border-t-[#7DF9FF]"
                            />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                          )}
                        </span>
                        <span
                          className={`text-[12px] font-bold ${
                            done ? 'text-white' : active ? 'text-white/70' : 'text-white/30'
                          }`}
                        >
                          {row.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {verificationStage === 'ready' ? (
                  <MotionDiv
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-black text-[#7DF9FF]">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>تم تفعيل الحساب بنجاح</span>
                    </div>
                    <button
                      onClick={handleDownloadAndProceed}
                      className="flex h-14 w-full items-center justify-center gap-3 rounded-[18px] bg-gradient-to-l from-[#7DF9FF] to-white text-[14px] font-black text-black shadow-[0_16px_40px_-16px_rgba(125,249,255,0.85)] transition-all active:scale-[0.98]"
                    >
                      <Zap className="h-5 w-5 fill-black" />
                      <span>الدخول إلى التوقعات</span>
                    </button>
                  </MotionDiv>
                ) : (
                  <p className="mt-6 text-center text-[10px] font-black uppercase tracking-[0.24em] text-white/30">
                    جاري التحقق... لا تغلق النافذة
                  </p>
                )}
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>


    </div>
  );
};

export default SettingsView;
