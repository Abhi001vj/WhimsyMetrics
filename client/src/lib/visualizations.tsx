import React from 'react';
import { ConversionResult } from '@shared/schema';
import { getRandomNumber } from './utils';

// Main visualization component
export const VisualComparison: React.FC<{ result: ConversionResult }> = ({ result }) => {
  const { standardValue, standardUnit, quirkyUnit, quirkyAmount } = result;
  
  switch (quirkyUnit.category) {
    case 'weight':
      return <WeightVisualization result={result} />;
    case 'length':
      return <LengthVisualization result={result} />;
    case 'volume':
      return <VolumeVisualization result={result} />;
    case 'time':
      return <TimeVisualization result={result} />;
    case 'speed':
      return <SpeedVisualization result={result} />;
    default:
      return <GenericVisualization result={result} />;
  }
};

// Weight visualization
const WeightVisualization: React.FC<{ result: ConversionResult }> = ({ result }) => {
  const { standardValue, standardUnit, quirkyUnit, quirkyAmount } = result;
  
  // Calculate how many icons to show in the visualization
  const iconCount = Math.min(Math.round(quirkyAmount), 25);
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
      {/* Standard unit side */}
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 flex items-center justify-center">
          <WeightIcon value={standardValue} unit={standardUnit} />
        </div>
        <div className="text-center mt-4">
          <span className="font-display font-medium text-lg">Input Weight</span>
          <div className="text-sm text-gray-500">{standardValue.toLocaleString()} {standardUnit}</div>
        </div>
      </div>
      
      {/* Equals sign */}
      <div className="text-4xl font-bold text-gray-300">=</div>
      
      {/* Quirky units side */}
      <div className="flex flex-col items-center">
        <div className="w-56 h-40 relative">
          {/* Generate multiple icons in random positions */}
          {Array.from({ length: iconCount }).map((_, i) => (
            <div 
              key={i}
              className="absolute" 
              style={{ 
                top: `${getRandomNumber(0, 60)}%`, 
                left: `${getRandomNumber(0, 80)}%` 
              }}
            >
              <span className="text-3xl">{quirkyUnit.icon}</span>
            </div>
          ))}
          
          {/* Counter badge */}
          <div className="absolute bottom-0 right-0 bg-primary text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
            {Math.round(quirkyAmount)}
          </div>
        </div>
        <div className="text-center mt-4">
          <span className="font-display font-medium text-lg">{quirkyUnit.namePlural}</span>
          <div className="text-sm text-gray-500">{quirkyUnit.value} {quirkyUnit.unit} each</div>
        </div>
      </div>
    </div>
  );
};

// Length visualization
const LengthVisualization: React.FC<{ result: ConversionResult }> = ({ result }) => {
  const { standardValue, standardUnit, quirkyUnit, quirkyAmount } = result;
  
  // For length visualizations, we'll create a line with repeating icons
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg relative mb-8">
        {/* Line representing the length */}
        <div className="h-2 bg-primary/20 w-full rounded-full mb-4"></div>
        
        {/* Standard icon at start */}
        <div className="absolute -top-8 left-0 text-center">
          <div className="mb-1 text-3xl">📏</div>
          <div className="text-xs font-medium">{standardValue.toLocaleString()} {standardUnit}</div>
        </div>
        
        {/* Quirky unit icon at end */}
        <div className="absolute -top-8 right-0 text-center">
          <div className="mb-1 text-3xl">{quirkyUnit.icon}</div>
          <div className="text-xs font-medium">x {Math.round(quirkyAmount)}</div>
        </div>
        
        {/* Show repeating icons along the line */}
        {Array.from({ length: Math.min(10, Math.ceil(quirkyAmount)) }).map((_, i) => (
          <div 
            key={i}
            className="absolute bottom-3" 
            style={{ 
              left: `${(i / Math.min(10, Math.ceil(quirkyAmount))) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="text-2xl">{quirkyUnit.icon}</div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="text-lg font-display font-medium mb-1">
          {standardValue.toLocaleString()} {standardUnit} = {quirkyAmount.toFixed(1)} {quirkyAmount === 1 ? quirkyUnit.name : quirkyUnit.namePlural}
        </div>
        <div className="text-sm text-gray-500">
          Each {quirkyUnit.name} is {quirkyUnit.value} {quirkyUnit.unit}
        </div>
      </div>
    </div>
  );
};

// Volume visualization
const VolumeVisualization: React.FC<{ result: ConversionResult }> = ({ result }) => {
  const { standardValue, standardUnit, quirkyUnit, quirkyAmount } = result;
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
      {/* Standard volume container */}
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 flex items-center justify-center">
          <VolumeIcon value={standardValue} unit={standardUnit} />
        </div>
        <div className="text-center mt-4">
          <span className="font-display font-medium text-lg">Input Volume</span>
          <div className="text-sm text-gray-500">{standardValue.toLocaleString()} {standardUnit}</div>
        </div>
      </div>
      
      {/* Equals sign */}
      <div className="text-4xl font-bold text-gray-300">=</div>
      
      {/* Quirky units side */}
      <div className="flex flex-col items-center">
        <div className="w-48 h-40 flex flex-wrap justify-center items-center gap-2 relative">
          {/* Show a grid of containers */}
          {Array.from({ length: Math.min(9, Math.ceil(quirkyAmount)) }).map((_, i) => (
            <div key={i} className="text-3xl">{quirkyUnit.icon}</div>
          ))}
          
          {/* Counter badge */}
          {quirkyAmount > 9 && (
            <div className="absolute bottom-0 right-0 bg-primary text-white text-lg font-bold px-3 py-1 rounded-full">
              x{Math.round(quirkyAmount)}
            </div>
          )}
        </div>
        <div className="text-center mt-4">
          <span className="font-display font-medium text-lg">{quirkyUnit.namePlural}</span>
          <div className="text-sm text-gray-500">{quirkyUnit.value} {quirkyUnit.unit} each</div>
        </div>
      </div>
    </div>
  );
};

// Time visualization
const TimeVisualization: React.FC<{ result: ConversionResult }> = ({ result }) => {
  const { standardValue, standardUnit, quirkyUnit, quirkyAmount } = result;
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg relative mb-8">
        {/* Timeline */}
        <div className="h-2 bg-primary/20 w-full rounded-full mb-8"></div>
        
        {/* Standard time at start */}
        <div className="absolute -top-8 left-0 text-center">
          <div className="mb-1 text-3xl">⏱️</div>
          <div className="text-xs font-medium">0</div>
        </div>
        
        {/* Standard time at end */}
        <div className="absolute -top-8 right-0 text-center">
          <div className="mb-1 text-3xl">⏱️</div>
          <div className="text-xs font-medium">{standardValue} {standardUnit}</div>
        </div>
        
        {/* Quirky time markers */}
        {Array.from({ length: Math.min(5, Math.floor(quirkyAmount)) }).map((_, i) => (
          <div 
            key={i}
            className="absolute top-4" 
            style={{ 
              left: `${((i + 1) / Math.min(5, Math.ceil(quirkyAmount))) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="text-xl">{quirkyUnit.icon}</div>
            <div className="text-xs mt-1">{i + 1} {i === 0 ? quirkyUnit.name : quirkyUnit.namePlural}</div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="text-lg font-display font-medium mb-1">
          {standardValue.toLocaleString()} {standardUnit} = {quirkyAmount.toFixed(1)} {quirkyAmount === 1 ? quirkyUnit.name : quirkyUnit.namePlural}
        </div>
        <div className="text-sm text-gray-500">
          Each {quirkyUnit.name} is {quirkyUnit.value} {quirkyUnit.unit}
        </div>
      </div>
    </div>
  );
};

// Speed visualization
const SpeedVisualization: React.FC<{ result: ConversionResult }> = ({ result }) => {
  const { standardValue, standardUnit, quirkyUnit, quirkyAmount } = result;
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg flex justify-between items-end mb-8">
        {/* Speed comparison bars */}
        <div className="flex flex-col items-center">
          <div className="h-40 w-24 relative">
            <div 
              className="absolute bottom-0 w-full bg-primary/20 rounded-t-lg"
              style={{ height: '100%' }}
            >
              <div className="absolute bottom-2 w-full text-center text-sm font-medium">
                {standardValue} {standardUnit}
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-3xl">🏎️</div>
            <div className="text-sm font-medium mt-1">Input Speed</div>
          </div>
        </div>
        
        <div className="text-4xl font-bold text-gray-300">=</div>
        
        <div className="flex flex-col items-center">
          <div className="h-40 w-24 relative">
            <div 
              className="absolute bottom-0 w-full bg-secondary/20 rounded-t-lg"
              style={{ height: `${(quirkyUnit.value / standardValue) * 100}%` }}
            >
              <div className="absolute bottom-2 w-full text-center text-sm font-medium">
                {quirkyUnit.value} {quirkyUnit.unit}
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-3xl">{quirkyUnit.icon}</div>
            <div className="text-sm font-medium mt-1">1 {quirkyUnit.name}</div>
          </div>
        </div>
        
        <div className="text-4xl font-bold text-gray-300">x</div>
        
        <div className="flex flex-col items-center">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-secondary">{quirkyAmount.toFixed(1)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">Multiplier</div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-lg font-display font-medium mb-1">
          {standardValue.toLocaleString()} {standardUnit} is {quirkyAmount.toFixed(1)} times faster than a {quirkyUnit.name}
        </div>
      </div>
    </div>
  );
};

// Generic visualization fallback
const GenericVisualization: React.FC<{ result: ConversionResult }> = ({ result }) => {
  const { standardValue, standardUnit, quirkyUnit, quirkyAmount } = result;
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 flex items-center justify-center">
          <div className="text-6xl">🔢</div>
        </div>
        <div className="text-center mt-4">
          <span className="font-display font-medium text-lg">Input Value</span>
          <div className="text-sm text-gray-500">{standardValue.toLocaleString()} {standardUnit}</div>
        </div>
      </div>
      
      <div className="text-4xl font-bold text-gray-300">=</div>
      
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 flex items-center justify-center">
          <div className="text-6xl">{quirkyUnit.icon}</div>
        </div>
        <div className="text-center mt-4">
          <span className="font-display font-medium text-lg">{quirkyUnit.namePlural}</span>
          <div className="text-sm text-gray-500">
            {quirkyAmount.toLocaleString(undefined, { maximumFractionDigits: 1 })} {quirkyAmount === 1 ? quirkyUnit.name : quirkyUnit.namePlural}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components for different visualization types
const WeightIcon: React.FC<{ value: number, unit: string }> = ({ value, unit }) => {
  if (value > 1000) {
    return <span className="text-6xl">🏋️‍♂️</span>;
  }
  if (value > 100) {
    return <span className="text-6xl">📦</span>;
  }
  if (value > 10) {
    return <span className="text-6xl">🧳</span>;
  }
  return <span className="text-6xl">⚖️</span>;
};

const VolumeIcon: React.FC<{ value: number, unit: string }> = ({ value, unit }) => {
  if (value > 10000) {
    return <span className="text-6xl">🏊‍♂️</span>;
  }
  if (value > 100) {
    return <span className="text-6xl">🛢️</span>;
  }
  if (value > 1) {
    return <span className="text-6xl">🚰</span>;
  }
  return <span className="text-6xl">🥛</span>;
};
