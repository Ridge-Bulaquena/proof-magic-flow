
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { FileCheck, FileUp, MessageCircle, Eye, Clock, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

type ProofVersion = {
  id: string;
  timestamp: string;
  fileUrl: string;
  status: 'sent' | 'approved' | 'rejected';
  comments: string;
};

type OrderViewProps = {
  orderId: string;
};

const OrderView = ({ orderId }: OrderViewProps) => {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [proofVersions, setProofVersions] = useState<ProofVersion[]>([
    {
      id: '1',
      timestamp: '2025-05-10 14:30',
      fileUrl: '/proofs/proof1.jpg',
      status: 'sent',
      comments: 'Initial proof sent to customer',
    },
    {
      id: '2',
      timestamp: '2025-05-11 09:15',
      fileUrl: '/proofs/proof2.jpg',
      status: 'rejected',
      comments: 'Customer requested changes to text placement',
    }
  ]);

  const cannedMessages = [
    'Please review your proof and let us know if any changes are needed.',
    'Your proof is ready for review. Please check all details carefully.',
    'We\'ve made the requested changes. Please review the updated proof.',
  ];

  const artists = [
    { id: '1', name: 'Jane Smith' },
    { id: '2', name: 'John Doe' },
    { id: '3', name: 'Alice Johnson' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: "Files uploaded",
        description: `${files.length} file(s) ready to be processed`,
      });
    }
  };

  const handleSendProof = () => {
    // Handle sending proof logic
    const newVersion: ProofVersion = {
      id: (proofVersions.length + 1).toString(),
      timestamp: new Date().toLocaleString(),
      fileUrl: '/proofs/proof1.jpg', // Would be the uploaded file in a real app
      status: 'sent',
      comments: customMessage || selectedMessage,
    };
    
    setProofVersions([...proofVersions, newVersion]);
    setCustomMessage('');
    setSelectedMessage('');
    
    toast({
      title: "Proof sent successfully",
      description: "Customer has been notified via email",
    });
  };

  const handleResendReminder = () => {
    toast({
      title: "Reminder sent",
      description: "A reminder email has been sent to the customer",
    });
  };

  const handleApproveManually = () => {
    // Update the latest proof to approved
    const updatedVersions = [...proofVersions];
    const latestIndex = updatedVersions.length - 1;
    updatedVersions[latestIndex] = {
      ...updatedVersions[latestIndex],
      status: 'approved',
      comments: 'Manually approved by admin',
    };
    
    setProofVersions(updatedVersions);
    
    toast({
      title: "Proof manually approved",
      description: "The order has been marked as approved",
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      case 'sent':
        return <Badge className="bg-blue-500">Sent</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPreviewLink = () => {
    return `/acme-store/${orderId}`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order #{orderId}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResendReminder}>
            <Clock className="mr-2 h-4 w-4" />
            Resend Reminder
          </Button>
          <Button variant="outline" onClick={handleApproveManually}>
            <FileCheck className="mr-2 h-4 w-4" />
            Approve Manually
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="proofs">
            <TabsList className="mb-4">
              <TabsTrigger value="proofs">Proofs</TabsTrigger>
              <TabsTrigger value="details">Order Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="proofs">
              <Card>
                <CardHeader>
                  <CardTitle>Proof Management</CardTitle>
                  <CardDescription>Upload and manage proof files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Upload Proof Files</Label>
                      <Input type="file" multiple onChange={handleFileUpload} className="mt-2" />
                    </div>

                    <div>
                      <Label>Canned Message</Label>
                      <Select value={selectedMessage} onValueChange={setSelectedMessage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a message" />
                        </SelectTrigger>
                        <SelectContent>
                          {cannedMessages.map((message, index) => (
                            <SelectItem key={index} value={message}>
                              {message}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Custom Message</Label>
                      <Textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Add any additional notes..."
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSendProof} className="w-full">
                    <FileUp className="mr-2 h-4 w-4" />
                    Send Proof
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Proof Version History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proofVersions.map((version) => (
                      <div key={version.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{version.timestamp}</span>
                          {getStatusBadge(version.status)}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{version.comments}</p>
                        <div className="mt-2 flex space-x-2">
                          <Link to={getPreviewLink()}>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-4 w-4" />
                              Customer View
                            </Button>
                          </Link>
                          {version.status === 'rejected' && (
                            <Button variant="outline" size="sm">
                              <RefreshCcw className="mr-1 h-4 w-4" />
                              Create Revision
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Customer Name</Label>
                        <p className="font-medium">Acme Corporation</p>
                      </div>
                      <div>
                        <Label>Order Date</Label>
                        <p className="font-medium">May 10, 2025</p>
                      </div>
                      <div>
                        <Label>Product</Label>
                        <p className="font-medium">Custom Embroidered Patches</p>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <p className="font-medium">250</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <Label>Production Notes</Label>
                      <p className="text-gray-700 mt-1">Customer needs rush delivery. Special thread colors required.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Assign Artist</Label>
                  <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an artist" />
                    </SelectTrigger>
                    <SelectContent>
                      {artists.map((artist) => (
                        <SelectItem key={artist.id} value={artist.id}>
                          {artist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Internal Production Files</Label>
                  <Input type="file" multiple onChange={handleFileUpload} className="mt-2" />
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: AI, PSD, SVG, ZIP
                  </p>
                </div>

                <div>
                  <Label>Admin Notes</Label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes..."
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Comments</CardTitle>
            </CardHeader>
            <CardContent>
              {proofVersions.some(v => v.status === 'rejected') ? (
                <div className="space-y-4">
                  {proofVersions
                    .filter(v => v.status === 'rejected')
                    .map(version => (
                      <div key={`comment-${version.id}`} className="border-l-2 border-red-400 pl-4">
                        <p className="text-gray-700">{version.comments}</p>
                        <p className="text-xs text-gray-500 mt-1">{version.timestamp}</p>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <p className="text-sm text-gray-500">No comments yet</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Message to Customer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
