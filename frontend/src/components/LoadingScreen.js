import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        
        <h2 className="text-2xl font-bold gradient-text mb-2">
          B.Goutham
        </h2>
        
        <p className="text-dark-400 text-sm">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;