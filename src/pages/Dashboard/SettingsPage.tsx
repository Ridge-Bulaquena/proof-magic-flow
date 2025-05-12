
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "My Custom Store",
    publicUrl: "mycustomstore",
    defaultComment: "Here's your proof! Please review and let me know if you need any changes.",
    autoApprove: false
  });

  const handleSaveChanges = () => {
    // In a real app, this would save to an API
    toast({
      title: "Settings saved",
      description: "Your store settings have been saved successfully.",
      duration: 3000,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setStoreSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold">Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your store settings and preferences.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Update your store details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input 
                  id="store-name" 
                  value={storeSettings.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="public-url">Public URL</Label>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">simplerproofs.com/</span>
                  <Input 
                    id="public-url" 
                    value={storeSettings.publicUrl}
                    onChange={(e) => handleInputChange("publicUrl", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-comment">Default Comment</Label>
                <Textarea
                  id="default-comment"
                  value={storeSettings.defaultComment}
                  onChange={(e) => handleInputChange("defaultComment", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-approve" 
                  checked={storeSettings.autoApprove}
                  onCheckedChange={(checked) => handleInputChange("autoApprove", checked)}
                />
                <Label htmlFor="auto-approve">Auto-approve after 3 days</Label>
              </div>
              <Button 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
