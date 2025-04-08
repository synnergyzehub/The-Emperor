import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const Testimonials: React.FC = () => {
  // Fetch testimonials from API
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  // Default testimonials for development
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rahul Mehta",
      location: "Mumbai, India",
      testimonial: "The Emperor's attention to detail is unmatched. My wedding sherwani was beyond what I could have envisioned, with personal touches that made it truly one-of-a-kind.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      featured: true
    },
    {
      id: 2,
      name: "James Richardson",
      location: "London, UK",
      testimonial: "From the initial consultation to the final fitting, The Emperor experience is exceptional. Their expert tailors guided me toward suit details I would never have considered, resulting in a garment that feels uniquely mine.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      featured: true
    },
    {
      id: 3,
      name: "David Chen",
      location: "Singapore",
      testimonial: "When you wear a suit from The Emperor, you immediately understand the difference. The fabric, the construction, the way it moves with you—it's an investment in how you present yourself to the world.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      featured: true
    }
  ];
  
  const displayTestimonials = testimonials || defaultTestimonials;
  
  return (
    <section className="py-20 bg-[#0A1F44]/5">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h3 className="text-[#0A1F44] font-playfair text-3xl md:text-4xl mb-4">Client Experiences</h3>
          <div className="w-20 h-px bg-[#D4AF37] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white p-8 shadow-lg rounded-sm relative">
                <Skeleton className="h-32 w-full mb-6" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Display testimonials
            displayTestimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-8 shadow-lg rounded-sm relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="text-[#D4AF37]/10">
                    <path fill="currentColor" d="M0,24.9c0-3.8,0.7-7.2,2.2-10.2s3.5-5.4,5.9-7.1S14.5,5,18.4,5c3,0,5.7,0.8,8,2.3c2.4,1.5,4.3,3.6,5.7,6.2c1.4,2.6,2.1,5.5,2.1,8.6c0,2.9-0.5,5.6-1.4,8.1s-2.3,4.7-4,6.6s-3.7,3.5-5.9,4.8s-4.6,2.3-7.3,3l-2.6-5.4c2.9-0.7,5.3-1.8,7.4-3.2c2-1.5,3.5-3.2,4.5-5.1s1.5-4,1.5-6.1c0-1.5-0.3-2.8-1-3.8C24.7,19.9,23.6,19,22,19c-1.5,0-2.8,0.5-3.8,1.6c-1,1.1-1.6,2.5-1.6,4.2c0,1.5,0.5,2.8,1.4,3.8c0.9,1.1,2.2,1.6,3.8,1.6c0.5,0,1,0,1.3-0.1c-0.2,0.8-0.3,1.7-0.3,2.4c0,2.4,0.6,4.3,1.7,5.8S27.6,41,30,41c2.1,0,3.8-0.2,5.2-0.7c1.3-0.5,2.3-1.1,3-1.9c0.7-0.8,1-1.7,1-2.7c0-0.8-0.2-1.5-0.7-2.1S37.2,32.5,36,32c-1.2-0.5-2.5-0.7-3.9-0.7c-0.5,0-1,0-1.3,0.1c0.2-0.8,0.3-1.7,0.3-2.4c0-2.4-0.6-4.3-1.7-5.8s-2.7-2.2-4.8-2.2c-2.1,0-3.8,0.2-5.2,0.7c-1.3,0.5-2.3,1.1-3,1.9c-0.7,0.8-1,1.7-1,2.7c0,0.8,0.2,1.5,0.7,2.1s1.2,1.1,2.4,1.6c1.2,0.5,2.5,0.7,3.9,0.7c0.5,0,1-0,1.3-0.1C23.9,30.7,22.6,31.8,21,32.5c-1.6,0.7-3.3,1-5.1,1c-3.1,0-5.5-0.9-7.3-2.7c-1.8-1.8-2.7-4.1-2.7-7C5.9,20.7,7.3,18,10,16c2.7-2,6.1-3,10-3c2.9,0,5.4,0.5,7.5,1.5s3.8,2.4,4.9,4.3c1.1,1.8,1.7,4,1.7,6.5c0,2.4-0.6,4.5-1.9,6.3c-1.3,1.8-3,3.2-5.1,4.2c-2.1,1-4.4,1.5-6.9,1.5c-2,0-3.8-0.3-5.4-0.9c-1.6-0.6-2.9-1.5-3.9-2.7C5.8,31.5,5,29.9,5,28.1c0-2.4,0.9-4.3,2.7-5.7c1.8-1.4,4.1-2.1,6.9-2.1c2.3,0,4.2,0.6,5.9,1.7c1.7,1.1,2.6,2.6,2.6,4.5c0,1.2-0.4,2.2-1.2,3s-1.8,1.3-3.1,1.5c1.2,0.2,2.3,0.7,3.1,1.5c0.9,0.8,1.3,1.8,1.3,3c0,1.9-0.9,3.4-2.6,4.5c-1.7,1.1-3.8,1.7-6.3,1.7c-3.1,0-5.7-0.7-7.9-2.2S1.8,34.8,0.6,32L0,24.9z"/>
                  </svg>
                </div>
                <p className="text-[#36454F] mb-6 font-light italic">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h5 className="font-playfair text-[#0A1F44]">{testimonial.name}</h5>
                    <p className="text-[#36454F]/70 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
