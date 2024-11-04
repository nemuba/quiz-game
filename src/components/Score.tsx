import { Button, Card, CardContent, CardHeader } from '@/components/ui';
import { Trophy } from 'lucide-react';
import React from 'react';

interface ScoreProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Score: React.FC<ScoreProps> = ({ score, totalQuestions, onRestart }) => {
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
        <Button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Jogar Novamente
        </Button>
      </CardContent>
    </Card>
  );
};

export default Score;
