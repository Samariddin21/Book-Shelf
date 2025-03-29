import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // 2 секунды на отображение

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 1.2, ease: "easeInOut" },
          }}
        >
          <Image
            src="/logo.png"
            alt="Welcome"
            width={300}
            height={150}
            className="mt-[-20px] mb-10" // Немного выше
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
