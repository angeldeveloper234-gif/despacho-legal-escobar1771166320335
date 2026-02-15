import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const MobileConversionBar: React.FC = () => {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[60] sm:hidden grid grid-cols-2 h-16 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10"
        >
            <a
                href="tel:+520000000000"
                className="flex items-center justify-center gap-2 text-white border-r border-white/10 active:bg-white/5 transition-colors"
            >
                <Phone size={18} className="text-[#C6A87C]" />
                <span className="text-xs font-bold uppercase tracking-widest">Llamar</span>
            </a>
            <a
                href="https://wa.me/520000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white active:bg-white/5 transition-colors"
            >
                <MessageSquare size={18} className="text-[#C6A87C]" />
                <span className="text-xs font-bold uppercase tracking-widest">WhatsApp</span>
            </a>
        </motion.div>
    );
};
