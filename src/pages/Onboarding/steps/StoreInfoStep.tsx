
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, Upload } from "lucide-react";

type StoreInfoStepProps = {
  storeData: any;
  updateStoreData: (data: any) => void;
};

const StoreInfoStep = ({ storeData, updateStoreData }: StoreInfoStepProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        updateStoreData({ logo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Store Information</h2>
        <p className="text-gray-500">
          Let's set up your store's basic information
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            placeholder="Your Store Name"
            value={storeData.storeName}
            onChange={(e) => updateStoreData({ storeName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Store Logo</Label>
          <div className="flex items-center gap-4">
            <Card className="relative w-28 h-28 flex items-center justify-center overflow-hidden">
              <CardContent className="p-0 h-full w-full flex items-center justify-center">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="object-contain max-w-full max-h-full"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-gray-300" />
                )}
              </CardContent>
            </Card>
            <div className="flex-1">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 200x200px. Max file size: 2MB
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accentColor">Accent Color</Label>
          <div className="flex items-center gap-3">
            <Input
              id="accentColor"
              type="color"
              value={storeData.accentColor}
              onChange={(e) => updateStoreData({ accentColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={storeData.accentColor}
              onChange={(e) => updateStoreData({ accentColor: e.target.value })}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-gray-500">
            This color will be used throughout your store interface
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme">Theme Preference</Label>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              {storeData.isDarkMode ? (
                <Moon className="h-5 w-5 text-blue-600" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
              <span>{storeData.isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
            <Switch
              id="theme"
              checked={storeData.isDarkMode}
              onCheckedChange={(checked) => updateStoreData({ isDarkMode: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfoStep;
