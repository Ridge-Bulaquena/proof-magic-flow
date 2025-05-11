import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Search, Filter, Download, RefreshCw } from "lucide-react";

type Order = {
  id: string;
  customerName: string;
  artist: string;
  product: string;
  proofStatus: 'awaiting' | 'sent' | 'approved' | 'rejected';
  fulfillmentStatus: 'pending' | 'processing' | 'completed';
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with actual data fetching
  const orders: Order[] = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      artist: 'Jane Smith',
      product: 'T-Shirt',
      proofStatus: 'awaiting',
      fulfillmentStatus: 'pending',
    },
    // Add more mock orders as needed
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'sent':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] transition-all duration-200 hover:border-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="awaiting">Awaiting Proof</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 p-1 bg-gray-100 rounded-lg">
          {['dashboard', 'orders', 'run-sheet', 'proof-history', 'settings'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-md border shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <h2 className="font-semibold">Recent Orders</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-50 transition-colors">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Proof Status</TableHead>
                  <TableHead>Fulfillment Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow 
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.artist}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs transition-colors ${getStatusColor(order.proofStatus)}`}>
                        {order.proofStatus.charAt(0).toUpperCase() + order.proofStatus.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs transition-colors ${getStatusColor(order.fulfillmentStatus)}`}>
                        {order.fulfillmentStatus.charAt(0).toUpperCase() + order.fulfillmentStatus.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        <TabsContent value="orders">
          {/* Orders tab content */}
        </TabsContent>

        <TabsContent value="run-sheet">
          {/* Run Sheet tab content */}
        </TabsContent>

        <TabsContent value="proof-history">
          {/* Proof History tab content */}
        </TabsContent>

        <TabsContent value="settings">
          {/* Settings tab content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard; 