import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -90; // navbar height adjust
        const y =
          el.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    // 🔥 Retry until element exists (handles lazy + animations)
    const interval = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        scroll();
        clearInterval(interval);
      }
    }, 100);

    // safety stop
    setTimeout(() => clearInterval(interval), 2000);

    return () => clearInterval(interval);
  }, [location]);

  return null;
};

export default ScrollToHashElement;