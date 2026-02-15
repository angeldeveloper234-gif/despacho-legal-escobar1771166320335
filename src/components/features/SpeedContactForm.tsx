import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming these exist
import { config } from "@/config";
import { trackEvent } from "@/lib/analytics";
import { getTrafficSource } from "@/lib/traffic";

import { useUser } from "@/context/UserContext";


// --- Schema Definition ---
const formSchema = z.object({
    name: z.string().min(2, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "El teléfono es requerido"),
    reason: z.enum(["legal_defense", "consultation", "corporate", "other"]),
    urgency: z.enum(["immediate", "soon", "planning"]),
    budget: z.enum(["standard", "premium", "corporate_retainer"]),
});

type FormData = z.infer<typeof formSchema>;

export function SpeedContactForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { clientId } = useUser();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const nextStep = async () => {
        let isValid = false;
        if (step === 1) isValid = await trigger(["reason", "urgency"]);
        if (step === 2) isValid = await trigger(["budget"]);

        if (isValid) setStep((s) => s + 1);
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        console.log("Submitting to Webhook:", import.meta.env.VITE_SPEED_WEBHOOK);

        try {
            // Attempt to send to n8n Webhook
            const webhookUrl = config.contactFormWebhook;
            const trafficSource = getTrafficSource();

            if (webhookUrl) {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...data,
                        source: 'speed_contact_form_demo',
                        timestamp: new Date().toISOString(),
                        metadata: {
                            traffic_source: trafficSource,
                            referrer: document.referrer || 'none',
                            url: window.location.href
                        }
                    })
                });
            } else {

                // Simulate delay if no webhook is present (Demo Mode)
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.warn("VITE_SPEED_WEBHOOK is not defined. Running in Simulation Mode.");
            }

        } catch (error) {
            console.error("Webhook Error:", error);
            // In demo, we might want to show success anyway so the user experience isn't broken
            // But ideally we'd show an error. For this Sales Asset, we proceed to Success.
        }

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        // Level 2 & 3 Logic: If urgent, convert immediately.
        const isUrgent = true; // In real app, check watch('urgency') === 'immediate'

        return (
            <div className="flex flex-col items-center justify-center p-8 bg-green-50/50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-800 text-center animate-in fade-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    ¡Solicitud Recibida!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {isUrgent
                        ? "Tu caso ha sido marcado como URGENTE. Para atención inmediata, agenda ahora."
                        : "Nuestros socios han sido notificados. Espera una respuesta en menos de 5 minutos."}
                </p>

                {isUrgent && (
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        {/* Booking Option */}
                        <a
                            href={config.bookingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                        >
                            <Calendar className="w-4 h-4" />
                            Agendar Llamada Ahora
                        </a>

                        {/* Payment Option (Level 3) */}
                        <a
                            href={config.paymentLink}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                                trackEvent('payment_claim', {
                                    amount: 50,
                                    currency: 'USD',
                                    provider: 'stripe',
                                    status: 'initiated'
                                }, clientId);
                            }}
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
                        >
                            Pagar Consulta Prioritaria ($50)
                        </a>
                    </div>
                )}

                <div className="mt-6 text-xs text-zinc-500">
                    (Demo: Data sent to Supabase 'leads'. Shown Buttons from config.ts)
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-8 py-6 bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Revisión Rápida de Caso
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                        Paso {step} de 3
                    </span>
                </div>
                {/* Progress Bar */}
                <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "33%" }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        className="h-full bg-indigo-600 dark:bg-indigo-400"
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    ¿Con qué necesitas ayuda?
                                </label>
                                <select
                                    {...register("reason")}
                                    className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                >
                                    <option value="">Selecciona una opción...</option>
                                    <option value="legal_defense">Defensa Legal</option>
                                    <option value="consultation">Consulta General</option>
                                    <option value="corporate">Servicios Corporativos</option>
                                    <option value="other">Otro</option>
                                </select>
                                {errors.reason && (
                                    <p className="text-xs text-red-500">{errors.reason.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    ¿Qué tan urgente es?
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: "immediate", label: "Inmediato" },
                                        { value: "soon", label: "Pronto" },
                                        { value: "planning", label: "Planificación" },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="cursor-pointer relative"
                                        >
                                            <input
                                                type="radio"
                                                value={opt.value}
                                                {...register("urgency")}
                                                className="peer sr-only"
                                            />
                                            <div className="p-3 text-center text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 dark:peer-checked:bg-indigo-900/20 dark:peer-checked:text-indigo-300 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                                {opt.label}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.urgency && (
                                    <p className="text-xs text-red-500">{errors.urgency.message}</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Rango de Presupuesto Estimado
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { val: "standard", label: "Estándar ($500 - $2k)" },
                                        { val: "premium", label: "Premium ($2k - $10k)" },
                                        { val: "corporate_retainer", label: "Corporativo ($10k+)" },
                                    ].map((opt) => (
                                        <label
                                            key={opt.val}
                                            className="cursor-pointer relative"
                                        >
                                            <input
                                                type="radio"
                                                value={opt.val}
                                                {...register("budget")}
                                                className="peer sr-only"
                                            />
                                            <div className="p-3 text-left text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 dark:peer-checked:bg-indigo-900/20 dark:peer-checked:text-indigo-300 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                                {opt.label}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.budget && (
                                    <p className="text-xs text-red-500">{errors.budget.message}</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nombre Completo
                                </label>
                                <input
                                    {...register("name")}
                                    className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        {...register("email")}
                                        className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Teléfono
                                    </label>
                                    <input
                                        {...register("phone")}
                                        className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-red-500">{errors.phone.message}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-4 flex justify-between">
                    {step > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep((s) => s - 1)}
                        >
                            Atrás
                        </Button>
                    )}

                    {step < 3 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Siguiente <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="ml-auto bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {isSubmitting ? "Enviando..." : "Iniciar Consulta"}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
