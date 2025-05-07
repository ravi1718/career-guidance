import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: string;
}

const QuestionManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    category: 'verbal',
    difficulty: 'medium'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch existing questions
  const fetchQuestions = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get('/api/aptitude/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load questions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user?.userType === 'college') {
      fetchQuestions();
    }
  }, [user]);

  // Handle input changes for new question
  const handleInputChange = (field: string, value: string | number, optionIndex?: number) => {
    if (field === 'options' && typeof optionIndex === 'number') {
      const newOptions = [...newQuestion.options];
      newOptions[optionIndex] = value as string;
      setNewQuestion(prev => ({ ...prev, options: newOptions }));
    } else if (field === 'correctAnswer') {
      setNewQuestion(prev => ({ ...prev, correctAnswer: Number(value) }));
    } else {
      setNewQuestion(prev => ({ ...prev, [field]: value }));
    }
  };

  // Add new question
  const handleAddQuestion = async () => {
    try {
      setIsLoading(true);
      
      // Validate inputs
      if (!newQuestion.question.trim()) {
        throw new Error('Question text is required');
      }
      if (newQuestion.options.some(opt => !opt.trim())) {
        throw new Error('All options must be filled');
      }

      const response = await axios.post('/api/aptitude/questions', newQuestion);
      
      setQuestions(prev => [response.data, ...prev]);
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        category: 'verbal',
        difficulty: 'medium'
      });
      
      toast({
        title: 'Success',
        description: 'Question added successfully!',
      });
    } catch (error) {
      console.error('Failed to add question:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add question',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Add New Question Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question Text</label>
              <Input
                value={newQuestion.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                placeholder="Enter your question"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Options</label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => handleInputChange('options', e.target.value, index)}
                    placeholder={`Option ${index + 1}`}
                    disabled={isLoading}
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={newQuestion.correctAnswer === index}
                    onChange={() => handleInputChange('correctAnswer', index)}
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  value={newQuestion.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verbal">Verbal</SelectItem>
                    <SelectItem value="quantitative">Quantitative</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <Select
                  value={newQuestion.difficulty}
                  onValueChange={(value) => handleInputChange('difficulty', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAddQuestion}
              disabled={isLoading}
              className="w-full bg-campus-700 hover:bg-campus-800"
            >
              {isLoading ? 'Adding...' : 'Add Question'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Questions List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Existing Questions</h2>
        {isFetching ? (
          <div className="text-center py-8">Loading questions...</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No questions added yet. Start by adding your first question above.
          </div>
        ) : (
          questions.map((question) => (
            <Card key={question._id}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="font-medium">{question.question}</p>
                  <div className="pl-4 space-y-1">
                    {question.options.map((option, index) => (
                      <p
                        key={index}
                        className={`${
                          index === question.correctAnswer ? 'text-green-600 font-medium' : ''
                        }`}
                      >
                        {index + 1}. {option}
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>Category: {question.category}</span>
                    <span>Difficulty: {question.difficulty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionManager; 