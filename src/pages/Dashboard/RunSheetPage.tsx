
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Printer, Download } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Mock data for the run sheet
const mockRunSheetData = Array(10).fill(null).map((_, i) => ({
  id: `JOB-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  product: i % 3 === 0 ? "Custom Patch" : i % 3 === 1 ? "Embroidery" : "Label Print",
  quantity: Math.floor(Math.random() * 500) + 50,
  dueDate: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)), // Each order due a day later
  status: i % 4 === 0 ? "Ready" : i % 4 === 1 ? "In Progress" : i % 4 === 2 ? "On Hold" : "Completed",
  artist: `Artist ${(i % 3) + 1}`
}));

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const RunSheetPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const filteredItems = mockRunSheetData.filter(item => {
    if (!selectedDate) return true;
    
    const itemDate = new Date(item.dueDate);
    return (
      itemDate.getDate() === selectedDate.getDate() &&
      itemDate.getMonth() === selectedDate.getMonth() &&
      itemDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Production Run Sheet</h3>
          <p className="text-sm text-muted-foreground">
            Production schedule and daily run overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[240px] justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? formatDate(selectedDate) : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Run Sheet: {selectedDate ? formatDate(selectedDate) : "Today"}</CardTitle>
          <CardDescription>
            {filteredItems.length} items scheduled for production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Artist</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.customer}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatDate(item.dueDate)}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                        ${item.status === 'Ready' ? 'bg-blue-100 text-blue-800' : 
                        item.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                        item.status === 'On Hold' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'}`}
                      >
                        {item.status}
                      </div>
                    </TableCell>
                    <TableCell>{item.artist}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No production items scheduled for this date
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunSheetPage;
