import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, Copy, Check, ExternalLink, Code, Globe, 
  Settings, Palette, Monitor, Smartphone, BookOpen,
  ChevronRight, Zap, Shield, Users
} from 'lucide-react';

export const SensayChatbotIntegrationPage: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedNextJS, setCopiedNextJS] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const embedScript = `<script src="https://chat-widget.sensay.io/61f7fff6-0c92-4ab9-89df-f7bece10c623/embed-script.js" defer></script>`;

  const nextJSExample = `// pages/_app.js or app/layout.js
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Load Sensay chatbot script
    const script = document.createElement('script');
    script.src = 'https://chat-widget.sensay.io/61f7fff6-0c92-4ab9-89df-f7bece10c623/embed-script.js';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (window.SensayChatbot) {
        window.SensayChatbot.destroy();
      }
    };
  }, []);

  return <Component {...pageProps} />;
}`;

  const configExample = `// Configure chatbot appearance
window.SensayChatbot.config({
  primaryColor: '#4A90E2',
  foregroundColor: '#2C3E50',
  backgroundColor: '#E6F3FF',
  widgetPosition: 'BOTTOM_LEFT'
});`;

  const copyToClipboard = (text: string, setCopied: (value: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Sensay Chatbot Integration</h1>
          <Badge variant="secondary" className="text-sm">
            <Zap className="h-3 w-3 mr-1" />
            Ready to Deploy
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Add AI-powered property assistance to your website with our easy-to-integrate chatbot widget.
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Start - Ready to Publish
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <h3 className="font-semibold">Copy the Code</h3>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Embed Script</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(embedScript, setCopiedScript)}
                  >
                    {copiedScript ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <code className="text-xs block break-all">{embedScript}</code>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="font-semibold">Paste in HTML</h3>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Paste just before the closing <code>&lt;/body&gt;</code> tag or in the <code>&lt;head&gt;</code> section.
                </p>
                <div className="mt-2 text-xs font-mono bg-background p-2 rounded">
                  &lt;body&gt;<br />
                  &nbsp;&nbsp;... your content ...<br />
                  &nbsp;&nbsp;<span className="text-primary">{embedScript}</span><br />
                  &lt;/body&gt;
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <h3 className="font-semibold">Deploy & Go Live</h3>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Save your changes and deploy your website. The chatbot will appear automatically!
                </p>
                <div className="mt-2 flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Instant Activation</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CMS Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            CMS Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">WordPress</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Add the script to your theme's footer or use a plugin like "Insert Headers and Footers"
              </p>
              <Badge variant="outline">Easy Setup</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Webflow</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Go to Project Settings → Custom Code → Footer Code and paste the script
              </p>
              <Badge variant="outline">Simple Integration</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Wix</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Add custom code in Settings → Advanced → Custom Code → Body End
              </p>
              <Badge variant="outline">Quick Setup</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Integration */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Integration</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Basic Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For static HTML websites and most CMS solutions, simply copy and paste the script tag.
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">HTML Example</h4>
                <pre className="text-sm overflow-x-auto">
{`<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Sensay Chatbot -->
    ${embedScript}
</body>
</html>`}
                </pre>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  The script loads automatically and adds the chatbot widget to your page. No additional configuration needed!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                JavaScript API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                For advanced integrations with React, Next.js, or other client-side frameworks, use our JavaScript API.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Initialize Chatbot
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">{`window.SensayChatbot.init()`}</pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Configure Appearance
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Configuration Code</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(configExample, setCopiedConfig)}
                      >
                        {copiedConfig ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="text-sm">{configExample}</pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Destroy Chatbot
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">{`window.SensayChatbot.destroy()`}</pre>
                    <p className="text-xs text-muted-foreground mt-2">
                      Removes all chatbot HTML elements from the page
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Next.js Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Example integration for Next.js applications with proper cleanup.
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Next.js Example</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(nextJSExample, setCopiedNextJS)}
                  >
                    {copiedNextJS ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="text-sm overflow-x-auto">{nextJSExample}</pre>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                <span>Live Example:</span>
                <a 
                  href="https://widget-examples-nextjs.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  widget-examples-nextjs.vercel.app
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Chatbot Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Instant Setup</h3>
              <p className="text-sm text-muted-foreground">
                One script tag and you're live
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Customizable</h3>
              <p className="text-sm text-muted-foreground">
                Match your brand colors and positioning
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security and privacy
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Always available to help your visitors
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Developer Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Chatbot Developers Guide
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive guide for advanced integrations and custom implementations
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Guide
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                GitHub Examples
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Complete code examples for React, Next.js, and other frameworks
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Examples
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-4">
            Add AI-powered property assistance to your website in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg">
              <Copy className="h-4 w-4 mr-2" />
              Copy Integration Code
            </Button>
            <Button variant="outline" size="lg">
              <BookOpen className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensayChatbotIntegrationPage;
