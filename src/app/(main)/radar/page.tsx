'use client';

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TopBar } from '@/components/layout/TopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Chip } from '@/components/ui/Chip';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Users, Navigation } from 'lucide-react';
import { cn, formatDistance } from '@/lib/utils';

const FILTERS = [
  { id: 'all', label: 'Todos', emoji: '🌍' },
  { id: 'cafe', label: 'Cafe', emoji: '☕' },
  { id: 'running', label: 'Running', emoji: '🏃' },
  { id: 'afteroffice', label: 'After Office', emoji: '🍻' },
  { id: 'brunch', label: 'Brunch', emoji: '🥐' },
  { id: 'cultural', label: 'Cultural', emoji: '🎨' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
];

const MOCK_MARKERS = [
  { id: 'p1', type: 'person' as const, name: 'Laura', score: 88, x: 22, y: 28, color: 'from-pink-500 to-rose-500', intention: 'Amistad', online: true },
  { id: 'p2', type: 'person' as const, name: 'Miguel', score: 76, x: 48, y: 58, color: 'from-blue-500 to-cyan-500', intention: 'Networking', online: true },
  { id: 'p3', type: 'person' as const, name: 'Sofia', score: 92, x: 68, y: 22, color: 'from-violet-500 to-purple-500', intention: 'Deporte', online: true },
  { id: 'p4', type: 'person' as const, name: 'Diego', score: 65, x: 82, y: 62, color: 'from-emerald-500 to-green-500', intention: 'Quedadas', online: false },
  { id: 'p5', type: 'person' as const, name: 'Elena', score: 84, x: 32, y: 72, color: 'from-amber-500 to-orange-500', intention: 'Cultural', online: true },
  { id: 'e1', type: 'event' as const, name: 'After Office', x: 55, y: 40, emoji: '🍻', participants: 4 },
  { id: 'e2', type: 'event' as const, name: 'Running Retiro', x: 20, y: 50, emoji: '🏃', participants: 6 },
  { id: 'e3', type: 'event' as const, name: 'Brunch', x: 70, y: 75, emoji: '🥐', participants: 3 },
  { id: 'e4', type: 'event' as const, name: 'Expo Arte', x: 85, y: 30, emoji: '🎨', participants: 5 },
  { id: 'e5', type: 'event' as const, name: 'Cafe Talk', x: 50, y: 20, emoji: '☕', participants: 2 },
];

const MOCK_NEARBY = [
  { id: 'u1', type: 'person' as const, name: 'Laura G.', intention: 'Amistad', distance: 350, score: 88 },
  { id: 'u2', type: 'person' as const, name: 'Miguel R.', intention: 'Networking', distance: 520, score: 76 },
  { id: 'u3', type: 'person' as const, name: 'Sofia P.', intention: 'Deporte', distance: 800, score: 92 },
  { id: 'e1', type: 'plan' as const, emoji: '🍻', title: 'After Office Malasaña', time: '19:00', distance: 400, participants: 4 },
  { id: 'e2', type: 'plan' as const, emoji: '🏃', title: 'Running Retiro', time: '07:30', distance: 1200, participants: 6 },
  { id: 'e3', type: 'plan' as const, emoji: '🥐', title: 'Brunch Dominical', time: '11:00', distance: 2000, participants: 3 },
];

export default function RadarPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <PageWrapper>
      <TopBar title="Radar" showNotifications />

      <div className="px-4 space-y-4 pb-4">
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {FILTERS.map((filter) => (
            <Chip
              key={filter.id}
              selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              icon={<span className="text-sm">{filter.emoji}</span>}
            >
              {filter.label}
            </Chip>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="relative w-full h-[440px] rounded-2xl overflow-hidden border border-white/5">
          {/* Dark map background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
            {/* Grid lines to simulate map */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`h${i}`} className="absolute w-full h-px bg-white/30" style={{ top: `${(i + 1) * 12}%` }} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`v${i}`} className="absolute h-full w-px bg-white/30" style={{ left: `${(i + 1) * 12}%` }} />
              ))}
            </div>

            {/* Radial gradient for "radar" effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.12)_0%,transparent_60%)]" />

            {/* Street-like paths */}
            <div className="absolute top-[40%] left-0 right-0 h-[2px] bg-white/8 rounded-full" />
            <div className="absolute top-0 bottom-0 left-[50%] w-[2px] bg-white/8 rounded-full" />
            <div className="absolute top-[20%] left-[10%] w-[40%] h-[2px] bg-white/6 rounded-full rotate-[25deg]" />
            <div className="absolute top-[60%] left-[30%] w-[50%] h-[2px] bg-white/6 rounded-full -rotate-[15deg]" />
          </div>

          {/* Center indicator (you) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-accent-primary"
              />
              <div className="h-4 w-4 rounded-full bg-accent-primary border-2 border-white shadow-lg shadow-accent-primary/50 relative z-10" />
            </div>
          </div>

          {/* Markers */}
          {MOCK_MARKERS.map((marker, i) => (
            <motion.div
              key={marker.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
              className="absolute z-10 cursor-pointer"
              style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => marker.type === 'person' ? router.push(`/profile/${marker.id}`) : router.push(`/missions/${marker.id}`)}
            >
              {marker.type === 'person' ? (
                <div className="relative group flex flex-col items-center">
                  {/* Pulse ring for online users */}
                  {marker.online && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      className={cn('absolute rounded-full bg-gradient-to-br', marker.color)}
                      style={{ width: 48, height: 48, top: 0, left: '50%', transform: 'translateX(-50%)' }}
                    />
                  )}
                  {/* Avatar circle — large */}
                  <div className={cn(
                    'h-12 w-12 rounded-full bg-gradient-to-br flex items-center justify-center text-base font-bold text-white border-[2.5px] border-bg-primary shadow-xl relative z-10',
                    marker.color
                  )}>
                    {marker.name[0]}
                  </div>
                  {/* Online dot */}
                  {marker.online && (
                    <div className="absolute top-0 right-0 z-20 h-3 w-3 rounded-full bg-green-400 border-2 border-bg-primary" style={{ transform: 'translate(15%, -5%)' }} />
                  )}
                  {/* Score badge */}
                  <div className="absolute -top-2 -right-3 z-20 bg-bg-secondary/95 backdrop-blur border border-white/10 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-accent-primary shadow-md">
                    {marker.score}
                  </div>
                  {/* Name + intention label (always visible) */}
                  <div className="mt-1 flex flex-col items-center z-10">
                    <span className="text-[11px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      {marker.name}
                    </span>
                    <span className="text-[8px] font-medium text-text-muted bg-bg-secondary/70 backdrop-blur px-1.5 py-[1px] rounded-full whitespace-nowrap mt-0.5">
                      {marker.intention}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-9 w-9 rounded-xl bg-bg-secondary/90 backdrop-blur border border-white/10 flex items-center justify-center text-lg shadow-lg">
                      {marker.emoji}
                    </div>
                    <div className="h-2 w-2 bg-bg-secondary/90 border border-white/10 rotate-45 -mt-1" />
                  </motion.div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-bg-secondary/90 backdrop-blur px-1.5 py-0.5 rounded text-[9px] text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {marker.name}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
            <button className="h-9 w-9 rounded-full bg-bg-secondary/80 backdrop-blur border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
              <Navigation className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Nearby section */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-3">Cerca de ti</h2>
          <div className="space-y-3">
            {MOCK_NEARBY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {item.type === 'person' ? (
                  <Card
                    variant="interactive"
                    onClick={() => router.push(`/profile/${item.id}`)}
                  >
                    <div className="p-4 flex items-center gap-3">
                      <Avatar name={item.name} size="md" online />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary">{item.name}</p>
                        <Badge variant="info" size="sm">{item.intention}</Badge>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {formatDistance(item.distance)}
                        </span>
                        <ScoreBadge score={item.score} size="sm" />
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card
                    variant="interactive"
                    onClick={() => router.push(`/missions/${item.id}`)}
                  >
                    <div className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-bg-tertiary flex items-center justify-center text-xl shrink-0">
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                        <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                          <Clock className="h-3 w-3" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {formatDistance(item.distance)}
                        </span>
                        <Badge variant="default" size="sm">
                          <Users className="h-3 w-3" />
                          {item.participants}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
