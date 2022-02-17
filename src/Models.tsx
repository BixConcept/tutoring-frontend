export interface TutoringOffer {
  offerId: number;
  userId: number;
  name: string;
  email: string;
  maxGrade: number;
  phoneNumber: string | null;
  subjectId: string;
  subjectName: string;
  misc: string | null;
  grade: number;
}

export enum AuthLevel {
  Unverified = 0,
  Verified = 1,
  Admin = 2,
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
  phone_number?: string;
  misc?: string;
  grade: number;
  authLevel: AuthLevel;
}

export const topSubjects: string[] = [
  "Mathematik",
  "Englisch",
  "Deutsch",
  "Latein",
  "Französisch",
  "Spanisch",
  "Fortnite",
];

export interface Subject {
  id: number;
  name: string;
}
