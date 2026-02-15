import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { config } from "@/config";

export function Testimonials() {
    const { testimonials } = config;

    return (
        <section id="testimonials" className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <p className="text-[#C6A87C] font-sans text-xs tracking-[0.4em] uppercase font-bold mb-4">Prueba de Resultados</p>
                    <h2 className="text-4xl md:text-6xl font-display text-white">
                        Viviendo la <span className="text-[#C6A87C] italic">Excelencia</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-zinc-950/50 border border-white/5 p-8 md:p-12 rounded-3xl hover:border-[#C6A87C]/30 transition-all duration-500 group"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex gap-1 mb-8">
                                    {[...Array(5)].map((_, index) => (
                                        <Star key={index} size={20} className="fill-[#C6A87C] text-[#C6A87C]" />
                                    ))}
                                </div>

                                <p className="text-xl md:text-2xl font-sans font-light text-white leading-relaxed mb-8 flex-1 italic group-hover:text-[#C6A87C]/90 transition-colors">
                                    "{item.text}"
                                </p>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {item.tags.map((tag, idx) => (
                                        <span key={idx} className="bg-[#C6A87C]/10 text-[#C6A87C] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-[#C6A87C]/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-[#C6A87C]/20 flex items-center justify-center text-[#C6A87C] font-display font-bold text-xl">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-sans text-sm font-bold tracking-wider uppercase">
                                            {item.name}
                                        </p>
                                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-0.5">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
