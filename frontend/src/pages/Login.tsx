
import React from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
