import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Key, CheckCircle, AlertCircle, Copy, Globe } from 'lucide-react';
import { SensayCredentials } from '@/services/api/sensay';

interface SensaySetupProps {
  onCredentialsSet?: (credentials: SensayCredentials) => void;
  className?: string;
}

export const SensaySetup: React.FC<SensaySetupProps> = ({ 
  onCredentialsSet, 
  className = '' 
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'redeeming' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [testResult, setTestResult] = useState<{ status: string; message: string } | null>(null);

  const handleRedeemInvite = async () => {
    if (!inviteCode.trim()) {
      setMessage('Invite code is required');
      setStatus('error');
      return;
    }

    setIsRedeeming(true);
    setStatus('redeeming');
    setMessage('Redeeming invite code...');

    try {
      // Mock API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = {
        apiKey: `sk_${inviteCode}_${Date.now()}`,
        organizationId: `org_${inviteCode}_${Date.now()}`,
        message: 'Invite code redeemed successfully!'
      };
      setApiKey(result.apiKey);
      setOrganizationId(result.organizationId);
      setMessage(result.message);
      setStatus('success');
      
      // Store credentials in localStorage for persistence
      const credentials: SensayCredentials = {
        apiKey: result.apiKey,
        organizationId: result.organizationId
      };
      localStorage.setItem('sensay_credentials', JSON.stringify(credentials));
      
      // Notify parent component
      if (onCredentialsSet) {
        onCredentialsSet(credentials);
      }
    } catch (error) {
      setMessage(`Failed to redeem invite code: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStatus('error');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleTestApiKey = async () => {
    if (!apiKey.trim() || !organizationId.trim()) {
      setMessage('API key and organization ID are required');
      return;
    }

    setIsTesting(true);
    setMessage('Testing API connection...');

    try {
      // Mock API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = {
        status: 'healthy',
        message: 'API connection successful'
      };
      
      setTestResult(result);
      setMessage(result.status === 'healthy' ? 'Success!' : 'Test failed');
      setStatus(result.status === 'healthy' ? 'success' : 'error');
      
      if (result.status === 'healthy') {
        // Store credentials in localStorage
        const credentials: SensayCredentials = { apiKey, organizationId };
        localStorage.setItem('sensay_credentials', JSON.stringify(credentials));
        
        // Notify parent component
        if (onCredentialsSet) {
          onCredentialsSet(credentials);
        }
      }
    } catch (error) {
      setTestResult({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
      setMessage(`Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStatus('error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setMessage('API key copied to clipboard');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'redeeming':
        return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <Key className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          Sensay Platform Setup
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Hackathon Demo
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Global Platform Information */}
        <Alert>
          <Globe className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium">Welcome to Sensay Real Estate Platform</p>
              <p className="text-sm">
                Connect your Sensay account to access advanced property analysis, AI-powered insights, and comprehensive market data.
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto"
                onClick={() => window.open('https://docs.sensay.io', '_blank')}
              >
                View Documentation
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Step 1: Redeem Invite Code */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 1: Redeem Invite Code</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Sensay invite code to automatically configure your API credentials.
            </p>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="invite-code">Invite Code</Label>
                <Input
                  id="invite-code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter your invite code"
                  disabled={isRedeeming}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleRedeemInvite}
                  disabled={isRedeeming || !inviteCode.trim()}
                >
                  {isRedeeming ? 'Redeeming...' : 'Redeem'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Manual API Credentials Entry */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 2: Manual API Credentials Entry</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Alternatively, enter your API credentials manually if you have them.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    disabled={isTesting}
                    type="password"
                  />
                  {apiKey && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCopyApiKey}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="org-id">Organization ID</Label>
                <Input
                  id="org-id"
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  placeholder="Enter your organization ID"
                  disabled={isTesting}
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={handleTestApiKey}
                disabled={isTesting || !apiKey.trim() || !organizationId.trim()}
                variant="outline"
              >
                {isTesting ? 'Testing...' : 'Test Credentials'}
              </Button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {message && (
          <Alert className={status === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            {getStatusIcon()}
            <AlertDescription className={status === 'error' ? 'text-red-700' : 'text-green-700'}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Test Results */}
        {testResult && (
          <Alert className={testResult.status === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className={testResult.status === 'error' ? 'text-red-700' : 'text-green-700'}>
              <div className="space-y-1">
                <p className="font-medium">API Test Result:</p>
                <p className="text-sm">{testResult.message}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Next Steps */}
        {status === 'success' && (
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <div className="space-y-2">
                <p className="font-medium">Setup Complete!</p>
                <p className="text-sm">
                  Your Sensay credentials have been configured successfully. You can now access all Sensay features.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Environment Variable Setup */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Environment Variables</h4>
          <p className="text-xs text-muted-foreground">
            For production deployment, add these to your environment variables:
          </p>
          <div className="bg-muted p-2 rounded text-xs font-mono space-y-1">
            <div>VITE_SENSAY_API_KEY=your_api_key_here</div>
            <div>VITE_SENSAY_ORG_ID=your_organization_id_here</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
