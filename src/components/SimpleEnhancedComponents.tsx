import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, Send, Calculator, DollarSign,
  Search, Phone, Mail, FileText, 
  Bot, TrendingUp, CheckCircle, AlertCircle, Clock, BarChart3,
  Database, Key, ArrowUpDown, Image, Video, Mic, Volume2,
  Bell, HelpCircle, AlertTriangle, Info
} from 'lucide-react';

// Simple working PersonalizedSearchEngine
const PersonalizedSearchEngine = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setResults([
        `Property result 1 for "${searchQuery}"`,
        `Property result 2 for "${searchQuery}"`,
        `Property result 3 for "${searchQuery}"`
      ]);
    }
  };
  
  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Personalized Search Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for properties..."
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                {result}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple working PropGuardFeaturesShowcase
const PropGuardFeaturesShowcase = () => {
  const features = [
    { name: 'Property Analysis', description: 'AI-powered property analysis', status: 'active' },
    { name: 'Risk Assessment', description: 'Comprehensive risk evaluation', status: 'active' },
    { name: 'Market Intelligence', description: 'Real-time market insights', status: 'beta' }
  ];
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>PropGuard Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h3 className="font-medium">{feature.name}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                  {feature.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple working PropertyValuationForm
const PropertyValuationForm = () => {
  const [propertyData, setPropertyData] = useState({
    address: '',
    bedrooms: 0,
    bathrooms: 0,
    landSize: 0
  });
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Valuation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Property address"
            value={propertyData.address}
            onChange={(e) => setPropertyData(prev => ({ ...prev, address: e.target.value }))}
          />
          <div className="grid grid-cols-3 gap-4">
            <Input 
              type="number"
              placeholder="Bedrooms"
              value={propertyData.bedrooms || ''}
              onChange={(e) => setPropertyData(prev => ({ ...prev, bedrooms: parseInt(e.target.value) || 0 }))}
            />
            <Input 
              type="number"
              placeholder="Bathrooms"
              value={propertyData.bathrooms || ''}
              onChange={(e) => setPropertyData(prev => ({ ...prev, bathrooms: parseInt(e.target.value) || 0 }))}
            />
            <Input 
              type="number"
              placeholder="Land size"
              value={propertyData.landSize || ''}
              onChange={(e) => setPropertyData(prev => ({ ...prev, landSize: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <Button className="w-full">
            Get Valuation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple working SensayAssistant
const SensayAssistant = () => {
  const [status, setStatus] = useState<'valid' | 'invalid' | 'missing'>('valid');
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Sensay Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Badge variant={status === 'valid' ? 'default' : 'destructive'}>
              Status: {status}
            </Badge>
            <p className="text-sm text-gray-600">
              AI assistant ready to help with property analysis
            </p>
            <Button 
              onClick={() => setStatus(status === 'valid' ? 'invalid' : 'valid')}
              variant="outline"
            >
              Toggle Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple working VoiceCloner
const VoiceCloner = () => {
  const [isCloning, setIsCloning] = useState(false);
  
  const handleCloneVoice = () => {
    setIsCloning(true);
    setTimeout(() => setIsCloning(false), 2000);
  };
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Cloner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Clone voices for personalized property tours
          </p>
          <Button 
            onClick={handleCloneVoice}
            disabled={isCloning}
            className="w-full"
          >
            {isCloning ? 'Cloning...' : 'Clone Voice'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple working VoiceSettingsPage
const VoiceSettingsPage = () => {
  const [settings, setSettings] = useState({
    volume: 50,
    speed: 1.0,
    pitch: 1.0
  });
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Volume: {settings.volume}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.volume}
              onChange={(e) => setSettings(prev => ({ ...prev, volume: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Speed: {settings.speed}x</label>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1"
              value={settings.speed}
              onChange={(e) => setSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
          <Button className="w-full">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple working PlatformDemoShowcase
const PlatformDemoShowcase = () => {
  const platforms = [
    { name: 'WhatsApp', icon: MessageSquare, status: 'active' },
    { name: 'Email', icon: Mail, status: 'active' },
    { name: 'Web Chat', icon: Bot, status: 'beta' }
  ];
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Demos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <div key={platform.name} className="p-4 border rounded text-center">
                  <IconComponent className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-medium">{platform.name}</h3>
                  <Badge variant={platform.status === 'active' ? 'default' : 'secondary'}>
                    {platform.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export {
  PersonalizedSearchEngine,
  PropGuardFeaturesShowcase, 
  PropertyValuationForm,
  SensayAssistant,
  VoiceCloner,
  VoiceSettingsPage,
  PlatformDemoShowcase
};