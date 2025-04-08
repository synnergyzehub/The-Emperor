import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Customer measurement model
export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  chest: text("chest"),
  waist: text("waist"),
  hips: text("hips"),
  inseam: text("inseam"),
  shoulders: text("shoulders"),
  sleeve: text("sleeve"),
  neck: text("neck"),
  notes: text("notes"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMeasurementSchema = createInsertSchema(measurements).omit({ id: true, updatedAt: true });
export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
export type Measurement = typeof measurements.$inferSelect;

// Product categories
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
});

export const insertProductCategorySchema = createInsertSchema(productCategories).omit({ id: true });
export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull().references(() => productCategories.id),
  price: integer("price").notNull(), // Stored in cents
  image: text("image"),
  features: text("features").array(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Fabrics
export const fabrics = pgTable("fabrics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  color: text("color").notNull(),
  pattern: text("pattern"),
  price: integer("price").notNull(), // Additional price in cents
  image: text("image"),
  available: boolean("available").default(true).notNull(),
});

export const insertFabricSchema = createInsertSchema(fabrics).omit({ id: true });
export type InsertFabric = z.infer<typeof insertFabricSchema>;
export type Fabric = typeof fabrics.$inferSelect;

// Custom designs (saved by customers)
export const customDesigns = pgTable("custom_designs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  fabricId: integer("fabric_id").references(() => fabrics.id),
  details: jsonb("details").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCustomDesignSchema = createInsertSchema(customDesigns).omit({ id: true, createdAt: true });
export type InsertCustomDesign = z.infer<typeof insertCustomDesignSchema>;
export type CustomDesign = typeof customDesigns.$inferSelect;

// Appointments
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  type: text("type").notNull(),
  status: text("status").default("scheduled").notNull(),
  notes: text("notes"),
  location: text("location").default("London Boutique").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true, createdAt: true });
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  total: integer("total").notNull(), // Total in cents
  status: text("status").default("pending").notNull(),
  designId: integer("design_id").references(() => customDesigns.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completionDate: timestamp("completion_date"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Collection showcase
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  tagline: text("tagline"),
  image: text("image").notNull(),
  featured: boolean("featured").default(false).notNull(),
});

export const insertCollectionSchema = createInsertSchema(collections).omit({ id: true });
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Collection = typeof collections.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location"),
  testimonial: text("testimonial").notNull(),
  image: text("image"),
  featured: boolean("featured").default(false).notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
