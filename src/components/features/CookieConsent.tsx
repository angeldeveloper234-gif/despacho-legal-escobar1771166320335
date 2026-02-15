import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION VARIABLES ---
const COOKIE_POLICY_LINK = "/privacy-policy";
const CONSENT_KEY = "cookie-consent-v1";

export function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setShow(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem(CONSENT_KEY, "true");
        setShow(false);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-zinc-900 border-t border-white/10"
                >
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-zinc-400 text-center md:text-left">
                            Usamos cookies para mejorar tu experiencia. Al usar nuestro sitio, aceptas nuestra{" "}
                            <a href={COOKIE_POLICY_LINK} className="text-white underline hover:no-underline">
                                Política de Privacidad
                            </a>.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" onClick={() => setShow(false)}>
                                Rechazar
                            </Button>
                            <Button variant="primary" size="sm" onClick={accept}>
                                Aceptar
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
