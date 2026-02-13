import { motion } from 'framer-motion';
import { themes } from '../utils/storage';

const ThemeSelector = ({ selectedTheme, onThemeChange }) => {
  const themeKeys = Object.keys(themes);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Pilih Tema Warna
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {themeKeys.map((key) => {
          const theme = themes[key];
          const isSelected = selectedTheme === key;

          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => onThemeChange(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative p-3 rounded-xl border-2 transition-all duration-300
                ${isSelected 
                  ? `${theme.cardBorder} ${theme.buttonBg} text-white shadow-lg` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <div className={`w-full h-8 rounded-lg mb-2 bg-gradient-to-r ${theme.gradient}`} />
              <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                {theme.name}
              </span>
              {isSelected && (
                <motion.div
                  layoutId="selected"
                  className="absolute inset-0 rounded-xl border-2 border-white/50"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
