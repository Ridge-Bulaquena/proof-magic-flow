
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "SimplerProofs Print Shop",
    email: "admin@simplerproofs.com",
    phone: "(555) 123-4567",
    notifyNewProofs: true,
    notifyProofApprovals: true,
    notifyProofRejections: true
  });

  const [emailSettings, setEmailSettings] = useState({
    emailProvider: "custom",
    smtpServer: "smtp.simplerproofs.com",
    smtpPort: "587",
    smtpUsername: "notifications@simplerproofs.com",
    smtpPassword: "••••••••••••",
    emailSignature: "The SimplerProofs Team\nwww.simplerproofs.com\n(555) 123-4567"
  });

  const [brandingSettings, setBrandingSettings] = useState({
    primaryColor: "#7e22ce",
    accentColor: "#14b8a6",
    logoPosition: "left",
    customDomain: "proofs.mycompany.com"
  });

  const handleGeneralSettingsChange = (field: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value
    });
  };

  const handleEmailSettingsChange = (field: string, value: string) => {
    setEmailSettings({
      ...emailSettings,
      [field]: value
    });
  };

  const handleBrandingSettingsChange = (field: string, value: string) => {
    setBrandingSettings({
      ...brandingSettings,
      [field]: value
    });
  };

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully."
    });
  };

  const handleSaveEmailSettings = () => {
    toast({
      title: "Email settings saved",
      description: "Your email configuration has been updated."
    });
  };

  const handleSaveBrandingSettings = () => {
    toast({
      title: "Branding settings saved",
      description: "Your branding configuration has been updated."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your basic account information and notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  value={generalSettings.companyName} 
                  onChange={(e) => handleGeneralSettingsChange("companyName", e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={generalSettings.email} 
                  onChange={(e) => handleGeneralSettingsChange("email", e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={generalSettings.phone} 
                  onChange={(e) => handleGeneralSettingsChange("phone", e.target.value)} 
                />
              </div>
              
              <div className="pt-4 space-y-3">
                <h3 className="font-medium">Notification Preferences</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyNewProofs" className="cursor-pointer">
                    Notify me about new proofs
                  </Label>
                  <Switch 
                    id="notifyNewProofs" 
                    checked={generalSettings.notifyNewProofs}
                    onCheckedChange={(checked) => handleGeneralSettingsChange("notifyNewProofs", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyProofApprovals" className="cursor-pointer">
                    Notify me about proof approvals
                  </Label>
                  <Switch 
                    id="notifyProofApprovals" 
                    checked={generalSettings.notifyProofApprovals}
                    onCheckedChange={(checked) => handleGeneralSettingsChange("notifyProofApprovals", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyProofRejections" className="cursor-pointer">
                    Notify me about proof rejections
                  </Label>
                  <Switch 
                    id="notifyProofRejections" 
                    checked={generalSettings.notifyProofRejections}
                    onCheckedChange={(checked) => handleGeneralSettingsChange("notifyProofRejections", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure how emails are sent from your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailProvider">Email Provider</Label>
                <Select 
                  value={emailSettings.emailProvider} 
                  onValueChange={(value) => handleEmailSettingsChange("emailProvider", value)}
                >
                  <SelectTrigger id="emailProvider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom SMTP</SelectItem>
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="outlook">Outlook</SelectItem>
                    <SelectItem value="yahoo">Yahoo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpServer">SMTP Server</Label>
                <Input 
                  id="smtpServer" 
                  value={emailSettings.smtpServer} 
                  onChange={(e) => handleEmailSettingsChange("smtpServer", e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input 
                  id="smtpPort" 
                  value={emailSettings.smtpPort} 
                  onChange={(e) => handleEmailSettingsChange("smtpPort", e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input 
                  id="smtpUsername" 
                  value={emailSettings.smtpUsername} 
                  onChange={(e) => handleEmailSettingsChange("smtpUsername", e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input 
                  id="smtpPassword" 
                  type="password" 
                  value={emailSettings.smtpPassword} 
                  onChange={(e) => handleEmailSettingsChange("smtpPassword", e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailSignature">Email Signature</Label>
                <textarea 
                  id="emailSignature" 
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={emailSettings.emailSignature}
                  onChange={(e) => handleEmailSettingsChange("emailSignature", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEmailSettings}>Save Email Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="branding" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Customize how your proof portal looks to your customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="primaryColor" 
                    type="color" 
                    value={brandingSettings.primaryColor} 
                    onChange={(e) => handleBrandingSettingsChange("primaryColor", e.target.value)} 
                    className="w-12 h-10 p-1"
                  />
                  <Input 
                    type="text" 
                    value={brandingSettings.primaryColor} 
                    onChange={(e) => handleBrandingSettingsChange("primaryColor", e.target.value)} 
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="accentColor" 
                    type="color" 
                    value={brandingSettings.accentColor} 
                    onChange={(e) => handleBrandingSettingsChange("accentColor", e.target.value)} 
                    className="w-12 h-10 p-1"
                  />
                  <Input 
                    type="text" 
                    value={brandingSettings.accentColor} 
                    onChange={(e) => handleBrandingSettingsChange("accentColor", e.target.value)} 
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logoPosition">Logo Position</Label>
                <Select 
                  value={brandingSettings.logoPosition} 
                  onValueChange={(value) => handleBrandingSettingsChange("logoPosition", value)}
                >
                  <SelectTrigger id="logoPosition">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input 
                  id="customDomain" 
                  value={brandingSettings.customDomain} 
                  onChange={(e) => handleBrandingSettingsChange("customDomain", e.target.value)} 
                />
                <p className="text-sm text-muted-foreground">
                  Enter your custom domain to use for client-facing proof pages.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveBrandingSettings}>Save Branding</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
