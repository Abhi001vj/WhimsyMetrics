import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QuirkyUnit } from '@shared/schema';
import { Card } from '@/components/ui/card';
import { measurementCategories } from '@/lib/unitDatabase';

const QuirkyUnitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('weight');
  
  const { data: allUnits = [], isLoading } = useQuery<QuirkyUnit[]>({
    queryKey: ['/api/quirky-units'],
  });
  
  const filteredUnits = allUnits.filter(unit => unit.category === activeTab);
  
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="font-display font-bold text-2xl md:text-3xl mb-2 text-center">Our Quirky Unit Database</h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">We have hundreds of fun comparison units across different measurement categories</p>
      
      <Card className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {measurementCategories.map(category => (
            <button 
              key={category.id}
              className={`min-w-[100px] py-4 px-6 font-medium text-center focus:outline-none ${
                activeTab === category.id 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredUnits.slice(0, 6).map(unit => (
                  <div key={unit.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <span className="text-2xl mr-3">{unit.icon}</span>
                    <div>
                      <div className="font-medium">{unit.name}</div>
                      <div className="text-sm text-gray-500">≈ {unit.value} {unit.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {Math.min(6, filteredUnits.length)} of {filteredUnits.length} units
                </div>
                <button className="text-primary font-medium text-sm hover:underline focus:outline-none">
                  View all {activeTab} units <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </Card>
    </section>
  );
};

export default QuirkyUnitsSection;
