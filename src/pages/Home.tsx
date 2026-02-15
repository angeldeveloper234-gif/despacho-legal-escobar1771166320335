import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { LegalBotWidget } from "@/components/features/LegalBotWidget";
import { CustomCursor } from "@/components/features/CustomCursor";
import { config } from "@/config";

export function Home() {
    return (
        <main className="bg-[#030303] text-white relative selection:bg-[#C6A87C] selection:text-black">
            <div className="noise-bg" />
            
            <Navbar />
            <Hero />
            <Features />
            <Testimonials />
            <Contact />
            <Footer />

            {/* Active Features */}
            <LegalBotWidget
                webhookUrl={config.chatbot.webhookUrl}
                clientId={config.landingClientId}
            />
            <CustomCursor />
        </main>
    );
}