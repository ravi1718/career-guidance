
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import StudentSignupForm from '@/components/auth/StudentSignupForm';
import CollegeSignupForm from '@/components/auth/CollegeSignupForm';

const Signup = () => {
  const [activeTab, setActiveTab] = useState('student');
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="student">Student Sign Up</TabsTrigger>
                <TabsTrigger value="college">College Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="flex justify-center">
                <StudentSignupForm />
              </TabsContent>
              
              <TabsContent value="college" className="flex justify-center">
                <CollegeSignupForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
