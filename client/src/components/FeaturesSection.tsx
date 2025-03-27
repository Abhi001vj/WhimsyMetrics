import React from 'react';
import { Button } from '@/components/ui/button';

const FeaturesSection: React.FC = () => {
  return (
    <section className="pt-12 pb-16 bg-primary/5 rounded-3xl mb-12" id="about">
      <div className="container mx-auto px-4">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">How WhimsyMeasure Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <i className="ri-chat-3-line text-2xl text-primary"></i>
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Natural Language Input</h3>
            <p className="text-gray-600">Type your question in plain English. Our app understands what you're asking and identifies the measurement type.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <i className="ri-scales-3-line text-2xl text-primary"></i>
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Smart Conversion</h3>
            <p className="text-gray-600">We convert your measurement into the most amusing and relatable quirky units from our extensive database.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <i className="ri-gallery-line text-2xl text-primary"></i>
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Visual Representation</h3>
            <p className="text-gray-600">See your comparison come to life with beautiful, interactive visualizations that help you understand the scale.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            className="bg-primary text-white font-display font-semibold text-lg px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors focus:outline-none focus:ring focus:ring-primary/50 shadow-sm flex items-center"
            onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try it now <i className="ri-arrow-right-line ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
