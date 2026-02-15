import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { config } from "@/config";

// --- CONFIGURATION ---
const CALENDLY_URL = config.bookingUrl; // Dynamic from config

interface BookingModalProps {
    trigger?: React.ReactNode;
}

export function BookingModal({ trigger }: BookingModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {trigger || (
                    <Button variant="primary" size="lg" className="rounded-full shadow-lg shadow-indigo-500/20">
                        <Calendar className="w-4 h-4 mr-2" />
                        Reservar Consulta
                    </Button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[800px]"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">Programa tu Consulta</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <div className="flex-1 w-full bg-zinc-50 dark:bg-zinc-950 relative">
                                {/* 
                     NOTE: In production, consider using react-calendly for better integration 
                     or a simple iframe if no advanced library is desired.
                 */}
                                <iframe
                                    src={CALENDLY_URL}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    title="Scheduling Page"
                                    className="w-full h-full"
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
