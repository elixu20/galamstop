
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, User, Shield } from "lucide-react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex items-center mb-8">
        <div className="bg-galamsey-green-DEFAULT p-1.5 rounded-md">
          <MapPin className="h-6 w-6 text-white" />
        </div>
        <Link to="/" className="font-bold text-xl ml-2 text-galamsey-green-DEFAULT">
          GalamseyGuard
        </Link>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to access the GalamseyGuard platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-galamsey-green-DEFAULT hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" placeholder="Enter your password" type="password" />
                  </div>
                  <Button className="w-full bg-galamsey-green-DEFAULT hover:bg-galamsey-green-dark">
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input id="register-name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" placeholder="Enter your email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" placeholder="Create a password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-organization">Organization (Optional)</Label>
                    <Input id="register-organization" placeholder="Enter your organization" />
                  </div>
                  <Button className="w-full bg-galamsey-green-DEFAULT hover:bg-galamsey-green-dark">
                    Create Account
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Gov ID
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <p className="mt-6 text-center text-sm text-muted-foreground">
        By signing in, you agree to our{" "}
        <Link to="/terms" className="text-galamsey-green-DEFAULT hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="text-galamsey-green-DEFAULT hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Login;
