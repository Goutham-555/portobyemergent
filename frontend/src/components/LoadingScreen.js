import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-20 h-20 mx-auto mb-8 border-4 border-primary-500 border-t-transparent rounded-full"
        />
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold gradient-text mb-4"
        >
          B.Goutham
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-dark-400 text-sm loading-dots"
        >
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;