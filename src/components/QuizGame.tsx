import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import Score from './Score';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizGameProps {
  questions: Question[];
  onBackToGenerator: () => void;
}

const letters: string[] = ['A', 'B', 'C', 'D'];

const QuizGame: React.FC<QuizGameProps> = ({ questions, onBackToGenerator }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const handleAnswerClick = (optionIndex: number): void => {
    if (showFeedback) return;

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

  const handleNewQuiz = (): void => {
    resetQuiz();
    onBackToGenerator();
  };

  const getButtonStyle = (index: number): string => {
    if (!showFeedback) {
      return 'bg-card hover:bg-accent text-card-foreground';
    }
    if (index === questions[currentQuestion].correct) {
      return 'bg-green-500 hover:bg-green-500 text-white';
    }
    if (index === selectedAnswer) {
      return 'bg-red-500 hover:bg-red-500 text-white';
    }
    return 'bg-card hover:bg-accent text-card-foreground';
  };

  return (
    <>
      {showScore ? (
        <Score
          score={score}
          totalQuestions={questions.length}
          onRestart={resetQuiz}
          onNewQuiz={handleNewQuiz}
        />
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <span>Questão {currentQuestion + 1}/{questions.length}</span>
              <span>Pontuação: {score}</span>
            </div>
            <h2 className="text-xl mb-4">
              {questions[currentQuestion].question}
            </h2>
          </div>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg flex items-center border ${getButtonStyle(index)} transition-all duration-200 disabled:opacity-70 transform hover:scale-102 hover:shadow-md`}
              >
                <div className="flex items-center flex-1">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 font-bold">
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
    </>
  );
};

export default QuizGame;
