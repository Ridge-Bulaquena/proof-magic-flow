import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Upload, X } from "lucide-react";

const UploadProof = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Mock orders - replace with actual data
  const orders = [
    { id: 'ORD-001', customer: 'John Doe' },
    { id: 'ORD-002', customer: 'Jane Smith' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold">Upload Proof</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Order</label>
          <Select value={selectedOrder} onValueChange={setSelectedOrder}>
            <SelectTrigger>
              <SelectValue placeholder="Select an order" />
            </SelectTrigger>
            <SelectContent>
              {orders.map((order) => (
                <SelectItem key={order.id} value={order.id}>
                  {order.id} - {order.customer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Files</label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Upload className="h-5 w-5" />
              <span>Click to upload or drag and drop</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Selected Files</label>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Message to Customer</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message for the customer..."
            className="h-32"
          />
        </div>

        <Button className="w-full">Upload and Send Proof</Button>
      </div>
    </motion.div>
  );
};

export default UploadProof; 