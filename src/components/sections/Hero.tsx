import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/config";

export function Hero() {
    const { dynamicContent } = config;
    const { specialization, city, localAnchor } = dynamicContent;

    return (
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#0D0D0D]">
            {/* Background Image with Enhanced Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop"
                    alt="Legal Authority"
                    className="w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/95 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-12 xl:col-span-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        {/* Authority Badge */}
                        <div className="flex items-center gap-4 mb-10 overflow-hidden">
                            <div className="h-[1px] w-12 bg-[#C6A87C]"></div>
                            <p className="text-[#C6A87C] font-sans text-xs tracking-[0.4em] uppercase font-bold active-badge whitespace-nowrap">
                                Firma de Élite | {dynamicContent.stats.experienceYears} Años de Trayectoria
                            </p>
                        </div>

                        <div className="font-display font-medium leading-[0.85] mb-10">
                            <h1 className="flex flex-col gap-2">
                                <span className="block text-white/40 italic text-2xl md:text-4xl tracking-normal mb-2">
                                    Protegiendo su {specialization.ego}
                                </span>
                                <span className="block text-white text-5xl md:text-[120px] tracking-tighter uppercase font-bold">
                                    {specialization.hook}
                                </span>
                                <span className="block text-[#C6A87C] text-5xl md:text-[120px] tracking-tighter uppercase font-bold md:ml-24">
                                    {specialization.title}
                                </span>
                            </h1>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="max-w-2xl mb-12"
                    >
                        <p className="text-xl md:text-2xl text-zinc-400 font-sans font-extralight leading-relaxed border-l-2 border-[#C6A87C]/30 pl-8">
                            Transformamos la <span className="text-white font-normal">{specialization.pain}</span> en certidumbre legal.
                            Respuesta inmediata y defensa implacable en la zona de <span className="text-white font-normal">{city}</span>.
                        </p>

                        {/* Local Anchor */}
                        <div className="mt-8 flex items-center gap-3 text-zinc-500 font-sans text-sm tracking-wide">
                            <MapPin size={16} className="text-[#C6A87C]" />
                            <span>Ubicación Estratégica: {localAnchor}, {city}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
                    >
                        <div className="flex flex-col gap-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-[#C6A87C] to-[#8c7350] text-black hover:brightness-110 rounded-none px-12 py-8 text-sm tracking-widest uppercase font-bold shadow-[0_20px_40px_-15px_rgba(198,168,124,0.3)] group transition-all duration-500"
                                onClick={() => window.location.href = '#contact'}
                            >
                                Agendar Consulta Prioritaria
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Button>

                            {/* Proximity Trust Indicator */}
                            <div className="flex items-center gap-2 text-[10px] text-[#C6A87C] uppercase tracking-widest font-bold ml-1">
                                <MapPin size={12} />
                                <span>Atención Presencial: {localAnchor}, {city}</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center h-full pt-2">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-2">Disponibilidad de Triaje</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">Respuesta en &lt; 15 minutos</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Side Accent Line */}
            <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block" />
        </section>
    );
}
