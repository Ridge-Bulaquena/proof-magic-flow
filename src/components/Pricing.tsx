
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      name: "Free",
      description: "For small shops just getting started",
      price: {
        monthly: 0,
        annual: 0
      },
      features: [
        { text: "Up to 30 proofs per month", included: true },
        { text: "Basic customer page branding", included: true },
        { text: "Email notifications", included: true },
        { text: "1 team member", included: true },
        { text: "Shopify integration", included: false },
        { text: "Run sheet generation", included: false },
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Basic",
      description: "For growing businesses",
      price: {
        monthly: 29,
        annual: 24
      },
      features: [
        { text: "Up to 200 proofs per month", included: true },
        { text: "Full customer page branding", included: true },
        { text: "Email + SMS notifications", included: true },
        { text: "3 team members", included: true },
        { text: "Shopify integration", included: true },
        { text: "Run sheet generation", included: true },
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Scale-Up",
      description: "For established businesses",
      price: {
        monthly: 59,
        annual: 49
      },
      features: [
        { text: "Up to 1000 proofs per month", included: true },
        { text: "Custom domain", included: true },
        { text: "Advanced integrations", included: true },
        { text: "10 team members", included: true },
        { text: "API access", included: true },
        { text: "Priority support", included: true },
      ],
      buttonText: "Start Free Trial",
      popular: false
    },
    {
      name: "Pro",
      description: "For high-volume businesses",
      price: {
        monthly: 99,
        annual: 79
      },
      features: [
        { text: "Unlimited proofs", included: true },
        { text: "White-label experience", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Unlimited team members", included: true },
        { text: "Custom integrations", included: true },
        { text: "Dedicated account manager", included: true },
      ],
      buttonText: "Contact Sales",
      popular: false
    },
  ];

  return (
    <section id="pricing" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Plans that grow with your business. No hidden fees.
        </p>
        
        <div className="flex items-center justify-center mb-8">
          <span className={`mr-3 text-lg ${!annual ? 'font-bold text-brand-purple-dark' : 'text-gray-500'}`}>Monthly</span>
          <div 
            className="relative w-14 h-8 bg-gray-200 rounded-full cursor-pointer"
            onClick={() => setAnnual(!annual)}
          >
            <div 
              className={`absolute top-1 w-6 h-6 bg-brand-purple rounded-full transition-all ${annual ? 'left-7' : 'left-1'}`}
            ></div>
          </div>
          <span className={`ml-3 text-lg ${annual ? 'font-bold text-brand-purple-dark' : 'text-gray-500'}`}>
            Annual <span className="text-sm text-brand-teal font-medium">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`rounded-2xl p-6 border transition-all ${
              plan.popular 
                ? 'border-brand-teal shadow-lg shadow-brand-teal/10 relative' 
                : 'border-gray-200 hover:border-brand-teal hover:shadow-lg'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-teal text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold text-brand-purple-dark mb-1">{plan.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            
            <div className="mb-5">
              <span className="text-4xl font-bold text-brand-purple-dark">${annual ? plan.price.annual : plan.price.monthly}</span>
              <span className="text-gray-500">/mo</span>
            </div>
            
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  {feature.included ? (
                    <Check size={18} className="text-brand-teal shrink-0 mt-0.5 mr-2" />
                  ) : (
                    <X size={18} className="text-gray-400 shrink-0 mt-0.5 mr-2" />
                  )}
                  <span className={feature.included ? "text-gray-700" : "text-gray-500"}>{feature.text}</span>
                </div>
              ))}
            </div>
            
            <Button 
              className={`w-full ${
                plan.popular 
                  ? 'bg-brand-teal hover:bg-brand-teal-dark' 
                  : plan.name === "Free" 
                    ? 'bg-brand-purple/80 hover:bg-brand-purple' 
                    : 'bg-brand-purple hover:bg-brand-purple-dark'
              }`}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
