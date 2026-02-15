import { useState, useEffect, useCallback } from 'react';

import { config } from '../config';
import { getVisitorId } from '@/lib/analytics';
import { getTrafficSource } from '@/lib/traffic';


// Types
export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    sources?: Array<{ title: string; url: string }>;
    escalate?: boolean; // If true, show "Contact Human" option
}

export interface UseChatProps {
    // webhookUrl is now optional here as it defaults to config
    webhookUrl?: string;
    clientId: string;
}

export const useChat = ({ webhookUrl = config.chatbot.webhookUrl, clientId }: UseChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    // 1. Initialize Session & Load History
    useEffect(() => {
        let storedSessionId = localStorage.getItem('chat_session_id');
        if (!storedSessionId) {
            storedSessionId = window.crypto.randomUUID();
            localStorage.setItem('chat_session_id', storedSessionId);
        }
        setSessionId(storedSessionId);

        // Load messages from local storage (Client-side persistence for "refresh" safety)
        const storedMessages = localStorage.getItem(`chat_history_${storedSessionId}`);
        if (storedMessages) {
            try {
                const parsed = JSON.parse(storedMessages);
                // Fix date strings back to Date objects
                setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        } else {
            // Initial greeting if no history
            setMessages([{
                id: 'init-1',
                text: config.chatbot.messages.welcome,
                sender: 'bot',
                timestamp: new Date()
            }]);
        }
    }, [clientId]);

    // 2. Persist Messages on Change
    useEffect(() => {
        if (sessionId && messages.length > 0) {
            localStorage.setItem(`chat_history_${sessionId}`, JSON.stringify(messages));
        }
    }, [messages, sessionId]);

        // [NEW] Agent 2: Data Enrichment Trigger
    useEffect(() => {
        const enrichSession = async () => {
            if (!sessionId) return;

            // Avoid re-enriching if already done for this session (optimization)
            const isEnriched = sessionStorage.getItem(`enriched_${sessionId}`);
            if (isEnriched) return;

            try {
                // 1. Get Client IP (Client-side)
                const ipRes = await fetch('https://api64.ipify.org?format=json');
                const { ip } = await ipRes.json();

                // 2. Send to Enrichment Webhook (n8n)
                // Using a dedicated endpoint for enrichment or the same chat webhook with a special action
                // For this implementation, we'll assume a dedicated 'enrichment' action to the same webhook for simplicity
                // or a new configurable URL. Let's reuse the botWebhook for now with a different action.
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'enrich_data',
                        sessionId: sessionId,
                        visitorId: getVisitorId(),
                        ip: ip,
                        metadata: { 
                            clientId,
                            traffic_source: getTrafficSource(),
                            referrer: document.referrer || 'none'
                        }
                    })
                });

                sessionStorage.setItem(`enriched_${sessionId}`, 'true');
                console.log('Session enriched with IP:', ip);
            } catch (error) {
                console.error('Enrichment failed:', error);
            }
        };

        enrichSession();
    }, [sessionId, webhookUrl, clientId]);

    // 3. Send Message Logic
    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;
        if (!clientId) {
            console.error("Client ID missing. Message blocked.");
            return;
        }

        const userMsg: Message = {
            id: window.crypto.randomUUID(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Note: The n8n webhook schema might need adaptation. 
            // Standardizing on sending { message: text, sessionId: sessionId }
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'sendMessage',
                    sessionId: sessionId,
                    visitorId: getVisitorId(),
                    chatInput: text,
                    // Additional metadata if needed by n8n workflow
                    metadata: { 
                        clientId,
                        traffic_source: getTrafficSource(),
                        referrer: document.referrer || 'none'
                    }
                })
            });


            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            // Expected n8n output: { output: "Bot response text", sources?: [], ... }
            // OR array of messages. Handling generic object for now.
            const botText = data.output || data.text || data.message || "Lo siento, tuve un problema procesando tu respuesta.";
            const sources = data.sources || [];

            // Check for negative intent flag from backend or basic keyword check
            // Simulating basic keyword check if backend doesn't provide it
            const isNegative = config.chatbot.messages.negativeIntentKeywords.some(keyword => 
                text.toLowerCase().includes(keyword)
            );

            const botMsg: Message = {
                id: window.crypto.randomUUID(),
                text: botText,
                sender: 'bot',
                timestamp: new Date(),
                sources: sources,
                escalate: isNegative // Trigger escalation UI
            };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, {
                id: window.crypto.randomUUID(),
                text: config.chatbot.messages.error,
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [webhookUrl, sessionId, clientId]);

    const clearHistory = () => {
        if (sessionId) {
            localStorage.removeItem(`chat_history_${sessionId}`);
        }
        setMessages([{
            id: window.crypto.randomUUID(),
            text: config.chatbot.messages.reset,
            sender: 'bot',
            timestamp: new Date()
        }]);
    };

    return {
        messages,
        isLoading,
        sendMessage,
        clearHistory,
        isOpen,
        setIsOpen
    };
};
