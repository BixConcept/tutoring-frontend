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

export const subjects: string[] = [
  "Altgriechisch",
  "Biologie",
  "Chemie",
  "Deutsch",
  "Englisch",
  "Französisch",
  "Hebräisch",
  "Informatik",
  "Latein",
  "Mathematik",
  "Philosophie",
  "Physik",
  "Politik/Wirtschaft",
  "Pädagogik",
  "Sozialwissenschaften",
  "Spanisch",
];
