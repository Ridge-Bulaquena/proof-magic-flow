
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const OrdersPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-9" />
        </div>
        <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white w-full sm:w-auto">
          Create New Proof
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="awaiting">Awaiting Proof</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-[1fr,1fr,1.5fr,1fr,1fr,1fr] p-4 text-xs font-medium text-muted-foreground">
                  <div>Order ID</div>
                  <div>Customer</div>
                  <div>Product</div>
                  <div>Status</div>
                  <div>Artist</div>
                  <div className="text-right">Action</div>
                </div>
                {Array(10).fill(null).map((_, i) => (
                  <div key={i} className="grid grid-cols-[1fr,1fr,1.5fr,1fr,1fr,1fr] items-center border-t p-4 text-sm">
                    <div className="font-medium">#ORD-{2000 + i}</div>
                    <div>Customer {i + 1}</div>
                    <div>{i % 2 === 0 ? "Custom Pet Patch" : "Embroidered Hat"}</div>
                    <div>
                      {i % 4 === 0 && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                          Awaiting Proof
                        </span>
                      )}
                      {i % 4 === 1 && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                          Sent
                        </span>
                      )}
                      {i % 4 === 2 && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                          Approved
                        </span>
                      )}
                      {i % 4 === 3 && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                          Rejected
                        </span>
                      )}
                    </div>
                    <div>Artist {(i % 3) + 1}</div>
                    <div className="text-right">
                      <a href={`/dashboard/orders/${2000 + i}`} className="text-brand-purple hover:underline">
                        View Order
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
