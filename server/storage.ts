import { 
  users, 
  type User, 
  type InsertUser, 
  type QuirkyUnit, 
  type InsertQuirkyUnit,
  type ConversionHistory,
  type InsertConversionHistory 
} from "@shared/schema";

// Extend the storage interface with methods for QuirkyUnits and ConversionHistory
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quirky units methods
  getAllQuirkyUnits(): Promise<QuirkyUnit[]>;
  getQuirkyUnitById(id: number): Promise<QuirkyUnit | undefined>;
  getQuirkyUnitsByCategory(category: string): Promise<QuirkyUnit[]>;
  createQuirkyUnit(unit: InsertQuirkyUnit): Promise<QuirkyUnit>;
  
  // Conversion history methods
  saveConversionHistory(history: InsertConversionHistory): Promise<ConversionHistory>;
  getConversionHistoryByUserId(userId: number): Promise<ConversionHistory[]>;
  getRecentConversions(limit: number): Promise<ConversionHistory[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quirkyUnits: Map<number, QuirkyUnit>;
  private conversionHistory: Map<number, ConversionHistory>;
  private userIdCounter: number;
  private quirkyUnitIdCounter: number;
  private conversionHistoryIdCounter: number;

  constructor() {
    this.users = new Map();
    this.quirkyUnits = new Map();
    this.conversionHistory = new Map();
    this.userIdCounter = 1;
    this.quirkyUnitIdCounter = 1;
    this.conversionHistoryIdCounter = 1;
    
    // Initialize with some default quirky units
    this.initializeQuirkyUnits();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Quirky units methods
  async getAllQuirkyUnits(): Promise<QuirkyUnit[]> {
    return Array.from(this.quirkyUnits.values());
  }
  
  async getQuirkyUnitById(id: number): Promise<QuirkyUnit | undefined> {
    return this.quirkyUnits.get(id);
  }
  
  async getQuirkyUnitsByCategory(category: string): Promise<QuirkyUnit[]> {
    return Array.from(this.quirkyUnits.values()).filter(
      (unit) => unit.category === category
    );
  }
  
  async createQuirkyUnit(insertUnit: InsertQuirkyUnit): Promise<QuirkyUnit> {
    const id = this.quirkyUnitIdCounter++;
    const unit: QuirkyUnit = { 
      ...insertUnit, 
      id,
      description: insertUnit.description || null,
      funFact: insertUnit.funFact || null
    };
    this.quirkyUnits.set(id, unit);
    return unit;
  }
  
  // Conversion history methods
  async saveConversionHistory(insertHistory: InsertConversionHistory): Promise<ConversionHistory> {
    const id = this.conversionHistoryIdCounter++;
    const history: ConversionHistory = { 
      ...insertHistory, 
      id,
      userId: insertHistory.userId || null 
    };
    this.conversionHistory.set(id, history);
    return history;
  }
  
  async getConversionHistoryByUserId(userId: number): Promise<ConversionHistory[]> {
    return Array.from(this.conversionHistory.values()).filter(
      (history) => history.userId === userId
    );
  }
  
  async getRecentConversions(limit: number): Promise<ConversionHistory[]> {
    return Array.from(this.conversionHistory.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
  
  // Initialize with default quirky units
  private initializeQuirkyUnits() {
    // Weight units
    const weightUnits: InsertQuirkyUnit[] = [
      {
        name: 'House Cat',
        namePlural: 'House Cats',
        value: 4.5,
        unit: 'kg',
        category: 'weight',
        icon: '🐈',
        description: 'The average domestic housecat',
        funFact: `If you stacked house cats on top of each other, 10 would be approximately the height of a standard doorway!`
      },
      {
        name: 'Bowling Ball',
        namePlural: 'Bowling Balls',
        value: 7,
        unit: 'kg',
        category: 'weight',
        icon: '🎳',
        description: 'A standard bowling ball',
        funFact: `A professional bowler typically owns 12-16 bowling balls, weighing a total of nearly 200 pounds!`
      },
      {
        name: 'African Elephant',
        namePlural: 'African Elephants',
        value: 5000,
        unit: 'kg',
        category: 'weight',
        icon: '🐘',
        description: 'A fully grown African elephant',
        funFact: `Elephants consume around 150-170 kg of food daily, about 3% of their body weight!`
      },
      {
        name: 'Blue Whale',
        namePlural: 'Blue Whales',
        value: 180000,
        unit: 'kg',
        category: 'weight',
        icon: '🐋',
        description: 'The largest animal ever known to have existed',
        funFact: `A blue whale's heart is the size of a small car and weighs about as much as three adult humans!`
      },
      {
        name: 'Smartphone',
        namePlural: 'Smartphones',
        value: 0.2,
        unit: 'kg',
        category: 'weight',
        icon: '📱',
        description: 'An average modern smartphone',
        funFact: `The first mobile phone weighed about 2.2 pounds (1 kg), nearly 5 times more than today's smartphones!`
      },
      {
        name: 'Cupcake',
        namePlural: 'Cupcakes',
        value: 0.08,
        unit: 'kg',
        category: 'weight',
        icon: '🧁',
        description: 'A standard frosted cupcake',
        funFact: `If you ate one cupcake a day for a year, you'd consume about 29 kg of cupcakes!`
      }
    ];
    
    // Length/distance units
    const lengthUnits: InsertQuirkyUnit[] = [
      {
        name: 'Banana',
        namePlural: 'Bananas',
        value: 0.2,
        unit: 'm',
        category: 'length',
        icon: '🍌',
        description: 'An average-sized banana',
        funFact: `If you laid all bananas produced worldwide in a year end-to-end, they would circle the Earth about 300 times!`
      },
      {
        name: 'Double-Decker Bus',
        namePlural: 'Double-Decker Buses',
        value: 11,
        unit: 'm',
        category: 'length',
        icon: '🚌',
        description: 'A typical London double-decker bus',
        funFact: `The first London double-decker bus operated in 1923. Today, there are over 1,000 of them roaming London!`
      },
      {
        name: 'Giraffe Height',
        namePlural: 'Giraffe Heights',
        value: 5.5,
        unit: 'm',
        category: 'length',
        icon: '🦒',
        description: 'The height of an adult giraffe',
        funFact: `A giraffe's neck alone is about 2.4 meters long, which is taller than most humans!`
      },
      {
        name: 'Football Field',
        namePlural: 'Football Fields',
        value: 100,
        unit: 'm',
        category: 'length',
        icon: '⚽',
        description: 'The length of a standard football (soccer) field',
        funFact: `FIFA allows football fields to vary in size, with length ranging from 90m to 120m!`
      }
    ];
    
    // Volume units
    const volumeUnits: InsertQuirkyUnit[] = [
      {
        name: 'Bathtub',
        namePlural: 'Bathtubs',
        value: 150,
        unit: 'l',
        category: 'volume',
        icon: '🛁',
        description: 'A standard-sized household bathtub',
        funFact: `Taking a bath typically uses twice as much water as a 10-minute shower!`
      },
      {
        name: 'Olympic Swimming Pool',
        namePlural: 'Olympic Swimming Pools',
        value: 2500000,
        unit: 'l',
        category: 'volume',
        icon: '🏊',
        description: 'An Olympic-sized swimming pool',
        funFact: `An Olympic swimming pool contains enough water to take over 16,600 baths!`
      }
    ];
    
    // Time units
    const timeUnits: InsertQuirkyUnit[] = [
      {
        name: 'Blink of an Eye',
        namePlural: 'Blinks of an Eye',
        value: 0.3,
        unit: 's',
        category: 'time',
        icon: '👁️',
        description: 'The time it takes to blink',
        funFact: `Humans blink about 15-20 times per minute, which means we spend about 10% of our waking hours with our eyes closed!`
      },
      {
        name: 'Mayfly Lifespan',
        namePlural: 'Mayfly Lifespans',
        value: 86400,
        unit: 's',
        category: 'time',
        icon: '🦟',
        description: 'The average lifespan of a mayfly (1 day)',
        funFact: `Mayflies live only about 24 hours as adults, but can spend up to two years underwater as nymphs before emerging!`
      }
    ];
    
    // Speed units
    const speedUnits: InsertQuirkyUnit[] = [
      {
        name: 'Sloth Speed',
        namePlural: 'Sloth Speeds',
        value: 0.24,
        unit: 'kph',
        category: 'speed',
        icon: '🦥',
        description: 'The top speed of a three-toed sloth',
        funFact: `Sloths are so slow that algae can grow on their fur, creating a green camouflage in the forest canopy!`
      },
      {
        name: 'Charging Rhino',
        namePlural: 'Charging Rhinos',
        value: 50,
        unit: 'kph',
        category: 'speed',
        icon: '🦏',
        description: 'The speed of a charging rhinoceros',
        funFact: `Despite weighing over two tons, rhinos can outrun most humans and can change direction surprisingly quickly!`
      }
    ];
    
    // Add all units to the database
    [...weightUnits, ...lengthUnits, ...volumeUnits, ...timeUnits, ...speedUnits].forEach(unit => {
      this.createQuirkyUnit(unit);
    });
  }
}

export const storage = new MemStorage();
