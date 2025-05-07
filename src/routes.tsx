import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import CareerSelection from '@/pages/CareerSelection';
import LocationSelection from '@/pages/LocationSelection';
import CollegeList from '@/pages/CollegeList';
import CollegeDetail from '@/pages/CollegeDetail';
import AptitudeTest from '@/pages/AptitudeTest';
import CollegeDashboard from '@/pages/CollegeDashboard';
import NotFound from '@/pages/NotFound';
import Scholarships from '@/pages/Scholarships';
import ExamPreparation from '@/pages/ExamPreparation';
import CareerOptions from '@/pages/CareerOptions';
import { useAuth } from '@/contexts/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/colleges" element={<CollegeList />} />
      <Route path="/colleges/:country" element={<CollegeList />} />
      <Route path="/colleges/:country/:state" element={<CollegeList />} />
      <Route path="/college/:collegeId" element={<CollegeDetail />} />
      
      {/* Resource Routes */}
      <Route path="/resources/scholarships" element={<Scholarships />} />
      <Route path="/resources/exam-preparation" element={<ExamPreparation />} />
      <Route path="/resources/career-options" element={<CareerOptions />} />
      
      {/* Protected Student Routes */}
      <Route 
        path="/career-selection" 
        element={
          isAuthenticated && user?.userType === 'student' ? 
          <CareerSelection /> : 
          <Login />
        } 
      />
      <Route 
        path="/location-selection" 
        element={
          isAuthenticated && user?.userType === 'student' ? 
          <LocationSelection /> : 
          <Login />
        } 
      />
      <Route 
        path="/aptitude-test" 
        element={
          isAuthenticated && user?.userType === 'student' ? 
          <AptitudeTest /> : 
          <Login />
        } 
      />

      {/* Protected College Routes */}
      <Route 
        path="/college/dashboard" 
        element={
          isAuthenticated && user?.userType === 'college' ? 
          <CollegeDashboard /> : 
          <Login />
        } 
      />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 