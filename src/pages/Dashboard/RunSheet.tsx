import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Order = {
  id: string;
  lineItemNumber: string;
  customerName: string;
  productColor: string;
  imagePreview: string;
  internalFileUrl: string;
  approvalDate: string;
  isExcluded: boolean;
};

const RunSheet = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      lineItemNumber: '1',
      customerName: 'John Doe',
      productColor: 'Black T-Shirt',
      imagePreview: '/previews/preview1.jpg',
      internalFileUrl: '/files/file1.ai',
      approvalDate: '2024-03-20',
      isExcluded: false,
    },
    // Add more mock orders as needed
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExcludeToggle = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, isExcluded: !order.isExcluded }
        : order
    ));
  };

  const handleGenerateRunSheet = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    // Handle actual run sheet generation
    setIsGenerating(false);
  };

  const handleDownloadCSV = () => {
    // Handle CSV download
  };

  const handleDownloadZIP = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    // Handle actual ZIP download
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Run Sheet Generator</CardTitle>
          <CardDescription>
            Generate run sheets and download production files for approved orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleDownloadCSV}
                disabled={isGenerating}
              >
                Download CSV
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadZIP}
                disabled={isGenerating}
              >
                Download ZIP
              </Button>
              <Button
                onClick={handleGenerateRunSheet}
                disabled={isGenerating}
              >
                Generate Run Sheet
              </Button>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-gray-500 text-center">
                  {progress === 100 ? 'Complete!' : 'Processing...'}
                </p>
              </div>
            )}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Exclude</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Line Item #</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Product Color</TableHead>
                    <TableHead>Image Preview</TableHead>
                    <TableHead>Internal File</TableHead>
                    <TableHead>Approval Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox
                          checked={order.isExcluded}
                          onCheckedChange={() => handleExcludeToggle(order.id)}
                        />
                      </TableCell>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.lineItemNumber}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.productColor}</TableCell>
                      <TableCell>
                        <img
                          src={order.imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto">
                          Download
                        </Button>
                      </TableCell>
                      <TableCell>{order.approvalDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunSheet; 