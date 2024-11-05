import React, { useState } from 'react';
import { AIQuizGenerator } from '../services/AIQuizGenerator';
import { Card } from './ui/card';
import { CardHeader } from './ui/card-header';

interface QuizGeneratorProps {
  onQuizGenerated: (questions: any[]) => void;
}

export const QuizGenerator: React.FC<QuizGeneratorProps> = ({ onQuizGenerated }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    try {
      const generator = new AIQuizGenerator();
      const rawQuiz = await generator.generateQuiz({
        topic,
        difficulty,
        numberOfQuestions
      });

      if (!Array.isArray(rawQuiz)) {
        throw new Error('Resposta inválida da API');
      }

      const formattedQuestions = rawQuiz.map(q => ({
        question: q.question,
        options: q.options || [],
        correct: q.options?.indexOf(q.correctAnswer) !== -1 ? q.options.indexOf(q.correctAnswer) : null
      }));

      if (formattedQuestions.some(q => q.correct === -1)) {
        throw new Error('Formato de resposta inválido');
      }

      onQuizGenerated(formattedQuestions);
    } catch (error) {
      console.error('Erro detalhado:', error);
      alert('Erro ao gerar o quiz. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto transition-all duration-300 ${isLoading ? 'animate-pulse' : ''}`}>
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Gerador de Quiz</h2>
      </CardHeader>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Tema do Quiz:
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: História do Brasil"
            className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Dificuldade:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Número de Questões:
          </label>
          <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            min="1"
            max="20"
            className="w-full p-2 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          onClick={handleGenerateQuiz}
          disabled={isLoading || !topic.trim()}
          className="w-full p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
              <span>Gerando...</span>
            </>
          ) : (
            'Gerar Quiz'
          )}
        </button>
      </div>
    </Card>
  );
};
