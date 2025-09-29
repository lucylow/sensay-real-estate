import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Home, 
  Building, 
  Bot, 
  Sparkles, 
  Globe, 
  Settings, 
  Map,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Heart
} from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
  icon?: React.ComponentType<{ className?: string }>;
}

const footerSections: FooterSection[] = [
  {
    title: 'Property Tools',
    icon: Building,
    links: [
      { title: 'Property Search', href: '/search' },
      { title: 'Property Details', href: '/property-detail' },
      { title: 'Market Analysis', href: '/market-analysis' },
      { title: 'Valuation Reports', href: '/valuation-report' },
    ],
  },
  {
    title: 'Sensay Features',
    icon: Bot,
    links: [
      { title: 'Chatbot Integration', href: '/sensay-chatbot' },
      { title: 'Lead Generation', href: '/sensay-leads' },
      { title: 'Conversation Analytics', href: '/sensay-analytics' },
      { title: 'Features Overview', href: '/sensay-features' },
      { title: 'Wisdom Chatbot', href: '/sensay-wisdom' },
    ],
  },
  {
    title: 'AI Services',
    icon: Sparkles,
    links: [
      { title: 'AI Services', href: '/ai-services' },
      { title: 'PropGuard Chatbot', href: '/propguard-chatbot' },
      { title: 'Avatar Features', href: '/avatar-features' },
    ],
  },
  {
    title: 'Platform',
    icon: Globe,
    links: [
      { title: 'Blockchain Integration', href: '/blockchain' },
      { title: 'Platform Demos', href: '/platform-demos' },
      { title: 'Demo Page', href: '/demo' },
    ],
  },
  {
    title: 'Testing & Setup',
    icon: Settings,
    links: [
      { title: 'Comprehensive Setup', href: '/setup' },
      { title: 'Chat Flow Quality', href: '/chat-quality' },
      { title: 'Multimodal Test', href: '/multimodal-test' },
      { title: 'HeyGen Test', href: '/heygen-test' },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">PropGuard AI</span>
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                  Powered by Sensay
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your intelligent real estate command center with AI-powered insights, 
              Sensay integration, and comprehensive property analysis tools.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3" />
                <span>support@propguard.ai</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MessageCircle className="h-4 w-4 mr-3" />
                <span>Live Chat Available</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => {
            const SectionIcon = section.icon || Globe;
            return (
              <div key={section.title}>
                <div className="flex items-center mb-4">
                  <SectionIcon className="h-5 w-5 mr-2 text-blue-400" />
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-colors flex items-center group"
                      >
                        {link.title}
                        {link.external && (
                          <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
              <span>© 2024 PropGuard AI. All rights reserved.</span>
              <span className="mx-2">•</span>
              <span>Built with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>for real estate professionals</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center items-center space-x-6 mt-6 text-sm text-gray-400">
            <Link to="/navigation" className="hover:text-white transition-colors flex items-center">
              <Map className="h-4 w-4 mr-1" />
              All Pages
            </Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

