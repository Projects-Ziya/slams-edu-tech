  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import { HelmetProvider } from "react-helmet-async";
  import Lenis from 'lenis';

  import App from './App.tsx'


  // Lenis smooth scroll — tuned for premium silky feel
  export const lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
    smoothWheel: true,
    wheelMultiplier: 0.9,   // slightly less sensitive — prevents abrupt jumps
    touchMultiplier: 1.8,   // responsive on mobile
    infinite: false,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)


  createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <HelmetProvider>
        <App />
      </HelmetProvider>
        </StrictMode>,
  )
