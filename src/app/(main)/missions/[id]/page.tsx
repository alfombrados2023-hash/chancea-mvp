'use client';

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Chip } from '@/components/ui/Chip';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Share2,
  Clock,
  MapPin,
  Users,
  Zap,
  Calendar,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { cn, formatCountdown } from '@/lib/utils';

const MOCK_MISSION = {
  id: 'm1',
  emoji: '☕',
  title: 'Cafe & Conversacion',
  category: 'Cafe',
  description:
    'Unete a un cafe espontaneo con personas cercanas. La idea es simple: conocer gente nueva en un ambiente relajado. Cada participante trae su mejor energia y ganas de conectar. Sin presiones, solo buena conversacion.',
  xp: 120,
  date: '2026-03-12T16:00:00',
  location: 'Cafe Federal, Calle de la Plaza 12, Madrid',
  host: { id: 'u1', name: 'Carlos M.', score: 88, verified: true },
  participants: [
    { id: 'u2', name: 'Laura G.' },
    { id: 'u3', name: 'Miguel R.' },
    { id: 'u4', name: 'Sofia P.' },
  ],
  capacity: 6,
  gradient: 'from-amber-500 to-orange-600',
};

export default function MissionDetailPage() {
  const router = useRouter();
  const [joined, setJoined] = useState(false);

  const spotsLeft = MOCK_MISSION.capacity - MOCK_MISSION.participants.length;
  const countdown = formatCountdown(MOCK_MISSION.date);

  return (
    <PageWrapper className="bg-bg-primary">
      {/* Hero */}
      <div className={cn('relative h-56 bg-gradient-to-br', MOCK_MISSION.gradient)}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />

        {/* Nav buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Big emoji */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="h-20 w-20 rounded-3xl bg-bg-secondary border-4 border-bg-primary flex items-center justify-center text-4xl shadow-xl"
          >
            {MOCK_MISSION.emoji}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-14 pb-32 space-y-6">
        {/* Title & category */}
        <div className="text-center">
          <h1 className="text-2xl font-black text-text-primary mb-2">
            {MOCK_MISSION.title}
          </h1>
          <Chip>{MOCK_MISSION.category}</Chip>
        </div>

        {/* Host */}
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <Avatar name={MOCK_MISSION.host.name} verified={MOCK_MISSION.host.verified} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">
                {MOCK_MISSION.host.name}
              </p>
              <p className="text-xs text-text-muted">Organizador</p>
            </div>
            <ScoreBadge score={MOCK_MISSION.host.score} size="sm" />
          </div>
        </Card>

        {/* Date & Location */}
        <div className="space-y-3">
          <Card variant="default" className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-primary/15 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-accent-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  Martes, 12 Mar 2026 - 16:00
                </p>
                <div className="flex items-center gap-1 text-xs text-accent-warning mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>Empieza en {countdown}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-info/15 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-accent-info" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  Cafe Federal
                </p>
                <p className="text-xs text-text-muted">
                  Calle de la Plaza 12, Madrid
                </p>
              </div>
              <button className="h-8 w-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary">
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-text-primary mb-2">
            Descripcion
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {MOCK_MISSION.description}
          </p>
        </div>

        {/* XP Reward */}
        <Card variant="gradient" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-accent-secondary/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-accent-secondary" />
            </div>
            <div>
              <p className="text-lg font-black text-text-primary">
                +{MOCK_MISSION.xp} XP
              </p>
              <p className="text-xs text-text-muted">
                Recompensa por completar
              </p>
            </div>
          </div>
        </Card>

        {/* Participants */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-text-primary">
              Participantes
            </h3>
            <Badge variant={spotsLeft <= 2 ? 'warning' : 'default'} size="sm">
              <Users className="h-3 w-3" />
              {MOCK_MISSION.participants.length}/{MOCK_MISSION.capacity} plazas
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              {MOCK_MISSION.participants.map((p) => (
                <Avatar key={p.id} name={p.name} size="md" className="border-2 border-bg-primary" />
              ))}
              {spotsLeft > 0 &&
                Array.from({ length: Math.min(spotsLeft, 3) }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="h-10 w-10 rounded-full border-2 border-dashed border-white/10 bg-bg-tertiary flex items-center justify-center text-text-muted text-xs"
                  >
                    ?
                  </div>
                ))}
            </div>
            <span className="text-xs text-text-muted ml-2">
              {spotsLeft > 0 ? `${spotsLeft} plazas libres` : 'Completo'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-lg mx-auto p-4 bg-bg-primary/90 backdrop-blur-xl border-t border-white/5">
          <AnimatePresence mode="wait">
            {!joined ? (
              <motion.div
                key="join"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Button size="lg" className="w-full" onClick={() => setJoined(true)}>
                  Unirme a esta mision
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="joined"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-center gap-2 py-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent-success" />
                  </motion.div>
                  <span className="text-sm font-bold text-accent-success">
                    Confirmado!
                  </span>
                </div>
                <Button
                  size="md"
                  variant="secondary"
                  className="w-full"
                  onClick={() => router.push(`/checkin/${MOCK_MISSION.id}`)}
                >
                  Hacer check-in
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
