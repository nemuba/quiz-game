import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, X, Check } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília"],
    correct: 2
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
    correct: 1
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Marte", "Júpiter", "Saturno"],
    correct: 1
  }
];

const letters: string[] = ['A', 'B', 'C'];

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const handleAnswerClick = (optionIndex: number): void => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getButtonStyle = (index: number): string => {
    if (!showFeedback) {
      return 'bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-300';
    }
    if (index === questions[currentQuestion].correct) {
      return 'bg-green-500 hover:bg-green-500 text-white';
    }
    if (index === selectedAnswer) {
      return 'bg-red-500 hover:bg-red-500 text-white';
    }
    return 'bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-300';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Quiz Game
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showScore ? (
            <div className="text-center text-gray-800">
              <div className="flex justify-center mb-4">
                <Trophy size={64} className="text-yellow-500" />
              </div>
              <h2 className="text-xl mb-4">
                Você acertou {score} de {questions.length} questões!
              </h2>
              <div className="text-lg mb-4">
                Porcentagem de acerto: {((score / questions.length) * 100).toFixed(0)}%
              </div>
              <Button
                onClick={resetQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Jogar Novamente
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between mb-4 text-gray-800">
                  <span>Questão {currentQuestion + 1}/{questions.length}</span>
                  <span>Pontuação: {score}</span>
                </div>
                <h2 className="text-xl mb-4 text-gray-800">
                  {questions[currentQuestion].question}
                </h2>
              </div>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-lg flex items-center border-2 ${getButtonStyle(index)} transition-all duration-200 disabled:opacity-70 transform hover:scale-102 hover:shadow-md`}
                  >
                    <div className="flex items-center flex-1">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 font-bold text-gray-700">
                        {letters[index]}
                      </span>
                      <span className="font-medium flex-1">{option}</span>
                    </div>
                    {showFeedback && index === questions[currentQuestion].correct && (
                      <Check className="text-white" size={20} />
                    )}
                    {showFeedback && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                      <X className="text-white" size={20} />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
