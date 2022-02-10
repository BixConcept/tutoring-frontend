export interface TutoringOffer {
  offer_id: number;
  user_id: number;
  name: string;
  email: string;
  max_grade: number;
  grade: number;
  phone_number: string | null;
  subject: string;
  misc: string | null;
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
