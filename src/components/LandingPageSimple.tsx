import React from 'react';
import { ArrowRight, Shield, CheckCircle, TrendingUp, Users, Zap, Building, BarChart3, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPageSimple = () => {
  const navigate = useNavigate();

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">PropGuard AI</span>
                  <span className="block text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    Powered by Sensay
                  </span>
                </div>
              </div>

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
              <div className="bg-white rounded-2xl shadow--xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Live Property Analysis</h3>
                  <div className="flex gap-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">
                      🔗 NFT Verified
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Live
                    </span>
                  </div>
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

      {/* Key Features */}
      <section className="py-20">
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
                Immutable property certificates as NFTs, smart contract Automation, 
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
      <section className="py-20 bg-gray-50">
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
              onClick={handleGetStartedClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Schedule Demo Call
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">PropGuard AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered property risk assessment for the global lending market.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/search')} className="hover:text-white transition-colors">Property Search</button></li>
                <li><button onClick={() => navigate('/market-analysis')} className="hover:text-white transition-colors">Market Analysis</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Dashboard</button></li>
                <li><button onClick={() => navigate('/chat')} className="hover:text-white transition-colors">AI Assistant</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white cursor-pointer">About</span></li>
                <li><span className="hover:text-white cursor-pointer">Blog</span></li>
                <li><span className="hover:text-white cursor-pointer">Careers</span></li>
                <li><span className="hover:text-white cursor-pointer">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white cursor-pointer">APRA Compliance</span></li>
                <li><span className="hover:text-white cursor-pointer">Security</span></li>
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

export default LandingPageSimple;
