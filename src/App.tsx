import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ThemeProvider } from "./components/theme-provider"
import { ThemeToggle } from "./components/theme-toggle"
import { QuizGenerator } from './components/QuizGenerator';
import QuizGame from './components/QuizGame';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleQuizGenerated = (generatedQuestions: Question[]) => {
    setQuestions(generatedQuestions);
    setQuizStarted(true);
  };

  const handleBackToGenerator = () => {
    setQuizStarted(false);
    setQuestions([]);
  };

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
              {!quizStarted ? (
                <QuizGenerator onQuizGenerated={handleQuizGenerated} />
              ) : (
                <QuizGame
                  questions={questions}
                  onBackToGenerator={handleBackToGenerator}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
