import { ConversionResult, ParsedQuery, QuirkyUnit } from "@shared/schema";
import { standardizeUnit, formatMeasurement } from "./utils";
import { findAppropriateQuirkyUnits, generateFunFact } from "./unitDatabase";

// Constants for known unit-to-type mappings
const WEIGHT_UNITS = ['kg', 'g', 'lb', 'lbs', 'ton', 'tons', 'tonne', 'tonnes'];
const LENGTH_UNITS = ['m', 'cm', 'mm', 'km', 'in', 'ft', 'feet', 'mile', 'miles'];
const VOLUME_UNITS = ['l', 'ml', 'gal', 'gallon', 'gallons'];
const TIME_UNITS = ['s', 'sec', 'min', 'h', 'hr', 'hour', 'day', 'days', 'year', 'years'];
const SPEED_UNITS = ['kph', 'mph', 'm/s'];

// Parse a natural language query to extract measurement information
export function parseQuery(query: string): ParsedQuery {
  // Default result structure
  const result: ParsedQuery = {
    originalQuery: query,
    measurementType: 'unknown',
    value: 0,
    unit: '',
  };
  
  // Normalize input
  const normalizedQuery = query.toLowerCase().trim();
  
  // Try to extract number and unit with regex
  const numberUnitRegex = /(\d+(?:\.\d+)?)\s*([a-zA-Z]+(?:\/[a-zA-Z]+)?)/;
  const match = normalizedQuery.match(numberUnitRegex);
  
  if (match) {
    result.value = parseFloat(match[1]);
    result.unit = match[2].toLowerCase();
    
    // Determine measurement type based on unit
    if (WEIGHT_UNITS.some(u => result.unit.includes(u))) {
      result.measurementType = 'weight';
    } else if (LENGTH_UNITS.some(u => result.unit.includes(u))) {
      result.measurementType = 'length';
    } else if (VOLUME_UNITS.some(u => result.unit.includes(u))) {
      result.measurementType = 'volume';
    } else if (TIME_UNITS.some(u => result.unit.includes(u))) {
      result.measurementType = 'time';
    } else if (SPEED_UNITS.some(u => result.unit.includes(u))) {
      result.measurementType = 'speed';
    }
  }
  
  // If measurement type is still unknown, try keyword analysis
  if (result.measurementType === 'unknown') {
    if (/weight|heavy|weigh/i.test(normalizedQuery)) {
      result.measurementType = 'weight';
    } else if (/length|distance|tall|height|long|wide|far/i.test(normalizedQuery)) {
      result.measurementType = 'length';
    } else if (/volume|capacity|holds|contain/i.test(normalizedQuery)) {
      result.measurementType = 'volume';
    } else if (/time|duration|last|period/i.test(normalizedQuery)) {
      result.measurementType = 'time';
    } else if (/speed|fast|velocity|quick/i.test(normalizedQuery)) {
      result.measurementType = 'speed';
    }
  }
  
  // Extract target unit if specified ("in X" pattern)
  const inUnitRegex = /in\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?s?)/i;
  const inUnitMatch = normalizedQuery.match(inUnitRegex);
  
  if (inUnitMatch) {
    result.targetUnit = inUnitMatch[1].trim().toLowerCase();
  }
  
  return result;
}

// Convert a standard measurement to a quirky unit
export async function convertToQuirkyMeasurement(
  parsedQuery: ParsedQuery,
  quirkyUnits: QuirkyUnit[]
): Promise<ConversionResult | null> {
  // Validate that we have enough information
  if (parsedQuery.value <= 0 || !parsedQuery.unit) {
    throw new Error("Invalid measurement: need a positive value and unit");
  }
  
  // Standardize the unit (convert to base unit)
  const { value: standardValue, baseUnit } = standardizeUnit(parsedQuery.value, parsedQuery.unit);
  
  // Find appropriate quirky units
  const appropriateUnits = findAppropriateQuirkyUnits(
    standardValue,
    baseUnit,
    quirkyUnits,
    parsedQuery.targetUnit
  );
  
  if (appropriateUnits.length === 0) {
    throw new Error(`No appropriate quirky units found for ${standardValue} ${baseUnit}`);
  }
  
  // Choose the first (most appropriate) quirky unit
  const selectedUnit = appropriateUnits[0];
  
  // Calculate the quirky amount
  const quirkyAmount = standardValue / selectedUnit.value;
  
  // Format the results
  const standardDisplay = formatMeasurement(standardValue, baseUnit);
  const quirkyAmountDisplay = quirkyAmount === 1 
    ? `1 ${selectedUnit.name}` 
    : `${quirkyAmount.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${selectedUnit.namePlural}`;
  
  // Generate a fun fact
  const funFact = generateFunFact(standardValue, baseUnit, quirkyAmount, selectedUnit);
  
  // Return the result
  return {
    originalQuery: parsedQuery.originalQuery,
    standardValue,
    standardUnit: baseUnit,
    standardDisplay,
    quirkyUnit: selectedUnit,
    quirkyAmount,
    quirkyAmountDisplay,
    funFact
  };
}
