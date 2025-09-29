import React from 'react';
import { EnhancedSensayFeatures } from '@/components/EnhancedSensayFeatures';
import { MultilingualChatInterface } from '@/components/MultilingualChatInterface';
import { VirtualTourBooking } from '@/components/VirtualTourBooking';
import { SensayRealEstateChatbot } from '@/components/SensayRealEstateChatbot';

export const SensayFeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sensay Wisdom Features
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Experience the power of multilingual AI conversations, virtual tour scheduling, 
              and advanced property analytics powered by Sensay's Wisdom Engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center">
                Start Multilingual Chat
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center">
                Schedule Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features */}
      <EnhancedSensayFeatures />

      {/* Multilingual Chat Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multilingual AI Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chat with our AI assistant in 12+ languages with real-time translation 
              and cultural context awareness.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <MultilingualChatInterface />
          </div>
        </div>
      </section>

      {/* Virtual Tour Booking */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Virtual Tour Scheduling
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule personalized virtual property tours with live agents in your preferred language.
            </p>
            </div>
          <VirtualTourBooking />
            </div>
      </section>

      {/* Sensay Chatbot Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sensay Real Estate Chatbot
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our advanced AI-powered real estate assistant with lead generation, 
              property recommendations, and intelligent conversations.
            </p>
            </div>
          <div className="max-w-6xl mx-auto">
            <SensayRealEstateChatbot />
            </div>
      </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sensay-Powered Features?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integration with Sensay's Wisdom Engine provides unmatched AI capabilities 
              for real estate professionals and clients.
            </p>
                  </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🌍</span>
                  </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multilingual Support</h3>
              <p className="text-gray-600 mb-4">
                Communicate with clients in their native language with real-time translation 
                and cultural context awareness.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 12+ languages supported</li>
                <li>• Real-time translation</li>
                <li>• Cultural context awareness</li>
              </ul>
                </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎥</span>
                    </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Virtual Tours</h3>
              <p className="text-gray-600 mb-4">
                Schedule and conduct virtual property tours with live agents, 
                making property viewing accessible from anywhere.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Live agent assistance</li>
                <li>• Flexible scheduling</li>
                <li>• Interactive property viewing</li>
              </ul>
      </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Insights</h3>
              <p className="text-gray-600 mb-4">
                Get sophisticated property analysis, market intelligence, and 
                investment advice powered by advanced AI.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Market trend analysis</li>
                <li>• Investment recommendations</li>
                <li>• Risk assessment</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive property analytics with market intelligence, 
                risk assessments, and detailed reporting.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Real-time market data</li>
                <li>• Risk mitigation strategies</li>
                <li>• Professional reports</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Conversations</h3>
              <p className="text-gray-600 mb-4">
                Natural, intelligent conversations that understand context and 
                provide personalized assistance for real estate needs.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Context-aware responses</li>
                <li>• Personalized recommendations</li>
                <li>• 24/7 availability</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lead Generation</h3>
              <p className="text-gray-600 mb-4">
                Intelligent lead qualification and nurturing with automated 
                follow-ups and personalized property recommendations.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Automated lead scoring</li>
                <li>• Personalized follow-ups</li>
                <li>• Property matching</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Sensay-Powered Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of real estate professionals who are already using our 
            advanced AI-powered platform to enhance their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center">
              Schedule Demo
            </button>
          </div>
      </div>
      </section>
    </div>
  );
};

export default SensayFeaturesPage;