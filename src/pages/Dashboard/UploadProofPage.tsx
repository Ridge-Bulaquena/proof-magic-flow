
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Check, X, Image } from "lucide-react";
import { useToast } from "@/components/ui/toast";

// Mock data for orders
const mockOrders = Array(10).fill(null).map((_, i) => ({
  id: `${1000 + i}`,
  customer: `Customer ${i + 1}`,
  product: i % 3 === 0 ? "Custom Patch" : i % 3 === 1 ? "Embroidery" : "Label Print",
}));

const UploadProofPage = () => {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId) {
      toast({
        title: "Error",
        description: "Please select an order",
        variant: "destructive",
      });
      return;
    }
    
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one file",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would handle the upload - just show a success message for now
    toast({
      title: "Success",
      description: `Proof uploaded for Order #${orderId}`,
    });
    
    // Reset form
    setFiles([]);
    setMessage("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-2xl font-semibold">Upload Proof</h3>
        <p className="text-sm text-muted-foreground">
          Send proof files to customers for review and approval
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>New Proof Submission</CardTitle>
            <CardDescription>
              Upload artwork proofs to send to the customer for approval
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order selection */}
            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Select value={orderId} onValueChange={setOrderId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an order" />
                </SelectTrigger>
                <SelectContent>
                  {mockOrders.map(order => (
                    <SelectItem key={order.id} value={order.id}>
                      #{order.id} - {order.customer} - {order.product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* File upload zone */}
            <div className="space-y-2">
              <Label>Proof Files</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragging ? "border-brand-purple bg-brand-purple/5" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileUpload")?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <p className="text-sm font-medium">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Support for JPG, PNG, PDF files up to 10MB
                  </p>
                  <Input
                    id="fileUpload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </div>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Selected Files</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div 
                        key={`${file.name}-${index}`} 
                        className="flex items-center justify-between p-2 border rounded-md bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <Image className="h-5 w-5 text-gray-500" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Message to customer */}
            <div className="space-y-2">
              <Label htmlFor="message">Message to Customer (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Enter instructions or notes for the customer..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">Cancel</Button>
            <Button 
              type="submit"
              className="bg-brand-purple hover:bg-brand-purple-dark text-white"
            >
              <Check className="mr-2 h-4 w-4" />
              Send Proof
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UploadProofPage;
