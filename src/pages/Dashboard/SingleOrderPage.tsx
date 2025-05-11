
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Clock,
  Download,
  Send,
  Upload,
  UserCircle,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  User,
  AlertCircle
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock order data (in a real app, this would come from an API)
const getOrderDetails = (id: string) => ({
  id,
  customer: "John Doe",
  email: "john.doe@example.com",
  product: "Custom Pet Patch",
  variant: "4\" Round, Red Border",
  orderDate: "May 10, 2025",
  status: "Awaiting Proof",
  artist: "Jane Smith",
  proofHistory: [
    { 
      version: 1, 
      date: "May 8, 2025", 
      status: "Draft", 
      comment: "Initial design based on customer specifications",
      imageUrl: null
    }
  ],
  customerComments: [
    {
      date: "May 7, 2025",
      comment: "Please make sure the dog's ears are pointed up, not floppy."
    }
  ],
  internalNotes: [
    {
      date: "May 7, 2025",
      author: "Admin",
      note: "Customer provided a low-resolution image. Asked for a better one."
    }
  ]
});

const SingleOrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const orderDetails = getOrderDetails(id || "0");
  
  const [activeTab, setActiveTab] = useState("details");
  const [message, setMessage] = useState("Here's your proof! Please review and let me know if you need any changes.");
  const [selectedArtist, setSelectedArtist] = useState(orderDetails.artist);
  const [internalNote, setInternalNote] = useState("");
  const [dragActive, setDragActive] = useState(false);
  
  // Handlers for file upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the dropped files
      console.log("File dropped:", e.dataTransfer.files[0].name);
      // In a real app, you'd upload the file here
    }
  };

  // Status update options based on current status
  const getAvailableStatusOptions = () => {
    switch(orderDetails.status) {
      case "Awaiting Proof":
        return ["Awaiting Proof", "Sent"];
      case "Sent":
        return ["Sent", "Approved", "Rejected"];
      case "Approved":
        return ["Approved"];
      case "Rejected":
        return ["Rejected", "Awaiting Proof"];
      default:
        return ["Awaiting Proof", "Sent", "Approved", "Rejected"];
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Awaiting Proof":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "Sent":
        return <Send className="h-5 w-5 text-blue-500" />;
      case "Approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "Draft":
        return <FileText className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/dashboard/orders')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Order #{orderDetails.id}</h1>
          <p className="text-sm text-muted-foreground">{orderDetails.product}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium
          ${orderDetails.status === 'Awaiting Proof' ? 'bg-amber-100 text-amber-800' : 
            orderDetails.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
            orderDetails.status === 'Approved' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'}`}
        >
          {getStatusIcon(orderDetails.status)}
          {orderDetails.status}
        </div>

        <div className="flex gap-2">
          <Select
            value={orderDetails.status}
            onValueChange={(value) => {
              console.log(`Status updated to: ${value}`);
              // In a real app, you'd update the status via API
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableStatusOptions().map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="proofs">Proof History</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="internal">Internal Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Proof Preview</CardTitle>
                <CardDescription>Upload proof files for this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className={`relative w-full aspect-square max-w-md mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed ${dragActive ? 'border-brand-purple bg-brand-purple/5' : 'border-gray-300'}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center p-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      {dragActive ? "Drop the file here" : "Drag & drop proof file here or click to browse"}
                    </p>
                    <Button className="mt-4 bg-brand-purple hover:bg-brand-purple-dark text-white">
                      Upload Proof
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserCircle className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{orderDetails.customer}</p>
                      <p className="text-sm text-muted-foreground">{orderDetails.email}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Order Date:</p>
                    <p>{orderDetails.orderDate}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Product:</p>
                    <p>{orderDetails.product}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Variant:</p>
                    <p>{orderDetails.variant}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Artist Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={selectedArtist}
                    onValueChange={setSelectedArtist}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Assign Artist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Michael Johnson">Michael Johnson</SelectItem>
                      <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedArtist}</p>
                      <p className="text-xs text-muted-foreground">Currently assigned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Send Proof</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message to Customer</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Send Proof
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Internal Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="proofs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Proof Version History</CardTitle>
              <CardDescription>Track all versions of the proof for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderDetails.proofHistory.map((proof, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-brand-purple text-white flex items-center justify-center font-medium">
                          {proof.version}
                        </div>
                        <div>
                          <h3 className="font-medium">Version {proof.version}</h3>
                          <p className="text-xs text-muted-foreground">{proof.date}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium
                        ${proof.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                          proof.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                          proof.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'}`}
                      >
                        {getStatusIcon(proof.status)}
                        {proof.status}
                      </div>
                    </div>
                    {proof.imageUrl ? (
                      <div className="mb-4">
                        <img 
                          src={proof.imageUrl} 
                          alt={`Proof version ${proof.version}`} 
                          className="w-full max-w-md mx-auto rounded-md border"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 h-40 bg-gray-100 flex items-center justify-center rounded-md">
                        <p className="text-muted-foreground">No image available</p>
                      </div>
                    )}
                    <div className="text-sm">
                      <p className="font-medium">Notes:</p>
                      <p className="text-muted-foreground">{proof.comment}</p>
                    </div>
                    <div className="mt-4 flex gap-2 justify-end">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Download</Button>
                      {proof.status === 'Draft' && (
                        <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white" size="sm">
                          Send to Customer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center p-6 border border-dashed rounded-lg">
                  <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Version
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="communications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Communications</CardTitle>
              <CardDescription>Messages from the customer regarding this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.customerComments.map((comm, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-6 w-6 text-muted-foreground" />
                        <span className="font-medium">{orderDetails.customer}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{comm.date}</span>
                    </div>
                    <p className="text-sm">{comm.comment}</p>
                  </div>
                ))}

                <div className="p-4 border rounded-lg">
                  <Label htmlFor="customer-reply" className="mb-2 block">Reply to Customer</Label>
                  <Textarea id="customer-reply" placeholder="Type your reply here..." className="mb-2" />
                  <div className="flex justify-end">
                    <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="internal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
              <CardDescription>Notes and comments visible only to admin and team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.internalNotes.map((note, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-6 w-6 text-muted-foreground" />
                        <span className="font-medium">{note.author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm">{note.note}</p>
                  </div>
                ))}

                <div className="p-4 border rounded-lg">
                  <Label htmlFor="internal-note" className="mb-2 block">Add Internal Note</Label>
                  <Textarea 
                    id="internal-note" 
                    placeholder="Add a note visible only to team members..." 
                    className="mb-2"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      className="bg-brand-purple hover:bg-brand-purple-dark text-white"
                      onClick={() => {
                        if (internalNote.trim()) {
                          console.log("Internal note added:", internalNote);
                          setInternalNote("");
                          // In a real app, you'd save the note via API
                        }
                      }}
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SingleOrderPage;
