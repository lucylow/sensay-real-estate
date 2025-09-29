import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Command, 
  ArrowRight, 
  Star,
  Clock,
  Zap,
  Home,
  Bot,
  Shield,
  TrendingUp,
  Users,
  Settings,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Command {
  name: string;
  shortcut?: string;
  action: string;
  category: 'navigation' | 'actions' | 'settings' | 'recent';
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface CommandCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  commands: Command[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  recentPages?: Array<{ id: string; name: string; path: string }>;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  recentPages = []
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandCategories: CommandCategory[] = [
    {
      name: 'Navigation',
      icon: Home,
      commands: [
        {
          name: 'Go to Dashboard',
          shortcut: 'g d',
          action: '/dashboard',
          category: 'navigation',
          icon: Home,
          description: 'Navigate to main dashboard'
        },
        {
          name: 'Open Property Search',
          shortcut: 'g p',
          action: '/search',
          category: 'navigation',
          icon: Search,
          description: 'Start property search'
        },
        {
          name: 'View Sensay Analytics',
          shortcut: 'g a',
          action: '/sensay-analytics',
          category: 'navigation',
          icon: TrendingUp,
          description: 'Check conversation analytics'
        },
        {
          name: 'Property Showcase',
          shortcut: 'g s',
          action: '/property-showcase',
          category: 'navigation',
          icon: Home,
          description: 'Browse property showcases'
        }
      ]
    },
    {
      name: 'Actions',
      icon: Zap,
      commands: [
        {
          name: 'Start New Session',
          action: 'start-session',
          category: 'actions',
          icon: Play,
          description: 'Begin new property analysis'
        },
        {
          name: 'Generate Report',
          action: 'generate-report',
          category: 'actions',
          icon: TrendingUp,
          description: 'Create comprehensive property report'
        },
        {
          name: 'Test Chatbot',
          action: 'test-chatbot',
          category: 'actions',
          icon: Bot,
          description: 'Test Sensay chatbot integration'
        },
        {
          name: 'Export Data',
          action: 'export-data',
          category: 'actions',
          icon: Shield,
          description: 'Export property data'
        }
      ]
    },
    {
      name: 'Settings',
      icon: Settings,
      commands: [
        {
          name: 'Configure Sensay API',
          action: '/sensay',
          category: 'settings',
          icon: Bot,
          description: 'Set up Sensay integration'
        },
        {
          name: 'Update Preferences',
          action: '/preferences',
          category: 'settings',
          icon: Settings,
          description: 'Modify user preferences'
        },
        {
          name: 'Manage Users',
          action: '/users',
          category: 'settings',
          icon: Users,
          description: 'User management'
        }
      ]
    },
    {
      name: 'Recent',
      icon: Clock,
      commands: recentPages.slice(0, 5).map(page => ({
        name: page.name,
        action: page.path,
        category: 'recent' as const,
        icon: Clock,
        description: 'Recently visited page'
      }))
    }
  ];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if (e.metaKey || e.ctrlKey) {
          if (e.key === 'k') {
            e.preventDefault();
            // Open palette (managed by parent)
          }
        }
        return;
      }

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => prev + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(0, prev - 1));
          break;
        case 'Enter':
          e.preventDefault();
          executeSelectedCommand();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex]);

  const allCommands = commandCategories.flatMap(category => category.commands);
  const filteredCommands = allCommands.filter(cmd =>
    cmd.name.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
    cmd.shortcut?.toLowerCase().includes(query.toLowerCase())
  );

  const categoriesWithFilteredCommands = commandCategories.map(category => ({
    ...category,
    commands: category.commands.filter(cmd =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
      cmd.shortcut?.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(category => category.commands.length > 0);

  const executeSelectedCommand = () => {
    const selectedCommand = filteredCommands[selectedIndex];
    if (selectedCommand) {
      if (selectedCommand.action.startsWith('/')) {
        navigate(selectedCommand.action);
      } else {
        // Handle actions that don't navigate
        console.log('Executing action:', selectedCommand.action);
      }
      onClose();
    }
  };

  useEffect(() => {
    setSelectedIndex(Math.min(selectedIndex, filteredCommands.length - 1));
  }, [filteredCommands.length, selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
              <div className="p-1 bg-blue-500 rounded">
                <Command className="h-4 w-4 text-white" />
              </div>
              <Input
                ref={inputRef}
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 shadow-none text-lg placeholder-gray-500 focus-visible:ring-0"
              />
            </div>

            {/* Commands */}
            <div className="max-h-96 overflow-y-auto">
              {categoriesWithFilteredCommands.map((category, categoryIndex) => (
                <div key={category.name} className="border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50">
                    <category.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </div>
                  
                  {category.commands.map((command, commandIndex) => {
                    const globalIndex = commandCategories.flatMap((cat, catIdx) => {
                      if (catIdx < categoryIndex) return cat.commands;
                      if (catIdx === categoryIndex) return cat.commands.slice(0, commandIndex + 1);
                      return [];
                    }).length - 1;

                    const isSelected = globalIndex === selectedIndex;
                    
                    return (
                      <motion.div
                        key={`${category.name}-${command.name}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: commandIndex * 0.05 }}
                      >
                        <div
                          className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50 border-r-2 border-blue-500' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            if (command.action.startsWith('/')) {
                              navigate(command.action);
                            }
                            onClose();
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-1 rounded ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                              <command.icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                            </div>
                            <div>
                              <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                                {command.name}
                              </span>
                              {command.description && (
                                <p className="text-sm text-gray-500">{command.description}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {command.shortcut && (
                              <Badge variant="outline" className="text-xs">
                                {command.shortcut}
                              </Badge>
                            )}
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-b-lg text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Command className="h-3 w-3" />
                  <span>⌘</span>
                </span>
                <span>to open</span>
                <span className="flex items-center space-x-1">
                  <ArrowUpDown className="h-3 w-3" />
                  <span>navigate</span>
                </span>
                <span className="flex items-center space-x-1">
                  <ArrowRight className="h-3 w-3" />
                  <span>select</span>
                </span>
              </div>
              <span className="flex items-center space-x-1">
                <span>esc</span>
                <span>to close</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
