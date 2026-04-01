import GooeyNav from "./GooeyNav ";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { HashLink } from "react-router-hash-link";

const Navbar: React.FC = () => {
  const items = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/service" },
    { label: "Works", to: "/works" },
    { label: "Careers", to: "/careers" },
    { label: "About Us", href: "#about" }, // ✅ only this uses HashLink
    // { label: "Blog", to: "/blog" }, // ❌ no hash here now
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-16 max-w-[140px] object-contain scale-105" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <GooeyNav
            key={location.pathname}
            items={items}
            particleCount={5}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={
              items.findIndex((item) => item.to === location.pathname) || 0
            }
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
            onClick={() => setMenuOpen(false)}
            className="text-white border rounded-full p-2 hover:text-gray-300 transition"
          >
            <X />
          </button>
        </div>

        {/* Mobile Items */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-60px)] gap-8 text-white text-xl font-medium">
          {items.map((item, index) => {
            // ✅ ONLY About Us → HashLink
            if (item.label === "About Us") {
              return (
                <HashLink
                  key={index}
                  smooth
                  to={`/${item.href}`} // goes to homepage + #about
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-300 transition"
                >
                  {item.label}
                </HashLink>
              );
            }

            // ✅ All others → normal Link
            return (
              <Link
                key={index}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-300 transition"
              >
                {item.label}
              </Link>
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