import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface Career {
  id: string;
  title: string;
  description: string;
  skills: string[];
  averageSalary: string;
  growthProspects: string;
  qualifications: string[];
  industries: string[];
  category: 'technology' | 'healthcare' | 'business' | 'creative' | 'science';
}

const careers: Career[] = [
  {
    id: 'tech1',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications and systems.',
    skills: ['Programming', 'Problem Solving', 'System Design', 'Team Collaboration'],
    averageSalary: '₹6,00,000 - ₹20,00,000 per year',
    growthProspects: 'High demand with continuous growth opportunities',
    qualifications: ['B.Tech in CS/IT', 'BCA', 'MCA'],
    industries: ['IT Services', 'Product Companies', 'Startups'],
    category: 'technology'
  },
  {
    id: 'health1',
    title: 'Medical Doctor',
    description: 'Diagnose and treat patients in various medical specialties.',
    skills: ['Clinical Knowledge', 'Patient Care', 'Decision Making', 'Communication'],
    averageSalary: '₹8,00,000 - ₹25,00,000 per year',
    growthProspects: 'Stable career with specialization opportunities',
    qualifications: ['MBBS', 'MD/MS', 'Specialization'],
    industries: ['Hospitals', 'Clinics', 'Research'],
    category: 'healthcare'
  },
  {
    id: 'business1',
    title: 'Management Consultant',
    description: 'Advise organizations on business strategy and operations.',
    skills: ['Analysis', 'Problem Solving', 'Communication', 'Leadership'],
    averageSalary: '₹10,00,000 - ₹30,00,000 per year',
    growthProspects: 'Excellent growth with experience',
    qualifications: ['MBA', 'CA', 'Engineering + MBA'],
    industries: ['Consulting Firms', 'Corporate Strategy', 'Independent Practice'],
    category: 'business'
  },
  {
    id: 'creative1',
    title: 'UX Designer',
    description: 'Design user experiences for digital products and services.',
    skills: ['UI Design', 'User Research', 'Prototyping', 'Visual Design'],
    averageSalary: '₹5,00,000 - ₹18,00,000 per year',
    growthProspects: 'Growing demand in digital industry',
    qualifications: ['Design Degree', 'HCI Certification', 'Portfolio'],
    industries: ['Tech Companies', 'Design Studios', 'Agencies'],
    category: 'creative'
  },
  {
    id: 'science1',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make better decisions.',
    skills: ['Statistics', 'Machine Learning', 'Programming', 'Data Visualization'],
    averageSalary: '₹8,00,000 - ₹25,00,000 per year',
    growthProspects: 'High demand in various industries',
    qualifications: ['B.Tech/M.Tech', 'Statistics Degree', 'PhD'],
    industries: ['Tech', 'Finance', 'Healthcare', 'Research'],
    category: 'science'
  }
];

const CareerOptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCareers = careers.filter(career => {
    const matchesSearch = 
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || career.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'technology', label: 'Technology' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'business', label: 'Business' },
    { id: 'creative', label: 'Creative' },
    { id: 'science', label: 'Science' }
  ];

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-campus-700 mb-6">Career Options</h1>
            <p className="text-gray-600 mb-8">
              Explore various career paths and find detailed information about qualifications,
              skills required, and growth prospects in different industries.
            </p>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search careers, skills, or industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Career List */}
            <div className="grid grid-cols-1 gap-6">
              {filteredCareers.map((career) => (
                <Card key={career.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{career.title}</CardTitle>
                      <Badge>{career.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">{career.description}</p>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Qualifications</h3>
                          <ul className="list-disc list-inside text-gray-600">
                            {career.qualifications.map((qual, index) => (
                              <li key={index}>{qual}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Industries</h3>
                          <ul className="list-disc list-inside text-gray-600">
                            {career.industries.map((industry, index) => (
                              <li key={index}>{industry}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Average Salary</h3>
                          <p className="text-gray-600">{career.averageSalary}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Growth Prospects</h3>
                          <p className="text-gray-600">{career.growthProspects}</p>
                        </div>
                      </div>

                      <Button className="w-full bg-campus-700 hover:bg-campus-800">
                        Learn More
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

export default CareerOptions; 