import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaShare, FaDownload, FaHeart, FaCopy, FaCheck } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { getMessageById, themes } from '../utils/storage';
import ValentineCard from '../components/ValentineCard';
import HeartAnimation from '../components/HeartAnimation';

const ValentineView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Demo mode check
  const isDemo = id === 'demo';

  useEffect(() => {
    const fetchMessage = () => {
      if (isDemo) {
        // Demo data
        setMessage({
          id: 'demo',
          sender: 'John Doe',
          receiver: 'Jane Doe',
          message: 'Happy Valentine\'s Day, my love! You are the most beautiful thing that ever happened to me. Every moment with you feels like a dream come true. I love you more than words can express! 💕',
          theme: 'pink',
        });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setLoading(false);
        return;
      }

      try {
        const data = getMessageById(id);
        if (data) {
          setMessage(data);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching message:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id, isDemo]);

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `valentine-${message.sender}-to-${message.receiver}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Gagal mengunduh kartu. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300">
        <HeartAnimation count={10} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <div className="text-8xl mb-4">💔</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Ucapan Valentine tidak ditemukan</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg"
          >
            <FaArrowLeft className="w-4 h-4" />
            Kembali ke Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const theme = themes[message?.theme] || themes.pink;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className={`fixed inset-0 bg-gradient-to-br ${theme.gradient}`} />

      {/* Animated hearts */}
      <HeartAnimation count={20} />

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                }}
                initial={{ y: -20, opacity: 1 }}
                animate={{ y: '100vh', opacity: 0 }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              >
                <span className="text-2xl">
                  {['💕', '💖', '💗', '💝', '❤️', '🌸', '🌺', '💐'][Math.floor(Math.random() * 8)]}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-20 p-4"
      >
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:bg-white transition-all shadow-lg"
          >
            <FaArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyLink}
              className="p-3 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:bg-white transition-all shadow-lg"
              title="Copy link"
            >
              {copied ? <FaCheck className="w-5 h-5 text-green-500" /> : <FaCopy className="w-5 h-5" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCard}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:bg-white transition-all shadow-lg"
            >
              <FaDownload className="w-5 h-5" />
              Download
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Share notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <FaShare className="w-4 h-4 text-green-400" />
              Link berhasil disalin!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative gap-3 z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex items-center justify-center"
        >
          <ValentineCard data={message} cardRef={cardRef} />
        </motion.div>

        {/* Share section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-4">
            Bagikan ucapan ini ke orang tersayang!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyLink}
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg"
          >
            <FaShare className="w-5 h-5" />
            {copied ? 'Tersalin!' : 'Bagikan Link'}
          </motion.button>
        </motion.div>

        {/* Create your own */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-3">
            Ingin buat ucapan Valentine sendiri?
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pink-600 rounded-full font-semibold hover:bg-pink-50 transition-all shadow-lg border-2 border-pink-200"
          >
            <FaHeart className="w-5 h-5" />
            Buat Sekarang
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ValentineView;
