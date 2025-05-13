
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Search, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";

type ProofStatus = "approved" | "rejected" | "pending";

interface Proof {
  id: string;
  orderId: string;
  customerName: string;
  orderName: string;
  date: Date;
  status: ProofStatus;
}

// Sample data
const sampleProofs: Proof[] = [
  {
    id: "1",
    orderId: "ORD-001",
    customerName: "Acme Corp",
    orderName: "Business Cards",
    date: new Date("2025-05-01"),
    status: "approved",
  },
  {
    id: "2",
    orderId: "ORD-002",
    customerName: "TechStart Inc",
    orderName: "Flyers",
    date: new Date("2025-05-05"),
    status: "rejected",
  },
  {
    id: "3",
    orderId: "ORD-003",
    customerName: "Local Cafe",
    orderName: "Menu Cards",
    date: new Date("2025-05-08"),
    status: "pending",
  },
  {
    id: "4",
    orderId: "ORD-004",
    customerName: "City Events",
    orderName: "Posters",
    date: new Date("2025-05-10"),
    status: "approved",
  },
];

const ProofHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [date, setDate] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  const filteredProofs = sampleProofs.filter(proof => {
    // Filter by search query
    const matchesSearch = 
      proof.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proof.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proof.orderName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "" || proof.status === statusFilter;
    
    // Filter by date range
    const matchesDate = 
      (!date.from || proof.date >= date.from) &&
      (!date.to || proof.date <= date.to);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: ProofStatus) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proof History</h1>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by order ID, customer, or product..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  "Date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={date as any}
                onSelect={setDate as any}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proof Records</CardTitle>
          <CardDescription>A list of all proof records and their statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProofs.length > 0 ? (
            <div className="space-y-4">
              {filteredProofs.map(proof => (
                <div key={proof.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-100 p-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{proof.orderName}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Order: {proof.orderId}</span>
                        <span>Customer: {proof.customerName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {format(proof.date, "MMM dd, yyyy")}
                      </div>
                      {getStatusBadge(proof.status)}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/orders/${proof.orderId}`}>
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              No proof records found matching your filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProofHistoryPage;
