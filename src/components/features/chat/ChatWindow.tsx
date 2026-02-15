import React, { useEffect, useRef } from 'react';
import { Message } from '../../../hooks/useChat';
import { Bot, User, Volume2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeech } from '../../../hooks/useSpeech';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const { speak, isSpeaking, stopSpeaking } = useSpeech();

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Format time helper
    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(date);
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            <AnimatePresence>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'bot' ? 'bg-blue-600' : 'bg-zinc-700'
                            }`}>
                            {msg.sender === 'bot' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-zinc-300" />}
                        </div>

                        {/* Message Bubble */}
                        <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed relative group ${msg.sender === 'user'
                                    ? 'bg-blue-600/20 text-blue-100 border border-blue-500/20 rounded-tr-sm'
                                    : 'bg-zinc-800 text-zinc-100 border border-white/10 rounded-tl-sm'
                                }`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>

                                {/* Audio Output Button (Only for Bot) */}
                                {msg.sender === 'bot' && (
                                    <button
                                        onClick={() => isSpeaking ? stopSpeaking() : speak(msg.text)}
                                        className={`absolute -right-8 top-1 p-1.5 rounded-full bg-zinc-800 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-400 hover:bg-zinc-700 ${isSpeaking ? 'text-blue-500 opacity-100' : ''}`}
                                        title="Escuchar"
                                    >
                                        <Volume2 size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Metadata / Sources */}
                            <div className="flex items-center gap-2 mt-1 px-1">
                                <span className="text-[10px] text-zinc-500">{formatTime(msg.timestamp)}</span>
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="flex gap-1">
                                        {msg.sources.map((source, idx) => (
                                            <a
                                                key={idx}
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                                            >
                                                {source.title || 'Fuente'}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Escalation Button (Negative Intent) */}
                            {msg.sender === 'bot' && msg.escalate && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-2 w-full"
                                >
                                    <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs py-2 px-3 rounded-lg transition-colors">
                                        <AlertCircle size={14} />
                                        Hablar con un Humano
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {isLoading && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-zinc-800 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    );
};
