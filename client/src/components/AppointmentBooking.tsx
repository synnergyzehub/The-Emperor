import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

// Define the appointment form schema
const appointmentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date"),
  appointmentType: z.string().min(1, "Please select an appointment type"),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const AppointmentBooking: React.FC = () => {
  const { toast } = useToast();
  
  // Form definition
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      appointmentType: "Initial Consultation",
      notes: "",
    },
  });
  
  // Mutation for submitting appointment
  const appointmentMutation = useMutation({
    mutationFn: (data: AppointmentFormValues) => 
      apiRequest("POST", "/api/appointments", data),
    onSuccess: () => {
      toast({
        title: "Appointment Requested",
        description: "We'll confirm your appointment shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to schedule appointment",
        variant: "destructive",
      });
    },
  });
  
  // Form submission handler
  const onSubmit = (data: AppointmentFormValues) => {
    appointmentMutation.mutate(data);
  };
  
  return (
    <section className="py-20 bg-[#0A1F44] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1585914924626-15adac1e6402?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Luxury tailoring background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-[#D4AF37] font-playfair text-3xl md:text-4xl mb-4">Begin Your Bespoke Journey</h3>
          <p className="text-white text-lg">
            Schedule a consultation with our master tailors to discuss your vision and explore the possibilities.
          </p>
        </div>
        
        <div className="bg-white rounded-sm shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h4 className="text-[#0A1F44] font-playfair text-2xl mb-6">Book Your Appointment</h4>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#36454F]">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border border-[#36454F]/20 rounded-sm p-3 focus:border-[#D4AF37]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#36454F]">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="border border-[#36454F]/20 rounded-sm p-3 focus:border-[#D4AF37]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#36454F]">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="border border-[#36454F]/20 rounded-sm p-3 focus:border-[#D4AF37]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#36454F]">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="tel"
                            className="border border-[#36454F]/20 rounded-sm p-3 focus:border-[#D4AF37]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#36454F]">Preferred Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="date"
                            className="border border-[#36454F]/20 rounded-sm p-3 focus:border-[#D4AF37]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="appointmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#36454F]">Appointment Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border border-[#36454F]/20 rounded-sm p-3 focus:border-[#D4AF37]">
                              <SelectValue placeholder="Select appointment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Initial Consultation">Initial Consultation</SelectItem>
                            <SelectItem value="Fabric Selection">Fabric Selection</SelectItem>
                            <SelectItem value="First Fitting">First Fitting</SelectItem>
                            <SelectItem value="Final Fitting">Final Fitting</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#36454F]">Special Requests or Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            rows={3}
                            className="border border-[#36454F]/20 rounded-sm p-3 focus:border-[#D4AF37]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37] py-3 rounded-sm text-sm uppercase tracking-wider transition-colors"
                    disabled={appointmentMutation.isPending}
                  >
                    {appointmentMutation.isPending ? "Submitting..." : "Request Appointment"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="bg-[#0A1F44] p-8 md:p-12 flex flex-col">
              <h4 className="text-[#D4AF37] font-playfair text-2xl mb-6">Visit Our Boutique</h4>
              
              <div className="space-y-6 text-white">
                <div>
                  <h5 className="font-montserrat uppercase tracking-wider text-sm text-[#D4AF37] mb-2">Location</h5>
                  <p className="font-light">
                    The Emperor Bespoke Tailoring<br/>
                    17 Savile Row<br/>
                    London, W1S 3PN<br/>
                    United Kingdom
                  </p>
                </div>
                
                <div>
                  <h5 className="font-montserrat uppercase tracking-wider text-sm text-[#D4AF37] mb-2">Hours</h5>
                  <p className="font-light">
                    Monday - Friday: 10:00 AM - 7:00 PM<br/>
                    Saturday: 10:00 AM - 5:00 PM<br/>
                    Sunday: By appointment only
                  </p>
                </div>
                
                <div>
                  <h5 className="font-montserrat uppercase tracking-wider text-sm text-[#D4AF37] mb-2">Contact</h5>
                  <p className="font-light">
                    Phone: +44 (0)20 7123 4567<br/>
                    Email: appointments@theemperor.com
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-8">
                <h5 className="font-montserrat uppercase tracking-wider text-sm text-[#D4AF37] mb-4">Our Boutique</h5>
                <div className="rounded overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559732277-7453b141e3a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="The Emperor boutique interior" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBooking;
