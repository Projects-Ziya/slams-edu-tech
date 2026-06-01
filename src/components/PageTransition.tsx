import { createContext, useContext, useRef, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/slamslogo.png";

/* ─────────────────────────────────────────────
   Context — lets any child trigger a transition
───────────────────────────────────────────── */
interface TransitionContextValue {
  navigateTo: (to: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

/* ─────────────────────────────────────────────
   Provider + Overlay
───────────────────────────────────────────── */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const navigateTo = useCallback(
    (to: string) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const overlay = overlayRef.current;
      if (!overlay) {
        navigate(to);
        isAnimating.current = false;
        return;
      }

      /* ── Phase 1: panels sweep in ── */
      overlay.classList.add("pt-enter");

      // Swap page once panels fully cover screen
      setTimeout(() => {
        navigate(to);
        window.scrollTo(0, 0);
      }, 800);

      // Phase 2: panels sweep out
      setTimeout(() => {
        overlay.classList.add("pt-exit");
      }, 980);

      // Cleanup
      setTimeout(() => {
        overlay.classList.remove("pt-enter", "pt-exit");
        isAnimating.current = false;
      }, 1780);
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      {/* ── OVERLAY ── */}
      <div ref={overlayRef} className="page-transition-overlay" aria-hidden="true">
        {/* Left panel — sweeps in from left, covers left half */}
        <div className="pt-panel pt-panel--left" />

        {/* Right panel — sweeps in from right, covers right half */}
        <div className="pt-panel pt-panel--right" />

        {/* Logo — floats above both panels, centred on screen */}
        <div className="pt-crest">
          <img src={logo} alt="SLAMS" className="pt-logo" />
          <div className="pt-ring" />
          <div className="pt-ring pt-ring--2" />
          <div className="pt-ring pt-ring--3" />
        </div>

        {/* Vignette darkens the very edges */}
        <div className="pt-vignette" />
      </div>

      <style>{`
        /* ══════════════════════════════════════
           BASE OVERLAY
        ══════════════════════════════════════ */
        .page-transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          overflow: hidden;
        }

        /* ══════════════════════════════════════
           PANELS — each 50%, meet at centre seam
        ══════════════════════════════════════ */
        .pt-panel {
          position: absolute;
          top: 0;
          height: 100%;
          width: 51%;           /* tiny 2% overlap kills any 1px seam gap */
          will-change: transform;
        }

        /* LEFT panel — enters from left, exits to left */
        .pt-panel--left {
          left: 0;
          background: linear-gradient(
            160deg,
            #3c81d5 0%,
            #2260b0 30%,
            #0f3370 65%,
            #060d20 100%
          );
          transform: translateX(-102%);
          transition: transform 0.72s cubic-bezier(0.65, 0, 0.25, 1);
          transition-delay: 0ms;
        }

        /* RIGHT panel — enters from right, exits to right */
        .pt-panel--right {
          right: 0;
          background: linear-gradient(
            200deg,
            #060d20 0%,
            #0f3370 35%,
            #2260b0 70%,
            #3c81d5 100%
          );
          transform: translateX(102%);
          transition: transform 0.72s cubic-bezier(0.65, 0, 0.25, 1);
          transition-delay: 55ms;     /* tiny stagger = left leads, right follows */
        }

        /* ══════════════════════════════════════
           LOGO CREST — floats above panels
        ══════════════════════════════════════ */
        .pt-crest {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition:
            opacity  0.38s ease 0.45s,
            transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) 0.45s;
          z-index: 10;
        }

        .pt-logo {
          width: 68px;
          height: auto;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter:
            brightness(1.1)
            drop-shadow(0 0 10px rgba(60, 129, 213, 0.8))
            drop-shadow(0 0 28px rgba(60, 129, 213, 0.35));
        }

        /* Pulse rings around logo */
        .pt-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(60, 129, 213, 0.5);
          opacity: 0;
          width: 80px;
          height: 80px;
          animation: none;
        }
        .pt-ring--2 {
          width: 110px;
          height: 110px;
          border-color: rgba(60, 129, 213, 0.28);
        }
        .pt-ring--3 {
          width: 145px;
          height: 145px;
          border-color: rgba(60, 129, 213, 0.12);
        }

        /* ══════════════════════════════════════
           VIGNETTE — soft dark edges
        ══════════════════════════════════════ */
        .pt-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          z-index: 5;
          background:
            radial-gradient(ellipse 90% 55% at 50% 0%,   transparent 45%, rgba(0,0,0,0.7) 100%),
            radial-gradient(ellipse 90% 55% at 50% 100%, transparent 45%, rgba(0,0,0,0.7) 100%),
            radial-gradient(ellipse 35% 100% at 0%   50%, transparent 35%, rgba(0,0,0,0.55) 100%),
            radial-gradient(ellipse 35% 100% at 100% 50%, transparent 35%, rgba(0,0,0,0.55) 100%);
          transition: opacity 0.45s ease 0.2s;
        }

        /* ══════════════════════════════════════
           ENTER — panels sweep in
        ══════════════════════════════════════ */
        .page-transition-overlay.pt-enter .pt-panel--left  { transform: translateX(0); }
        .page-transition-overlay.pt-enter .pt-panel--right { transform: translateX(0); }

        .page-transition-overlay.pt-enter .pt-vignette { opacity: 1; }

        .page-transition-overlay.pt-enter .pt-crest {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .page-transition-overlay.pt-enter .pt-ring {
          opacity: 1;
          animation: pt-ring-pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .page-transition-overlay.pt-enter .pt-ring--2 { animation-delay: 0.22s; }
        .page-transition-overlay.pt-enter .pt-ring--3 { animation-delay: 0.44s; }

        /* Panel inner glow seam at meeting edge */
        .pt-panel--left::after,
        .pt-panel--right::after {
          content: "";
          position: absolute;
          top: 0;
          height: 100%;
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(80, 155, 235, 0.6) 25%,
            rgba(100, 175, 255, 0.85) 50%,
            rgba(80, 155, 235, 0.6) 75%,
            transparent 100%
          );
          box-shadow: 0 0 12px 2px rgba(60, 129, 213, 0.35);
          opacity: 0;
          transition: opacity 0.3s ease 0.5s;
        }
        .pt-panel--left::after  { right: 0; }
        .pt-panel--right::after { left: 0; }

        .page-transition-overlay.pt-enter .pt-panel--left::after,
        .page-transition-overlay.pt-enter .pt-panel--right::after {
          opacity: 1;
        }

        /* ══════════════════════════════════════
           EXIT — panels sweep out (reversed)
        ══════════════════════════════════════ */
        .page-transition-overlay.pt-exit .pt-panel--left {
          transform: translateX(-102%);
          transition-delay: 55ms;   /* right exits first, left follows */
        }
        .page-transition-overlay.pt-exit .pt-panel--right {
          transform: translateX(102%);
          transition-delay: 0ms;
        }

        .page-transition-overlay.pt-exit .pt-vignette {
          opacity: 0;
          transition-delay: 0s;
        }
        .page-transition-overlay.pt-exit .pt-crest {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.85);
          transition-delay: 0s;
        }
        .page-transition-overlay.pt-exit .pt-panel--left::after,
        .page-transition-overlay.pt-exit .pt-panel--right::after {
          opacity: 0;
          transition-delay: 0s;
        }

        /* ══════════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════════ */
        @keyframes pt-ring-pulse {
          0%   { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(1.6);  opacity: 0;   }
        }

        /* ══════════════════════════════════════
           BLOCK CLICKS DURING ANIMATION
        ══════════════════════════════════════ */
        .page-transition-overlay.pt-enter { pointer-events: all; }
        .page-transition-overlay.pt-exit  { pointer-events: none; }
      `}</style>
    </TransitionContext.Provider>
  );
}
