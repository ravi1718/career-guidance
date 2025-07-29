import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/config/api';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface College {
  _id: string;
  name: string;
  location: string;
  description: string;
  courses: Array<{
    name: string;
    duration: string;
    fees: number;
  }>;
  ratings: number;
}

const CollegeList = () => {
  const { country, state } = useParams();
  const { toast } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    course: 'all',
    rating: 'all'
  });

  useEffect(() => {
    fetchColleges();
  }, [country, state]);

  const fetchColleges = async () => {
    try {
      setIsLoading(true);
      let url = '/api/colleges';
      if (country) {
        url += `/${country}`;
        if (state) {
          url += `/${state}`;
        }
      }
      const response = await api.get(url);
      setColleges(response.data);
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
      toast({
        title: "Error",
        description: "Failed to load colleges. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         college.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCourse = filters.course === 'all' || 
                         college.courses.some(course => course.name.toLowerCase() === filters.course.toLowerCase());
    
    const matchesRating = filters.rating === 'all' || college.ratings >= parseInt(filters.rating);
    
    return matchesSearch && matchesCourse && matchesRating;
  });

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-campus-700 mb-8">
              {state ? `Colleges in ${state}, ${country}` : 
               country ? `Colleges in ${country}` : 
               'All Colleges'}
            </h1>

            {/* Filters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Filter Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input
                      placeholder="Search colleges..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                  </div>
                  <Select
                    value={filters.course}
                    onValueChange={(value) => setFilters({ ...filters, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filters.rating}
                    onValueChange={(value) => setFilters({ ...filters, rating: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="2">2+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* College List */}
            {isLoading ? (
              <div className="text-center py-8">Loading colleges...</div>
            ) : filteredColleges.length === 0 ? (
              <div className="text-center py-8">No colleges found matching your criteria.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredColleges.map((college) => (
                  <Link to={`/college/${college._id}`} key={college._id}>
                    <Card className="hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle className="text-xl">{college.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{college.description}</p>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Location:</span> {college.location}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Rating:</span> {college.ratings}/5
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Courses:</span>
                            <ul className="list-disc list-inside">
                              {college.courses.slice(0, 3).map((course, index) => (
                                <li key={index}>
                                  {course.name} ({course.duration}) - ₹{course.fees}/year
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollegeList;
