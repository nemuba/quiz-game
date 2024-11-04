import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { X, Check } from 'lucide-react';
import { ThemeProvider } from "./components/theme-provider"
import { ThemeToggle } from "./components/theme-toggle"
import Score from './components/Score';
import { useQuestions } from './hooks/useQuestions';

const letters: string[] = ['A', 'B', 'C'];

const App: React.FC = () => {
  const { questions, loading, error } = useQuestions();
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

  if (loading) {
    return (
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      </ThemeProvider>
    );
  }

  if (error || questions.length === 0) {
    return (
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p>Erro ao carregar as questões</p>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <ThemeToggle />
        <div className="flex justify-center items-center min-h-screen p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Quiz Game
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showScore ? (
                <Score
                  score={score}
                  totalQuestions={questions.length}
                  onRestart={resetQuiz}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
