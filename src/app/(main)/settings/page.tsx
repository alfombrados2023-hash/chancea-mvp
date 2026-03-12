'use client';

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TopBar } from '@/components/layout/TopBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Bell,
  MapPin,
  Eye,
  User,
  Shield,
  LogOut,
  ChevronRight,
  Smartphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        'relative h-7 w-12 rounded-full transition-colors duration-200 shrink-0',
        enabled ? 'bg-accent-primary' : 'bg-bg-tertiary'
      )}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-md"
      />
    </button>
  );
}

interface SettingRowProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  description?: string;
  toggle?: { enabled: boolean; onChange: (val: boolean) => void };
  onClick?: () => void;
}

function SettingRow({ icon, iconBg, label, description, toggle, onClick }: SettingRowProps) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 py-3 w-full text-left',
        onClick && 'hover:opacity-80 transition-opacity'
      )}
    >
      <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
      {toggle && <Toggle enabled={toggle.enabled} onChange={toggle.onChange} />}
      {onClick && <ChevronRight className="h-4 w-4 text-text-muted shrink-0" />}
    </Wrapper>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [nearbyVisible, setNearbyVisible] = useState(true);

  return (
    <PageWrapper>
      <TopBar title="Ajustes" showBack showNotifications={false} showAvatar={false} />

      <div className="px-4 space-y-6 pb-8">
        {/* Notifications */}
        <div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-1">
            Notificaciones
          </h3>
          <Card variant="default" className="px-4 divide-y divide-white/5">
            <SettingRow
              icon={<Bell className="h-4 w-4 text-accent-primary" />}
              iconBg="bg-accent-primary/15"
              label="Notificaciones push"
              description="Nuevos planes y mensajes"
              toggle={{ enabled: notifications, onChange: setNotifications }}
            />
          </Card>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-1">
            Ubicacion
          </h3>
          <Card variant="default" className="px-4 divide-y divide-white/5">
            <SettingRow
              icon={<MapPin className="h-4 w-4 text-accent-info" />}
              iconBg="bg-accent-info/15"
              label="Compartir ubicacion"
              description="Necesario para el radar"
              toggle={{ enabled: location, onChange: setLocation }}
            />
          </Card>
        </div>

        {/* Privacy */}
        <div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-1">
            Privacidad
          </h3>
          <Card variant="default" className="px-4 divide-y divide-white/5">
            <SettingRow
              icon={<Eye className="h-4 w-4 text-accent-secondary" />}
              iconBg="bg-accent-secondary/15"
              label="Perfil visible"
              description="Otros pueden ver tu perfil"
              toggle={{ enabled: profileVisible, onChange: setProfileVisible }}
            />
            <SettingRow
              icon={<MapPin className="h-4 w-4 text-accent-secondary" />}
              iconBg="bg-accent-secondary/15"
              label="Visible en radar"
              description="Aparecer en el mapa de otros"
              toggle={{ enabled: nearbyVisible, onChange: setNearbyVisible }}
            />
          </Card>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-1">
            Cuenta
          </h3>
          <Card variant="default" className="px-4 divide-y divide-white/5">
            <SettingRow
              icon={<User className="h-4 w-4 text-accent-success" />}
              iconBg="bg-accent-success/15"
              label="Editar perfil"
              onClick={() => router.push('/profile')}
            />
            <SettingRow
              icon={<Shield className="h-4 w-4 text-accent-warning" />}
              iconBg="bg-accent-warning/15"
              label="Verificacion"
              description="Verifica tu identidad"
              onClick={() => {}}
            />
          </Card>
        </div>

        {/* Danger zone */}
        <div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-1">
            Sesion
          </h3>
          <Button
            variant="danger"
            className="w-full"
            icon={<LogOut className="h-4 w-4" />}
          >
            Cerrar sesion
          </Button>
        </div>

        {/* App version */}
        <div className="flex flex-col items-center pt-4 pb-2">
          <div className="flex items-center gap-2 text-text-muted mb-1">
            <Smartphone className="h-3.5 w-3.5" />
            <span className="text-xs">Chancea</span>
          </div>
          <p className="text-[11px] text-text-muted">Version 1.0.0 (build 42)</p>
        </div>
      </div>
    </PageWrapper>
  );
}
