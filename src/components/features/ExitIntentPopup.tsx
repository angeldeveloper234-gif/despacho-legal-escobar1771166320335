import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION ---
const POPUP_TITLE = "¡Espera! No te vayas con las manos vacías.";
const POPUP_DESC = "Regístrate ahora para una sesión de estrategia gratuita valorada en $500.";
const DELAY_BEFORE_TRIGGER = 2000; // ms

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        // Only trigger once per session
        if (sessionStorage.getItem("exit-intent-triggered")) return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                sessionStorage.setItem("exit-intent-triggered", "true");
            }
        };

        // Optional: Timer based trigger for mobile fallback
        const timer = setTimeout(() => {
            if (!hasTriggered && !sessionStorage.getItem("exit-intent-triggered")) {
                // setIsVisible(true); // Uncomment to enable timer-based fallback
            }
        }, 15000);

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timer);
        };
    }, [hasTriggered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-zinc-200 dark:border-white/10"
                    >
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Gift className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">{POPUP_TITLE}</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            {POPUP_DESC}
                        </p>

                        <div className="space-y-3">
                            <Button className="w-full text-lg py-6" size="lg">
                                Reclamar Oferta
                            </Button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 underline"
                            >
                                No gracias, odio las cosas gratis
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
