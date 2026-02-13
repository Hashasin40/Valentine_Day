import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const HeartAnimation = ({ count = 20 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
      size: Math.random() * 20 + 15,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/30"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
          }}
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: ['0vh', '-100vh'],
            scale: [0, 1, 0.5],
            rotate: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <FaHeart style={{ fontSize: heart.size }} />
        </motion.div>
      ))}
    </div>
  );
};

export default HeartAnimation;
