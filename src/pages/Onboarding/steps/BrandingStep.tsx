
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

type BrandingStepProps = {
  storeData: any;
  updateStoreData: (data: any) => void;
};

const BrandingStep = ({ storeData, updateStoreData }: BrandingStepProps) => {
  const [emailLogoPreview, setEmailLogoPreview] = useState<string | null>(null);

  const handleEmailLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmailLogoPreview(reader.result as string);
        updateStoreData({ emailLogo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Branding Preferences</h2>
        <p className="text-gray-500">
          Customize how your brand appears to customers
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="defaultComment">Default Merchant Comment</Label>
          <Textarea
            id="defaultComment"
            placeholder="Please review your proof and let us know if you need any changes!"
            value={storeData.defaultComment}
            onChange={(e) => updateStoreData({ defaultComment: e.target.value })}
            className="resize-none"
            rows={3}
          />
          <p className="text-xs text-gray-500">
            This message will be shown to customers by default when they view their proofs
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailLogo">Email Logo/Banner</Label>
          <div className="flex items-center gap-4">
            <Card className="relative w-32 h-16 flex items-center justify-center overflow-hidden">
              <CardContent className="p-0 h-full w-full flex items-center justify-center">
                {emailLogoPreview ? (
                  <img
                    src={emailLogoPreview}
                    alt="Email Logo Preview"
                    className="object-contain max-w-full max-h-full"
                  />
                ) : (
                  <Upload className="h-6 w-6 text-gray-300" />
                )}
              </CardContent>
            </Card>
            <div className="flex-1">
              <Input
                id="emailLogo"
                type="file"
                accept="image/*"
                onChange={handleEmailLogoChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 600x200px. Max file size: 2MB
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buttonColor">Button Color</Label>
            <div className="flex items-center gap-3">
              <Input
                id="buttonColor"
                type="color"
                value={storeData.buttonColor}
                onChange={(e) => updateStoreData({ buttonColor: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={storeData.buttonColor}
                onChange={(e) => updateStoreData({ buttonColor: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailAccentColor">Email Accent Color</Label>
            <div className="flex items-center gap-3">
              <Input
                id="emailAccentColor"
                type="color"
                value={storeData.emailAccentColor}
                onChange={(e) => updateStoreData({ emailAccentColor: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={storeData.emailAccentColor}
                onChange={(e) => updateStoreData({ emailAccentColor: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Preview</h3>
          <div className="bg-white p-4 rounded-lg border">
            <div 
              className="h-10 w-full rounded-md flex items-center justify-center text-white"
              style={{ backgroundColor: storeData.buttonColor }}
            >
              Approve Proof
            </div>
            <div className="mt-2 h-1.5 w-24 rounded" style={{ backgroundColor: storeData.emailAccentColor }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingStep;
