import { useState, useRef, useLayoutEffect, useMemo } from "react";

const PINKS = ["#ff2f9e", "#ff6fc4", "#ffa8d8", "#ffd3ea", "#ff8fd1"];

function Gene({ color }) {
  return (
    <svg viewBox="0 0 60 140" width="60" height="140">
      <path
        d="M10 5 C 40 25, 5 45, 35 65 C 55 80, 10 100, 40 120 C 50 128, 45 133, 40 137"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M50 5 C 20 25, 55 45, 25 65 C 5 80, 50 100, 20 120 C 10 128, 15 133, 20 137"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <g stroke={color} strokeWidth="1.6" strokeLinecap="round">
        <line x1="14" y1="14" x2="46" y2="14" />
        <line x1="20" y1="34" x2="40" y2="34" />
        <line x1="12" y1="55" x2="48" y2="55" />
        <line x1="22" y1="75" x2="38" y2="75" />
        <line x1="14" y1="95" x2="46" y2="95" />
        <line x1="20" y1="115" x2="40" y2="115" />
      </g>
    </svg>
  );
}

function Neuron({ color }) {
  return (
    <svg viewBox="0 0 100 100" width="70" height="70">
      <circle cx="50" cy="46" r="12" fill={color} opacity="0.9" />
      <g stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M50 34 C 44 20, 34 16, 24 10" />
        <path d="M50 34 C 54 18, 62 14, 70 8" />
        <path d="M40 44 C 22 40, 14 44, 6 40" />
        <path d="M40 50 C 24 56, 16 60, 8 66" />
        <path d="M60 44 C 78 40, 86 44, 94 42" />
        <path d="M55 56 C 65 72, 70 86, 66 98" />
      </g>
      <circle cx="66" cy="98" r="2" fill={color} />
    </svg>
  );
}

function FloatingBackground() {
  const shapes = useMemo(() => {
    const count = 18;
    return Array.from({ length: count }, (_, i) => {
      const isGene = i % 2 === 0;
      const color = PINKS[i % PINKS.length];
      const size = 0.6 + Math.random() * 1.3;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const dx1 = (Math.random() * 100 - 50).toFixed(0) + "px";
      const dy1 = (Math.random() * 100 - 50).toFixed(0) + "px";
      const rot1 = (Math.random() * 20 - 10).toFixed(0) + "deg";
      const dx = (Math.random() * 140 - 70).toFixed(0) + "px";
      const dy = (Math.random() * 140 - 70).toFixed(0) + "px";
      const rot = (Math.random() * 40 - 20).toFixed(0) + "deg";
      const duration = (14 + Math.random() * 16) * 0.8;
      const delay = -Math.random() * duration;
      const opacity = 0.14 + Math.random() * 0.26;
      return { id: i, isGene, color, size, top, left, dx1, dy1, rot1, dx, dy, rot, duration, delay, opacity };
    });
  }, []);

  return (
    <div className="floating-bg" aria-hidden="true">
      {shapes.map((s) => (
        <div
          key={s.id}
          className="drift"
          style={{
            position: "absolute",
            top: s.top + "%",
            left: s.left + "%",
            opacity: s.opacity,
            filter: `drop-shadow(0 0 4px ${s.color}) drop-shadow(0 0 12px ${s.color}) drop-shadow(0 0 22px ${s.color})`,
            "--sc": s.size.toFixed(2),
            "--dx1": s.dx1,
            "--dy1": s.dy1,
            "--rot1": s.rot1,
            "--dx": s.dx,
            "--dy": s.dy,
            "--rot": s.rot,
            animationDuration: s.duration.toFixed(1) + "s",
            animationDelay: s.delay.toFixed(1) + "s",
          }}
        >
          {s.isGene ? <Gene color={s.color} /> : <Neuron color={s.color} />}
        </div>
      ))}
    </div>
  );
}

function Wordmark() {
  const wordmarkRef = useRef(null);
  const hillockRef = useRef(null);
  const firstLetterRef = useRef(null);
  const p53Ref = useRef(null);
  const [p53Left, setP53Left] = useState(0);
  const [padLeft, setPadLeft] = useState(0);

  useLayoutEffect(() => {
    function place() {
      if (!hillockRef.current || !p53Ref.current || !firstLetterRef.current) return;
      const hWidth = firstLetterRef.current.getBoundingClientRect().width;
      const p53Width = p53Ref.current.getBoundingClientRect().width;
      // Right edge of P53 lands at half the width of the "H", so it only covers half of it.
      const left = hWidth * 0.5 - p53Width;
      setP53Left(left);
      setPadLeft(Math.max(0, -left));
    }
    place();
    window.addEventListener("resize", place);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(place);
    }
    return () => window.removeEventListener("resize", place);
  }, []);

  return (
    <div className="wordmark" ref={wordmarkRef} style={{ marginLeft: padLeft }}>
      <span className="hillock" ref={hillockRef}>
        <span ref={firstLetterRef}>H</span>illock
      </span>
      <span className="p53" ref={p53Ref} style={{ left: p53Left }} aria-hidden="true">
        <span className="g1">P</span>
        <span className="g2">5</span>
        <span className="g3">3</span>
      </span>
    </div>
  );
}

function PhotoPlaceholder({ label, image, onChange }) {
  return (
    <label className={"photo-placeholder" + (image ? " has-image" : "")} style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <input
        type="file"
        accept="image/*"
        aria-label={label}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => onChange(ev.target.result);
          reader.readAsDataURL(file);
        }}
      />
      <span className="photo-hint">Click to add photo</span>
    </label>
  );
}

export default function P53Hillock() {
  const [page, setPage] = useState("home");
  const [photos, setPhotos] = useState({ shreeya: null, trupti: null });

  return (
    <div className="p53-hillock-root">
      <style>{`
        .p53-hillock-root {
          --bg: #030004;
          --pink-hot: #ff2f9e;
          --pink-bright: #ff6fc4;
          --pink-soft: #ffa8d8;
          --pink-pale: #ffd3ea;
          --text-primary: #fbeaf4;
          --text-muted: #b98da4;
          --hairline: rgba(255, 143, 201, 0.22);
          --font-script: 'Herr Von Muellerhoff', 'Segoe Script', cursive;
          --font-p53: 'Times New Roman', Times, serif;
          --font-display: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
          --font-body: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          position: relative;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--font-body);
          overflow: hidden;
        }
        .floating-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .drift {
          animation-name: drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg) scale(var(--sc)); }
          50% { transform: translate(var(--dx1), var(--dy1)) rotate(var(--rot1)) scale(var(--sc)); }
          100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(var(--sc)); }
        }
        nav {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px clamp(20px, 5vw, 56px);
        }
        .nav-mark {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-mark em { font-style: normal; color: var(--pink-bright); }
        .nav-links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
        .nav-links button {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--text-muted);
          cursor: pointer;
          padding-bottom: 3px;
          border-bottom: 1px solid transparent;
        }
        .nav-links button[aria-current="page"], .nav-links button:hover {
          color: var(--pink-pale);
          border-bottom-color: var(--pink-hot);
        }
        .hero {
          position: relative;
          z-index: 1;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .wordmark {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          line-height: 1;
        }
        .wordmark .hillock {
          font-family: var(--font-script);
          font-size: clamp(4.2rem, 13vw, 9rem);
          font-style: italic;
          letter-spacing: -0.01em;
          display: inline-block;
          transform: skewX(-12deg);
          color: var(--pink-pale);
          text-shadow: 0 0 18px rgba(255,168,216,0.55), 0 0 46px rgba(255,111,196,0.3);
          white-space: nowrap;
        }
        .wordmark .p53 {
          position: absolute;
          top: 26%;
          transform: translateY(-50%);
          font-family: var(--font-p53);
          font-weight: 700;
          font-size: clamp(4.368rem, 14.112vw, 9.408rem);
          white-space: nowrap;
          display: inline-flex;
        }
        .wordmark .p53 span { animation: pulse-glow 3.4s ease-in-out infinite; }
        .wordmark .p53 .g1 { color: #e8399a; text-shadow: 0 0 6px #ff9fd0, 0 0 18px #e8399a, 0 0 40px #e8399a, 0 0 70px rgba(232,57,154,0.6); }
        .wordmark .p53 .g2 { color: #d13d8f; text-shadow: 0 0 6px #ffabd8, 0 0 16px #d13d8f, 0 0 36px #d13d8f, 0 0 64px rgba(209,61,143,0.55); animation-delay: 0.5s; }
        .wordmark .p53 .g3 { color: #b8367e; text-shadow: 0 0 6px #ffb5dc, 0 0 16px #b8367e, 0 0 38px #b8367e, 0 0 68px rgba(184,54,126,0.5); animation-delay: 1s; }
        @keyframes pulse-glow { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.28); } }
        .people-header { position: relative; z-index: 1; padding: 60px 24px 0; text-align: center; }
        .people-grid {
          position: relative;
          z-index: 1;
          max-width: 920px;
          margin: 0 auto;
          padding: 40px 24px 100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
        }
        @media (max-width: 720px) { .people-grid { grid-template-columns: 1fr; } }
        .photo-placeholder {
          position: relative;
          aspect-ratio: 1 / 1;
          width: 100%;
          border: 1.5px dashed var(--hairline);
          border-radius: 6px;
          background-color: rgba(255,111,196,0.06);
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .photo-placeholder.has-image { border-style: solid; }
        .photo-placeholder.has-image .photo-hint { display: none; }
        .photo-placeholder input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
        .person-name { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; margin: 24px 0 4px; }
        .person-role { color: var(--pink-bright); font-size: 0.94rem; margin: 0 0 16px; }
        .person-links a { color: var(--pink-pale); text-decoration: none; border-bottom: 1px solid var(--hairline); font-size: 0.92rem; }
        .person-links a:hover { border-bottom-color: var(--pink-hot); }
      `}</style>

      <FloatingBackground />

      <nav>
        <button className="nav-mark" onClick={() => setPage("home")}>
          p53 <em>Hillock</em>
        </button>
        <ul className="nav-links">
          <li>
            <button aria-current={page === "home" ? "page" : undefined} onClick={() => setPage("home")}>
              Home
            </button>
          </li>
          <li>
            <button aria-current={page === "people" ? "page" : undefined} onClick={() => setPage("people")}>
              People
            </button>
          </li>
        </ul>
      </nav>

      {page === "home" && (
        <header className="hero">
          <Wordmark />
        </header>
      )}

      {page === "people" && (
        <>
          <div className="people-header">
            <h2 style={{ fontFamily: "var(--font-display)" }}>People</h2>
          </div>
          <div className="people-grid">
            <article>
              <PhotoPlaceholder
                label="Upload photo of Shreeya Kanoji"
                image={photos.shreeya}
                onChange={(img) => setPhotos((p) => ({ ...p, shreeya: img }))}
              />
              <h3 className="person-name">Shreeya Kanoji</h3>
              <p className="person-role">Founder &amp; main scientist</p>
              <p className="person-links">
                <a href="https://instagram.com/codewithracoon" target="_blank" rel="noopener noreferrer">
                  @codewithracoon
                </a>
              </p>
            </article>
            <article>
              <PhotoPlaceholder
                label="Upload photo of Trupti Desai"
                image={photos.trupti}
                onChange={(img) => setPhotos((p) => ({ ...p, trupti: img }))}
              />
              <h3 className="person-name">Trupti Desai</h3>
              <p className="person-role">CEO</p>
            </article>
          </div>
        </>
      )}
    </div>
  );
}
