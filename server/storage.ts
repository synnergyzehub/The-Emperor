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
  type InsertTestimonial
} from "@shared/schema";

// Comprehensive storage interface for The Emperor platform
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Measurements
  getMeasurement(id: number): Promise<Measurement | undefined>;
  getMeasurementsByUserId(userId: number): Promise<Measurement[]>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
  updateMeasurement(id: number, measurement: Partial<InsertMeasurement>): Promise<Measurement | undefined>;
  
  // Fabrics
  getFabric(id: number): Promise<Fabric | undefined>;
  getAllFabrics(): Promise<Fabric[]>;
  getAvailableFabrics(): Promise<Fabric[]>;
  createFabric(fabric: InsertFabric): Promise<Fabric>;
  updateFabric(id: number, fabric: Partial<InsertFabric>): Promise<Fabric | undefined>;
  
  // Products and Categories
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getProductCategory(id: number): Promise<ProductCategory | undefined>;
  getAllProductCategories(): Promise<ProductCategory[]>;
  createProductCategory(category: InsertProductCategory): Promise<ProductCategory>;
  
  // Custom Designs
  getCustomDesign(id: number): Promise<CustomDesign | undefined>;
  getCustomDesignsByUserId(userId: number): Promise<CustomDesign[]>;
  createCustomDesign(design: InsertCustomDesign): Promise<CustomDesign>;
  updateCustomDesign(id: number, design: Partial<InsertCustomDesign>): Promise<CustomDesign | undefined>;
  deleteCustomDesign(id: number): Promise<boolean>;
  
  // Appointments
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAppointmentsByUserId(userId: number): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  cancelAppointment(id: number): Promise<Appointment | undefined>;
  
  // Orders
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Collections
  getCollection(id: number): Promise<Collection | undefined>;
  getAllCollections(): Promise<Collection[]>;
  getFeaturedCollections(): Promise<Collection[]>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  
  // Testimonials
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private measurements: Map<number, Measurement>;
  private fabrics: Map<number, Fabric>;
  private products: Map<number, Product>;
  private productCategories: Map<number, ProductCategory>;
  private customDesigns: Map<number, CustomDesign>;
  private appointments: Map<number, Appointment>;
  private orders: Map<number, Order>;
  private collections: Map<number, Collection>;
  private testimonials: Map<number, Testimonial>;
  
  private currentUserId: number;
  private currentMeasurementId: number;
  private currentFabricId: number;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentDesignId: number;
  private currentAppointmentId: number;
  private currentOrderId: number;
  private currentCollectionId: number;
  private currentTestimonialId: number;

  constructor() {
    // Initialize maps for all entity types
    this.users = new Map();
    this.measurements = new Map();
    this.fabrics = new Map();
    this.products = new Map();
    this.productCategories = new Map();
    this.customDesigns = new Map();
    this.appointments = new Map();
    this.orders = new Map();
    this.collections = new Map();
    this.testimonials = new Map();
    
    // Initialize IDs
    this.currentUserId = 1;
    this.currentMeasurementId = 1;
    this.currentFabricId = 1;
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentDesignId = 1;
    this.currentAppointmentId = 1;
    this.currentOrderId = 1;
    this.currentCollectionId = 1;
    this.currentTestimonialId = 1;
    
    // Initialize with sample data for development
    this.initializeSampleData();
  }

  // User management methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  // Measurements methods
  async getMeasurement(id: number): Promise<Measurement | undefined> {
    return this.measurements.get(id);
  }
  
  async getMeasurementsByUserId(userId: number): Promise<Measurement[]> {
    return Array.from(this.measurements.values()).filter(
      (measurement) => measurement.userId === userId
    );
  }
  
  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    const id = this.currentMeasurementId++;
    const updatedAt = new Date();
    const measurement: Measurement = { ...insertMeasurement, id, updatedAt };
    this.measurements.set(id, measurement);
    return measurement;
  }
  
  async updateMeasurement(id: number, updateData: Partial<InsertMeasurement>): Promise<Measurement | undefined> {
    const measurement = this.measurements.get(id);
    if (!measurement) return undefined;
    
    const updatedMeasurement: Measurement = {
      ...measurement,
      ...updateData,
      updatedAt: new Date()
    };
    
    this.measurements.set(id, updatedMeasurement);
    return updatedMeasurement;
  }
  
  // Fabrics methods
  async getFabric(id: number): Promise<Fabric | undefined> {
    return this.fabrics.get(id);
  }
  
  async getAllFabrics(): Promise<Fabric[]> {
    return Array.from(this.fabrics.values());
  }
  
  async getAvailableFabrics(): Promise<Fabric[]> {
    return Array.from(this.fabrics.values()).filter(
      (fabric) => fabric.available
    );
  }
  
  async createFabric(insertFabric: InsertFabric): Promise<Fabric> {
    const id = this.currentFabricId++;
    const fabric: Fabric = { ...insertFabric, id };
    this.fabrics.set(id, fabric);
    return fabric;
  }
  
  async updateFabric(id: number, updateData: Partial<InsertFabric>): Promise<Fabric | undefined> {
    const fabric = this.fabrics.get(id);
    if (!fabric) return undefined;
    
    const updatedFabric: Fabric = {
      ...fabric,
      ...updateData
    };
    
    this.fabrics.set(id, updatedFabric);
    return updatedFabric;
  }
  
  // Products and Categories methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  async getProductCategory(id: number): Promise<ProductCategory | undefined> {
    return this.productCategories.get(id);
  }
  
  async getAllProductCategories(): Promise<ProductCategory[]> {
    return Array.from(this.productCategories.values());
  }
  
  async createProductCategory(insertCategory: InsertProductCategory): Promise<ProductCategory> {
    const id = this.currentCategoryId++;
    const category: ProductCategory = { ...insertCategory, id };
    this.productCategories.set(id, category);
    return category;
  }
  
  // Custom Designs methods
  async getCustomDesign(id: number): Promise<CustomDesign | undefined> {
    return this.customDesigns.get(id);
  }
  
  async getCustomDesignsByUserId(userId: number): Promise<CustomDesign[]> {
    return Array.from(this.customDesigns.values()).filter(
      (design) => design.userId === userId
    );
  }
  
  async createCustomDesign(insertDesign: InsertCustomDesign): Promise<CustomDesign> {
    const id = this.currentDesignId++;
    const createdAt = new Date();
    const design: CustomDesign = { ...insertDesign, id, createdAt };
    this.customDesigns.set(id, design);
    return design;
  }
  
  async updateCustomDesign(id: number, updateData: Partial<InsertCustomDesign>): Promise<CustomDesign | undefined> {
    const design = this.customDesigns.get(id);
    if (!design) return undefined;
    
    const updatedDesign: CustomDesign = {
      ...design,
      ...updateData
    };
    
    this.customDesigns.set(id, updatedDesign);
    return updatedDesign;
  }
  
  async deleteCustomDesign(id: number): Promise<boolean> {
    return this.customDesigns.delete(id);
  }
  
  // Appointments methods
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  async getAppointmentsByUserId(userId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      (appointment) => appointment.userId === userId
    );
  }
  
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const createdAt = new Date();
    const appointment: Appointment = { ...insertAppointment, id, createdAt };
    this.appointments.set(id, appointment);
    return appointment;
  }
  
  async updateAppointment(id: number, updateData: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updatedAppointment: Appointment = {
      ...appointment,
      ...updateData
    };
    
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }
  
  async cancelAppointment(id: number): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const cancelledAppointment: Appointment = {
      ...appointment,
      status: "cancelled"
    };
    
    this.appointments.set(id, cancelledAppointment);
    return cancelledAppointment;
  }
  
  // Orders methods
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const createdAt = new Date();
    const order: Order = { ...insertOrder, id, createdAt };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = {
      ...order,
      status
    };
    
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Collections methods
  async getCollection(id: number): Promise<Collection | undefined> {
    return this.collections.get(id);
  }
  
  async getAllCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values());
  }
  
  async getFeaturedCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values()).filter(
      (collection) => collection.featured
    );
  }
  
  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = this.currentCollectionId++;
    const collection: Collection = { ...insertCollection, id };
    this.collections.set(id, collection);
    return collection;
  }
  
  // Testimonials methods
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      (testimonial) => testimonial.featured
    );
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Initialize sample data for development
  private initializeSampleData(): void {
    // Sample user
    const user: User = {
      id: this.currentUserId++,
      username: "johndoe",
      password: "password123", // In a real app, this would be hashed
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "+1234567890",
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    
    // Sample measurements
    const measurement: Measurement = {
      id: this.currentMeasurementId++,
      userId: user.id,
      chest: "42 inches",
      waist: "34 inches",
      hips: "40 inches",
      inseam: "32 inches",
      shoulders: "18.5 inches",
      sleeve: "25 inches",
      neck: "16 inches",
      notes: "Client prefers a slightly looser fit around the chest.",
      updatedAt: new Date()
    };
    this.measurements.set(measurement.id, measurement);
    
    // Sample product categories
    const suits: ProductCategory = {
      id: this.currentCategoryId++,
      name: "Suits",
      description: "Premium bespoke suits for every occasion",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };
    this.productCategories.set(suits.id, suits);
    
    const shirts: ProductCategory = {
      id: this.currentCategoryId++,
      name: "Shirts",
      description: "Handcrafted shirts made from the finest fabrics",
      image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };
    this.productCategories.set(shirts.id, shirts);
    
    const formal: ProductCategory = {
      id: this.currentCategoryId++,
      name: "Formal Wear",
      description: "Elegant attire for the most special occasions",
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };
    this.productCategories.set(formal.id, formal);
    
    // Sample products
    const executiveSuit: Product = {
      id: this.currentProductId++,
      name: "Executive Suit",
      description: "A sophisticated suit designed for the modern professional. Features a clean silhouette with subtle details that speak to quality craftsmanship.",
      categoryId: suits.id,
      price: 249900, // $2,499.00
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Hand-stitched lapels", "Full canvas construction", "Surgeon cuffs", "Custom monogramming"]
    };
    this.products.set(executiveSuit.id, executiveSuit);
    
    const classicShirt: Product = {
      id: this.currentProductId++,
      name: "Classic Dress Shirt",
      description: "The foundation of every gentleman's wardrobe. Our classic shirt features premium cotton and mother-of-pearl buttons.",
      categoryId: shirts.id,
      price: 34900, // $349.00
      image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Premium Egyptian cotton", "Mother-of-pearl buttons", "Reinforced collar", "Single-needle stitching"]
    };
    this.products.set(classicShirt.id, classicShirt);
    
    const tuxedo: Product = {
      id: this.currentProductId++,
      name: "The Sovereign Tuxedo",
      description: "Our pinnacle evening wear, designed with exceptional attention to detail for life's most memorable occasions.",
      categoryId: formal.id,
      price: 329900, // $3,299.00
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Barathea wool", "Grosgrain peak lapels", "Hand-finished details", "Custom silk lining"]
    };
    this.products.set(tuxedo.id, tuxedo);
    
    // Sample fabrics
    const navyWool: Fabric = {
      id: this.currentFabricId++,
      name: "Navy Wool",
      type: "Wool",
      color: "Navy",
      pattern: "Solid",
      price: 18000, // $180.00 additional
      image: "https://images.unsplash.com/photo-1581513243061-c455bfb589be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      available: true
    };
    this.fabrics.set(navyWool.id, navyWool);
    
    const charcoalTwill: Fabric = {
      id: this.currentFabricId++,
      name: "Charcoal Twill",
      type: "Wool",
      color: "Charcoal",
      pattern: "Twill",
      price: 16000, // $160.00 additional
      image: "https://images.unsplash.com/photo-1598099947351-3f13bf0b8056?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      available: true
    };
    this.fabrics.set(charcoalTwill.id, charcoalTwill);
    
    const brownHerringbone: Fabric = {
      id: this.currentFabricId++,
      name: "Brown Herringbone",
      type: "Wool",
      color: "Brown",
      pattern: "Herringbone",
      price: 19000, // $190.00 additional
      image: "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      available: true
    };
    this.fabrics.set(brownHerringbone.id, brownHerringbone);
    
    // Sample custom design
    const customDesign: CustomDesign = {
      id: this.currentDesignId++,
      userId: user.id,
      productId: executiveSuit.id,
      fabricId: navyWool.id,
      details: {
        lapelStyle: "Peak",
        vents: "Side",
        buttons: "Two",
        monogram: "JD",
        monogramPlacement: "Cuff"
      },
      name: "Navy Executive Suit",
      createdAt: new Date()
    };
    this.customDesigns.set(customDesign.id, customDesign);
    
    // Sample appointment
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    
    const appointment: Appointment = {
      id: this.currentAppointmentId++,
      userId: user.id,
      date: futureDate,
      type: "Initial Consultation",
      status: "scheduled",
      notes: "Client interested in the Executive Collection",
      location: "London Boutique",
      createdAt: new Date()
    };
    this.appointments.set(appointment.id, appointment);
    
    // Sample order
    const order: Order = {
      id: this.currentOrderId++,
      userId: user.id,
      total: 279900, // $2,799.00 (suit + premium fabric)
      status: "in_progress",
      designId: customDesign.id,
      notes: "Rush order for client's upcoming business trip",
      createdAt: new Date(),
      completionDate: new Date(new Date().setDate(new Date().getDate() + 30))
    };
    this.orders.set(order.id, order);
    
    // Sample collections
    const executiveCollection: Collection = {
      id: this.currentCollectionId++,
      name: "The Executive",
      description: "Precision-cut suits that command presence in any boardroom, with signature details that speak of success.",
      tagline: "Essential elegance for the modern leader",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    };
    this.collections.set(executiveCollection.id, executiveCollection);
    
    const heritageCollection: Collection = {
      id: this.currentCollectionId++,
      name: "The Heritage",
      description: "Drawing from centuries of tailoring tradition, these pieces honor the past while embracing contemporary refinement.",
      tagline: "Timeless silhouettes with modern sensibility",
      image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    };
    this.collections.set(heritageCollection.id, heritageCollection);
    
    const sovereignCollection: Collection = {
      id: this.currentCollectionId++,
      name: "The Sovereign",
      description: "When only extraordinary will do, these meticulously crafted evening and ceremonial garments ensure you command the room.",
      tagline: "Ceremonial splendor for life's grandest moments",
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    };
    this.collections.set(sovereignCollection.id, sovereignCollection);
    
    // Sample testimonials
    const testimonial1: Testimonial = {
      id: this.currentTestimonialId++,
      name: "Rahul Mehta",
      location: "Mumbai, India",
      testimonial: "The Emperor's attention to detail is unmatched. My wedding sherwani was beyond what I could have envisioned, with personal touches that made it truly one-of-a-kind.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      featured: true
    };
    this.testimonials.set(testimonial1.id, testimonial1);
    
    const testimonial2: Testimonial = {
      id: this.currentTestimonialId++,
      name: "James Richardson",
      location: "London, UK",
      testimonial: "From the initial consultation to the final fitting, The Emperor experience is exceptional. Their expert tailors guided me toward suit details I would never have considered, resulting in a garment that feels uniquely mine.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      featured: true
    };
    this.testimonials.set(testimonial2.id, testimonial2);
    
    const testimonial3: Testimonial = {
      id: this.currentTestimonialId++,
      name: "David Chen",
      location: "Singapore",
      testimonial: "When you wear a suit from The Emperor, you immediately understand the difference. The fabric, the construction, the way it moves with you—it's an investment in how you present yourself to the world.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      featured: true
    };
    this.testimonials.set(testimonial3.id, testimonial3);
  }
}

export const storage = new MemStorage();
