// import Particles from "./Robobg";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import Loop from "./scrolllogo/Loop";
import logo from "../assets/logo.webp";
import { HashLink } from "react-router-hash-link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white px-6 sm:px-10 lg:px-20 pt-6 pb-6 relative overflow-hidden text-center md:text-left">
      <hr className="border-gray-700 pb-6" />

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

        {/* Left */}
        <div>
          <img
            src={logo}
            alt="Logo"
            className="h-24 w-auto object-contain mx-auto md:mx-0"
          />

          <h2 className="text-[18px] max-w-[400px] leading-snug text-[#A1A1A1] mx-auto md:mx-0">
            Empowering future tech leaders through industry-ready training and comprehensive IT solutions. Start your journey today.
          </h2>

          <div className="flex gap-4 mt-6 justify-center md:justify-start flex-wrap">
            <a
              title="btn"
              href="https://www.instagram.com/slams.tech?igsh=MWJnOTVrYXBtbm9tcA=="
            >
              <FaInstagram
                size={22}
                className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 rounded-md w-8 h-8 p-1 flex items-center justify-center transition-colors duration-300"
              />
            </a>

            <a
              title="btn"
              href="#"
              className="hover:bg-blue-400 rounded-md w-8 h-8 flex items-center justify-center transition-colors duration-300"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              title="btn"
              href="https://www.linkedin.com/company/slams-edutech-private-limited/"
              className="hover:bg-blue-600 rounded-md w-8 h-8 flex items-center justify-center transition-colors duration-300"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Company (Hidden on small screens) */}
        <div className="hidden lg:grid grid-cols-2 gap-8 sm:gap-10 text-center md:text-left pt-10">
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
              <li>
                <HashLink smooth to="/#hero" className="hover:text-white transition">
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#service" className="hover:text-white transition">
                  Services
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#works" className="hover:text-white transition">
                  Works
                </HashLink>
              </li>
            </ul>
          </div>

          <div className="mt-0 md:mt-8 lg:mt-10">
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
              <li>
                <HashLink smooth to="/#positions" className="hover:text-white transition">
                  Careers
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#about" className="hover:text-white transition">
                  About us
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#contact" className="hover:text-white transition">
                  Contact us
                </HashLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="pt-10">
          <h3 className="text-lg font-medium mb-4">Contact Us</h3>

          <div className="space-y-4 text-gray-400 text-sm sm:text-base">
            
            {/* 📍 Map */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Slams+edu+tech+Muppathadam+junction+Edayar+Aluva+Kochi+Kerala+683110"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 justify-center md:justify-start hover:text-white transition"
            >
              <FiMapPin className="mt-1 flex-shrink-0" />
              <p>
                Slams edu tech, Muppathadam junction, opposite surya
                opticals Edayar, Aluva, Kochi, Kerala 683110
              </p>
            </a>

            {/* 📞 Phone */}
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 justify-center md:justify-start hover:text-white transition"
            >
              <FiPhone />
              <p>+91 98765 43210</p>
            </a>

            {/* 📧 Email */}
            {/* <a
              href="https://mail.google.com/mail/?view=cm&to=slamsedutech@gmail.com&su=Enquiry%20from%20Website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center md:justify-start hover:text-white transition"
            >
              <FiMail />
              <p>slamsedutech@gmail.com</p>
            </a> */}
            <a
             href="mailto:slamsedutech@gmail.com?subject=Enquiry%20from%20Website"
  className="flex items-center gap-3 justify-center md:justify-start hover:text-white transition"
>
  <FiMail />
  <p>slamsedutech@gmail.com</p>
</a>
          </div>
        </div>
      </div>

      {/* Big SLAMS Text */}
      <div className="relative mt-6 mb-4">
        <div className="p-4">
          <Loop />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-gray-500 gap-3">
        <p>© 2026 slams. All rights reserved</p>

        <div className="flex gap-6">
          <span className="hover:text-white transition cursor-pointer">
            Privacy policy
          </span>
          <span className="hover:text-white transition cursor-pointer">
            Terms & condition
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;