
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';

// Career field data
const careerFields = [
  {
    id: 'engineering',
    title: 'Engineering',
    icon: '🛠️',
    description: 'Design and build solutions to technical problems',
    options: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Chemical']
  },
  {
    id: 'management',
    title: 'Management',
    icon: '📊',
    description: 'Lead organizations and manage resources effectively',
    options: ['Business Administration', 'Marketing', 'Finance', 'Human Resources', 'Operations']
  },
  {
    id: 'medicine',
    title: 'Medicine & Healthcare',
    icon: '⚕️',
    description: 'Diagnose, treat, and prevent illness and injury',
    options: ['MBBS', 'Nursing', 'Pharmacy', 'Dentistry', 'Physiotherapy']
  },
  {
    id: 'arts',
    title: 'Arts & Humanities',
    icon: '🎭',
    description: 'Study human culture, history, and creative expression',
    options: ['Literature', 'History', 'Philosophy', 'Fine Arts', 'Linguistics']
  },
  {
    id: 'science',
    title: 'Pure Sciences',
    icon: '🔬',
    description: 'Research and understand the natural world',
    options: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Environmental Science']
  },
  {
    id: 'design',
    title: 'Design & Architecture',
    icon: '✏️',
    description: 'Create functional and aesthetically pleasing spaces and products',
    options: ['Architecture', 'Interior Design', 'Industrial Design', 'Fashion Design', 'Graphic Design']
  }
];

const CareerSelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const navigate = useNavigate();

  // Filter career fields based on search term
  const filteredCareerFields = searchTerm 
    ? careerFields.filter(
        field => 
          field.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          field.options.some(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : careerFields;

  // Handle career field selection
  const handleFieldSelect = (fieldId: string) => {
    setSelectedField(fieldId);
    setSelectedSpecialization(null);
  };

  // Handle specialization selection
  const handleSpecializationSelect = (specialization: string) => {
    setSelectedSpecialization(specialization);
  };

  // Handle continue button click
  const handleContinue = () => {
    if (selectedSpecialization) {
      navigate('/location-selection', { 
        state: { 
          careerField: selectedField, 
          specialization: selectedSpecialization 
        } 
      });
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="campus-heading text-center">Choose Your Career Path</h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Select a career field and specialization to find the most suitable educational programs
            </p>

            {/* Search */}
            <div className="relative mb-8 max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search career fields..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Career Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredCareerFields.map((field) => (
                <Card 
                  key={field.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedField === field.id 
                      ? 'ring-2 ring-campus-700 shadow-md' 
                      : 'hover:border-campus-200'
                  }`}
                  onClick={() => handleFieldSelect(field.id)}
                >
                  <CardContent className="p-6">
                    <div className="text-2xl mb-2">{field.icon}</div>
                    <h3 className="font-semibold text-lg mb-1">{field.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{field.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Specializations */}
            {selectedField && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-campus-700 mb-4">
                  Select a Specialization in {careerFields.find(f => f.id === selectedField)?.title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {careerFields
                    .find(f => f.id === selectedField)
                    ?.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-md text-center cursor-pointer transition-all ${
                          selectedSpecialization === option
                            ? 'bg-campus-700 text-white border-campus-800'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => handleSpecializationSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button 
                    className="bg-campus-700 hover:bg-campus-800" 
                    size="lg" 
                    disabled={!selectedSpecialization}
                    onClick={handleContinue}
                  >
                    Continue to Location Selection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareerSelection;
