import { pgTable, text, serial, integer, boolean, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping for auth later)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Quirky units table
export const quirkyUnits = pgTable("quirky_units", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  namePlural: text("name_plural").notNull(),
  value: real("value").notNull(), // Base value in standard unit
  unit: text("unit").notNull(), // Base unit (e.g., 'kg', 'm')
  category: text("category").notNull(), // E.g., 'weight', 'length', 'volume'
  icon: text("icon").notNull(), // Emoji or icon reference
  description: text("description"),
  funFact: text("fun_fact"),
});

export const insertQuirkyUnitSchema = createInsertSchema(quirkyUnits).omit({
  id: true,
});

// Conversion history table
export const conversionHistory = pgTable("conversion_history", {
  id: serial("id").primaryKey(),
  originalQuery: text("original_query").notNull(),
  standardValue: real("standard_value").notNull(),
  standardUnit: text("standard_unit").notNull(),
  quirkyUnitId: integer("quirky_unit_id").notNull(),
  quirkyValue: real("quirky_value").notNull(),
  timestamp: text("timestamp").notNull(), // ISO date string
  userId: integer("user_id"), // Optional: if user is logged in
});

export const insertConversionHistorySchema = createInsertSchema(conversionHistory).omit({
  id: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuirkyUnit = z.infer<typeof insertQuirkyUnitSchema>;
export type QuirkyUnit = typeof quirkyUnits.$inferSelect;

export type InsertConversionHistory = z.infer<typeof insertConversionHistorySchema>;
export type ConversionHistory = typeof conversionHistory.$inferSelect;

// Interface for query parsing results
export interface ParsedQuery {
  originalQuery: string;
  measurementType: 'weight' | 'length' | 'distance' | 'time' | 'volume' | 'area' | 'speed' | 'unknown';
  value: number;
  unit: string;
  targetUnit?: string;
}

// Interface for conversion results
export interface ConversionResult {
  originalQuery: string;
  standardValue: number;
  standardUnit: string;
  standardDisplay: string;
  quirkyUnit: QuirkyUnit;
  quirkyAmount: number;
  quirkyAmountDisplay: string;
  funFact?: string;
}
