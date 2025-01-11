'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="max-w-screen-2xl mx-auto min-h-[80vh] flex flex-col md:flex-row items-center">
      {/* Bagian kiri: Kata kata sambutan dan lanjutan */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center md:text-left"
      >
        {/* Kata kata sambutan */}
        <div className="mt-2 md:mt-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-normal pb-4" // Menambahkan padding bawah
          >
            Selamat Datang <br /> Di Gallery Batik Digital
          </motion.h2>
        </div>
                
        {/* Kata Kata Lanjutan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 md:mt-6"
        >
          <h2 className="text-xl md:text-2xl tracking-wide leading-relaxed mb-4 text-gray-700">
            Jelajahi koleksi Batik dari seluruh Indonesia.
            <br />Akses mudah kapan saja, di mana saja.
            <br />Temukan Seni tanpa batas di ujung jari Anda.
          </h2>

          {/* Tambahan tombol CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold 
                         shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
            >
              Mulai Jelajahi
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold
                         hover:bg-indigo-50 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Bagian kanan: Gambar besar */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center items-center mt-6 md:mt-0"
      >
        <div className="relative">
          {/* Decorative background circle */}
          <div className="absolute -z-10 w-[400px] h-[400px] bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30" />
          
          <Image
            src="/hero_image.svg"
            alt="Gambar Perpustakaan"
            width={500}
            height={333}
            className="max-w-full h-auto drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
