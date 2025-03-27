import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertQuirkyUnitSchema, 
  insertConversionHistorySchema,
  type ParsedQuery
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for quirky units
  app.get("/api/quirky-units", async (req, res) => {
    try {
      const units = await storage.getAllQuirkyUnits();
      res.json(units);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quirky units" });
    }
  });

  app.get("/api/quirky-units/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const units = await storage.getQuirkyUnitsByCategory(category);
      res.json(units);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quirky units by category" });
    }
  });

  app.post("/api/quirky-units", async (req, res) => {
    try {
      const data = insertQuirkyUnitSchema.parse(req.body);
      const newUnit = await storage.createQuirkyUnit(data);
      res.status(201).json(newUnit);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid quirky unit data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create quirky unit" });
      }
    }
  });

  // API route for parsing natural language queries
  app.post("/api/parse-query", async (req, res) => {
    try {
      const schema = z.object({
        query: z.string().min(1, "Query cannot be empty")
      });
      
      const { query } = schema.parse(req.body);
      
      // Very basic parsing logic
      let parsedQuery: ParsedQuery = {
        originalQuery: query,
        measurementType: 'unknown',
        value: 0,
        unit: ''
      };
      
      // Try to extract number and unit
      const numberUnitMatch = query.match(/(\d+\.?\d*)\s*([a-zA-Z]+)/);
      if (numberUnitMatch) {
        parsedQuery.value = parseFloat(numberUnitMatch[1]);
        parsedQuery.unit = numberUnitMatch[2].toLowerCase();
        
        // Try to determine measurement type from unit
        if (['kg', 'pounds', 'lbs', 'g', 'tonne', 'tonnes', 'tons'].includes(parsedQuery.unit)) {
          parsedQuery.measurementType = 'weight';
        } else if (['m', 'km', 'cm', 'mm', 'ft', 'feet', 'mile', 'miles', 'in', 'inches'].includes(parsedQuery.unit)) {
          parsedQuery.measurementType = 'length';
        } else if (['l', 'liter', 'liters', 'gallon', 'gallons', 'ml'].includes(parsedQuery.unit)) {
          parsedQuery.measurementType = 'volume';
        } else if (['s', 'sec', 'seconds', 'min', 'minutes', 'h', 'hour', 'hours', 'day', 'days', 'year', 'years'].includes(parsedQuery.unit)) {
          parsedQuery.measurementType = 'time';
        } else if (['kph', 'mph', 'km/h', 'm/s'].includes(parsedQuery.unit)) {
          parsedQuery.measurementType = 'speed';
        }
      }
      
      // Check for keyword hints in the query if measurement type is still unknown
      if (parsedQuery.measurementType === 'unknown') {
        if (query.match(/heavy|weight|weigh/i)) parsedQuery.measurementType = 'weight';
        else if (query.match(/long|tall|height|wide|width|deep|depth/i)) parsedQuery.measurementType = 'length';
        else if (query.match(/volume|capacity|contain/i)) parsedQuery.measurementType = 'volume';
        else if (query.match(/time|duration|how long/i)) parsedQuery.measurementType = 'time';
        else if (query.match(/fast|speed|velocity|how quick/i)) parsedQuery.measurementType = 'speed';
      }
      
      // Check if there's a target unit mentioned (e.g., "in bananas")
      const inUnitMatch = query.match(/in\s+([a-zA-Z]+)s?/i);
      if (inUnitMatch) {
        parsedQuery.targetUnit = inUnitMatch[1].toLowerCase();
      }
      
      res.json(parsedQuery);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid query data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to parse query" });
      }
    }
  });

  // API route for saving conversion history
  app.post("/api/conversion-history", async (req, res) => {
    try {
      const data = insertConversionHistorySchema.parse(req.body);
      const history = await storage.saveConversionHistory(data);
      res.status(201).json(history);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid conversion history data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save conversion history" });
      }
    }
  });

  app.get("/api/conversion-history/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const history = await storage.getRecentConversions(limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent conversions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
