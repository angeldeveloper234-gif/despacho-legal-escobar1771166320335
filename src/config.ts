export const config = {
    // Unique Client ID for this Landing Page
    landingClientId: "30727c70-d179-4f1d-ab7b-61d5275c1f31",

    // Webhook for the 'SpeedContactForm' (Leads)
    contactFormWebhook: "https://cartographic-shamika-predetrimental.ngrok-free.dev/webhook-test/contact-form",

    // Supabase Configuration
    supabase: {
        url: import.meta.env.VITE_SUPABASE_URL,
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    },

    // External Links
    bookingUrl: "#contact", 
    paymentLink: "https://buy.stripe.com/", 
    googleMapsReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",

    // Chatbot Configuration
    chatbot: {
        webhookUrl: import.meta.env.VITE_N8N_CHAT_WEBHOOK || "https://cartographic-shamika-predetrimental.ngrok-free.dev/webhook/187f7214-634a-4ba4-ae42-f1518eb50fa2/chat",
        
        ui: {
            title: "Asistente Legal",
            subtitle: "Escobar & Asociados",
            footerText: "Defensa Corporativa Inteligente",
            primaryColor: "bg-[#C6A87C] hover:bg-[#b0936a]", 
            gradient: "from-[#C6A87C] to-[#8c7350]",
            accentColor: "bg-red-500"
        },
        
        messages: {
            welcome: "Bienvenido a Escobar & Asociados. ¿En qué asunto legal podemos asistirle hoy?",
            reset: "Conversación reiniciada.",
            error: "Error de conexión. Por favor intente nuevamente.",
            fallback: "Disculpe, no he comprendido. ¿Podría reformular?",
            negativeIntentKeywords: ['no me sirve', 'inútil', 'basura', 'humano', 'persona']
        }
    },

    // Demo User Data
    demoUser: {
        name: "Cliente Potencial",
        email: "cliente@demo.com",
        whatsapp: "+520000000000"
    },

    // Analytics Configuration
    analytics: {
        webhookUrl: "https://cartographic-shamika-predetrimental.ngrok-free.dev/webhook-test/analytics",
        enabled: true
    }
};