import { QuirkyUnit } from "@shared/schema";
import { getUnitDisplayName, standardizeUnit } from "./utils";

// Interface for each measurement category
export interface MeasurementCategory {
  id: string;
  name: string;
  baseUnit: string;
  icon: string;
  description: string;
}

// Define the main measurement categories
export const measurementCategories: MeasurementCategory[] = [
  {
    id: 'weight',
    name: 'Weight',
    baseUnit: 'kg',
    icon: '⚖️',
    description: 'How heavy something is'
  },
  {
    id: 'length',
    name: 'Length',
    baseUnit: 'm',
    icon: '📏',
    description: 'How long something is'
  },
  {
    id: 'volume',
    name: 'Volume',
    baseUnit: 'l',
    icon: '🧊',
    description: 'How much space something takes up'
  },
  {
    id: 'time',
    name: 'Time',
    baseUnit: 's',
    icon: '⏱️',
    description: 'Duration or period'
  },
  {
    id: 'speed',
    name: 'Speed',
    baseUnit: 'kph',
    icon: '🏎️',
    description: 'How fast something moves'
  },
  {
    id: 'area',
    name: 'Area',
    baseUnit: 'm²',
    icon: '📐',
    description: 'How much surface something covers'
  }
];

// Function to find an appropriate quirky unit based on the value and measurement type
export function findAppropriateQuirkyUnits(
  value: number, 
  baseUnit: string, 
  quirkyUnits: QuirkyUnit[],
  targetUnit?: string
): QuirkyUnit[] {
  // Filter units by category matching the base unit
  const matchingCategory = getUnitCategoryFromBaseUnit(baseUnit);
  const filteredUnits = quirkyUnits.filter(unit => unit.category === matchingCategory);
  
  if (filteredUnits.length === 0) {
    return [];
  }
  
  // If a specific target unit was requested, try to find it
  if (targetUnit) {
    const targetUnits = filteredUnits.filter(unit => 
      unit.name.toLowerCase().includes(targetUnit.toLowerCase()) || 
      unit.namePlural.toLowerCase().includes(targetUnit.toLowerCase())
    );
    
    if (targetUnits.length > 0) {
      return targetUnits;
    }
  }
  
  // Sort by how appropriate they are for the value
  // (We want units that will result in a number between 0.1 and 1000)
  const scoredUnits = filteredUnits.map(unit => {
    const quirkyValue = value / unit.value;
    
    // Penalty for very small or very large resulting numbers
    let score = 0;
    if (quirkyValue < 0.1) score = 1000000 / quirkyValue; // Huge penalty for tiny fractions
    else if (quirkyValue < 1) score = 100 / quirkyValue;  // Smaller penalty for fractions < 1
    else if (quirkyValue > 1000) score = quirkyValue / 10; // Penalty for very large numbers
    else score = 1; // Ideal range
    
    return { unit, score };
  });
  
  // Sort by score (lower is better) and return the units
  return scoredUnits.sort((a, b) => a.score - b.score).map(item => item.unit);
}

// Function to determine the category from a base unit
export function getUnitCategoryFromBaseUnit(baseUnit: string): string {
  switch (baseUnit) {
    case 'kg': return 'weight';
    case 'm': return 'length';
    case 'l': return 'volume';
    case 's': return 'time';
    case 'kph': return 'speed';
    case 'm²': return 'area';
    default: return 'unknown';
  }
}

// Example conversion function
export function convertToQuirkyUnit(
  value: number, 
  unit: string, 
  quirkyUnit: QuirkyUnit
): number {
  // First standardize the input to the base unit
  const { value: standardValue, baseUnit } = standardizeUnit(value, unit);
  
  // Check if the quirky unit's category matches our base unit's category
  const valueCategory = getUnitCategoryFromBaseUnit(baseUnit);
  if (valueCategory !== quirkyUnit.category) {
    throw new Error(`Cannot convert ${baseUnit} to ${quirkyUnit.category} category`);
  }
  
  // Perform the conversion
  return standardValue / quirkyUnit.value;
}

// Generate a fun fact related to the conversion
export function generateFunFact(
  originalValue: number,
  originalUnit: string,
  quirkyAmount: number,
  quirkyUnit: QuirkyUnit
): string {
  // Use the quirky unit's predefined fun fact if available
  if (quirkyUnit.funFact) {
    return quirkyUnit.funFact;
  }
  
  // Generate a generic fun fact based on the type of measurement
  switch (quirkyUnit.category) {
    case 'weight':
      return `If you stacked ${Math.round(quirkyAmount)} ${quirkyUnit.namePlural} on top of each other, they would weigh as much as ${formatValueWithUnit(originalValue, originalUnit)}!`;
    
    case 'length':
      if (quirkyAmount > 10) {
        return `If you laid ${Math.round(quirkyAmount)} ${quirkyUnit.namePlural} end to end, they would stretch for ${formatValueWithUnit(originalValue, originalUnit)}!`;
      } else {
        return `${formatValueWithUnit(originalValue, originalUnit)} is about the same as ${quirkyAmount.toFixed(1)} ${quirkyAmount === 1 ? quirkyUnit.name : quirkyUnit.namePlural} stacked on top of each other!`;
      }
    
    case 'volume':
      return `You would need ${Math.round(quirkyAmount)} ${quirkyUnit.namePlural} to hold ${formatValueWithUnit(originalValue, originalUnit)} of liquid!`;
    
    case 'time':
      if (quirkyUnit.name === 'Blink of an Eye') {
        return `You could blink approximately ${Math.round(quirkyAmount)} times in ${formatValueWithUnit(originalValue, originalUnit)}!`;
      } else {
        return `${formatValueWithUnit(originalValue, originalUnit)} is equivalent to ${quirkyAmount.toFixed(2)} ${quirkyAmount === 1 ? quirkyUnit.name : quirkyUnit.namePlural}!`;
      }
    
    case 'speed':
      return `At ${quirkyAmount.toFixed(1)} times the speed of a ${quirkyUnit.name}, you could travel ${formatValueWithUnit(originalValue, originalUnit)}!`;
    
    default:
      return `That's approximately ${quirkyAmount.toFixed(1)} ${quirkyAmount === 1 ? quirkyUnit.name : quirkyUnit.namePlural}!`;
  }
}

// Format a value with its unit for display in fun facts
function formatValueWithUnit(value: number, unit: string): string {
  const { value: standardValue, baseUnit } = standardizeUnit(value, unit);
  return `${standardValue.toLocaleString()} ${getUnitDisplayName(baseUnit)}`;
}

// Examples for the example section
export const exampleQueries = [
  {
    text: "How heavy is the Eiffel Tower?",
    icon: "🗼",
    description: "Convert weight to elephants",
    query: "How heavy is the Eiffel Tower?"
  },
  {
    text: "10 kilometers in bananas",
    icon: "🍌",
    description: "Convert distance to banana lengths",
    query: "10 kilometers in bananas"
  },
  {
    text: "How long is a year in dog years?",
    icon: "🐕",
    description: "Convert time to dog perception",
    query: "How long is a year in dog years?"
  },
  {
    text: "What's the volume of an Olympic pool in bathtubs?",
    icon: "🏊‍♂️",
    description: "Convert volume to bathtubs",
    query: "What's the volume of an Olympic pool in bathtubs?"
  },
  {
    text: "How fast is a cheetah in sloth speeds?",
    icon: "🐆",
    description: "Convert speed to sloth speed",
    query: "How fast is a cheetah in sloth speeds?"
  },
  {
    text: "1500 kilograms in cats",
    icon: "🐈",
    description: "Convert weight to cats",
    query: "1500 kilograms in cats"
  }
];
