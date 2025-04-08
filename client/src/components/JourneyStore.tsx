import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  Compass, 
  Map, 
  TailorIcon 
} from "lucide-react";

// Import Ottoman-inspired background patterns and imagery from assets
import ottomanPattern1 from "@assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png";
import ottomanPattern2 from "@assets/AE2F80C3-DB76-4532-8248-82292414882D.png";
import storefront from "@assets/16476EBE-65A6-4589-817D-75AE5DC301E0.png";
import displayRoom from "@assets/701CE6B1-F57D-4291-9043-632927C409D2.png";
import emperorLogo from "@assets/9E56EEEE-7167-465D-B51A-6DBE47E7A2E9.png";

// Stages of our journey experience
enum JourneyStage {
  WELCOME = 'welcome',
  STYLE_SELECTION = 'style',
  FABRIC_SELECTION = 'fabric',
  CUSTOMIZATION = 'customization',
  MEASUREMENT = 'measurement',
  VISUALIZATION = 'visualization',
  SUMMARY = 'summary',
}

// Demo fabrics (similar to VirtualStore component)
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

// Demo products (similar to VirtualStore component)
const demoProducts = [
  {
    id: 1,
    name: "Imperial Ottoman Suit",
    description: "A masterpiece of tailoring, our Imperial Ottoman Suit combines traditional Ottoman design elements with modern sartorial excellence.",
    basePrice: 89900, // in cents
    image: displayRoom,
    sku: "IMP-OTT-001",
    categoryId: 1,
    model3dUrl: null,
  },
  {
    id: 2,
    name: "Sultan's Executive Suit",
    description: "Commanding attention in any boardroom, the Sultan's Executive Suit offers refined elegance with subtle Ottoman influences.",
    basePrice: 79900, // in cents
    image: displayRoom,
    sku: "SLT-EXE-002",
    categoryId: 1,
    model3dUrl: null,
  },
  {
    id: 3,
    name: "Heritage Tuxedo",
    description: "For the most formal occasions, our Heritage Tuxedo brings timeless elegance with Ottoman-inspired details.",
    basePrice: 99900, // in cents
    image: displayRoom,
    sku: "HTG-TUX-003",
    categoryId: 2,
    model3dUrl: null,
  },
  {
    id: 4,
    name: "Royal Ottoman Dinner Jacket",
    description: "Stand out with our Royal Ottoman Dinner Jacket featuring handcrafted embroidery and impeccable tailoring.",
    basePrice: 84900, // in cents
    image: displayRoom,
    sku: "RYL-OTT-004",
    categoryId: 2,
    model3dUrl: null,
  },
];

// Style options for garments
const styleOptions = [
  { id: 1, name: "Classic Ottoman", description: "Traditional styling with Ottoman-inspired details", image: ottomanPattern1 },
  { id: 2, name: "Modern Imperial", description: "Contemporary elegance with subtle Ottoman influences", image: ottomanPattern2 },
  { id: 3, name: "Heritage Luxury", description: "Timeless design with intricate Ottoman craftsmanship", image: ottomanPattern1 },
  { id: 4, name: "Sultan's Choice", description: "Bold statement pieces with rich Ottoman aesthetics", image: ottomanPattern2 },
];

// Progress indicator for the journey
const JourneyProgress = ({ currentStage }: { currentStage: JourneyStage }) => {
  const stages = [
    { id: JourneyStage.WELCOME, label: "Welcome" },
    { id: JourneyStage.STYLE_SELECTION, label: "Style" },
    { id: JourneyStage.FABRIC_SELECTION, label: "Fabric" },
    { id: JourneyStage.CUSTOMIZATION, label: "Details" },
    { id: JourneyStage.MEASUREMENT, label: "Measurements" },
    { id: JourneyStage.VISUALIZATION, label: "Preview" },
    { id: JourneyStage.SUMMARY, label: "Complete" },
  ];
  
  const currentIndex = stages.findIndex(s => s.id === currentStage);
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        {stages.map((stage, index) => {
          const isPast = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={stage.id} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCurrent 
                    ? 'bg-gold-600 text-white' 
                    : isPast 
                      ? 'bg-navy-950 text-white' 
                      : 'bg-navy-950/10 text-navy-950/50'
                }`}
              >
                {isPast ? '✓' : index + 1}
              </div>
              <span className={`text-xs mt-1 ${isCurrent ? 'text-gold-600 font-medium' : 'text-muted-foreground'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative h-1 bg-navy-950/10 rounded-full mt-2">
        <div 
          className="absolute top-0 left-0 h-1 bg-gold-600 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

// Welcome stage
const WelcomeStage = ({ onContinue }: { onContinue: () => void }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img src={emperorLogo} alt="The Emperor Logo" className="h-20 mb-6" />
      
      <h1 className="text-3xl md:text-4xl font-serif mb-4">
        Begin Your Bespoke Journey
      </h1>
      
      <p className="text-muted-foreground max-w-2xl mb-8">
        Welcome to The Emperor's immersive tailoring experience. We'll guide you through creating your perfect garment,
        from selecting premium fabrics to customizing every detail for a truly personal fit.
      </p>
      
      <div 
        className="w-full max-w-3xl aspect-video rounded-lg mb-8 relative overflow-hidden"
        style={{
          background: `url(${storefront}) center/cover no-repeat`,
        }}
      >
        {loading ? (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
            <div className="text-white text-center max-w-lg p-6">
              <h2 className="text-2xl font-serif mb-4">The Ottoman Heritage</h2>
              <p className="mb-6">
                Our designs draw inspiration from the rich tradition of Ottoman craftsmanship,
                blending historical elegance with modern tailoring excellence.
              </p>
              <Button 
                onClick={onContinue}
                className="bg-gold-600 hover:bg-gold-700 text-white" 
                size="lg"
              >
                Begin Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="bg-navy-950/5 rounded-lg p-4 text-center">
          <div className="rounded-full w-12 h-12 bg-navy-950/10 flex items-center justify-center mx-auto mb-3">
            <Compass className="h-6 w-6 text-gold-600" />
          </div>
          <h3 className="font-medium mb-2">Personal Journey</h3>
          <p className="text-sm text-muted-foreground">
            Guided experience tailored to your unique preferences and style
          </p>
        </div>
        
        <div className="bg-navy-950/5 rounded-lg p-4 text-center">
          <div className="rounded-full w-12 h-12 bg-navy-950/10 flex items-center justify-center mx-auto mb-3">
            <TailorIcon className="h-6 w-6 text-gold-600" />
          </div>
          <h3 className="font-medium mb-2">Master Tailoring</h3>
          <p className="text-sm text-muted-foreground">
            Exceptional craftsmanship from our skilled artisans
          </p>
        </div>
        
        <div className="bg-navy-950/5 rounded-lg p-4 text-center">
          <div className="rounded-full w-12 h-12 bg-navy-950/10 flex items-center justify-center mx-auto mb-3">
            <Map className="h-6 w-6 text-gold-600" />
          </div>
          <h3 className="font-medium mb-2">Ottoman Heritage</h3>
          <p className="text-sm text-muted-foreground">
            Rich cultural influence in every detail of your garment
          </p>
        </div>
      </div>
    </div>
  );
};

// Style selection stage
const StyleSelectionStage = ({ 
  onContinue, 
  onBack, 
  onSelectStyle 
}: { 
  onContinue: () => void, 
  onBack: () => void,
  onSelectStyle: (style: any) => void 
}) => {
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  
  const handleSelect = (style: any) => {
    setSelectedStyle(style.id);
    onSelectStyle(style);
  };
  
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif mb-2">Choose Your Style</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select a style direction that resonates with your personal aesthetic.
          Each style offers a unique interpretation of Ottoman-inspired design.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {styleOptions.map((style) => (
          <div 
            key={style.id}
            onClick={() => handleSelect(style)}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedStyle === style.id 
                ? 'border-gold-600 ring-1 ring-gold-600' 
                : 'border-border hover:border-gold-600/50'
            }`}
          >
            <div 
              className="aspect-video relative"
              style={{
                backgroundImage: `url(${style.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {selectedStyle === style.id && (
                <div className="absolute top-3 right-3 bg-gold-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-medium text-lg">{style.name}</h3>
                <p className="text-white/80 text-sm">{style.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={onContinue}
          className="bg-gold-600 hover:bg-gold-700 text-white"
          disabled={selectedStyle === null}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Fabric selection stage
const FabricSelectionStage = ({ 
  onContinue, 
  onBack,
  onSelectFabric
}: { 
  onContinue: () => void, 
  onBack: () => void,
  onSelectFabric: (fabric: any) => void
}) => {
  const [selectedFabric, setSelectedFabric] = useState<number | null>(null);
  const [fabricFilter, setFabricFilter] = useState('all'); // 'all', 'wool', 'silk', etc.
  
  const { data: fabrics, isLoading: fabricsLoading } = useQuery({
    queryKey: ['/api/fabrics'],
    staleTime: 60000,
  });
  
  const handleSelect = (fabric: any) => {
    setSelectedFabric(fabric.id);
    onSelectFabric(fabric);
  };
  
  const filteredFabrics = (fabrics && Array.isArray(fabrics) ? fabrics : demoFabrics).filter(fabric => {
    if (fabricFilter === 'all') return true;
    return fabric.type.toLowerCase().includes(fabricFilter.toLowerCase());
  });
  
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif mb-2">Select Your Fabric</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Choose from our curated selection of premium fabrics. Each fabric is sourced from the finest mills around the world.
        </p>
      </div>
      
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        <Button 
          variant={fabricFilter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFabricFilter('all')}
        >
          All Fabrics
        </Button>
        <Button 
          variant={fabricFilter === 'wool' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFabricFilter('wool')}
        >
          Wool
        </Button>
        <Button 
          variant={fabricFilter === 'silk' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFabricFilter('silk')}
        >
          Silk & Blends
        </Button>
        <Button 
          variant={fabricFilter === 'cotton' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFabricFilter('cotton')}
        >
          Cotton
        </Button>
        <Button 
          variant={fabricFilter === 'velvet' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFabricFilter('velvet')}
        >
          Velvet
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {fabricsLoading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="border border-border rounded-md animate-pulse">
              <div className="aspect-square bg-navy-900/10"></div>
              <div className="p-3">
                <div className="h-4 bg-navy-900/10 rounded mb-2 w-2/3"></div>
                <div className="h-3 bg-navy-900/10 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : (
          filteredFabrics.map(fabric => (
            <div 
              key={fabric.id}
              onClick={() => handleSelect(fabric)}
              className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                selectedFabric === fabric.id 
                  ? 'border-gold-600 ring-1 ring-gold-600' 
                  : 'border-border hover:border-gold-600/50'
              }`}
            >
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
                {selectedFabric === fabric.id && (
                  <Badge className="mt-2 bg-gold-600 text-white">Selected</Badge>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {selectedFabric && (
        <div className="p-4 bg-navy-950/5 rounded-lg mb-8">
          <h3 className="font-medium mb-2">Selected Fabric Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {demoFabrics.find(f => f.id === selectedFabric)?.origin && (
              <div>
                <span className="text-muted-foreground">Origin:</span>
                <div className="font-medium">{demoFabrics.find(f => f.id === selectedFabric)?.origin}</div>
              </div>
            )}
            {demoFabrics.find(f => f.id === selectedFabric)?.composition && (
              <div>
                <span className="text-muted-foreground">Composition:</span>
                <div className="font-medium">{demoFabrics.find(f => f.id === selectedFabric)?.composition}</div>
              </div>
            )}
            {demoFabrics.find(f => f.id === selectedFabric)?.pattern && (
              <div>
                <span className="text-muted-foreground">Pattern:</span>
                <div className="font-medium">{demoFabrics.find(f => f.id === selectedFabric)?.pattern}</div>
              </div>
            )}
            {demoFabrics.find(f => f.id === selectedFabric)?.price && (
              <div>
                <span className="text-muted-foreground">Price:</span>
                <div className="font-medium text-gold-600">${(demoFabrics.find(f => f.id === selectedFabric)?.price || 0)/100}</div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={onContinue}
          className="bg-gold-600 hover:bg-gold-700 text-white"
          disabled={selectedFabric === null}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Customization stage
const CustomizationStage = ({ 
  onContinue, 
  onBack,
  onCustomize
}: { 
  onContinue: () => void, 
  onBack: () => void,
  onCustomize: (options: Record<string, any>) => void
}) => {
  const [customOptions, setCustomOptions] = useState({
    lapelStyle: 'notch',
    buttonStyle: 'two',
    ventStyle: 'side',
    pocketStyle: 'flap',
    lining: 'standard',
    monogram: '',
  });
  
  const handleChange = (option: string, value: string) => {
    setCustomOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };
  
  const handleContinue = () => {
    onCustomize(customOptions);
    onContinue();
  };
  
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif mb-2">Customize Your Garment</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Personalize every detail of your garment to match your exact preferences.
          Our master tailors will craft your selections with meticulous attention to detail.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="aspect-square rounded-lg bg-navy-950/5 mb-4 p-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Interactive preview coming soon</p>
              <div className="inline-block p-4 bg-navy-950/10 rounded-full">
                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-navy-950/5 rounded-lg">
            <h3 className="font-medium mb-3">Styling Notes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Notch lapels offer a classic, versatile look suitable for business settings</li>
              <li>• Peak lapels create a bold, statement appearance perfect for formal occasions</li>
              <li>• Side vents provide better mobility and a more contemporary silhouette</li>
              <li>• Double-breasted styles evoke Ottoman heritage with royal elegance</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <label className="block font-medium mb-2">Lapel Style</label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={customOptions.lapelStyle === 'notch' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('lapelStyle', 'notch')}
              >
                Notch
              </Button>
              <Button 
                variant={customOptions.lapelStyle === 'peak' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('lapelStyle', 'peak')}
              >
                Peak
              </Button>
              <Button 
                variant={customOptions.lapelStyle === 'shawl' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('lapelStyle', 'shawl')}
              >
                Shawl
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <label className="block font-medium mb-2">Button Style</label>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant={customOptions.buttonStyle === 'one' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('buttonStyle', 'one')}
              >
                1 Button
              </Button>
              <Button 
                variant={customOptions.buttonStyle === 'two' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('buttonStyle', 'two')}
              >
                2 Button
              </Button>
              <Button 
                variant={customOptions.buttonStyle === 'three' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('buttonStyle', 'three')}
              >
                3 Button
              </Button>
              <Button 
                variant={customOptions.buttonStyle === 'double' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('buttonStyle', 'double')}
              >
                Double
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <label className="block font-medium mb-2">Vent Style</label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={customOptions.ventStyle === 'none' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('ventStyle', 'none')}
              >
                No Vent
              </Button>
              <Button 
                variant={customOptions.ventStyle === 'center' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('ventStyle', 'center')}
              >
                Center
              </Button>
              <Button 
                variant={customOptions.ventStyle === 'side' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('ventStyle', 'side')}
              >
                Side
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <label className="block font-medium mb-2">Pocket Style</label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={customOptions.pocketStyle === 'flap' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('pocketStyle', 'flap')}
              >
                Flap
              </Button>
              <Button 
                variant={customOptions.pocketStyle === 'patch' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('pocketStyle', 'patch')}
              >
                Patch
              </Button>
              <Button 
                variant={customOptions.pocketStyle === 'ticket' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('pocketStyle', 'ticket')}
              >
                Ticket
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <label className="block font-medium mb-2">Lining</label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={customOptions.lining === 'standard' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('lining', 'standard')}
              >
                Standard
              </Button>
              <Button 
                variant={customOptions.lining === 'contrast' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('lining', 'contrast')}
              >
                Contrast
              </Button>
              <Button 
                variant={customOptions.lining === 'custom' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleChange('lining', 'custom')}
              >
                Custom
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <label className="block font-medium mb-2">Monogram (Optional)</label>
            <input
              type="text"
              value={customOptions.monogram}
              onChange={(e) => handleChange('monogram', e.target.value)}
              placeholder="Your initials (max 3 characters)"
              maxLength={3}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={handleContinue}
          className="bg-gold-600 hover:bg-gold-700 text-white"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Measurement stage
const MeasurementStage = ({ 
  onContinue, 
  onBack,
  onSaveMeasurements
}: { 
  onContinue: () => void, 
  onBack: () => void,
  onSaveMeasurements: (measurements: Record<string, number>) => void
}) => {
  const [measurementType, setMeasurementType] = useState<'standard' | 'detailed'>('standard');
  const [measurements, setMeasurements] = useState({
    chest: 40,
    waist: 34,
    hips: 41,
    shoulder: 18,
    sleeve: 25,
    neck: 16,
    height: 70, // in inches
    weight: 180, // in pounds
  });
  
  const handleChange = (measurement: string, value: number) => {
    setMeasurements(prev => ({
      ...prev,
      [measurement]: value
    }));
  };
  
  const handleContinue = () => {
    onSaveMeasurements(measurements);
    onContinue();
  };
  
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif mb-2">Your Measurements</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Provide your measurements for a perfect fit. You can enter standard sizes or detailed measurements for the most precise fit.
        </p>
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={measurementType === 'standard' ? 'default' : 'outline'}
          onClick={() => setMeasurementType('standard')}
        >
          Standard Sizes
        </Button>
        <Button
          variant={measurementType === 'detailed' ? 'default' : 'outline'}
          onClick={() => setMeasurementType('detailed')}
        >
          Detailed Measurements
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-4">Body Measurements</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Height (inches)</label>
                <input
                  type="number"
                  value={measurements.height}
                  onChange={(e) => handleChange('height', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Weight (pounds)</label>
                <input
                  type="number"
                  value={measurements.weight}
                  onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Chest (inches)</label>
                <input
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => handleChange('chest', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Waist (inches)</label>
                <input
                  type="number"
                  value={measurements.waist}
                  onChange={(e) => handleChange('waist', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
          
          {measurementType === 'detailed' && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-4">Additional Measurements</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Hips (inches)</label>
                  <input
                    type="number"
                    value={measurements.hips}
                    onChange={(e) => handleChange('hips', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Shoulder Width (inches)</label>
                  <input
                    type="number"
                    value={measurements.shoulder}
                    onChange={(e) => handleChange('shoulder', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Sleeve Length (inches)</label>
                  <input
                    type="number"
                    value={measurements.sleeve}
                    onChange={(e) => handleChange('sleeve', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Neck (inches)</label>
                  <input
                    type="number"
                    value={measurements.neck}
                    onChange={(e) => handleChange('neck', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <div className="p-4 bg-navy-950/5 rounded-lg mb-4">
            <h3 className="font-medium mb-3">Measurement Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              For the most accurate fit, follow our detailed measurement guide. You can also book an appointment for a professional fitting at our store.
            </p>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-600 mt-0.5" />
                <span>
                  <strong className="font-medium">Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-600 mt-0.5" />
                <span>
                  <strong className="font-medium">Waist:</strong> Measure around your natural waistline, at the narrowest part of your torso
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-600 mt-0.5" />
                <span>
                  <strong className="font-medium">Shoulder:</strong> Measure from the end of one shoulder to the other, across your back
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-gold-600 mt-0.5" />
                <span>
                  <strong className="font-medium">Sleeve:</strong> Measure from shoulder seam to wrist, with arm slightly bent
                </span>
              </li>
            </ul>
          </div>
          
          <Button className="w-full bg-navy-950 hover:bg-navy-900 mb-4">
            Book Professional Fitting
          </Button>
          
          <Button variant="outline" className="w-full mb-4">
            Upload Measurement Photo
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need help with measurements? Contact our customer service team at support@theemperor.com or call +1 (800) 555-1234
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={handleContinue}
          className="bg-gold-600 hover:bg-gold-700 text-white"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Visualization stage
const VisualizationStage = ({ 
  onContinue, 
  onBack,
  journeyData
}: { 
  onContinue: () => void, 
  onBack: () => void,
  journeyData: any
}) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif mb-2">Visualize Your Garment</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          See your custom design come to life with our 3D visualization.
          Review all details before finalizing your order.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
            {loading ? (
              <div className="absolute inset-0 bg-navy-950/5 flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-gold-600 animate-spin mb-4" />
                <p className="text-muted-foreground">Rendering your custom garment...</p>
              </div>
            ) : (
              <div 
                className="w-full h-full" 
                style={{ 
                  backgroundImage: `url(${displayRoom})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/50 text-white text-center rounded-md">
                  <p className="text-sm">3D visualization preview</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="aspect-square rounded-md bg-navy-950/10"></div>
            <div className="aspect-square rounded-md bg-navy-950/10"></div>
            <div className="aspect-square rounded-md bg-navy-950/10"></div>
            <div className="aspect-square rounded-md bg-navy-950/10"></div>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm">
              Front View
            </Button>
            <Button variant="outline" size="sm">
              Back View
            </Button>
            <Button variant="outline" size="sm">
              Side View
            </Button>
          </div>
        </div>
        
        <div>
          <Card className="mb-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Order Summary</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Style:</span>
                  <span className="font-medium">{journeyData.style?.name || "Custom Style"}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Fabric:</span>
                  <span className="font-medium">{journeyData.fabric?.name || "Selected Fabric"}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Customizations:</span>
                  <div className="text-right">
                    <div>{journeyData.customOptions?.lapelStyle || "Notch"} Lapel</div>
                    <div>{journeyData.customOptions?.buttonStyle || "Two"} Button</div>
                    <div>{journeyData.customOptions?.ventStyle || "Side"} Vent</div>
                  </div>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Measurements:</span>
                  <div className="text-right">
                    <div>Chest: {journeyData.measurements?.chest || 40}"</div>
                    <div>Waist: {journeyData.measurements?.waist || 34}"</div>
                    <div>Height: {journeyData.measurements?.height || 70}"</div>
                  </div>
                </div>
                
                {journeyData.customOptions?.monogram && (
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-muted-foreground">Monogram:</span>
                    <span className="font-medium">{journeyData.customOptions.monogram}</span>
                  </div>
                )}
                
                <div className="pt-2">
                  <div className="flex justify-between text-base">
                    <span className="font-medium">Estimated Price:</span>
                    <span className="font-bold text-gold-600">
                      ${((899 + (journeyData.fabric?.price || 0)/100)).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-right text-muted-foreground">
                    Final price may vary based on additional adjustments
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="p-4 bg-navy-950/5 rounded-lg mb-4">
            <h3 className="font-medium mb-2">Production Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Initial Consultation:</span>
                <span>1-2 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pattern Creation:</span>
                <span>3-5 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">First Fitting:</span>
                <span>7-10 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Final Production:</span>
                <span>14-18 days</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Estimated Time:</span>
                <span>3-4 weeks</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              onClick={onContinue}
              className="bg-gold-600 hover:bg-gold-700 text-white"
            >
              Proceed to Booking
            </Button>
            <Button variant="outline">
              Save Design for Later
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </div>
  );
};

// Summary stage
const SummaryStage = ({ 
  onRestart,
  journeyData
}: { 
  onRestart: () => void,
  journeyData: any
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    notes: '',
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Appointment booking submitted! We will contact you shortly to confirm your appointment.');
  };
  
  return (
    <div>
      <div className="text-center mb-8">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif mb-2">Complete Your Journey</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          You're almost done! Schedule an appointment with our master tailors to finalize your custom garment.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <Card className="mb-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Your Custom Design</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Style:</span>
                  <span className="font-medium">{journeyData.style?.name || "Custom Style"}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Fabric:</span>
                  <span className="font-medium">{journeyData.fabric?.name || "Selected Fabric"}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-bold text-gold-600">
                    ${((899 + (journeyData.fabric?.price || 0)/100)).toFixed(2)}
                  </span>
                </div>
                
                <div className="pt-2 text-center">
                  <Button variant="outline" size="sm">
                    View Design Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div 
            className="rounded-lg overflow-hidden aspect-video mb-4"
            style={{
              backgroundImage: `url(${displayRoom})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="h-full w-full bg-black/30 flex items-center justify-center">
              <div className="text-white text-center p-6">
                <h3 className="text-xl font-serif mb-2">The Emperor Experience</h3>
                <p className="mb-4 text-white/80">
                  Our master tailors are ready to bring your vision to life
                </p>
                <Button className="bg-gold-600 hover:bg-gold-700 text-white">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 border rounded-lg space-y-4">
              <h3 className="font-medium text-lg mb-2">Book Your Appointment</h3>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Preferred Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.preferredDate}
                  onChange={(e) => handleChange('preferredDate', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Additional Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full p-2 border rounded-md h-20"
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Have questions about the process? Contact our customer service team.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm">
                Live Chat
              </Button>
              <Button variant="outline" size="sm">
                +1 (800) 555-1234
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button variant="link" onClick={onRestart}>
          Start a New Journey
        </Button>
      </div>
    </div>
  );
};

// Main JourneyStore component
const JourneyStore = () => {
  const [currentStage, setCurrentStage] = useState<JourneyStage>(JourneyStage.WELCOME);
  const [journeyData, setJourneyData] = useState<Record<string, any>>({});
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Handle stage transitions with scroll to top
  const goToStage = (stage: JourneyStage) => {
    setCurrentStage(stage);
    
    // Scroll to top when changing stages
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle data updates from stages
  const updateJourneyData = (key: string, data: any) => {
    setJourneyData(prev => ({
      ...prev,
      [key]: data
    }));
  };
  
  // Restart the journey
  const restartJourney = () => {
    setJourneyData({});
    goToStage(JourneyStage.WELCOME);
  };
  
  return (
    <div className="container mx-auto py-8" ref={contentRef}>
      <div className="max-w-4xl mx-auto">
        {currentStage !== JourneyStage.WELCOME && (
          <JourneyProgress currentStage={currentStage} />
        )}
        
        {currentStage === JourneyStage.WELCOME && (
          <WelcomeStage 
            onContinue={() => goToStage(JourneyStage.STYLE_SELECTION)} 
          />
        )}
        
        {currentStage === JourneyStage.STYLE_SELECTION && (
          <StyleSelectionStage 
            onContinue={() => goToStage(JourneyStage.FABRIC_SELECTION)} 
            onBack={() => goToStage(JourneyStage.WELCOME)}
            onSelectStyle={(style) => updateJourneyData('style', style)}
          />
        )}
        
        {currentStage === JourneyStage.FABRIC_SELECTION && (
          <FabricSelectionStage 
            onContinue={() => goToStage(JourneyStage.CUSTOMIZATION)} 
            onBack={() => goToStage(JourneyStage.STYLE_SELECTION)}
            onSelectFabric={(fabric) => updateJourneyData('fabric', fabric)}
          />
        )}
        
        {currentStage === JourneyStage.CUSTOMIZATION && (
          <CustomizationStage 
            onContinue={() => goToStage(JourneyStage.MEASUREMENT)} 
            onBack={() => goToStage(JourneyStage.FABRIC_SELECTION)}
            onCustomize={(options) => updateJourneyData('customOptions', options)}
          />
        )}
        
        {currentStage === JourneyStage.MEASUREMENT && (
          <MeasurementStage 
            onContinue={() => goToStage(JourneyStage.VISUALIZATION)} 
            onBack={() => goToStage(JourneyStage.CUSTOMIZATION)}
            onSaveMeasurements={(measurements) => updateJourneyData('measurements', measurements)}
          />
        )}
        
        {currentStage === JourneyStage.VISUALIZATION && (
          <VisualizationStage 
            onContinue={() => goToStage(JourneyStage.SUMMARY)} 
            onBack={() => goToStage(JourneyStage.MEASUREMENT)}
            journeyData={journeyData}
          />
        )}
        
        {currentStage === JourneyStage.SUMMARY && (
          <SummaryStage 
            onRestart={restartJourney}
            journeyData={journeyData}
          />
        )}
      </div>
    </div>
  );
};

export default JourneyStore;