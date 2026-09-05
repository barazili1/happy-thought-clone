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
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45 }}
    className="relative rounded-[26px] border border-[rgba(125,249,255,0.22)] bg-[#07090785] backdrop-blur-xl p-4 sm:p-6 overflow-hidden shadow-[0_0_30px_rgba(125,249,255,0.08)]"
  >
    <div
      className="absolute top-0 inset-x-0 h-[2px]"
      style={{ background: `linear-gradient(90deg, transparent, ${NEON}, transparent)` }}
    />
    <div className="absolute -top-14 left-0 w-40 h-40 blur-3xl rounded-full pointer-events-none bg-[rgba(125,249,255,0.16)]" />

    <div className="relative flex items-center gap-3 mb-4">
      <div className="w-16 h-16 rounded-2xl border border-[rgba(125,249,255,0.35)] bg-black/60 flex items-center justify-center shrink-0 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={512}
            height={512}
            className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(125,249,255,0.6)]"
          />
        ) : (
          <Icon className="w-6 h-6 text-[#7DF9FF]" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-0.5 text-[#7DF9FF]">
          {label} ({number})
        </span>
        <h2 className="text-base sm:text-lg font-black text-white leading-tight">{title}</h2>
      </div>
      <span className="text-3xl font-black font-mono text-white/10">{number}</span>
    </div>
    {children}
  </MotionDiv>
);

const panel = 'bg-black/50 border border-white/10 rounded-2xl';
const neonBtn =
  'w-full h-14 rounded-2xl bg-[#7DF9FF] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_28px_rgba(125,249,255,0.45)] hover:brightness-110 group';

const SettingsView: React.FC<SettingsViewProps> = ({ onComplete, onBack, lang, t, platform }) => {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState<{ userId?: boolean; userIdLength?: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationStage, setVerificationStage] = useState<'step1' | 'step2' | 'ready'>('step1');

  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';
  const promoCode = platform === 'linebet_v1' ? 'B10' : 'B11';
  const platformImg =
    platform === 'linebet_v1'
      ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10'
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10';

  const greenbetDownloadUrl =
    'https://refpa79184.com/L?tag=d_5848868m_188307c_&site=5848868&ad=188307';
  const xbetDownloadUrl = 'https://refpa49781.com/L?tag=d_5953406m_68383c_&site=5953406&ad=68383';
  const downloadUrl = platform === 'linebet_v1' ? greenbetDownloadUrl : xbetDownloadUrl;
  const telegramUrl = 'https://t.me/+1MOiIrUHK1AzZWJk';

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
    window.open(downloadUrl, '_blank');
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
        <div className="relative mb-5 overflow-hidden rounded-[30px] border border-[rgba(125,249,255,0.28)] bg-[#07090790] backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(125,249,255,0.12)]">
          <div className="absolute -top-20 -right-10 w-56 h-56 rounded-full blur-[90px] bg-[rgba(125,249,255,0.22)] pointer-events-none" />
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${NEON}, transparent)` }}
          />
          <div className="relative flex items-center gap-4">
            <div className="w-20 h-20 shrink-0 rounded-3xl border border-[rgba(125,249,255,0.4)] bg-black/70 flex items-center justify-center overflow-hidden">
              <img
                src={dragonLogo}
                alt="DRAGON VIP"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-16 h-16 object-contain drop-shadow-[0_0_14px_rgba(125,249,255,0.7)]"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black tracking-[0.12em] text-white leading-tight">
                DRAGON <span className="text-[#7DF9FF]">VIP</span>
              </h1>
              <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed mt-1">
                نفّذ الشروط الخمسة بالترتيب من الأعلى للأسفل، ثم أدخل ID حسابك في نهاية الصفحة لتفعيل
                التوقعات.
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 animate-pulse text-[#7DF9FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7DF9FF]">
                  تفعيل فوري · 5 خطوات
                </span>
              </div>
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <MotionDiv
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              className="w-full max-w-sm bg-[#060806]/95 border border-[rgba(125,249,255,0.4)] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(125,249,255,0.25)] relative overflow-hidden"
            >
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full blur-[70px] bg-[rgba(125,249,255,0.25)] pointer-events-none" />

              <button
                type="button"
                onClick={() => {
                  audioManager.playClick();
                  setIsModalOpen(false);
                  onComplete(userId.trim());
                }}
                aria-label="إغلاق"
                className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black border border-white/15 text-white/70 flex items-center justify-center active:scale-95 transition"
              >
                <X className="w-4 h-4" />
              </button>

              {verificationStage === 'step1' && (
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-[rgba(125,249,255,0.2)] border-t-[#7DF9FF] animate-spin" />
                    <Fingerprint className="w-8 h-8 text-[#7DF9FF]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-2">
                    جاري التحقق من ID الخاص بك...
                  </h3>
                  <p className="text-xs text-white/50 font-mono">ID: {userId}</p>
                </div>
              )}

              {verificationStage === 'step2' && (
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-[rgba(125,249,255,0.2)] border-t-[#7DF9FF] animate-spin" />
                    <ShieldCheck className="w-8 h-8 text-[#7DF9FF]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-2">
                    جاري التحقق من حسابك...
                  </h3>
                  <p className="text-xs text-white/50">
                    جاري مطابقة كود البروموكود {promoCode} وحالة السيرفر
                  </p>
                </div>
              )}

              {verificationStage === 'ready' && (
                <div className="flex flex-col items-center w-full py-2">
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(125,249,255,0.1)] border border-[rgba(125,249,255,0.4)] flex items-center justify-center mb-4 shadow-[0_0_26px_rgba(125,249,255,0.4)]">
                    <CheckCircle2 className="w-9 h-9 text-[#7DF9FF]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mb-2">
                    تم التحقق من الحساب بنجاح!
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-bold mb-6">
                    يرجى تحميل المنصة من هنا
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownloadAndProceed}
                    className={neonBtn}
                  >
                    <Download className="w-5 h-5" />
                    <span>تحميل الآن</span>
                  </motion.button>
                </div>
              )}
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsView;
