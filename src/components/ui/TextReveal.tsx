import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function TextReveal({
    children,
    className,
    delay = 0,
    duration = 0.5,
    as: Component = "div",
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const words = children.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * i },
        }),
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
                duration,
            },
        },
    };

    return (
        <Component
            ref={ref}
            className={cn("flex flex-wrap gap-x-2", className)}
        >
            <motion.div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {words.map((word, index) => (
                    <motion.span variants={child} key={index}>
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        </Component>
    );
}
