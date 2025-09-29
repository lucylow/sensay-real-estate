import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlobalSearch from './GlobalSearch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Shield,
  Home,
  BarChart3,
  Search,
  Building,
  TrendingUp,
  FileText,
  Bot,
  Users,
  MessageCircle,
  BarChart,
  Zap,
  Video,
  Settings,
  TestTube,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Globe,
  Brain,
  Camera,
  Mic,
  Monitor,
  Layers,
  Activity,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Cog,
  Wrench,
  Rocket,
  Target,
  PieChart,
  LineChart,
  Database,
  Cloud,
  Server,
  Lock,
  Key,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Bell,
  HelpCircle,
  Info,
  Star,
  Heart,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Minus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  X as XIcon,
  Loader2,
  AlertTriangle,
  InfoIcon,
  Lightbulb,
  Gift,
  Award,
  Trophy,
  Crown,
  Gem,
  Diamond,
  Flame,
  Snowflake,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  TreePine,
  Mountain,
  Waves,
  Fish,
  Bird,
  Bug,
  Flower,
  Leaf,
  Apple,
  Carrot,
  Pizza,
  Coffee,
  Beer,
  Wine,
  Cake,
  Cookie,
  IceCream,
  Sandwich,
  Hotdog,
  Burger,
  FrenchFries,
  Popcorn,
  Donut,
  Candy,
  Lollipop,
  Chocolate,
  Tea,
  Milk,
  Juice,
  Water,
  Soda,
  Energy,
  Battery,
  Power,
  Wifi,
  Bluetooth,
  Signal,
  Volume2,
  VolumeX,
  Music,
  Headphones,
  Radio,
  Tv,
  Film,
  Image,
  Photo,
  CameraIcon,
  VideoCameraSlash,
  Microphone,
  MicrophoneOff,
  SpeakerWave,
  SpeakerXMark,
  BellRing,
  BellSlash,
  Notification,
  AlertCircle2,
  CheckCircle2,
  XCircle,
  HelpCircle as HelpCircleIcon,
  QuestionMarkCircle,
  ExclamationTriangle,
  Warning,
  Error,
  Success,
  Loading,
  Spinner,
  Loader,
  Timer,
  Stopwatch,
  Hourglass,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarSearch,
  CalendarHeart,
  CalendarStar,
  CalendarClock,
  CalendarEvent,
  Calendar as CalendarIcon,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  Clock1,
  Clock2,
  Percent,
  DollarSign,
  Euro,
  Pound,
  Yen,
  Bitcoin,
  CreditCard,
  Wallet,
  Receipt,
  ShoppingCart,
  ShoppingBag,
  Tag,
  Tags,
  Hash,
  AtSign,
  Number,
  Hash as HashIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Equal,
  NotEqual,
  LessThan,
  GreaterThan,
  LessThanOrEqual,
  GreaterThanOrEqual,
  Infinity,
  Pi,
  Sigma,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega,
  Subscript,
  Superscript,
  Square,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Octagon,
  Diamond as DiamondIcon,
  Star as StarIcon,
  Heart as HeartIcon,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Surprised,
  Confused,
  Wink,
  Tongue,
  Kiss,
  Hug,
  ThumbsUp,
  ThumbsDown,
  Peace,
  Victory,
  Ok,
  Point,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  Key as KeyIcon,
  Lock as LockIcon,
  Unlock,
  Shield as ShieldIcon,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ShieldQuestion,
  ShieldPlus,
  ShieldMinus,
  ShieldOff,
  Shield as ShieldIcon2,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Sort as SortIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Move,
  MoveHorizontal,
  MoveVertical,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  Expand,
  Shrink,
  ZoomIn,
  ZoomOut,
  Focus,
  Blur,
  Crop,
  Scissors,
  Cut,
  Copy,
  Paste,
  Clipboard,
  ClipboardList,
  ClipboardCheck,
  ClipboardX,
  ClipboardCopy,
  ClipboardPaste,
  File,
  FileText as FileTextIcon,
  FileImage,
  FileVideo,
  FileAudio,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileArchive,
  FileCode,
  FileJson,
  FileXml,
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
  FileVue,
  FileSvelte,
  FileAngular,
  FileReact,
  FileNode,
  FilePython,
  FileJava,
  FileC,
  FileCpp,
  FileCsharp,
  FilePhp,
  FileRuby,
  FileGo,
  FileRust,
  FileSwift,
  FileKotlin,
  FileDart,
  FileR,
  FileMatlab,
  FileScala,
  FileHaskell,
  FileClojure,
  FileElixir,
  FileErlang,
  FileLua,
  FilePerl,
  FileBash,
  FileZsh,
  FileFish,
  FilePowershell,
  FileBatch,
  FileDocker,
  FileKubernetes,
  FileTerraform,
  FileAnsible,
  FileJenkins,
  FileGitlab,
  FileGithub,
  FileBitbucket,
  FileGit,
  FileGitBranch,
  FileGitCommit,
  FileGitMerge,
  FileGitPull,
  FileGitPush,
  FileGitRebase,
  FileGitStash,
  FileGitTag,
  FileGitLog,
  FileGitDiff,
  FileGitBlame,
  FileGitHunk,
  FileGitPatch,
  FileGitCherry,
  FileGitBisect,
  FileGitSubmodule,
  FileGitWorktree,
  FileGitLfs,
  FileGitAttributes,
  FileGitIgnore,
  FileGitModules,
  FileGitConfig,
  FileGitHooks,
  FileGitRefs,
  FileGitObjects,
  FileGitPack,
  FileGitIdx,
  FileGitPackIdx,
  FileGitPackRev,
  FileGitPackTmp,
  FileGitPackOld,
  FileGitPackNew,
  FileGitPackLock,
  FileGitPackUnlock,
  FileGitPackVerify,
  FileGitPackIndex,
  FileGitPackObject,
  FileGitPackDelta,
  FileGitPackOfs,
  FileGitPackRef,
  FileGitPackTag,
  FileGitPackTree,
  FileGitPackBlob,
  FileGitPackCommit,
  FileGitPackTag2,
  FileGitPackTree2,
  FileGitPackBlob2,
  FileGitPackCommit2,
  FileGitPackTag3,
  FileGitPackTree3,
  FileGitPackBlob3,
  FileGitPackCommit3,
  FileGitPackTag4,
  FileGitPackTree4,
  FileGitPackBlob4,
  FileGitPackCommit4,
  FileGitPackTag5,
  FileGitPackTree5,
  FileGitPackBlob5,
  FileGitPackCommit5,
  FileGitPackTag6,
  FileGitPackTree6,
  FileGitPackBlob6,
  FileGitPackCommit6,
  FileGitPackTag7,
  FileGitPackTree7,
  FileGitPackBlob7,
  FileGitPackCommit7,
  FileGitPackTag8,
  FileGitPackTree8,
  FileGitPackBlob8,
  FileGitPackCommit8,
  FileGitPackTag9,
  FileGitPackTree9,
  FileGitPackBlob9,
  FileGitPackCommit9,
  FileGitPackTag10,
  FileGitPackTree10,
  FileGitPackBlob10,
  FileGitPackCommit10,
} from 'lucide-react';

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  external?: boolean;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

const navigationSections: NavigationSection[] = [
  {
    title: 'Property Tools',
    icon: Building,
    items: [
      { title: 'Property Search', href: '/search', description: 'Find and analyze properties', icon: Search },
      { title: 'Property Details', href: '/property-detail', description: 'Detailed property information', icon: Building },
      { title: 'Market Analysis', href: '/market-analysis', description: 'Market intelligence and trends', icon: TrendingUp },
      { title: 'Valuation Reports', href: '/valuation-report', description: 'Property valuation reports', icon: FileText },
    ],
  },
  {
    title: 'Sensay Features',
    icon: Bot,
    items: [
      { title: 'Chatbot Integration', href: '/sensay-chatbot', description: 'AI chatbot integration', icon: MessageCircle },
      { title: 'Lead Generation', href: '/sensay-leads', description: 'Generate leads with AI', icon: Users },
      { title: 'Conversation Analytics', href: '/sensay-analytics', description: 'Chat analytics and insights', icon: BarChart },
      { title: 'Features Overview', href: '/sensay-features', description: 'All Sensay features', icon: Zap },
      { title: 'Wisdom Chatbot', href: '/sensay-wisdom', description: 'Advanced wisdom engine', icon: Brain },
    ],
  },
  {
    title: 'AI Services',
    icon: Sparkles,
    items: [
      { title: 'AI Services', href: '/ai-services', description: 'AI services overview', icon: Bot },
      { title: 'PropGuard Chatbot', href: '/propguard-chatbot', description: 'PropGuard AI assistant', icon: Shield },
      { title: 'Avatar Features', href: '/avatar-features', description: 'Enhanced avatar features', icon: Video },
    ],
  },
  {
    title: 'Platform',
    icon: Globe,
    items: [
      { title: 'Blockchain Integration', href: '/blockchain', description: 'Blockchain features', icon: Layers },
      { title: 'Platform Demos', href: '/platform-demos', description: 'Platform demonstrations', icon: Play },
      { title: 'Demo Page', href: '/demo', description: 'Interactive demo', icon: Monitor },
    ],
  },
  {
    title: 'Testing & Setup',
    icon: Settings,
    items: [
      { title: 'Comprehensive Setup', href: '/setup', description: 'Complete setup guide', icon: Cog },
      { title: 'Chat Flow Quality', href: '/chat-quality', description: 'Chat quality testing', icon: TestTube },
      { title: 'Multimodal Test', href: '/multimodal-test', description: 'Multimodal testing', icon: Mic },
      { title: 'HeyGen Test', href: '/heygen-test', description: 'HeyGen API testing', icon: Camera },
    ],
  },
];

const MainNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">PropGuard AI</span>
              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                Powered by Sensay
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4 mr-2 inline" />
              Home
            </Link>

            {/* Dashboard */}
            <Link
              to="/dashboard"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2 inline" />
              Dashboard
            </Link>

            {/* Property Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/search') || isActive('/property-detail') || isActive('/market-analysis') || isActive('/valuation-report')
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Property Tools
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {navigationSections[0].items.map((item) => {
                  const Icon = item.icon || Building;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 px-3 py-2 text-sm"
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sensay Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/sensay-chatbot') || isActive('/sensay-leads') || isActive('/sensay-analytics') || isActive('/sensay-features') || isActive('/sensay-wisdom')
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Sensay Features
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {navigationSections[1].items.map((item) => {
                  const Icon = item.icon || Bot;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 px-3 py-2 text-sm"
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* AI Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/ai-services') || isActive('/propguard-chatbot') || isActive('/avatar-features')
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Services
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {navigationSections[2].items.map((item) => {
                  const Icon = item.icon || Sparkles;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 px-3 py-2 text-sm"
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Platform Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/blockchain') || isActive('/platform-demos') || isActive('/demo')
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Platform
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {navigationSections[3].items.map((item) => {
                  const Icon = item.icon || Globe;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 px-3 py-2 text-sm"
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Testing & Setup Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/setup') || isActive('/chat-quality') || isActive('/multimodal-test') || isActive('/heygen-test')
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Testing
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {navigationSections[4].items.map((item) => {
                  const Icon = item.icon || Settings;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 px-3 py-2 text-sm"
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Helper */}
            <Link
              to="/navigation"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/navigation') 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Map className="h-4 w-4 mr-2 inline" />
              All Pages
            </Link>

            {/* Global Search */}
            <div className="ml-4">
              <GlobalSearch />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 py-4"
            >
              <div className="space-y-2">
                {/* Mobile Home */}
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-4 w-4 mr-3" />
                  Home
                </Link>

                {/* Mobile Dashboard */}
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Dashboard
                </Link>

                {/* Mobile Sections */}
                {navigationSections.map((section) => {
                  const SectionIcon = section.icon || Building;
                  return (
                    <div key={section.title} className="px-3">
                      <div className="flex items-center px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <SectionIcon className="h-4 w-4 mr-2" />
                        {section.title}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon || Building;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="flex items-center px-6 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Icon className="h-4 w-4 mr-3 text-gray-400" />
                              <div>
                                <div className="font-medium">{item.title}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Mobile Navigation Helper */}
                <Link
                  to="/navigation"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Map className="h-4 w-4 mr-3" />
                  All Pages
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default MainNavigation;
