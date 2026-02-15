import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        q: "¿Está optimizado para SEO?",
        a: "Absolutamente. Usamos HTML semántico, meta etiquetas adecuadas y tiempos de carga ultra rápidos para asegurar el mejor posicionamiento.",
    },
    {
        q: "¿Puedo usar componentes de Shadcn?",
        a: "Sí, la arquitectura está diseñada para integrar primitivas de Shadcn sin conflictos.",
    },
    {
        q: "¿Qué hay de las animaciones?",
        a: "Framer Motion está integrado. Cada interacción está configurada para 'whileHover' y 'whileTap' para una sensación premium.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-black text-white px-4">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">Preguntas Frecuentes</h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/20">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-medium pr-8">{faq.q}</span>
                                {openIndex === i ? <Minus className="w-5 h-5 flex-shrink-0" /> : <Plus className="w-5 h-5 flex-shrink-0" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-zinc-400 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
