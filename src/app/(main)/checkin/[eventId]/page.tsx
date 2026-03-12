'use client';

import { useState, useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Zap,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Stage = 'checkin' | 'feedback' | 'done';

const MOCK_EVENT = {
  id: 'm1',
  emoji: '☕',
  title: 'Cafe & Conversacion',
  time: 'Hoy, 16:00 - 17:30',
  location: 'Cafe Federal, Calle de la Plaza 12',
};

const FEEDBACK_TAGS = [
  'Divertido',
  'Puntual',
  'Buena conversacion',
  'Repetiria',
];

export default function CheckinPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('checkin');
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [xpCount, setXpCount] = useState(0);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Count-up animation for XP
  useEffect(() => {
    if (stage !== 'done') return;
    const target = 120;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setXpCount(target);
        clearInterval(interval);
      } else {
        setXpCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <PageWrapper>
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-bg-primary/90 backdrop-blur-xl">
        <button
          onClick={() => router.back()}
          className="h-9 w-9 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-text-primary">Check-in</h1>
      </header>

      <div className="px-4 pb-8">
        {/* Event summary */}
        <Card variant="default" className="p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-2xl shrink-0">
              {MOCK_EVENT.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary">{MOCK_EVENT.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {MOCK_EVENT.time}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-text-muted">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{MOCK_EVENT.location}</span>
              </div>
            </div>
          </div>
        </Card>

        <AnimatePresence mode="wait">
          {/* Stage: Check-in */}
          {stage === 'checkin' && (
            <motion.div
              key="checkin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-sm text-text-secondary mb-8">
                Pulsa el boton cuando hayas llegado al punto de encuentro
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('feedback')}
                className="relative h-40 w-40 rounded-full bg-gradient-to-br from-accent-primary to-[#FF8F65] flex items-center justify-center shadow-2xl shadow-accent-primary/30"
              >
                {/* Pulse rings */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-accent-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.7, 1], opacity: [0.15, 0, 0.15] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full bg-accent-primary"
                />
                <span className="relative text-white font-black text-lg z-10">
                  CHECK-IN
                </span>
              </motion.button>

              <p className="text-xs text-text-muted mt-6">
                Debes estar cerca del lugar del evento
              </p>
            </motion.div>
          )}

          {/* Stage: Feedback */}
          {stage === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Success animation */}
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="h-16 w-16 rounded-full bg-accent-success/20 flex items-center justify-center mb-3"
                >
                  <CheckCircle2 className="h-8 w-8 text-accent-success" />
                </motion.div>

                {/* Confetti-like particles */}
                <div className="relative h-0 w-full">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, y: -20, x: 0 }}
                      animate={{
                        opacity: 0,
                        y: -60 - Math.random() * 40,
                        x: (Math.random() - 0.5) * 120,
                        rotate: Math.random() * 360,
                      }}
                      transition={{ duration: 1.2, delay: i * 0.05 }}
                      className={cn(
                        'absolute left-1/2 h-2 w-2 rounded-full',
                        ['bg-accent-primary', 'bg-accent-success', 'bg-accent-warning', 'bg-accent-secondary'][i % 4]
                      )}
                    />
                  ))}
                </div>

                <h2 className="text-lg font-black text-accent-success">
                  Check-in completado!
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  Ahora cuentanos tu experiencia
                </p>
              </div>

              {/* Star rating */}
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-3 text-center">
                  Valora la experiencia
                </h3>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={cn(
                          'h-10 w-10 transition-colors',
                          star <= rating
                            ? 'fill-accent-warning text-accent-warning'
                            : 'text-bg-tertiary'
                        )}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Feedback tags */}
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-3 text-center">
                  Que te parecio?
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {FEEDBACK_TAGS.map((tag) => (
                    <Chip
                      key={tag}
                      selected={selectedTags.includes(tag)}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                size="lg"
                className="w-full"
                onClick={() => setStage('done')}
                disabled={rating === 0}
              >
                Enviar valoracion
              </Button>
            </motion.div>
          )}

          {/* Stage: Done */}
          {stage === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-6 pt-8"
            >
              {/* XP earned */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
                className="h-28 w-28 rounded-3xl bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 border border-accent-secondary/30 flex flex-col items-center justify-center"
              >
                <Zap className="h-6 w-6 text-accent-secondary mb-1" />
                <span className="text-3xl font-black text-text-primary">
                  +{xpCount}
                </span>
                <span className="text-xs text-text-muted">XP</span>
              </motion.div>

              <div>
                <h2 className="text-lg font-black text-text-primary">
                  Mision completada!
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  Has ganado experiencia y mejorado tu score
                </p>
              </div>

              {/* Score change */}
              <Card variant="gradient" className="p-4 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Cambio de score</span>
                  <span className="text-lg font-black text-accent-success">+3</span>
                </div>
              </Card>

              {/* Confetti particles */}
              <div className="relative h-0 w-full">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, y: 0, x: 0 }}
                    animate={{
                      opacity: 0,
                      y: -100 - Math.random() * 80,
                      x: (Math.random() - 0.5) * 200,
                      rotate: Math.random() * 720,
                    }}
                    transition={{ duration: 2, delay: 0.3 + i * 0.05 }}
                    className={cn(
                      'absolute left-1/2 rounded-sm',
                      i % 3 === 0 ? 'h-2 w-2' : 'h-1.5 w-3',
                      ['bg-accent-primary', 'bg-accent-success', 'bg-accent-warning', 'bg-accent-secondary', 'bg-accent-info'][i % 5]
                    )}
                  />
                ))}
              </div>

              <Button
                size="lg"
                className="w-full"
                icon={<Home className="h-5 w-5" />}
                onClick={() => router.push('/home')}
              >
                Volver al inicio
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
