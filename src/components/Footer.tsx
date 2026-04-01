// import Particles from "./Robobg";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import Loop from "./scrolllogo/Loop";
import logo from "../assets/logo.png";


const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white px-6 sm:px-10 lg:px-20 pt-6 pb-6 relative overflow-hidden">
      <hr className="border-gray-700 pb-6"/>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

        {/* Left */}
        <div >
                           <img src={logo} alt="Logo" className="h-24 w-auto object-contain" />

          <h2 className="text-[18px] max-w-[400px] leading-snug text-center text-[#A1A1A1] md:text-left">
            Empowering future tech leaders through industry-ready training and comprehensive IT solutions. Start your journey today.
          </h2>

          <div className="flex gap-4 mt-6 justify-center md:justify-start flex-wrap">
            <a
                        title="btn"
               href="#">
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
              href="#"
              className="hover:bg-blue-600 rounded-md w-8 h-8 flex items-center justify-center transition-colors duration-300"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div className="grid grid-cols-2 gap-8 sm:gap-10 text-center md:text-left pt-10">
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white transition">Home</li>
              <li className="hover:text-white transition">Services</li>
              <li className="hover:text-white transition">Works</li>
            </ul>
          </div>

          <div className="mt-0 md:mt-8 lg:mt-0">
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white transition">Careers</li>
              <li className="hover:text-white transition">About us</li>
              <li className="hover:text-white transition">Contact us</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left pt-10">
          <h3 className="text-lg font-medium mb-4">Contact Us</h3>

          <div className="space-y-4 text-gray-400 text-sm sm:text-base">
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <FiMapPin className="mt-1 flex-shrink-0" />
              <p>
                Slam edu tech, Muppathadam junction, opposite surya
                opticals Edayar, Aluva, Kochi, Kerala 683110
              </p>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FiPhone />
              <p>+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FiMail />
              <p>slamedutech@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Big SLAMS Text */}
      <div className="relative mt-6 mb-4">
        <div className="p-4">
          <Loop/>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-gray-500 gap-3">
        <p>© 2026 slam. All rights reserved</p>

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