import  { useRef } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
}

const AnimatedLinkButton: React.FC<Props> = ({ to, children }) => {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = btnRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  };

  return (
    <Link
      to={to}
      ref={btnRef}
      onMouseMove={handleMouseMove}
      className="
        relative overflow-hidden
        px-6 py-2.5
        rounded-full
        border border-white
        text-white text-[15px] font-medium
        transition-colors duration-200
        group
        inline-block
      "
    >
      {/* Liquid Fill */}
      <span
        className="
          absolute
          w-0 h-0
          bg-blue-300
          rounded-full
          pointer-events-none
          transition-all duration-500 ease-out
          group-hover:w-[300px]
          group-hover:h-[300px]
        "
        style={{
          left: "var(--x)",
          top: "var(--y)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Text */}
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {children}
      </span>
    </Link>
  );
};

export default AnimatedLinkButton;