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

      /* ── Phase 1: slide-in panels ── */
      overlay.classList.add("pt-enter");

      // After panels fully cover → swap page
      setTimeout(() => {
        navigate(to);
        window.scrollTo(0, 0);
      }, 650);

      // Phase 2: slide-out after page mounted
      setTimeout(() => {
        overlay.classList.add("pt-exit");
      }, 750);

      // Cleanup
      setTimeout(() => {
        overlay.classList.remove("pt-enter", "pt-exit");
        isAnimating.current = false;
      }, 1350);
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      {/* ── OVERLAY ── */}
      <div ref={overlayRef} className="page-transition-overlay" aria-hidden="true">
        {/* Left blue panel */}
        <div className="pt-panel pt-panel--left" />

        {/* Centre black column */}
        <div className="pt-panel pt-panel--center">
          {/* Brand crest */}
          <div className="pt-crest">
            <img src={logo} alt="SLAMS" className="pt-logo" />
            {/* Animated ring */}
            <div className="pt-ring" />
            <div className="pt-ring pt-ring--2" />
          </div>
        </div>

        {/* Right blue panel */}
        <div className="pt-panel pt-panel--right" />

        {/* Vignette layer */}
        <div className="pt-vignette" />

        {/* Scanline texture */}
        <div className="pt-scanlines" />
      </div>

      <style>{`
        /* ══════════════════════════════════════
           BASE OVERLAY
        ══════════════════════════════════════ */
        .page-transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          pointer-events: none;
          overflow: hidden;
        }

        /* ══════════════════════════════════════
           PANELS
        ══════════════════════════════════════ */
        .pt-panel {
          position: absolute;
          top: 0;
          height: 100%;
          will-change: transform;
        }

        /* LEFT — premium blue-black, slides in from left */
        .pt-panel--left {
          left: 0;
          width: 41%;
          background: linear-gradient(135deg, #3c81d5 0%, #1a4a8a 45%, #080e1f 100%);
          transform: translateX(-105%);
          transition: transform 0.55s cubic-bezier(0.76, 0, 0.24, 1);
          transition-delay: 0ms;
        }

        /* RIGHT — premium midnight-blue, slides in from right */
        .pt-panel--right {
          right: 0;
          width: 41%;
          background: linear-gradient(225deg, #2d6bb8 0%, #122d5e 45%, #040810 100%);
          transform: translateX(105%);
          transition: transform 0.55s cubic-bezier(0.76, 0, 0.24, 1);
          transition-delay: 80ms;
        }

        /* CENTER — solid black bar with crest */
        .pt-panel--center {
          left: 50%;
          transform: translateX(-50%) scaleY(0);
          width: 18%;
          min-width: 140px;
          background: #000000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 12vh;
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          transition-delay: 120ms;
          transform-origin: top center;
          border-left: 1px solid rgba(60, 129, 213, 0.25);
          border-right: 1px solid rgba(60, 129, 213, 0.25);
        }

        /* ══════════════════════════════════════
           VIGNETTE
        ══════════════════════════════════════ */
        .pt-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%,   transparent 40%, rgba(0,0,0,0.85) 100%),
            radial-gradient(ellipse 80% 60% at 50% 100%, transparent 40%, rgba(0,0,0,0.85) 100%),
            radial-gradient(ellipse 40% 100% at 0%   50%, transparent 30%, rgba(0,0,0,0.7)  100%),
            radial-gradient(ellipse 40% 100% at 100% 50%, transparent 30%, rgba(0,0,0,0.7)  100%);
          transition: opacity 0.4s ease 0.2s;
          z-index: 2;
        }

        /* ══════════════════════════════════════
           SCANLINES (subtle texture)
        ══════════════════════════════════════ */
        .pt-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(60, 129, 213, 0.03) 2px,
            rgba(60, 129, 213, 0.03) 4px
          );
          z-index: 3;
          transition: opacity 0.3s ease 0.25s;
        }

        /* ══════════════════════════════════════
           CREST / LOGO
        ══════════════════════════════════════ */
        .pt-crest {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(-16px) scale(0.85);
          transition: opacity 0.35s ease 0.3s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.3s;
        }

        .pt-logo {
          width: 72px;
          height: auto;
          object-fit: contain;
          filter:
            brightness(1.05)
            drop-shadow(0 0 10px rgba(60, 129, 213, 0.75))
            drop-shadow(0 0 24px rgba(60, 129, 213, 0.35));
          position: relative;
          z-index: 1;
        }

        /* Animated pulse rings */
        .pt-ring {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 1.5px solid rgba(60, 129, 213, 0.55);
          opacity: 0;
          animation: none;
        }
        .pt-ring--2 {
          width: 120px;
          height: 120px;
          border-color: rgba(60, 129, 213, 0.2);
        }

        /* ══════════════════════════════════════
           ENTER STATE — panels fly in
        ══════════════════════════════════════ */
        .page-transition-overlay.pt-enter .pt-panel--left  { transform: translateX(0); }
        .page-transition-overlay.pt-enter .pt-panel--right { transform: translateX(0); }
        .page-transition-overlay.pt-enter .pt-panel--center {
          transform: translateX(-50%) scaleY(1);
        }
        .page-transition-overlay.pt-enter .pt-vignette  { opacity: 1; }
        .page-transition-overlay.pt-enter .pt-scanlines { opacity: 1; }
        .page-transition-overlay.pt-enter .pt-crest {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .page-transition-overlay.pt-enter .pt-ring {
          opacity: 1;
          animation: pt-ring-pulse 1.2s ease-out infinite;
        }
        .page-transition-overlay.pt-enter .pt-ring--2 {
          animation-delay: 0.2s;
        }

        /* ══════════════════════════════════════
           EXIT STATE — panels fly out (opposite)
        ══════════════════════════════════════ */
        .page-transition-overlay.pt-exit .pt-panel--left {
          transform: translateX(-105%);
          transition-delay: 80ms;
        }
        .page-transition-overlay.pt-exit .pt-panel--right {
          transform: translateX(105%);
          transition-delay: 0ms;
        }
        .page-transition-overlay.pt-exit .pt-panel--center {
          transform: translateX(-50%) scaleY(0);
          transform-origin: bottom center;
          transition-delay: 0ms;
        }
        .page-transition-overlay.pt-exit .pt-vignette  { opacity: 0; transition-delay: 0s; }
        .page-transition-overlay.pt-exit .pt-scanlines { opacity: 0; transition-delay: 0s; }
        .page-transition-overlay.pt-exit .pt-crest {
          opacity: 0;
          transform: translateY(10px) scale(0.9);
          transition-delay: 0s;
        }

        /* ══════════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════════ */
        @keyframes pt-ring-pulse {
          0%   { transform: scale(0.8);  opacity: 0.8; }
          100% { transform: scale(1.5);  opacity: 0;   }
        }

        /* Blue edge glow on the panels */
        .pt-panel--left::after,
        .pt-panel--right::after {
          content: "";
          position: absolute;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(60, 129, 213, 0.7) 30%,
            rgba(80, 155, 235, 0.9) 50%,
            rgba(60, 129, 213, 0.7) 70%,
            transparent 100%
          );
          box-shadow: 0 0 14px 3px rgba(60, 129, 213, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease 0.3s;
        }
        .pt-panel--left::after  { right: 0; }
        .pt-panel--right::after { left:  0; }

        .page-transition-overlay.pt-enter .pt-panel--left::after,
        .page-transition-overlay.pt-enter .pt-panel--right::after {
          opacity: 1;
        }
        .page-transition-overlay.pt-exit .pt-panel--left::after,
        .page-transition-overlay.pt-exit .pt-panel--right::after {
          opacity: 0;
          transition-delay: 0s;
        }

        /* ══════════════════════════════════════
           BLOCK CLICK DURING ANIMATION
        ══════════════════════════════════════ */
        .page-transition-overlay.pt-enter { pointer-events: all; }
        .page-transition-overlay.pt-exit  { pointer-events: none; }
      `}</style>
    </TransitionContext.Provider>
  );
}
