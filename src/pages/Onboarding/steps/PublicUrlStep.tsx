
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

type PublicUrlStepProps = {
  storeData: any;
  updateStoreData: (data: any) => void;
};

const PublicUrlStep = ({ storeData, updateStoreData }: PublicUrlStepProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [url, setUrl] = useState(storeData.publicUrl || '');

  // Simulated URL availability check
  useEffect(() => {
    if (!url) {
      setIsAvailable(null);
      return;
    }

    const checkTimeout = setTimeout(() => {
      setIsChecking(true);
      
      // Simulate API call with random result (but usually available)
      setTimeout(() => {
        const randomAvailable = Math.random() > 0.3;
        setIsAvailable(randomAvailable);
        setIsChecking(false);
        
        if (randomAvailable) {
          updateStoreData({ publicUrl: url });
        }
      }, 1000);
    }, 500);

    return () => clearTimeout(checkTimeout);
  }, [url, updateStoreData]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Choose Your Public URL</h2>
        <p className="text-gray-500">
          Select a custom URL for your customers to access proof pages
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="publicUrl">Your Store URL</Label>
          <div className="flex items-center">
            <div className="bg-gray-100 px-3 py-2 rounded-l-md border-y border-l text-gray-500">
              simplerproofs.com/
            </div>
            <div className="relative flex-1">
              <Input
                id="publicUrl"
                placeholder="yourstore"
                value={url}
                onChange={(e) => setUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="rounded-l-none"
              />
              {isChecking && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full" />
                </div>
              )}
              {!isChecking && isAvailable !== null && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isAvailable ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="h-5 mt-1">
            {!isChecking && isAvailable === false && (
              <p className="text-sm text-red-500">
                This URL is already taken. Please try another one.
              </p>
            )}
            {!isChecking && isAvailable === true && (
              <p className="text-sm text-green-500">
                URL is available!
              </p>
            )}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Your customers will access their proofs at:</h3>
          <div className="bg-white p-3 rounded border text-center font-medium">
            simplerproofs.com/{url || 'yourstore'}/ORDER123
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <h4 className="font-semibold mb-1">Tips:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep your URL short and memorable</li>
            <li>Use your brand name if possible</li>
            <li>Avoid special characters and spaces</li>
            <li>You can change this later in your settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicUrlStep;
