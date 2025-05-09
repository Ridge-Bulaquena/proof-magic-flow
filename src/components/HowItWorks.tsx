
import { Upload, CheckCircle, Settings } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload size={32} className="text-white" />,
      title: "Upload",
      description: "Upload your artwork and send beautiful proofs to customers in seconds."
    },
    {
      icon: <CheckCircle size={32} className="text-white" />,
      title: "Approve",
      description: "Customers review and approve designs with a single tap on any device."
    },
    {
      icon: <Settings size={32} className="text-white" />,
      title: "Produce",
      description: "Generate run sheets and access production files for approved orders."
    }
  ];

  return (
    <section id="how-it-works" className="section-container bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A simple three-step process designed for busy shop owners
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-center max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full max-w-[100px] h-0.5 bg-gray-200 -translate-y-1/2 transform translate-x-1">
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-gray-300 rounded-full -translate-y-1/2"></div>
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-brand-purple-dark mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-brand-purple-dark/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={28} className="text-brand-purple" />
              </div>
              <p className="text-lg font-medium text-brand-purple-dark">Product demo video coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
