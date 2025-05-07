import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Video, FileText, Calendar } from 'lucide-react';

interface ExamResource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'practice' | 'live';
  duration?: string;
  description: string;
  author: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ExamCategory {
  name: string;
  exams: string[];
  resources: ExamResource[];
}

const examCategories: Record<string, ExamCategory> = {
  engineering: {
    name: 'Engineering Entrance',
    exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'],
    resources: [
      {
        id: 'eng1',
        title: 'Complete Physics Course',
        type: 'video',
        duration: '40 hours',
        description: 'Comprehensive video lectures covering all JEE Physics topics',
        author: 'Dr. Sharma',
        difficulty: 'Advanced'
      },
      {
        id: 'eng2',
        title: 'Mathematics Formula Book',
        type: 'pdf',
        description: 'Quick reference guide for all important formulas',
        author: 'IIT Faculty',
        difficulty: 'Intermediate'
      }
    ]
  },
  medical: {
    name: 'Medical Entrance',
    exams: ['NEET', 'AIIMS', 'JIPMER'],
    resources: [
      {
        id: 'med1',
        title: 'Biology Complete Guide',
        type: 'pdf',
        description: 'Detailed study material for NEET Biology',
        author: 'Dr. Verma',
        difficulty: 'Advanced'
      },
      {
        id: 'med2',
        title: 'Chemistry Practice Tests',
        type: 'practice',
        description: '500+ practice questions with solutions',
        author: 'MedPrep Experts',
        difficulty: 'Intermediate'
      }
    ]
  },
  management: {
    name: 'Management Entrance',
    exams: ['CAT', 'XAT', 'MAT', 'CMAT'],
    resources: [
      {
        id: 'mba1',
        title: 'Quantitative Aptitude',
        type: 'video',
        duration: '30 hours',
        description: 'Video lectures for CAT Quant preparation',
        author: 'Prof. Kumar',
        difficulty: 'Intermediate'
      },
      {
        id: 'mba2',
        title: 'Live Mock Interviews',
        type: 'live',
        description: 'Practice GD and PI with experts',
        author: 'IIM Alumni Panel',
        difficulty: 'Advanced'
      }
    ]
  }
};

const ExamPreparation = () => {
  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-campus-700 mb-6">Exam Preparation</h1>
            <p className="text-gray-600 mb-8">
              Access comprehensive study materials, practice tests, and resources for various entrance examinations.
              Choose your exam category to get started.
            </p>

            <Tabs defaultValue="engineering" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>

              {Object.entries(examCategories).map(([key, category]) => (
                <TabsContent key={key} value={key}>
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-semibold mb-4">{category.name} Exams</h2>
                      <div className="flex flex-wrap gap-2">
                        {category.exams.map((exam) => (
                          <Badge key={exam} variant="outline">{exam}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.resources.map((resource) => (
                        <Card key={resource.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              {resource.type === 'video' && <Video className="h-5 w-5 text-blue-500" />}
                              {resource.type === 'pdf' && <FileText className="h-5 w-5 text-red-500" />}
                              {resource.type === 'practice' && <Book className="h-5 w-5 text-green-500" />}
                              {resource.type === 'live' && <Calendar className="h-5 w-5 text-purple-500" />}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <p className="text-gray-600">{resource.description}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">By {resource.author}</span>
                                {resource.duration && (
                                  <span className="text-gray-500">{resource.duration}</span>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">{resource.difficulty}</Badge>
                                <Button className="bg-campus-700 hover:bg-campus-800">
                                  Access Resource
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExamPreparation; 