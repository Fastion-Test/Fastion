import { motion } from 'framer-motion';
import { FiCheckCircle, FiInfo, FiX, FiXCircle } from 'react-icons/fi';

const ICONS = {
  success: <FiCheckCircle className="text-green-500" size={20} />,
  error: <FiXCircle className="text-brand-red" size={20} />,
  info: <FiInfo className="text-brand-blue" size={20} />,
};

export default function Toast({ message, type = 'success', onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40 }}
      className="flex items-center gap-3 bg-white dark:bg-brand-gray-900 border border-brand-gray-200 dark:border-brand-gray-700 shadow-lg rounded-xl px-4 py-3 min-w-[240px] max-w-[320px]"
    >
      {ICONS[type]}
      <p className="text-sm font-body flex-1 text-brand-black dark:text-white">{message}</p>
      <button onClick={onClose} aria-label="Dismiss notification" className="text-brand-gray-400 hover:text-brand-black dark:hover:text-white">
        <FiX size={16} />
      </button>
    </motion.div>
  );
}
