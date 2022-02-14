export interface TutoringOffer {
  offer_id: number;
  user_id: number;
  name: string;
  email: string;
  max_grade: number;
  phone_number: string | null;
  subject: string;
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
  auth: AuthLevel;
}

export const topSubjects: string[] = [
  "Mathematik",
  "Englisch",
  "Deutsch",
  "Latein",
  "Französisch",
  "Spanisch",
];

export const subjects: string[] = [
  "Altgriechisch",
  "Biologie",
  "Chemie",
  "Hebräisch",
  "Informatik",
  "Philosophie",
  "Physik",
  "Politik/Wirtschaft",
  "Pädagogik",
  "Sozialwissenschaften",
];

export const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
