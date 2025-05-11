
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, CalendarIcon, BarChart, Upload, LogOut } from "lucide-react";

const DashboardLayout = () => {
  const location = useLocation();
  
  // Helper function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2">
              <span className="text-xl font-bold text-brand-purple-dark">
                Simpler<span className="text-brand-teal">Proofs</span>
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Dashboard"
                    className={isActive("/dashboard") && !isActive("/dashboard/orders") && !isActive("/dashboard/run-sheet") && !isActive("/dashboard/proof-history") && !isActive("/dashboard/upload") && !isActive("/dashboard/settings") ? "bg-brand-purple/10 text-brand-purple" : ""}
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Orders"
                    className={isActive("/dashboard/orders") ? "bg-brand-purple/10 text-brand-purple" : ""}
                  >
                    <Link to="/dashboard/orders">
                      <FileText className="h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Run Sheet"
                    className={isActive("/dashboard/run-sheet") ? "bg-brand-purple/10 text-brand-purple" : ""}
                  >
                    <Link to="/dashboard/run-sheet">
                      <BarChart className="h-4 w-4" />
                      <span>Run Sheet</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Proof History"
                    className={isActive("/dashboard/proof-history") ? "bg-brand-purple/10 text-brand-purple" : ""}
                  >
                    <Link to="/dashboard/proof-history">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Proof History</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Upload"
                    className={isActive("/dashboard/upload") ? "bg-brand-purple/10 text-brand-purple" : ""}
                  >
                    <Link to="/dashboard/upload">
                      <Upload className="h-4 w-4" />
                      <span>Upload Proof</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Settings"
                    className={isActive("/dashboard/settings") ? "bg-brand-purple/10 text-brand-purple" : ""}
                  >
                    <Link to="/dashboard/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@simpleproofs.com</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-brand-purple hover:bg-brand-purple-dark text-white">
                Upgrade Plan
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
