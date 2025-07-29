import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, FileText, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TestResultsProps {
  onViewDetails: () => void;
  results?: {
    categoryScores: {
      verbal: number;
      quantitative: number;
      general: number;
    };
    overallScore: number;
    recommendations: Array<{
      field: string;
      careers: string[];
    }>;
  };
}

const TestResults: React.FC<TestResultsProps> = ({
  onViewDetails,
  results = {
    categoryScores: {
      verbal: 0,
      quantitative: 0,
      general: 0
    },
    overallScore: 0,
    recommendations: []
  }
}) => {
  const { categoryScores, overallScore, recommendations } = results;

  const categories = [
    {
      category: "Verbal Ability",
      score: Math.round(categoryScores.verbal),
      total: 100,
      strength: getStrengthText(categoryScores.verbal)
    },
    {
      category: "Quantitative Aptitude",
      score: Math.round(categoryScores.quantitative),
      total: 100,
      strength: getStrengthText(categoryScores.quantitative)
    },
    {
      category: "General Knowledge",
      score: Math.round(categoryScores.general),
      total: 100,
      strength: getStrengthText(categoryScores.general)
    }
  ];

  function getStrengthText(score: number): string {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
  }

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader className="bg-campus-700 text-white rounded-t-lg text-center">
        <div className="flex justify-center mb-3">
          <Trophy className="h-12 w-12" />
        </div>
        <CardTitle className="text-3xl">Aptitude Test Results</CardTitle>
        <CardDescription className="text-gray-200">
          Congratulations on completing the assessment!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Overall Score */}
          <div className="text-center">
            <h3 className="text-lg text-gray-600 mb-2">Your Overall Score</h3>
            <div className="text-4xl font-bold text-campus-700 mb-2">{Math.round(overallScore)}%</div>
            <Progress value={overallScore} className="h-3 w-full max-w-md mx-auto" />
            <p className="mt-2 text-gray-600">You scored higher than 65% of test takers</p>
          </div>
          
          {/* Category Breakdown */}
          <div>
            <h3 className="text-xl font-semibold text-campus-700 mb-4">Performance by Category</h3>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{category.category}</h4>
                    <span className="font-semibold">{category.score}/{category.total}</span>
                  </div>
                  <Progress value={category.score} className="h-2" />
                  <p className="mt-2 text-sm text-gray-600">Strength: {category.strength}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommended Career Fields */}
          <div>
            <h3 className="text-xl font-semibold text-campus-700 mb-4">Recommended Career Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.map((field, index) => (
                <div key={index} className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <Award className="h-5 w-5 mr-2 text-teal-600" />
                  <span>{field.field}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-campus-700 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Next Steps
            </h3>
            <p className="mt-2 text-gray-600">
              Based on your aptitude results, explore colleges and courses that align with your strengths. 
              Our platform can help you find the best educational options suited to your abilities and interests.
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Results
        </Button>
        <Button className="bg-campus-700 hover:bg-campus-800" onClick={onViewDetails}>
          View Detailed Analysis
        </Button>
        <Link to="/career-selection" className="w-full sm:w-auto">
          <Button className="bg-teal-600 hover:bg-teal-700 w-full">
            Explore Career Options
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TestResults;
