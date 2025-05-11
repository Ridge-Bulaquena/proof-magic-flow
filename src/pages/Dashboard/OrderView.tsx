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
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [selectedMessage, setSelectedMessage] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [proofVersions, setProofVersions] = useState<ProofVersion[]>([
    {
      id: '1',
      timestamp: '2024-03-20 14:30',
      fileUrl: '/proofs/proof1.jpg',
      status: 'sent',
      comments: 'Initial proof sent to customer',
    },
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
    if (files) {
      // Process files
    }
  };

  const handleSendProof = () => {
    // Handle sending proof logic
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order #{orderId}</h1>
        <div className="flex gap-2">
          <Button variant="outline">Resend Reminder</Button>
          <Button variant="outline">Approve Manually</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
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

                <Button onClick={handleSendProof} className="w-full">
                  Send Proof
                </Button>
              </div>
            </CardContent>
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
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        version.status === 'approved' ? 'bg-green-100 text-green-800' :
                        version.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {version.status.charAt(0).toUpperCase() + version.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{version.comments}</p>
                    <Button variant="link" className="mt-2 p-0 h-auto">
                      View Proof
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
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
              <div className="space-y-4">
                {/* Customer comments will be displayed here */}
                <p className="text-sm text-gray-500">No comments yet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderView; 