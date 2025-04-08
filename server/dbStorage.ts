import { eq, and, desc, sql, asc } from "drizzle-orm";
import { 
  users, 
  type User, 
  type InsertUser, 
  measurements, 
  type Measurement, 
  type InsertMeasurement,
  fabrics,
  type Fabric,
  type InsertFabric,
  products,
  type Product,
  type InsertProduct,
  productCategories,
  type ProductCategory,
  type InsertProductCategory,
  customDesigns,
  type CustomDesign,
  type InsertCustomDesign,
  appointments,
  type Appointment,
  type InsertAppointment,
  orders,
  type Order,
  type InsertOrder,
  collections,
  type Collection,
  type InsertCollection,
  testimonials,
  type Testimonial,
  type InsertTestimonial,
  carts,
  cartItems,
  orderItems,
  collectionProducts,
  virtualStores
} from "@shared/schema";
import { db } from "./db";
import { IStorage } from "./storage";

/**
 * PostgreSQL Database Storage implementation for The Emperor platform
 */
export class DatabaseStorage implements IStorage {
  // ========== User Methods ==========
  
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  
  // ========== Measurement Methods ==========
  
  async getMeasurement(id: number): Promise<Measurement | undefined> {
    const [measurement] = await db.select().from(measurements).where(eq(measurements.id, id));
    return measurement;
  }
  
  async getMeasurementsByUserId(userId: number): Promise<Measurement[]> {
    return db.select().from(measurements).where(eq(measurements.userId, userId));
  }
  
  async createMeasurement(measurement: InsertMeasurement): Promise<Measurement> {
    const [newMeasurement] = await db.insert(measurements).values(measurement).returning();
    return newMeasurement;
  }
  
  async updateMeasurement(id: number, updateData: Partial<InsertMeasurement>): Promise<Measurement | undefined> {
    const [updatedMeasurement] = await db
      .update(measurements)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(measurements.id, id))
      .returning();
    
    return updatedMeasurement;
  }
  
  // ========== Fabric Methods ==========
  
  async getFabric(id: number): Promise<Fabric | undefined> {
    const [fabric] = await db.select().from(fabrics).where(eq(fabrics.id, id));
    return fabric;
  }
  
  async getAllFabrics(): Promise<Fabric[]> {
    return db.select().from(fabrics);
  }
  
  async getAvailableFabrics(): Promise<Fabric[]> {
    return db.select().from(fabrics).where(eq(fabrics.available, true));
  }
  
  async createFabric(fabric: InsertFabric): Promise<Fabric> {
    const [newFabric] = await db.insert(fabrics).values(fabric).returning();
    return newFabric;
  }
  
  async updateFabric(id: number, updateData: Partial<InsertFabric>): Promise<Fabric | undefined> {
    const [updatedFabric] = await db
      .update(fabrics)
      .set(updateData)
      .where(eq(fabrics.id, id))
      .returning();
    
    return updatedFabric;
  }
  
  // ========== Product Methods ==========
  
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products);
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  
  async getProductCategory(id: number): Promise<ProductCategory | undefined> {
    const [category] = await db.select().from(productCategories).where(eq(productCategories.id, id));
    return category;
  }
  
  async getAllProductCategories(): Promise<ProductCategory[]> {
    return db.select().from(productCategories);
  }
  
  async createProductCategory(category: InsertProductCategory): Promise<ProductCategory> {
    const [newCategory] = await db.insert(productCategories).values(category).returning();
    return newCategory;
  }
  
  // ========== Custom Design Methods ==========
  
  async getCustomDesign(id: number): Promise<CustomDesign | undefined> {
    const [design] = await db.select().from(customDesigns).where(eq(customDesigns.id, id));
    return design;
  }
  
  async getCustomDesignsByUserId(userId: number): Promise<CustomDesign[]> {
    return db.select().from(customDesigns).where(eq(customDesigns.userId, userId));
  }
  
  async createCustomDesign(design: InsertCustomDesign): Promise<CustomDesign> {
    const [newDesign] = await db.insert(customDesigns).values(design).returning();
    return newDesign;
  }
  
  async updateCustomDesign(id: number, updateData: Partial<InsertCustomDesign>): Promise<CustomDesign | undefined> {
    const [updatedDesign] = await db
      .update(customDesigns)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(customDesigns.id, id))
      .returning();
    
    return updatedDesign;
  }
  
  async deleteCustomDesign(id: number): Promise<boolean> {
    const result = await db
      .delete(customDesigns)
      .where(eq(customDesigns.id, id));
    
    return result.rowCount !== undefined && result.rowCount > 0;
  }
  
  // ========== Appointment Methods ==========
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment;
  }
  
  async getAppointmentsByUserId(userId: number): Promise<Appointment[]> {
    return db.select().from(appointments).where(eq(appointments.userId, userId));
  }
  
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  }
  
  async updateAppointment(id: number, updateData: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const [updatedAppointment] = await db
      .update(appointments)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(appointments.id, id))
      .returning();
    
    return updatedAppointment;
  }
  
  async cancelAppointment(id: number): Promise<Appointment | undefined> {
    const [cancelledAppointment] = await db
      .update(appointments)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(appointments.id, id))
      .returning();
    
    return cancelledAppointment;
  }
  
  // ========== Order Methods ==========
  
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.userId, userId));
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ 
        status, 
        updatedAt: new Date(),
        ...(status === 'completed' ? { completedAt: new Date() } : {})
      })
      .where(eq(orders.id, id))
      .returning();
    
    return updatedOrder;
  }
  
  // ========== Collection Methods ==========
  
  async getCollection(id: number): Promise<Collection | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.id, id));
    return collection;
  }
  
  async getAllCollections(): Promise<Collection[]> {
    return db.select().from(collections);
  }
  
  async getFeaturedCollections(): Promise<Collection[]> {
    return db.select().from(collections).where(eq(collections.featured, true));
  }
  
  async createCollection(collection: InsertCollection): Promise<Collection> {
    const [newCollection] = await db.insert(collections).values(collection).returning();
    return newCollection;
  }
  
  // ========== Testimonial Methods ==========
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }
  
  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials);
  }
  
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.featured, true));
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }
}