import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Basic interaction with Tailwind's dark mode
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggle = () => setTheme(prev => prev === "dark" ? "light" : "dark");

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Alternar Tema"
        >
            <div className="relative w-5 h-5">
                <motion.div
                    initial={false}
                    animate={{ scale: theme === "dark" ? 0 : 1, rotate: theme === "dark" ? 180 : 0 }}
                    className="absolute inset-0"
                >
                    <Sun className="w-5 h-5" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{ scale: theme === "light" ? 0 : 1, rotate: theme === "light" ? -180 : 0 }}
                    className="absolute inset-0"
                >
                    <Moon className="w-5 h-5" />
                </motion.div>
            </div>
        </button>
    );
}
