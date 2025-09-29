import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Code, 
  MessageCircle, 
  Bot, 
  Key, 
  CheckCircle,
  ArrowRight,
  Copy,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import ChatApplication from '@/components/ChatApplication';

export default function TutorialPage() {
  const [activeStep, setActiveStep] = useState<'overview' | 'setup' | 'demo'>('overview');
  const [inAppKey, setInAppKey] = useState('');

  const tutorialSteps = [
    {
      id: 'overview',
      title: 'Tutorial Overview',
      description: 'Learn about this Sensay API tutorial',
    },
    {
      id: 'setup',
      title: 'Setup & Configuration',
      description: 'Configure your Sensay API credentials',
    },
    {
      id: 'demo',
      title: 'Live Chat Demo',
      description: 'Try the chat application yourself',
    },
  ];

  const codeExample = `// Client initialization following tutorial pattern
const organizationClient = new Client({
  BASE: 'https://api.sensay.io',
  HEADERS: {
    'X-ORGANIZATION-SECRET': apiKey,
    'Content-Type': 'application/json',
  },
});

// User-level authentication
const userClient = new Client({
  BASE: 'https://api.sensay.io',
  HEADERS: {
    'X-ORGANIZATION-SECRET': apiKey,
    'X-USER-ID': userId,
    'Content-Type': 'application/json',
  },
});`;

  const chatExample = `// Send a chat message and get a response
const response = await userClient.replicaChatCompletions.createChatCompletionPost({
  replicaUuid: replicaId,
  content: message,
});

if (response.success) {
  // Process and display the response
  setMessages((prev) => [
    ...prev,
    { role: 'assistant', content: response.content },
  ]);
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDemoLaunch = () => {
    if (inAppKey) {
      // In a real app, you'd update the environment or store the key
      console.log('Using in-app API key:', inAppKey);
      localStorage.setItem('sensay_api_key', inAppKey);
    }
    setActiveStep('demo');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Sensay API Tutorial</h1>
        <p className="text-xl text-muted-foreground">
          Building a chat application with Sensay API in Next.js
        </p>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          <BookOpen className="h-4 w-4 mr-1" />
          Interactive Tutorial
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500" />
              Implementation Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">SDK Generation</h4>
              <p className="text-sm text-muted-foreground">
                Uses openapi-typescript-codegen to generate fully typed client from Sensay API OpenAPI specification
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Authentication Flow</h4>
              <p className="text-sm text-muted-foreground">
                Demonstrates both organization-level and user-level authentication patterns
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Chat Interface</h4>
              <p className="text-sm text-muted-foreground">
                Responsive UI built with React and Tailwind CSS with modern chat patterns
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-green-500" />
              Application Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Organization authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">User creation and management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Replica creation and retrieval</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Real-time chat functionality</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Initialization Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Badge variant="outline" className="flex-shrink-0">1</Badge>
              <div>
                <strong>Initializes a client</strong> using your provided API key
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="outline" className="flex-shrink-0">2</Badge>
              <div>
                <strong>Checks if a sample user exists</strong>, creating one if necessary
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="outline" className="flex-shrink-0">3</Badge>
              <div>
                <strong>Checks for existing replicas</strong>, creating a default one if none exists
              </div>
            </li>
            <li className="flex gap-3">
              <Badge variant="outline" className="flex-shrink-0">4</Badge>
              <div>
                <strong>Sets up the authenticated chat session</strong>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={() => setActiveStep('setup')}
          size="lg"
          className="text-lg px-8"
        >
          Get Started
          <ArrowRight className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderSetup = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Setup & Configuration</h2>
        <p className="text-muted-foreground">
          Configure your Sensay API credentials to get started
        </p>
      </div>

      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          <strong>API Key Required:</strong> You need a Sensay API key to use this tutorial. 
          Request one at the{' '}
          <a 
            href="https://sensay.io/api-key-request" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Sensay API Key Request page
          </a>
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Option 1: .env.local (Recommended)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Create a .env.local file in the root directory with your API key:
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  NEXT_PUBLIC_SENSAY_API_KEY=your_api_key_here
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard('VITE_SENSAY_API_KEY=your_api_key_here')}
                  className="ml-2"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Option 2: In-app Configuration</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Paste your API key directly below:
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your Sensay API key"
                value={inAppKey}
                onChange={(e) => setInAppKey(e.target.value)}
                type="password"
              />
              <p className="text-xs text-muted-foreground">
                Your key will be stored temporarily in session storage for this demo
              </p>
            </div>
          </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Implementation Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Client Initialization</h4>
              <div className="bg-muted p-3 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Chat Interaction</h4>
              <div className="bg-muted p-3 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{chatExample}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-500" />
            SDK Regeneration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This integration uses openapi-typescript-codegen to generate the latest SDK from the Sensay API. 
            Regenerate the SDK to stay current with API changes:
          </p>
          <div className="bg-muted p-3 rounded-lg">
            <code className="text-sm">npm run generate-sdk</code>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard('npm run generate-sdk')}
              className="ml-2"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            💡 We recommend regenerating your SDK regularly to stay current with the API.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={() => setActiveStep('overview')}
        >
          Back
        </Button>
        <Button 
          onClick={handleDemoLaunch}
          disabled={!inAppKey && !import.meta.env.VITE_SENSAY_API_KEY}
          className="text-lg px-8"
        >
          Launch Demo
          <MessageCircle className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderDemo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-blue-500" />
            Live Chat Demo
          </h2>
          <p className="text-muted-foreground">
            Interact with the Sensay API powered chat application
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setActiveStep('setup')}
          >
            Back to Setup
          </Button>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Restart
          </Button>
        </div>
      </div>

      <ChatApplication />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Bot className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">Sensay Tutorial</h1>
            </div>
            <div className="flex gap-2">
              {tutorialSteps.map((step) => (
                <Button
                  key={step.id}
                  variant={activeStep === step.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveStep(step.id as any)}
                >
                  {step.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {activeStep === 'overview' && renderOverview()}
        {activeStep === 'setup' && renderSetup()}
        {activeStep === 'demo' && renderDemo()}
      </main>
    </div>
  );
}
