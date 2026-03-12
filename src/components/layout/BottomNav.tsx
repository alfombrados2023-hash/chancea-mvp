"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Home, Radar, Plus, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/home", icon: Home, label: "Inicio" },
  { href: "/radar", icon: Radar, label: "Radar" },
  { href: "/create", icon: Plus, label: "Crear", isCenter: true },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/profile", icon: User, label: "Perfil" },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/90 backdrop-blur-xl border-t border-white/5">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <motion.button
                key={item.href}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/missions")}
                className="flex items-center justify-center h-12 w-12 -mt-4 rounded-full bg-gradient-to-r from-accent-primary to-[#FF8F65] shadow-lg shadow-accent-primary/30"
              >
                <Icon className="h-6 w-6 text-white" />
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.href}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center gap-0.5 py-1 px-3"
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-accent-primary" : "text-text-muted"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-accent-primary" : "text-text-muted"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 h-0.5 w-8 bg-accent-primary rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
