<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>p53 Hillock</title>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body style="margin:0;">
<div id="root"></div>
<script type="text/babel" data-presets="react">
const { useState, useRef, useLayoutEffect, useMemo } = React;

const PINKS = ["#ff2f9e", "#ff6fc4", "#ffa8d8", "#ffd3ea", "#ff8fd1"];

const SHREEYA_PHOTO = "data:image/jpeg;base64,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";

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

function P53Hillock() {
  const [page, setPage] = useState("home");
  const [photos, setPhotos] = useState({ shreeya: SHREEYA_PHOTO, trupti: null });

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
        .person-bio { color: var(--text-muted); font-size: 0.98rem; margin: 0 0 14px; }
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
              <p className="person-bio">Brain</p>
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
              <p className="person-bio">3D bioprinting — heart</p>
            </article>
          </div>
        </>
      )}
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<P53Hillock />);
</script>
</body>
</html>
