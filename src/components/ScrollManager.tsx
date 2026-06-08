import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { lenis } from "../main"; // ✅ import instance

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let adjustCleanup: (() => void) | undefined;

    if (hash) {
      const id = hash.replace("#", "");

      const performScroll = (el: HTMLElement) => {
        const getTargetY = () => {
          const currentEl = document.getElementById(id);
          if (!currentEl) return null;
          const yOffset = -90;
          return currentEl.getBoundingClientRect().top + window.scrollY + yOffset;
        };

        const targetY = getTargetY();
        if (targetY !== null) {
          lenis.scrollTo(targetY);
        }

        // Adjust scroll position after a few intervals to correct for preceding lazy-loaded layouts shifting
        const t1 = setTimeout(() => {
          const y = getTargetY();
          if (y !== null) lenis.scrollTo(y);
        }, 150);

        const t2 = setTimeout(() => {
          const y = getTargetY();
          if (y !== null) lenis.scrollTo(y);
        }, 400);

        const t3 = setTimeout(() => {
          const y = getTargetY();
          if (y !== null) lenis.scrollTo(y);
        }, 800);

        const t4 = setTimeout(() => {
          const y = getTargetY();
          if (y !== null) lenis.scrollTo(y);
        }, 1500);

        adjustCleanup = () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
          clearTimeout(t4);
        };
      };

      // 1. Try to find the element immediately
      const el = document.getElementById(id);
      if (el) {
        // Scroll to it with a slight microtask delay to ensure DOM is ready
        const readyTimeout = setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            performScroll(element);
          }
        }, 50);

        return () => {
          clearTimeout(readyTimeout);
          if (adjustCleanup) adjustCleanup();
        };
      }

      // 2. If it doesn't exist, watch the DOM for its mounting
      const observer = new MutationObserver(() => {
        const element = document.getElementById(id);
        if (element) {
          performScroll(element);
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // 3. Safety timeout to stop observing after 6 seconds
      const safetyTimeout = setTimeout(() => {
        observer.disconnect();
      }, 6000);

      return () => {
        observer.disconnect();
        clearTimeout(safetyTimeout);
        if (adjustCleanup) adjustCleanup();
      };
    } else {
      // ✅ SCROLL TO TOP
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
}