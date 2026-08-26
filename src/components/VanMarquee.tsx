import { motion, useScroll, useTransform } from "framer-motion";
import vanSeiteA from "../assets/icons/van-seite-1.svg";
import vanSeiteB from "../assets/icons/van-seite-2.svg";
import vanSeiteC from "../assets/icons/van-seite-3.svg";

const vanRow = [vanSeiteA, vanSeiteB, vanSeiteA, vanSeiteC, vanSeiteA, vanSeiteB, vanSeiteA, vanSeiteC];

// Statt eines automatischen Loops wird die horizontale Position an den
// vertikalen Scroll-Fortschritt der gesamten Seite gekoppelt: scrollt der
// Nutzer nach unten, "scrollt" das Van-Band mit nach links.
export default function VanMarquee() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["-60%", "0%"]);

  return (
    <div className="overflow-hidden bg-arctis-white py-8">
      <motion.div className="flex w-max items-center gap-6" style={{ x }}>
        {[...vanRow, ...vanRow].map((src, i) => (
          <img key={i} src={src} alt="" className="h-24 w-36 shrink-0 sm:h-32 sm:w-48" aria-hidden="true" />
        ))}
      </motion.div>
    </div>
  );
}
