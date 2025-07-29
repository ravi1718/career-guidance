
import React from 'react';
import { GraduationCap, BookOpen, Compass, Globe, PenTool, Trophy } from 'lucide-react';

const features = [
  {
    icon: <GraduationCap className="h-10 w-10 text-teal-600" />,
    title: "College Finder",
    description: "Discover the best colleges in India and abroad based on your preferences, entrance exam scores, and academic goals."
  },
  {
    icon: <PenTool className="h-10 w-10 text-teal-600" />,
    title: "Aptitude Testing",
    description: "Take our comprehensive aptitude test to understand your strengths and find the courses that best match your abilities."
  },
  {
    icon: <Globe className="h-10 w-10 text-teal-600" />,
    title: "Study Abroad",
    description: "Explore international education opportunities with detailed information on admission requirements, costs, and scholarships."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-teal-600" />,
    title: "Course Guidance",
    description: "Get detailed insights into different courses, their eligibility criteria, career prospects, and industry demand."
  },
  {
    icon: <Compass className="h-10 w-10 text-teal-600" />,
    title: "Career Mapping",
    description: "Plan your career path with guidance on industry trends, job prospects, and required qualifications."
  },
  {
    icon: <Trophy className="h-10 w-10 text-teal-600" />,
    title: "Scholarship Finder",
    description: "Find scholarships and financial aid options to make your education affordable and accessible."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="campus-heading">How Campus Compass Helps You</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From choosing the right career path to finding the perfect college, we guide you through every step of your educational journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="campus-card hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-campus-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
