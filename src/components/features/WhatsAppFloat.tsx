import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- CONFIGURATION VARIABLES ---
// AI ENGINE: Replace these values based on client context.
const WHATSAPP_NUMBER = "15551234567"; // International format without +
const DEFAULT_MESSAGE = "Hello! I would like to schedule a consultation.";
const POSITION = "bottom-right"; // 'bottom-right' | 'bottom-left'

export function WhatsAppFloat() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
                "fixed z-50 p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-colors hidden md:flex",
                POSITION === "bottom-right" ? "bottom-8 right-8" : "bottom-8 left-8"
            )}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8 fill-current" />
            <span className="sr-only">Chat on WhatsApp</span>
        </motion.a>
    );
}
