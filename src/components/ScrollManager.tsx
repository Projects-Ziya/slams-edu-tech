import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { lenis } from "../main"; // ✅ import instance

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      let attempts = 0;

      const scrollToHash = () => {
        const el = document.getElementById(id);

        if (el) {
          const yOffset = -90;
          const y =
            el.getBoundingClientRect().top +
            window.scrollY +
            yOffset;

          lenis.scrollTo(y); // ✅ USE LENIS
        } else if (attempts < 10) {
          attempts++;
          setTimeout(scrollToHash, 100);
        }
      };

      scrollToHash();
    } else {
      // ✅ SCROLL TO TOP
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
}