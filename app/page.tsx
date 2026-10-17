 "use client";

import { useEffect, useState } from "react";
import { ArrowDown, Check, ChevronRight, Code2, Cpu, Heart, PartyPopper, ShieldCheck, Sparkles, Terminal, Zap } from "lucide-react";

const wishes = [
  "Щоб усі задачі вирішувалися елегантно, а не через «працює — не чіпай».",
  "Щоб дедлайни були людяними, а вихідні — недоторканними.",
  "Щоб у житті було більше релізів із фічами «радість», «подорожі» та «приємні сюрпризи».",
  "Щоб поруч були свої люди, з якими навіть складні таски стають простішими.",
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [confetti, setConfetti] = useState(false);

  const command = "npm run celebrate -- --user=Katya";
  useEffect(() => {
    if (!started) return;
    setTyped("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(command.slice(0, index));
      if (index >= command.length) window.clearInterval(timer);
    }, 36);
    return () => window.clearInterval(timer);
  }, [started]);

  function launch() {
    setStarted(true);
    setRevealed(false);
    setConfetti(false);
  }

  function reveal() {
    setRevealed(true);
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 3200);
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="topbar">
        <a className="brand" href="#top"><span className="brand-mark"><Terminal size={16} /></span> afterhours<span className="brand-dot">.dev</span></a>
        <div className="nav-status"><span className="status-dot" /> SYSTEM ONLINE</div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="eyebrow-line" /> SPECIAL OCCASION // 001 <span className="eyebrow-line" /></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="tiny-label"><Code2 size={14} /> PERSONALIZED BUILD</div>
            <h1>Hey, <span>Katya</span><br />it&apos;s your<br /><em>day.</em></h1>
            <p className="hero-subtitle">Сьогодні в продакшен виходить найкраща версія — <strong>Катя {new Date().getFullYear()}</strong>. І в цьому релізі немає жодного критичного бага.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={launch}><Zap size={17} /> Запустити протокол <ChevronRight size={17} /></button>
              <a className="text-link" href="#manifesto">Переглянути changelog <ArrowDown size={14} /></a>
            </div>
            <div className="micro-note"><ShieldCheck size={14} /> 100% good vibes · 0% робочих мітингів</div>
          </div>

          <div className="terminal-card">
            <div className="terminal-header">
              <div className="window-dots"><i /><i /><i /></div>
              <span>birthday_protocol.sh</span>
              <span className="terminal-lock"><ShieldCheck size={13} /> SAFE MODE</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line"><span className="prompt">➜</span> <span className="muted">~/celebrations</span> ./init-birthday.sh</div>
              <div className="output"><span className="success">✓</span> Loading happiness modules...</div>
              <div className="output"><span className="success">✓</span> Disabling unnecessary stress...</div>
              <div className="output"><span className="success">✓</span> Increasing good luck to 100%</div>
              <div className="output"><span className="success">✓</span> Coffee supply: <span className="pink">infinite</span></div>
              <div className="terminal-rule" />
              <div className="terminal-line"><span className="prompt">➜</span> <span className="muted">status</span></div>
              <div className="status-result"><span className="status-big">ALL SYSTEMS GO</span><span className="pulse-dot" /></div>
              <div className="terminal-footer"><span>build v{new Date().getFullYear()}.10.17</span><span>made with <Heart size={12} fill="currentColor" /> &amp; caffeine</span></div>
            </div>
          </div>
        </div>
        <div className="scroll-hint"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="protocol-section" id="protocol">
        <div className="section-kicker">01 / THE PROTOCOL</div>
        <div className="protocol-panel">
          <div className="panel-heading"><span className="panel-icon"><Terminal size={17} /></span><div><h2>Birthday Protocol</h2><p>root@good-vibes:~# ./make_day_great.sh</p></div><span className="panel-live">READY</span></div>
          <div className="command-area">
            <div className="command-label">COMMAND LINE INTERFACE</div>
            <div className="command-text"><span className="command-prompt">$</span> {started ? typed : "await birthday.initialize('Katya')"}<span className="cursor" /></div>
            <div className="command-hint">{started ? "Команда виконується. Система готує щось хороше..." : "Натисни кнопку вище, щоб запустити персональний протокол."}</div>
            {started && <button className="reveal-button" onClick={reveal} disabled={typed.length < command.length}>{revealed ? <><Check size={16} /> Протокол виконано</> : <>Відкрити повідомлення <ChevronRight size={16} /></>}</button>}
          </div>
          {revealed && <div className="success-message">
            <div className="success-orb"><PartyPopper size={24} /></div>
            <div className="success-label">DEPLOYMENT SUCCESSFUL</div>
            <h3>З днем народження, Катю! <span>✦</span></h3>
            <p>Бажаю, щоб життя частіше дивувало приємними апдейтами, поруч були надійні люди, а кожен новий день приносив хоча б одну причину усміхнутися. Нехай усе важливе складається, мрії переходять у статус <code>DONE</code>, а щастя не потребує жодних виправлень.</p>
            <div className="confetti-row" aria-hidden="true">{confetti && Array.from({length: 26}, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 0.11}s`, transform: `rotate(${i * 29}deg)` }} />)}</div>
          </div>}
        </div>
      </section>

      <section className="manifesto-section" id="manifesto">
        <div className="section-kicker">02 / RELEASE NOTES</div>
        <div className="manifesto-header"><h2>What&apos;s new<br />in <span>Katya 2.0?</span></h2><p>Офіційний changelog цього релізу.<br />Покращення вже доступні — перезапуск не потрібен.</p></div>
        <div className="wishes-grid">
          {wishes.map((wish, index) => <article className="wish-card" key={wish}><div className="wish-top"><span className="wish-number">0{index + 1}</span>{index === 0 ? <Code2 /> : index === 1 ? <Zap /> : index === 2 ? <Sparkles /> : <Heart />}</div><p>{wish}</p><span className="wish-tag">FEATURE ADDED</span></article>)}
        </div>
      </section>

      <section className="outro-section">
        <div className="outro-glow" />
        <div className="section-kicker">03 / FINAL MESSAGE</div>
        <Cpu className="outro-icon" size={29} />
        <h2>Stay awesome.<br /><span>Keep being you.</span></h2>
        <p>Нехай наступний рік буде стабільним, яскравим і повним приємних несподіванок. А якщо життя раптом видасть помилку — нехай поруч знайдеться хтось, хто допоможе натиснути «спробувати ще раз».</p>
        <div className="outro-signature"><span className="signature-line" /> end of message <span className="signature-line" /></div>
        <div className="outro-stamp"><Sparkles size={15} /> APPROVED FOR CELEBRATION</div>
      </section>

      <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><Terminal size={15} /></span> afterhours<span className="brand-dot">.dev</span></a><span>NO BUGS. JUST BIRTHDAY MAGIC.</span><span>© {new Date().getFullYear()} · KATYA.EXE</span></footer>
    </main>
  );
}