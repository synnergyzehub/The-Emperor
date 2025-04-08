import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real, date, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model with extended fields for premium memberships
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  membershipTier: text("membership_tier").default("standard").notNull(), // standard, gold, platinum
  avatarUrl: text("avatar_url"),
  preferences: jsonb("preferences"), // User preferences as JSON
  shopifyCustomerId: text("shopify_customer_id"), // Integration with Shopify
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, lastLoginAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Enhanced customer measurement model for better fitting
export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").default("Default Measurements").notNull(), // Allow multiple sets of measurements
  chest: real("chest"),
  waist: real("waist"),
  hips: real("hips"),
  inseam: real("inseam"),
  shoulders: real("shoulders"),
  sleeve: real("sleeve"),
  neck: real("neck"),
  bicep: real("bicep"),
  wrist: real("wrist"),
  thigh: real("thigh"),
  height: real("height"),
  weight: real("weight"),
  bodyType: text("body_type"), // Athletic, slim, etc.
  posture: text("posture"), // Posture description
  notes: text("notes"),
  scanData: jsonb("scan_data"), // For 3D body scans
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isDefault: boolean("is_default").default(true),
});

export const insertMeasurementSchema = createInsertSchema(measurements).omit({ id: true, updatedAt: true });
export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
export type Measurement = typeof measurements.$inferSelect;

// Product categories with SEO optimization
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  slug: text("slug").notNull().unique(), // URL-friendly version of the name
  metaTitle: text("meta_title"), // SEO metadata
  metaDescription: text("meta_description"), // SEO metadata
  sortOrder: integer("sort_order").default(0),
  parentId: integer("parent_id").references(() => productCategories.id), // For nested categories
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertProductCategorySchema = createInsertSchema(productCategories).omit({ id: true });
export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

// Products with 3D model support
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull().references(() => productCategories.id),
  basePrice: integer("base_price").notNull(), // Base price in cents
  salePrice: integer("sale_price"), // Sale price if applicable
  sku: text("sku").notNull().unique(), // Stock keeping unit
  slug: text("slug").notNull().unique(), // URL-friendly version of the name
  stock: integer("stock").default(0), // For ready-to-wear items
  image: text("image"),
  galleryImages: jsonb("gallery_images"), // Array of additional images
  features: text("features").array(),
  model3dUrl: text("model_3d_url"), // URL to 3D model for immersive view
  textures: jsonb("textures"), // Texture maps for 3D rendering
  dimensions: jsonb("dimensions"), // Product dimensions
  customizationOptions: jsonb("customization_options"), // Available customization options
  tags: text("tags").array(), // Tags for filtering
  metaTitle: text("meta_title"), // SEO metadata
  metaDescription: text("meta_description"), // SEO metadata
  featured: boolean("featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  shopifyProductId: text("shopify_product_id"), // Integration with Shopify
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Enhanced fabrics with 3D texture maps
export const fabrics = pgTable("fabrics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  color: text("color").notNull(),
  pattern: text("pattern"),
  price: integer("price").notNull(), // Additional price in cents
  image: text("image"),
  textureMap: text("texture_map"), // Base color texture
  normalMap: text("normal_map"), // Normal map for 3D rendering
  roughnessMap: text("roughness_map"), // Roughness map for 3D rendering
  displacementMap: text("displacement_map"), // Displacement map for 3D rendering
  composition: text("composition"), // e.g. "100% wool"
  weight: text("weight"), // Fabric weight
  origin: text("origin"), // Country of origin
  available: boolean("available").default(true).notNull(),
  leadTime: integer("lead_time"), // Lead time in days
  minQuantity: integer("min_quantity").default(1), // Minimum order quantity
});

export const insertFabricSchema = createInsertSchema(fabrics).omit({ id: true });
export type InsertFabric = z.infer<typeof insertFabricSchema>;
export type Fabric = typeof fabrics.$inferSelect;

// Custom designs with 3D visualization data
export const customDesigns = pgTable("custom_designs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  fabricId: integer("fabric_id").references(() => fabrics.id),
  details: jsonb("details").notNull(), // Customization details
  measurementId: integer("measurement_id").references(() => measurements.id),
  name: text("name").notNull(),
  previewImage: text("preview_image"), // 2D preview of the design
  model3dState: jsonb("model_3d_state"), // Saved state of the 3D model
  price: integer("price"), // Calculated price in cents
  isPublic: boolean("is_public").default(false), // Whether this design can be showcased
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCustomDesignSchema = createInsertSchema(customDesigns).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCustomDesign = z.infer<typeof insertCustomDesignSchema>;
export type CustomDesign = typeof customDesigns.$inferSelect;

// Shopping cart for e-commerce
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"), // For guest shopping
  subtotal: integer("subtotal").default(0).notNull(), // Subtotal in cents
  discount: integer("discount").default(0).notNull(), // Discount in cents
  tax: integer("tax").default(0).notNull(), // Tax in cents
  total: integer("total").default(0).notNull(), // Total in cents
  couponCode: text("coupon_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"), // Cart expiration
});

export const insertCartSchema = createInsertSchema(carts).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCart = z.infer<typeof insertCartSchema>;
export type Cart = typeof carts.$inferSelect;

// Cart items
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").notNull().references(() => carts.id),
  productId: integer("product_id").references(() => products.id),
  customDesignId: integer("custom_design_id").references(() => customDesigns.id),
  quantity: integer("quantity").default(1).notNull(),
  unitPrice: integer("unit_price").notNull(), // Price per item in cents
  total: integer("total").notNull(), // Total for item in cents
  options: jsonb("options"), // Custom options
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Enhanced appointments with more details
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: date("date").notNull(),
  time: text("time").notNull(), // Time slot
  type: text("type").notNull(), // Initial fitting, measurements, etc.
  status: text("status").default("scheduled").notNull(),
  notes: text("notes"),
  location: text("location").default("London Boutique").notNull(),
  designId: integer("design_id").references(() => customDesigns.id), // For design consultations
  stylistId: integer("stylist_id"), // Assigned stylist
  duration: integer("duration").default(60), // Duration in minutes
  isVirtual: boolean("is_virtual").default(false), // Virtual or in-person
  virtualMeetingUrl: text("virtual_meeting_url"), // URL for virtual meetings
  reminderSent: boolean("reminder_sent").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Enhanced orders with detailed order processing
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(), // Unique order number
  userId: integer("user_id").notNull().references(() => users.id),
  subtotal: integer("subtotal").notNull(), // Subtotal in cents
  tax: integer("tax").default(0).notNull(), // Tax in cents
  shipping: integer("shipping").default(0).notNull(), // Shipping cost in cents
  discount: integer("discount").default(0).notNull(), // Discount in cents
  total: integer("total").notNull(), // Total in cents
  status: text("status").default("pending").notNull(),
  paymentStatus: text("payment_status").default("pending").notNull(),
  paymentMethod: text("payment_method"),
  paymentId: text("payment_id"), // Payment processor ID
  currency: text("currency").default("USD").notNull(),
  shippingAddress: jsonb("shipping_address"),
  billingAddress: jsonb("billing_address"),
  trackingNumber: text("tracking_number"),
  notes: text("notes"),
  shopifyOrderId: text("shopify_order_id"), // Integration with Shopify
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, updatedAt: true, completedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items with detailed pricing breakdown
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  customDesignId: integer("custom_design_id").references(() => customDesigns.id),
  quantity: integer("quantity").default(1).notNull(),
  unitPrice: integer("unit_price").notNull(), // Unit price in cents
  fabricCost: integer("fabric_cost").default(0), // Fabric cost in cents
  tailoringCost: integer("tailoring_cost").default(0), // Tailoring cost in cents
  extrasCost: integer("extras_cost").default(0), // Cost for extras in cents
  subtotal: integer("subtotal").notNull(), // Subtotal for this item in cents
  options: jsonb("options"), // Custom options
  status: text("status").default("processing").notNull(),
  estimatedShipDate: date("estimated_ship_date"),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Enhanced collections with 3D showcase support
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  tagline: text("tagline"),
  slug: text("slug").notNull().unique(), // URL-friendly version of the name
  image: text("image").notNull(),
  bannerImage: text("banner_image"),
  season: text("season"), // Spring/Summer, Fall/Winter, etc.
  year: text("year"), // Year of the collection
  featured: boolean("featured").default(false).notNull(),
  showcaseModel3d: text("showcase_model_3d"), // 3D model for collection showcase
  showcaseSettings: jsonb("showcase_settings"), // Settings for 3D showcase
  sortOrder: integer("sort_order").default(0),
  active: boolean("active").default(true).notNull(),
  launchDate: date("launch_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCollectionSchema = createInsertSchema(collections).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Collection = typeof collections.$inferSelect;

// Collection products junction table
export const collectionProducts = pgTable("collection_products", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").notNull().references(() => collections.id),
  productId: integer("product_id").notNull().references(() => products.id),
  sortOrder: integer("sort_order").default(0),
});

export const insertCollectionProductSchema = createInsertSchema(collectionProducts).omit({ id: true });
export type InsertCollectionProduct = z.infer<typeof insertCollectionProductSchema>;
export type CollectionProduct = typeof collectionProducts.$inferSelect;

// Testimonials with enhanced metadata
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location"),
  testimonial: text("testimonial").notNull(),
  image: text("image"),
  rating: integer("rating").default(5), // 1-5 star rating
  featured: boolean("featured").default(false).notNull(),
  productId: integer("product_id").references(() => products.id), // Related product if any
  collectionId: integer("collection_id").references(() => collections.id), // Related collection if any
  verificationStatus: text("verification_status").default("verified"),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true, createdAt: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Virtual store configuration for 3D immersive experience
export const virtualStores = pgTable("virtual_stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  scene3dUrl: text("scene_3d_url").notNull(), // URL to the 3D scene model
  layoutConfig: jsonb("layout_config").notNull(), // Layout configuration
  activeCollectionId: integer("active_collection_id").references(() => collections.id),
  theme: text("theme").default("ottoman-luxury"),
  lightingPreset: text("lighting_preset").default("warm"),
  interactiveElements: jsonb("interactive_elements"), // Interactive elements configuration
  productPlacements: jsonb("product_placements"), // Product placement data
  ambientAudio: text("ambient_audio"), // Background audio
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertVirtualStoreSchema = createInsertSchema(virtualStores).omit({ id: true, updatedAt: true });
export type InsertVirtualStore = z.infer<typeof insertVirtualStoreSchema>;
export type VirtualStore = typeof virtualStores.$inferSelect;

// Store visitor analytics
export const storeAnalytics = pgTable("store_analytics", {
  id: serial("id").primaryKey(),
  virtualStoreId: integer("virtual_store_id").notNull().references(() => virtualStores.id),
  date: date("date").notNull(),
  visitors: integer("visitors").default(0),
  avgSessionDuration: integer("avg_session_duration").default(0), // In seconds
  interactionRate: real("interaction_rate").default(0), // Percentage
  conversionRate: real("conversion_rate").default(0), // Percentage
  popularProducts: jsonb("popular_products"), // Most viewed/interacted products
  heatmapData: jsonb("heatmap_data"), // User movement heatmap
  deviceBreakdown: jsonb("device_breakdown"), // Analytics by device type
});

export const insertStoreAnalyticsSchema = createInsertSchema(storeAnalytics).omit({ id: true });
export type InsertStoreAnalytics = z.infer<typeof insertStoreAnalyticsSchema>;
export type StoreAnalytics = typeof storeAnalytics.$inferSelect;

// Shopify integration
export const shopifySync = pgTable("shopify_sync", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(), // product, order, customer, etc.
  localId: integer("local_id").notNull(), // ID in our database
  shopifyId: text("shopify_id").notNull(), // ID in Shopify
  lastSynced: timestamp("last_synced").defaultNow().notNull(),
  syncStatus: text("sync_status").default("success"),
  errorMessage: text("error_message"),
});

export const insertShopifySyncSchema = createInsertSchema(shopifySync).omit({ id: true });
export type InsertShopifySync = z.infer<typeof insertShopifySyncSchema>;
export type ShopifySync = typeof shopifySync.$inferSelect;
