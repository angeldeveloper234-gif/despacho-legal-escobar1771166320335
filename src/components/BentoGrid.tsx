import { motion } from "framer-motion";
import { Gauge, Shield, Layout, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
    {
        title: "Rendimiento Superior",
        description: "Optimizado para puntuaciones 100/100 en Lighthouse.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <Gauge className="h-4 w-4 text-neutral-300" />,
        className: "md:col-span-2",
    },
    {
        title: "Arquitectura Estricta",
        description: "Construido pensando en la resiliencia y escalabilidad.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <Shield className="h-4 w-4 text-neutral-300" />,
        className: "md:col-span-1",
    },
    {
        title: "Diseño Responsivo",
        description: "Experiencia impecable en cualquier dispositivo.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <Smartphone className="h-4 w-4 text-neutral-300" />,
        className: "md:col-span-1",
    },
    {
        title: "Librería de Componentes",
        description: "Primitivas reusables y modulares de Shadcn.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <Layout className="h-4 w-4 text-neutral-300" />,
        className: "md:col-span-2",
    },
];

export function BentoGrid() {
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container px-4 md:px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
                >
                    Sistema de Diseño
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-none p-4 bg-black border border-white/10 justify-between flex flex-col space-y-4",
                                item.className
                            )}
                        >
                            {item.header}
                            <div className="group-hover/bento:translate-x-2 transition duration-200">
                                {item.icon}
                                <div className="font-bold text-neutral-200 mb-2 mt-2">
                                    {item.title}
                                </div>
                                <div className="font-normal text-neutral-500 text-xs">
                                    {item.description}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
