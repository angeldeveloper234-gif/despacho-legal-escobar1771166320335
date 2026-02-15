import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Roadmap } from "@/components/sections/Roadmap";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { LegalBotWidget } from "@/components/features/chat/LegalBotWidget";
import { CustomCursor } from "@/components/features/CustomCursor";
import { config } from "@/config";

export function Home() {
    return (
        <main className="bg-[#0D0D0D] text-white relative selection:bg-[#C6A87C] selection:text-black">
            <div className="noise-bg" />

            <Navbar />
            <Hero />
            <Roadmap />
            <Stats />
            <Features />
            <Testimonials />
            <CTA />
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