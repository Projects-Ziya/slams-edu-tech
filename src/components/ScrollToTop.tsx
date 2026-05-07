import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 🔥 delay until layout is fully painted
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 50); // small delay fixes layout shift issues

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}