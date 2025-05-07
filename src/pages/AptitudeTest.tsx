import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import TestInstructions from '@/components/aptitude-test/TestInstructions';
import QuestionCard, { Question } from '@/components/aptitude-test/QuestionCard';
import TestResults from '@/components/aptitude-test/TestResults';
import QuestionManager from '@/components/aptitude-test/QuestionManager';
import axios from 'axios';

enum TestStage {
  INSTRUCTIONS,
  TEST_IN_PROGRESS,
  RESULTS
}

const AptitudeTest = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [testStage, setTestStage] = useState<TestStage>(TestStage.INSTRUCTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to access this page.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // For students, check if they've already taken the test
    if (user?.userType === 'student') {
      // You might want to add an API endpoint to check this
      // For now, we'll just let them take the test
    }
  }, [isAuthenticated, user, navigate, toast]);

  // Format time remaining
  const formatTimeRemaining = (): string => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (testStage === TestStage.TEST_IN_PROGRESS && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer as NodeJS.Timeout);
            toast({
              title: "Time's Up!",
              description: "Your time for the aptitude test has ended.",
            });
            setTestStage(TestStage.RESULTS);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testStage, timeRemaining, toast]);

  // Fetch questions when starting the test
  const handleStartTest = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/aptitude/questions');
      
      if (!response.data || response.data.length === 0) {
        throw new Error('No questions available');
      }
      
      setQuestions(response.data);
      setTestStage(TestStage.TEST_IN_PROGRESS);
      toast({
        title: "Test Started",
        description: "Your aptitude test has begun. Good luck!",
      });
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      toast({
        title: "Error",
        description: "Failed to load aptitude test questions. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setTestStage(TestStage.RESULTS);
      toast({
        title: "Test Completed",
        description: "You've successfully completed the aptitude test!",
      });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  // Move to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Submit test results
  const handleSubmitResults = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([index, answer]) => ({
        questionId: questions[parseInt(index)]._id,
        selectedAnswer: questions[parseInt(index)].options.indexOf(answer)
      }));

      const response = await axios.post('/api/aptitude/submit', {
        answers: formattedAnswers
      });

      setTestStage(TestStage.RESULTS);
      toast({
        title: "Results Submitted",
        description: "Your aptitude test results have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to submit results:', error);
      toast({
        title: "Error",
        description: "Failed to submit your test results. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // If user is a college, show the question manager
  if (user?.userType === 'college') {
    return (
      <Layout>
        <div className="py-12 bg-gray-50 min-h-[80vh]">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-campus-700 mb-8">Manage Aptitude Test Questions</h1>
            <QuestionManager />
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {testStage === TestStage.INSTRUCTIONS && (
              <>
                <h1 className="text-3xl font-bold text-campus-700 mb-6">Aptitude Test</h1>
                <TestInstructions onStart={handleStartTest} isLoading={isLoading} />
              </>
            )}
            
            {testStage === TestStage.TEST_IN_PROGRESS && questions.length > 0 && (
              <QuestionCard
                question={questions[currentQuestionIndex]}
                totalQuestions={questions.length}
                currentQuestionIndex={currentQuestionIndex}
                selectedAnswer={answers[currentQuestionIndex] || null}
                onAnswerSelect={handleAnswerSelect}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
                timeRemaining={formatTimeRemaining()}
                onSubmit={currentQuestionIndex === questions.length - 1 ? handleSubmitResults : undefined}
              />
            )}
            
            {testStage === TestStage.RESULTS && (
              <>
                <h1 className="text-3xl font-bold text-campus-700 mb-6">Your Test Results</h1>
                <TestResults 
                  onViewDetails={() => {
                    toast({
                      title: "Detailed Analysis",
                      description: "This feature will be available in the next update",
                    });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AptitudeTest;
