import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

const schema = z.object({
    name: z.string().min(2, "Requerido"),
    email: z.string().email("Inválido"),
    phone: z.string().min(10, "Requerido"),
    message: z.string().min(10, "Mínimo 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Mensaje enviado");
    };

    return (
        <section id="contact" className="relative py-32 bg-[#030303]">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info & Form */}
                    <div>
                        <h2 className="text-5xl font-display text-white mb-12">
                            Contacto <span className="text-[#C6A87C]">Directo</span>
                        </h2>

                        <div className="space-y-8 mb-16">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#C6A87C] mt-1" />
                                <div>
                                    <h4 className="text-white font-sans uppercase tracking-widest text-sm mb-2">Ubicación</h4>
                                    <p className="text-zinc-400">Veracruz, México</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-[#C6A87C] mt-1" />
                                <div>
                                    <h4 className="text-white font-sans uppercase tracking-widest text-sm mb-2">Teléfonos</h4>
                                    <p className="text-zinc-400">+52 229 250 8113</p>
                                    <p className="text-zinc-400">(228) 841 5620</p>
                                    <p className="text-zinc-400">(228) 303 1647</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <input
                                        {...register("name")}
                                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#C6A87C] transition-colors placeholder:text-zinc-700"
                                        placeholder="NOMBRE COMPLETO"
                                    />
                                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                                </div>
                                <div className="space-y-2">
                                    <input
                                        {...register("phone")}
                                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#C6A87C] transition-colors placeholder:text-zinc-700"
                                        placeholder="TELÉFONO"
                                    />
                                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <input
                                    {...register("email")}
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#C6A87C] transition-colors placeholder:text-zinc-700"
                                    placeholder="CORREO ELECTRÓNICO"
                                />
                                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <textarea
                                    {...register("message")}
                                    rows={3}
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#C6A87C] transition-colors resize-none placeholder:text-zinc-700"
                                    placeholder="DETALLES DEL CASO"
                                />
                                {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-[#C6A87C] rounded-none py-4 uppercase tracking-widest text-sm font-bold transition-colors"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "ENVIANDO..." : "ENVIAR CONSULTA"}
                            </Button>
                        </form>
                    </div>

                    {/* Map Visual */}
                    <div className="h-[500px] w-full bg-zinc-900 relative overflow-hidden grayscale invert contrast-125 brightness-75">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120638.0626332442!2d-96.22234057989504!3d19.17876807490289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c341424147027b%3A0x46927361e414c37b!2sVeracruz%2C%20Ver.!5e0!3m2!1ses-419!2smx!4v1707925000000!5m2!1ses-419!2smx" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}