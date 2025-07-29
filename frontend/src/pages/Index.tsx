
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CollegeCategories from '@/components/home/CollegeCategories';
import TestimonialSection from '@/components/home/TestimonialSection';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <CollegeCategories />
      <TestimonialSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
