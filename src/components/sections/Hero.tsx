import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
                    alt="Corporate Architecture" 
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="inline-block border-l-2 border-[#C6A87C] pl-4 py-1 mb-8">
                            <p className="text-[#C6A87C] font-sans text-xs tracking-[0.3em] uppercase">
                                Est. 2001 | Top Tier Firm
                            </p>
                        </div>
                        
                        <div className="font-display font-medium leading-[0.9]">
                            <h1>
                                <span className="block text-white/40 italic text-4xl md:text-6xl mb-4">Reinventando la</span> 
                                <span className="block text-white text-6xl md:text-9xl tracking-tighter">DEFENSA</span> 
                                <span className="block text-[#C6A87C] ml-0 md:ml-20 text-6xl md:text-9xl tracking-tighter">CORPORATIVA</span>
                            </h1>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-xl text-lg text-zinc-400 mb-12 font-sans font-light leading-relaxed border-l border-white/10 pl-6"
                    >
                        23 Años de Excelencia Jurídica en Veracruz. Experiencia y Juventud: La Nueva Era del Derecho.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Button 
                            size="lg" 
                            className="bg-[#C6A87C] text-black hover:bg-white rounded-none px-10 py-6 text-sm tracking-widest uppercase font-semibold transition-all duration-300"
                            onClick={() => window.location.href = '#contact'}
                        >
                            Agendar Consulta <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}