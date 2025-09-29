import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
}

const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/': [],
  '/app': [
    { label: 'App Dashboard', icon: Home }
  ],
  '/dashboard': [
    { label: 'Dashboard', icon: Home }
  ],
  '/search': [
    { label: 'Search', icon: Home }
  ],
  '/property': [
    { label: 'Property Details', icon: Home }
  ],
  '/market-analysis': [
    { label: 'Market Analysis', icon: Home }
  ],
  '/report': [
    { label: 'Report', icon: Home }
  ],
  '/sensay': [
    { label: 'Sensay Integration', icon: Home }
  ],
  '/chat': [
    { label: 'AI Assistant', icon: Home }
  ],
  '/showcase': [
    { label: 'Property Showcase', icon: Home }
  ],
  '/leads': [
    { label: 'Lead Management', icon: Home }
  ],
  '/appointments': [
    { label: 'Appointments', icon: Home }
  ],
  '/virtual-tours': [
    { label: 'Virtual Tours', icon: Home }
  ],
  '/blockchain': [
    { label: 'Blockchain Integration', icon: Home }
  ],
  '/risk-analysis': [
    { label: 'Risk Analysis', icon: Home }
  ],
  '/platform-demos': [
    { label: 'Platform Demos', icon: Home }
  ],
  '/smart-faq': [
    { label: 'Smart FAQ', icon: Home }
  ],
  '/knowledge-dashboard': [
    { label: 'CMS', icon: Home }
  ]
};

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Add home breadcrumb
  breadcrumbs.push({
    label: 'PropGuard AI',
    href: '/',
    icon: Home
  });

  // Handle dynamic routes
  let currentPath = '';
  
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    
    // Check if this is a dynamic segment (starts with : or contains :)
    if (segments[i].startsWith(':')) {
      continue; // Skip dynamic segments
    }
    
    // Look up route mapping
    if (routeMapping[currentPath]) {
      breadcrumbs.push(...routeMapping[currentPath].map(item => ({
        ...item,
        href: currentPath
      })));
    }
  }

  return breadcrumbs;
};

interface BreadcrumbNavigationProps {
  className?: string;
  showNavigationAction?: boolean;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ 
  className = '',
  showNavigationAction = true 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  
  // Don't show breadcrumbs on landing page or if only one breadcrumb
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className={`breadcrumb-navigation bg-background/80 backdrop-blur-sm border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Breadcrumb Path */}
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            {breadcrumbs.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === breadcrumbs.length - 1;
              
              return (
                <li key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                  
                  {isLast ? (
                    <span className="flex items-center gap-1 text-foreground font-medium">
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <Link 
                      to={item.href} 
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1">
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Navigation Actions */}
          {showNavigationAction && (
            <div className="flex items-center gap-2">
              {/*<Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1"
              >
                返回上一页
              </Button>*/}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1"
              >
                <Home className="h-4 w-4" />
                返回首页
              </Button>
            </div>
          )}
        </div>

        {/* Current Location Context */}
        {breadcrumbs.length > 1 && (
          <>
            <Separator className="my-2" />
            <div className="flex items-center justify-between pb-3">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground">
                  {breadcrumbs[breadcrumbs.length - 1]?.label}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {getPageDescription(location.pathname)}
                </p>
              </div>
              
              {/* Quick Stats/Status */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">活跃项目</div>
                  <div className="text-xs text-muted-foreground">24 个属性</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">本月生成</div>
                  <div className="text-xs text-muted-foreground">156 个报告</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

const getPageDescription = (pathname: string): string => {
  const descriptions: Record<string, string> = {
    '/dashboard': '管理您的房地产投资组合和获得深入洞察。',
    '/search': '使用AI驱动的工具搜索和分析房地产。',
    '/property': '查看详细的属性信息和估值报告。',
    '/market-analysis': '获取市场趋势和投资机会的洞察。',
    '/sensay': '配置Sensay AI助手的集成设置。',
    '/chat': '与智能AI助手对话获取房地产建议。',
    '/leads': '管理潜在客户和销售管道。',
    '/appointments': '安排和管理客户会谈。',
    '/virtual-tours': '创建和管理虚拟房产展示。',
    '/blockchain': '探索区块链技术和NFT房地产证书。'
  };
  
  // Find matching route pattern
  for (const [pattern, description] of Object.entries(descriptions)) {
    if (pathname.startsWith(pattern)) {
      return description;
    }
  }
  
  return '探索PropGuard AI的功能和工具。';
};

export default BreadcrumbNavigation;
