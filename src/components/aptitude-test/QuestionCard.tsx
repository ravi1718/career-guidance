import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: string;
}

export interface QuestionCardProps {
  question: Question;
  totalQuestions: number;
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  timeRemaining: string;
  onSubmit?: () => Promise<void>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  totalQuestions,
  currentQuestionIndex,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  timeRemaining,
  onSubmit
}) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-campus-700">
            Time Remaining: {timeRemaining}
          </span>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-medium">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(option)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedAnswer === option
                    ? 'border-campus-700 bg-campus-50 text-campus-700'
                    : 'border-gray-200 hover:border-campus-700 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              onClick={onPrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            {onSubmit && currentQuestionIndex === totalQuestions - 1 ? (
              <Button onClick={onSubmit} className="bg-campus-700 hover:bg-campus-800">
                Submit Test
              </Button>
            ) : (
              <Button
                onClick={onNext}
                disabled={!selectedAnswer}
                className="bg-campus-700 hover:bg-campus-800"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
