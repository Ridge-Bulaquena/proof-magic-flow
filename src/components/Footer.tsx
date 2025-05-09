
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-2xl font-bold text-brand-purple-dark">
                Simpler<span className="text-brand-teal">Proofs</span>
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-sm">
              The easiest way for Shopify and Etsy sellers to get custom orders approved fast.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-brand-purple-dark mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-brand-purple">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-brand-purple">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple">Roadmap</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-brand-purple-dark mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-brand-purple">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple">Support Docs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-purple">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-brand-purple-dark mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-brand-purple-dark mr-2 mt-1 shrink-0" />
                <a href="mailto:hello@simplerproofs.com" className="text-gray-600 hover:text-brand-purple">
                  hello@simplerproofs.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-brand-purple-dark mr-2 mt-1 shrink-0" />
                <span className="text-gray-600">
                  123 E-Commerce Way<br />
                  Custom City, CA 94103
                </span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-brand-purple-dark mr-2 mt-1 shrink-0" />
                <a href="tel:+1-555-123-4567" className="text-gray-600 hover:text-brand-purple">
                  (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Simpler Proofs. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 text-sm hover:text-brand-purple">Terms</a>
              <a href="#" className="text-gray-500 text-sm hover:text-brand-purple">Privacy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-brand-purple">Cookies</a>
              <a href="#" className="text-gray-500 text-sm hover:text-brand-purple">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
