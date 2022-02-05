export interface TutoringOffer {
  id: number;
  teacher: Teacher;
  subject: string;
  maxGrade: number;
}

export interface Teacher {
  id: number;
  name: string;
  phoneNumber?: string;
  email: string;
  grade: number;
  misc?: string;
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
