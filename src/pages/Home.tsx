import { Hero } from "@/components/sections/Hero";
import { Roadmap } from "@/components/sections/Roadmap";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/features/CustomCursor";

export function Home() {
    return (
        <main className="relative selection:bg-[#C6A87C] selection:text-black">
            <Hero />
            <Roadmap />
            <Stats />
            <Features />
            <Testimonials />
            <CTA />
            <Contact />

            {/* Active Features */}
            <CustomCursor />
        </main>
    );
}