
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, Bell, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-galamsey-green-DEFAULT p-1.5 rounded-md">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <Link to="/" className="font-bold text-lg text-galamsey-green-DEFAULT">
            GalamseyGuard
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-galamsey-green-DEFAULT">
            Dashboard
          </Link>
          <Link to="/report" className="text-sm font-medium hover:text-galamsey-green-DEFAULT">
            Report Activity
          </Link>
          <Link to="/map" className="text-sm font-medium hover:text-galamsey-green-DEFAULT">
            Map View
          </Link>
          <Link to="/analytics" className="text-sm font-medium hover:text-galamsey-green-DEFAULT">
            Analytics
          </Link>
          <Link to="/drones" className="text-sm font-medium hover:text-galamsey-green-DEFAULT">
            Drone Manager
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search size={18} />
          </Button>
          {user ? (
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">
                <User size={16} className="mr-2" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
