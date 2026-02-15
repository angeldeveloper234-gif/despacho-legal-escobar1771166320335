import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { config } from '@/config';

export function Stats() {
    const { stats } = config.dynamicContent;

    const data = [
        { label: "Casos Ganados", value: stats.casesWon, suffix: "+" },
        { label: "Años de Trayectoria", value: stats.experienceYears, suffix: "" },
        { label: "Capital Recuperado", value: stats.recoveredAmount, suffix: "M" }
    ];

    return (
        <section className="py-24 bg-[#0D0D0D] border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="text-center md:text-left border-l border-[#C6A87C]/20 pl-8"
                        >
                            <p className="text-zinc-500 font-sans text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                                {item.label}
                            </p>
                            <div className="flex bg-gradient-to-tr from-white to-zinc-500 bg-clip-text text-transparent">
                                <span className="text-6xl md:text-8xl font-display font-bold tabular-nums tracking-tighter">
                                    {item.value}
                                </span>
                                <span className="text-4xl md:text-5xl font-display font-medium text-[#C6A87C] mt-2 ml-1">
                                    {item.suffix}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
