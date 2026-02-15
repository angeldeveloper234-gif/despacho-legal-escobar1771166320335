import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    { 
        name: "Jose Luis Pinzon", 
        text: "Su equipo demostró gran profesionalismo. Resolvieron mi caso de manera eficiente.", 
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" 
    },
    { 
        name: "Dhalia Lois", 
        text: "Gente amable y profesional. Me ayudaron con la asesoría para llevar mi caso sin problema.", 
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
    }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-32 bg-[#050505]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {testimonials.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-full md:w-1/3 aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 pt-4">
                                    <Quote className="w-8 h-8 text-[#C6A87C] mb-6 opacity-50" />
                                    <p className="text-2xl md:text-3xl font-display text-white leading-tight mb-8">
                                        "{item.text}"
                                    </p>
                                    <div className="border-t border-[#C6A87C]/30 pt-4">
                                        <p className="text-[#C6A87C] font-sans text-xs tracking-widest uppercase">
                                            {item.name}
                                        </p>
                                        <p className="text-zinc-600 text-xs mt-1">Cliente Verificado</p>
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