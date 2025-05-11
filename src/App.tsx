
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import OrdersPage from "./pages/Dashboard/OrdersPage";
import SettingsPage from "./pages/Dashboard/SettingsPage";
import SingleOrderPage from "./pages/Dashboard/SingleOrderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<SingleOrderPage />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Additional dashboard routes to be added later */}
            <Route path="run-sheet" element={<div className="p-4">Run Sheet Page (Coming Soon)</div>} />
            <Route path="proof-history" element={<div className="p-4">Proof History Page (Coming Soon)</div>} />
            <Route path="upload" element={<div className="p-4">Upload Proof Page (Coming Soon)</div>} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
