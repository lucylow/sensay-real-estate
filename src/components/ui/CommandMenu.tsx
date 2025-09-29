import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Command,
  Search,
  FileText,
  BarChart3,
  Bot,
  Users,
  Home,
  Camera,
  Wallet,
  Shield,
  TrendingUp,
  Clock,
  HelpCircle,
  Settings,
  Zap,
  Star,
  ArrowRight,
  Command as CommandIcon
} from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  description: string;
  category: string;
  hotkey?: string;
  featured?: boolean;
  beta?: boolean;
}

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigationItems: NavigationItem[];
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ 
  open, 
  onOpenChange, 
  navigationItems 
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const filteredItems = navigationItems.filter(item =>
    search === '' ||
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredItems[selectedIndex]) {
            navigate(filteredItems[selectedIndex].href);
            onOpenChange(false);
            setSearch('');
          }
          break;
        case 'Escape':
          event.preventDefault();
          onOpenChange(false);
          setSearch('');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredItems, selectedIndex, navigate, onOpenChange]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  const categoryLabels: Record<string, string> = {
    core: '核心功能',
    ai: 'AI 和 Sensay',
    business: '商业工具',
    advanced: '高级功能',
    admin: '管理面板'
  };

  const categoryIcons: Record<string, React.ComponentType<any>[]> = {
    core: [BarChart3, FileText],
    ai: [Bot, Zap],
    business: [Users, Clock],
    advanced: [Wallet, Shield],
    admin: [Settings, HelpCircle]
  };

  let currentIndex = 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] p-0">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="搜索页面或功能... (按 ↑↓ 导航，回车确认，ESC 关闭)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
          />
        </div>
        
        <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="py-6 text-center text-sm">
              <Command className="mx-auto h-8 w-8 opacity-50 mb-2" />
              未找到结果
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {Object.entries(groupedItems).map(([category, items]) => {
                const categoryLabel = categoryLabels[category] || category;
                const CategoryIcon = categoryIcons[category]?.[0] || Command;
                const categoryStartIndex = currentIndex;
                
                const categoryItems = items.map((item) => {
                  const IndexIcon = item.icon;
                  const itemIndex = currentIndex++;
                  const isSelected = itemIndex === selectedIndex;
                  
                  return (
                    <div
                      key={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                        isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => {
                        navigate(item.href);
                        onOpenChange(false);
                        setSearch('');
                      }}
                    >
                      <IndexIcon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.featured && (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          )}
                          {item.beta && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              Beta
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.hotkey && (
                          <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium opacity-100 hidden h-5 px-1.5 text-xs">
                            ⌘{item.hotkey.toUpperCase()}
                          </kbd>
                        )}
                        {isSelected && (
                          <ArrowRight className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  );
                });

                return (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center gap-2 px-1 py-2">
                      <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {categoryLabel}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    {categoryItems}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-3 py-2 bg-muted/50">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">↑↓</span>
              </kbd>
              <span>导航</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">↵</span>
              </kbd>
              <span>确认</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">esc</span>
              </kbd>
              <span>关闭</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            共找到 {filteredItems.length} 个结果
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandMenu;
