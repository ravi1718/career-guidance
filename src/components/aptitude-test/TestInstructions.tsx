import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface TestInstructionsProps {
  onStart: () => Promise<void>;
  isLoading: boolean;
}

const TestInstructions: React.FC<TestInstructionsProps> = ({ onStart, isLoading }) => {
  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader className="bg-campus-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center">
          <PenTool className="mr-2" /> 
          Aptitude Test Instructions
        </CardTitle>
        <CardDescription className="text-gray-200">
          Please read all instructions carefully before beginning the test
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-campus-700 mb-2">Test Overview</h3>
            <p className="text-gray-600">
              The aptitude test is designed to assess your abilities and interests to recommend suitable career paths and educational opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-teal-600" />
              <h4 className="font-semibold mb-1">Test Duration</h4>
              <p className="text-gray-600">45 minutes</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-teal-600" />
              <h4 className="font-semibold mb-1">Total Questions</h4>
              <p className="text-gray-600">60 questions</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-teal-600" />
              <h4 className="font-semibold mb-1">Passing Score</h4>
              <p className="text-gray-600">No minimum score</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-campus-700 mb-2">Test Sections</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Verbal Ability (20 questions):</span> Tests your language comprehension, vocabulary, and grammar skills.
              </li>
              <li>
                <span className="font-medium">Quantitative Aptitude (20 questions):</span> Assesses your mathematical and logical reasoning abilities.
              </li>
              <li>
                <span className="font-medium">General Knowledge (20 questions):</span> Evaluates your awareness of current affairs, history, and general information.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-campus-700 mb-2">Important Guidelines</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Once the test begins, the timer cannot be paused.</li>
              <li>Each question has only one correct answer.</li>
              <li>There is no negative marking for incorrect answers.</li>
              <li>Do not refresh the page during the test as your progress may be lost.</li>
              <li>Ensure you have a stable internet connection before starting the test.</li>
              <li>Results will be available immediately after completing all questions.</li>
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
        <Button 
          className="bg-campus-700 hover:bg-campus-800" 
          onClick={onStart}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Aptitude Test'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestInstructions;
