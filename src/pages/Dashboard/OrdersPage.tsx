
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Search, Package, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

type OrderStatus = "in-production" | "ready" | "delivered" | "cancelled";

interface Order {
  id: string;
  customerName: string;
  productName: string;
  date: Date;
  status: OrderStatus;
  total: number;
}

// Sample data
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Acme Corp",
    productName: "Business Cards",
    date: new Date("2025-05-01"),
    status: "in-production",
    total: 149.99,
  },
  {
    id: "ORD-002",
    customerName: "TechStart Inc",
    productName: "Flyers",
    date: new Date("2025-05-05"),
    status: "ready",
    total: 299.50,
  },
  {
    id: "ORD-003",
    customerName: "Local Cafe",
    productName: "Menu Cards",
    date: new Date("2025-05-08"),
    status: "delivered",
    total: 199.75,
  },
  {
    id: "ORD-004",
    customerName: "City Events",
    productName: "Posters",
    date: new Date("2025-05-10"),
    status: "cancelled",
    total: 499.00,
  },
];

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [date, setDate] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  const filteredOrders = sampleOrders.filter(order => {
    // Filter by search query
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    
    // Filter by date range
    const matchesDate = 
      (!date.from || order.date >= date.from) &&
      (!date.to || order.date <= date.to);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case "in-production":
        return <Badge className="bg-blue-500">In Production</Badge>;
      case "ready":
        return <Badge className="bg-green-500">Ready</Badge>;
      case "delivered":
        return <Badge className="bg-gray-500">Delivered</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Order
        </Button>
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
              <SelectItem value="in-production">In Production</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
          <CardTitle>Current Orders</CardTitle>
          <CardDescription>A list of all your current orders and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-100 p-2">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{order.productName}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{order.id}</span>
                        <span>{order.customerName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {format(order.date, "MMM dd, yyyy")}
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/orders/${order.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              No orders found matching your filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
