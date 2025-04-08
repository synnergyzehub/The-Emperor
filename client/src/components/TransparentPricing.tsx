import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Check, Info, Plus, Minus, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import Ottoman-inspired backgrounds
import ottomanPattern from "@assets/CF53FFAA-E490-4DC2-A95C-85E71B734080.png";
import displayRoom from "@assets/701CE6B1-F57D-4291-9043-632927C409D2.png";
import emperorLogo from "@assets/9E56EEEE-7167-465D-B51A-6DBE47E7A2E9.png";

// Pricing breakdown info component
const PricingInfoTooltip = ({ label, content }: { label: string; content: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0 text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5" />
            <span className="sr-only">Info</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Pricing calculator component
const PricingCalculator = () => {
  const [garmentType, setGarmentType] = useState("suit");
  const [fabricTier, setFabricTier] = useState("premium");
  const [customizationLevel, setCustomizationLevel] = useState("standard");
  const [quantity, setQuantity] = useState(1);

  // Base pricing tiers
  const garmentBasePrices = {
    suit: 79900, // in cents
    blazer: 59900,
    shirt: 24900,
    trousers: 34900,
    waistcoat: 29900,
  };

  // Fabric pricing tiers
  const fabricPrices = {
    standard: { suit: 19900, blazer: 14900, shirt: 7900, trousers: 9900, waistcoat: 7900 },
    premium: { suit: 29900, blazer: 19900, shirt: 12900, trousers: 14900, waistcoat: 12900 },
    luxury: { suit: 49900, blazer: 34900, shirt: 19900, trousers: 24900, waistcoat: 19900 },
  };

  // Customization pricing tiers
  const customizationPrices = {
    basic: { suit: 9900, blazer: 7900, shirt: 4900, trousers: 5900, waistcoat: 4900 },
    standard: { suit: 14900, blazer: 11900, shirt: 7900, trousers: 8900, waistcoat: 7900 },
    extensive: { suit: 24900, blazer: 19900, shirt: 12900, trousers: 14900, waistcoat: 12900 },
  };

  // Calculate pricing breakdown
  const basePrice = garmentBasePrices[garmentType as keyof typeof garmentBasePrices];
  const fabricPrice = fabricPrices[fabricTier as keyof typeof fabricPrices][garmentType as keyof typeof garmentBasePrices];
  const customizationPrice = customizationPrices[customizationLevel as keyof typeof customizationPrices][garmentType as keyof typeof garmentBasePrices];
  
  // Labor costs (always transparent)
  const cuttingFee = garmentType === "suit" ? 9900 : (garmentType === "blazer" ? 7900 : 4900);
  const tailoringFee = garmentType === "suit" ? 19900 : (garmentType === "blazer" ? 14900 : 9900);
  const finishingFee = garmentType === "suit" ? 9900 : (garmentType === "blazer" ? 7900 : 4900);
  
  // Calculate total
  const totalPerItem = basePrice + fabricPrice + customizationPrice + cuttingFee + tailoringFee + finishingFee;
  const totalPrice = totalPerItem * quantity;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-serif">Custom Pricing Calculator</CardTitle>
        <CardDescription>
          See exactly what you're paying for with our transparent pricing model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Garment Type</h3>
            <select
              className="w-full p-2 border border-border rounded-md"
              value={garmentType}
              onChange={(e) => setGarmentType(e.target.value)}
            >
              <option value="suit">Suit</option>
              <option value="blazer">Blazer</option>
              <option value="shirt">Shirt</option>
              <option value="trousers">Trousers</option>
              <option value="waistcoat">Waistcoat</option>
            </select>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex border border-border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none border-r border-border"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 px-3 py-2 text-center focus:outline-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none border-l border-border"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Fabric Quality</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={fabricTier === "standard" ? "default" : "outline"}
              size="sm"
              onClick={() => setFabricTier("standard")}
              className="w-full justify-start"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  fabricTier === "standard" ? "opacity-100" : "opacity-0"
                }`}
              />
              Standard
            </Button>
            <Button
              variant={fabricTier === "premium" ? "default" : "outline"}
              size="sm"
              onClick={() => setFabricTier("premium")}
              className="w-full justify-start"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  fabricTier === "premium" ? "opacity-100" : "opacity-0"
                }`}
              />
              Premium
            </Button>
            <Button
              variant={fabricTier === "luxury" ? "default" : "outline"}
              size="sm"
              onClick={() => setFabricTier("luxury")}
              className="w-full justify-start"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  fabricTier === "luxury" ? "opacity-100" : "opacity-0"
                }`}
              />
              Luxury
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Customization Level</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={customizationLevel === "basic" ? "default" : "outline"}
              size="sm"
              onClick={() => setCustomizationLevel("basic")}
              className="w-full justify-start"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  customizationLevel === "basic" ? "opacity-100" : "opacity-0"
                }`}
              />
              Basic
            </Button>
            <Button
              variant={customizationLevel === "standard" ? "default" : "outline"}
              size="sm"
              onClick={() => setCustomizationLevel("standard")}
              className="w-full justify-start"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  customizationLevel === "standard" ? "opacity-100" : "opacity-0"
                }`}
              />
              Standard
            </Button>
            <Button
              variant={customizationLevel === "extensive" ? "default" : "outline"}
              size="sm"
              onClick={() => setCustomizationLevel("extensive")}
              className="w-full justify-start"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  customizationLevel === "extensive" ? "opacity-100" : "opacity-0"
                }`}
              />
              Extensive
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">Base Price</span>
              <PricingInfoTooltip
                label="Base Price"
                content="The starting price for the garment, covering core construction and standard features."
              />
            </div>
            <span>${(basePrice / 100).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">Fabric Cost</span>
              <PricingInfoTooltip
                label="Fabric Cost"
                content="The price of the fabric based on quality tier, including sourcing and quality control."
              />
            </div>
            <span>${(fabricPrice / 100).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">Customization</span>
              <PricingInfoTooltip
                label="Customization"
                content="The cost of personalizing your garment with specific design elements and features."
              />
            </div>
            <span>${(customizationPrice / 100).toFixed(2)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">Cutting Fee</span>
              <PricingInfoTooltip
                label="Cutting Fee"
                content="The labor cost for precise pattern making and fabric cutting by master craftsmen."
              />
            </div>
            <span>${(cuttingFee / 100).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">Tailoring Fee</span>
              <PricingInfoTooltip
                label="Tailoring Fee"
                content="The cost of expert hand and machine work to construct your garment."
              />
            </div>
            <span>${(tailoringFee / 100).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">Finishing Fee</span>
              <PricingInfoTooltip
                label="Finishing Fee"
                content="The cost for final detailing, quality control, and perfect presentation."
              />
            </div>
            <span>${(finishingFee / 100).toFixed(2)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between items-center font-medium">
            <span>Per Item Total</span>
            <span>${(totalPerItem / 100).toFixed(2)}</span>
          </div>
          
          {quantity > 1 && (
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Quantity</span>
              <span>x{quantity}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border pt-6">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Total Price</div>
          <div className="text-2xl font-bold">${(totalPrice / 100).toFixed(2)}</div>
        </div>
        <Button className="bg-gold-600 hover:bg-gold-700">Book Appointment</Button>
      </CardFooter>
    </Card>
  );
};

// Pricing comparison table
const PricingComparison = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-medium">Feature</th>
            <th className="text-center p-3">The Emperor</th>
            <th className="text-center p-3">Traditional Luxury Brands</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-3">Transparent Pricing</td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
            <td className="text-center p-3">
              <Badge variant="outline" className="border-red-500 text-red-500">
                No
              </Badge>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-3">Fabric Cost Breakdown</td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
            <td className="text-center p-3">
              <Badge variant="outline" className="border-red-500 text-red-500">
                No
              </Badge>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-3">Labor Cost Disclosure</td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
            <td className="text-center p-3">
              <Badge variant="outline" className="border-red-500 text-red-500">
                No
              </Badge>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-3">Markup Transparency</td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
            <td className="text-center p-3">
              <Badge variant="outline" className="border-red-500 text-red-500">
                No
              </Badge>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-3">Premium Materials</td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-3">Master Craftsmanship</td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
            <td className="text-center p-3">
              <Badge className="bg-green-500">Yes</Badge>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-3">Brand Premium</td>
            <td className="text-center p-3">
              <Badge variant="outline" className="border-green-500 text-green-500">
                Minimal
              </Badge>
            </td>
            <td className="text-center p-3">
              <Badge variant="outline" className="border-red-500 text-red-500">
                200-400%
              </Badge>
            </td>
          </tr>
          <tr>
            <td className="p-3">Value for Money</td>
            <td className="text-center p-3">
              <Badge className="bg-gold-600">Exceptional</Badge>
            </td>
            <td className="text-center p-3">
              <Badge variant="outline">Variable</Badge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Main TransparentPricing component
const TransparentPricing = () => {
  return (
    <div className="container mx-auto py-8">
      <div
        className="h-[300px] rounded-lg mb-8 relative overflow-hidden"
        style={{
          background: `url(${displayRoom}) center/cover no-repeat`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
              Transparent Pricing Philosophy
            </h1>
            <p className="text-white/80">
              At The Emperor, we believe in complete transparency. You deserve to know
              exactly what you're paying for—from the finest fabrics to expert
              craftsmanship. No hidden costs, no excessive markups.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif mb-6 text-center">
          Our Commitment to Transparency
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="relative pb-0">
              <div className="absolute top-2 right-2 bg-gold-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <CardTitle className="font-serif">Fair Material Pricing</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground">
                We source premium fabrics directly and charge only what they cost us, plus
                minimal handling fees. No arbitrary markups.
              </p>
              <div className="mt-4 flex justify-between text-sm">
                <span>Material Cost</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2 mt-1" />
              <div className="mt-2 flex justify-between text-sm">
                <span>Import & Logistics</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2 mt-1" />
              <div className="mt-2 flex justify-between text-sm">
                <span>Handling</span>
                <span>10%</span>
              </div>
              <Progress value={10} className="h-2 mt-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="relative pb-0">
              <div className="absolute top-2 right-2 bg-gold-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <CardTitle className="font-serif">Honest Craftsmanship</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground">
                We pay our master tailors fairly and transparently share these costs with
                you. Quality craftsmanship at fair prices.
              </p>
              <div className="mt-4 flex justify-between text-sm">
                <span>Pattern & Cutting</span>
                <span>25%</span>
              </div>
              <Progress value={25} className="h-2 mt-1" />
              <div className="mt-2 flex justify-between text-sm">
                <span>Construction</span>
                <span>50%</span>
              </div>
              <Progress value={50} className="h-2 mt-1" />
              <div className="mt-2 flex justify-between text-sm">
                <span>Finishing</span>
                <span>25%</span>
              </div>
              <Progress value={25} className="h-2 mt-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="relative pb-0">
              <div className="absolute top-2 right-2 bg-gold-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <CardTitle className="font-serif">No Hidden Costs</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground">
                Traditional luxury brands mark up products by 4-8x. We maintain a modest,
                transparent margin to sustain our business.
              </p>
              <div className="mt-4 flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>The Emperor</span>
                </div>
                <span className="font-medium">1.5x</span>
              </div>
              <Progress value={37.5} className="h-2 mt-1" />
              <div className="mt-2 flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>Premium Brands</span>
                </div>
                <span className="font-medium">4x</span>
              </div>
              <Progress value={80} className="h-2 mt-1 bg-amber-100">
                <div className="h-full bg-amber-500" style={{ width: "80%" }} />
              </Progress>
              <div className="mt-2 flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Luxury Brands</span>
                </div>
                <span className="font-medium">8x+</span>
              </div>
              <Progress value={100} className="h-2 mt-1 bg-red-100">
                <div className="h-full bg-red-500" style={{ width: "100%" }} />
              </Progress>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-serif mb-4">Compare the Difference</h2>
          <p className="text-muted-foreground mb-6">
            See how our transparent pricing model compares to traditional luxury brands.
            We provide the same quality materials and craftsmanship without the inflated
            markup.
          </p>
          <PricingComparison />
        </div>
        
        <div>
          <h2 className="text-2xl font-serif mb-4">Calculate Your Price</h2>
          <p className="text-muted-foreground mb-6">
            Use our interactive tool to get an instant estimate for your bespoke garment.
            Play with different fabric qualities and customization levels to see how each
            choice affects the final price.
          </p>
          <PricingCalculator />
        </div>
      </div>

      <div className="bg-navy-950 text-white p-8 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-serif mb-4">Our Promise to You</h2>
            <p className="mb-4">
              We believe that luxury shouldn't come with mystery pricing. The Emperor's
              transparent pricing model ensures you get exceptional quality without paying
              for artificial markup.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex gap-3 items-start">
                <Check className="h-5 w-5 text-gold-500 mt-0.5" />
                <p className="text-white/80">
                  We reveal the true cost of materials, labor, and overhead
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <Check className="h-5 w-5 text-gold-500 mt-0.5" />
                <p className="text-white/80">
                  We maintain a fair, sustainable profit margin with no hidden fees
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <Check className="h-5 w-5 text-gold-500 mt-0.5" />
                <p className="text-white/80">
                  We never compromise on material quality or craftsmanship
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <Check className="h-5 w-5 text-gold-500 mt-0.5" />
                <p className="text-white/80">
                  We provide itemized receipts detailing every component of your purchase
                </p>
              </div>
            </div>
            <Button className="bg-gold-600 hover:bg-gold-700">
              Book Your Consultation
            </Button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-navy-900 flex items-center justify-center overflow-hidden">
              <img
                src={emperorLogo}
                alt="The Emperor Logo"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-2xl font-serif mb-2">Ready to Experience The Difference?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Book an appointment with our master tailors and discover the perfect blend of
          Ottoman heritage, premium quality, and transparent pricing.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-gold-600 hover:bg-gold-700">Book Appointment</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default TransparentPricing;