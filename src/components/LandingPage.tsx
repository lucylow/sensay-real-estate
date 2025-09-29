import React, { useState } from 'react';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Star, Play, BarChart3, Zap, Globe, Menu, X, MessageCircle, Search, Building, FileText, Map, Bot, Video, Mic, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGetStartedClick = () => {
    navigate('/app');
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Single Clean Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900">PropGuard AI</span>
                <span className="block text-xs text-green-600 font-medium">Powered by Sensay</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={handleDashboardClick} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </button>
              <button onClick={handleChatClick} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                AI Assistant
              </button>
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  Products
                  <ArrowRight className="ml-1 h-3 w-3 rotate-90 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-3">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Core Features</h3>
                    </div>
                    <button 
                      onClick={() => navigate('/search')}
                      className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Search className="mr-3 h-4 w-4" />
                      <div>
                        <div className="font-medium">Property Search</div>
                        <div className="text-xs text-gray-500">AI-powered property discovery</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => navigate('/market-analysis')}
                      className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <BarChart3 className="mr-3 h-4 w-4" />
                      <div>
                        <div className="font-medium">Market Analysis</div>
                        <div className="text-xs text-gray-500">Real-time market insights</div>
                      </div>
                    </button>
                    <div className="px-4 py-2 border-t border-gray-100 mt-2">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sensay AI</h3>
                    </div>
                    <button 
                      onClick={() => navigate('/chat')}
                      className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <MessageCircle className="mr-3 h-4 w-4" />
                      <div>
                        <div className="font-medium">AI Chatbot</div>
                        <div className="text-xs text-gray-500">Conversational AI</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => navigate('/sensay')}
                      className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Brain className="mr-3 h-4 w-4" />
                      <div>
                        <div className="font-medium">Sensay Wisdom</div>
                        <div className="text-xs text-gray-500">Advanced AI features</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/app')} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                All Features
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => navigate('/app')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStartedClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-sm shadow-sm"
              >
                Get Started Free
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <button 
                onClick={() => {
                  handleDashboardClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  handleChatClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                AI Assistant
              </button>
              <button 
                onClick={() => {
                  navigate('/search');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Property Search
              </button>
              <button 
                onClick={() => {
                  navigate('/market-analysis');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Market Analysis
              </button>
              <button 
                onClick={() => {
                  navigate('/sensay-wisdom');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Sensay Wisdom
              </button>
              <button 
                onClick={() => {
                  navigate('/page-directory');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                All Features
              </button>
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <button 
                  onClick={() => {
                    navigate('/app');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    handleGetStartedClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-3 rounded-lg font-medium text-base text-center"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                AI-Powered Property Risk Assessment for 
                <span className="text-blue-600"> Global Lenders</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Revolutionize mortgage lending with real-time climate risk analysis, 
                blockchain-verified valuations, APRA CPS 230 compliance, and AI-powered multimodal interactions. 
                Reduce loan defaults by 30% while ensuring regulatory compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleGetStartedClick}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={handleChatClick}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition flex items-center justify-center"
                >
                  Try AI Assistant
                </button>
              </div>
              
              {/* Compliance Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-green-700 bg-green-100 px-3 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  APRA CPS 230 Compliant
                </div>
                <div className="flex items-center text-green-700 bg-green-100 px-3 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Blockchain Verified
                </div>
                <div className="flex items-center text-green-700 bg-green-100 px-3 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Real-time Climate Data
                </div>
              </div>
            </div>

            {/* Live Property Analysis Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Live Property Analysis</h3>
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      NFT Verified
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Live
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Property Address</p>
                  <p className="text-lg font-semibold text-gray-900">123 Main Street, New York</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Property Value</p>
                    <p className="text-2xl font-bold text-gray-900">$8.5M</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Confidence</p>
                    <p className="text-lg font-bold text-blue-600">92%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Risk Assessment</p>
                  <p className="text-xl font-bold text-red-600">66/100</p>
                </div>

                {/* Risk Breakdown */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-600">Flood Risk</span>
                      <span className="text-gray-600">72</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-600">Fire Risk</span>
                      <span className="text-gray-600">45</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-600">APRA Compliance</span>
                      <span className="text-gray-600">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Property Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered tools helps lenders make smarter, safer decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Analytics</h3>
              <p className="text-gray-600 mb-6">
                Get instant insights with AI-powered market analysis and risk assessments updated in real-time.
              </p>
              <button 
                onClick={() => navigate('/market-analysis')}
                className="text-blue-600 font-medium hover:text-blue-700 flex items-center justify-center"
              >
                View Analytics
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Conversation</h3>
              <p className="text-gray-600 mb-6">
                Interact with our advanced Sensay AI assistant for instant property insights and analysis.
              </p>
              <button 
                onClick={() => navigate('/chat')}
                className="text-purple-600 font-medium hover:text-purple-700 flex items-center justify-center"
              >
                Try AI Assistant
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regulatory Compliance</h3>
              <p className="text-gray-600 mb-6">
                Ensure full APRA CPS 230 compliance with automated reporting and risk assessments.
              </p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-green-600 font-medium hover:text-green-700 flex items-center justify-center"
              >
                View Dashboard
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Property Assessment Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of lenders already using PropGuard AI to make smarter, safer decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStartedClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => navigate('/app')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Explore All Features
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">PropGuard AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Advanced AI-powered property risk assessment for global lenders.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/search')} className="hover:text-white transition">Property Search</button></li>
                <li><button onClick={() => navigate('/market-analysis')} className="hover:text-white transition">Market Analysis</button></li>
                <li><button onClick={() => navigate('/sensay-chatbot')} className="hover:text-white transition">AI Assistant</button></li>
                <li><button onClick={() => navigate('/sensay')} className="hover:text-white transition">Sensay Wisdom</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/app')} className="hover:text-white transition">All Features</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition">Dashboard</button></li>
                <li><button onClick={() => navigate('/sensay')} className="hover:text-white transition">Sensay Features</button></li>
                <li><button onClick={() => navigate('/showcase')} className="hover:text-white transition">Blockchain</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleChatClick} className="hover:text-white transition">Contact Support</button></li>
                <li><button onClick={() => navigate('/chat')} className="hover:text-white transition">FAQ</button></li>
                <li><button onClick={() => navigate('/app')} className="hover:text-white transition">Sign In</button></li>
                <li><button onClick={handleGetStartedClick} className="hover:text-white transition">Get Started</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PropGuard AI. Powered by Sensay. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleChatClick}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;