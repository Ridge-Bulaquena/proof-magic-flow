
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StoreInfoStep from './steps/StoreInfoStep';
import PublicUrlStep from './steps/PublicUrlStep';
import BrandingStep from './steps/BrandingStep';
import EmailSetupStep from './steps/EmailSetupStep';
import PlanSelectionStep from './steps/PlanSelectionStep';
import TeamInviteStep from './steps/TeamInviteStep';
import IntegrationsStep from './steps/IntegrationsStep';
import CompletionStep from './steps/CompletionStep';
import { useToast } from '@/hooks/use-toast';

// Animation variants
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [storeData, setStoreData] = useState({
    storeName: '',
    logo: null,
    accentColor: '#9b87f5',
    isDarkMode: false,
    publicUrl: '',
    defaultComment: 'Please review your proof and let us know if you need any changes!',
    emailLogo: null,
    buttonColor: '#9b87f5',
    emailAccentColor: '#9b87f5',
    senderEmail: '',
    dnsVerified: false,
    selectedPlan: 'free',
    teamMembers: [],
    integrations: []
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalSteps = 7;
  const progressPercentage = ((currentStep - 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps + 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateStoreData = (newData: any) => {
    setStoreData(prev => ({ ...prev, ...newData }));
  };

  const handleComplete = () => {
    toast({
      title: "Setup Complete!",
      description: "Your store has been set up successfully.",
    });
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StoreInfoStep 
            storeData={storeData} 
            updateStoreData={updateStoreData} 
          />
        );
      case 2:
        return (
          <PublicUrlStep 
            storeData={storeData} 
            updateStoreData={updateStoreData} 
          />
        );
      case 3:
        return (
          <BrandingStep 
            storeData={storeData} 
            updateStoreData={updateStoreData} 
          />
        );
      case 4:
        return (
          <EmailSetupStep 
            storeData={storeData} 
            updateStoreData={updateStoreData} 
          />
        );
      case 5:
        return (
          <PlanSelectionStep 
            storeData={storeData} 
            updateStoreData={updateStoreData} 
          />
        );
      case 6:
        return (
          <TeamInviteStep 
            storeData={storeData} 
            updateStoreData={updateStoreData} 
          />
        );
      case 7:
        return (
          <IntegrationsStep 
            storeData={storeData} 
            updateStoreData={updateStoreData} 
          />
        );
      case 8:
        return (
          <CompletionStep 
            storeData={storeData} 
            onComplete={handleComplete} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="min-h-[400px]"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="p-6 bg-gray-50 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 8 ? (
            <Button onClick={handleNext}>
              {currentStep === totalSteps ? 'Complete' : 'Next'}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
