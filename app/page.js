import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FeaturesGrid from '@/components/FeaturesGrid';
import Testimonials3 from '@/components/Testimonials3';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        <FeaturesAccordion />
        <FeaturesGrid/>
        <Testimonials3/>
        <Pricing />
        <FAQ />
   
      </main>
      <Footer />
    </>
  );
}