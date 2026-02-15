import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

// --- CONFIGURATION ---
const NOTIFICATIONS = [
    "Maria de CDMX acaba de reservar una consulta.",
    "Carlos de Monterrey se registró en el Plan Inicial.",
    "LegalPros Inc. actualizó a Enterprise.",
    "Sofia solicitó una auditoría gratuita."
];

export function SocialProofToast() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initial delay
        const initTimer = setTimeout(() => setIsVisible(true), 5000);

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIdx((prev) => (prev + 1) % NOTIFICATIONS.length);
                setIsVisible(true);
            }, 1000); // Wait for exit animation
        }, 15000); // Rotate every 15s

        return () => {
            clearTimeout(initTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: 0 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-8 z-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-lg flex items-center gap-3 max-w-sm hidden md:flex"
                >
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full p-1">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-tight">
                            {NOTIFICATIONS[currentIdx]}
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">Hace un momento</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
