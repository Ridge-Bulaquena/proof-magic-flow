
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropbox, Upload, ExternalLink, Check, Shopify, Grid } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

type IntegrationItem = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  connected: boolean;
  popular: boolean;
};

type IntegrationsStepProps = {
  storeData: any;
  updateStoreData: (data: any) => void;
};

const IntegrationsStep = ({ storeData, updateStoreData }: IntegrationsStepProps) => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    {
      id: 'shopify',
      name: 'Shopify',
      icon: Shopify,
      description: 'Sync orders and customer data from your Shopify store',
      connected: false,
      popular: true
    },
    {
      id: 'etsy',
      name: 'Etsy',
      icon: Grid,
      description: 'Connect your Etsy shop to import orders automatically',
      connected: false,
      popular: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      icon: Grid,
      description: 'Create custom automation workflows with 3000+ apps',
      connected: false,
      popular: true
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: Dropbox,
      description: 'Store and manage your proof files in Dropbox',
      connected: false,
      popular: false
    },
    {
      id: 'gdrive',
      name: 'Google Drive',
      icon: Grid,
      description: 'Backup your files and proofs to Google Drive',
      connected: false,
      popular: false
    },
    {
      id: 'orderdesk',
      name: 'OrderDesk',
      icon: Grid,
      description: 'Connect your OrderDesk account for order fulfillment',
      connected: false,
      popular: false
    },
    {
      id: 'gelato',
      name: 'Gelato',
      icon: Grid,
      description: 'Automate print-on-demand fulfillment with Gelato',
      connected: false,
      popular: false
    },
    {
      id: 'make',
      name: 'Make.com',
      icon: Grid,
      description: 'Create complex automation scenarios with Make.com',
      connected: false,
      popular: false
    }
  ]);

  const [webhookUrl, setWebhookUrl] = useState('');

  const handleConnectIntegration = (id: string) => {
    const updatedIntegrations = integrations.map(integration => {
      if (integration.id === id) {
        return { ...integration, connected: true };
      }
      return integration;
    });
    
    setIntegrations(updatedIntegrations);
    updateStoreData({ integrations: updatedIntegrations.filter(i => i.connected) });
    
    toast({
      title: "Integration Connected",
      description: `Successfully connected ${integrations.find(i => i.id === id)?.name}`,
    });
  };

  const handleDisconnectIntegration = (id: string) => {
    const updatedIntegrations = integrations.map(integration => {
      if (integration.id === id) {
        return { ...integration, connected: false };
      }
      return integration;
    });
    
    setIntegrations(updatedIntegrations);
    updateStoreData({ integrations: updatedIntegrations.filter(i => i.connected) });
    
    toast({
      title: "Integration Disconnected",
      description: `Successfully disconnected ${integrations.find(i => i.id === id)?.name}`,
    });
  };

  const handleSubmitWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a webhook URL",
        variant: "destructive",
      });
      return;
    }

    const updatedIntegrations = integrations.map(integration => {
      if (integration.id === 'zapier') {
        return { ...integration, connected: true };
      }
      return integration;
    });
    
    setIntegrations(updatedIntegrations);
    updateStoreData({ integrations: updatedIntegrations.filter(i => i.connected) });
    
    toast({
      title: "Webhook Connected",
      description: "Successfully added Zapier webhook",
    });
  };

  const popularIntegrations = integrations.filter(i => i.popular);
  const otherIntegrations = integrations.filter(i => !i.popular);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Setup Integrations (Optional)</h2>
        <p className="text-gray-500">
          Connect your favorite tools to streamline your workflow
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="font-medium text-lg">Popular Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularIntegrations.map((integration) => (
            <Card key={integration.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <integration.icon className="h-5 w-5" />
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                </div>
                <CardDescription className="text-xs mt-1">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-2">
                {integration.connected ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDisconnectIntegration(integration.id)}
                  >
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Connected
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleConnectIntegration(integration.id)}
                  >
                    Connect
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Webhook setup for Zapier */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="font-medium">Connect Zapier Webhook</h3>
          <p className="text-sm text-gray-600">
            Automate your workflow by sending proof events to Zapier.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Zapier Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhookUrl"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubmitWebhook}>
                Save
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Find this URL in your Zapier webhook trigger step
            </p>
          </div>
        </div>

        <h3 className="font-medium text-lg">Other Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {otherIntegrations.map((integration) => (
            <Card key={integration.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <integration.icon className="h-5 w-5" />
                  <span className="font-medium">{integration.name}</span>
                </div>
                {integration.connected ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDisconnectIntegration(integration.id)}
                  >
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Connected
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleConnectIntegration(integration.id)}
                  >
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Don't worry! You can set up or change integrations anytime from the Settings page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsStep;
