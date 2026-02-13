import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import HeartAnimation from '../components/HeartAnimation';

const NotFound = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300" />

      {/* Animated hearts */}
      <HeartAnimation count={15} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Animated 404 */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
            className="text-9xl mb-4"
          >
            💔
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Halaman tidak ditemukan
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg"
              >
                <FaHeart className="w-5 h-5" />
                Kembali ke Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:bg-pink-50 transition-all shadow-lg border-2 border-pink-200"
              >
                <FaArrowLeft className="w-4 h-4" />
                Buat Ucapan Baru
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 left-0 right-0 text-center"
      >
        <p className="text-gray-500 text-sm">
          Mungkin link yang kamu ikuti sudah kadaluarsa 💕
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
