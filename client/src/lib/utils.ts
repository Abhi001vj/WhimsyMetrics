import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

// Format a number to a fixed precision with appropriate rounding
export function formatPrecision(num: number, precision: number = 2): string {
  // Handle whole numbers specially
  if (Number.isInteger(num)) {
    return num.toString();
  }
  
  // Handle very small decimals
  if (Math.abs(num) < 0.01 && num !== 0) {
    return num.toExponential(precision);
  }
  
  // Regular decimal formatting
  return num.toFixed(precision).replace(/\.?0+$/, '');
}

// Format measurement value with unit
export function formatMeasurement(value: number, unit: string): string {
  const formattedValue = formatPrecision(value);
  
  // Handle pluralization for certain units
  if (value !== 1) {
    if (unit === 'foot') return `${formattedValue} feet`;
    if (unit === 'inch') return `${formattedValue} inches`;
    if (unit === 'mile') return `${formattedValue} miles`;
    if (unit === 'pound' || unit === 'lb') return `${formattedValue} pounds`;
    if (unit === 'gallon') return `${formattedValue} gallons`;
    if (unit === 'year') return `${formattedValue} years`;
    if (unit === 'day') return `${formattedValue} days`;
    if (unit === 'hour') return `${formattedValue} hours`;
    if (unit === 'minute') return `${formattedValue} minutes`;
    if (unit === 'second') return `${formattedValue} seconds`;
  }
  
  return `${formattedValue} ${unit}`;
}

// Get a random element from an array
export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Return a random number between min and max
export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Convert various standard units to their base unit
export function standardizeUnit(value: number, unit: string): { value: number; baseUnit: string } {
  unit = unit.toLowerCase();
  
  // Weight
  if (['lb', 'lbs', 'pound', 'pounds'].includes(unit)) {
    return { value: value * 0.453592, baseUnit: 'kg' };
  }
  if (['g', 'gram', 'grams'].includes(unit)) {
    return { value: value / 1000, baseUnit: 'kg' };
  }
  if (['t', 'tonne', 'tonnes', 'ton', 'tons'].includes(unit)) {
    return { value: value * 1000, baseUnit: 'kg' };
  }
  
  // Length/Distance
  if (['cm', 'centimeter', 'centimeters'].includes(unit)) {
    return { value: value / 100, baseUnit: 'm' };
  }
  if (['mm', 'millimeter', 'millimeters'].includes(unit)) {
    return { value: value / 1000, baseUnit: 'm' };
  }
  if (['km', 'kilometer', 'kilometers'].includes(unit)) {
    return { value: value * 1000, baseUnit: 'm' };
  }
  if (['in', 'inch', 'inches'].includes(unit)) {
    return { value: value * 0.0254, baseUnit: 'm' };
  }
  if (['ft', 'foot', 'feet'].includes(unit)) {
    return { value: value * 0.3048, baseUnit: 'm' };
  }
  if (['mi', 'mile', 'miles'].includes(unit)) {
    return { value: value * 1609.34, baseUnit: 'm' };
  }
  
  // Volume
  if (['ml', 'milliliter', 'milliliters'].includes(unit)) {
    return { value: value / 1000, baseUnit: 'l' };
  }
  if (['gal', 'gallon', 'gallons'].includes(unit)) {
    return { value: value * 3.78541, baseUnit: 'l' };
  }
  
  // Time
  if (['min', 'minute', 'minutes'].includes(unit)) {
    return { value: value * 60, baseUnit: 's' };
  }
  if (['h', 'hr', 'hour', 'hours'].includes(unit)) {
    return { value: value * 3600, baseUnit: 's' };
  }
  if (['d', 'day', 'days'].includes(unit)) {
    return { value: value * 86400, baseUnit: 's' };
  }
  if (['y', 'yr', 'year', 'years'].includes(unit)) {
    return { value: value * 31536000, baseUnit: 's' };
  }
  
  // Speed
  if (['mph'].includes(unit)) {
    return { value: value * 1.60934, baseUnit: 'kph' };
  }
  if (['m/s'].includes(unit)) {
    return { value: value * 3.6, baseUnit: 'kph' };
  }
  
  // If the unit is already a base unit or not recognized, return as is
  return { value, baseUnit: unit };
}

// Get a user-friendly display name for base units
export function getUnitDisplayName(baseUnit: string): string {
  switch (baseUnit) {
    case 'kg': return 'kilograms';
    case 'm': return 'meters';
    case 'l': return 'liters';
    case 's': return 'seconds';
    case 'kph': return 'kilometers per hour';
    default: return baseUnit;
  }
}
