import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, X, ArrowRight, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  title: string;
  href: string;
  description: string;
  category: string;
  icon?: string;
  recent?: boolean;
  favorite?: boolean;
}

const searchData: SearchResult[] = [
  // Core Pages
  { title: 'Home', href: '/', description: 'Main landing page', category: 'Core', icon: '🏠' },
  { title: 'Dashboard', href: '/dashboard', description: 'Main application dashboard', category: 'Core', icon: '📊' },
  { title: 'All Pages', href: '/navigation', description: 'Navigate to all pages', category: 'Core', icon: '🗺️' },
  
  // Property Tools
  { title: 'Property Search', href: '/search', description: 'Find and analyze properties', category: 'Property Tools', icon: '🔍' },
  { title: 'Property Details', href: '/property-detail', description: 'Detailed property information', category: 'Property Tools', icon: '🏢' },
  { title: 'Market Analysis', href: '/market-analysis', description: 'Market intelligence and trends', category: 'Property Tools', icon: '📈' },
  { title: 'Valuation Reports', href: '/valuation-report', description: 'Property valuation reports', category: 'Property Tools', icon: '📋' },
  
  // Sensay Features
  { title: 'Sensay Chatbot', href: '/sensay-chatbot', description: 'AI chatbot integration', category: 'Sensay Features', icon: '🤖' },
  { title: 'Lead Generation', href: '/sensay-leads', description: 'Generate leads with AI', category: 'Sensay Features', icon: '👥' },
  { title: 'Conversation Analytics', href: '/sensay-analytics', description: 'Chat analytics and insights', category: 'Sensay Features', icon: '📊' },
  { title: 'Sensay Features', href: '/sensay-features', description: 'All Sensay features overview', category: 'Sensay Features', icon: '⚡' },
  { title: 'Wisdom Chatbot', href: '/sensay-wisdom', description: 'Advanced wisdom engine', category: 'Sensay Features', icon: '🧠' },
  
  // AI Services
  { title: 'AI Services', href: '/ai-services', description: 'AI services overview', category: 'AI Services', icon: '✨' },
  { title: 'PropGuard Chatbot', href: '/propguard-chatbot', description: 'PropGuard AI assistant', category: 'AI Services', icon: '🛡️' },
  { title: 'Avatar Features', href: '/avatar-features', description: 'Enhanced avatar features', category: 'AI Services', icon: '🎥' },
  
  // Platform
  { title: 'Blockchain Integration', href: '/blockchain', description: 'Blockchain features', category: 'Platform', icon: '⛓️' },
  { title: 'Platform Demos', href: '/platform-demos', description: 'Platform demonstrations', category: 'Platform', icon: '🌐' },
  { title: 'Demo Page', href: '/demo', description: 'Interactive demo', category: 'Platform', icon: '🖥️' },
  
  // Testing & Setup
  { title: 'Comprehensive Setup', href: '/setup', description: 'Complete setup guide', category: 'Testing & Setup', icon: '⚙️' },
  { title: 'Chat Flow Quality', href: '/chat-quality', description: 'Chat quality testing', category: 'Testing & Setup', icon: '🧪' },
  { title: 'Multimodal Test', href: '/multimodal-test', description: 'Multimodal testing', category: 'Testing & Setup', icon: '🎤' },
  { title: 'HeyGen Test', href: '/heygen-test', description: 'HeyGen API testing', category: 'Testing & Setup', icon: '📹' },
  
  // Features
  { title: 'Property Showcase', href: '/property-showcase', description: 'Property showcase component', category: 'Features', icon: '🏘️' },
  { title: 'Smart FAQ', href: '/smart-faq', description: 'Intelligent FAQ system', category: 'Features', icon: '❓' },
  { title: 'Virtual Tours', href: '/virtual-tours', description: 'Virtual property tours', category: 'Features', icon: '🎬' },
  { title: 'Lead Dashboard', href: '/leads', description: 'Lead management dashboard', category: 'Features', icon: '📈' },
  { title: 'Appointment Manager', href: '/appointments', description: 'Appointment scheduling', category: 'Features', icon: '📅' },
];

const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results based on query
  useEffect(() => {
    if (query.trim() === '') {
      // Show recent/favorite items when no query
      setResults(searchData.slice(0, 6));
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0, 8));
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k') {
          e.preventDefault();
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].href);
          setIsOpen(false);
          setQuery('');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.href);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
      >
        <Search className="h-4 w-4 mr-2" />
        <span className="text-gray-500">Search pages...</span>
        <div className="ml-auto flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">⌘</kbd>
          <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">K</kbd>
        </div>
      </button>

      {/* Mobile Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-gray-200">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, features, or categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-lg placeholder-gray-500 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No results found for "{query}"</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <motion.button
                        key={result.href}
                        onClick={() => handleResultClick(result)}
                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          index === selectedIndex ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                      >
                        <span className="text-2xl mr-3">{result.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                            {result.recent && <Clock className="h-3 w-3 ml-2 text-gray-400" />}
                            {result.favorite && <Star className="h-3 w-3 ml-2 text-yellow-400" />}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{result.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{result.category}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 ml-2" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                <div className="flex items-center justify-between">
                  <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
                  <span>⌘K to open search</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSearch;

