import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const resourceLinks = [
  { href: '/resources/scholarships', label: 'Scholarships' },
  { href: '/resources/exam-preparation', label: 'Exam Preparation' },
  { href: '/resources/career-options', label: 'Career Options' }
];

const collegeLinks = [
  { href: '/colleges/india', label: 'Indian Colleges' },
  { href: '/colleges/abroad', label: 'Study Abroad' }
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-campus-700">Campus Compass</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Resources Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('resources')}
                className="flex items-center text-gray-700 hover:text-campus-700"
              >
                Resources
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Colleges Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('colleges')}
                className="flex items-center text-gray-700 hover:text-campus-700"
              >
                Colleges
              </button>
              {activeDropdown === 'colleges' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  {collegeLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Show Aptitude Test link only for college users */}
            {isAuthenticated && user?.userType === 'college' && (
              <Link to="/aptitude-test" className="text-gray-700 hover:text-campus-700">
                Aptitude Test
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-campus-700 text-campus-700 hover:bg-campus-50">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-campus-700 text-white hover:bg-campus-800">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-campus-700 text-campus-700 hover:bg-campus-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Mobile Resources */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobile-resources')}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Resources
                </button>
                {activeDropdown === 'mobile-resources' && (
                  <div className="pl-8 space-y-2">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block py-2 text-sm text-gray-600 hover:text-campus-700"
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Colleges */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobile-colleges')}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Colleges
                </button>
                {activeDropdown === 'mobile-colleges' && (
                  <div className="pl-8 space-y-2">
                    {collegeLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block py-2 text-sm text-gray-600 hover:text-campus-700"
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Show Aptitude Test link only for college users */}
              {isAuthenticated && user?.userType === 'college' && (
                <Link
                  to="/aptitude-test"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Aptitude Test
                </Link>
              )}

              {/* Mobile Auth Buttons */}
              <div className="px-4 pt-4 border-t">
                {!isAuthenticated ? (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-campus-700 text-campus-700">
                        Log In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-campus-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-campus-700 text-campus-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
