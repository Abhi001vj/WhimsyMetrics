import React, { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchInput from '@/components/SearchInput';
import ResultDisplay from '@/components/ResultDisplay';
import ExampleSection from '@/components/ExampleSection';
import FeaturesSection from '@/components/FeaturesSection';
import QuirkyUnitsSection from '@/components/QuirkyUnitsSection';
import AIFeatureSection from '@/components/AIFeatureSection';
import { useMeasurementConversion } from '@/hooks/useMeasurementConversion';
import { useToast } from '@/hooks/use-toast';

const Home: React.FC = () => {
  const { query, result, loading, error, processQuery } = useMeasurementConversion();
  const { toast } = useToast();
  const searchRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  
  // Show error as toast if any
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  // Scroll to result section when result is available
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);
  
  const handleSearch = (inputQuery: string) => {
    processQuery(inputQuery);
  };
  
  const handleExampleSelect = (exampleQuery: string) => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        processQuery(exampleQuery);
      }, 500);
    } else {
      processQuery(exampleQuery);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-10 flex-grow">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3">
            Convert <span className="text-primary">boring measurements</span> into <span className="text-secondary">quirky comparisons</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 mb-6">
            Ever wondered how many cats weigh as much as a car? Or how many bananas could stretch to the moon? Find out with WhimsyMeasure!
          </p>
          
          {/* Decorative illustrations */}
          <div className="hidden md:flex justify-center mb-6 relative h-16">
            <div className="absolute animate-float left-1/4 -translate-x-full">
              <span className="text-4xl">🐘</span>
            </div>
            <div className="absolute animate-float delay-150 left-1/3 -translate-x-1/2">
              <span className="text-4xl">🍌</span>
            </div>
            <div className="absolute animate-float delay-300 left-1/2 -translate-x-1/2">
              <span className="text-4xl">⚖️</span>
            </div>
            <div className="absolute animate-float delay-150 left-2/3 -translate-x-1/2">
              <span className="text-4xl">🚌</span>
            </div>
            <div className="absolute animate-float right-1/4 translate-x-full">
              <span className="text-4xl">🐈</span>
            </div>
          </div>
        </section>
        
        {/* Search Input Section */}
        <div ref={searchRef} id="search">
          <SearchInput onSearch={handleSearch} loading={loading} />
        </div>
        
        {/* Result Display Section */}
        <div ref={resultRef}>
          <ResultDisplay result={result} loading={loading} />
        </div>
        
        {/* Example Section */}
        <ExampleSection onSelectExample={handleExampleSelect} />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Quirky Units Database Section */}
        <QuirkyUnitsSection />
        
        {/* AI Feature Section */}
        <AIFeatureSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
