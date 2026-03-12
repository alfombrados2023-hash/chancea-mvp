'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { XPBar } from '@/components/ui/XPBar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Settings,
  BadgeCheck,
  TrendingUp,
  TrendingDown,
  Calendar,
  Edit3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_USER = {
  name: 'Sergio Martinez',
  age: 28,
  city: 'Madrid',
  verified: true,
  intention: 'Amistad',
  bio: 'Amante del cafe, la tecnologia y las buenas conversaciones. Siempre buscando conocer gente nueva y descubrir rincones de la ciudad. Creo que las mejores conexiones nacen de forma espontanea.',
  score: 85,
  level: 4,
  xpCurrent: 340,
  xpMax: 500,
  eventsCount: 12,
  interests: ['Cafe', 'Tecnologia', 'Running', 'Cine', 'Viajes', 'Fotografia'],
};

const MOCK_BADGES = [
  { id: 'b1', emoji: '☕', name: 'Cafetero', description: '5 misiones de cafe', earned: true },
  { id: 'b2', emoji: '🔥', name: 'En racha', description: '7 dias seguidos', earned: true },
  { id: 'b3', emoji: '⭐', name: 'Top Score', description: 'Score > 80', earned: true },
  { id: 'b4', emoji: '🏃', name: 'Deportista', description: '10 misiones deportivas', earned: false },
  { id: 'b5', emoji: '🌍', name: 'Explorador', description: 'Visita 20 sitios', earned: false },
  { id: 'b6', emoji: '👑', name: 'Veterano', description: 'Nivel 10', earned: false },
];

const MOCK_REPUTATION = [
  { id: 'r1', delta: +3, reason: 'Check-in puntual', date: 'Hoy' },
  { id: 'r2', delta: +5, reason: 'Valoracion positiva de Laura G.', date: 'Ayer' },
  { id: 'r3', delta: -2, reason: 'No-show en Running', date: 'Hace 3d' },
  { id: 'r4', delta: +4, reason: 'Mision completada', date: 'Hace 5d' },
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <PageWrapper>
      {/* Cover gradient */}
      <div className="relative h-36 bg-gradient-to-br from-accent-primary via-[#FF8F65] to-accent-secondary">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => router.push('/settings')}
            className="h-9 w-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Avatar & name */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <Avatar name={MOCK_USER.name} size="xl" verified={MOCK_USER.verified} className="border-4 border-bg-primary" />
          <h1 className="text-xl font-black text-text-primary mt-3">
            {MOCK_USER.name}
          </h1>
          <p className="text-sm text-text-muted">
            {MOCK_USER.age} · {MOCK_USER.city}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            {MOCK_USER.verified && (
              <Badge variant="info" size="sm">
                <BadgeCheck className="h-3 w-3" />
                Verificado
              </Badge>
            )}
          </div>
          <Badge variant="purple" size="md" className="mt-2">
            Busco: {MOCK_USER.intention}
          </Badge>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8 mt-6">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="default" className="p-4 flex flex-col items-center">
            <ScoreBadge score={MOCK_USER.score} size="md" />
            <p className="text-[11px] text-text-muted mt-1.5">Score</p>
          </Card>
          <Card variant="default" className="p-4 flex flex-col items-center">
            <div className="mb-1">
              <XPBar current={MOCK_USER.xpCurrent} max={MOCK_USER.xpMax} level={MOCK_USER.level} showLabel={false} />
            </div>
            <p className="text-lg font-black text-text-primary">{MOCK_USER.level}</p>
            <p className="text-[11px] text-text-muted">Nivel</p>
          </Card>
          <Card variant="default" className="p-4 flex flex-col items-center">
            <p className="text-2xl font-black text-text-primary">{MOCK_USER.eventsCount}</p>
            <p className="text-[11px] text-text-muted mt-0.5">Eventos</p>
          </Card>
        </div>

        {/* XP Progress */}
        <XPBar current={MOCK_USER.xpCurrent} max={MOCK_USER.xpMax} level={MOCK_USER.level} />

        {/* Badges */}
        <div>
          <h3 className="text-sm font-bold text-text-primary mb-3">Insignias</h3>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_BADGES.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card
                  variant="default"
                  className={cn(
                    'p-3 flex flex-col items-center text-center',
                    !badge.earned && 'opacity-40'
                  )}
                >
                  <span className="text-2xl mb-1">{badge.emoji}</span>
                  <p className="text-[11px] font-semibold text-text-primary">{badge.name}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{badge.description}</p>
                  {badge.earned && (
                    <div className="h-1 w-6 rounded-full bg-accent-success mt-1.5" />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-sm font-bold text-text-primary mb-2">Sobre mi</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {MOCK_USER.bio}
          </p>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-sm font-bold text-text-primary mb-2">Intereses</h3>
          <div className="flex flex-wrap gap-2">
            {MOCK_USER.interests.map((interest) => (
              <Chip key={interest}>{interest}</Chip>
            ))}
          </div>
        </div>

        {/* Reputation timeline */}
        <div>
          <h3 className="text-sm font-bold text-text-primary mb-3">Reputacion reciente</h3>
          <div className="space-y-2">
            {MOCK_REPUTATION.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-2 px-3 rounded-xl bg-bg-secondary"
              >
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center shrink-0',
                    item.delta > 0 ? 'bg-accent-success/15' : 'bg-accent-danger/15'
                  )}
                >
                  {item.delta > 0 ? (
                    <TrendingUp className="h-4 w-4 text-accent-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-accent-danger" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">
                    {item.reason}
                  </p>
                  <p className="text-[11px] text-text-muted">{item.date}</p>
                </div>
                <span
                  className={cn(
                    'text-sm font-bold shrink-0',
                    item.delta > 0 ? 'text-accent-success' : 'text-accent-danger'
                  )}
                >
                  {item.delta > 0 ? '+' : ''}{item.delta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit profile button */}
        <Button
          variant="secondary"
          className="w-full"
          icon={<Edit3 className="h-4 w-4" />}
        >
          Editar perfil
        </Button>
      </div>
    </PageWrapper>
  );
}
