import { motion, MotionValue, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
  text: string;
  progress: MotionValue<number>;
  className?: string;
}

const Word = ({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>; 
  range: [number, number];
}) => {
  // Map progress to opacity for this specific word
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  return (
    
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
};

const ScrollTextReveal = ({ text, progress, className = "" }: ScrollTextRevealProps) => {
  const words = text.split(" ");
  
  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        // Extend the end value to cover 3 words length for a much smoother crossfade wave
        const end = Math.min(start + (3 / words.length), 1);
        return (
          <Word
            key={`${i}-${word}`}
            word={word}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};

export default ScrollTextReveal;
