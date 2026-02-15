import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Puzzle, Gavel, CheckCircle } from 'lucide-react';
import { config } from '@/config';

export function Roadmap() {
    const { roadmap } = config.dynamicContent;

    const icons = [
        <Search size={32} className="text-[#C6A87C]" />,
        <Puzzle size={32} className="text-[#C6A87C]" />,
        <Gavel size={32} className="text-[#C6A87C]" />
    ];

    return (
        <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <p className="text-[#C6A87C] font-sans text-xs tracking-[0.4em] uppercase font-bold mb-4">
                        El Camino a su Tranquilidad
                    </p>
                    <h2 className="text-4xl md:text-6xl font-display text-white">
                        Hoja de Ruta <span className="text-[#C6A87C] italic">Estratégica</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                        {roadmap.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative"
                            >
                                <div className="bg-zinc-950 border border-white/10 p-10 rounded-2xl hover:border-[#C6A87C]/30 transition-all duration-500 overflow-hidden">
                                    {/* Number Watermark */}
                                    <div className="absolute -top-4 -right-4 text-9xl font-display font-bold text-white/[0.03] pointer-events-none group-hover:text-[#C6A87C]/[0.05] transition-colors">
                                        {item.step}
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[#C6A87C]/10 transition-colors">
                                            {icons[index]}
                                        </div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[#C6A87C] font-mono text-xs font-bold tracking-widest uppercase">Paso {item.step}</span>
                                            <div className="h-[1px] w-8 bg-[#C6A87C]/30"></div>
                                        </div>

                                        <h3 className="text-2xl font-display text-white mb-4 group-hover:text-[#C6A87C] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-zinc-500 font-sans font-light text-base leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {index < 2 && (
                                        <div className="mt-8 lg:hidden flex justify-center">
                                            <ArrowRight className="text-white/20" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
