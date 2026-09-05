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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Platform } from '../types';
import { audioManager } from '../utils/audioManager';
import condInstall from '../assets/cond-install.png';
import condTelegram from '../assets/cond-telegram.png';
import condPromo from '../assets/cond-promo.png';
import condDeposit from '../assets/cond-deposit.png';
import condVerify from '../assets/cond-verify.png';
import smartScriptLogo from '../assets/smart-script-logo.jpg';

const MotionDiv = motion.div as any;

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
  accent?: string;
  image?: string;
  children: React.ReactNode;
}> = ({ number, label, title, icon: Icon, accent = 'var(--primary-color)', image, children }) => (
  <div className="relative bg-white/95 backdrop-blur-xl border border-zinc-300 rounded-3xl p-4 sm:p-6 shadow-[0_14px_32px_rgba(15,23,42,0.07)] overflow-hidden">
    <div
      className="absolute top-0 right-0 left-0 h-[2px]"
      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
    />
    <div
      className="absolute -top-10 left-0 w-32 h-32 blur-3xl rounded-full pointer-events-none opacity-40"
      style={{ backgroundColor: `${accent}33` }}
    />
    <div className="relative flex items-center gap-3 mb-4">
      <div
        className="w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 overflow-hidden"
        style={{ borderColor: `${accent}55`, backgroundColor: `${accent}14` }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={512}
            height={512}
            className="w-12 h-12 object-contain"
            style={{ filter: `drop-shadow(0 0 8px ${accent}88)` }}
          />
        ) : (
          <Icon className="w-6 h-6" style={{ color: accent }} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-black uppercase tracking-widest block mb-0.5" style={{ color: accent }}>
          {label} ({number})
        </span>
        <h2 className="text-base sm:text-lg font-black text-zinc-900 leading-tight">{title}</h2>
      </div>
      <span className="text-3xl font-black font-mono text-zinc-900/10">{number}</span>
    </div>
    {children}
  </div>
);

const SettingsView: React.FC<SettingsViewProps> = ({ onComplete, onBack, lang, t, platform }) => {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState<{ userId?: boolean; userIdLength?: boolean }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationStage, setVerificationStage] = useState<'step1' | 'step2' | 'ready'>('step1');

  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';
  const promoCode = platform === 'linebet_v1' ? 'B10' : 'B11';
  const platformImg = platform === 'linebet_v1'
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10'
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10';

  const greenbetDownloadUrl = "https://refpa79184.com/L?tag=d_5848868m_188307c_&site=5848868&ad=188307";
  const xbetDownloadUrl = "https://refpa49781.com/L?tag=d_5953406m_68383c_&site=5953406&ad=68383";
  const downloadUrl = platform === 'linebet_v1' ? greenbetDownloadUrl : xbetDownloadUrl;
  const telegramUrl = "https://t.me/+1MOiIrUHK1AzZWJk";

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
    <div className="flex flex-col min-h-full bg-transparent font-sans text-zinc-900 selection:bg-teal-200" dir="rtl">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-color-rgb),0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-color-rgb),0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col px-3 sm:px-6 pt-4 pb-16 max-w-2xl mx-auto w-full">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-300 flex items-center justify-center hover:border-teal-500/40 hover:text-teal-600 transition-all active:scale-95 shadow-md"
            title="رجوع"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-teal-50 border border-teal-500/40 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_var(--primary-glow)]" />
            <span className="text-xs font-black tracking-widest uppercase text-teal-600">
              شروط تفعيل {platformName}
            </span>
          </div>
        </div>

        {/* Brand Hero */}
        <div className="relative mb-5 overflow-hidden rounded-[28px] border border-zinc-300 bg-white/95 backdrop-blur-xl p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div
            className="absolute -top-16 -right-10 w-52 h-52 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ backgroundColor: 'var(--primary-color)' }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, var(--primary-color), transparent)' }}
          />
          <div className="relative flex items-center gap-4">
            <div
              className="w-20 h-20 shrink-0 rounded-3xl border bg-white/95 flex items-center justify-center overflow-hidden"
              style={{ borderColor: 'rgba(var(--primary-color-rgb),0.45)' }}
            >
              <img
                src={smartScriptLogo}
                alt="Smart Script"
                width={512}
                height={512}
                className="w-full h-full object-cover"
                style={{ filter: 'drop-shadow(0 0 12px var(--primary-glow))' }}
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 leading-tight">SMART SCRIPT</h1>
              <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed mt-1">
                نفّذ الشروط الخمسة بالترتيب من الأعلى للأسفل، ثم أدخل ID حسابك في نهاية الصفحة لتفعيل التوقعات.
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 animate-pulse" style={{ color: 'var(--primary-color)' }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--primary-color)' }}>
                  تفعيل فوري · 5 خطوات
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ALL CONDITIONS STACKED */}
        <div className="flex flex-col gap-4">
          {/* 01 */}
          <SectionCard number="01" label="الشرط الأول" title={t.install_app || "تثبيت التطبيق الرسمي"} icon={Download} image={condInstall}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-white/95 border border-zinc-300 p-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-300 p-1.5 flex items-center justify-center shrink-0">
                  <img src={platformImg} alt={platformName} className="w-7 h-7 object-contain" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  قم بتنزيل وتثبيت تطبيق منصة <span className="text-teal-600 font-bold">{platformName}</span> الرسمي لربط الحساب مع سيرفر التوقعات.
                </p>
              </div>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playClick()}
                className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl group"
              >
                <span>{t.install_btn || "تثبيت التطبيق الآن"}</span>
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </SectionCard>

          {/* 02 */}
          <SectionCard number="02" label="الشرط الثاني" title="الاشتراك في قناة التلجرام" icon={Send} accent="#0088cc" image={condTelegram}>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white/95 border border-zinc-300 p-4 rounded-2xl">
                انضم إلى القناة الرسمية على التلجرام لمتابعة التحديثات الحصرية واستلام الإشارات الفورية.
              </p>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playClick()}
                className="w-full h-14 rounded-2xl bg-[#0088cc] hover:bg-[#0077b5] text-zinc-900 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(0,136,204,0.35)] group"
              >
                <span>الانضمام لقناة التلجرام</span>
                <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </SectionCard>

          {/* 03 */}
          <SectionCard number="03" label="الشرط الثالث" title={t.registration || "التسجيل بالبروموكود"} icon={Lock} image={condPromo}>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white/95 border border-zinc-300 p-4 rounded-2xl">
                عند إنشاء حسابك الجديد على المنصة، أدخل الرمز الترويجي التالي لتفعيل خصم السيرفر وضمان مزامنة التوقعات:
              </p>
              <div
                onClick={handleCopy}
                className="relative bg-white/95 rounded-2xl border-2 border-dashed border-teal-500/40 hover:border-teal-500 p-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1 block">كود البروموكود المعتمد</span>
                    <span className="text-2xl sm:text-3xl font-black tracking-[0.2em] text-teal-600">{promoCode}</span>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    copied ? 'bg-teal-600 text-white shadow-[0_8px_20px_rgba(13,148,136,0.3)]' : 'bg-zinc-100 text-zinc-900 group-hover:bg-teal-50'
                  }`}>
                    {copied ? (<><Check className="w-4 h-4" /><span>تم النسخ!</span></>) : (<><Copy className="w-4 h-4" /><span>نسخ الكود</span></>)}
                  </div>
                </div>
                <Sparkles className="absolute top-2 left-2 w-3.5 h-3.5 text-teal-600/50" />
              </div>
            </div>
          </SectionCard>

          {/* 04 */}
          <SectionCard number="04" label="الشرط الرابع" title={t.activation_deposit || "إيداع التفعيل الأول"} icon={CreditCard} image={condDeposit}>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white/95 border border-zinc-300 p-4 rounded-2xl">
                يتطلب تفعيل الخوارزمية إجراء أول عملية إيداع بالحساب للحد الأدنى المطلوب:
              </p>
              <div className="grid grid-cols-2 gap-3" dir="ltr">
                <div className="bg-white/95 border border-zinc-300 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">USD ($)</span>
                  <span className="text-2xl font-black text-teal-600">$5.00</span>
                </div>
                <div className="bg-white/95 border border-zinc-300 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">EGP (L.E)</span>
                  <span className="text-2xl font-black text-teal-600">250 L.E</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                <Globe className="w-3.5 h-3.5" />
                <span>يتم تأكيد الإيداع تلقائياً عبر السيرفر خلال ثوانٍ.</span>
              </div>
            </div>
          </SectionCard>

          {/* 05 */}
          <SectionCard number="05" label="الشرط الخامس والأخير" title={t.verify_account || "تأكيد ومعرفة ID الحساب"} icon={Fingerprint} image={condVerify}>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white/95 border border-zinc-300 p-4 rounded-2xl">
                أدخل رقم معرف حسابك (ID) المكون من 10 إلى 15 رقم للتحقق من المزامنة وبدء التوقعات فوراً:
              </p>

              <div>
                <label className="block text-[10px] text-zinc-600 mb-1.5 uppercase font-black tracking-widest">
                  {t.userid_label || "معرف حسابك (User ID)"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 w-13 flex items-center justify-center border-l border-zinc-300 px-3">
                    <Fingerprint className={`w-6 h-6 ${userId ? 'text-teal-600' : 'text-zinc-600'}`} />
                  </div>
                  <input
                    type="tel"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="مثال: 1234567890"
                    maxLength={15}
                    className={`w-full bg-white/95 border text-zinc-900 font-mono text-lg pr-16 pl-4 py-3.5 rounded-2xl focus:outline-none transition-all text-right ${
                      errors.userId || errors.userIdLength
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-zinc-300 focus:border-teal-500'
                    }`}
                  />
                </div>
                {(errors.userId || errors.userIdLength) && (
                  <p className="text-red-400 text-xs font-bold mt-2 mr-1">
                    يرجى إدخال رقم ID صحيح مكون من 10 إلى 15 أرقام.
                  </p>
                )}
              </div>

              <button
                onClick={validateAndSubmit}
                className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(13,148,136,0.25)] active:scale-[0.98] uppercase"
              >
                <span>{t.submit_verification || "تأكيد وتفعيل الحساب"}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Footer Info */}
        <div className="mt-5 p-4 bg-white/95 border border-zinc-300 rounded-2xl flex items-center gap-2 text-[11px] text-zinc-600">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>يتم التأكد من صحة البيانات تلقائياً عبر السيرفر الفوري</span>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1.5 opacity-30">
          <div className="h-px w-10 bg-zinc-300" />
          <span className="text-[7.5px] font-black uppercase tracking-[0.3em] text-center">
            تشفير حماية عالي الأمان | SMART SCRIPT
          </span>
        </div>
      </div>

      {/* Verification Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-900/30 backdrop-blur-md flex items-center justify-center p-4"
          >
            <MotionDiv
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              className="w-full max-w-sm bg-white/90 border border-teal-500/40 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_0_40px_rgba(34,197,94,0.3)] relative overflow-hidden"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-teal-50 blur-3xl rounded-full pointer-events-none" />

              <button
                type="button"
                onClick={() => { audioManager.playClick(); setIsModalOpen(false); onComplete(userId.trim()); }}
                aria-label="إغلاق"
                className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-white border border-zinc-300 text-zinc-700 flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.10)] active:scale-95 transition"
              >
                <X className="w-4.5 h-4.5" />
              </button>


              {verificationStage === 'step1' && (
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-teal-500/40 border-t-green-500 animate-spin" />
                    <Fingerprint className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-zinc-900 mb-2">جاري التحقق من ID الخاص بك...</h3>
                  <p className="text-xs text-zinc-600 font-mono">ID: {userId}</p>
                </div>
              )}

              {verificationStage === 'step2' && (
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-teal-500/40 border-t-green-500 animate-spin" />
                    <ShieldCheck className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-zinc-900 mb-2">جاري التحقق من حسابك...</h3>
                  <p className="text-xs text-zinc-600">جاري مطابقة كود البروموكود {promoCode} وحالة السيرفر</p>
                </div>
              )}

              {verificationStage === 'ready' && (
                <div className="flex flex-col items-center w-full py-2">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    <CheckCircle2 className="w-9 h-9 text-teal-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-zinc-900 mb-2">تم التحقق من الحساب بنجاح!</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-bold mb-6">يرجى تحميل المنصة من هنا</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownloadAndProceed}
                    className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_10px_24px_rgba(13,148,136,0.25)] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-white" />
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
