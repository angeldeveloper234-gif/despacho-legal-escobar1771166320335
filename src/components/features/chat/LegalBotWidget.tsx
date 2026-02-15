import React from 'react';
import { useChat } from '../../../hooks/useChat';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import { MessageCircle, X, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../../../config';

interface LegalBotWidgetProps {
    webhookUrl?: string;
    clientId: string;
}

export const LegalBotWidget: React.FC<LegalBotWidgetProps> = ({ webhookUrl, clientId }) => {
    // Use config URL if prop is not provided
    const finalWebhookUrl = webhookUrl || config.chatbot.webhookUrl;
    const { messages, isLoading, sendMessage, isOpen, setIsOpen, clearHistory } = useChat({ webhookUrl: finalWebhookUrl, clientId });
    const { ui } = config.chatbot;

    return (
        <>
            {/* Toggle Button (Floating) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className={`fixed bottom-6 right-6 z-50 p-4 ${ui.primaryColor} text-white rounded-full shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group`}
                    >
                        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />

                        {/* Notification Badge if messages exist but closed */}
                        {messages.length > 1 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-zinc-900"></span>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window Container */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] md:inset-auto md:bottom-6 md:right-6 w-full h-full md:w-[400px] md:h-[600px] md:max-h-[80vh] flex flex-col bg-zinc-900 border border-white/10 md:rounded-2xl shadow-2xl overflow-hidden glass-panel"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${ui.gradient} flex items-center justify-center shadow-lg`}>
                                        <MessageCircle size={20} className="text-white" />
                                    </div>
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 ${ui.accentColor} border-2 border-zinc-900 rounded-full`}></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">{ui.title}</h3>
                                    <p className="text-xs text-blue-400">{ui.subtitle}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearHistory}
                                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                                    title="Borrar historial"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <ChatWindow messages={messages} isLoading={isLoading} />

                        {/* Input */}
                        <ChatInput onSend={sendMessage} isLoading={isLoading} />

                        {/* Branding */}
                        <div className="px-4 py-2 bg-black/40 text-[10px] text-center text-zinc-600">
                            {ui.footerText}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
