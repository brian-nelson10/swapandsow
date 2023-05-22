import React from 'react';
import { motion } from 'framer-motion';

const letters = ['S', 'w', 'a', 'p', ' ', '&', ' ', 'S', 'o', 'w'];

const staggerDelay = 0.2;

const AnimateLetters = () => {
  return (
    <div className="">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: index * staggerDelay, duration: 0.8 }}
          className="mx-1"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimateLetters;
