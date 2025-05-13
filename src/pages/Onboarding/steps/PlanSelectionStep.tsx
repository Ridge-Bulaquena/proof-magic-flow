
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type PlanSelectionStepProps = {
  storeData: any;
  updateStoreData: (data: any) => void;
};

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Basic proof approval for small businesses",
    features: [
      "10 proof uploads per month",
      "1 user account",
      "Basic customization",
      "Email notifications",
      "Single artist access"
    ],
    limits: "10 proofs/month",
    popular: false
  },
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    description: "Perfect for growing businesses",
    features: [
      "Unlimited proof uploads",
      "3 user accounts",
      "Full customization",
      "Email & SMS notifications",
      "Run sheet generator",
      "Internal file storage"
    ],
    limits: "3 team members",
    popular: true
  },
  {
    id: "scale-up",
    name: "Scale-up",
    price: "$79",
    description: "For expanding businesses & teams",
    features: [
      "Everything in Basic",
      "10 user accounts",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Digital download upsell"
    ],
    limits: "10 team members",
    popular: false
  },
  {
    id: "pro",
    name: "Pro",
    price: "$199",
    description: "Enterprise-grade solution",
    features: [
      "Everything in Scale-up",
      "Unlimited team members",
      "White-label branding",
      "Custom domain",
      "Dedicated support",
      "Custom integrations"
    ],
    limits: "Unlimited everything",
    popular: false
  }
];

const PlanSelectionStep = ({ storeData, updateStoreData }: PlanSelectionStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState(storeData.selectedPlan || "free");
  const [showPayment, setShowPayment] = useState(false);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    updateStoreData({ selectedPlan: planId });
    
    if (planId !== "free" && !showPayment) {
      setShowPayment(true);
    } else if (planId === "free") {
      setShowPayment(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-500">
          Select the plan that works best for your business
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`overflow-hidden border-2 transition-all ${
              selectedPlan === plan.id 
                ? 'border-blue-500 shadow-md' 
                : 'border-transparent'
            }`}
          >
            <CardHeader className="p-4 pb-2">
              {plan.popular && (
                <Badge className="w-fit mb-2 bg-blue-500">Most Popular</Badge>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>
              <CardDescription className="mt-1">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-gray-500 mt-3">{plan.limits}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant={selectedPlan === plan.id ? "default" : "outline"}
                className="w-full"
                onClick={() => handleSelectPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {showPayment && (
        <div className="mt-8 space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold text-lg">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" placeholder="John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs text-gray-500">
              You won't be charged until the end of your setup. You can change or cancel your plan anytime.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSelectionStep;
