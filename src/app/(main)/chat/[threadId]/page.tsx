'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { cn, formatCountdown } from '@/lib/utils';
import { ChevronLeft, Send, Clock, AlertTriangle } from 'lucide-react';

const MOCK_THREAD = {
  event: 'Cafe & Conversacion',
  eventId: 'm1',
  expiresAt: '2026-03-12T20:00:00',
  participants: [
    { id: 'u1', name: 'Laura G.' },
    { id: 'me', name: 'Tu' },
  ],
};

const INITIAL_MESSAGES = [
  { id: '1', senderId: 'u1', text: 'Hola! Vi que te apuntaste al cafe de mañana 😊', time: '14:20' },
  { id: '2', senderId: 'me', text: 'Hola Laura! Si, me parece un planazo', time: '14:21' },
  { id: '3', senderId: 'u1', text: 'Conoces el Cafe Federal? Es super acogedor', time: '14:22' },
  { id: '4', senderId: 'me', text: 'He pasado por ahi varias veces pero nunca he entrado', time: '14:23' },
  { id: '5', senderId: 'u1', text: 'Te va a encantar, tienen un cafe de especialidad increible', time: '14:24' },
  { id: '6', senderId: 'me', text: 'Perfecto! A que hora quedamos exactamente?', time: '14:25' },
  { id: '7', senderId: 'u1', text: 'El plan dice a las 16:00, te parece bien?', time: '14:28' },
  { id: '8', senderId: 'me', text: 'Si! Ahi estare puntual', time: '14:29' },
  { id: '9', senderId: 'u1', text: 'Genial! Nos vemos a las 16:00 entonces 😊', time: '14:30' },
  { id: '10', senderId: 'u1', text: 'Por cierto, yo llevo una chaqueta azul para que me reconozcas', time: '14:31' },
];

export default function ChatConversationPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: `new-${Date.now()}`,
      senderId: 'me',
      text: input.trim(),
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const expiryCountdown = formatCountdown(MOCK_THREAD.expiresAt);

  return (
    <div className="flex flex-col h-screen bg-bg-primary max-w-lg mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-bg-primary/90 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={() => router.back()}
          className="h-9 w-9 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-primary truncate">
            {MOCK_THREAD.event}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-text-muted">
            <Clock className="h-3 w-3" />
            <span>Expira en {expiryCountdown}</span>
          </div>
        </div>

        <div className="flex -space-x-2 shrink-0">
          {MOCK_THREAD.participants.map((p) => (
            <Avatar
              key={p.id}
              name={p.name}
              size="sm"
              className="border-2 border-bg-primary"
            />
          ))}
        </div>
      </header>

      {/* Expiry warning banner */}
      <div className="px-4 py-2 bg-accent-warning/10 border-b border-accent-warning/20 flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-accent-warning shrink-0" />
        <p className="text-[11px] text-accent-warning">
          Chat expira en {expiryCountdown} - Los mensajes se eliminaran despues del evento
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => {
          const isOwn = msg.senderId === 'me';
          const showAvatar =
            !isOwn && (i === 0 || messages[i - 1].senderId !== msg.senderId);

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn('flex gap-2', isOwn ? 'justify-end' : 'justify-start')}
            >
              {!isOwn && (
                <div className="w-7 shrink-0">
                  {showAvatar && (
                    <Avatar
                      name={
                        MOCK_THREAD.participants.find((p) => p.id === msg.senderId)
                          ?.name ?? '?'
                      }
                      size="sm"
                    />
                  )}
                </div>
              )}

              <div
                className={cn(
                  'max-w-[75%] px-4 py-2.5 rounded-2xl',
                  isOwn
                    ? 'bg-gradient-to-r from-accent-primary to-[#FF8F65] text-white rounded-br-md'
                    : 'bg-bg-secondary text-text-primary border border-white/5 rounded-bl-md'
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p
                  className={cn(
                    'text-[10px] mt-1',
                    isOwn ? 'text-white/60 text-right' : 'text-text-muted'
                  )}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-bg-primary/90 backdrop-blur-xl border-t border-white/5 p-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            className="flex-1 h-11 px-4 rounded-full bg-bg-tertiary border border-white/5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              'h-11 w-11 rounded-full flex items-center justify-center shrink-0 transition-all',
              input.trim()
                ? 'bg-gradient-to-r from-accent-primary to-[#FF8F65] text-white shadow-lg shadow-accent-primary/25'
                : 'bg-bg-tertiary text-text-muted'
            )}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
