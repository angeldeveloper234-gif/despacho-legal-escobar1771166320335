import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

// --- CONFIGURATION VARIABLES ---
const DISCLAIMER_TITLE = "Aviso Legal Importante";
const DISCLAIMER_BODY = `
  La información proporcionada en este sitio web no constituye, y no pretende constituir, asesoramiento legal; 
  en cambio, toda la información, contenido y materiales disponibles en este sitio son solo para fines informativos generales.
  La información en este sitio web puede no constituir la información legal o de otro tipo más actualizada.
`;
const REQUIRE_ACCEPTANCE = false; // If true, blocks view until accepted.

export function DisclaimerModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show only once per session or use localStorage for persistence
        const hasSeen = sessionStorage.getItem("seen-disclaimer");
        if (!hasSeen) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        sessionStorage.setItem("seen-disclaimer", "true");
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-4 text-amber-500">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="text-xl font-bold text-white">{DISCLAIMER_TITLE}</h3>
                        </div>

                        <p className="text-zinc-400 mb-6 leading-relaxed text-sm">
                            {DISCLAIMER_BODY}
                        </p>

                        <div className="flex justify-end gap-3">
                            {!REQUIRE_ACCEPTANCE && (
                                <Button variant="ghost" onClick={handleClose}>
                                    Cerrar
                                </Button>
                            )}
                            <Button variant="primary" onClick={handleClose}>
                                Entiendo
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
