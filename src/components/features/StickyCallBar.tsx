import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION ---
const PHONE_NUMBER = "+15550000000";
const WHATSAPP_URL = "https://wa.me/15550000000";

export function StickyCallBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 pb-safe flex gap-4 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
            <Button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white border-none shadow-lg shadow-green-500/20"
                onClick={() => window.open(WHATSAPP_URL, '_blank')}
            >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
            </Button>
            <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-lg shadow-indigo-500/20"
                onClick={() => window.location.href = `tel:${PHONE_NUMBER}`}
            >
                <Phone className="w-4 h-4 mr-2" />
                Llamar Ahora
            </Button>
        </div>
    );
}
