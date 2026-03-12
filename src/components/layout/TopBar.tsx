"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Bell, ChevronLeft } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showAvatar?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  className?: string;
}

export function TopBar({
  title,
  showBack,
  showAvatar = true,
  showNotifications = true,
  notificationCount = 0,
  className,
}: TopBarProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-bg-primary/90 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="h-9 w-9 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : showAvatar ? (
          <button onClick={() => router.push("/profile")}>
            <Avatar name="Tu" size="sm" />
          </button>
        ) : null}
        {title ? (
          <h1 className="text-lg font-bold text-text-primary">{title}</h1>
        ) : (
          <span className="text-xl font-black bg-gradient-to-r from-accent-primary to-[#FF8F65] bg-clip-text text-transparent">
            Chancea
          </span>
        )}
      </div>

      {showNotifications && (
        <button
          onClick={() => router.push("/chat")}
          className="relative h-9 w-9 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-accent-primary text-[10px] font-bold text-white flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>
      )}
    </header>
  );
}
