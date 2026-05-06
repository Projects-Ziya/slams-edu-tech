  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import { HelmetProvider } from "react-helmet-async";
  import Lenis from 'lenis';

  import App from './App.tsx'


  // Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.7,  //RECOMENTED 1.2
    smoothWheel: true,
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
