"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { XPBar } from "@/components/ui/XPBar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Flame,
  MapPin,
  Clock,
  Users,
  Zap,
  Search,
  Plus,
  Trophy,
  ChevronRight,
} from "lucide-react";

const MOCK_MISSION_OF_DAY = {
  id: "m1",
  title: "Cafe & Conversacion",
  description: "Encuentra a alguien para un cafe espontaneo cerca de ti",
  category: "coffee",
  xpReward: 120,
  image: "",
  emoji: "☕",
};

const MOCK_NEARBY_PLANS = [
  {
    id: "e1",
    title: "After Office en La Latina",
    category: "afteroffice",
    emoji: "🍻",
    distance: "800m",
    time: "19:00",
    participants: 4,
    capacity: 6,
    hostName: "Carlos M.",
  },
  {
    id: "e2",
    title: "Running por Retiro",
    category: "running",
    emoji: "🏃",
    distance: "1.2km",
    time: "07:30",
    participants: 3,
    capacity: 8,
    hostName: "Ana R.",
  },
  {
    id: "e3",
    title: "Brunch dominical",
    category: "brunch",
    emoji: "🥐",
    distance: "2km",
    time: "11:00",
    participants: 2,
    capacity: 4,
    hostName: "Maria L.",
  },
  {
    id: "e4",
    title: "Exposicion de arte",
    category: "cultural",
    emoji: "🎨",
    distance: "3km",
    time: "17:00",
    participants: 5,
    capacity: 8,
    hostName: "Pablo G.",
  },
];

const MOCK_ACTIVE_PEOPLE = [
  { id: "u1", name: "Laura", score: 88, online: true },
  { id: "u2", name: "Miguel", score: 76, online: true },
  { id: "u3", name: "Sofia", score: 92, online: true },
  { id: "u4", name: "Diego", score: 65, online: true },
  { id: "u5", name: "Elena", score: 84, online: true },
  { id: "u6", name: "Javier", score: 71, online: false },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <PageWrapper>
      <TopBar notificationCount={3} />

      <div className="px-4 space-y-6 pb-4">
        {/* Streak Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-accent-warning/10 to-accent-primary/10 border border-accent-warning/20"
        >
          <Flame className="h-6 w-6 text-accent-warning" />
          <div>
            <p className="text-sm font-bold text-text-primary">
              3 dias de racha!
            </p>
            <p className="text-xs text-text-muted">
              Completa una mision hoy para mantenerla
            </p>
          </div>
          <Zap className="h-5 w-5 text-accent-warning ml-auto" />
        </motion.div>

        {/* XP Bar */}
        <XPBar current={340} max={500} level={4} />

        {/* Mission of the Day */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-text-primary">
              Mision del dia
            </h2>
            <Badge variant="purple">
              <Zap className="h-3 w-3" />
              +{MOCK_MISSION_OF_DAY.xpReward} XP
            </Badge>
          </div>
          <Card
            variant="interactive"
            onClick={() => router.push(`/missions/${MOCK_MISSION_OF_DAY.id}`)}
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-3xl shrink-0">
                  {MOCK_MISSION_OF_DAY.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text-primary mb-1">
                    {MOCK_MISSION_OF_DAY.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {MOCK_MISSION_OF_DAY.description}
                  </p>
                </div>
              </div>
              <Button className="w-full mt-4" size="md">
                Aceptar mision
              </Button>
            </div>
          </Card>
        </div>

        {/* Nearby Plans */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-text-primary">
              Planes cercanos
            </h2>
            <button
              onClick={() => router.push("/missions")}
              className="text-sm text-accent-primary font-medium flex items-center gap-1"
            >
              Ver todos <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
            {MOCK_NEARBY_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  variant="interactive"
                  onClick={() => router.push(`/missions/${plan.id}`)}
                  className="w-[200px] shrink-0"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{plan.emoji}</span>
                      <Badge variant="default" size="sm">
                        <MapPin className="h-3 w-3" />
                        {plan.distance}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2">
                      {plan.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="h-3 w-3" />
                      <span>{plan.time}</span>
                      <span className="text-white/10">|</span>
                      <Users className="h-3 w-3" />
                      <span>
                        {plan.participants}/{plan.capacity}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-2">
                      por {plan.hostName}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active People Nearby */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-text-primary">
              Personas activas
            </h2>
            <button
              onClick={() => router.push("/radar")}
              className="text-sm text-accent-primary font-medium flex items-center gap-1"
            >
              Radar <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4">
            {MOCK_ACTIVE_PEOPLE.map((person, i) => (
              <motion.button
                key={person.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => router.push(`/profile/${person.id}`)}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className="relative">
                  <Avatar
                    name={person.name}
                    size="lg"
                    online={person.online}
                  />
                </div>
                <span className="text-xs font-medium text-text-secondary">
                  {person.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            variant="interactive"
            onClick={() => router.push("/missions")}
            className="p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-primary/15 flex items-center justify-center">
                <Plus className="h-5 w-5 text-accent-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Crear plan
                </p>
                <p className="text-xs text-text-muted">Propone algo nuevo</p>
              </div>
            </div>
          </Card>
          <Card
            variant="interactive"
            onClick={() => router.push("/radar")}
            className="p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-secondary/15 flex items-center justify-center">
                <Search className="h-5 w-5 text-accent-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Explorar
                </p>
                <p className="text-xs text-text-muted">Buscar misiones</p>
              </div>
            </div>
          </Card>
          <Card
            variant="interactive"
            onClick={() => router.push("/profile")}
            className="p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-success/15 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-accent-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Mis logros
                </p>
                <p className="text-xs text-text-muted">Badges y nivel</p>
              </div>
            </div>
          </Card>
          <Card
            variant="interactive"
            onClick={() => router.push("/radar")}
            className="p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-info/15 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent-info" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Cerca de mi
                </p>
                <p className="text-xs text-text-muted">Radar local</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
