import { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';

export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setQuestions(questionsData.questions);
    } catch (err) {
      setError('Erro ao carregar as questões');
    } finally {
      setLoading(false);
    }
  }, []);

  return { questions, loading, error };
};
