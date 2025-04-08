import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertAppointmentSchema, insertCustomDesignSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API Routes - prefix all routes with /api
  
  // Collections endpoints
  app.get("/api/collections", async (req, res) => {
    try {
      const collections = await storage.getFeaturedCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });
  
  app.get("/api/collections/all", async (req, res) => {
    try {
      const collections = await storage.getAllCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch all collections" });
    }
  });
  
  app.get("/api/collections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid collection ID" });
      }
      
      const collection = await storage.getCollection(id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });
  
  // Fabrics endpoints
  app.get("/api/fabrics", async (req, res) => {
    try {
      const fabrics = await storage.getAvailableFabrics();
      res.json(fabrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fabrics" });
    }
  });
  
  app.get("/api/fabrics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid fabric ID" });
      }
      
      const fabric = await storage.getFabric(id);
      if (!fabric) {
        return res.status(404).json({ message: "Fabric not found" });
      }
      
      res.json(fabric);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fabric" });
    }
  });
  
  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  app.get("/api/products/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });
  
  // Product Categories endpoints
  app.get("/api/productCategories", async (req, res) => {
    try {
      const categories = await storage.getAllProductCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product categories" });
    }
  });
  
  // Testimonials endpoints
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // User endpoints
  // For now, we'll simulate an authenticated user for development
  app.get("/api/user/profile", async (req, res) => {
    try {
      // In a real app, this would check auth session and return the current user
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      // Remove sensitive information before sending to client
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });
  
  // User registration and login endpoints would go here in a real app
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // In a real app, we would hash the password before storing
      const user = await storage.createUser(validatedData);
      
      // Remove password before sending response
      const { password, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  // Measurements endpoints
  app.get("/api/user/measurements", async (req, res) => {
    try {
      // In a real app, this would check auth session and return measurements for authenticated user
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const measurements = await storage.getMeasurementsByUserId(user.id);
      res.json(measurements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch measurements" });
    }
  });
  
  // Custom Designs endpoints
  app.get("/api/user/designs", async (req, res) => {
    try {
      // In a real app, this would check auth session
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const designs = await storage.getCustomDesignsByUserId(user.id);
      res.json(designs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom designs" });
    }
  });
  
  app.post("/api/designs", async (req, res) => {
    try {
      // In a real app, this would check auth session
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const validatedData = insertCustomDesignSchema.parse({
        ...req.body,
        userId: user.id
      });
      
      const design = await storage.createCustomDesign(validatedData);
      res.status(201).json(design);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create custom design" });
    }
  });
  
  app.delete("/api/designs/:id", async (req, res) => {
    try {
      // In a real app, this would check auth session and verify ownership
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid design ID" });
      }
      
      const design = await storage.getCustomDesign(id);
      if (!design) {
        return res.status(404).json({ message: "Design not found" });
      }
      
      if (design.userId !== user.id) {
        return res.status(403).json({ message: "Not authorized to delete this design" });
      }
      
      const success = await storage.deleteCustomDesign(id);
      if (!success) {
        return res.status(500).json({ message: "Failed to delete design" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete custom design" });
    }
  });
  
  // Appointments endpoints
  app.get("/api/user/appointments", async (req, res) => {
    try {
      // In a real app, this would check auth session
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const appointments = await storage.getAppointmentsByUserId(user.id);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });
  
  app.post("/api/appointments", async (req, res) => {
    try {
      // In a real app, this would check auth session
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      // Extract and validate appointment fields
      const { firstName, lastName, email, phone, date, appointmentType, notes } = req.body;
      
      // Create appointment object
      const appointmentData = {
        userId: user.id,
        date: new Date(date),
        type: appointmentType,
        status: "scheduled",
        notes: notes || undefined,
        location: "London Boutique"  // Default location
      };
      
      // Validate with schema
      const validatedData = insertAppointmentSchema.parse(appointmentData);
      
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });
  
  app.patch("/api/appointments/:id/cancel", async (req, res) => {
    try {
      // In a real app, this would check auth session and verify ownership
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }
      
      const appointment = await storage.getAppointment(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      if (appointment.userId !== user.id) {
        return res.status(403).json({ message: "Not authorized to cancel this appointment" });
      }
      
      const cancelledAppointment = await storage.cancelAppointment(id);
      if (!cancelledAppointment) {
        return res.status(500).json({ message: "Failed to cancel appointment" });
      }
      
      res.json(cancelledAppointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel appointment" });
    }
  });
  
  // Orders endpoints
  app.get("/api/user/orders", async (req, res) => {
    try {
      // In a real app, this would check auth session
      const user = await storage.getUserByUsername("johndoe");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const orders = await storage.getOrdersByUserId(user.id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  return httpServer;
}
