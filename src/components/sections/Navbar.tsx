import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "#features", label: "ÁREAS" },
        { href: "#testimonials", label: "TESTIMONIOS" },
        { href: "#contact", label: "CONTACTO" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-[#030303]/90 backdrop-blur-sm border-b border-white/5">
            <div className="container mx-auto px-6 h-24 flex items-center justify-between">
                <a href="#" className="text-2xl font-display font-bold tracking-wider text-white">
                    ESCOBAR <span className="text-[#C6A87C]">&</span> ASOC.
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs font-sans tracking-[0.2em] text-zinc-400 hover:text-[#C6A87C] transition-colors uppercase"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Button 
                        variant="outline" 
                        className="border-[#C6A87C] text-[#C6A87C] hover:bg-[#C6A87C] hover:text-black rounded-none px-8 tracking-widest text-xs"
                        onClick={() => window.location.href = '#contact'}
                    >
                        CONSULTA
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-[#030303] border-b border-white/10"
                >
                    <div className="flex flex-col p-6 gap-6">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-sans tracking-widest text-zinc-400 hover:text-[#C6A87C] uppercase"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}