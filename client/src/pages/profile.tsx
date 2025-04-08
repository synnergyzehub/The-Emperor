import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { User, Measurement, CustomDesign, Appointment, Order } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil, Calendar, ShoppingBag, Ruler, Layout } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";

const Profile: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "My Profile | The Emperor";
  }, []);
  
  // Fetch user data
  const { data: user, isLoading: userLoading } = useQuery<User | null>({
    queryKey: ['/api/user/profile'],
    onError: () => {
      // Redirect to login if not authenticated
      toast({
        title: "Authentication Required",
        description: "Please log in to view your profile.",
        variant: "destructive"
      });
      // Redirect to login page when it's implemented
    }
  });
  
  // Fetch measurements
  const { data: measurements, isLoading: measurementsLoading } = useQuery<Measurement[]>({
    queryKey: ['/api/user/measurements'],
    enabled: !!user,
  });
  
  // Fetch custom designs
  const { data: designs, isLoading: designsLoading } = useQuery<CustomDesign[]>({
    queryKey: ['/api/user/designs'],
    enabled: !!user,
  });
  
  // Fetch appointments
  const { data: appointments, isLoading: appointmentsLoading } = useQuery<Appointment[]>({
    queryKey: ['/api/user/appointments'],
    enabled: !!user,
  });
  
  // Fetch orders
  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['/api/user/orders'],
    enabled: !!user,
  });
  
  // Cancel appointment mutation
  const cancelAppointment = useMutation({
    mutationFn: (appointmentId: number) => 
      apiRequest("PATCH", `/api/appointments/${appointmentId}/cancel`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/appointments'] });
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
      });
    }
  });
  
  // If not logged in or loading
  if (userLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }
  
  // If no user is found
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-playfair text-[#0A1F44] mb-6">Please Login to View Your Profile</h2>
        <p className="text-[#36454F] mb-8 text-center max-w-md">
          Access your appointments, measurements, and custom designs by logging into your account.
        </p>
        <Button 
          className="bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37]"
          onClick={() => {
            // Redirect to login page when implemented
            toast({
              title: "Login Page",
              description: "Login page not yet implemented in this version.",
            });
          }}
        >
          Login
        </Button>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-[#FFFFF0]">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="mb-10">
          <h1 className="text-[#0A1F44] font-playfair text-4xl md:text-5xl mb-4">My Profile</h1>
          <div className="w-20 h-px bg-[#D4AF37] mb-6"></div>
          <p className="text-[#36454F]">
            Welcome back, {user.firstName} {user.lastName}. Manage your appointments, view your measurements, and review your custom designs.
          </p>
        </div>
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="mb-6 bg-[#F8F5E6] p-1 border border-[#D4AF37]/20">
            <TabsTrigger value="appointments" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F44]">
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="measurements" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F44]">
              <Ruler className="h-4 w-4 mr-2" />
              Measurements
            </TabsTrigger>
            <TabsTrigger value="designs" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F44]">
              <Layout className="h-4 w-4 mr-2" />
              Designs
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F44]">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Your Appointments</CardTitle>
                <CardDescription>
                  View and manage your upcoming appointments with our master tailors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                  </div>
                ) : appointments && appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="p-4 border border-[#D4AF37]/20 rounded-sm flex flex-col md:flex-row justify-between"
                      >
                        <div>
                          <h3 className="font-playfair text-lg text-[#0A1F44]">{appointment.type}</h3>
                          <p className="text-[#36454F]">
                            {format(new Date(appointment.date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                          </p>
                          <p className="text-[#36454F]">{appointment.location}</p>
                          {appointment.notes && (
                            <p className="text-[#36454F]/70 text-sm mt-2">Note: {appointment.notes}</p>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 flex items-start space-x-2">
                          <Button 
                            variant="outline" 
                            className="border-[#0A1F44] text-[#0A1F44]"
                            onClick={() => {
                              // Reschedule functionality
                              setLocation("/appointments");
                            }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => cancelAppointment.mutate(appointment.id)}
                            disabled={cancelAppointment.isPending}
                          >
                            {cancelAppointment.isPending ? "Cancelling..." : "Cancel"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#36454F] mb-4">You don't have any appointments scheduled.</p>
                    <Button 
                      className="bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37]"
                      onClick={() => setLocation("/appointments")}
                    >
                      Schedule an Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="measurements">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Your Measurements</CardTitle>
                <CardDescription>
                  These measurements are used to create your bespoke garments. Contact us if you've had significant changes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {measurementsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                  </div>
                ) : measurements && measurements.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {measurements[0].chest && (
                        <div className="p-4 border border-[#D4AF37]/20 rounded-sm">
                          <p className="text-sm uppercase tracking-wider text-[#36454F]/70">Chest</p>
                          <p className="text-xl font-playfair">{measurements[0].chest}</p>
                        </div>
                      )}
                      {measurements[0].waist && (
                        <div className="p-4 border border-[#D4AF37]/20 rounded-sm">
                          <p className="text-sm uppercase tracking-wider text-[#36454F]/70">Waist</p>
                          <p className="text-xl font-playfair">{measurements[0].waist}</p>
                        </div>
                      )}
                      {measurements[0].hips && (
                        <div className="p-4 border border-[#D4AF37]/20 rounded-sm">
                          <p className="text-sm uppercase tracking-wider text-[#36454F]/70">Hips</p>
                          <p className="text-xl font-playfair">{measurements[0].hips}</p>
                        </div>
                      )}
                      {measurements[0].shoulders && (
                        <div className="p-4 border border-[#D4AF37]/20 rounded-sm">
                          <p className="text-sm uppercase tracking-wider text-[#36454F]/70">Shoulders</p>
                          <p className="text-xl font-playfair">{measurements[0].shoulders}</p>
                        </div>
                      )}
                      {measurements[0].sleeve && (
                        <div className="p-4 border border-[#D4AF37]/20 rounded-sm">
                          <p className="text-sm uppercase tracking-wider text-[#36454F]/70">Sleeve</p>
                          <p className="text-xl font-playfair">{measurements[0].sleeve}</p>
                        </div>
                      )}
                      {measurements[0].inseam && (
                        <div className="p-4 border border-[#D4AF37]/20 rounded-sm">
                          <p className="text-sm uppercase tracking-wider text-[#36454F]/70">Inseam</p>
                          <p className="text-xl font-playfair">{measurements[0].inseam}</p>
                        </div>
                      )}
                    </div>
                    
                    {measurements[0].notes && (
                      <div className="p-4 border border-[#D4AF37]/20 rounded-sm">
                        <p className="text-sm uppercase tracking-wider text-[#36454F]/70 mb-2">Notes</p>
                        <p className="text-[#36454F]">{measurements[0].notes}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <p className="text-sm text-[#36454F]/70">
                        Last updated: {format(new Date(measurements[0].updatedAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#36454F] mb-4">We don't have your measurements on file yet.</p>
                    <Button 
                      className="bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37]"
                      onClick={() => setLocation("/appointments")}
                    >
                      Schedule a Measuring Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="designs">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Your Custom Designs</CardTitle>
                <CardDescription>
                  View and manage your saved custom designs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {designsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                  </div>
                ) : designs && designs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {designs.map((design) => (
                      <div key={design.id} className="border border-[#D4AF37]/20 rounded-sm overflow-hidden">
                        <div className="h-48 bg-[#F8F5E6] flex items-center justify-center">
                          <div className="text-center text-[#36454F]/50">
                            [Design Preview]
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-playfair text-lg text-[#0A1F44] mb-2">{design.name}</h3>
                          <p className="text-sm text-[#36454F] mb-4">
                            Created on {format(new Date(design.createdAt), "MMMM d, yyyy")}
                          </p>
                          <div className="flex space-x-2">
                            <Button 
                              className="bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37]"
                              onClick={() => setLocation(`/customize?design=${design.id}`)}
                            >
                              Edit Design
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-[#0A1F44] text-[#0A1F44]"
                              onClick={() => {
                                toast({
                                  title: "Order Requested",
                                  description: "We've received your order request and will contact you shortly.",
                                });
                              }}
                            >
                              Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#36454F] mb-4">You haven't saved any custom designs yet.</p>
                    <Button 
                      className="bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37]"
                      onClick={() => setLocation("/customize")}
                    >
                      Create a Custom Design
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Your Orders</CardTitle>
                <CardDescription>
                  Track the status of your orders and view order history.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id} 
                        className="p-4 border border-[#D4AF37]/20 rounded-sm"
                      >
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-playfair text-lg text-[#0A1F44]">Order #{order.id}</h3>
                            <p className="text-[#36454F]">
                              Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'in_progress' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-[#36454F]">
                            Total: ${(order.total / 100).toFixed(2)}
                          </p>
                          <Button 
                            variant="outline"
                            className="text-[#0A1F44] border-[#0A1F44]"
                            onClick={() => {
                              toast({
                                title: "Order Details",
                                description: "Order details view not implemented in this version.",
                              });
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#36454F] mb-4">You don't have any orders yet.</p>
                    <Button 
                      className="bg-[#D4AF37] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#D4AF37]"
                      onClick={() => setLocation("/customize")}
                    >
                      Start Designing
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
