
import { 
  Upload, 
  CheckCircle, 
  RotateCcw, 
  FolderArchive, 
  FileSpreadsheet,
  ArrowUpRight
} from 'lucide-react';

const FeaturesGrid = () => {
  const features = [
    {
      icon: <Upload size={28} />,
      title: "Upload Proofs",
      description: "Easily upload and organize design proofs for your custom orders."
    },
    {
      icon: <CheckCircle size={28} />,
      title: "Customer Approvals",
      description: "Get instant approvals through a beautiful, mobile-friendly interface."
    },
    {
      icon: <RotateCcw size={28} />,
      title: "Revision Requests",
      description: "Streamline revision workflows with clear customer feedback."
    },
    {
      icon: <FolderArchive size={28} />,
      title: "Internal File Management",
      description: "Keep production files organized and accessible to your team."
    },
    {
      icon: <FileSpreadsheet size={28} />,
      title: "Run Sheet Export",
      description: "Generate production-ready run sheets with a single click."
    },
    {
      icon: <ArrowUpRight size={28} />,
      title: "Digital Upsell",
      description: "Boost revenue with seamless digital product upsells."
    }
  ];

  return (
    <section id="features" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-4">
          Everything You Need for Seamless Proofing
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Powerful features designed specifically for custom product sellers on Shopify and Etsy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card-feature">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-purple-dark mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
