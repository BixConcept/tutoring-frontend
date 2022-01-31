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
  "evangelische Religion",
  "Französisch",
  "Hebräisch",
  "Informatik",
  "katholische Religion",
  "Latein",
  "Mathematik",
  "Philosophie",
  "Physik",
  "Politik/Wirtschaft",
  "Pädagogik",
  "Sozialwissenschaften",
  "Spanisch",
];
