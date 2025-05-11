import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Download, Filter, Search, Upload, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

// Mock data for orders
const mockOrders = Array(30).fill(null).map((_, i) => ({
  id: 2000 + i,
  customer: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  product: i % 2 === 0 ? "Custom Pet Patch" : "Embroidered Hat",
  status: i % 4 === 0 ? "Awaiting Proof" : i % 4 === 1 ? "Sent" : i % 4 === 2 ? "Approved" : "Rejected",
  artist: `Artist ${(i % 3) + 1}`,
  date: new Date(2025, 4, 10 - i).toISOString(),
}));

const OrdersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [artistFilter, setArtistFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  // Fixed: Changed the type to DateRange which has optional 'to' property
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Apply filters
  const filteredOrders = mockOrders.filter(order => {
    // Text search
    const searchMatch = 
      searchTerm === "" || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === "all" || order.status.toLowerCase().replace(" ", "-") === statusFilter;
    
    // Artist filter
    const artistMatch = artistFilter === "all" || order.artist === artistFilter;
    
    // Product filter
    const productMatch = productFilter === "all" || order.product === productFilter;
    
    // Date range filter
    const orderDate = new Date(order.date);
    const dateMatch = 
      (!dateRange?.from || orderDate >= dateRange.from) && 
      (!dateRange?.to || orderDate <= dateRange.to);
    
    return searchMatch && statusMatch && artistMatch && productMatch && dateMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Get unique artists and products for filters
  const uniqueArtists = Array.from(new Set(mockOrders.map(order => order.artist)));
  const uniqueProducts = Array.from(new Set(mockOrders.map(order => order.product)));

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setArtistFilter("all");
    setProductFilter("all");
    setDateRange({ from: undefined, to: undefined });
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search orders..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              className="bg-brand-purple hover:bg-brand-purple-dark text-white"
              onClick={() => navigate('/dashboard/upload')}
            >
              <Upload className="mr-2 h-4 w-4" />
              Create New Proof
            </Button>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Date Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          {/* Product Filter */}
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Product</SelectLabel>
                <SelectItem value="all">All Products</SelectItem>
                {uniqueProducts.map((product) => (
                  <SelectItem key={product} value={product}>{product}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {/* Artist Filter */}
          <Select value={artistFilter} onValueChange={setArtistFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Artist" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Artist</SelectLabel>
                <SelectItem value="all">All Artists</SelectItem>
                {uniqueArtists.map((artist) => (
                  <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {/* Reset Filters */}
          <Button variant="ghost" onClick={resetFilters} className="gap-2">
            <Filter className="h-4 w-4" />
            Reset Filters
          </Button>

          {/* Bulk Actions */}
          <Select disabled={paginatedOrders.length === 0}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bulk Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assign">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Assign Artist</span>
                </div>
              </SelectItem>
              <SelectItem value="export">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export Selected</span>
                </div>
              </SelectItem>
              <SelectItem value="remind">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Send Reminder</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue={statusFilter} className="w-full" onValueChange={setStatusFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="awaiting-proof">Awaiting Proof</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={statusFilter}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{statusFilter === "all" ? "All Orders" : 
                  statusFilter === "awaiting-proof" ? "Awaiting Proof" :
                  statusFilter === "sent" ? "Sent Orders" :
                  statusFilter === "approved" ? "Approved Orders" : "Rejected Orders"}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {filteredOrders.length} orders
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paginatedOrders.length > 0 ? (
                <>
                  <Table className="border rounded-md">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input type="checkbox" className="form-checkbox h-4 w-4 rounded border-gray-300" />
                        </TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden md:table-cell">Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Artist</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <input type="checkbox" className="form-checkbox h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>
                            <div>{order.customer}</div>
                            <div className="text-xs text-muted-foreground">{order.email}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{order.product}</TableCell>
                          <TableCell>
                            <div
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                                {
                                  "bg-amber-100 text-amber-800": order.status === "Awaiting Proof",
                                  "bg-blue-100 text-blue-800": order.status === "Sent",
                                  "bg-green-100 text-green-800": order.status === "Approved",
                                  "bg-red-100 text-red-800": order.status === "Rejected"
                                }
                              )}
                            >
                              {order.status}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{order.artist}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {format(new Date(order.date), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              className="text-brand-purple hover:text-brand-purple-dark hover:bg-transparent"
                              onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {totalPages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (page > 1) setPage(page - 1);
                            }}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink 
                              href="#" 
                              isActive={page === i + 1}
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(i + 1);
                              }}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (page < totalPages) setPage(page + 1);
                            }}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No orders found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button className="mt-4" variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
