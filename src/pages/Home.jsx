import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import HeartAnimation from '../components/HeartAnimation';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-rose-200 to-pink-400" />

      {/* Animated hearts */}
      <HeartAnimation count={25} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl mx-auto px-8 sm:px-12 py-12"
        >
          {/* Main heart icon */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm shadow-lg"
            >
              <FaHeart className="w-12 h-12 text-white animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Valentine's Day
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-white/90 mb-8 font-light"
          >
            Buat ucapan istimewa untuk orang tersayang
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px w-16 bg-white/50" />
            <FaHeart className="text-white/70" />
            <div className="h-px w-16 bg-white/50" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-pink-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaHeart className="w-5 h-5" />
                <span >Buat Ucapan Valentine</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/valentine/demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600/80 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              >
                Lihat Contoh
              </Link>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: '💝', title: 'Romantis', desc: 'Desain yang indah' },
              { icon: '🎨', title: 'Customizable', desc: 'Pilih tema favorit' },
              { icon: '📱', title: 'Mudah Dibagi', desc: 'Share link dengan mudah' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-4 left-0 right-0 text-center text-white/60 text-sm"
      >
        Made with ❤️ for Valentine's Day
      </motion.div>
    </div>
  );
};

export default Home;
