'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { TopBar } from '@/components/layout/TopBar';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

const MOCK_THREADS = [
  {
    id: 't1',
    person: { name: 'Laura G.', online: true },
    event: 'Cafe & Conversacion',
    lastMessage: 'Genial! Nos vemos a las 16:00 entonces 😊',
    time: '2026-03-11T14:30:00',
    unread: 2,
  },
  {
    id: 't2',
    person: { name: 'Miguel R.', online: false },
    event: 'Running Retiro',
    lastMessage: 'Llevo las botellas de agua, no te preocupes',
    time: '2026-03-11T10:15:00',
    unread: 0,
  },
  {
    id: 't3',
    person: { name: 'Sofia P.', online: true },
    event: 'After Office Malasaña',
    lastMessage: 'He reservado mesa para 6 en La Bicicleta',
    time: '2026-03-10T22:00:00',
    unread: 1,
  },
  {
    id: 't4',
    person: { name: 'Carlos M.', online: false },
    event: 'Brunch dominical',
    lastMessage: 'Perfecto, el sitio esta muy bien',
    time: '2026-03-09T18:45:00',
    unread: 0,
  },
];

export default function ChatPage() {
  const router = useRouter();
  const hasChats = MOCK_THREADS.length > 0;

  return (
    <PageWrapper>
      <TopBar title="Mensajes" showNotifications={false} />

      <div className="px-4 pb-4">
        {!hasChats ? (
          <EmptyState
            icon={<MessageCircle className="h-7 w-7" />}
            title="Sin mensajes"
            description="Unete a una mision para empezar a chatear con otros participantes"
            actionLabel="Explorar misiones"
            onAction={() => router.push('/missions')}
          />
        ) : (
          <div className="space-y-1">
            {MOCK_THREADS.map((thread, i) => (
              <motion.button
                key={thread.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => router.push(`/chat/${thread.id}`)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-bg-secondary transition-colors text-left"
              >
                <div className="relative shrink-0">
                  <Avatar
                    name={thread.person.name}
                    size="lg"
                    online={thread.person.online}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {thread.person.name}
                    </p>
                    <span className="text-[11px] text-text-muted shrink-0 ml-2">
                      {formatTimeAgo(thread.time)}
                    </span>
                  </div>
                  <p className="text-xs text-accent-primary font-medium mb-0.5 truncate">
                    {thread.event}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {thread.lastMessage}
                  </p>
                </div>

                {thread.unread > 0 && (
                  <div className="shrink-0">
                    <div className="h-5 min-w-5 px-1.5 rounded-full bg-accent-primary flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">
                        {thread.unread}
                      </span>
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
