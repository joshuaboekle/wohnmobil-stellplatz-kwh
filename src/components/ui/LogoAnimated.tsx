import { motion, type Variants } from "framer-motion";
import { LOGO_VIEWBOX, logoPaths } from "../../assets/logo/logoPaths";

type LogoAnimatedProps = {
  playKey?: number | string;
  className?: string;
  onComplete?: () => void;
};

const STAGGER = 0.032;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

const pathVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 1.03 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.55, ease: "easeInOut" },
    },
  },
};

export default function LogoAnimated({ playKey, className, onComplete }: LogoAnimatedProps) {
  return (
    <motion.svg
      key={playKey}
      viewBox={LOGO_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
    >
      {logoPaths.map((path, index) => (
        <motion.path key={index} d={path.d} fill={path.fill} variants={pathVariants} />
      ))}
    </motion.svg>
  );
}
