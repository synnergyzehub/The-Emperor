import { db } from "../server/db";
import {
  users,
  productCategories,
  products,
  fabrics,
  collections,
  testimonials
} from "../shared/schema";

async function seedDatabase() {
  console.log("Starting database seeding...");
  
  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log("Clearing existing data...");
  await db.delete(testimonials);
  await db.delete(products);
  await db.delete(productCategories);
  await db.delete(fabrics);
  await db.delete(collections);
  
  // Create product categories
  console.log("Creating product categories...");
  const [formalSuits] = await db.insert(productCategories).values({
    name: "Formal Suits",
    description: "Premium bespoke formal suits crafted with the finest fabrics and Ottoman-inspired details",
    image: "/assets/701CE6B1-F57D-4291-9043-632927C409D2.png",
    slug: "formal-suits",
    metaTitle: "Premium Formal Suits | The Emperor",
    metaDescription: "Discover our exquisite collection of handcrafted formal suits with Ottoman heritage details",
    sortOrder: 1,
    isActive: true
  }).returning();
  
  const [formalShirts] = await db.insert(productCategories).values({
    name: "Formal Shirts",
    description: "Luxury formal shirts designed to complement our bespoke suits",
    image: "/assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png",
    slug: "formal-shirts",
    metaTitle: "Premium Formal Shirts | The Emperor",
    metaDescription: "Explore our collection of sophisticated formal shirts crafted from the finest fabrics",
    sortOrder: 2,
    isActive: true
  }).returning();
  
  const [formalAccessories] = await db.insert(productCategories).values({
    name: "Formal Accessories",
    description: "Exquisite accessories to complete your formal attire",
    image: "/assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png",
    slug: "formal-accessories",
    metaTitle: "Luxury Accessories | The Emperor",
    metaDescription: "Discover our collection of premium formal accessories crafted with Ottoman-inspired details",
    sortOrder: 3,
    isActive: true
  }).returning();
  
  // Add fabrics
  console.log("Adding fabrics...");
  const [premiumWool] = await db.insert(fabrics).values({
    name: "Premium Wool",
    type: "Wool",
    color: "Navy",
    pattern: "Solid",
    price: 15000, // $150 additional
    image: "/assets/fabrics/premium-wool.jpg",
    textureMap: "/assets/fabrics/textures/premium-wool-texture.jpg",
    composition: "100% Premium Wool",
    weight: "280g",
    origin: "Italy",
    available: true,
    leadTime: 14,
    minQuantity: 1
  }).returning();
  
  const [cashmereBlend] = await db.insert(fabrics).values({
    name: "Cashmere Blend",
    type: "Cashmere Wool",
    color: "Charcoal",
    pattern: "Subtle Herringbone",
    price: 25000, // $250 additional
    image: "/assets/fabrics/cashmere-blend.jpg",
    textureMap: "/assets/fabrics/textures/cashmere-blend-texture.jpg",
    composition: "85% Wool, 15% Cashmere",
    weight: "260g",
    origin: "Scotland",
    available: true,
    leadTime: 21,
    minQuantity: 1
  }).returning();
  
  const [ottomanSilk] = await db.insert(fabrics).values({
    name: "Ottoman Silk",
    type: "Silk",
    color: "Royal Blue",
    pattern: "Ottoman Geometric",
    price: 30000, // $300 additional
    image: "/assets/fabrics/ottoman-silk.jpg",
    textureMap: "/assets/fabrics/textures/ottoman-silk-texture.jpg",
    composition: "100% Pure Silk",
    weight: "180g",
    origin: "Turkey",
    available: true,
    leadTime: 28,
    minQuantity: 1
  }).returning();
  
  // Add products
  console.log("Adding products...");
  
  // Formal Suits
  await db.insert(products).values({
    name: "Imperial Sultan Suit",
    description: "Our signature three-piece suit featuring exquisite Ottoman-inspired gold embroidery details on premium wool. Masterfully tailored with a contemporary fit while honoring heritage craftsmanship.",
    basePrice: 199500, // $1,995
    categoryId: formalSuits.id,
    image: "/assets/701CE6B1-F57D-4291-9043-632927C409D2.png",
    sku: "FS-IMPERIAL-001",
    slug: "imperial-sultan-suit",
    stock: 0, // Bespoke item
    galleryImages: JSON.stringify([
      "/assets/product-gallery/imperial-suit-1.jpg",
      "/assets/product-gallery/imperial-suit-2.jpg",
      "/assets/product-gallery/imperial-suit-3.jpg"
    ]),
    features: ["Hand-embroidered details", "Ottoman-inspired patterns", "Premium horn buttons", "Handcrafted in our atelier", "Includes waistcoat"],
    model3dUrl: "/assets/3d-models/imperial-sultan-suit.glb",
    textures: JSON.stringify({
      baseColor: "/assets/3d-models/textures/suit-base-color.jpg",
      normal: "/assets/3d-models/textures/suit-normal.jpg",
      roughness: "/assets/3d-models/textures/suit-roughness.jpg"
    }),
    dimensions: JSON.stringify({
      chest: { min: 36, max: 50 },
      waist: { min: 30, max: 46 },
      sleeve: { min: 32, max: 38 }
    }),
    customizationOptions: JSON.stringify({
      lapelStyles: ["Notch", "Peak", "Shawl"],
      ventStyles: ["Center", "Side", "None"],
      buttonStyles: ["Two Button", "Three Button", "Double Breasted"],
      embroideryOptions: ["Gold Pattern", "Silver Pattern", "Monogram"]
    }),
    tags: ["Premium", "Formal", "Suit", "Ottoman", "Embroidered"],
    metaTitle: "Imperial Sultan Suit | The Emperor",
    metaDescription: "Our signature bespoke three-piece suit featuring exquisite Ottoman-inspired embroidery details on premium wool.",
    featured: true,
    isActive: true,
  });
  
  await db.insert(products).values({
    name: "Heritage Tuxedo",
    description: "An exceptional formal tuxedo crafted from the finest super 150s wool with satin peak lapels. Perfect for the most distinguished occasions with subtle Ottoman design elements.",
    basePrice: 219500, // $2,195
    categoryId: formalSuits.id,
    image: "/assets/16476EBE-65A6-4589-817D-75AE5DC301E0.png",
    sku: "FS-HERITAGE-002",
    slug: "heritage-tuxedo",
    stock: 0, // Bespoke item
    galleryImages: JSON.stringify([
      "/assets/product-gallery/heritage-tuxedo-1.jpg",
      "/assets/product-gallery/heritage-tuxedo-2.jpg"
    ]),
    features: ["Super 150s wool", "Satin peak lapels", "Ottoman-inspired lining", "Hand-finished details", "Formal trousers with satin stripe"],
    model3dUrl: "/assets/3d-models/heritage-tuxedo.glb",
    textures: JSON.stringify({
      baseColor: "/assets/3d-models/textures/tuxedo-base-color.jpg",
      normal: "/assets/3d-models/textures/tuxedo-normal.jpg",
      roughness: "/assets/3d-models/textures/tuxedo-roughness.jpg"
    }),
    dimensions: JSON.stringify({
      chest: { min: 36, max: 50 },
      waist: { min: 30, max: 46 },
      sleeve: { min: 32, max: 38 }
    }),
    customizationOptions: JSON.stringify({
      lapelStyles: ["Peak", "Shawl"],
      ventStyles: ["Center", "None"],
      buttonStyles: ["One Button", "Double Breasted"],
      finishOptions: ["Satin", "Grosgrain"]
    }),
    tags: ["Premium", "Formal", "Tuxedo", "Ottoman", "Black Tie"],
    metaTitle: "Heritage Tuxedo | The Emperor",
    metaDescription: "An exceptional formal tuxedo crafted from the finest super 150s wool with satin peak lapels and Ottoman design elements.",
    featured: true,
    isActive: true,
  });
  
  await db.insert(products).values({
    name: "Royal Overcoat",
    description: "The ultimate expression of luxury, our Royal Overcoat is crafted from premium cashmere blend with subtle Ottoman-inspired embroidery. The perfect outer layer for formal occasions.",
    basePrice: 259500, // $2,595
    categoryId: formalSuits.id,
    image: "/assets/16476EBE-65A6-4589-817D-75AE5DC301E0.png",
    sku: "FS-ROYAL-003",
    slug: "royal-overcoat",
    stock: 0, // Bespoke item
    galleryImages: JSON.stringify([
      "/assets/product-gallery/royal-overcoat-1.jpg",
      "/assets/product-gallery/royal-overcoat-2.jpg"
    ]),
    features: ["Premium cashmere blend", "Ottoman-inspired embroidery", "Luxury satin lining", "Hidden interior pockets", "Horn buttons"],
    model3dUrl: "/assets/3d-models/royal-overcoat.glb",
    textures: JSON.stringify({
      baseColor: "/assets/3d-models/textures/overcoat-base-color.jpg",
      normal: "/assets/3d-models/textures/overcoat-normal.jpg",
      roughness: "/assets/3d-models/textures/overcoat-roughness.jpg"
    }),
    dimensions: JSON.stringify({
      chest: { min: 38, max: 52 },
      length: { min: 40, max: 48 },
      sleeve: { min: 32, max: 38 }
    }),
    customizationOptions: JSON.stringify({
      collarStyles: ["Notch", "Peak", "Ulster"],
      backStyles: ["Plain", "Belted", "Vented"],
      embroideryOptions: ["Gold Pattern", "Silver Pattern", "None"]
    }),
    tags: ["Premium", "Formal", "Overcoat", "Ottoman", "Cashmere"],
    metaTitle: "Royal Overcoat | The Emperor",
    metaDescription: "The ultimate expression of luxury, our Royal Overcoat is crafted from premium cashmere blend with Ottoman-inspired details.",
    featured: true,
    isActive: true,
  });
  
  // Formal Shirts
  await db.insert(products).values({
    name: "Imperial Dress Shirt",
    description: "A masterpiece of textile craftsmanship, our Imperial Dress Shirt is made from the finest Egyptian cotton with mother-of-pearl buttons and Ottoman-inspired cuff details.",
    basePrice: 32500, // $325
    categoryId: formalShirts.id,
    image: "/assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png",
    sku: "FSH-IMPERIAL-001",
    slug: "imperial-dress-shirt",
    stock: 5,
    galleryImages: JSON.stringify([
      "/assets/product-gallery/dress-shirt-1.jpg",
      "/assets/product-gallery/dress-shirt-2.jpg"
    ]),
    features: ["120s Egyptian cotton", "Mother-of-pearl buttons", "Ottoman-inspired cuff details", "French cuffs", "Hand-finished collar"],
    model3dUrl: "/assets/3d-models/imperial-dress-shirt.glb",
    textures: JSON.stringify({
      baseColor: "/assets/3d-models/textures/dress-shirt-base-color.jpg",
      normal: "/assets/3d-models/textures/dress-shirt-normal.jpg",
      roughness: "/assets/3d-models/textures/dress-shirt-roughness.jpg"
    }),
    dimensions: JSON.stringify({
      neck: { min: 14, max: 18.5 },
      sleeve: { min: 32, max: 38 }
    }),
    customizationOptions: JSON.stringify({
      collarStyles: ["Spread", "Cutaway", "Wing"],
      cuffStyles: ["French", "Double", "Ottoman Embroidered"],
      monogramPositions: ["Cuff", "Chest", "None"]
    }),
    tags: ["Premium", "Formal", "Shirt", "Ottoman", "Egyptian Cotton"],
    metaTitle: "Imperial Dress Shirt | The Emperor",
    metaDescription: "A masterpiece of textile craftsmanship, our Imperial Dress Shirt is made from the finest Egyptian cotton with Ottoman-inspired details.",
    featured: true,
    isActive: true,
  });
  
  // Add a collection
  console.log("Adding collections...");
  await db.insert(collections).values({
    name: "Ottoman Heritage",
    description: "Our prestigious Ottoman Heritage collection combines centuries-old craftsmanship with modern tailoring techniques. Each piece features exquisite embroidery inspired by Ottoman imperial designs.",
    tagline: "A Legacy of Imperial Elegance",
    slug: "ottoman-heritage",
    image: "/assets/701CE6B1-F57D-4291-9043-632927C409D2.png",
    bannerImage: "/assets/collections/ottoman-heritage-banner.jpg",
    season: "Spring/Summer",
    year: "2025",
    featured: true,
    showcaseModel3d: "/assets/3d-models/collections/ottoman-heritage-showcase.glb",
    showcaseSettings: JSON.stringify({
      lighting: "warm",
      background: "imperial-palace",
      cameraPositions: ["front", "detail", "overview"]
    }),
    sortOrder: 1,
    active: true,
    launchDate: "2025-03-15",
  });
  
  // Add testimonials
  console.log("Adding testimonials...");
  await db.insert(testimonials).values({
    name: "Ahmed K.",
    location: "Dubai, UAE",
    testimonial: "The Imperial Sultan Suit exceeded all my expectations. The Ottoman-inspired details are simply exquisite, and the fit is impeccable. I received countless compliments at my wedding.",
    image: null,
    rating: 5,
    featured: true,
    verificationStatus: "verified",
    displayOrder: 1,
  });
  
  await db.insert(testimonials).values({
    name: "Jonathan R.",
    location: "London, UK",
    testimonial: "The attention to detail in my Heritage Tuxedo is remarkable. The Ottoman embroidery elements make it truly unique while maintaining the classic elegance required for formal events.",
    image: null,
    rating: 5,
    featured: true,
    verificationStatus: "verified",
    displayOrder: 2,
  });
  
  console.log("Database seeding completed successfully!");
}

// Run the seeding function
seedDatabase()
  .catch(error => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Closing database connection...");
    process.exit(0);
  });