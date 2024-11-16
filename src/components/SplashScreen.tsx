import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSecondLine(true), 600);
    const timer2 = setTimeout(() => onComplete(), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 260
          }}
          className="inline-flex items-center gap-4 mb-2"
        >
          <div className="relative">
            <ShoppingBag 
              className="w-16 h-16 text-primary-800" 
              strokeWidth={1.5}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-xl font-serif italic text-primary-800 mt-1">BK</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <h1 className="text-4xl font-display text-primary-900 tracking-wide">
            Beyhan Kılıçarslan
          </h1>
          
          <AnimatePresence>
            {showSecondLine && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mt-1"
              >
                <p className="text-xl font-serif italic text-primary-700">
                  Kreasyon
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};