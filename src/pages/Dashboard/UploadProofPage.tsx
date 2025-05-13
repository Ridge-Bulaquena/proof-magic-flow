
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

const UploadProofPage = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: UploadedFile[] = Array.from(e.target.files).map(file => {
        const id = Math.random().toString(36).substring(2, 9);
        
        // Create preview for images
        let preview: string | undefined;
        if (file.type.startsWith("image/")) {
          preview = URL.createObjectURL(file);
        }
        
        return {
          id,
          name: file.name,
          size: file.size,
          type: file.type,
          preview
        };
      });
      
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = files.find(file => file.id === id);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    setFiles(files.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one proof file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    if (!orderId) {
      toast({
        title: "Order ID required",
        description: "Please enter an order ID for this proof.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Proof uploaded successfully!",
      description: `The proof for order ${orderId} has been uploaded and is ready to send.`,
    });
    
    // Reset form
    setIsUploading(false);
    setFiles([]);
    setOrderId("");
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload Proof</h1>
        <p className="text-muted-foreground">
          Upload and send proofs to your customers for approval
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Proof Details</CardTitle>
            <CardDescription>
              Enter the order details and upload your proof files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <Input 
                id="orderId" 
                placeholder="Enter order ID or reference number"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Customer</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select or search for customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="acme-corp">Acme Corporation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="proof-files">Upload Proof Files</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  id="proof-files"
                  className="hidden"
                  multiple
                  accept="image/*, application/pdf"
                  onChange={handleFileChange}
                />
                <label htmlFor="proof-files" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">
                      PDF, PNG, JPG, or GIF (max 10MB)
                    </p>
                  </div>
                </label>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file) => (
                    <div 
                      key={file.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        {file.preview ? (
                          <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                            <img 
                              src={file.preview} 
                              alt={file.name}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 flex items-center justify-center rounded bg-gray-100">
                            <FileText className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium truncate max-w-[200px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message for Customer</Label>
              <Select
                value={message}
                onValueChange={setMessage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template or type custom message" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template1">Please review and approve your design</SelectItem>
                  <SelectItem value="template2">Your proof is ready for review</SelectItem>
                  <SelectItem value="template3">Please check dimensions and spelling</SelectItem>
                </SelectContent>
              </Select>
              <Textarea 
                value={message === "template1" 
                  ? "Please review and approve your design" 
                  : message === "template2"
                  ? "Your proof is ready for review"
                  : message === "template3"
                  ? "Please check dimensions and spelling"
                  : ""}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message for your customer..."
                className="h-32"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline"
            >
              Save Draft
            </Button>
            <Button 
              type="submit"
              disabled={isUploading || files.length === 0 || !orderId}
            >
              {isUploading ? "Uploading..." : "Send Proof"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default UploadProofPage;
