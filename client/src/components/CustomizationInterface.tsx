import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Fabric } from "@shared/schema";
import { Eye, Maximize2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StyleOption {
  type: string;
  options: string[];
  selected: string;
}

const CustomizationInterface: React.FC = () => {
  const { toast } = useToast();
  
  // Garment state
  const [garmentType, setGarmentType] = useState<string>("Suit");
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [monogram, setMonogram] = useState<string>("");
  const [monogramPlacement, setMonogramPlacement] = useState<string>("Cuff");
  
  // Style options state
  const [styleOptions, setStyleOptions] = useState<StyleOption[]>([
    { type: "Lapel Style", options: ["Peak Lapel", "Notch Lapel", "Shawl Collar"], selected: "Peak Lapel" },
    { type: "Vents", options: ["Center Vent", "Side Vents", "No Vents"], selected: "Side Vents" },
    { type: "Button Configuration", options: ["Two Button", "Three Button", "Double-Breasted"], selected: "Two Button" }
  ]);
  
  // Fetch fabrics from API
  const { data: fabrics, isLoading: loadingFabrics } = useQuery<Fabric[]>({
    queryKey: ['/api/fabrics'],
  });
  
  // Default fabrics for development
  const defaultFabrics: Fabric[] = [
    {
      id: 1,
      name: "Navy Wool",
      type: "Wool",
      color: "Navy",
      pattern: "Solid",
      price: 18000,
      image: "https://images.unsplash.com/photo-1581513243061-c455bfb589be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      available: true
    },
    {
      id: 2,
      name: "Charcoal Twill",
      type: "Wool",
      color: "Charcoal",
      pattern: "Twill",
      price: 16000,
      image: "https://images.unsplash.com/photo-1598099947351-3f13bf0b8056?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      available: true
    },
    {
      id: 3,
      name: "Brown Herringbone",
      type: "Wool",
      color: "Brown",
      pattern: "Herringbone",
      price: 19000,
      image: "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      available: true
    }
  ];
  
  const displayFabrics = fabrics || defaultFabrics;
  
  // Update style option selection
  const updateStyleOption = (type: string, value: string) => {
    setStyleOptions(prev => 
      prev.map(option => 
        option.type === type ? { ...option, selected: value } : option
      )
    );
  };
  
  // Save design handler
  const handleSaveDesign = () => {
    toast({
      title: "Design Saved",
      description: "Your custom design has been saved to your profile."
    });
  };
  
  // Request quote handler
  const handleRequestQuote = () => {
    toast({
      title: "Quote Requested",
      description: "We'll prepare your quote and contact you shortly."
    });
  };
  
  return (
    <section className="py-20 bg-[#F8F5E6]">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h3 className="text-[#0A1F44] font-playfair text-3xl md:text-4xl mb-4">Craft Your Signature Style</h3>
          <p className="text-[#36454F] max-w-2xl mx-auto">
            Experience our interactive design suite to visualize your custom garment. Experiment with fabrics, details, and personalization before your appointment.
          </p>
          <div className="w-20 h-px bg-[#D4AF37] mx-auto mt-4"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden luxury-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Side - Options Panel */}
            <div className="bg-[#0A1F44] p-6 custom-scrollbar overflow-y-auto h-[700px]">
              <h4 className="text-[#D4AF37] font-playfair text-xl mb-6">Design Options</h4>
              
              {/* Garment Selection */}
              <div className="mb-8">
                <h5 className="text-white font-montserrat text-sm uppercase tracking-wider mb-3">Garment Type</h5>
                <div className="grid grid-cols-2 gap-3">
                  {["Suit", "Shirt", "Coat", "Sherwani"].map(type => (
                    <button 
                      key={type}
                      className={`${
                        garmentType === type 
                          ? "bg-[#D4AF37]/10 border-[#D4AF37]" 
                          : "bg-transparent border-[#F8F5E6]/30 hover:bg-[#D4AF37]/20"
                      } border-2 text-white py-2 rounded transition-colors`}
                      onClick={() => setGarmentType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Fabric Selection */}
              <div className="mb-8">
                <h5 className="text-white font-montserrat text-sm uppercase tracking-wider mb-3">Fabric</h5>
                <div className="grid grid-cols-3 gap-3">
                  {displayFabrics.map(fabric => (
                    <div 
                      key={fabric.id} 
                      className="fabric-swatch cursor-pointer"
                      onClick={() => setSelectedFabric(fabric)}
                    >
                      <div className={`h-20 rounded overflow-hidden border-2 ${selectedFabric?.id === fabric.id ? 'border-[#D4AF37]' : 'border-transparent hover:border-[#D4AF37]'}`}>
                        <img 
                          src={fabric.image}
                          alt={fabric.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white text-xs mt-1 text-center">{fabric.name}</p>
                    </div>
                  ))}
                  
                  <div className="col-span-3 mt-2">
                    <button className="w-full border border-[#F8F5E6]/30 text-[#F8F5E6] hover:bg-[#D4AF37]/10 py-2 rounded text-sm">
                      View All Fabrics
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Style Details */}
              <div className="mb-8">
                <h5 className="text-white font-montserrat text-sm uppercase tracking-wider mb-3">Style Details</h5>
                
                <div className="space-y-4">
                  {styleOptions.map(option => (
                    <div key={option.type}>
                      <label className="block text-[#F8F5E6] text-sm mb-1">{option.type}</label>
                      <select 
                        className="w-full bg-[#0A1F44] border border-[#F8F5E6]/30 text-white rounded py-2 px-3"
                        value={option.selected}
                        onChange={(e) => updateStyleOption(option.type, e.target.value)}
                      >
                        {option.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Monogramming */}
              <div>
                <h5 className="text-white font-montserrat text-sm uppercase tracking-wider mb-3">Personalization</h5>
                <div>
                  <label className="block text-[#F8F5E6] text-sm mb-1">Monogram Initials</label>
                  <input 
                    type="text" 
                    maxLength={3} 
                    placeholder="ABC" 
                    className="w-full bg-[#0A1F44] border border-[#F8F5E6]/30 text-white rounded py-2 px-3 placeholder-[#F8F5E6]/50"
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-[#F8F5E6] text-sm mb-1">Monogram Placement</label>
                  <select 
                    className="w-full bg-[#0A1F44] border border-[#F8F5E6]/30 text-white rounded py-2 px-3"
                    value={monogramPlacement}
                    onChange={(e) => setMonogramPlacement(e.target.value)}
                  >
                    <option value="Cuff">Cuff</option>
                    <option value="Inner Collar">Inner Collar</option>
                    <option value="Inner Lining">Inner Lining</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Center and Right - Visualization Area */}
            <div className="lg:col-span-2 p-6 flex flex-col h-[700px]">
              <div className="flex-grow relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1523201886725-d2db3d7129d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Navy suit visualization" 
                      className="w-full rounded"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="bg-white rounded-full p-2 shadow hover:bg-[#F8F5E6] transition-colors">
                        <Eye className="h-5 w-5 text-[#0A1F44]" />
                      </button>
                      <button className="bg-white rounded-full p-2 shadow hover:bg-[#F8F5E6] transition-colors">
                        <Maximize2 className="h-5 w-5 text-[#0A1F44]" />
                      </button>
                      <button className="bg-white rounded-full p-2 shadow hover:bg-[#F8F5E6] transition-colors">
                        <RotateCcw className="h-5 w-5 text-[#0A1F44]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-[#36454F]/10 pt-4 mt-4 flex flex-wrap items-center justify-between">
                <div>
                  <h4 className="text-[#0A1F44] font-playfair text-xl">
                    {selectedFabric?.name || "Navy Wool"} {styleOptions.find(o => o.type === "Lapel Style")?.selected || "Peak Lapel"} {garmentType}
                  </h4>
                  <p className="text-[#36454F]/70">Estimated completion: 4-5 weeks</p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex space-x-4">
                  <button 
                    className="border border-[#0A1F44] text-[#0A1F44] px-5 py-2 rounded hover:bg-[#0A1F44] hover:text-white transition-colors"
                    onClick={handleSaveDesign}
                  >
                    Save Design
                  </button>
                  <button 
                    className="bg-[#D4AF37] text-[#0A1F44] px-5 py-2 rounded hover:bg-[#0A1F44] hover:text-[#D4AF37] transition-colors"
                    onClick={handleRequestQuote}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationInterface;
