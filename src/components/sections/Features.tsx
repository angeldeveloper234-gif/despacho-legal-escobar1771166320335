import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const areas = [
    { id: "01", title: "Derecho Civil", desc: "Protección de patrimonio y contratos." },
    { id: "02", title: "Defensa Penal", desc: "Estrategia técnica y pulcritud procesal." },
    { id: "03", title: "Derecho Fiscal", desc: "Soluciones inteligentes para empresas." },
    { id: "04", title: "Corporativo", desc: "Blindaje legal para su negocio." },
    { id: "05", title: "Amparo", desc: "Protección de derechos fundamentales." },
    { id: "06", title: "Propiedad Intelectual", desc: "Registro y defensa de marcas." }
];

export function Features() {
    return (
        <section id="features" className="py-32 bg-[#030303] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
                    <h2 className="text-4xl md:text-6xl font-display text-white">
                        Áreas de <span className="text-[#C6A87C] italic">Práctica</span>
                    </h2>
                    <p className="text-zinc-500 font-mono text-xs mt-4 md:mt-0">
                        [ EXPERTISE JURÍDICO ]
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
                    {areas.map((area, index) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 border-r border-b border-white/10 hover:bg-white/5 transition-colors duration-500"
                        >
                            <div className="absolute top-4 right-4">
                                <span className="font-mono text-xs text-[#C6A87C]/50">{area.id}</span>
                            </div>
                            
                            <h3 className="text-2xl font-display text-white mb-4 group-hover:text-[#C6A87C] transition-colors">
                                {area.title}
                            </h3>
                            <p className="text-zinc-500 font-sans font-light text-sm leading-relaxed">
                                {area.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}