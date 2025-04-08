CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"date" date NOT NULL,
	"time" text NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"location" text DEFAULT 'London Boutique' NOT NULL,
	"design_id" integer,
	"stylist_id" integer,
	"duration" integer DEFAULT 60,
	"is_virtual" boolean DEFAULT false,
	"virtual_meeting_url" text,
	"reminder_sent" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"cart_id" integer NOT NULL,
	"product_id" integer,
	"custom_design_id" integer,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" integer NOT NULL,
	"total" integer NOT NULL,
	"options" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"session_id" text,
	"subtotal" integer DEFAULT 0 NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"tax" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"coupon_code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "collection_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"collection_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"tagline" text,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"banner_image" text,
	"season" text,
	"year" text,
	"featured" boolean DEFAULT false NOT NULL,
	"showcase_model_3d" text,
	"showcase_settings" jsonb,
	"sort_order" integer DEFAULT 0,
	"active" boolean DEFAULT true NOT NULL,
	"launch_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "collections_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "custom_designs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"fabric_id" integer,
	"details" jsonb NOT NULL,
	"measurement_id" integer,
	"name" text NOT NULL,
	"preview_image" text,
	"model_3d_state" jsonb,
	"price" integer,
	"is_public" boolean DEFAULT false,
	"is_favorite" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fabrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"color" text NOT NULL,
	"pattern" text,
	"price" integer NOT NULL,
	"image" text,
	"texture_map" text,
	"normal_map" text,
	"roughness_map" text,
	"displacement_map" text,
	"composition" text,
	"weight" text,
	"origin" text,
	"available" boolean DEFAULT true NOT NULL,
	"lead_time" integer,
	"min_quantity" integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE "measurements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" text DEFAULT 'Default Measurements' NOT NULL,
	"chest" real,
	"waist" real,
	"hips" real,
	"inseam" real,
	"shoulders" real,
	"sleeve" real,
	"neck" real,
	"bicep" real,
	"wrist" real,
	"thigh" real,
	"height" real,
	"weight" real,
	"body_type" text,
	"posture" text,
	"notes" text,
	"scan_data" jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_default" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer,
	"custom_design_id" integer,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" integer NOT NULL,
	"fabric_cost" integer DEFAULT 0,
	"tailoring_cost" integer DEFAULT 0,
	"extras_cost" integer DEFAULT 0,
	"subtotal" integer NOT NULL,
	"options" jsonb,
	"status" text DEFAULT 'processing' NOT NULL,
	"estimated_ship_date" date
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" text NOT NULL,
	"user_id" integer NOT NULL,
	"subtotal" integer NOT NULL,
	"tax" integer DEFAULT 0 NOT NULL,
	"shipping" integer DEFAULT 0 NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"payment_status" text DEFAULT 'pending' NOT NULL,
	"payment_method" text,
	"payment_id" text,
	"currency" text DEFAULT 'USD' NOT NULL,
	"shipping_address" jsonb,
	"billing_address" jsonb,
	"tracking_number" text,
	"notes" text,
	"shopify_order_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	CONSTRAINT "orders_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image" text,
	"slug" text NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"sort_order" integer DEFAULT 0,
	"parent_id" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "product_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"category_id" integer NOT NULL,
	"base_price" integer NOT NULL,
	"sale_price" integer,
	"sku" text NOT NULL,
	"slug" text NOT NULL,
	"stock" integer DEFAULT 0,
	"image" text,
	"gallery_images" jsonb,
	"features" text[],
	"model_3d_url" text,
	"textures" jsonb,
	"dimensions" jsonb,
	"customization_options" jsonb,
	"tags" text[],
	"meta_title" text,
	"meta_description" text,
	"featured" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"shopify_product_id" text,
	CONSTRAINT "products_sku_unique" UNIQUE("sku"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "shopify_sync" (
	"id" serial PRIMARY KEY NOT NULL,
	"entity_type" text NOT NULL,
	"local_id" integer NOT NULL,
	"shopify_id" text NOT NULL,
	"last_synced" timestamp DEFAULT now() NOT NULL,
	"sync_status" text DEFAULT 'success',
	"error_message" text
);
--> statement-breakpoint
CREATE TABLE "store_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"virtual_store_id" integer NOT NULL,
	"date" date NOT NULL,
	"visitors" integer DEFAULT 0,
	"avg_session_duration" integer DEFAULT 0,
	"interaction_rate" real DEFAULT 0,
	"conversion_rate" real DEFAULT 0,
	"popular_products" jsonb,
	"heatmap_data" jsonb,
	"device_breakdown" jsonb
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text,
	"testimonial" text NOT NULL,
	"image" text,
	"rating" integer DEFAULT 5,
	"featured" boolean DEFAULT false NOT NULL,
	"product_id" integer,
	"collection_id" integer,
	"verification_status" text DEFAULT 'verified',
	"display_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text,
	"membership_tier" text DEFAULT 'standard' NOT NULL,
	"avatar_url" text,
	"preferences" jsonb,
	"shopify_customer_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "virtual_stores" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"scene_3d_url" text NOT NULL,
	"layout_config" jsonb NOT NULL,
	"active_collection_id" integer,
	"theme" text DEFAULT 'ottoman-luxury',
	"lighting_preset" text DEFAULT 'warm',
	"interactive_elements" jsonb,
	"product_placements" jsonb,
	"ambient_audio" text,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_design_id_custom_designs_id_fk" FOREIGN KEY ("design_id") REFERENCES "public"."custom_designs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_custom_design_id_custom_designs_id_fk" FOREIGN KEY ("custom_design_id") REFERENCES "public"."custom_designs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_designs" ADD CONSTRAINT "custom_designs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_designs" ADD CONSTRAINT "custom_designs_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_designs" ADD CONSTRAINT "custom_designs_fabric_id_fabrics_id_fk" FOREIGN KEY ("fabric_id") REFERENCES "public"."fabrics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_designs" ADD CONSTRAINT "custom_designs_measurement_id_measurements_id_fk" FOREIGN KEY ("measurement_id") REFERENCES "public"."measurements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_custom_design_id_custom_designs_id_fk" FOREIGN KEY ("custom_design_id") REFERENCES "public"."custom_designs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_analytics" ADD CONSTRAINT "store_analytics_virtual_store_id_virtual_stores_id_fk" FOREIGN KEY ("virtual_store_id") REFERENCES "public"."virtual_stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "virtual_stores" ADD CONSTRAINT "virtual_stores_active_collection_id_collections_id_fk" FOREIGN KEY ("active_collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;