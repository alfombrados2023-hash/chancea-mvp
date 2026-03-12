'use client';

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TopBar } from '@/components/layout/TopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, Users, Zap, Plus } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'cafe', label: 'Cafe' },
  { id: 'deporte', label: 'Deporte' },
  { id: 'social', label: 'Social' },
  { id: 'cultural', label: 'Cultural' },
];

const MOCK_MISSIONS = [
  {
    id: 'm1',
    emoji: '☕',
    title: 'Cafe & Conversacion',
    category: 'cafe',
    xp: 120,
    time: 'Hoy, 16:00',
    participants: 3,
    capacity: 4,
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'm2',
    emoji: '🏃',
    title: 'Running matutino',
    category: 'deporte',
    xp: 150,
    time: 'Mañana, 07:30',
    participants: 5,
    capacity: 10,
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 'm3',
    emoji: '🍻',
    title: 'After Office viernes',
    category: 'social',
    xp: 100,
    time: 'Vie, 19:00',
    participants: 6,
    capacity: 8,
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'm4',
    emoji: '🎨',
    title: 'Visita al museo',
    category: 'cultural',
    xp: 180,
    time: 'Sab, 11:00',
    participants: 2,
    capacity: 6,
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    id: 'm5',
    emoji: '🥐',
    title: 'Brunch dominical',
    category: 'social',
    xp: 110,
    time: 'Dom, 11:30',
    participants: 3,
    capacity: 5,
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 'm6',
    emoji: '⚽',
    title: 'Futbol 5 en Retiro',
    category: 'deporte',
    xp: 200,
    time: 'Sab, 10:00',
    participants: 8,
    capacity: 10,
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 'm7',
    emoji: '📚',
    title: 'Club de lectura',
    category: 'cultural',
    xp: 130,
    time: 'Mie, 18:30',
    participants: 4,
    capacity: 8,
    gradient: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    id: 'm8',
    emoji: '🎶',
    title: 'Concierto en vivo',
    category: 'cultural',
    xp: 160,
    time: 'Jue, 21:00',
    participants: 7,
    capacity: 12,
    gradient: 'from-red-500/20 to-orange-500/20',
  },
];

export default function MissionsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? MOCK_MISSIONS
    : MOCK_MISSIONS.filter((m) => m.category === activeCategory);

  return (
    <PageWrapper>
      <TopBar title="Misiones" showNotifications />

      <div className="px-4 space-y-4 pb-24">
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.id}
              selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Chip>
          ))}
        </div>

        {/* Mission grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((mission, i) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                variant="interactive"
                onClick={() => router.push(`/missions/${mission.id}`)}
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${mission.gradient} flex items-center justify-center text-2xl`}>
                      {mission.emoji}
                    </div>
                    <Badge variant="purple" size="sm">
                      <Zap className="h-3 w-3" />
                      +{mission.xp}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-bold text-text-primary mb-2 line-clamp-2">
                    {mission.title}
                  </h3>

                  <div className="mt-auto space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span className="truncate">{mission.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Users className="h-3 w-3 shrink-0" />
                      <span>{mission.participants}/{mission.capacity}</span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full mt-3">
                    Unirme
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating action button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {}}
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-accent-primary to-[#FF8F65] shadow-lg shadow-accent-primary/30 flex items-center justify-center text-white z-30"
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </PageWrapper>
  );
}
