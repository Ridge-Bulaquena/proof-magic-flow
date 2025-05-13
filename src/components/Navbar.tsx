
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-purple-dark">
              Simpler<span className="text-brand-teal">Proofs</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-brand-purple font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-brand-purple font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-brand-purple font-medium">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-brand-purple font-medium">
              FAQ
            </a>
            <Button 
              variant="outline" 
              size="sm" 
              className="font-medium border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
              asChild
            >
              <Link to="/dashboard">Log In</Link>
            </Button>
            <Button 
              size="sm" 
              className="font-medium bg-brand-purple hover:bg-brand-purple-dark text-white"
              asChild
            >
              <Link to="/dashboard">Start Free</Link>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-purple"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-brand-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-brand-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 hover:text-brand-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="text-gray-700 hover:text-brand-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
              <Button 
                variant="outline" 
                className="w-full justify-center font-medium border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                asChild
              >
                <Link to="/dashboard">Log In</Link>
              </Button>
              <Button 
                className="w-full justify-center font-medium bg-brand-purple hover:bg-brand-purple-dark text-white"
                asChild
              >
                <Link to="/dashboard">Start Free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
