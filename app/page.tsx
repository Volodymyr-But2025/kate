"use client";

import confetti from "canvas-confetti";
import { Code2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FinaleBanner } from "@/app/components/FinaleBanner";
import { LetterCards } from "@/app/components/LetterCards";
import { HOLD_DURATION, LETTERS } from "@/app/lib/constants";
import { prefersReducedMotion } from "@/app/lib/motion";
import { createSoundPlayer } from "@/app/lib/sounds";

export default function Home() {
  const [cardsState, setCardsState] = useState([false, false, false, false]);
  const [bouncePrev, setBouncePrev] = useState<number | null>(null);
  const [actionHint, setActionHint] = useState("💡 Залишилося відкрити картки!");
  const [hintHidden, setHintHidden] = useState(false);
  const [allUnlocked, setAllUnlocked] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const soundsRef = useRef<ReturnType<typeof createSoundPlayer> | null>(null);
  const holdRafRef = useRef<number | null>(null);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdingRef = useRef(false);
  const finaleTriggeredRef = useRef(false);
  const cardsStateRef = useRef(cardsState);

  useEffect(() => {
    cardsStateRef.current = cardsState;
  }, [cardsState]);

  useEffect(() => {
    soundsRef.current = createSoundPlayer();
    return () => {
      if (holdRafRef.current !== null) cancelAnimationFrame(holdRafRef.current);
      if (holdTimeoutRef.current !== null) clearTimeout(holdTimeoutRef.current);
      soundsRef.current?.dispose();
      soundsRef.current = null;
    };
  }, []);

  const launchCelebrationFireworks = useCallback(() => {
    if (prefersReducedMotion()) return;

    try {
      const playBoomSound = () => soundsRef.current?.playBoomSound();
      playBoomSound();
      window.setTimeout(playBoomSound, 300);
      window.setTimeout(playBoomSound, 600);
    } catch {
      // Audio may be unavailable; celebration visuals still run.
    }

    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() * 0.5 + 0.2 },
      });
      confetti({
        particleCount,
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() * 0.5 + 0.2 },
      });
    }, 250);
  }, []);

  const endHoldCard4 = useCallback(() => {
    holdingRef.current = false;
    if (holdRafRef.current !== null) {
      cancelAnimationFrame(holdRafRef.current);
      holdRafRef.current = null;
    }
    if (holdTimeoutRef.current !== null) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setHoldProgress(0);
  }, []);

  const triggerGrandFinale = useCallback(() => {
    if (finaleTriggeredRef.current) return;
    finaleTriggeredRef.current = true;
    endHoldCard4();
    setHintHidden(true);
    setShowBanner(true);
    launchCelebrationFireworks();
  }, [endHoldCard4, launchCelebrationFireworks]);

  const onAllCardsUnlocked = useCallback(() => {
    setAllUnlocked(true);
    setActionHint("🔥 ТЕПЕР ЗАТИСНИ Й ТРИМАЙ 4-ТЕ ВІКОНЕЧКО!");
  }, []);

  const revealCard = useCallback(
    (index: number) => {
      const state = cardsStateRef.current;
      if (index > 0 && !state[index - 1]) {
        setBouncePrev(index - 1);
        window.setTimeout(() => setBouncePrev(null), 800);
        setActionHint(`Спочатку відкрий картку №${index}! 🔑`);
        return;
      }
      if (state[index]) return;

      const next = [...state];
      next[index] = true;
      cardsStateRef.current = next;
      setCardsState(next);

      if (index < 3) {
        setActionHint(`Відкривай віконечко №${index + 2}! ✨`);
      } else {
        onAllCardsUnlocked();
      }

      if (!prefersReducedMotion()) {
        try {
          const pitches = [320, 400, 480, 560];
          soundsRef.current?.playFlipSound(pitches[index]);
        } catch {
          // Ignore audio failures so card flow keeps working.
        }
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.65 } });
      }
    },
    [onAllCardsUnlocked],
  );

  const handleCard4Click = () => {
    const state = cardsStateRef.current;
    if (!state[2]) {
      revealCard(3);
      return;
    }
    if (!state[3]) revealCard(3);
  };

  const startHoldCard4 = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardsStateRef.current[3] || finaleTriggeredRef.current) return;
    e.preventDefault();

    holdingRef.current = true;
    const start = Date.now();

    const step = () => {
      if (!holdingRef.current) return;
      const progress = Math.min((Date.now() - start) / HOLD_DURATION, 1);
      setHoldProgress(progress);
      if (progress < 1) {
        holdRafRef.current = requestAnimationFrame(step);
      }
    };

    holdRafRef.current = requestAnimationFrame(step);
    holdTimeoutRef.current = setTimeout(() => {
      if (holdingRef.current) triggerGrandFinale();
    }, HOLD_DURATION);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 sm:p-6 relative select-none">
      <div className="glow-bg w-96 h-96 bg-purple-600 top-10 -left-20 animate-pulse" />
      <div className="glow-bg w-96 h-96 bg-pink-500 bottom-10 -right-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="glow-bg w-80 h-80 bg-indigo-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center my-auto py-8">
        <header className="text-center mb-8 sm:mb-12 transition-all duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-pink-300 mb-4 shadow-lg animate-float">
            <Code2 className="size-3.5 text-purple-400" aria-hidden="true" />
            <span>Special Release v2.026 • Birthday Edition</span>
            <Sparkles className="size-3.5 text-amber-300" aria-hidden="true" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 tracking-tight font-display drop-shadow-md">
            Особливе Привітання
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-md mx-auto font-medium transition-all duration-300">
            Натискай на віконечка по черзі, щоб відкрити секретне ім&apos;я! ✨
          </p>
        </header>

        <LetterCards
          letters={LETTERS}
          cardsState={cardsState}
          allUnlocked={allUnlocked}
          bouncePrev={bouncePrev}
          holdProgress={holdProgress}
          onReveal={revealCard}
          onCard4Click={handleCard4Click}
          onHoldStart={startHoldCard4}
          onHoldEnd={endHoldCard4}
        />

        {!hintHidden && (
          <div className="w-full max-w-md text-center h-12 flex items-center justify-center my-2" aria-live="polite" aria-atomic="true">
            <span className="text-xs sm:text-sm font-semibold text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
              {actionHint}
            </span>
          </div>
        )}

        {showBanner && <FinaleBanner onCelebrate={launchCelebrationFireworks} />}
      </main>

      <footer className="relative z-10 text-center text-xs text-slate-500 py-4">
        Створено з любов&apos;ю та повагою для найкрутішої айтішниці Каті 💻✨
      </footer>
    </div>
  );
}
