"use client";

import { Cake, Rocket } from "lucide-react";

type FinaleBannerProps = {
  onCelebrate: () => void;
};

export function FinaleBanner({ onCelebrate }: FinaleBannerProps) {
  return (
    <section className="w-full max-w-2xl mt-6 animate-banner-in">
      <div className="bg-slate-900/80 backdrop-blur-2xl border-2 border-pink-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 text-center relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

        <div className="inline-flex p-3 bg-pink-500/20 rounded-2xl text-pink-400 mb-4 animate-bounce">
          <Cake className="size-8 sm:size-10" aria-hidden="true" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300 font-display mb-4">
          🎉 З Днем Народження, Катю! 🎂✨
        </h2>

        <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          <p className="font-medium">
            Бажаю, щоб у твоєму житті всі завдання та ідеї закривалися з першої спроби, а кожен день повертав тільки{" "}
            <code className="bg-indigo-950 px-2 py-0.5 rounded text-pink-300 border border-indigo-800/60 font-mono text-xs">
              status: 200 OK
            </code>
            !
          </p>
          <p className="text-slate-300 text-xs sm:text-sm italic">
            Нехай дебагінг життєвих ситуацій проходить миттєво, сервери щастя працюють без перебоїв, а поруч завжди буде надійна
            команда й затишок! 🚀💖
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCelebrate}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
          >
            <Rocket className="size-4" aria-hidden="true" />
            <span>Запустити Салют ще раз! (&quot;Бу-бух!&quot;)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
