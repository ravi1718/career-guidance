import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'verbal' | 'quantitative' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  isActive: boolean;
}

const CollegeDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    category: 'verbal',
    difficulty: 'medium'
  });

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'college') {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in as a college to access this page.",
        variant: "destructive",
      });
      navigate('/login');
    } else {
      fetchQuestions();
    }
  }, [isAuthenticated, user, navigate, toast]);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/aptitude/questions/college');
      setQuestions(response.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      toast({
        title: "Error",
        description: "Failed to load aptitude questions. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = async () => {
    try {
      if (!newQuestion.question || newQuestion.options.some(opt => !opt)) {
        toast({
          title: "Invalid Input",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        return;
      }

      await axios.post('/api/aptitude/questions', newQuestion);
      
      toast({
        title: "Success",
        description: "Question added successfully.",
      });

      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        category: 'verbal',
        difficulty: 'medium'
      });

      fetchQuestions();
    } catch (error) {
      console.error('Failed to add question:', error);
      toast({
        title: "Error",
        description: "Failed to add question. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleToggleQuestion = async (questionId: string, isActive: boolean) => {
    try {
      await axios.patch(`/api/aptitude/questions/${questionId}`, { isActive });
      
      toast({
        title: "Success",
        description: `Question ${isActive ? 'activated' : 'deactivated'} successfully.`,
      });

      fetchQuestions();
    } catch (error) {
      console.error('Failed to toggle question:', error);
      toast({
        title: "Error",
        description: "Failed to update question status. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await axios.delete(`/api/aptitude/questions/${questionId}`);
      
      toast({
        title: "Success",
        description: "Question deleted successfully.",
      });

      fetchQuestions();
    } catch (error) {
      console.error('Failed to delete question:', error);
      toast({
        title: "Error",
        description: "Failed to delete question. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-campus-700 mb-8">College Dashboard</h1>
            
            {/* Add New Question */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
                <CardDescription>Create a new aptitude test question</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      placeholder="Enter the question"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={newQuestion.category}
                        onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="verbal">Verbal</SelectItem>
                          <SelectItem value="quantitative">Quantitative</SelectItem>
                          <SelectItem value="general">General Knowledge</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Difficulty</Label>
                      <Select
                        value={newQuestion.difficulty}
                        onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value as any })}
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
                  
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {newQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...newQuestion.options];
                            newOptions[index] = e.target.value;
                            setNewQuestion({ ...newQuestion, options: newOptions });
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                        <input
                          type="radio"
                          checked={newQuestion.correctAnswer === index}
                          onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Button onClick={handleAddQuestion} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Question List */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Questions</CardTitle>
                <CardDescription>View and manage your aptitude test questions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading questions...</div>
                ) : questions.length === 0 ? (
                  <div className="text-center py-8">No questions found. Add your first question above.</div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <div key={question._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{question.question}</h3>
                            <p className="text-sm text-gray-500">
                              Category: {question.category} | Difficulty: {question.difficulty}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleQuestion(question._id, !question.isActive)}
                            >
                              {question.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteQuestion(question._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-2 ${
                                index === question.correctAnswer ? 'text-green-600' : ''
                              }`}
                            >
                              <span className="w-4">{index + 1}.</span>
                              <span>{option}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollegeDashboard; 