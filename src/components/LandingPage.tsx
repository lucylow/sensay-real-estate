import React, { useState } from 'react';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Star, Play, BarChart3, Zap, Globe, Menu, X, MessageCircle, Search, Building, FileText, Map, Bot, Video, Mic, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EnhancedSensayFeatures } from '@/components/EnhancedSensayFeatures';

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
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">PropGuard AI</span>
              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">Powered by Sensay</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <button onClick={handleDashboardClick} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                Dashboard
              </button>
              <button onClick={handleChatClick} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                Try AI Assistant
              </button>
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  Products
                  <ArrowRight className="ml-1 h-3 w-3 rotate-90 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button 
                      onClick={() => navigate('/app')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Property Intelligence
                    </button>
                    <button 
                      onClick={() => navigate('/search')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Building className="mr-2 h-4 w-4" />
                      Property Search
                    </button>
                    <button 
                      onClick={() => navigate('/market-analysis')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Market Analysis
                    </button>
                    <button 
                      onClick={() => navigate('/sensay-leads')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Sensay AI Chatbot
                    </button>
                    <button 
                      onClick={() => navigate('/sensay-wisdom')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Sensay Wisdom
                    </button>
                    <button 
                      onClick={() => navigate('/sensay-features')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Sensay Features
                    </button>
                    <button 
                      onClick={() => navigate('/blockchain')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Blockchain Integration
                    </button>
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Risk Assessment
                    </button>
                    <button 
                      onClick={() => navigate('/avatar-features')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      AI Video Avatars
                    </button>
                    <button 
                      onClick={() => navigate('/heygen-test')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      HeyGen Integration
                    </button>
                    <button 
                      onClick={() => navigate('/multimodal-test')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Voice Synthesis
                    </button>
                    <button 
                      onClick={() => navigate('/blockchain')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Blockchain NFTs
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/sensay-leads')}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Sensay Demo
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => navigate('/app')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
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
            <div className="px-4 py-4 space-y-2">
              <a 
                href="#features" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <button 
                onClick={() => {
                  navigate('/app');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Property Intelligence
              </button>
              <button 
                onClick={() => {
                  navigate('/search');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Property Search
              </button>
              <button 
                onClick={() => {
                  navigate('/market-analysis');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Market Analysis
              </button>
              <button 
                onClick={() => {
                  navigate('/sensay-leads');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Sensay Lead Generation
              </button>
              <button 
                onClick={() => {
                  navigate('/sensay-chatbot');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Sensay Chatbot
              </button>
              <button 
                onClick={() => {
                  navigate('/sensay-wisdom');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Sensay Wisdom
              </button>
              <button 
                onClick={() => {
                  navigate('/sensay-features');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Sensay Features
              </button>
              <button 
                onClick={() => {
                  navigate('/blockchain');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Blockchain Integration
              </button>
              <button 
                onClick={() => {
                  navigate('/avatar-features');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                AI Video Avatars
              </button>
              <button 
                onClick={() => {
                  navigate('/heygen-test');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                HeyGen Integration
              </button>
              <button 
                onClick={() => {
                  navigate('/multimodal-test');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Voice Synthesis
              </button>
              <button 
                onClick={() => {
                  handleDemoClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Demo
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button 
                  onClick={() => {
                    navigate('/app');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    handleGetStartedClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg font-medium text-base"
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
                  <Bot className="mr-2 h-5 w-5" />
                  Try AI Assistant
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  APRA CPS 230 Compliant
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Blockchain Verified
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Real-time Climate Data
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Live Property Analysis</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Live</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">123 Main Street, New York</span>
                    <span className="font-bold text-green-600">$8.5M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Confidence: 92%</span>
                    <span className="text-orange-600">Risk: 66/100</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <div className="font-bold text-blue-600">72</div>
                      <div className="text-gray-600">Flood Risk</div>
                    </div>
                    <div className="bg-red-50 p-2 rounded text-center">
                      <div className="font-bold text-red-600">45</div>
                      <div className="text-gray-600">Fire Risk</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded text-center">
                      <div className="font-bold text-green-600">98%</div>
                      <div className="text-gray-600">APRA</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                🔗 NFT Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600">Trusted by leading global financial institutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">ANZ</div>
              <div className="text-sm text-gray-500">Major Bank Partner</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">Westpac</div>
              <div className="text-sm text-gray-500">Pilot Program</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">NAB</div>
              <div className="text-sm text-gray-500">Risk Assessment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">CBA</div>
              <div className="text-sm text-gray-500">Compliance Testing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Sensay Features */}
      <EnhancedSensayFeatures />

      {/* Key Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Property Lending
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI-powered platform combining climate science, market intelligence, 
              and regulatory compliance in one seamless solution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Risk Assessment</h3>
              <p className="text-gray-600 mb-4">
                Real-time climate risk analysis using NASA data, machine learning models, 
                and 10-year projections for flood, fire, and coastal erosion.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />NASA FIRMS Integration</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Climate Projections</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Risk Mitigation Plans</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">APRA Compliance</h3>
              <p className="text-gray-600 mb-4">
                Automated CPS 230 compliance reporting, LVR analysis, and regulatory 
                documentation with blockchain audit trails.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />CPS 230 Reporting</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Basel III Compliance</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Audit Trail</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Blockchain Verification</h3>
              <p className="text-gray-600 mb-4">
                Immutable property certificates as NFTs, smart contract automation, 
                and transparent valuation consensus across distributed nodes.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Property NFTs</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Smart Contracts</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />XNode Consensus</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">30%</div>
              <div className="text-blue-100">Reduction in Loan Defaults</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2.3T</div>
              <div className="text-blue-100">Global Mortgage Market</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">APRA Compliance Score</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-100">Banking Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow. No hidden fees, no long-term contracts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">Free</div>
              <p className="text-gray-600 mb-6">Perfect for small teams getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />5 valuations per month</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Basic risk assessment</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Email support</li>
              </ul>
              <button 
                onClick={handleGetStartedClick}
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Get Started Free
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$299<span className="text-lg text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">Ideal for growing real estate businesses</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />100 valuations per month</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Advanced risk analysis</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />APRA compliance reporting</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />API access</li>
              </ul>
              <button 
                onClick={handleGetStartedClick}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Free Trial
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">Custom</div>
              <p className="text-gray-600 mb-6">For large organizations with custom needs</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Unlimited valuations</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Blockchain NFT certificates</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />White-label solution</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Dedicated support</li>
              </ul>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Property Lending?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join leading global lenders using PropGuard AI to reduce risk and ensure compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDemoClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Try Demo: 123 Main Street
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Schedule Demo Call
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
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">PropGuard AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered property risk assessment for the global lending market.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">APRA Compliance</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PropGuard AI. All rights reserved. APRA CPS 230 Compliant.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;