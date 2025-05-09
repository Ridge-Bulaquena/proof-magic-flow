
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      content: "Simpler Proofs has been a game-changer for our custom apparel business. Our customers love how easy it is to review and approve designs.",
      author: "Jessica T.",
      position: "Owner, CustomTees",
      stars: 5
    },
    {
      content: "We've cut our approval time in half since switching to Simpler Proofs. The mobile-friendly interface means customers can approve designs from anywhere.",
      author: "Michael R.",
      position: "Co-founder, Print Perfection",
      stars: 5
    },
    {
      content: "The run sheet feature alone is worth the subscription. It's saved us countless hours organizing production files.",
      author: "Sarah L.",
      position: "Production Manager, CreativeGifts",
      stars: 5
    },
  ];

  return (
    <section className="section-container bg-brand-purple/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-4">
          What Our Customers Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thousands of Shopify and Etsy sellers trust Simpler Proofs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex mb-3">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            
            <p className="text-gray-700 mb-6 italic">
              "{testimonial.content}"
            </p>
            
            <div>
              <p className="font-bold text-brand-purple-dark">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-xl font-bold text-brand-purple-dark mb-8">Trusted by shops of all sizes</h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {['Shopify', 'Etsy', 'WooCommerce', 'BigCommerce', 'Squarespace'].map((platform) => (
            <div key={platform} className="text-gray-400 font-medium text-xl">
              {platform}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
