
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "How does the free plan work?",
      answer: "Our free plan allows you to send up to 30 proofs per month with basic functionality. It's perfect for small shops or those just getting started with digital proofing. There's no credit card required to sign up, and you can upgrade to a paid plan anytime as your business grows."
    },
    {
      question: "Can I integrate Simpler Proofs with my Shopify store?",
      answer: "Yes! Simpler Proofs integrates seamlessly with Shopify. Once connected, order details will automatically sync with our platform, allowing you to easily send proofs to your customers without manual data entry. Our Basic plan and above include full Shopify integration."
    },
    {
      question: "How do customers receive and approve proofs?",
      answer: "Customers receive a notification via email (and SMS on paid plans) with a link to their personal, mobile-friendly proof page. There, they can view their proof, leave comments, and either approve the design or request revisions with a single tap. No account creation or login required for them."
    },
    {
      question: "Can I brand the proofing experience for my customers?",
      answer: "Absolutely! You can customize the proof pages with your logo, brand colors, and messaging. Basic plans allow for essential branding, while premium plans offer complete white-labeling, including custom domains and removal of all Simpler Proofs branding."
    },
    {
      question: "What file types are supported for proofs?",
      answer: "Simpler Proofs supports all common image formats including JPG, PNG, GIF, SVG, and PDF. We automatically optimize and convert files for the best viewing experience on all devices while maintaining image quality."
    },
    {
      question: "How secure are my files and customer data?",
      answer: "We take security seriously. All files are stored with enterprise-grade encryption, and we're fully GDPR compliant. Your customer data is never sold or shared. We maintain strict access controls and regular security audits to ensure your data remains protected."
    },
  ];

  return (
    <section id="faq" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about Simpler Proofs
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium text-brand-purple-dark">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-4">Have more questions?</p>
        <a href="#" className="text-brand-purple font-medium hover:text-brand-purple-dark">
          Contact our support team →
        </a>
      </div>
    </section>
  );
};

export default FAQ;
