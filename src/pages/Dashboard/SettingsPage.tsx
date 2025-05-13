
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    marketing: false,
  });

  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    company: false,
    notifications: false,
    api: false,
  });

  const handleProfileSave = () => {
    setLoading({...loading, profile: true});
    setTimeout(() => {
      setLoading({...loading, profile: false});
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    }, 1000);
  };

  const handlePasswordChange = () => {
    setLoading({...loading, password: true});
    setTimeout(() => {
      setLoading({...loading, password: false});
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };

  const handleCompanySave = () => {
    setLoading({...loading, company: true});
    setTimeout(() => {
      setLoading({...loading, company: false});
      toast({
        title: "Company settings updated",
        description: "Your company information has been saved.",
      });
    }, 1000);
  };

  const handleNotificationSave = () => {
    setLoading({...loading, notifications: true});
    setTimeout(() => {
      setLoading({...loading, notifications: false});
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved.",
      });
    }, 1000);
  };

  const handleApiKeySave = () => {
    setLoading({...loading, api: true});
    setTimeout(() => {
      setLoading({...loading, api: false});
      toast({
        title: "API key generated",
        description: "Your new API key has been created.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 000-0000" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" rows={4} defaultValue="Production manager with 5+ years of experience." />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleProfileSave} disabled={loading.profile}>
                    {loading.profile ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handlePasswordChange} disabled={loading.password}>
                    {loading.password ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Manage your company information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Simpler Proofs" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Textarea id="company-address" rows={3} defaultValue="123 Main St, San Francisco, CA 94105" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select defaultValue="printing">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="printing">Printing Shop</SelectItem>
                        <SelectItem value="design">Design Agency</SelectItem>
                        <SelectItem value="photography">Photography Studio</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <Input id="logo" type="file" accept="image/*" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleCompanySave} disabled={loading.company}>
                    {loading.company ? "Saving..." : "Save Company Settings"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive email notifications about proof updates and orders
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, email: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive text messages for urgent updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, sms: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-gray-500">
                      Receive emails about new features and promotions
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketing}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketing: checked })
                    }
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleNotificationSave} disabled={loading.notifications}>
                    {loading.notifications ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current API Key</Label>
                  <div className="flex">
                    <Input disabled value="sk_live_•••••••••••••••••••••••••••••" className="font-mono" />
                    <Button variant="outline" className="ml-2">Copy</Button>
                  </div>
                  <p className="text-sm text-gray-500">Created on May 12, 2025</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Generate New API Key</Label>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Creating a new API key will invalidate your current key
                    </p>
                    <Button onClick={handleApiKeySave} variant="destructive" disabled={loading.api}>
                      {loading.api ? "Generating..." : "Generate New Key"}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <Label>API Documentation</Label>
                  <p className="text-sm text-gray-500">
                    Learn how to use our API to automate your proof approval workflow
                  </p>
                  <Button variant="outline" className="mt-2">View API Docs</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
