
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  ArrowUpRight, 
  CheckCheck, 
  Clock, 
  Calendar, 
  BarChart,
  X 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useState } from "react";

const data = [
  { name: 'Jan', orders: 20, approvals: 15 },
  { name: 'Feb', orders: 35, approvals: 25 },
  { name: 'Mar', orders: 45, approvals: 40 },
  { name: 'Apr', orders: 40, approvals: 35 },
  { name: 'May', orders: 50, approvals: 45 },
];

const recentActivity = [
  { action: "Proof uploaded", orderId: 1012, customer: "Jane Smith", time: "10 minutes ago" },
  { action: "Order approved", orderId: 1009, customer: "Robert Johnson", time: "25 minutes ago" },
  { action: "Revision requested", orderId: 1005, customer: "Mike Williams", time: "1 hour ago" },
  { action: "Proof sent", orderId: 1003, customer: "Sarah Davis", time: "2 hours ago" },
  { action: "Artist assigned", orderId: 1011, customer: "Chris Brown", time: "3 hours ago" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = Array(5).fill(null).map((_, i) => ({
    id: 1000 + i,
    customer: "John Doe",
    product: "Custom Pet Patch",
    status: i % 4 === 0 ? "Awaiting Proof" : 
            i % 4 === 1 ? "Sent" : 
            i % 4 === 2 ? "Approved" : "Rejected",
    artist: `Artist ${(i % 3) + 1}`
  })).filter(order => 
    searchTerm === "" || 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Awaiting Proof</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">4 new since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94</div>
            <p className="text-xs text-muted-foreground">+6 today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">2 new today</p>
          </CardContent>
        </Card>
      </div>

      {/* Order Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Order Activity</CardTitle>
          <CardDescription>Order and approval trends over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorApprovals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Area type="monotone" dataKey="orders" stroke="#8884d8" fillOpacity={1} fill="url(#colorOrders)" />
              <Area type="monotone" dataKey="approvals" stroke="#82ca9d" fillOpacity={1} fill="url(#colorApprovals)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    {activity.action.includes("Proof") ? (
                      <BarChart className="h-4 w-4 text-primary" />
                    ) : activity.action.includes("approved") ? (
                      <CheckCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <Calendar className="h-4 w-4 text-brand-purple" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Order #{activity.orderId} - {activity.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/dashboard/orders/${activity.orderId}`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Orders */}
        <Card>
          <CardHeader className="space-y-0 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white" 
                size="sm"
                onClick={() => navigate('/dashboard/orders')}
              >
                View All
              </Button>
            </div>
            <CardDescription>
              You have 24 orders requiring proofs.
            </CardDescription>
            <div className="pt-3">
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">#{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.customer}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                        ${order.status === 'Awaiting Proof' ? 'bg-amber-100 text-amber-800' : 
                          order.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'}`}
                      >
                        {order.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-brand-purple hover:text-brand-purple-dark"
                        onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
