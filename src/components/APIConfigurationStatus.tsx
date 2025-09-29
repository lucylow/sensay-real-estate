/**
 * API Configuration Status Component
 * Shows the current status of API configurations and provides setup instructions
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  ExternalLink,
  Copy,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { supabaseAPIService } from '@/services/supabaseAPI';

interface APIConfigStatus {
  elevenlabs: boolean;
  heygen: boolean;
  errors: string[];
}

export const APIConfigurationStatus: React.FC = () => {
  const [configStatus, setConfigStatus] = useState<APIConfigStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    try {
      setIsLoading(true);
      const config = await supabaseAPIService.checkAPIConfiguration();
      setConfigStatus(config);
    } catch (error) {
      console.error('Error checking configuration:', error);
      setConfigStatus({
        elevenlabs: false,
        heygen: false,
        errors: ['Failed to check configuration']
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await checkConfiguration();
    setIsRefreshing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSupabaseSetupInstructions = () => {
    return `# Supabase Environment Variables Setup

## 1. Using Supabase CLI (Recommended)

Install Supabase CLI:
\`\`\`bash
npm install -g supabase
\`\`\`

Login to Supabase:
\`\`\`bash
supabase login
\`\`\`

Set environment variables:
\`\`\`bash
supabase secrets set ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
supabase secrets set ELEVENLABS_VOICE_ID=alex-professional-australian
supabase secrets set HEYGEN_API_KEY=your_heygen_api_key_here
supabase secrets set HEYGEN_AVATAR_ID=Marianne_CasualLook_public
\`\`\`

Verify your secrets:
\`\`\`bash
supabase secrets list
\`\`\`

## 2. Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Edge Functions**
3. Click on **Environment Variables**
4. Add each variable with its corresponding value

## Required Variables:
- ELEVENLABS_API_KEY
- ELEVENLABS_VOICE_ID
- HEYGEN_API_KEY
- HEYGEN_AVATAR_ID

## Getting API Keys:

### ElevenLabs
1. Go to https://elevenlabs.io
2. Sign up/login and go to your profile
3. Copy your API key from the API section

### HeyGen
1. Go to https://heygen.com
2. Sign up/login and go to API settings
3. Generate a new API key
4. Note your avatar ID (default: Marianne_CasualLook_public)`;
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Checking API Configuration...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Verifying API configuration with Supabase...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const allConfigured = configStatus?.elevenlabs && configStatus?.heygen;

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              API Configuration Status
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ElevenLabs Status */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {configStatus?.elevenlabs ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <h3 className="font-semibold">ElevenLabs API</h3>
                <p className="text-sm text-muted-foreground">
                  {configStatus?.elevenlabs 
                    ? 'Text-to-speech functionality is ready' 
                    : 'API key not configured in Supabase'
                  }
                </p>
              </div>
            </div>
            <Badge variant={configStatus?.elevenlabs ? "default" : "destructive"}>
              {configStatus?.elevenlabs ? 'Configured' : 'Not Configured'}
            </Badge>
          </div>

          {/* HeyGen Status */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {configStatus?.heygen ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <h3 className="font-semibold">HeyGen API</h3>
                <p className="text-sm text-muted-foreground">
                  {configStatus?.heygen 
                    ? 'Avatar video generation is ready' 
                    : 'API key not configured in Supabase'
                  }
                </p>
              </div>
            </div>
            <Badge variant={configStatus?.heygen ? "default" : "destructive"}>
              {configStatus?.heygen ? 'Configured' : 'Not Configured'}
            </Badge>
          </div>

          {/* Overall Status */}
          <Alert className={allConfigured ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
            <div className="flex items-center gap-2">
              {allConfigured ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              )}
              <AlertDescription className={allConfigured ? "text-green-800" : "text-yellow-800"}>
                {allConfigured 
                  ? 'All APIs are properly configured and ready to use!'
                  : 'Some APIs need to be configured in Supabase. Follow the setup instructions below.'
                }
              </AlertDescription>
            </div>
          </Alert>

          {/* Errors */}
          {configStatus?.errors && configStatus.errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Configuration Errors:</strong>
                <ul className="mt-2 list-disc list-inside">
                  {configStatus.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Setup Instructions
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(getSupabaseSetupInstructions())}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Instructions
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {getSupabaseSetupInstructions()}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
