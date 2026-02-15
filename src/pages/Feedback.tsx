import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, X, ExternalLink, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { config } from "@/config";
import { cn } from "@/lib/utils";

export function Feedback() {
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // Form state for internal feedback
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: ""
    });

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
        if (selectedRating < 4) {
            setShowModal(true);
        }
    };

    const handleSubmitInternal = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const { error } = await supabase
                .from('feedback_interno')
                .insert([
                    { 
                        client_id: config.landingClientId,
                        stars: rating,
                        name: formData.name,
                        email: formData.email,
                        comment: formData.comment,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;
            
            setIsSubmitted(true);
            setTimeout(() => {
                setShowModal(false);
                // Reset after some time if needed
            }, 3000);
        } catch (error) {
            console.error("Error saving feedback:", error);
            alert("Hubo un error al guardar tu reseña. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-black text-white min-h-screen flex flex-col">
            <Navbar />
            
            <div className="flex-1 flex items-center justify-center py-32 px-4">
                <div className="max-w-2xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            Tu opinión nos <span className="text-zinc-500">importa</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-md mx-auto">
                            ¿Cómo fue tu experiencia con nosotros? Selecciona una calificación para continuar.
                        </p>

                        <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => handleRatingClick(star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={cn(
                                            "w-12 h-12 transition-colors",
                                            (hoveredRating || rating) >= star
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-zinc-700"
                                        )}
                                    />
                                </motion.button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {rating >= 4 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="pt-8"
                                >
                                    <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl space-y-6">
                                        <div className="flex justify-center">
                                            <div className="bg-green-500/20 p-4 rounded-full">
                                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold">¡Excelente!</h3>
                                        <p className="text-zinc-400">
                                            Nos alegra que hayas tenido una buena experiencia. 
                                            ¿Podrías compartir tu reseña en Google para ayudarnos a crecer?
                                        </p>
                                        <Button 
                                            size="lg" 
                                            className="w-full sm:w-auto"
                                            onClick={() => window.open(config.googleMapsReviewUrl, '_blank')}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Dejar reseña en Google
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Modal for Internal Feedback (< 4 stars) */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSubmitting && setShowModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h3 className="font-bold text-xl">Cuéntanos más</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                    disabled={isSubmitting}
                                >
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <div className="p-6">
                                {isSubmitted ? (
                                    <div className="text-center py-8 space-y-4">
                                        <div className="flex justify-center">
                                            <div className="bg-green-500/20 p-4 rounded-full">
                                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                                            </div>
                                        </div>
                                        <h4 className="text-2xl font-bold">¡Gracias!</h4>
                                        <p className="text-zinc-400">
                                            Tu opinión ha sido guardada internamente. 
                                            Trabajaremos para mejorar nuestro servicio.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitInternal} className="space-y-4">
                                        <p className="text-zinc-400 text-sm mb-6">
                                            Lamentamos que tu experiencia no haya sido perfecta. 
                                            Por favor, déjanos tus comentarios para mejorar.
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Nombre</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                                                placeholder="Tu nombre"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Email</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                                                placeholder="tu@email.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Comentario</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.comment}
                                                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors resize-none"
                                                placeholder="¿En qué podemos mejorar?"
                                            />
                                        </div>

                                        <Button 
                                            type="submit" 
                                            className="w-full mt-4"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Enviando..." : (
                                                <>
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Enviar Comentarios
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
