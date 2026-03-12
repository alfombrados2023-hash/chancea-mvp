"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import {
  Sparkles,
  Users,
  Briefcase,
  Heart,
  Dumbbell,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Camera,
  X,
  ImagePlus,
} from "lucide-react";

function resizeImage(file: File, maxSize = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > height) {
          if (width > maxSize) {
            height = Math.round(height * (maxSize / width));
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round(width * (maxSize / height));
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const INTERESTS = [
  { id: "coffee", name: "Cafe", emoji: "☕" },
  { id: "running", name: "Running", emoji: "🏃" },
  { id: "music", name: "Musica", emoji: "🎵" },
  { id: "travel", name: "Viajes", emoji: "✈️" },
  { id: "food", name: "Gastronomia", emoji: "🍕" },
  { id: "reading", name: "Lectura", emoji: "📚" },
  { id: "yoga", name: "Yoga", emoji: "🧘" },
  { id: "art", name: "Arte", emoji: "🎨" },
  { id: "tech", name: "Tecnologia", emoji: "💻" },
  { id: "cinema", name: "Cine", emoji: "🎬" },
  { id: "sports", name: "Deportes", emoji: "⚽" },
  { id: "cooking", name: "Cocina", emoji: "👨‍🍳" },
  { id: "gaming", name: "Gaming", emoji: "🎮" },
  { id: "photography", name: "Fotografia", emoji: "📷" },
  { id: "hiking", name: "Senderismo", emoji: "🥾" },
  { id: "wine", name: "Vino", emoji: "🍷" },
  { id: "dance", name: "Baile", emoji: "💃" },
  { id: "pets", name: "Mascotas", emoji: "🐕" },
];

const INTENTIONS = [
  {
    id: "friends",
    label: "Amistad",
    desc: "Conocer gente nueva y hacer amigos",
    icon: Users,
    color: "from-accent-success to-emerald-400",
  },
  {
    id: "networking",
    label: "Networking",
    desc: "Ampliar tu red profesional",
    icon: Briefcase,
    color: "from-accent-info to-blue-400",
  },
  {
    id: "dating",
    label: "Citas",
    desc: "Encontrar a alguien especial",
    icon: Heart,
    color: "from-pink-500 to-rose-400",
  },
  {
    id: "activities",
    label: "Actividades",
    desc: "Unirte a planes y aventuras",
    icon: Dumbbell,
    color: "from-accent-secondary to-purple-400",
  },
];

const STEPS = 5;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("Madrid");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [intention, setIntention] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhotoSelect = useCallback(async (index: number, file: File) => {
    try {
      const dataUrl = await resizeImage(file, 400);
      setPhotos((prev) => {
        const next = [...prev];
        next[index] = dataUrl;
        return next;
      });
    } catch {
      // silently ignore invalid images
    }
  }, []);

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[index] = "";
      // Compact: remove trailing empty slots
      while (next.length > 0 && !next[next.length - 1]) next.pop();
      return next;
    });
  }, []);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canContinue = () => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return name.length >= 2 && age.length > 0;
      case 2:
        return selectedInterests.length >= 3;
      case 3:
        return intention !== "";
      case 4:
        return photos.some((p) => p && p.length > 0);
      default:
        return false;
    }
  };

  const handleComplete = () => {
    localStorage.setItem(
      "chancea-auth",
      JSON.stringify({
        state: {
          isAuthenticated: true,
          isOnboarded: true,
          currentUser: {
            id: "user-self",
            name,
            age: parseInt(age) || 25,
            city,
            intention,
            interests: selectedInterests,
            photos: photos.filter((p) => p && p.length > 0),
          },
        },
      })
    );
    router.replace("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Progress bar */}
      <div className="px-4 pt-4">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full overflow-hidden bg-bg-tertiary"
            >
              <motion.div
                className="h-full bg-accent-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 flex flex-col px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {/* Step 0: Welcome */}
            {step === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="h-24 w-24 rounded-3xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center mb-8"
                >
                  <Sparkles className="h-12 w-12 text-white" />
                </motion.div>
                <h1 className="text-3xl font-black text-text-primary mb-3">
                  Bienvenido a{" "}
                  <span className="bg-gradient-to-r from-accent-primary to-[#FF8F65] bg-clip-text text-transparent">
                    Chancea
                  </span>
                </h1>
                <p className="text-text-secondary text-lg max-w-xs">
                  Conoce personas reales. No mas swipe. Mas experiencias.
                </p>
                <div className="mt-12 space-y-3 w-full max-w-xs">
                  <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-bg-secondary">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Misiones sociales
                      </p>
                      <p className="text-xs text-text-muted">
                        Planes reales, no conversaciones vacias
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-bg-secondary">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Reputacion real
                      </p>
                      <p className="text-xs text-text-muted">
                        Confianza basada en acciones, no en fotos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-bg-secondary">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Cerca de ti
                      </p>
                      <p className="text-xs text-text-muted">
                        Personas y planes en tu ciudad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Profile basics */}
            {step === 1 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Cuentanos de ti
                </h2>
                <p className="text-text-secondary mb-8">
                  Datos basicos para tu perfil
                </p>
                <div className="space-y-5">
                  <Input
                    label="Nombre"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Edad"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min={18}
                    max={99}
                  />
                  <Input
                    label="Ciudad"
                    placeholder="Madrid"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Tus intereses
                </h2>
                <p className="text-text-secondary mb-6">
                  Elige al menos 3 para encontrar personas afines
                </p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <Chip
                      key={interest.id}
                      selected={selectedInterests.includes(interest.id)}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      {interest.emoji} {interest.name}
                    </Chip>
                  ))}
                </div>
                <p className="mt-4 text-sm text-text-muted">
                  {selectedInterests.length} seleccionados
                </p>
              </div>
            )}

            {/* Step 3: Intention */}
            {step === 3 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Que buscas?
                </h2>
                <p className="text-text-secondary mb-6">
                  Puedes cambiarlo cuando quieras
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {INTENTIONS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIntention(item.id)}
                        className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                          intention === item.id
                            ? "border-accent-primary bg-accent-primary/10"
                            : "border-white/5 bg-bg-secondary"
                        }`}
                      >
                        <div
                          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-text-primary">
                          {item.label}
                        </span>
                        <span className="text-xs text-text-muted text-center">
                          {item.desc}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Photos + Location */}
            {step === 4 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Casi listo!
                </h2>
                <p className="text-text-secondary mb-6">
                  Agrega fotos y permite tu ubicacion
                </p>

                <div className="grid grid-cols-3 gap-2 mb-8">
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const hasPhoto = photos[i] && photos[i].length > 0;
                    return (
                      <div key={i} className="relative">
                        <input
                          ref={(el) => { fileInputRefs.current[i] = el; }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoSelect(i, file);
                            e.target.value = "";
                          }}
                        />
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (!hasPhoto) fileInputRefs.current[i]?.click();
                          }}
                          className={`aspect-square w-full rounded-xl border-2 flex items-center justify-center transition-all overflow-hidden ${
                            hasPhoto
                              ? "border-accent-primary"
                              : i === 0
                              ? "border-dashed border-accent-primary/50 bg-accent-primary/5"
                              : "border-dashed border-white/10 bg-bg-secondary"
                          }`}
                        >
                          {hasPhoto ? (
                            <img
                              src={photos[i]}
                              alt={`Foto ${i + 1}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              {i === 0 ? (
                                <ImagePlus className="h-6 w-6 text-accent-primary/70" />
                              ) : (
                                <Camera className="h-5 w-5 text-text-muted" />
                              )}
                              {i === 0 && (
                                <span className="text-[10px] font-medium text-accent-primary/70">
                                  Principal
                                </span>
                              )}
                            </div>
                          )}
                        </motion.button>
                        {/* Remove button */}
                        {hasPhoto && (
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute -top-1.5 -right-1.5 z-10 h-6 w-6 rounded-full bg-accent-danger flex items-center justify-center shadow-lg"
                          >
                            <X className="h-3.5 w-3.5 text-white" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-text-muted -mt-5 mb-6">
                  {photos.filter((p) => p && p.length > 0).length}/6 fotos · Minimo 1 requerida
                </p>

                <button
                  onClick={() => {}}
                  className="flex items-center gap-3 p-4 rounded-xl bg-bg-secondary border border-white/5 mb-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-accent-info/15 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent-info" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text-primary">
                      Activar ubicacion
                    </p>
                    <p className="text-xs text-text-muted">
                      Para encontrar personas y planes cerca de ti
                    </p>
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="px-6 pb-8 flex gap-3">
        {step > 0 && (
          <Button
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            icon={<ChevronLeft className="h-4 w-4" />}
          >
            Atras
          </Button>
        )}
        <Button
          className="flex-1"
          disabled={!canContinue()}
          onClick={() => {
            if (step < STEPS - 1) {
              setStep((s) => s + 1);
            } else {
              handleComplete();
            }
          }}
          icon={
            step < STEPS - 1 ? <ChevronRight className="h-4 w-4" /> : undefined
          }
        >
          {step === 0
            ? "Empezar"
            : step === STEPS - 1
            ? "Comenzar aventura"
            : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
