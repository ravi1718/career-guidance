
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Engineering Student, IIT Bombay",
    avatar: "PS",
    content: "Campus Compass helped me find my dream college. The aptitude test gave me clarity about my strengths and the college recommendations were spot on!"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "MBA Student, ISB Hyderabad",
    avatar: "RV",
    content: "I was confused about which management school to choose. The detailed comparison and insights provided by Campus Compass made my decision much easier."
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Study Abroad, University of Toronto",
    avatar: "AP",
    content: "The guidance for studying abroad was incredibly helpful. From application procedures to scholarship information, everything was well-explained."
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="campus-heading">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from students who found their perfect educational path through Campus Compass
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="campus-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-4 border-2 border-campus-500">
                    <AvatarFallback className="bg-campus-700 text-white">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  
                  <blockquote className="text-gray-600 italic mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div>
                    <h4 className="font-semibold text-campus-700">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
