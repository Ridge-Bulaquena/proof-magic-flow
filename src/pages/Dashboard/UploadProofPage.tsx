
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Upload, FileCheck, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileWithPreview extends File {
  preview?: string;
}

const UploadProofPage = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      handleFiles(newFiles as FileWithPreview[]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      handleFiles(newFiles as FileWithPreview[]);
    }
  };

  const handleFiles = (newFiles: FileWithPreview[]) => {
    // Create previews for image files
    const filesWithPreviews = newFiles.map(file => {
      if (file.type.startsWith('image/')) {
        file.preview = URL.createObjectURL(file);
      }
      return file;
    });
    
    setFiles(prev => [...prev, ...filesWithPreviews]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const file = prev[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one file.",
        variant: "destructive"
      });
      return;
    }

    if (!orderId || !customerName || !orderType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Proof uploaded successfully",
        description: "The customer will be notified about the new proof.",
      });
      
      // Reset form
      setFiles([]);
      setOrderId('');
      setCustomerName('');
      setOrderType('');
      setNotes('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upload Proof</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Proof Upload</CardTitle>
          <CardDescription>
            Upload a new proof file for customer approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="order-id">Order ID</Label>
                  <Input 
                    id="order-id" 
                    placeholder="e.g., ORD-001" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input 
                    id="customer-name" 
                    placeholder="e.g., John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="order-type">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business-cards">Business Cards</SelectItem>
                      <SelectItem value="flyers">Flyers</SelectItem>
                      <SelectItem value="brochures">Brochures</SelectItem>
                      <SelectItem value="posters">Posters</SelectItem>
                      <SelectItem value="patches">Custom Patches</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any additional notes for the customer..." 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Proof Files</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Drag files here or click to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Support for PDF, PNG, JPG, AI, PSD (max 50MB each)
                    </p>
                  </div>
                  <Input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg,.ai,.psd"
                  />
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Files</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {file.preview ? (
                            <div className="h-10 w-10 rounded overflow-hidden">
                              <img src={file.preview} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                          ) : (
                            <FileCheck className="h-10 w-10 text-gray-400" />
                          )}
                          <div>
                            <p className="text-sm font-medium truncate" style={{ maxWidth: '200px' }}>
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Uploading..." : "Upload Proof"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadProofPage;
