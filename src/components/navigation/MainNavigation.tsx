import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, Search, Settings, User, Menu, X,
  Building, MapPin, Calculator, BarChart3,
  MessageSquare, Bell, HelpCircle, Info
} from 'lucide-react';

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Search', icon: Search, href: '/search' },
    { name: 'Properties', icon: Building, href: '/properties' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Messages', icon: MessageSquare, href: '/messages' },
    { name: 'Settings', icon: Settings, href: '/settings' }
  ];
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">PropGuard</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button key={item.name} variant="ghost" className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button key={item.name} variant="ghost" className="w-full justify-start gap-2">
                  <IconComponent className="h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;