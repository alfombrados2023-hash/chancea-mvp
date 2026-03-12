export type Intention = "friends" | "networking" | "dating" | "activities";

export type MissionCategory =
  | "coffee"
  | "running"
  | "afteroffice"
  | "brunch"
  | "cultural"
  | "sports"
  | "nightlife"
  | "study";

export type ParticipationStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "completed"
  | "no_show"
  | "cancelled";

export type ScoreAction =
  | "event_completed"
  | "review_received"
  | "streak_bonus"
  | "no_show_penalty"
  | "badge_earned"
  | "check_in";

export interface User {
  id: string;
  name: string;
  age: number;
  city: string;
  intention: Intention;
  photos: string[];
  bio: string;
  verified: boolean;
  score: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  badges: string[];
  interests: string[];
  streak: number;
  lastActive: string;
  location: { lat: number; lng: number };
  joinedAt: string;
}

export interface MissionTemplate {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  icon: string;
  xpReward: number;
  defaultDuration: number;
  suggestedCapacity: number;
  image: string;
}

export interface Event {
  id: string;
  missionTemplateId: string;
  hostId: string;
  title: string;
  description: string;
  category: MissionCategory;
  location: { lat: number; lng: number; name: string; address: string };
  dateTime: string;
  duration: number;
  capacity: number;
  currentParticipants: number;
  participantIds: string[];
  status: "upcoming" | "active" | "completed" | "cancelled";
  deposit: number;
  image: string;
}

export interface Participation {
  id: string;
  userId: string;
  eventId: string;
  status: ParticipationStatus;
  depositPaid: boolean;
  checkedInAt: string | null;
  joinedAt: string;
}

export interface ChatThread {
  id: string;
  eventId: string;
  participantIds: string[];
  createdAt: string;
  expiresAt: string;
  lastMessage: ChatMessage | null;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  eventId: string;
  reviewerId: string;
  revieweeId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  comment?: string;
  createdAt: string;
}

export interface ScoreLog {
  id: string;
  userId: string;
  action: ScoreAction;
  delta: number;
  description: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "social" | "reliability" | "explorer" | "special";
}

export interface Interest {
  id: string;
  name: string;
  emoji: string;
  category: string;
}
