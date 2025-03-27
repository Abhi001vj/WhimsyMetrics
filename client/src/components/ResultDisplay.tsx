import React from 'react';
import { ConversionResult } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { VisualComparison } from '@/lib/visualizations';

interface ResultDisplayProps {
  result: ConversionResult | null;
  loading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, loading }) => {
  if (!result && !loading) {
    return null;
  }
  
  return (
    <section className="max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-primary/10 p-4 flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-primary">Your Whimsy Result</h3>
          <div className="flex space-x-3">
            <Button variant="ghost" size="icon" aria-label="Share result" className="p-2 rounded-full hover:bg-white/30 transition-colors">
              <i className="ri-share-line"></i>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Save result" className="p-2 rounded-full hover:bg-white/30 transition-colors">
              <i className="ri-bookmark-line"></i>
            </Button>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-gray-600">Converting your measurement...</p>
            </div>
          ) : result ? (
            <>
              {/* Original query */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-500 mb-1">Your Query:</div>
                <div className="text-lg font-medium">{result.originalQuery}</div>
              </div>
              
              {/* Standard measurement */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-500 mb-1">Standard Measurement:</div>
                <div className="text-2xl font-bold">{result.standardDisplay}</div>
              </div>
              
              {/* Quirky measurement */}
              <div className="mb-8">
                <div className="text-sm font-medium text-gray-500 mb-1">Whimsical Equivalent:</div>
                <div className="text-3xl font-display font-bold text-primary">
                  That's about {result.quirkyAmountDisplay}! {result.quirkyUnit.icon}
                </div>
              </div>
              
              {/* Visualization */}
              <div className="bg-neutral-light rounded-xl p-6 md:p-8 relative overflow-hidden">
                <h4 className="font-display font-bold text-xl mb-6">Visual Comparison</h4>
                
                <VisualComparison result={result} />
                
                <div className="text-center mt-8 text-gray-500 text-sm">
                  <p>Note: Visualizations are approximate. {result.quirkyAmount > 10 ? `In reality, you'd need all ${Math.round(result.quirkyAmount)} ${result.quirkyUnit.namePlural}, but we've shown a representative sample.` : ''}</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      
      {/* Fun Fact Bonus */}
      {result && result.funFact && (
        <div className="bg-secondary/10 rounded-xl p-6 mt-6 border border-secondary/20">
          <div className="flex items-start">
            <i className="ri-lightbulb-line text-2xl text-secondary mr-4 mt-1"></i>
            <div>
              <h4 className="font-display font-semibold text-lg text-secondary mb-2">Fun Fact</h4>
              <p className="text-gray-700">{result.funFact}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultDisplay;
