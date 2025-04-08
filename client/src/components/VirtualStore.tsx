import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Eye, ExternalLink, Info, Layers } from "lucide-react";

// Import Ottoman-inspired background patterns from assets
import ottomanPattern1 from "@assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png";
import ottomanPattern2 from "@assets/AE2F80C3-DB76-4532-8248-82292414882D.png";
import storefront from "@assets/16476EBE-65A6-4589-817D-75AE5DC301E0.png";
import displayRoom from "@assets/701CE6B1-F57D-4291-9043-632927C409D2.png";
import emperorLogo from "@assets/9E56EEEE-7167-465D-B51A-6DBE47E7A2E9.png";

// Demo fabrics
const demoFabrics = [
  {
    id: 1,
    name: "Premium Ottoman Wool",
    type: "Wool",
    color: "Navy",
    pattern: "Solid",
    price: 19900, // in cents
    image: null,
    origin: "Turkey",
    composition: "100% Merino Wool"
  },
  {
    id: 2,
    name: "Imperial Silk Blend",
    type: "Silk Blend",
    color: "Charcoal",
    pattern: "Subtle Herringbone",
    price: 24900, // in cents
    image: null,
    origin: "Italy",
    composition: "70% Wool, 30% Silk"
  },
  {
    id: 3,
    name: "Sultan's Twill",
    type: "Twill",
    color: "Dark Blue",
    pattern: "Twill",
    price: 18900, // in cents
    image: null,
    origin: "England",
    composition: "100% Pure Wool"
  },
  {
    id: 4,
    name: "Heritage Cashmere",
    type: "Cashmere Blend",
    color: "Black",
    pattern: "Solid",
    price: 29900, // in cents
    image: null,
    origin: "Scotland",
    composition: "85% Wool, 15% Cashmere"
  },
  {
    id: 5,
    name: "Royal Ottoman Silk",
    type: "Silk",
    color: "Gold Accent",
    pattern: "Ottoman Pattern",
    price: 34900, // in cents
    image: null,
    origin: "Turkey",
    composition: "100% Pure Silk"
  },
  {
    id: 6,
    name: "Sovereign Velvet",
    type: "Velvet",
    color: "Midnight Blue",
    pattern: "Solid",
    price: 27900, // in cents
    image: null,
    origin: "Italy",
    composition: "95% Cotton, 5% Silk"
  }
];

// Fabric transparency component to show fabric cost
const FabricTransparency = ({ fabric }: { fabric: any }) => {
  return (
    <div className="bg-navy-900/10 p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-2">Fabric Breakdown</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span>Material:</span>
        <span className="font-medium">{fabric.name}</span>
        
        <span>Type:</span>
        <span className="font-medium">{fabric.type}</span>
        
        <span>Origin:</span>
        <span className="font-medium">{fabric.origin || "Premium Import"}</span>
        
        <span>Composition:</span>
        <span className="font-medium">{fabric.composition || "100% Premium Material"}</span>
        
        <span className="text-gold-600 font-semibold">Cost:</span>
        <span className="text-gold-600 font-semibold">${(fabric.price/100).toFixed(2)}</span>
      </div>
    </div>
  );
};

// Product detail view with transparent pricing
const ProductDetail = ({ product, onBack }: { product: any, onBack: () => void }) => {
  const [selectedFabric, setSelectedFabric] = useState<any>(null);
  const [showPricing, setShowPricing] = useState(false);
  
  // Fetch available fabrics for this product
  const { data: fabrics, isLoading: fabricsLoading } = useQuery({
    queryKey: ['/api/fabrics', { available: true }],
    staleTime: 60000,
  });

  return (
    <div className="relative">
      <Button variant="outline" onClick={onBack} className="absolute top-0 left-0 z-10">
        Back to Collection
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="relative">
          {/* 3D Model Viewer Placeholder */}
          <div className="aspect-square rounded-lg bg-gradient-to-br from-navy-900/20 to-navy-900/60 flex items-center justify-center">
            {product.model3dUrl ? (
              <div className="relative w-full h-full">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover h-full w-full rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white bg-black/50 px-2 py-1 rounded text-sm">
                    3D View Coming Soon
                  </span>
                </div>
              </div>
            ) : (
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-cover h-full w-full rounded-lg"
              />
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-2">
            {/* Thumbnails or alternative views would go here */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-md bg-navy-900/20"></div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl md:text-3xl font-serif mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-gold-600/10 text-gold-600 border-gold-600/20">
              {product.categoryName || "Premium"}
            </Badge>
            <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
          </div>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <Tabs defaultValue="customize" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customize" className="py-4">
              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Fabric</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {fabricsLoading ? (
                    <div className="col-span-3 py-8 flex justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                    </div>
                  ) : (
                    demoFabrics.slice(0, 6).map((fabric: any) => (
                      <div 
                        key={fabric.id} 
                        className={`border rounded-md p-2 cursor-pointer transition-all ${selectedFabric?.id === fabric.id ? 'border-gold-600 ring-1 ring-gold-600' : 'border-border hover:border-gold-600/50'}`}
                        onClick={() => setSelectedFabric(fabric)}
                      >
                        <div className="aspect-square rounded bg-muted mb-2 overflow-hidden">
                          {fabric.image ? (
                            <img src={fabric.image} alt={fabric.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-navy-900/20 to-navy-900/30"></div>
                          )}
                        </div>
                        <div className="text-sm font-medium truncate">{fabric.name}</div>
                        <div className="text-xs text-muted-foreground">{fabric.type}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Style Options */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Style Options</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-border rounded-md p-3">
                    <div className="text-sm font-medium">Lapel Style</div>
                    <select className="mt-1 w-full border-border rounded-md text-sm">
                      <option>Notch Lapel</option>
                      <option>Peak Lapel</option>
                      <option>Shawl Collar</option>
                    </select>
                  </div>
                  
                  <div className="border border-border rounded-md p-3">
                    <div className="text-sm font-medium">Button Style</div>
                    <select className="mt-1 w-full border-border rounded-md text-sm">
                      <option>Single Button</option>
                      <option>Two Button</option>
                      <option>Three Button</option>
                      <option>Double Breasted</option>
                    </select>
                  </div>
                  
                  <div className="border border-border rounded-md p-3">
                    <div className="text-sm font-medium">Vents</div>
                    <select className="mt-1 w-full border-border rounded-md text-sm">
                      <option>No Vent</option>
                      <option>Center Vent</option>
                      <option>Side Vents</option>
                    </select>
                  </div>
                  
                  <div className="border border-border rounded-md p-3">
                    <div className="text-sm font-medium">Monogram</div>
                    <input 
                      type="text" 
                      placeholder="Your Initials" 
                      className="mt-1 w-full border-border rounded-md text-sm p-1"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 mt-6">
                <Button className="bg-gold-600 hover:bg-gold-700">Book Appointment</Button>
                <Button variant="outline">Save Design</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Features</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Premium construction with full canvas</li>
                    <li>Hand-stitched details for superior fit</li>
                    <li>Ottoman-inspired design elements</li>
                    <li>Personalized fit based on your measurements</li>
                    <li>Expert craftsmanship by master tailors</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Care Instructions</h3>
                  <p className="text-sm text-muted-foreground">
                    Dry clean only. Store on a proper hanger in a breathable garment bag. 
                    Complimentary maintenance available for Emperor members.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Delivery & Timeline</h3>
                  <p className="text-sm text-muted-foreground">
                    Initial fitting within 7 days. Production time 2-3 weeks.
                    Final fitting and adjustments 1 week. Total timeline: 3-4 weeks.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pricing" className="py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Transparent Pricing</h3>
                  <Badge variant="outline" className="bg-gold-600/10 text-gold-600">
                    No Hidden Costs
                  </Badge>
                </div>
                
                <div className="bg-navy-900/5 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span>Base Garment Price:</span>
                    <span className="font-medium">${(product.basePrice/100).toFixed(2)}</span>
                    
                    <span>Fabric Cost:</span>
                    <span className="font-medium">${(selectedFabric?.price/100 || 0).toFixed(2)}</span>
                    
                    <span>Tailoring:</span>
                    <span className="font-medium">$150.00</span>
                    
                    <Separator className="col-span-2 my-2" />
                    
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">${((product.basePrice/100) + (selectedFabric?.price/100 || 0) + 150).toFixed(2)}</span>
                  </div>
                </div>
                
                {selectedFabric && (
                  <FabricTransparency fabric={selectedFabric} />
                )}
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="text-xs flex gap-1 items-center">
                    <Info className="h-3 w-3" />
                    Learn About Our Transparent Pricing
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Main 3D store component
const VirtualStore = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedView, setSelectedView] = useState('3d'); // '3d' or 'list'
  const [loadingStore, setLoadingStore] = useState(true);
  
  const { data: collections, isLoading: collectionsLoading } = useQuery({
    queryKey: ['/api/collections', { featured: true }],
    staleTime: 60000,
  });
  
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products'],
    staleTime: 60000,
  });
  
  // Simulate 3D store loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingStore(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Demo products (to be replaced by API data)
  const demoProducts = [
    {
      id: 1,
      name: "Imperial Ottoman Suit",
      description: "A masterpiece of tailoring, our Imperial Ottoman Suit combines traditional Ottoman design elements with modern sartorial excellence. Features intricate gold embroidery and premium construction.",
      basePrice: 89900, // in cents
      image: displayRoom,
      sku: "IMP-OTT-001",
      categoryId: 1,
      model3dUrl: null,
    },
    {
      id: 2,
      name: "Sultan's Executive Suit",
      description: "Commanding attention in any boardroom, the Sultan's Executive Suit offers refined elegance with subtle Ottoman influences. Perfect for the modern business leader.",
      basePrice: 79900, // in cents
      image: displayRoom,
      sku: "SLT-EXE-002",
      categoryId: 1,
      model3dUrl: null,
    },
    {
      id: 3,
      name: "Heritage Tuxedo",
      description: "For the most formal occasions, our Heritage Tuxedo brings timeless elegance with Ottoman-inspired details. Impeccably tailored from the finest materials.",
      basePrice: 99900, // in cents
      image: displayRoom,
      sku: "HTG-TUX-003",
      categoryId: 2,
      model3dUrl: null,
    },
    {
      id: 4,
      name: "Royal Ottoman Dinner Jacket",
      description: "Stand out with our Royal Ottoman Dinner Jacket featuring handcrafted embroidery and impeccable tailoring. A statement piece for prestigious events.",
      basePrice: 84900, // in cents
      image: displayRoom,
      sku: "RYL-OTT-004",
      categoryId: 2,
      model3dUrl: null,
    },
  ];
  
  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div 
        className="h-[300px] rounded-lg mb-8 relative overflow-hidden"
        style={{
          background: `url(${storefront}) center/cover no-repeat`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center">
          <img 
            src={emperorLogo} 
            alt="The Emperor Logo" 
            className="h-16 mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
            The Emperor Virtual Store
          </h1>
          <p className="text-white/80 max-w-2xl">
            Experience our bespoke tailoring in a luxurious Ottoman-inspired setting.
            Explore our collections and customize your perfect garment.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Featured Collections</h2>
        <div className="flex gap-2">
          <Button 
            variant={selectedView === '3d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedView('3d')}
            className="flex gap-2 items-center"
          >
            <Layers className="h-4 w-4" />
            3D Store
          </Button>
          <Button 
            variant={selectedView === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedView('list')}
            className="flex gap-2 items-center"
          >
            <Layers className="h-4 w-4" />
            Collections
          </Button>
        </div>
      </div>
      
      {selectedView === '3d' ? (
        <div 
          className="rounded-lg overflow-hidden relative mb-8 aspect-video"
          style={{
            background: `url(${ottomanPattern2}) center/cover no-repeat`,
          }}
        >
          {loadingStore ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
              <Loader2 className="h-10 w-10 text-gold-500 animate-spin mb-4" />
              <p className="text-white">Loading 3D Store Experience...</p>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
              <Button className="bg-gold-600 hover:bg-gold-700 mb-4 flex gap-2 items-center">
                <Eye className="h-4 w-4" />
                Enter 3D Experience
              </Button>
              <p className="text-white text-sm">Our immersive 3D store is coming soon!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {productsLoading
            ? Array(4).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-[4/5] bg-navy-900/10 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-navy-900/10 animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-navy-900/10 animate-pulse rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))
            : demoProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover h-full w-full transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                      <Button 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-gold-600 hover:bg-gold-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        From ${(product.basePrice/100).toFixed(2)}
                      </span>
                      <Badge variant="outline" className="bg-gold-600/10 text-gold-600 border-gold-600/20">
                        Bespoke
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
          }
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif">Featured Fabrics</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {demoFabrics.map((fabric) => (
            <div key={fabric.id} className="border border-border rounded-md overflow-hidden">
              <div 
                className="aspect-square bg-gradient-to-br from-navy-900/10 to-navy-900/30"
                style={{
                  background: fabric.image 
                    ? `url(${fabric.image}) center/cover no-repeat` 
                    : `url(${ottomanPattern1}) center/cover no-repeat`
                }}
              ></div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1 truncate">{fabric.name}</h3>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{fabric.type}</span>
                  <span className="font-medium">${(fabric.price/100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-lg bg-navy-950 text-white p-6 md:p-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-serif mb-4">The Emperor Experience</h2>
            <p className="mb-6">
              Discover our transparent pricing model that empowers you with knowledge of exactly what you're paying for. 
              From premium fabrics to expert craftsmanship, we break down every component of your bespoke garment.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border border-white/20 rounded-md p-4">
                <h3 className="font-medium mb-2 text-gold-500">Premium Fabrics</h3>
                <p className="text-sm text-white/70">
                  We source only the finest materials from renowned mills worldwide.
                </p>
              </div>
              <div className="border border-white/20 rounded-md p-4">
                <h3 className="font-medium mb-2 text-gold-500">Master Tailoring</h3>
                <p className="text-sm text-white/70">
                  Our artisans bring decades of experience to every garment.
                </p>
              </div>
              <div className="border border-white/20 rounded-md p-4">
                <h3 className="font-medium mb-2 text-gold-500">Ottoman Heritage</h3>
                <p className="text-sm text-white/70">
                  Designs inspired by the rich Ottoman aesthetic tradition.
                </p>
              </div>
              <div className="border border-white/20 rounded-md p-4">
                <h3 className="font-medium mb-2 text-gold-500">Transparent Pricing</h3>
                <p className="text-sm text-white/70">
                  Clear breakdown of costs with no hidden fees.
                </p>
              </div>
            </div>
            <Button className="bg-gold-600 hover:bg-gold-700 flex gap-2">
              Book an Appointment
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <img 
              src={displayRoom} 
              alt="The Emperor Showroom" 
              className="rounded-md h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent md:bg-gradient-to-l opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualStore;