export interface Task {
  id: string;
  subject: string;
  duration: string;
  type: 'Questões' | 'Revisão';
  progress: number;
  color: string;
  completed: boolean;
}

export interface Question {
  id: string;
  subject: string; // Mapeia para a disciplina do edital
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export type ViewState = 'dashboard' | 'study' | 'cycle' | 'analysis' | 'profile';

export interface WeeklyData {
  day: string;
  hours: number;
  met: boolean;
}

export interface SefaSubject {
  name: string;
  category: 'Gerais' | 'Específicos';
}

export interface SefaCargo {
  id: string;
  name: string;
  subjects: SefaSubject[];
}