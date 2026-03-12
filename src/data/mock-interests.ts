import type { Interest } from "@/types";

export const interests: Interest[] = [
  // Deportes
  { id: "int-running", name: "Running", emoji: "\u{1F3C3}", category: "deportes" },
  { id: "int-padel", name: "P\u00E1del", emoji: "\u{1F3BE}", category: "deportes" },
  { id: "int-yoga", name: "Yoga", emoji: "\u{1F9D8}", category: "deportes" },
  { id: "int-futbol", name: "F\u00FAtbol", emoji: "\u26BD", category: "deportes" },
  { id: "int-ciclismo", name: "Ciclismo", emoji: "\u{1F6B4}", category: "deportes" },
  { id: "int-escalada", name: "Escalada", emoji: "\u{1F9D7}", category: "deportes" },

  // Cultura
  { id: "int-museos", name: "Museos", emoji: "\u{1F3DB}\uFE0F", category: "cultura" },
  { id: "int-teatro", name: "Teatro", emoji: "\u{1F3AD}", category: "cultura" },
  { id: "int-fotografia", name: "Fotograf\u00EDa", emoji: "\u{1F4F7}", category: "cultura" },
  { id: "int-lectura", name: "Lectura", emoji: "\u{1F4DA}", category: "cultura" },

  // Gastronomia
  { id: "int-cafe", name: "Caf\u00E9 de especialidad", emoji: "\u2615", category: "gastronomia" },
  { id: "int-vino", name: "Vinos", emoji: "\u{1F377}", category: "gastronomia" },
  { id: "int-cocina", name: "Cocina", emoji: "\u{1F468}\u200D\u{1F373}", category: "gastronomia" },
  { id: "int-brunch", name: "Brunch", emoji: "\u{1F95E}", category: "gastronomia" },

  // Social
  { id: "int-networking", name: "Networking", emoji: "\u{1F91D}", category: "social" },
  { id: "int-idiomas", name: "Intercambio idiomas", emoji: "\u{1F30D}", category: "social" },
  { id: "int-voluntariado", name: "Voluntariado", emoji: "\u{1F49A}", category: "social" },
  { id: "int-boardgames", name: "Juegos de mesa", emoji: "\u{1F3B2}", category: "social" },

  // Tech
  { id: "int-programacion", name: "Programaci\u00F3n", emoji: "\u{1F4BB}", category: "tech" },
  { id: "int-startups", name: "Startups", emoji: "\u{1F680}", category: "tech" },
  { id: "int-ia", name: "Inteligencia Artificial", emoji: "\u{1F916}", category: "tech" },
  { id: "int-diseno", name: "Dise\u00F1o UX/UI", emoji: "\u{1F3A8}", category: "tech" },
];
