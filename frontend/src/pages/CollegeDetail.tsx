import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  MapPin,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  Bookmark,
  Phone,
  Mail,
  Building,
  Award,
  DollarSign,
  Users,
  BookOpen,
  Home,
  LibraryBig,
  Wifi,
  Utensils,
  Shield,
  Bus,
  Star,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const sampleCollege = {
  id: 1,
  name: "Indian Institute of Technology Bombay",
  description: "Founded in 1958, IIT Bombay is recognized worldwide as a leader in the field of engineering education and research. Reputed for the outstanding caliber of students graduating from its undergraduate and postgraduate programs, the institute attracts the best students from the country for its bachelor's, master's, and doctoral programs.",
  location: "Mumbai, Maharashtra",
  type: "Engineering",
  ranking: 1,
  fees: 200000,
  acceptanceRate: "7%",
  website: "https://www.iitb.ac.in",
  estYear: 1958,
  facultyCount: 650,
  studentCount: 10000,
  campusSize: "550 acres",
  facilities: [
    "Hostels", "Library", "Sports Complex", "Laboratories", 
    "Auditorium", "Cafeteria", "Wi-Fi Campus", "Medical Center",
    "Bank", "Post Office", "Swimming Pool", "Gymnasium"
  ],
  courses: [
    {
      name: "B.Tech. in Computer Science and Engineering",
      duration: "4 years",
      fees: 220000,
      seats: 120,
      eligibility: "JEE Advanced",
      cutoff: "Top 1000 rank"
    },
    {
      name: "B.Tech. in Electrical Engineering",
      duration: "4 years",
      fees: 200000,
      seats: 100,
      eligibility: "JEE Advanced",
      cutoff: "Top 2000 rank"
    },
    {
      name: "B.Tech. in Mechanical Engineering",
      duration: "4 years",
      fees: 200000,
      seats: 100,
      eligibility: "JEE Advanced",
      cutoff: "Top 2500 rank"
    },
    {
      name: "M.Tech. in Computer Science and Engineering",
      duration: "2 years",
      fees: 250000,
      seats: 80,
      eligibility: "GATE",
      cutoff: "GATE score > 800"
    },
    {
      name: "M.Tech. in Electrical Engineering",
      duration: "2 years",
      fees: 250000,
      seats: 80,
      eligibility: "GATE",
      cutoff: "GATE score > 750"
    }
  ],
  admissionProcess: [
    {
      step: 1,
      title: "Entrance Examination",
      description: "Clear JEE Advanced for B.Tech. programs or GATE for M.Tech. programs."
    },
    {
      step: 2,
      title: "Counseling & Seat Allocation",
      description: "Participate in the JoSAA counseling for seat allocation based on your rank."
    },
    {
      step: 3,
      title: "Document Verification",
      description: "Submit required documents for verification at the reporting center."
    },
    {
      step: 4,
      title: "Fee Payment",
      description: "Pay the required fees to confirm your admission."
    },
    {
      step: 5,
      title: "Registration & Orientation",
      description: "Complete the registration process and attend the orientation program."
    }
  ],
  scholarships: [
    {
      name: "Merit-cum-Means Scholarship",
      amount: "Full tuition fee waiver + stipend",
      eligibility: "Family income < 5 lakhs per annum with good academic performance"
    },
    {
      name: "Institute Free Studentship",
      amount: "Full or partial tuition fee waiver",
      eligibility: "Based on family income and academic performance"
    },
    {
      name: "SC/ST Scholarship",
      amount: "Full tuition fee waiver + stipend",
      eligibility: "Students belonging to SC/ST category"
    }
  ],
  placements: {
    averagePackage: "₹20.00 LPA",
    highestPackage: "₹1.50 CPA",
    topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Apple"],
    placementRate: 95
  },
  images: [
    "https://images.unsplash.com/photo-1562774053-701939374585",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1",
    "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3"
  ],
  reviews: [
    {
      student: "Rahul Sharma",
      course: "B.Tech. Computer Science",
      rating: 5,
      review: "IIT Bombay provided me with exceptional educational opportunities and world-class facilities. The faculty is outstanding and the campus life is vibrant."
    },
    {
      student: "Priya Patel",
      course: "M.Tech. Electrical Engineering",
      rating: 4,
      review: "Great research opportunities and excellent labs. The coursework is challenging but very rewarding. Career support could be better."
    },
    {
      student: "Amit Kumar",
      course: "B.Tech. Mechanical Engineering",
      rating: 5,
      review: "The best decision of my life was to join IIT Bombay. The exposure, networking, and learning experience are unmatched."
    }
  ],
  contact: {
    email: "admissions@iitb.ac.in",
    phone: "+91 22 2572 2545",
    address: "IIT Bombay, Powai, Mumbai - 400076, Maharashtra, India"
  }
};

const CollegeDetail = () => {
  const { collegeId } = useParams();
  const { toast } = useToast();
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  const formatFees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handleSaveCollege = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved colleges" : "College saved successfully",
      description: isSaved ? "This college has been removed from your saved list" : "You can view your saved colleges in your profile",
    });
  };
  
  const handleApplyNow = () => {
    toast({
      title: "Application Process Started",
      description: "You'll now be directed to complete your student profile",
    });
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-64 md:h-96">
              <img 
                src={sampleCollege.images[activeImage]} 
                alt={sampleCollege.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <Badge className="bg-campus-700 mr-2">Rank #{sampleCollege.ranking}</Badge>
                  <Badge variant="outline" className="border-white text-white">
                    {sampleCollege.type}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{sampleCollege.name}</h1>
                <div className="flex items-center text-gray-200 mb-4">
                  <MapPin className="mr-1 h-4 w-4" />
                  {sampleCollege.location}
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    Est. {sampleCollege.estYear}
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <Users className="mr-1 h-4 w-4" />
                    {sampleCollege.studentCount}+ Students
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    {sampleCollege.acceptanceRate} Acceptance Rate
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white text-white hover:bg-white/20"
                  onClick={handleSaveCollege}
                >
                  <Bookmark className={`mr-1 h-4 w-4 ${isSaved ? 'fill-white' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <a 
                  href={sampleCollege.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white text-white hover:bg-white/20"
                  >
                    <Globe className="mr-1 h-4 w-4" />
                    Website
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="flex p-2 bg-gray-100">
              {sampleCollege.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-20 h-16 mx-1 rounded-md overflow-hidden cursor-pointer border-2 ${
                    activeImage === index ? 'border-campus-700' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${sampleCollege.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="admissions">Admissions</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="placements">Placements</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-campus-700 mb-4">About {sampleCollege.name}</h2>
                      <p className="text-gray-700 mb-6">
                        {sampleCollege.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-3">Key Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <Building className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">Type</span>
                                <p>{sampleCollege.type} Institute</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Award className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">National Ranking</span>
                                <p>#{sampleCollege.ranking}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Calendar className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">Established</span>
                                <p>{sampleCollege.estYear}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <DollarSign className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">Average Annual Fees</span>
                                <p>{formatFees(sampleCollege.fees)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-3">Campus Statistics</h3>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <Users className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">Student Population</span>
                                <p>{sampleCollege.studentCount}+ Students</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <GraduationCap className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">Faculty Members</span>
                                <p>{sampleCollege.facultyCount}+ Professors</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Home className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">Campus Size</span>
                                <p>{sampleCollege.campusSize}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                              <div>
                                <span className="text-gray-600 text-sm">Acceptance Rate</span>
                                <p>{sampleCollege.acceptanceRate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-3">Top Courses</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {sampleCollege.courses.slice(0, 3).map((course, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-3">
                              <div className="font-medium mb-1">{course.name}</div>
                              <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Clock className="mr-1 h-4 w-4" />
                                {course.duration}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <DollarSign className="mr-1 h-4 w-4" />
                                {formatFees(course.fees)} / year
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Available Scholarships</h3>
                        <div className="space-y-3">
                          {sampleCollege.scholarships.map((scholarship, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="font-medium mb-1">{scholarship.name}</div>
                              <div className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Amount:</span> {scholarship.amount}
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Eligibility:</span> {scholarship.eligibility}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-campus-700 mb-6">Courses & Programs</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Undergraduate Programs</h3>
                          <div className="space-y-4">
                            {sampleCollege.courses.slice(0, 3).map((course, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 p-4">
                                  <h4 className="font-medium">{course.name}</h4>
                                </div>
                                <div className="p-4">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <span className="text-gray-600 text-sm">Duration</span>
                                      <p className="flex items-center">
                                        <Clock className="mr-1 h-4 w-4 text-teal-600" />
                                        {course.duration}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-gray-600 text-sm">Annual Fees</span>
                                      <p className="flex items-center">
                                        <DollarSign className="mr-1 h-4 w-4 text-teal-600" />
                                        {formatFees(course.fees)}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-gray-600 text-sm">Total Seats</span>
                                      <p className="flex items-center">
                                        <Users className="mr-1 h-4 w-4 text-teal-600" />
                                        {course.seats}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="border-t mt-4 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <span className="text-gray-600 text-sm">Eligibility</span>
                                        <p className="flex items-center">
                                          <CheckCircle className="mr-1 h-4 w-4 text-teal-600" />
                                          {course.eligibility}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600 text-sm">Previous Cutoff</span>
                                        <p className="flex items-center">
                                          <Award className="mr-1 h-4 w-4 text-teal-600" />
                                          {course.cutoff}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Postgraduate Programs</h3>
                          <div className="space-y-4">
                            {sampleCollege.courses.slice(3).map((course, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 p-4">
                                  <h4 className="font-medium">{course.name}</h4>
                                </div>
                                <div className="p-4">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <span className="text-gray-600 text-sm">Duration</span>
                                      <p className="flex items-center">
                                        <Clock className="mr-1 h-4 w-4 text-teal-600" />
                                        {course.duration}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-gray-600 text-sm">Annual Fees</span>
                                      <p className="flex items-center">
                                        <DollarSign className="mr-1 h-4 w-4 text-teal-600" />
                                        {formatFees(course.fees)}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-gray-600 text-sm">Total Seats</span>
                                      <p className="flex items-center">
                                        <Users className="mr-1 h-4 w-4 text-teal-600" />
                                        {course.seats}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="border-t mt-4 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <span className="text-gray-600 text-sm">Eligibility</span>
                                        <p className="flex items-center">
                                          <CheckCircle className="mr-1 h-4 w-4 text-teal-600" />
                                          {course.eligibility}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600 text-sm">Previous Cutoff</span>
                                        <p className="flex items-center">
                                          <Award className="mr-1 h-4 w-4 text-teal-600" />
                                          {course.cutoff}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="admissions" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-campus-700 mb-6">Admission Process</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                        {sampleCollege.admissionProcess.map((step, index) => (
                          <div key={index} className="md:col-span-4 flex">
                            <div className={`flex flex-col items-center ${
                              index !== sampleCollege.admissionProcess.length - 1
                                ? 'md:border-b-0 md:border-r border-dashed border-gray-300'
                                : ''
                            }`}>
                              <div className="w-10 h-10 rounded-full bg-campus-700 flex items-center justify-center text-white font-bold mb-2">
                                {step.step}
                              </div>
                              <div className="text-center px-4 pb-6">
                                <h4 className="font-medium mb-1">{step.title}</h4>
                                <p className="text-sm text-gray-600">{step.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Eligibility Criteria</h3>
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 className="font-medium mb-2">For B.Tech. Programs:</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                              <li>Candidate must have passed 10+2 examination with Physics, Chemistry, and Mathematics</li>
                              <li>Minimum 75% aggregate marks in PCM subjects</li>
                              <li>Valid JEE Advanced rank</li>
                              <li>Admission through JoSAA counseling process</li>
                            </ul>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium mb-2">For M.Tech. Programs:</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                              <li>B.Tech./B.E. in relevant discipline with minimum 60% marks or 6.5 CGPA</li>
                              <li>Valid GATE score</li>
                              <li>Some departments may conduct written test/interview</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Important Dates</h3>
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 p-3 text-left">Event</th>
                                <th className="border border-gray-200 p-3 text-left">Tentative Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-200 p-3">JEE Advanced Exam</td>
                                <td className="border border-gray-200 p-3">May 2023</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-200 p-3">JEE Advanced Results</td>
                                <td className="border border-gray-200 p-3">June 2023</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-200 p-3">JoSAA Registration</td>
                                <td className="border border-gray-200 p-3">June 2023</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-200 p-3">JoSAA Seat Allocation</td>
                                <td className="border border-gray-200 p-3">June-July 2023</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-200 p-3">Admission Process</td>
                                <td className="border border-gray-200 p-3">July 2023</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-200 p-3">Academic Session Begins</td>
                                <td className="border border-gray-200 p-3">August 2023</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Documents Required</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>JEE Advanced Admit Card & Score Card</li>
                            <li>Class X and XII Mark Sheets and Certificates</li>
                            <li>Category Certificate (if applicable)</li>
                            <li>Transfer Certificate and Migration Certificate</li>
                            <li>Character Certificate</li>
                            <li>Medical Fitness Certificate</li>
                            <li>Passport size photographs</li>
                            <li>Aadhaar Card</li>
                            <li>Fee payment receipt</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="facilities" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-campus-700 mb-6">Campus Facilities</h2>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <Home className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Hostels</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <LibraryBig className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Library</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <Wifi className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Wi-Fi Campus</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <Utensils className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Cafeteria</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <BookOpen className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Laboratories</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <Shield className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Medical Center</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <Bus className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Transportation</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                          <Award className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium">Sports Complex</h4>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Accommodation</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 mb-3">
                              IIT Bombay has 16 hostels that provide accommodation for students. Each hostel is equipped with modern amenities and provides a conducive environment for students to live and study.
                            </p>
                            <h4 className="font-medium mb-2">Hostel Facilities:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              <li>Furnished rooms (single/double occupancy)</li>
                              <li>Common rooms with TV and recreational facilities</li>
                              <li>Reading rooms</li>
                              <li>Dining halls</li>
                              <li>High-speed Internet</li>
                              <li>Laundry services</li>
                              <li>Gym facilities in select hostels</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Library</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 mb-3">
                              The Central Library of IIT Bombay is one of the best academic libraries in India with a vast collection of books, journals, and electronic resources.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              <li>Collection of over 3 lakh books and 1.5 lakh bound volumes of journals</li>
                              <li>Subscription to 20,000+ electronic journals</li>
                              <li>Digital library with access to numerous databases</li>
                              <li>Reading halls with 24-hour access</li>
                              <li>Specialized book banks for reserved categories</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Sports & Recreation</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 mb-3">
                              IIT Bombay has extensive sports facilities and encourages students to participate in sports and recreational activities.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              <li>Olympic-size swimming pool</li>
                              <li>Cricket ground, football field, and athletic track</li>
                              <li>Indoor sports complex for badminton, table tennis, basketball, etc.</li>
                              <li>Tennis and squash courts</li>
                              <li>Fully equipped gymnasium</li>
                              <li>Various cultural clubs and technical societies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="placements" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-campus-700 mb-6">Placements & Career Outcomes</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <h4 className="text-gray-600 mb-1">Average Package</h4>
                          <p className="text-2xl font-bold text-campus-700">{sampleCollege.placements.averagePackage}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <h4 className="text-gray-600 mb-1">Highest Package</h4>
                          <p className="text-2xl font-bold text-campus-700">{sampleCollege.placements.highestPackage}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <h4 className="text-gray-600 mb-1">Placement Rate</h4>
                          <p className="text-2xl font-bold text-campus-700">{sampleCollege.placements.placementRate}%</p>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3">Placement Statistics</h3>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span>Computer Science</span>
                            <span>98%</span>
                          </div>
                          <Progress value={98} className="h-2" />
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span>Electrical Engineering</span>
                            <span>95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span>Mechanical Engineering</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span>Civil Engineering</span>
                            <span>88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Chemical Engineering</span>
                            <span>90%</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3">Top Recruiters</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {sampleCollege.placements.topRecruiters.map((company, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                              {company}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Placement Process</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <ol className="list-decimal list-inside space-y-3 text-gray-700">
                            <li>
                              <span className="font-medium">Registration:</span> Students register with the placement cell by filling out a form with their academic history and preferences.
                            </li>
                            <li>
                              <span className="font-medium">Pre-Placement Talks:</span> Companies visit the campus to give presentations about their work culture, job profiles, and expectations.
                            </li>
                            <li>
                              <span className="font-medium">Placement Tests:</span> Companies conduct written tests, coding rounds, or online assessments to shortlist candidates.
                            </li>
                            <li>
                              <span className="font-medium">Interviews:</span> Shortlisted candidates appear for multiple rounds of interviews, including technical and HR interviews.
                            </li>
                            <li>
                              <span className="font-medium">Job Offers:</span> Companies extend offers to selected candidates, including details of job profile, location, compensation, and other benefits.
                            </li>
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-campus-700 mb-6">Student Reviews</h2>
                      
                      <div className="space-y-6">
                        {sampleCollege.reviews.map((review, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="font-semibold">{review.student}</h3>
                                <p className="text-sm text-gray-600">{review.course}</p>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${
                                      star <= review.rating 
                                        ? 'text-yellow-500 fill-yellow-500' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{review.review}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Button variant="outline" className="w-full">
                          Load More Reviews
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="col-span-1 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <Button className="w-full mb-3 bg-campus-700 hover:bg-campus-800" onClick={handleApplyNow}>
                    Apply Now
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleSaveCollege}>
                    <Bookmark className={`mr-1 h-4 w-4 ${isSaved ? 'fill-campus-700' : ''}`} />
                    {isSaved ? 'Saved' : 'Save College'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-campus-700 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a href={`mailto:${sampleCollege.contact.email}`} className="text-campus-700 hover:underline">
                          {sampleCollege.contact.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-campus-700 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p>{sampleCollege.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-campus-700 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p>{sampleCollege.contact.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Key Deadlines</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-campus-700 mr-2" />
                        <span>Application Deadline</span>
                      </div>
                      <Badge>June 15, 2023</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-campus-700 mr-2" />
                        <span>Admission Starts</span>
                      </div>
                      <Badge>July 1, 2023</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-campus-700 mr-2" />
                        <span>Academic Year Begins</span>
                      </div>
                      <Badge>August 1, 2023</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Similar Colleges</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                        <img src="https://images.unsplash.com/photo-1562774053-701939374585" alt="IIT Delhi" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link to="/college/2" className="font-medium text-campus-700 hover:underline">IIT Delhi</Link>
                        <p className="text-xs text-gray-600">Delhi, India</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                        <img src="https://images.unsplash.com/photo-1562774053-701939374585" alt="IIT Madras" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link to="/college/3" className="font-medium text-campus-700 hover:underline">IIT Madras</Link>
                        <p className="text-xs text-gray-600">Chennai, India</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                        <img src="https://images.unsplash.com/photo-1562774053-701939374585" alt="IIT Kanpur" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link to="/college/4" className="font-medium text-campus-700 hover:underline">IIT Kanpur</Link>
                        <p className="text-xs text-gray-600">Kanpur, India</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollegeDetail;
