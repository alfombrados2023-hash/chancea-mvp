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
  ChevronLeft,
  BadgeCheck,
  TrendingUp,
  TrendingDown,
  CalendarPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MY_INTERESTS = ['Cafe', 'Tecnologia', 'Running', 'Cine', 'Viajes', 'Fotografia'];

const MOCK_OTHER_USER = {
  id: 'u1',
  name: 'Laura Garcia',
  age: 26,
  city: 'Madrid',
  verified: true,
  intention: 'Amistad',
  bio: 'Diseñadora grafica de dia, runner de noche. Me encanta descubrir cafeterias nuevas y charlar sobre diseño, arte o cualquier tema random. Buscando gente con buena energia!',
  score: 88,
  level: 5,
  xpCurrent: 420,
  xpMax: 600,
  eventsCount: 18,
  interests: ['Cafe', 'Diseño', 'Running', 'Arte', 'Fotografia', 'Yoga'],
};

const MOCK_BADGES = [
  { id: 'b1', emoji: '☕', name: 'Cafetero', earned: true },
  { id: 'b2', emoji: '🏃', name: 'Deportista', earned: true },
  { id: 'b3', emoji: '⭐', name: 'Top Score', earned: true },
  { id: 'b4', emoji: '🔥', name: 'En racha', earned: true },
  { id: 'b5', emoji: '🌍', name: 'Explorador', earned: false },
  { id: 'b6', emoji: '👑', name: 'Veterano', earned: false },
];

const MOCK_REPUTATION = [
  { id: 'r1', delta: +5, reason: 'Valoracion positiva', date: 'Hoy' },
  { id: 'r2', delta: +3, reason: 'Check-in puntual', date: 'Ayer' },
  { id: 'r3', delta: +4, reason: 'Mision completada', date: 'Hace 2d' },
];

export default function OtherProfilePage() {
  const router = useRouter();

  const mutualInterests = MOCK_OTHER_USER.interests.filter((i) =>
    MY_INTERESTS.includes(i)
  );

  return (
    <PageWrapper>
      {/* Cover gradient */}
      <div className="relative h-36 bg-gradient-to-br from-pink-500 via-rose-500 to-violet-600">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Avatar & name */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <Avatar
            name={MOCK_OTHER_USER.name}
            size="xl"
            verified={MOCK_OTHER_USER.verified}
            className="border-4 border-bg-primary"
          />
          <h1 className="text-xl font-black text-text-primary mt-3">
            {MOCK_OTHER_USER.name}
          </h1>
          <p className="text-sm text-text-muted">
            {MOCK_OTHER_USER.age} · {MOCK_OTHER_USER.city}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            {MOCK_OTHER_USER.verified && (
              <Badge variant="info" size="sm">
                <BadgeCheck className="h-3 w-3" />
                Verificado
              </Badge>
            )}
          </div>
          <Badge variant="purple" size="md" className="mt-2">
            Busco: {MOCK_OTHER_USER.intention}
          </Badge>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-32 mt-6">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="default" className="p-4 flex flex-col items-center">
            <ScoreBadge score={MOCK_OTHER_USER.score} size="md" />
            <p className="text-[11px] text-text-muted mt-1.5">Score</p>
          </Card>
          <Card variant="default" className="p-4 flex flex-col items-center">
            <p className="text-2xl font-black text-text-primary">{MOCK_OTHER_USER.level}</p>
            <p className="text-[11px] text-text-muted">Nivel</p>
            <XPBar
              current={MOCK_OTHER_USER.xpCurrent}
              max={MOCK_OTHER_USER.xpMax}
              level={MOCK_OTHER_USER.level}
              showLabel={false}
              className="mt-1.5"
            />
          </Card>
          <Card variant="default" className="p-4 flex flex-col items-center">
            <p className="text-2xl font-black text-text-primary">{MOCK_OTHER_USER.eventsCount}</p>
            <p className="text-[11px] text-text-muted mt-0.5">Eventos</p>
          </Card>
        </div>

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
                  {badge.earned && (
                    <div className="h-1 w-6 rounded-full bg-accent-success mt-1" />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-sm font-bold text-text-primary mb-2">Sobre {MOCK_OTHER_USER.name.split(' ')[0]}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {MOCK_OTHER_USER.bio}
          </p>
        </div>

        {/* Interests with mutual highlight */}
        <div>
          <h3 className="text-sm font-bold text-text-primary mb-2">Intereses</h3>
          {mutualInterests.length > 0 && (
            <p className="text-xs text-accent-success mb-2">
              {mutualInterests.length} intereses en comun
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {MOCK_OTHER_USER.interests.map((interest) => {
              const isMutual = MY_INTERESTS.includes(interest);
              return (
                <Chip key={interest} selected={isMutual}>
                  {isMutual && <span className="text-xs">✓</span>}
                  {interest}
                </Chip>
              );
            })}
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
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-lg mx-auto p-4 bg-bg-primary/90 backdrop-blur-xl border-t border-white/5">
          <Button
            size="lg"
            className="w-full"
            icon={<CalendarPlus className="h-5 w-5" />}
          >
            Invitar a un plan
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
