
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-campus-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="font-bold text-xl mb-4">Campus Compass</h3>
            <p className="text-gray-300 mb-4">
              Helping students find the right path to their academic and professional future.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/colleges/india" className="text-gray-300 hover:text-white">
                  Indian Colleges
                </Link>
              </li>
              <li>
                <Link to="/colleges/abroad" className="text-gray-300 hover:text-white">
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link to="/aptitude-test" className="text-gray-300 hover:text-white">
                  Aptitude Test
                </Link>
              </li>
              <li>
                <Link to="/career-options" className="text-gray-300 hover:text-white">
                  Career Guidance
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/scholarships" className="text-gray-300 hover:text-white">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/exam-prep" className="text-gray-300 hover:text-white">
                  Exam Preparation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <a href="mailto:info@campuscompass.com" className="text-gray-300 hover:text-white">
                  info@campuscompass.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400">© {new Date().getFullYear()} Campus Compass. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
