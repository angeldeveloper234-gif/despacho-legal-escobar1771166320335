import { motion } from "framer-motion";
import { config } from "@/config";

export function Features() {
    const { dynamicContent } = config;
    const { pricing } = dynamicContent;

    const areas = [
        {
            id: "01",
            title: "Conflictos Corporativos",
            problem: "¿Su patrimonio está en riesgo?",
            agitation: "La falta de un blindaje adecuado puede resultar en la pérdida total de activos ante demandas imprevistas.",
            solve: "Blindaje legal estratégico y preventivo.",
            price: pricing.basic
        },
        {
            id: "02",
            title: "Defensa Penal de Élite",
            problem: "¿Enfrenta una acusación?",
            agitation: "Un error procesal en las primeras 24 horas puede determinar años de libertad. No deje su futuro al azar.",
            solve: "Representación técnica de alto impacto.",
            price: pricing.comprehensive
        },
        {
            id: "03",
            title: "Derecho Fiscal & Tributario",
            problem: "¿Auditorías o multas excesivas?",
            agitation: "El SAT no perdona errores. Las multas pueden asfixiar el flujo de caja de su empresa permanentemente.",
            solve: "Litigio y planeación fiscal inteligente.",
            price: pricing.retainer
        }
    ];

    return (
        <section id="features" className="py-32 bg-[#0D0D0D] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="max-w-2xl">
                        <p className="text-[#C6A87C] font-sans text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                            Nuestra Especialización
                        </p>
                        <h2 className="text-5xl md:text-7xl font-display text-white leading-tight">
                            Soluciones de <span className="text-[#C6A87C] italic">Alto Impacto</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {areas.map((area, index) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative p-12 bg-[#0D0D0D] hover:bg-[#141414] transition-all duration-700"
                        >
                            <span className="font-mono text-[10px] text-[#C6A87C] mb-8 block opacity-50">ESTRATEGIA {area.id}</span>

                            <h3 className="text-3xl font-display text-white mb-6 group-hover:text-[#C6A87C] transition-colors">
                                {area.title}
                            </h3>

                            <div className="space-y-4 mb-8">
                                <p className="text-[#D4AF37] font-sans font-bold text-sm tracking-wide italic">
                                    {area.problem}
                                </p>
                                <p className="text-zinc-500 font-sans font-light text-base leading-relaxed">
                                    {area.agitation}
                                </p>
                                <div className="pt-4">
                                    <p className="text-white font-sans font-medium text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-[1px] bg-[#C6A87C]"></span>
                                        {area.solve}
                                    </p>
                                </div>
                            </div>

                            {/* Pricing Anchor */}
                            <div className="pt-8 border-t border-white/5">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Inversión Estimada</p>
                                <p className="text-white font-display text-lg tracking-tight group-hover:text-[#C6A87C] transition-colors">
                                    {area.price}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
