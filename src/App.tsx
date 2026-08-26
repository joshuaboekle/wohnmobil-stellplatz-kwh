import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Impressum from "./pages/Impressum";

// Springt bei Klick-Navigation (PUSH) an den Seitenanfang, damit z. B. "Stellplatz
// buchen" nicht den Scroll-Stand der vorherigen Seite übernimmt. Bei Zurück-
// Navigation (POP) bleibt die native Browser-Scroll-Wiederherstellung erhalten.
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function Page({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/anfrage" element={<Page><Booking /></Page>} />
          <Route path="/impressum" element={<Page><Impressum /></Page>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
