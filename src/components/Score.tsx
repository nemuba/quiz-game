import { Button, Card, CardContent, CardHeader } from '@/components/ui';
import { Trophy, Repeat, RefreshCcw } from 'lucide-react';
import React from 'react';

interface ScoreProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onNewQuiz: () => void;
}

const Score: React.FC<ScoreProps> = ({ score, totalQuestions, onRestart, onNewQuiz }) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Trophy size={64} className="text-yellow-500" />
        </div>
        <h2 className="text-xl">
          Você acertou {score} de {totalQuestions} questões!
        </h2>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-lg mb-4">
          Porcentagem de acerto: {((score / totalQuestions) * 100).toFixed(0)}%
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={onRestart}
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            <Repeat size={18} />
            Jogar Mesmo Quiz
          </Button>
          <Button
            onClick={onNewQuiz}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
          >
            <RefreshCcw size={18} />
            Gerar Novo Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Score;
