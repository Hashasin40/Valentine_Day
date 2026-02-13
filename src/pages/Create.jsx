import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUpload, FaHeart, FaCheck } from 'react-icons/fa';
import { saveMessage, fileToBase64 } from '../utils/storage';
import ThemeSelector from '../components/ThemeSelector';
import HeartAnimation from '../components/HeartAnimation';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    message: '',
    theme: 'pink',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.sender.trim()) {
      newErrors.sender = 'Nama pengirim wajib diisi';
    }
    if (!formData.receiver.trim()) {
      newErrors.receiver = 'Nama penerima wajib diisi';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan cinta wajib diisi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const messageData = {
        ...formData,
        image: image || null,
      };

      const savedMessage = saveMessage(messageData);
      navigate(`/valentine/${savedMessage.id}`);
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300" />

      {/* Animated hearts */}
      <HeartAnimation count={15} />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-20"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:bg-white transition-all shadow-lg"
        >
          <FaArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4"
            >
              <FaHeart className="w-8 h-8 text-pink-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Buat Ucapan Valentine
            </h1>
            <p className="text-gray-600">
              Isi form di bawah untuk membuat ucapan istimewa
            </p>
          </div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
          >
            <form onSubmit={handleSubmit}>
              {/* Sender name */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pengirim
                </label>
                <input
                  type="text"
                  name="sender"
                  value={formData.sender}
                  onChange={handleInputChange}
                  placeholder="Contoh: John Doe"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.sender
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-200 focus:border-pink-400'
                  }`}
                />
                {errors.sender && (
                  <p className="text-red-500 text-sm mt-1">{errors.sender}</p>
                )}
              </div>

              {/* Receiver name */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleInputChange}
                  placeholder="Contoh: Jane Doe"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.receiver
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-200 focus:border-pink-400'
                  }`}
                />
                {errors.receiver && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiver}</p>
                )}
              </div>

              {/* Theme selector */}
              <ThemeSelector
                selectedTheme={formData.theme}
                onThemeChange={(theme) => setFormData(prev => ({ ...prev, theme }))}
              />

              {/* Image upload */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto (Opsional)
                </label>
                
                {!imagePreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all duration-300">
                    <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Klik untuk upload foto
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      Maksimal 5MB (JPG, PNG, GIF)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                    >
                      <FaHeart className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Message textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan Cinta
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tulis pesan romantis untuk orang tersayang..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                    errors.message
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-200 focus:border-pink-400'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {formData.message.length} karakter
                </p>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sedang Membuat...
                  </>
                ) : (
                  <>
                    <FaHeart className="w-5 h-5" />
                    Generate Link
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Create;
