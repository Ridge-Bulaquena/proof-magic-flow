
import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [animateStartFree, setAnimateStartFree] = useState(false);
  const [animateBookDemo, setAnimateBookDemo] = useState(false);

  const handleStartFreeClick = () => {
    setAnimateStartFree(true);
    setTimeout(() => setAnimateStartFree(false), 500);
  };

  const handleBookDemoClick = () => {
    setAnimateBookDemo(true);
    setTimeout(() => setAnimateBookDemo(false), 500);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple-dark mb-6 leading-tight">
            The Easiest Way to Approve Custom Orders
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl">
            Upload. Approve. Produce.
          </p>

          <p className="text-lg text-gray-600 mb-10 max-w-3xl">
            Simpler Proofs gives you a sleek, branded proofing experience your customers will love—and actually respond to. Built for Shopify and Etsy sellers who care about every detail.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg">
            <button 
              className={`button ${animateStartFree ? 'animate' : ''}`}
              onClick={handleStartFreeClick}
              style={{ maxWidth: '350px', width: '100%', letterSpacing: '3px', fontSize: '18px' }}
            >
              START FREE
            </button>
            
            <button 
              onClick={handleBookDemoClick}
              className={`button-secondary ${animateBookDemo ? 'animate-elastic' : ''}`}
            >
              Book a Demo <ArrowRight size={18} className="ml-2 inline" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10 mb-8 max-w-xl">
            <div className="flex items-center">
              <Check size={20} className="text-brand-teal mr-2" />
              <span className="text-gray-700">No credit card required</span>
            </div>
            <div className="flex items-center">
              <Check size={20} className="text-brand-teal mr-2" />
              <span className="text-gray-700">Free starter plan</span>
            </div>
            <div className="flex items-center">
              <Check size={20} className="text-brand-teal mr-2" />
              <span className="text-gray-700">Cancel anytime</span>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto relative animate-float">
          <div className="bg-gradient-to-r from-brand-purple-dark to-brand-purple rounded-2xl shadow-2xl overflow-hidden">
            <img 
              src="/lovable-uploads/cf3238cf-3a43-416d-9bf5-723fb0a9371f.png" 
              alt="Simpler Proofs UI" 
              className="w-full h-auto"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute top-40 left-10 w-64 h-64 bg-brand-teal/5 rounded-full filter blur-3xl"></div>
      <div className="hidden md:block absolute bottom-20 right-10 w-72 h-72 bg-brand-purple/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Hero;
