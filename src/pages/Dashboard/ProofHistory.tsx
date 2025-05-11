import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search, Download } from "lucide-react";

type ProofHistory = {
  id: string;
  orderId: string;
  customerName: string;
  date: string;
  status: 'sent' | 'approved' | 'rejected';
  version: number;
};

const ProofHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data fetching
  const proofs: ProofHistory[] = [
    {
      id: 'PRF-001',
      orderId: 'ORD-001',
      customerName: 'John Doe',
      date: '2024-03-20',
      status: 'approved',
      version: 1,
    },
    // Add more mock proofs as needed
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Proof History</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search proofs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proof ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proofs.map((proof) => (
              <TableRow key={proof.id}>
                <TableCell className="font-medium">{proof.id}</TableCell>
                <TableCell>{proof.orderId}</TableCell>
                <TableCell>{proof.customerName}</TableCell>
                <TableCell>{proof.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    proof.status === 'approved' ? 'bg-green-100 text-green-800' :
                    proof.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>v{proof.version}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default ProofHistory; 