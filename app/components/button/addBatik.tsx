import Link from 'next/link';
import { motion } from 'framer-motion'; // Pastikan sudah menginstall framer-motion
import { IoAdd } from 'react-icons/io5'; // Pastikan sudah menginstall react-icons

const AddBatikButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href="/add-batik" 
        className="inline-flex items-center justify-center gap-2
                 px-6 h-11
                 text-sm font-medium
                 rounded-full 
                 bg-gradient-to-r from-indigo-600 to-purple-600
                 text-white
                 transition-all duration-300
                 hover:shadow-lg hover:shadow-indigo-500/30
                 relative
                 overflow-hidden
                 group"
      >
        <IoAdd className="text-xl transition-transform duration-300 group-hover:rotate-180" />
        <span className="relative">
          Add Batik
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </span>
      </Link>
    </motion.div>
  );
};

export default AddBatikButton;
