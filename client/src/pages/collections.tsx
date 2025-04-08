import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Collection } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const Collections: React.FC = () => {
  useEffect(() => {
    document.title = "Collections | The Emperor";
  }, []);

  // Fetch all collections
  const { data: collections, isLoading } = useQuery<Collection[]>({
    queryKey: ['/api/collections/all'],
  });

  return (
    <div className="py-16 md:py-24 bg-[#FFFFF0]">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h1 className="text-[#0A1F44] font-playfair text-4xl md:text-5xl mb-4">Our Collections</h1>
          <p className="text-[#36454F] max-w-2xl mx-auto">
            Explore our meticulously crafted collections, each designed with a distinct character and purpose.
          </p>
          <div className="w-20 h-px bg-[#D4AF37] mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="mb-16">
                <Skeleton className="w-full h-[400px] mb-6" />
                <Skeleton className="h-10 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {collections?.map((collection) => (
              <div key={collection.id} className="mb-16">
                <div className="relative h-[400px] overflow-hidden mb-6 luxury-shadow">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <h2 className="text-white font-playfair text-3xl">{collection.name}</h2>
                      <p className="text-[#F8F5E6] text-sm">{collection.tagline}</p>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-[#36454F]">{collection.description}</p>
                </div>
                <div className="mt-4">
                  <a 
                    href="#" 
                    className="inline-block border-b-2 border-[#D4AF37] text-[#0A1F44] font-medium hover:text-[#D4AF37] transition-colors"
                  >
                    View Collection Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
