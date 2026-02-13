import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { themes } from '../utils/storage';

const ValentineCard = ({ data, cardRef }) => {
  const theme = themes[data.theme] || themes.pink;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        relative w-full max-w-md mx-auto rounded-3xl overflow-hidden
        ${theme.cardBg} backdrop-blur-xl
        ${theme.cardBorder} border-2
        ${theme.shadow} shadow-2xl
        p-8
      `}
    >
      {/* Decorative hearts */}
      <div className="absolute top-4 right-4 text-pink-300/50">
        <FaHeart className="w-6 h-6" />
      </div>
      <div className="absolute bottom-4 left-4 text-pink-300/30">
        <FaHeart className="w-4 h-4" />
      </div>

      {/* Photo section */}
      {data.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-6"
        >
          <div className={`relative rounded-2xl overflow-hidden ${theme.shadow} shadow-lg`}>
            <img
              src={data.image}
              alt="Valentine"
              className="w-full h-64 object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-20`} />
          </div>
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className={`text-3xl font-bold ${theme.accentColor} mb-2`}>
          Happy Valentine's Day
        </h2>
        <div className="flex items-center justify-center gap-2 text-pink-400">
          <FaHeart className="w-4 h-4 animate-pulse" />
          <span className="text-sm">14 February 2026</span>
          <FaHeart className="w-4 h-4 animate-pulse" />
        </div>
      </motion.div>

      {/* Names */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center mb-6"
      >
        <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">
          Dari
        </p>
        <p className={`text-2xl font-bold ${theme.textColor}`}>
          {data.sender || 'Someone'}
        </p>
        <div className="flex items-center justify-center my-3">
          <FaHeart className={`${theme.accentColor} w-5 h-5 mx-2`} />
        </div>
        <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">
          Untuk
        </p>
        <p className={`text-2xl font-bold ${theme.textColor}`}>
          {data.receiver || 'You'}
        </p>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`
          relative p-6 rounded-2xl
          bg-gradient-to-br ${theme.gradient} bg-opacity-30
        `}
      >
        <div className="absolute -top-3 left-6">
          <span className={`text-3xl ${theme.accentColor}`}>"</span>
        </div>
        <p className={`${theme.textColor} text-lg leading-relaxed text-center font-medium`}>
          {data.message || 'Tidak ada pesan...'}
        </p>
        <div className="absolute -bottom-3 right-6">
          <span className={`text-3xl ${theme.accentColor}`}>"</span>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-xs text-gray-400">
          Dibuat dengan ❤️ untukmu
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ValentineCard;
