
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Send, Upload, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SingleOrderPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/dashboard/orders')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Order #ORD-2001</h1>
          <p className="text-sm text-muted-foreground">Custom Pet Patch</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Proof Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-md bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No proof uploaded yet</p>
                <Button className="mt-4 bg-brand-purple hover:bg-brand-purple-dark text-white">
                  Upload Proof
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <UserCircle className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Order Date:</p>
                <p>May 10, 2025</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Product:</p>
                <p>Custom Pet Patch</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Variant:</p>
                <p>4" Round, Red Border</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Send Proof</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message to Customer</Label>
                <Textarea
                  id="message"
                  defaultValue="Here's your proof! Please review and let me know if you need any changes."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button disabled className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Send Proof
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Internal Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
