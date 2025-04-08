import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, Filter, Info, Check } from "lucide-react";

// Import Ottoman-inspired patterns
import ottomanPattern from "@assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png";
import brandImage from "@assets/AE2F80C3-DB76-4532-8248-82292414882D.png";
import packageImage from "@assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png";

// Fabric detail dialog
const FabricDetailDialog = ({ fabric, open, onOpenChange }: any) => {
  if (!fabric) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{fabric.name}</DialogTitle>
          <DialogDescription>Premium fabric with transparent pricing</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square rounded-lg bg-navy-900/10 mb-4 overflow-hidden">
              {fabric.image ? (
                <img 
                  src={fabric.image} 
                  alt={fabric.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${ottomanPattern})` }}
                ></div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-md bg-navy-900/10"></div>
              ))}
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 py-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {fabric.description || `Premium ${fabric.type} fabric in ${fabric.color} color with ${fabric.pattern || 'solid'} pattern. Perfect for creating elegant bespoke garments that showcase your unique style.`}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Origin</h3>
                  <p className="text-sm text-muted-foreground">
                    {fabric.origin || 'Sourced from premium mills around the world, with a focus on sustainable and ethical production methods.'}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Suitable For</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Suits</Badge>
                    <Badge variant="outline">Blazers</Badge>
                    <Badge variant="outline">Trousers</Badge>
                    <Badge variant="outline">Formal Wear</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Care Instructions</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional dry clean only. Store garments made with this fabric in breathable garment bags.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="font-medium">Composition:</span>
                  <span>{fabric.composition || '100% Premium Material'}</span>
                  
                  <span className="font-medium">Weight:</span>
                  <span>{fabric.weight || '280-320 g/m²'}</span>
                  
                  <span className="font-medium">Width:</span>
                  <span>150 cm</span>
                  
                  <span className="font-medium">Type:</span>
                  <span>{fabric.type}</span>
                  
                  <span className="font-medium">Color:</span>
                  <span>{fabric.color}</span>
                  
                  <span className="font-medium">Pattern:</span>
                  <span>{fabric.pattern || 'Solid'}</span>
                  
                  <span className="font-medium">Finish:</span>
                  <span>Premium Soft Touch</span>
                  
                  <span className="font-medium">Season:</span>
                  <span>All Season</span>
                </div>
              </TabsContent>
              
              <TabsContent value="pricing" className="space-y-4 py-4">
                <div className="bg-navy-900/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Transparent Pricing</h3>
                    <Badge variant="outline" className="bg-gold-600/10 text-gold-600">
                      Premium Quality
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span>Material Cost:</span>
                    <span className="font-medium">${((fabric.price * 0.6)/100).toFixed(2)}</span>
                    
                    <span>Import & Logistics:</span>
                    <span className="font-medium">${((fabric.price * 0.2)/100).toFixed(2)}</span>
                    
                    <span>Quality Control:</span>
                    <span className="font-medium">${((fabric.price * 0.1)/100).toFixed(2)}</span>
                    
                    <span>Storage & Handling:</span>
                    <span className="font-medium">${((fabric.price * 0.1)/100).toFixed(2)}</span>
                    
                    <Separator className="col-span-2 my-2" />
                    
                    <span className="font-semibold">Total Price:</span>
                    <span className="font-semibold">${(fabric.price/100).toFixed(2)}</span>
                    
                    <span className="text-xs text-muted-foreground col-span-2 mt-2">
                      Prices are per meter/yard and exclusive of tailoring costs
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 mt-6">
                  <Button className="bg-gold-600 hover:bg-gold-700 flex gap-2 items-center">
                    <Check className="h-4 w-4" />
                    Select This Fabric
                  </Button>
                  <Button variant="outline">Request Swatch</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Fabrics Showcase component
const FabricsShowcase = () => {
  const [selectedFabric, setSelectedFabric] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    color: 'all',
    pattern: 'all',
    origin: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch fabrics data
  const { data: fabrics, isLoading } = useQuery({
    queryKey: ['/api/fabrics'],
    staleTime: 60000,
  });
  
  // Demo fabrics data based on the PDF
  const demoFabrics = [
    {
      id: 1,
      name: "Twill Compact",
      type: "Cotton Twill",
      color: "Navy",
      pattern: "Solid",
      price: 16500, // in cents
      available: true,
      description: "Premium compact cotton twill, woven for strength and comfort. Enhanced durability, smooth texture, and a refined finish.",
      origin: "Turkey",
      composition: "100% Premium Cotton",
    },
    {
      id: 2,
      name: "Cord Dobby",
      type: "Cotton Dobby",
      color: "Charcoal",
      pattern: "Textured",
      price: 18900, // in cents
      available: true,
      description: "Premium cotton cord dobby for a textured and refined look. Unique weave pattern, soft feel, and enhanced durability.",
      origin: "Italy",
      composition: "100% Premium Cotton",
    },
    {
      id: 3,
      name: "Sulphur Slub",
      type: "Cotton Slub",
      color: "Dark Blue",
      pattern: "Textured",
      price: 17500, // in cents
      available: true,
      description: "High-quality cotton with a sulphur-dyed slub texture. Unique textured appearance, soft hand feel, rich color depth, and excellent durability.",
      origin: "Japan",
      composition: "100% Cotton",
    },
    {
      id: 4,
      name: "Twill RFD",
      type: "Cotton Twill",
      color: "Natural",
      pattern: "Solid",
      price: 15500, // in cents
      available: true,
      description: "High-quality cotton twill, ready for dyeing (RFD). Durable weave, smooth finish, and ideal for custom dyeing.",
      origin: "Egypt",
      composition: "100% Egyptian Cotton",
    },
    {
      id: 5,
      name: "Nylon Spandex",
      type: "Technical Blend",
      color: "Black",
      pattern: "Solid",
      price: 19900, // in cents
      available: true,
      description: "A blend of nylon and elastane/spandex. High durability, stretchability, moisture-wicking, and quick-drying properties.",
      origin: "Switzerland",
      composition: "85% Nylon, 15% Spandex",
    },
    {
      id: 6,
      name: "Dobby",
      type: "Mixed Dobby",
      color: "Grey",
      pattern: "Textured",
      price: 17900, // in cents
      available: true,
      description: "Textured weave with intricate patterns, offering durability and a refined look.",
      origin: "United Kingdom",
      composition: "60% Cotton, 40% Polyester",
    },
    {
      id: 7,
      name: "Linen Solid",
      type: "Linen",
      color: "Ivory",
      pattern: "Solid",
      price: 22500, // in cents
      available: true,
      description: "Premium quality linen for a breathable and lightweight feel. Soft texture, excellent moisture-wicking, and a naturally refined look.",
      origin: "Ireland",
      composition: "100% Premium Linen",
    },
    {
      id: 8,
      name: "Nylon Viscose",
      type: "Blend",
      color: "Midnight Blue",
      pattern: "Solid",
      price: 18500, // in cents
      available: true,
      description: "Blend of nylon and viscose for enhanced durability and comfort. Soft, breathable, wrinkle-resistant, and offers a sleek drape.",
      origin: "Italy",
      composition: "60% Nylon, 40% Viscose",
    },
    {
      id: 9,
      name: "Structure",
      type: "Structured Weave",
      color: "Charcoal",
      pattern: "Textured",
      price: 19500, // in cents
      available: true,
      description: "Defined weave pattern for durability, texture, and enhanced aesthetic appeal.",
      origin: "France",
      composition: "70% Cotton, 30% Polyester",
    },
    {
      id: 10,
      name: "Matt Weave",
      type: "Matt Finish",
      color: "Navy",
      pattern: "Solid",
      price: 16900, // in cents
      available: true,
      description: "Soft, non-reflective finish with a subtle texture for a refined look.",
      origin: "Turkey",
      composition: "100% Cotton",
    },
    {
      id: 11,
      name: "Cotton Lycra",
      type: "Stretch Cotton",
      color: "Black",
      pattern: "Solid",
      price: 17500, // in cents
      available: true,
      description: "Breathable, soft, and stretchable fabric that provides comfort and ease of movement.",
      origin: "Italy",
      composition: "98% Cotton, 2% Lycra",
    },
    {
      id: 12,
      name: "Oxford",
      type: "Oxford Cloth",
      color: "Light Blue",
      pattern: "Basket Weave",
      price: 16500, // in cents
      available: true,
      description: "Classic basketweave texture, breathable, and versatile, ideal for both formal and casual wear.",
      origin: "United Kingdom",
      composition: "100% Cotton",
    }
  ];
  
  // Fabric types and colors for filtering
  const fabricTypes = ['all', 'Cotton Twill', 'Cotton Dobby', 'Cotton Slub', 'Linen', 'Blend', 'Stretch Cotton', 'Technical Blend', 'Oxford Cloth', 'Structured Weave', 'Matt Finish'];
  const fabricColors = ['all', 'Navy', 'Black', 'Charcoal', 'Grey', 'Dark Blue', 'Ivory', 'Natural', 'Light Blue', 'Midnight Blue'];
  const fabricPatterns = ['all', 'Solid', 'Textured', 'Basket Weave'];
  const fabricOrigins = ['all', 'Turkey', 'Italy', 'Japan', 'Egypt', 'Switzerland', 'United Kingdom', 'Ireland', 'France'];
  
  // Filter fabrics based on active filters and search query
  const filteredFabrics = demoFabrics.filter(fabric => {
    // Apply type filter
    if (activeFilters.type !== 'all' && fabric.type !== activeFilters.type) return false;
    
    // Apply color filter
    if (activeFilters.color !== 'all' && fabric.color !== activeFilters.color) return false;
    
    // Apply pattern filter
    if (activeFilters.pattern !== 'all' && fabric.pattern !== activeFilters.pattern) return false;
    
    // Apply origin filter
    if (activeFilters.origin !== 'all' && fabric.origin !== activeFilters.origin) return false;
    
    // Apply search query
    if (searchQuery && !fabric.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  const handleFabricClick = (fabric: any) => {
    setSelectedFabric(fabric);
    setDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto py-8">
      <div 
        className="h-[250px] rounded-lg mb-8 relative overflow-hidden"
        style={{
          background: `url(${brandImage}) center/cover no-repeat`,
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
              Premium Fabrics Collection
            </h1>
            <p className="text-white/80 max-w-2xl px-4">
              Explore our exquisite selection of fabrics, each chosen for its exceptional quality, 
              character, and suitability for bespoke tailoring.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search fabrics..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveFilters({ type: 'all', color: 'all', pattern: 'all', origin: 'all' })}
                className="h-8 text-xs"
              >
                Reset
              </Button>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Fabric Type</h4>
              <div className="space-y-1">
                {fabricTypes.map((type) => (
                  <div 
                    key={type} 
                    className={`px-2 py-1 text-sm rounded-md cursor-pointer hover:bg-navy-900/5 ${activeFilters.type === type ? 'bg-navy-900/10 font-medium' : ''}`}
                    onClick={() => setActiveFilters({ ...activeFilters, type })}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Color</h4>
              <div className="space-y-1">
                {fabricColors.map((color) => (
                  <div 
                    key={color} 
                    className={`px-2 py-1 text-sm rounded-md cursor-pointer hover:bg-navy-900/5 ${activeFilters.color === color ? 'bg-navy-900/10 font-medium' : ''}`}
                    onClick={() => setActiveFilters({ ...activeFilters, color })}
                  >
                    {color === 'all' ? 'All Colors' : color}
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Pattern</h4>
              <div className="space-y-1">
                {fabricPatterns.map((pattern) => (
                  <div 
                    key={pattern} 
                    className={`px-2 py-1 text-sm rounded-md cursor-pointer hover:bg-navy-900/5 ${activeFilters.pattern === pattern ? 'bg-navy-900/10 font-medium' : ''}`}
                    onClick={() => setActiveFilters({ ...activeFilters, pattern })}
                  >
                    {pattern === 'all' ? 'All Patterns' : pattern}
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Origin</h4>
              <div className="space-y-1">
                {fabricOrigins.map((origin) => (
                  <div 
                    key={origin} 
                    className={`px-2 py-1 text-sm rounded-md cursor-pointer hover:bg-navy-900/5 ${activeFilters.origin === origin ? 'bg-navy-900/10 font-medium' : ''}`}
                    onClick={() => setActiveFilters({ ...activeFilters, origin })}
                  >
                    {origin === 'all' ? 'All Origins' : origin}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${packageImage})` }}
          >
            <div className="bg-navy-950/80 p-4 text-white">
              <h3 className="font-serif text-xl mb-2">Request Swatches</h3>
              <p className="text-sm mb-3">
                Feel the quality of our fabrics before making your decision.
              </p>
              <Button className="w-full bg-gold-600 hover:bg-gold-700">
                Order Swatch Kit
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif">Our Fabric Collection</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredFabrics.length} fabrics found
              </span>
              <Button variant="outline" size="sm" className="flex gap-1 items-center">
                <Filter className="h-4 w-4" />
                <span className="hidden md:inline">Sort by</span>
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(12).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square bg-navy-900/10 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-5 bg-navy-900/10 animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-navy-900/10 animate-pulse rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFabrics.map((fabric) => (
                <Card 
                  key={fabric.id} 
                  className="overflow-hidden hover:border-gold-600/50 transition-colors cursor-pointer"
                  onClick={() => handleFabricClick(fabric)}
                >
                  <div className="aspect-square relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${ottomanPattern})` }}
                    ></div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                        {fabric.type}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{fabric.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {fabric.color} {fabric.pattern}
                      </span>
                      <span className="font-medium text-gold-600">
                        ${(fabric.price/100).toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {filteredFabrics.length === 0 && (
            <div className="text-center py-16 border border-dashed border-border rounded-lg">
              <div className="text-muted-foreground mb-2">No fabrics found matching your criteria</div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveFilters({ type: 'all', color: 'all', pattern: 'all', origin: 'all' });
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-navy-950 text-white p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-serif mb-4">Transparent Pricing</h2>
            <p className="mb-4">
              At The Emperor, we believe in complete transparency. We break down the cost of each fabric 
              so you understand exactly what you're paying for—from raw materials to logistics.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                Learn More
              </Button>
              <Button className="bg-gold-600 hover:bg-gold-700">
                Book Consultation
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="border border-white/20 rounded-md p-4">
              <h3 className="font-medium mb-2 text-gold-500">Premium Materials</h3>
              <p className="text-sm text-white/70">
                We source only the finest raw materials from the world's best mills.
              </p>
            </div>
            <div className="border border-white/20 rounded-md p-4">
              <h3 className="font-medium mb-2 text-gold-500">Expert Selection</h3>
              <p className="text-sm text-white/70">
                Each fabric is carefully vetted by our master tailors.
              </p>
            </div>
            <div className="border border-white/20 rounded-md p-4">
              <h3 className="font-medium mb-2 text-gold-500">Ethical Sourcing</h3>
              <p className="text-sm text-white/70">
                We prioritize sustainable and ethical production methods.
              </p>
            </div>
            <div className="border border-white/20 rounded-md p-4">
              <h3 className="font-medium mb-2 text-gold-500">Quality Guaranteed</h3>
              <p className="text-sm text-white/70">
                Every fabric meets our rigorous quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <FabricDetailDialog 
        fabric={selectedFabric}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default FabricsShowcase;