
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    title: "Engineering Colleges",
    count: 1200,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    link: "/colleges/engineering"
  },
  {
    title: "Management Institutions",
    count: 800,
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
    link: "/colleges/management"
  },
  {
    title: "Medical Universities",
    count: 350,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    link: "/colleges/medical"
  },
  {
    title: "Study Abroad",
    count: 1500,
    image: "https://images.unsplash.com/photo-1498227928029-1e7b2a3574fb",
    link: "/colleges/abroad"
  }
];

const CollegeCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="campus-heading">Explore Colleges by Category</h2>
          <p className="text-lg text-gray-600">
            Browse through various educational institutions based on your career interests
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                <h3 className="font-bold text-xl mb-1">{category.title}</h3>
                <p className="text-sm text-gray-200 mb-3">{category.count}+ institutions</p>
                <Link to={category.link}>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-campus-700 group-hover:translate-x-1 transition-transform">
                    Explore
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeCategories;
