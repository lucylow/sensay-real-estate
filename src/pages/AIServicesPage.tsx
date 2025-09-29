import React from 'react';
import { AIServicesShowcase } from '@/components/AIServicesShowcase';
import { IntelligentLeadScoring } from '@/components/IntelligentLeadScoring';
import { AutomatedNurturing } from '@/components/AutomatedNurturing';
import { EnhancedSensayFeatures } from '@/components/EnhancedSensayFeatures';

export const AIServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Advanced AI Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Experience the power of our comprehensive AI ecosystem: Sensay API for multilingual conversations, 
              PropGuard AI for property analysis, intelligent lead scoring, and automated nurturing campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center">
                Explore AI Services
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Services Showcase */}
      <AIServicesShowcase />

      {/* Intelligent Lead Scoring */}
      <IntelligentLeadScoring />

      {/* Automated Nurturing */}
      <AutomatedNurturing />

      {/* Enhanced Sensay Features */}
      <EnhancedSensayFeatures />

      {/* Integration Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated AI ecosystem provides unmatched capabilities for real estate professionals, 
              combining multiple AI services into a seamless, powerful platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multilingual AI</h3>
              <p className="text-gray-600 mb-4">
                Communicate with clients in their native language with real-time translation 
                and cultural context awareness powered by Sensay's Wisdom Engine.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 12+ languages supported</li>
                <li>• Real-time translation</li>
                <li>• Cultural context awareness</li>
                <li>• 94% accuracy rate</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Intelligence</h3>
              <p className="text-gray-600 mb-4">
                Advanced property valuations and comprehensive risk assessment using 
                machine learning models trained on millions of property transactions.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 96.3% valuation accuracy</li>
                <li>• Climate risk analysis</li>
                <li>• Market intelligence</li>
                <li>• Investment scoring</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lead Scoring</h3>
              <p className="text-gray-600 mb-4">
                Intelligent lead qualification algorithm that analyzes multiple factors 
                to predict conversion probability and optimize sales efforts.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 94.2% prediction accuracy</li>
                <li>• Behavioral analysis</li>
                <li>• Engagement scoring</li>
                <li>• Budget prediction</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Automated Nurturing</h3>
              <p className="text-gray-600 mb-4">
                Multi-sequence follow-up campaigns with personalized content, 
                automated triggers, and intelligent performance optimization.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 68.2% average open rate</li>
                <li>• Personalized content</li>
                <li>• A/B testing</li>
                <li>• Performance analytics</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Integration</h3>
              <p className="text-gray-600 mb-4">
                Seamless integration of all AI services with unified APIs, 
                shared data models, and consistent user experiences.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Unified API platform</li>
                <li>• Real-time data sync</li>
                <li>• Consistent UX</li>
                <li>• Scalable architecture</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive analytics and reporting across all AI services 
                with real-time insights and predictive modeling.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Real-time dashboards</li>
                <li>• Predictive modeling</li>
                <li>• Performance tracking</li>
                <li>• ROI analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on enterprise-grade infrastructure with advanced security, 
              scalability, and reliability features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sensay API</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages Supported</span>
                    <span className="font-medium">12+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">&lt; 200ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Version</span>
                    <span className="font-medium">v2.1.3</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">PropGuard AI</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valuation Accuracy</span>
                    <span className="font-medium">96.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Prediction</span>
                    <span className="font-medium">97.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-medium">&lt; 5s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Sources</span>
                    <span className="font-medium">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model Version</span>
                    <span className="font-medium">v3.2.1</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lead Scoring</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prediction Accuracy</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Data</span>
                    <span className="font-medium">50K+ leads</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scoring Factors</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Update Frequency</span>
                    <span className="font-medium">Real-time</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model Version</span>
                    <span className="font-medium">v2.1.3</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Automated Nurturing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Open Rate</span>
                    <span className="font-medium">68.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Click Rate</span>
                    <span className="font-medium">19.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Conversion</span>
                    <span className="font-medium">8.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign Types</span>
                    <span className="font-medium">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Version</span>
                    <span className="font-medium">v1.8.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of real estate professionals who are already using our 
            advanced AI services to enhance their business operations and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center">
              Schedule Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIServicesPage;
