
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Download, Eye, History } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for the proof history
const mockProofHistory = Array(20).fill(null).map((_, i) => ({
  id: `PROOF-${2000 + i}`,
  orderId: `ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  product: i % 3 === 0 ? "Custom Patch" : i % 3 === 1 ? "Embroidery" : "Label Print",
  sentDate: new Date(Date.now() - (i * 2 * 24 * 60 * 60 * 1000)), // Each proof sent 2 days apart
  status: i % 4 === 0 ? "Awaiting Review" : i % 4 === 1 ? "Approved" : i % 4 === 2 ? "Rejected" : "Revision Requested",
  versions: Math.floor(Math.random() * 3) + 1,
  artist: `Artist ${(i % 3) + 1}`
}));

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const ProofHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({
    from: undefined,
    to: undefined,
  });
  
  const filteredHistory = mockProofHistory.filter(proof => {
    // Search filter
    const searchMatch = 
      searchTerm === "" || 
      proof.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proof.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proof.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === "all" || proof.status.replace(" ", "-").toLowerCase() === statusFilter;
    
    // Date range filter
    const proofDate = new Date(proof.sentDate);
    const dateMatch = 
      (!dateRange?.from || proofDate >= dateRange.from) && 
      (!dateRange?.to || proofDate <= dateRange.to);
    
    return searchMatch && statusMatch && dateMatch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-2xl font-semibold">Proof History</h3>
        <p className="text-sm text-muted-foreground">
          Track all proofs sent to customers and their approval status
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input 
            placeholder="Search by order ID, customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="awaiting-review">Awaiting Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="revision-requested">Revision Requested</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start min-w-[240px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                  </>
                ) : (
                  formatDate(dateRange.from)
                )
              ) : (
                <span>Date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Proof history table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Proof Records</span>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardTitle>
          <CardDescription>
            {filteredHistory.length} proofs found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proof ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Versions</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((proof) => (
                  <TableRow key={proof.id}>
                    <TableCell className="font-medium">{proof.id}</TableCell>
                    <TableCell>{proof.orderId}</TableCell>
                    <TableCell>{proof.customer}</TableCell>
                    <TableCell>{formatDate(proof.sentDate)}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                        ${proof.status === 'Awaiting Review' ? 'bg-amber-100 text-amber-800' : 
                        proof.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        proof.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'}`}
                      >
                        {proof.status}
                      </div>
                    </TableCell>
                    <TableCell>{proof.versions}</TableCell>
                    <TableCell>{proof.artist}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="View Proof">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="View History">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No proof records found matching your filters
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

export default ProofHistoryPage;
