import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      defaultComment: '',
      autoApproveDays: 7,
      language: 'en',
      apiKey: 'sk_test_123...',
    },
    digitalDownload: {
      enabled: false,
      watermark: true,
      price: 9.99,
      ctaTitle: 'Get Digital Download',
      ctaMessage: 'Download your design in high resolution!',
    },
    email: {
      logo: '',
      accentColor: '#000000',
      buttonColor: '#4F46E5',
      senderEmail: 'noreply@simplerproofs.com',
      dnsStatus: 'pending',
      ccMe: false,
      smsFallback: false,
    },
    cannedReplies: [
      { id: '1', message: 'Please review your proof and let us know if any changes are needed.', category: 'first-proof' },
      { id: '2', message: 'We\'ve made the requested changes. Please review the updated proof.', category: 'revision' },
    ],
    proofPage: {
      undoWindow: 5,
      allowFileUploads: true,
      allowMultipleProofs: true,
      labels: {
        approve: 'Approve Design',
        reject: 'Request Changes',
        comment: 'Add Comments',
      },
    },
    artists: [
      { id: '1', name: 'Jane Smith', role: 'artist' },
      { id: '2', name: 'John Doe', role: 'admin' },
    ],
    dashboard: {
      ordersPerPage: 25,
      showExport: true,
      showTabCounts: true,
      hideDrafts: false,
      filterBySku: '',
    },
    integrations: {
      zapier: { enabled: false, apiKey: '' },
      make: { enabled: false, apiKey: '' },
      gelato: { enabled: false, apiKey: '' },
      removeBg: { enabled: false, apiKey: '' },
      dropbox: { enabled: false, apiKey: '' },
      googleDrive: { enabled: false, apiKey: '' },
      orderDesk: { enabled: false, apiKey: '' },
    },
  });

  const handleSettingChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure your proof management system</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="canned">Canned</TabsTrigger>
              <TabsTrigger value="proof">Proof Page</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div>
                <Label>Default Comment</Label>
                <Textarea
                  value={settings.general.defaultComment}
                  onChange={(e) => handleSettingChange('general', 'defaultComment', e.target.value)}
                  placeholder="Enter default comment for new proofs"
                />
              </div>
              <div>
                <Label>Auto-approve after (days)</Label>
                <Input
                  type="number"
                  value={settings.general.autoApproveDays}
                  onChange={(e) => handleSettingChange('general', 'autoApproveDays', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Language</Label>
                <Select
                  value={settings.general.language}
                  onValueChange={(value) => handleSettingChange('general', 'language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>API Key</Label>
                <Input
                  value={settings.general.apiKey}
                  readOnly
                  className="font-mono"
                />
              </div>
            </TabsContent>

            <TabsContent value="digital" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Digital Download Upsell</Label>
                <Switch
                  checked={settings.digitalDownload.enabled}
                  onCheckedChange={(checked) => handleSettingChange('digitalDownload', 'enabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Add Watermark</Label>
                <Switch
                  checked={settings.digitalDownload.watermark}
                  onCheckedChange={(checked) => handleSettingChange('digitalDownload', 'watermark', checked)}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={settings.digitalDownload.price}
                  onChange={(e) => handleSettingChange('digitalDownload', 'price', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label>CTA Title</Label>
                <Input
                  value={settings.digitalDownload.ctaTitle}
                  onChange={(e) => handleSettingChange('digitalDownload', 'ctaTitle', e.target.value)}
                />
              </div>
              <div>
                <Label>CTA Message</Label>
                <Textarea
                  value={settings.digitalDownload.ctaMessage}
                  onChange={(e) => handleSettingChange('digitalDownload', 'ctaMessage', e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div>
                <Label>Email Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    // Handle logo upload
                  }}
                />
              </div>
              <div>
                <Label>Accent Color</Label>
                <Input
                  type="color"
                  value={settings.email.accentColor}
                  onChange={(e) => handleSettingChange('email', 'accentColor', e.target.value)}
                />
              </div>
              <div>
                <Label>Button Color</Label>
                <Input
                  type="color"
                  value={settings.email.buttonColor}
                  onChange={(e) => handleSettingChange('email', 'buttonColor', e.target.value)}
                />
              </div>
              <div>
                <Label>Sender Email</Label>
                <Input
                  type="email"
                  value={settings.email.senderEmail}
                  onChange={(e) => handleSettingChange('email', 'senderEmail', e.target.value)}
                />
              </div>
              <div>
                <Label>DNS Status</Label>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    settings.email.dnsStatus === 'verified' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm">
                    {settings.email.dnsStatus === 'verified' ? 'Verified' : 'Pending Setup'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>CC Me on All Emails</Label>
                <Switch
                  checked={settings.email.ccMe}
                  onCheckedChange={(checked) => handleSettingChange('email', 'ccMe', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Send SMS Fallback</Label>
                <Switch
                  checked={settings.email.smsFallback}
                  onCheckedChange={(checked) => handleSettingChange('email', 'smsFallback', checked)}
                />
              </div>
            </TabsContent>

            <TabsContent value="canned" className="space-y-4">
              {settings.cannedReplies.map((reply) => (
                <div key={reply.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Message</Label>
                    <Select
                      value={reply.category}
                      onValueChange={(value) => {
                        // Handle category change
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-proof">First Proof</SelectItem>
                        <SelectItem value="revision">Revision</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    value={reply.message}
                    onChange={(e) => {
                      // Handle message change
                    }}
                  />
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add New Message
              </Button>
            </TabsContent>

            <TabsContent value="proof" className="space-y-4">
              <div>
                <Label>Undo Window (minutes)</Label>
                <Input
                  type="number"
                  value={settings.proofPage.undoWindow}
                  onChange={(e) => handleSettingChange('proofPage', 'undoWindow', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow File Uploads from Customer</Label>
                <Switch
                  checked={settings.proofPage.allowFileUploads}
                  onCheckedChange={(checked) => handleSettingChange('proofPage', 'allowFileUploads', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow Multiple Proofs</Label>
                <Switch
                  checked={settings.proofPage.allowMultipleProofs}
                  onCheckedChange={(checked) => handleSettingChange('proofPage', 'allowMultipleProofs', checked)}
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Custom Labels</h3>
                <div>
                  <Label>Approve Button</Label>
                  <Input
                    value={settings.proofPage.labels.approve}
                    onChange={(e) => handleSettingChange('proofPage', 'labels', {
                      ...settings.proofPage.labels,
                      approve: e.target.value,
                    })}
                  />
                </div>
                <div>
                  <Label>Reject Button</Label>
                  <Input
                    value={settings.proofPage.labels.reject}
                    onChange={(e) => handleSettingChange('proofPage', 'labels', {
                      ...settings.proofPage.labels,
                      reject: e.target.value,
                    })}
                  />
                </div>
                <div>
                  <Label>Comment Field</Label>
                  <Input
                    value={settings.proofPage.labels.comment}
                    onChange={(e) => handleSettingChange('proofPage', 'labels', {
                      ...settings.proofPage.labels,
                      comment: e.target.value,
                    })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="artists" className="space-y-4">
              <div className="space-y-4">
                {settings.artists.map((artist) => (
                  <div key={artist.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{artist.name}</h3>
                      <p className="text-sm text-gray-500">{artist.role}</p>
                    </div>
                    <Select
                      value={artist.role}
                      onValueChange={(value) => {
                        // Handle role change
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="artist">Artist</SelectItem>
                        <SelectItem value="va">Virtual Assistant</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Add New Artist
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-4">
              <div>
                <Label>Orders Per Page</Label>
                <Select
                  value={settings.dashboard.ordersPerPage.toString()}
                  onValueChange={(value) => handleSettingChange('dashboard', 'ordersPerPage', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of orders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Export Button</Label>
                <Switch
                  checked={settings.dashboard.showExport}
                  onCheckedChange={(checked) => handleSettingChange('dashboard', 'showExport', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Tab Counts</Label>
                <Switch
                  checked={settings.dashboard.showTabCounts}
                  onCheckedChange={(checked) => handleSettingChange('dashboard', 'showTabCounts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Hide Draft Orders</Label>
                <Switch
                  checked={settings.dashboard.hideDrafts}
                  onCheckedChange={(checked) => handleSettingChange('dashboard', 'hideDrafts', checked)}
                />
              </div>
              <div>
                <Label>Filter by SKU or Tag</Label>
                <Input
                  value={settings.dashboard.filterBySku}
                  onChange={(e) => handleSettingChange('dashboard', 'filterBySku', e.target.value)}
                  placeholder="Enter SKU or tag pattern"
                />
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              {Object.entries(settings.integrations).map(([key, integration]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={(checked) => handleSettingChange('integrations', key, {
                        ...integration,
                        enabled: checked,
                      })}
                    />
                  </div>
                  {integration.enabled && (
                    <Input
                      type="password"
                      value={integration.apiKey}
                      onChange={(e) => handleSettingChange('integrations', key, {
                        ...integration,
                        apiKey: e.target.value,
                      })}
                      placeholder="Enter API key"
                    />
                  )}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings; 