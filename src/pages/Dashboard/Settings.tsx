import { useState } from 'react';
import { motion } from 'framer-motion';
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
    autoApprove: false,
    emailNotifications: true,
    timezone: 'UTC',
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold">System Settings</h1>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">General Settings</h2>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-approve Proofs</Label>
              <p className="text-sm text-gray-500">
                Automatically approve proofs after 24 hours if no response
              </p>
            </div>
            <Switch
              checked={settings.autoApprove}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoApprove: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">
                Send email notifications for proof updates
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailNotifications: checked })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Localization</h2>
          
          <div className="space-y-2">
            <Label htmlFor="language">Default Language</Label>
            <Select
              value={settings.general.language}
              onValueChange={(value) =>
                setSettings({ ...settings, general: { ...settings.general, language: value } } as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(value) =>
                setSettings({ ...settings, timezone: value } as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern Time</SelectItem>
                <SelectItem value="CST">Central Time</SelectItem>
                <SelectItem value="PST">Pacific Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">API Settings</h2>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                value={settings.general.apiKey}
                readOnly
              />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
        </div>

        <Button className="w-full">Save Settings</Button>
      </div>
    </motion.div>
  );
};

export default Settings; 