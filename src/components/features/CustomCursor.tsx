import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// --- CONFIGURATION ---
const CURSOR_SIZE = 20;
const HOVER_SCALE = 2.5;
const CLICKABLE_ELEMENTS = "a, button, input, textarea, [role='button'], .clickable";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = "none";

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - CURSOR_SIZE / 2);
            mouseY.set(e.clientY - CURSOR_SIZE / 2);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);
        const handleGenericHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches?.(CLICKABLE_ELEMENTS) || target.closest?.(CLICKABLE_ELEMENTS)) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleGenericHover);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleGenericHover);
            document.body.style.cursor = "auto";
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on touch devices (basic check)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference",
                !isVisible && "opacity-0"
            )}
            style={{
                x: cursorX,
                y: cursorY,
            }}
        >
            <motion.div
                className="bg-white rounded-full"
                style={{
                    width: CURSOR_SIZE,
                    height: CURSOR_SIZE,
                }}
                animate={{
                    scale: isHovering ? HOVER_SCALE : 1,
                }}
                transition={{ duration: 0.15 }}
            />
            {/* Optional: Inner dot for precision */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-1 h-1"
            />
        </motion.div>
    );
}
