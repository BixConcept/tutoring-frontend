export interface TutoringOffer {
  id: number;
  userId: number;
  name: string;
  email: string;
  maxGrade: number;
  phoneNumber: string | null;
  subjectId: string;
  subjectName: string;
  misc: string | null;
  grade: number;
  hasDiscord: boolean;
  discordUser: string;
  hasWhatsapp: boolean;
  hasSignal: boolean;
}

export enum AuthLevel {
  Unverified = 0,
  Verified = 1,
  Admin = 2,
}

// for checking if requests are done and what status lol
export interface Request<T> {
  state: RequestState;
  data: T | null;
}
export enum RequestState {
  NotAsked,
  Loading,
  Failure,
  Success,
}

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  misc?: string;
  grade: number;
  authLevel: AuthLevel;
  offers: TutoringOffer[];
  createdAt: Date;
  hasDiscord: boolean;
  discordUser: string;
  hasWhatsapp: boolean;
  hasSignal: boolean;
}

export const topSubjects: string[] = [
  "Mathematik",
  "Englisch",
  "Deutsch",
  "Latein",
  "Französisch",
  "Spanisch",
];

export interface Subject {
  id: number;
  name: string;
}
export interface ApiRequest {
  id: number;
  method: string;
  authLevel: AuthLevel;
  path: string;
  ip: string;
  time: Date;
}

export interface Stats {
  users: number;
  apiRequests: number;
  requests: number;
  offers: number;
}

export interface NotificationRequest {
  id: number;
  subjectId: number;
  // other too
}
