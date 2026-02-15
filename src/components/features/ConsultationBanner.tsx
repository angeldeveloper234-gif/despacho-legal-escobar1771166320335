import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION VARIABLES ---
const BANNER_TEXT = "¿Necesitas asesoramiento legal? Reserva tu consulta gratuita de 15 minutos hoy.";
const BUTTON_TEXT = "Reservar Ahora";
const ACTION_LINK = "#contact"; // Or a specific calendly link like "https://calendly.com/..."

export function ConsultationBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-indigo-600 text-white relative z-50 hidden md:block"
            >
                <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                    <span className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        {BANNER_TEXT}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/10 border-white/20 hover:bg-white/20 text-white h-8 text-xs"
                        onClick={() => window.location.href = ACTION_LINK}
                    >
                        {BUTTON_TEXT}
                    </Button>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors sm:static sm:translate-y-0 sm:ml-4"
                        aria-label="Close banner"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
