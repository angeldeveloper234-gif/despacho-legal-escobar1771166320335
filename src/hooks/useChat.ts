import { useState, useEffect, useCallback } from 'react';

import { config } from '../config';
import { getVisitorId } from '@/lib/analytics';
import { getTrafficSource } from '@/lib/traffic';


// Types
export interface Message {
    id: string;
    text?: string;
    image?: string;
    video?: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    sources?: Array<{ title: string; url: string }>;
    escalate?: boolean;
    options?: string[];
}

export interface UseChatProps {
    clientId: string;
}

export const useChat = ({ clientId }: UseChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    const { typebot, apiHost } = config.chatbot;

    // Helper to parse Typebot responses (text, images, videos, choices)
    const parseTypebotResponse = (data: any): Partial<Message>[] => {
        const messages: Partial<Message>[] = [];

        if (data.messages) {
            data.messages.forEach((msg: any) => {
                const newMsg: Partial<Message> = {};

                if (msg.type === 'text') {
                    // Extract text from richText structure or direct content
                    if (msg.content?.richText) {
                        newMsg.text = msg.content.richText
                            .map((block: any) => {
                                const children = block.children || [];
                                return children.map((child: any) => child.text || '').join('');
                            })
                            .join('\n');
                    } else if (typeof msg.content === 'string') {
                        newMsg.text = msg.content;
                    } else if (msg.content?.text) {
                        newMsg.text = msg.content.text;
                    }
                } else if (msg.type === 'image') {
                    newMsg.image = msg.content?.url || msg.url || msg.content;
                } else if (msg.type === 'video' || msg.type === 'gif' || msg.type === 'video input') {
                    newMsg.video = msg.content?.url || msg.url || msg.content;
                } else if (msg.type === 'embed') {
                    newMsg.video = msg.content?.url || msg.url || msg.content;
                }

                if (newMsg.text || newMsg.image || newMsg.video) {
                    messages.push(newMsg);
                }
            });
        }

        const input = data.input;
        if (input && (input.type === 'choice' || input.type === 'buttons' || input.type === 'choice input' || input.type?.includes('choice'))) {
            const items = input.items || [];
            const options = items.map((item: any) => item.content || item.label || item.item || item.text);

            if (options.length > 0) {
                if (messages.length > 0) {
                    messages[messages.length - 1].options = options;
                } else {
                    messages.push({ text: 'Selecciona una opción:', options });
                }
            }
        }

        return messages;
    };

    // 1. Initialize Session & Load History or Start New
    useEffect(() => {
        const initChat = async () => {
            let storedSessionId = localStorage.getItem('chat_session_id');
            const storedMessages = localStorage.getItem(`chat_history_${storedSessionId}`);

            if (storedSessionId && storedMessages) {
                setSessionId(storedSessionId);
                try {
                    const parsed = JSON.parse(storedMessages);
                    setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
                } catch (e) {
                    console.error("Failed to parse chat history", e);
                }
            } else {
                // Call Typebot startChat
                setIsLoading(true);
                try {
                    const response = await fetch(`${apiHost}/api/v1/typebots/${typebot}/startChat`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            isStreamEnabled: false,
                            prefilledVariables: {
                                "Client ID": clientId,
                                "Platform": "Web / Escobar Legal",
                                "URL": window.location.href,
                                "Visitor ID": getVisitorId(),
                                "Traffic Source": getTrafficSource()
                            }
                        })
                    });
                    const data = await response.json();

                    if (data.sessionId) {
                        setSessionId(data.sessionId);
                        setIsLoading(false);
                    }

                    const botMsgsData = parseTypebotResponse(data);
                    const newMessages: Message[] = botMsgsData.map((m, i) => ({
                        id: `init-${i}`,
                        text: m.text,
                        image: m.image,
                        video: m.video,
                        options: m.options,
                        sender: 'bot',
                        timestamp: new Date()
                    }));

                    if (newMessages.length === 0) {
                        newMessages.push({
                            id: 'init-default',
                            text: config.chatbot.messages.welcome,
                            sender: 'bot',
                            timestamp: new Date()
                        });
                    }

                    setMessages(newMessages);
                } catch (error) {
                    console.error("Failed to start Typebot chat", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        initChat();
    }, [typebot, apiHost, clientId]);

    // 2. Persist Messages on Change
    useEffect(() => {
        if (sessionId && messages.length > 0) {
            localStorage.setItem(`chat_history_${sessionId}`, JSON.stringify(messages));
        }
    }, [messages, sessionId]);

    // 3. Send Message Logic
    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || !sessionId) return;

        const userMsg: Message = {
            id: window.crypto.randomUUID(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await fetch(`${apiHost}/api/v1/sessions/${sessionId}/continueChat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const botMsgsData = parseTypebotResponse(data);

            const botMessages: Message[] = botMsgsData.map(m => ({
                id: window.crypto.randomUUID(),
                text: m.text,
                image: m.image,
                video: m.video,
                options: m.options,
                sender: 'bot',
                timestamp: new Date(),
                escalate: config.chatbot.messages.negativeIntentKeywords.some(keyword =>
                    text.toLowerCase().includes(keyword)
                )
            }));

            setMessages(prev => [...prev, ...botMessages]);

        } catch (error) {
            console.error('Error continuing Typebot chat:', error);
            setMessages(prev => [...prev, {
                id: window.crypto.randomUUID(),
                text: config.chatbot.messages.error,
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId, apiHost]);

    const clearHistory = () => {
        localStorage.removeItem('chat_session_id');
        if (sessionId) {
            localStorage.removeItem(`chat_history_${sessionId}`);
        }
        setSessionId('');
        setMessages([]);
        window.location.reload();
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
