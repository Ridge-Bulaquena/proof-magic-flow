
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thanks for subscribing!",
        description: "We'll keep you updated on all things Simpler Proofs.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-brand-gradient opacity-90"></div>
      
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to streamline your proof approvals?
          </h2>
          
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Join thousands of Shopify and Etsy sellers who are saving time and delighting customers with Simpler Proofs.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10 h-12 bg-white/90 border-transparent text-gray-800 w-full rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 px-6 bg-brand-teal hover:bg-brand-teal-dark rounded-full"
              disabled={isSubmitting}
            >
              Get Started Free {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
            </Button>
          </form>
          
          <p className="text-sm opacity-80 mt-4">
            No credit card required. Free plan available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
