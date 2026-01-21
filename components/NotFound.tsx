import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoldSmoke } from './ui/GoldSmoke';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center text-center px-4">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0 opacity-40">
                <GoldSmoke />
            </div>

            {/* Radial Gradient Background for Vignette */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">

                {/* Animated 404 Text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <h1 className="text-[150px] md:text-[220px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-[#B4975A] via-[#FFE5B4] to-[#B4975A] drop-shadow-2xl select-none">
                        404
                    </h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-[#B4975A] to-transparent w-full absolute bottom-4 opacity-50"
                    />
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-white font-sans tracking-wide">
                        Página Não Encontrada
                    </h2>
                    <p className="text-white/60 text-lg font-light max-w-md mx-auto leading-relaxed">
                        O conteúdo que você procura desapareceu ou nunca existiu.
                        Volte para a segurança da página inicial.
                    </p>
                </motion.div>

                {/* Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <Link to="/" className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-[#B4975A]/30 text-[#B4975A] rounded-full hover:bg-[#B4975A] hover:text-[#0a0a0a] transition-all duration-300 backdrop-blur-sm relative overflow-hidden">

                        {/* Button Hover Shine Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12" />

                        <Home size={20} />
                        <span className="font-medium tracking-wide">Voltar ao Início</span>
                    </Link>
                </motion.div>

            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-0 right-0 text-center"
            >
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#B4975A]">
                    Romário Sued Advocacia
                </p>
            </motion.div>

        </div>
    );
};

export default NotFound;
