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
