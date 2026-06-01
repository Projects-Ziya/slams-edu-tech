import GooeyNav from "./GooeyNav ";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import logo from "../assets/slamslogo.png";
import { HashLink } from "react-router-hash-link";
import { lenis } from "../main";
import { usePageTransition } from "./PageTransition";

const Navbar: React.FC = () => {
  const items = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/service" },
    { label: "Works", to: "/works" },
    { label: "Careers", to: "/careers" },
    { label: "About Us", href: "#about" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { navigateTo } = usePageTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Handles logo click — same behaviour as before but via transition */
  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigateTo("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg border-blue-400/50"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="w-full mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button onClick={handleLogoClick} className="cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className="h-12 max-w-[140px] object-contain scale-[2.0] pl-5"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <GooeyNav
            items={items}
            particleCount={5}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={(() => {
              if (location.pathname === "/" && location.hash === "#about") {
                const aboutIndex = items.findIndex((item) => item.href === "#about");
                if (aboutIndex !== -1) return aboutIndex;
              }
              if (location.pathname.startsWith("/service")) {
                const idx = items.findIndex((item) => item.to === "/service");
                if (idx !== -1) return idx;
              }
              if (
                location.pathname.startsWith("/works") ||
                location.pathname.startsWith("/project")
              ) {
                const idx = items.findIndex((item) => item.to === "/works");
                if (idx !== -1) return idx;
              }
              if (
                location.pathname.startsWith("/careers") ||
                location.pathname.startsWith("/internship")
              ) {
                const idx = items.findIndex((item) => item.to === "/careers");
                if (idx !== -1) return idx;
              }
              const index = items.findIndex((item) => item.to === location.pathname);
              return index !== -1 ? index : 0;
            })()}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 4, 3, 1, 2]}
          />
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <HashLink smooth to="/#contact">
            <button className="px-6 py-2.5 rounded-full border border-white text-white text-[15px] font-medium hover:bg-white hover:text-black transition-all">
              Get a Quote
            </button>
          </HashLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-[200px] h-screen bg-black/95 backdrop-blur-xl transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center px-4 py-4 border-b border-white/10">
          <button
            title="back"
            onClick={() => setMenuOpen(false)}
            className="text-white p-2 hover:text-gray-300 transition"
          >
            <X />
          </button>
        </div>

        {/* Mobile Items */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-60px)] gap-8 text-white text-xl font-medium">
          {items.map((item, index) => {
            if (item.label === "About Us") {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setMenuOpen(false);
                    if (location.pathname === "/") {
                      const el = document.getElementById("about");
                      if (el) {
                        const yOffset = -90;
                        const y =
                          el.getBoundingClientRect().top +
                          window.scrollY +
                          yOffset;
                        lenis.scrollTo(y);
                      }
                    } else {
                      sessionStorage.setItem("scrollTo", "about");
                      navigateTo("/");
                    }
                  }}
                  className="hover:text-gray-300 transition"
                >
                  {item.label}
                </button>
              );
            }
            return (
              <button
                key={index}
                onClick={() => {
                  setMenuOpen(false);
                  if (item.to && item.to !== location.pathname) {
                    navigateTo(item.to);
                  }
                }}
                className="hover:text-gray-300 transition"
              >
                {item.label}
              </button>
            );
          })}

          {/* Mobile CTA */}
          <HashLink
            smooth
            to="/#contact"
            onClick={() => setMenuOpen(false)}
          >
            <button className="mt-6 px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition">
              Get a Quote
            </button>
          </HashLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;