import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type HolographicWallProps = {
  intensity?: number;
  radius?: number;
};

// Pharaonic hieroglyphic symbols
const HIEROGLYPHS = [
  "𓄿",
  "𓇋",
  "𓅱",
  "𓃀",
  "𓊪",
  "𓆑",
  "𓅓",
  "𓈖",
  "𓂋",
  "𓉔",
  "𓎛",
  "𓐍",
  "𓄡",
  "𓋴",
  "𓈙",
  "𓈎",
  "𓎡",
  "𓎼",
  "𓏏",
  "𓂧",
];

export function HolographicWall({
  intensity = 0.8,
  radius = 200,
}: HolographicWallProps) {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [letters, setLetters] = useState<
    Array<{ char: string; x: number; y: number }>
  >([]);

  useEffect(() => {
    // Generate a grid of glyphs covering the whole viewport
    const generateLetters = () => {
      const gridSize = 20;
      const spacingX = window.innerWidth / gridSize;
      const spacingY = window.innerHeight / gridSize;
      const newLetters: Array<{ char: string; x: number; y: number }> = [];

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          newLetters.push({
            char: HIEROGLYPHS[Math.floor(Math.random() * HIEROGLYPHS.length)],
            x: i * spacingX,
            y: j * spacingY,
          });
        }
      }
      setLetters(newLetters);
    };

    generateLetters();
    window.addEventListener("resize", generateLetters);
    return () => window.removeEventListener("resize", generateLetters);
  }, []);

  // Track the cursor at window level so the wall works as a page-wide
  // background layer (the container itself is pointer-events-none).
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => setMousePosition(null);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-transparent"
    >
      {/* Pharaonic hieroglyphs on the wall */}
      <div className="absolute inset-0">
        {letters.map((letter, index) => {
          const distance = mousePosition
            ? Math.sqrt(
                Math.pow(letter.x - mousePosition.x, 2) +
                  Math.pow(letter.y - mousePosition.y, 2),
              )
            : Infinity;

          const letterIntensity =
            mousePosition && distance < radius
              ? Math.max(0, 1 - distance / radius) * intensity
              : 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0.15 }}
              animate={{
                opacity:
                  mousePosition && distance < radius
                    ? 0.15 + letterIntensity
                    : 0.15,
                scale: mousePosition && distance < radius ? 1.3 : 1,
                color:
                  mousePosition && distance < radius
                    ? `rgba(0, 255, 64, ${0.3 + letterIntensity})`
                    : "rgba(0, 255, 64, 0.1)",
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              className="pointer-events-none absolute select-none text-sm"
              style={{
                left: letter.x,
                top: letter.y,
                textShadow:
                  mousePosition && distance < radius
                    ? `0 0 ${letterIntensity * 25}px rgba(0, 255, 64, ${letterIntensity})`
                    : "none",
              }}
            >
              {letter.char}
            </motion.div>
          );
        })}
      </div>

      {/* Golden cursor light reflection - only around cursor */}
      {mousePosition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: intensity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0"
        >
          {/* Additional halo effect for extra glow */}
          <div
            className="absolute"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(0, 255, 64, 0.6) 0%, rgba(0, 255, 64, 0.3) 30%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

export default HolographicWall;