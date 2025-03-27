import React from 'react';
import { exampleQueries } from '@/lib/unitDatabase';

interface ExampleSectionProps {
  onSelectExample: (query: string) => void;
}

const ExampleSection: React.FC<ExampleSectionProps> = ({ onSelectExample }) => {
  const handleExampleClick = (query: string) => {
    onSelectExample(query);
  };
  
  return (
    <section className="max-w-4xl mx-auto mb-16" id="examples">
      <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-center">Try These Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exampleQueries.map((example, index) => (
          <button 
            key={index}
            className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => handleExampleClick(example.query)}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{example.icon}</span>
              <span className="font-display font-medium">{example.text}</span>
            </div>
            <p className="text-sm text-gray-500">{example.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExampleSection;
