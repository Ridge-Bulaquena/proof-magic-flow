
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CompletionStepProps = {
  storeData: any;
  onComplete: () => void;
};

const CompletionStep = ({ storeData, onComplete }: CompletionStepProps) => {
  return (
    <div className="text-center p-6 space-y-6">
      <div className="flex justify-center">
        <div className="bg-green-100 p-4 rounded-full">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">You're All Set!</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Congratulations on setting up your proof approval system with Simpler Proofs!
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto text-left">
        <h3 className="font-semibold text-blue-800 mb-3">Your Store Details</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex justify-between">
            <span>Store Name:</span>
            <span className="font-medium">{storeData.storeName || 'My Store'}</span>
          </li>
          <li className="flex justify-between">
            <span>Public URL:</span>
            <span className="font-medium">simplerproofs.com/{storeData.publicUrl || 'yourstore'}</span>
          </li>
          <li className="flex justify-between">
            <span>Team Members:</span>
            <span className="font-medium">{storeData.teamMembers?.length || 0}</span>
          </li>
          <li className="flex justify-between">
            <span>Selected Plan:</span>
            <span className="font-medium">{(storeData.selectedPlan || 'free').charAt(0).toUpperCase() + (storeData.selectedPlan || 'free').slice(1)}</span>
          </li>
          <li className="flex justify-between">
            <span>Integrations:</span>
            <span className="font-medium">{storeData.integrations?.length || 0}</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4 pt-4">
        <p className="text-gray-700">
          Ready to start managing your proofs and orders?
        </p>
        <Button 
          size="lg" 
          className="px-8" 
          onClick={onComplete}
        >
          Go to Dashboard
        </Button>
      </div>

      <div className="pt-6 text-sm text-gray-500">
        <p>
          Need help? Check out our <a href="#" className="text-blue-600 hover:underline">knowledge base</a> or <a href="#" className="text-blue-600 hover:underline">contact support</a>.
        </p>
      </div>
    </div>
  );
};

export default CompletionStep;
