import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Command, ChevronUpDown as ArrowUpDown,
  Building, MapPin, Calculator, BarChart3,
  MessageSquare, Settings, User, HelpCircle
} from 'lucide-react';

const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const commands = [
    { name: 'Search Properties', icon: Search, action: 'search' },
    { name: 'Open Dashboard', icon: BarChart3, action: 'dashboard' },
    { name: 'View Settings', icon: Settings, action: 'settings' },
    { name: 'Help Center', icon: HelpCircle, action: 'help' }
  ];
  
  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Command className="h-4 w-4" />
        Search commands...
        <Badge variant="secondary" className="ml-2">
          ⌘K
        </Badge>
      </Button>
      
      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 w-96 z-50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <Input 
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 p-0 focus-visible:ring-0"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => {
                  const IconComponent = cmd.icon;
                  return (
                    <Button 
                      key={cmd.action}
                      variant="ghost" 
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        console.log(`Executing: ${cmd.action}`);
                        setIsOpen(false);
                      }}
                    >
                      <IconComponent className="h-4 w-4" />
                      {cmd.name}
                    </Button>
                  );
                })
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No commands found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommandPalette;