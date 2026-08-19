import { motion } from "framer-motion";
import vanSeiteA from "../assets/icons/van-seite-1.svg";
import vanSeiteB from "../assets/icons/van-seite-2.svg";
import vanSeiteC from "../assets/icons/van-seite-3.svg";

const vanRow = [vanSeiteA, vanSeiteB, vanSeiteA, vanSeiteC, vanSeiteA, vanSeiteB];

export default function VanMarquee() {
  return (
    <div className="overflow-hidden bg-brand-yellow py-8">
      <motion.div
        className="flex w-max items-center gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[...vanRow, ...vanRow].map((src, i) => (
          <img key={i} src={src} alt="" className="h-16 w-24 shrink-0" aria-hidden="true" />
        ))}
      </motion.div>
    </div>
  );
}
