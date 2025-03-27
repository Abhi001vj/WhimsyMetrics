import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ConversionResult, ParsedQuery, QuirkyUnit } from '@shared/schema';
import { parseQuery, convertToQuirkyMeasurement } from '@/lib/measurementConverter';

interface UseMeasurementConversion {
  query: string;
  result: ConversionResult | null;
  loading: boolean;
  error: string | null;
  processQuery: (inputQuery: string) => Promise<void>;
}

export function useMeasurementConversion(): UseMeasurementConversion {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch quirky units from API
  const { data: quirkyUnits = [], isLoading: unitsLoading } = useQuery<QuirkyUnit[]>({
    queryKey: ['/api/quirky-units'],
  });

  // Parse query using backend API
  const parseQueryMutation = useMutation({
    mutationFn: async (query: string) => {
      const response = await apiRequest('POST', '/api/parse-query', { query });
      return response.json() as Promise<ParsedQuery>;
    },
  });

  // Save conversion history
  const saveHistoryMutation = useMutation({
    mutationFn: async (conversion: ConversionResult) => {
      return await apiRequest('POST', '/api/conversion-history', {
        originalQuery: conversion.originalQuery,
        standardValue: conversion.standardValue,
        standardUnit: conversion.standardUnit,
        quirkyUnitId: conversion.quirkyUnit.id,
        quirkyValue: conversion.quirkyAmount,
        timestamp: new Date().toISOString(),
      });
    },
  });

  // Process a query
  const processQuery = async (inputQuery: string) => {
    try {
      setQuery(inputQuery);
      setError(null);
      
      // First, try client-side parsing
      const clientParsedQuery = parseQuery(inputQuery);
      
      // If client-side parsing failed, try server-side
      let parsedQuery: ParsedQuery = clientParsedQuery;
      
      if (
        clientParsedQuery.measurementType === 'unknown' || 
        clientParsedQuery.value === 0 || 
        !clientParsedQuery.unit
      ) {
        try {
          parsedQuery = await parseQueryMutation.mutateAsync(inputQuery);
        } catch (err) {
          console.error("Error from server parsing:", err);
          // Still use client parsing as fallback
        }
      }
      
      // If we still don't have a valid parsed query, show error
      if (
        parsedQuery.measurementType === 'unknown' || 
        parsedQuery.value === 0 || 
        !parsedQuery.unit
      ) {
        setError("Sorry, I couldn't understand that query. Please try something like '100 kg' or '5 miles'.");
        setResult(null);
        return;
      }
      
      // Convert to quirky measurement
      const conversionResult = await convertToQuirkyMeasurement(parsedQuery, quirkyUnits);
      
      if (conversionResult) {
        setResult(conversionResult);
        
        // Save to history
        try {
          await saveHistoryMutation.mutateAsync(conversionResult);
        } catch (err) {
          console.error("Error saving conversion history:", err);
          // Non-critical error, don't show to user
        }
      } else {
        setError("I couldn't find any appropriate quirky units for that measurement.");
        setResult(null);
      }
    } catch (err) {
      console.error("Error processing query:", err);
      setError("Something went wrong while processing your query. Please try again.");
      setResult(null);
    }
  };

  return {
    query,
    result,
    loading: unitsLoading || parseQueryMutation.isPending || saveHistoryMutation.isPending,
    error,
    processQuery
  };
}
