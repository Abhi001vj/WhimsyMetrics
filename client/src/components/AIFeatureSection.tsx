import React from 'react';

const AIFeatureSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-primary/90 to-primary rounded-3xl text-white p-8 md:p-12 mb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">Powered by On-Device AI</h2>
            <p className="mb-6 opacity-90">WhimsyMeasure uses on-device machine learning with Transformer.js to generate quirky comparisons without sending your data to the cloud.</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-check-line text-accent text-xl mr-3 mt-0.5"></i>
                <span>Complete privacy - all processing happens on your device</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-accent text-xl mr-3 mt-0.5"></i>
                <span>Works offline after initial load</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-accent text-xl mr-3 mt-0.5"></i>
                <span>Dynamic generation of new quirky units</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-robot-line text-xl text-accent"></i>
                </div>
                <div className="font-display font-bold">AI-Generated Comparisons</div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-sm opacity-70 mb-1">Query:</div>
                  <div className="font-medium">How heavy is an oak tree?</div>
                </div>
                <div className="bg-accent/20 rounded-lg p-3">
                  <div className="text-sm opacity-70 mb-1">AI Response:</div>
                  <div className="font-medium">An average mature oak tree weighs about 10 tonnes, which is equivalent to approximately 2,222 office chairs or the weight of 5 hippopotamuses!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatureSection;
