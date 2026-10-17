"use client";

import { Lock } from "lucide-react";
import type { LetterCard } from "@/app/lib/constants";

type LetterCardsProps = {
  letters: readonly LetterCard[];
  cardsState: boolean[];
  allUnlocked: boolean;
  bouncePrev: number | null;
  holdProgress: number;
  onReveal: (index: number) => void;
  onCard4Click: () => void;
  onHoldStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onHoldEnd: () => void;
};

export function LetterCards({
  letters,
  cardsState,
  allUnlocked,
  bouncePrev,
  holdProgress,
  onReveal,
  onCard4Click,
  onHoldStart,
  onHoldEnd,
}: LetterCardsProps) {
  const ringOffset = 276 - holdProgress * 276;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl px-2 mb-8" aria-label="Картки з літерами">
      {letters.map((card, index) => {
        const flipped = cardsState[index];
        const lockedDim = index > 0 && !cardsState[index - 1];
        const isCard4 = index === 3;

        const activate = () => {
          if (isCard4) onCard4Click();
          else onReveal(index);
        };

        return (
          <div
            key={card.letter}
            id={`card-${index}`}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={
              flipped
                ? isCard4 && allUnlocked
                  ? "Затисни й тримай для салюту"
                  : `Літера ${card.letter}`
                : `Відкрити картку ${index + 1}`
            }
            className={[
              "perspective-1000 h-40 sm:h-52 w-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400",
              lockedDim ? "opacity-80" : "",
              flipped ? "card-flipped" : "",
              isCard4 && allUnlocked ? "active-pulse relative" : "",
              bouncePrev === index ? "animate-bounce" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={activate}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
              }
            }}
            onMouseDown={isCard4 ? onHoldStart : undefined}
            onMouseUp={isCard4 ? onHoldEnd : undefined}
            onMouseLeave={isCard4 ? onHoldEnd : undefined}
            onTouchStart={isCard4 ? onHoldStart : undefined}
            onTouchEnd={isCard4 ? onHoldEnd : undefined}
          >
            <div className="card-inner">
              <div className="card-front bg-slate-900/70 backdrop-blur-xl border-2 border-indigo-500/40 hover:border-pink-500/80 shadow-2xl flex flex-col items-center justify-center p-4 text-center group">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3 group-hover:bg-pink-500/30 transition-colors">
                  <span className="text-indigo-300 font-bold text-lg group-hover:text-pink-300">{index + 1}</span>
                </div>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Натисни</span>
                <Lock className="text-slate-500 mt-2 size-3.5 transition-transform group-hover:scale-110" aria-hidden="true" />
              </div>

              <div
                className={`card-back bg-gradient-to-br ${card.back} border-2 shadow-2xl flex flex-col items-center justify-center p-4 ${isCard4 ? "relative overflow-hidden" : ""}`}
              >
                {isCard4 && allUnlocked && (
                  <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="6"
                      strokeDasharray="276"
                      strokeDashoffset={ringOffset}
                      strokeLinecap="round"
                      className="hold-progress-ring"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                )}
                <span
                  className={`text-5xl sm:text-7xl font-extrabold text-white font-display drop-shadow-lg ${
                    isCard4 && allUnlocked ? "animate-bounce" : ""
                  }`}
                >
                  {card.letter}
                </span>
                <span
                  className={`text-[10px] sm:text-xs uppercase tracking-widest mt-2 font-semibold text-center ${card.label} ${
                    isCard4 && allUnlocked ? "text-amber-200 font-black" : ""
                  }`}
                >
                  {isCard4 && allUnlocked ? "Затисни для Салюту! 🎆" : card.step}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
