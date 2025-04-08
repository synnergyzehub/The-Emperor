import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Collection } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedCollections: React.FC = () => {
  // Fetch collections from the API
  const { data: collections, isLoading, error } = useQuery<Collection[]>({
    queryKey: ['/api/collections'],
  });

  // Default collections in case API fails or during development
  const defaultCollections: Collection[] = [
    {
      id: 1,
      name: "The Executive",
      description: "Precision-cut suits that command presence in any boardroom, with signature details that speak of success.",
      tagline: "Essential elegance for the modern leader",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      name: "The Heritage",
      description: "Drawing from centuries of tailoring tradition, these pieces honor the past while embracing contemporary refinement.",
      tagline: "Timeless silhouettes with modern sensibility",
      image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 3,
      name: "The Sovereign",
      description: "When only extraordinary will do, these meticulously crafted evening and ceremonial garments ensure you command the room.",
      tagline: "Ceremonial splendor for life's grandest moments",
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    }
  ];

  const displayCollections = collections || defaultCollections;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h3 className="text-[#0A1F44] font-playfair text-3xl md:text-4xl mb-4">Signature Collections</h3>
          <div className="w-20 h-px bg-[#D4AF37] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="luxury-shadow hover:shadow-lg transition-shadow bg-white">
                <div className="relative overflow-hidden">
                  <Skeleton className="w-full h-[400px]" />
                </div>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : (
            // Display collections
            displayCollections.map((collection) => (
              <div key={collection.id} className="luxury-shadow hover:shadow-lg transition-shadow bg-white">
                <div className="relative overflow-hidden">
                  <img 
                    src={collection.image}
                    alt={collection.name} 
                    className="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111]/80 to-transparent p-4">
                    <h4 className="text-white font-playfair text-xl">{collection.name}</h4>
                    <p className="text-[#F8F5E6] text-sm">{collection.tagline}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#36454F] mb-4">
                    {collection.description}
                  </p>
                  <Link href={`/collections/${collection.id}`}>
                    <a className="text-[#0A1F44] border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors">
                      Explore Collection
                    </a>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
