
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-campus-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Educational Path?</h2>
          <p className="text-lg mb-8 text-gray-200">
            Start your journey today with our personalized college finder and aptitude test
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-campus-700 hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
            <Link to="/aptitude-test">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                Take Free Aptitude Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
