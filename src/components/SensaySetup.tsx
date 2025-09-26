import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Key, CheckCircle, AlertCircle, ExternalLink, Copy, Globe } from 'lucide-react';
import { SensayAPI, SensayCredentials } from '@/services/api/sensay';
import { useTranslation } from '@/lib/i18n';
import { LanguageSelector } from '@/components/ui/language-selector';

interface SensaySetupProps {
  onCredentialsSet?: (credentials: SensayCredentials) => void;
  className?: string;
}

export const SensaySetup: React.FC<SensaySetupProps> = ({ 
  onCredentialsSet, 
  className = '' 
}) => {
  const { t } = useTranslation();
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
      setMessage(t('sensaySetup.errors.inviteCodeRequired'));
      setStatus('error');
      return;
    }

    setIsRedeeming(true);
    setStatus('redeeming');
    setMessage(t('sensaySetup.redeemingButton'));

    try {
      const api = new SensayAPI();
      const result = await api.redeemInviteCode(inviteCode);
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
      setMessage(`${t('sensaySetup.errors.redeemFailed')}: ${error.message}`);
      setStatus('error');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleTestApiKey = async () => {
    if (!apiKey.trim() || !organizationId.trim()) {
      setMessage(t('sensaySetup.errors.apiKeyRequired'));
      return;
    }

    setIsTesting(true);
    setMessage(t('sensaySetup.testingButton'));

    try {
      // Create a temporary SensayAPI instance with the provided credentials
      const credentials: SensayCredentials = { apiKey, organizationId };
      const testAPI = new SensayAPI(credentials);
      const result = await testAPI.healthCheck();
      
      setTestResult(result);
      setMessage(result.status === 'healthy' ? t('common.success') : t('sensaySetup.errors.testFailed'));
      setStatus(result.status === 'healthy' ? 'success' : 'error');
      
      if (result.status === 'healthy') {
        // Store credentials in localStorage
        localStorage.setItem('sensay_credentials', JSON.stringify(credentials));
        
        // Notify parent component
        if (onCredentialsSet) {
          onCredentialsSet(credentials);
        }
      }
    } catch (error) {
      setTestResult({ status: 'error', message: error.message });
      setMessage(`${t('sensaySetup.errors.testFailed')}: ${error.message}`);
      setStatus('error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setMessage(t('common.copied'));
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
          {t('sensaySetup.title')}
          <div className="ml-auto flex items-center gap-2">
            <LanguageSelector variant="ghost" size="sm" showLabel={false} />
            <Badge variant="outline" className="text-xs">
              {t('sensaySetup.hackathonBadge')}
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
              <p className="font-medium">{t('sensaySetup.welcomeTitle')}</p>
              <p className="text-sm">
                {t('sensaySetup.welcomeDescription')}
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto"
                onClick={() => window.open('https://docs.sensay.io', '_blank')}
              >
                {t('sensaySetup.viewDocumentation')}
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Step 1: Redeem Invite Code */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t('sensaySetup.step1Title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('sensaySetup.step1Description')}
            </p>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="invite-code">{t('sensaySetup.inviteCodeLabel')}</Label>
                <Input
                  id="invite-code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder={t('sensaySetup.inviteCodePlaceholder')}
                  disabled={isRedeeming}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleRedeemInvite}
                  disabled={isRedeeming || !inviteCode.trim()}
                >
                  {isRedeeming ? t('sensaySetup.redeemingButton') : t('sensaySetup.redeemButton')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Manual API Credentials Entry */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t('sensaySetup.step2Title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('sensaySetup.step2Description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">{t('sensaySetup.apiKeyLabel')}</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t('sensaySetup.apiKeyPlaceholder')}
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
                <Label htmlFor="org-id">{t('sensaySetup.orgIdLabel')}</Label>
                <Input
                  id="org-id"
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  placeholder={t('sensaySetup.orgIdPlaceholder')}
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
                {isTesting ? t('sensaySetup.testingButton') : t('sensaySetup.testCredentialsButton')}
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
                <p className="font-medium">{t('sensaySetup.setupCompleteTitle')}</p>
                <p className="text-sm">
                  {t('sensaySetup.setupCompleteDescription')}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Environment Variable Setup */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{t('sensaySetup.envVarTitle')}</h4>
          <p className="text-xs text-muted-foreground">
            {t('sensaySetup.envVarDescription')}
          </p>
          <div className="bg-muted p-2 rounded text-xs font-mono space-y-1">
            <div>{t('sensaySetup.envVarApiKey')}</div>
            <div>{t('sensaySetup.envVarOrgId')}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
