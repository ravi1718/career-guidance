import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  category: 'merit' | 'need-based' | 'research' | 'international';
}

const scholarships: Scholarship[] = [
  {
    id: '1',
    name: 'National Merit Scholarship',
    provider: 'Government of India',
    amount: '₹1,00,000 per year',
    deadline: '2024-08-31',
    eligibility: [
      'Minimum 80% in Class 12',
      'Family income below 8 lakhs per annum',
      'Indian citizen'
    ],
    category: 'merit'
  },
  {
    id: '2',
    name: 'Research Excellence Fellowship',
    provider: 'Science & Technology Department',
    amount: '₹25,000 per month',
    deadline: '2024-07-15',
    eligibility: [
      'Pursuing PhD in STEM fields',
      'Research proposal required',
      'Under 35 years of age'
    ],
    category: 'research'
  },
  {
    id: '3',
    name: 'International Student Grant',
    provider: 'Global Education Foundation',
    amount: '$5,000 per semester',
    deadline: '2024-09-30',
    eligibility: [
      'International students',
      'IELTS score above 7.0',
      'Acceptance letter from university'
    ],
    category: 'international'
  },
  {
    id: '4',
    name: 'Need-Based Education Support',
    provider: 'Education For All Trust',
    amount: '₹50,000 per year',
    deadline: '2024-06-30',
    eligibility: [
      'Family income below 3 lakhs per annum',
      'Good academic record',
      'Recommendation from school'
    ],
    category: 'need-based'
  }
];

const Scholarships = () => {
  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-campus-700 mb-6">Scholarships</h1>
            <p className="text-gray-600 mb-8">
              Discover scholarships that can help fund your education. We've curated a list of 
              scholarships from various providers, including government bodies, private organizations, 
              and educational institutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                      <Badge variant={
                        scholarship.category === 'merit' ? 'default' :
                        scholarship.category === 'need-based' ? 'secondary' :
                        scholarship.category === 'research' ? 'destructive' : 'outline'
                      }>
                        {scholarship.category.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Provider</p>
                        <p className="text-gray-700">{scholarship.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Amount</p>
                        <p className="text-gray-700">{scholarship.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Application Deadline</p>
                        <p className="text-gray-700">
                          {new Date(scholarship.deadline).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Eligibility</p>
                        <ul className="list-disc list-inside text-gray-700">
                          {scholarship.eligibility.map((criteria, index) => (
                            <li key={index}>{criteria}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full bg-campus-700 hover:bg-campus-800">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scholarships; 