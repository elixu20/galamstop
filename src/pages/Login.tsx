
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { MapPin, User, Shield, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('full_name') as string;
    const organization = formData.get('organization') as string;
    const userType = formData.get('agency_id') ? 'agency' : 'citizen';

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            organization,
            user_type: userType,
          },
        },
      });

      if (error) throw error;

      if (userType === 'agency') {
        const { error: verificationError } = await supabase
          .from('agency_verification')
          .insert({
            agency_name: organization,
            agency_id: formData.get('agency_id'),
          });

        if (verificationError) throw verificationError;
      }

      toast({
        title: "Success",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              <form onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-xs text-galamsey-green-DEFAULT hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-galamsey-green-DEFAULT hover:bg-galamsey-green-dark"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input 
                      id="register-name"
                      name="full_name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password"
                      name="password"
                      placeholder="Create a password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-organization">Organization</Label>
                    <Input 
                      id="register-organization"
                      name="organization"
                      placeholder="Enter your organization"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-id">Ghana.gov Agency ID (Optional)</Label>
                    <Input 
                      id="agency-id"
                      name="agency_id"
                      placeholder="Enter your Ghana.gov Agency ID if applicable"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty if you're registering as a citizen
                    </p>
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-galamsey-green-DEFAULT hover:bg-galamsey-green-dark"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
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
              Ghana.gov
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
