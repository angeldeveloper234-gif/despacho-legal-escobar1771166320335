import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, Type, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccessibilityMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [contrast, setContrast] = useState("normal"); // normal | high

    useEffect(() => {
        // Apply Font Size
        document.documentElement.style.fontSize = `${fontSize}px`;

        // Apply Contrast
        if (contrast === "high") {
            document.documentElement.classList.add("high-contrast");
        } else {
            document.documentElement.classList.remove("high-contrast");
        }
    }, [fontSize, contrast]);

    return (
        <div className="fixed bottom-24 right-4 z-40 hidden md:block">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute bottom-full mb-4 right-0 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xl"
                    >
                        <h4 className="font-semibold mb-3 text-sm">Accesibilidad</h4>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-zinc-500 mb-1 block">Tamaño de Texto</label>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="w-8 h-8 p-0"><Type className="w-3 h-3" /></Button>
                                    <span className="flex-1 text-center text-sm flex items-center justify-center">{fontSize}px</span>
                                    <Button size="sm" variant="outline" onClick={() => setFontSize(Math.min(24, fontSize + 1))} className="w-8 h-8 p-0"><Type className="w-4 h-4" /></Button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 mb-1 block">Contraste</label>
                                <Button
                                    size="sm"
                                    variant={contrast === "high" ? "primary" : "outline"}
                                    className="w-full"
                                    onClick={() => setContrast(contrast === "high" ? "normal" : "high")}
                                >
                                    <Eye className="w-3 h-3 mr-2" />
                                    {contrast === "high" ? "Contraste Normal" : "Alto Contraste"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Opciones de Accesibilidad"
            >
                <div className="relative">
                    <Eye className="w-6 h-6" />
                </div>
            </button>
        </div>
    );
}
