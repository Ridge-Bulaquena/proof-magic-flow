
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, AlertCircle, HelpCircle } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';

type EmailSetupStepProps = {
  storeData: any;
  updateStoreData: (data: any) => void;
};

const EmailSetupStep = ({ storeData, updateStoreData }: EmailSetupStepProps) => {
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(storeData.dnsVerified ? 'verified' : null);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStoreData({ senderEmail: e.target.value });
    // Reset verification if email changes
    if (verificationStatus) {
      setVerificationStatus(null);
    }
  };

  const handleVerifyEmail = () => {
    if (!storeData.senderEmail || !storeData.senderEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setVerificationInProgress(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationInProgress(false);
      setVerificationStatus('verified');
      updateStoreData({ dnsVerified: true });
      toast({
        title: "Email Verified",
        description: "Your email has been verified successfully.",
      });
    }, 2000);
  };

  const handleCopyDNSRecord = (record: string) => {
    navigator.clipboard.writeText(record);
    toast({
      title: "Copied",
      description: "DNS record copied to clipboard",
    });
  };

  const getDomain = (email: string) => {
    if (!email || !email.includes('@')) return 'example.com';
    return email.split('@')[1];
  };

  const domain = getDomain(storeData.senderEmail);

  // Sample DNS records (would be dynamically generated in a real app)
  const dnsRecords = {
    spf: `v=spf1 include:_spf.simplerproofs.com ~all`,
    dkim: `v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5+7EI...`,
    dmarc: `v=DMARC1; p=none; sp=none; rua=mailto:dmarc@${domain}`
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Email Delivery Setup</h2>
        <p className="text-gray-500">
          Set up your custom sender email address for better deliverability
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="senderEmail">Custom Sender Email</Label>
          <div className="flex gap-2">
            <Input
              id="senderEmail"
              type="email"
              placeholder="proofs@yourbrand.com"
              value={storeData.senderEmail}
              onChange={handleEmailChange}
              className="flex-1"
            />
            <Button 
              onClick={handleVerifyEmail}
              disabled={verificationInProgress || !storeData.senderEmail || verificationStatus === 'verified'}
            >
              {verificationInProgress ? 'Verifying...' : verificationStatus === 'verified' ? 'Verified' : 'Verify'}
            </Button>
          </div>
          <div className="h-5">
            {verificationStatus === 'verified' && (
              <p className="text-sm text-green-500 flex items-center gap-1">
                <Check className="h-4 w-4" /> Verified successfully
              </p>
            )}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-700">Why set up a custom sender email?</p>
            <p className="text-blue-600 mt-1">
              Using your own domain for sending emails improves deliverability and brand recognition. 
              Customers are more likely to open emails from your brand than from a generic address.
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              DNS Setup Instructions
            </h3>
            
            <p className="text-sm text-gray-600">
              Add the following DNS records to your domain {domain} to verify ownership and improve email deliverability:
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="spf">
                <AccordionTrigger className="py-2">
                  SPF Record
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-3 bg-gray-50 rounded-md text-sm flex justify-between items-center">
                    <code className="text-xs">{dnsRecords.spf}</code>
                    <Button size="sm" variant="ghost" onClick={() => handleCopyDNSRecord(dnsRecords.spf)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Add as a TXT record to your domain with the name: @
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="dkim">
                <AccordionTrigger className="py-2">
                  DKIM Record
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-3 bg-gray-50 rounded-md text-sm flex justify-between items-center">
                    <code className="text-xs overflow-hidden">{dnsRecords.dkim}</code>
                    <Button size="sm" variant="ghost" onClick={() => handleCopyDNSRecord(dnsRecords.dkim)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Add as a TXT record to your domain with the name: simpler._domainkey
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="dmarc">
                <AccordionTrigger className="py-2">
                  DMARC Record
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-3 bg-gray-50 rounded-md text-sm flex justify-between items-center">
                    <code className="text-xs">{dnsRecords.dmarc}</code>
                    <Button size="sm" variant="ghost" onClick={() => handleCopyDNSRecord(dnsRecords.dmarc)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Add as a TXT record to your domain with the name: _dmarc
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-xs text-gray-500 mt-4">
              <p>DNS changes may take up to 48 hours to propagate. You can proceed with setup now and verify later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailSetupStep;
