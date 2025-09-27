import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Home, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  FileText,
  Key,
  Wallet,
  Link,
  Database,
  Smartphone,
  Globe,
  Zap,
  Building,
  MapPin,
  Users,
  BarChart3,
  Settings,
  Play,
  ArrowRight,
  ExternalLink,
  Copy,
  Eye,
  Lock,
  Unlock
} from 'lucide-react';

interface PropertyNFT {
  tokenId: string;
  location: string;
  areaSqFt: number;
  valuationUSD: number;
  legalDescription: string;
  hasMortgage: boolean;
  currentOwner: string;
  metadataURI: string;
}

interface MortgageContract {
  contractAddress: string;
  lender: string;
  borrower: string;
  propertyTokenId: string;
  principal: number;
  monthlyPayment: number;
  totalMonths: number;
  monthsPaid: number;
  amountPaid: number;
  status: 'Pending' | 'Active' | 'PaidOff' | 'Defaulted';
  startDate: Date;
  dueDate: Date;
}

interface BlockchainIntegrationProps {
  className?: string;
}

export const BlockchainIntegration: React.FC<BlockchainIntegrationProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [properties, setProperties] = useState<PropertyNFT[]>([]);
  const [mortgages, setMortgages] = useState<MortgageContract[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setProperties([
      {
        tokenId: "1",
        location: "123 Collins Street, Melbourne VIC 3000",
        areaSqFt: 2040,
        valuationUSD: 850000,
        legalDescription: "Lot 1, Section 2, Plan of Subdivision PS123456",
        hasMortgage: true,
        currentOwner: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        metadataURI: "ipfs://QmProperty123"
      },
      {
        tokenId: "2", 
        location: "456 Bourke Street, Melbourne VIC 3000",
        areaSqFt: 1500,
        valuationUSD: 650000,
        legalDescription: "Lot 2, Section 2, Plan of Subdivision PS123456",
        hasMortgage: false,
        currentOwner: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        metadataURI: "ipfs://QmProperty456"
      }
    ]);

    setMortgages([
      {
        contractAddress: "0x1234567890123456789012345678901234567890",
        lender: "0xLenderAddress123456789012345678901234567890",
        borrower: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        propertyTokenId: "1",
        principal: 680000,
        monthlyPayment: 3200,
        totalMonths: 240,
        monthsPaid: 12,
        amountPaid: 38400,
        status: 'Active',
        startDate: new Date('2024-01-01'),
        dueDate: new Date('2024-12-01')
      }
    ]);
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Mock wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWalletAddress("0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6");
      setIsConnected(true);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mintPropertyNFT = async (propertyData: any) => {
    setIsLoading(true);
    try {
      // Mock NFT minting
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Property NFT minted:', propertyData);
    } catch (error) {
      console.error('NFT minting failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createMortgageContract = async (mortgageData: any) => {
    setIsLoading(true);
    try {
      // Mock mortgage contract creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Mortgage contract created:', mortgageData);
    } catch (error) {
      console.error('Mortgage creation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const makePayment = async (contractAddress: string, amount: number) => {
    setIsLoading(true);
    try {
      // Mock payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Payment made:', { contractAddress, amount });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-9 h-9 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PropGuard Blockchain Integration
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Blockchain-powered property titles, automated mortgages, and smart contracts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">ERC-721 Property Titles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Immutable blockchain property titles with metadata and ownership tracking
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Smart Mortgages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Automated payment processing and escrow management
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Automated Closing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Smart contract-powered property transfers and title releases
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            onClick={connectWallet}
            disabled={isLoading}
          >
            <Wallet className="w-5 h-5 mr-2" />
            {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-4 text-lg font-semibold border-2"
            onClick={() => setActiveTab('contracts')}
          >
            <FileText className="w-5 h-5 mr-2" />
            View Contracts
          </Button>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">Blockchain Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Immutable Property Records</CardTitle>
                  <p className="text-sm text-gray-600">Blockchain-verified property titles</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ERC-721 NFT property titles</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Metadata stored on IPFS</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Ownership history tracking</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Automated Payments</CardTitle>
                  <p className="text-sm text-gray-600">Smart contract mortgage management</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Automated monthly payments</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Escrow property management</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Automatic title release</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Risk Integration</CardTitle>
                  <p className="text-sm text-gray-600">PropGuard AI risk assessment</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Climate risk integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Market volatility tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Dynamic interest rates</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Global Compliance</CardTitle>
                  <p className="text-sm text-gray-600">APRA CPS 230 compliance</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Regulatory compliance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Audit trail maintenance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cross-border transactions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContracts = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Contracts</h2>
        <p className="text-gray-600">Deployed blockchain contracts for property management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Property Title NFT</CardTitle>
                <p className="text-sm text-gray-600">ERC-721 Contract</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Contract Address</span>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText('0xPropertyNFT123')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <code className="text-xs text-gray-600 break-all">0xPropertyNFT1234567890123456789012345678901234567890</code>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Properties Minted:</span>
                <span className="font-medium">{properties.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Mortgages:</span>
                <span className="font-medium">{properties.filter(p => p.hasMortgage).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Value:</span>
                <span className="font-medium">${properties.reduce((sum, p) => sum + p.valuationUSD, 0).toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Mortgage Manager</CardTitle>
                <p className="text-sm text-gray-600">Escrow Contract</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Contract Address</span>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText('0xMortgageManager123')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <code className="text-xs text-gray-600 break-all">0xMortgageManager1234567890123456789012345678901234567890</code>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Mortgages:</span>
                <span className="font-medium">{mortgages.filter(m => m.status === 'Active').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Principal:</span>
                <span className="font-medium">${mortgages.reduce((sum, m) => sum + m.principal, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paid Off:</span>
                <span className="font-medium">{mortgages.filter(m => m.status === 'PaidOff').length}</span>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Titles</h2>
          <p className="text-gray-600">Blockchain-verified property ownership</p>
        </div>
        <Button onClick={() => setActiveTab('mint')}>
          <Home className="w-4 h-4 mr-2" />
          Mint New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card key={property.tokenId} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Token #{property.tokenId}</CardTitle>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>
                </div>
                <Badge variant={property.hasMortgage ? "destructive" : "secondary"}>
                  {property.hasMortgage ? "Mortgaged" : "Free"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Area:</span>
                  <p className="font-medium">{property.areaSqFt.toLocaleString()} sq ft</p>
                </div>
                <div>
                  <span className="text-gray-600">Value:</span>
                  <p className="font-medium">${property.valuationUSD.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Owner</span>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(property.currentOwner)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code className="text-xs text-gray-600 break-all">{property.currentOwner}</code>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  OpenSea
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMortgages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Mortgages</h2>
          <p className="text-gray-600">Smart contract mortgage management</p>
        </div>
        <Button onClick={() => setActiveTab('create-mortgage')}>
          <DollarSign className="w-4 h-4 mr-2" />
          Create Mortgage
        </Button>
      </div>

      <div className="space-y-4">
        {mortgages.map((mortgage) => (
          <Card key={mortgage.contractAddress} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Property #{mortgage.propertyTokenId}</CardTitle>
                    <p className="text-sm text-gray-600">Contract: {mortgage.contractAddress.slice(0, 10)}...</p>
                  </div>
                </div>
                <Badge variant={mortgage.status === 'Active' ? "default" : "secondary"}>
                  {mortgage.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Principal:</span>
                  <p className="font-medium">${mortgage.principal.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Monthly:</span>
                  <p className="font-medium">${mortgage.monthlyPayment.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Progress:</span>
                  <p className="font-medium">{mortgage.monthsPaid}/{mortgage.totalMonths} months</p>
                </div>
                <div>
                  <span className="text-gray-600">Paid:</span>
                  <p className="font-medium">${mortgage.amountPaid.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Next Payment Due</span>
                  <span className="text-sm text-gray-600">{mortgage.dueDate.toLocaleDateString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(mortgage.monthsPaid / mortgage.totalMonths) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => makePayment(mortgage.contractAddress, mortgage.monthlyPayment)}
                  disabled={isLoading}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Make Payment
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMintProperty = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mint Property Title</h2>
        <p className="text-gray-600">Create a new ERC-721 property title NFT</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Property Location</Label>
              <Input id="location" placeholder="123 Collins Street, Melbourne VIC 3000" />
            </div>
            <div>
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input id="area" type="number" placeholder="2040" />
            </div>
            <div>
              <Label htmlFor="valuation">Valuation (USD)</Label>
              <Input id="valuation" type="number" placeholder="850000" />
            </div>
            <div>
              <Label htmlFor="owner">Owner Address</Label>
              <Input id="owner" placeholder="0x..." />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Legal Description</Label>
            <Textarea 
              id="description" 
              placeholder="Lot 1, Section 2, Plan of Subdivision PS123456"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="metadata">Metadata URI (IPFS)</Label>
            <Input id="metadata" placeholder="ipfs://QmProperty123" />
          </div>

          <Button 
            className="w-full" 
            onClick={() => mintPropertyNFT({})}
            disabled={isLoading}
          >
            <Home className="w-4 h-4 mr-2" />
            {isLoading ? 'Minting...' : 'Mint Property Title'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCreateMortgage = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Mortgage Contract</h2>
        <p className="text-gray-600">Deploy a new smart contract for property financing</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Mortgage Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="property-token">Property Token ID</Label>
              <Input id="property-token" placeholder="1" />
            </div>
            <div>
              <Label htmlFor="borrower">Borrower Address</Label>
              <Input id="borrower" placeholder="0x..." />
            </div>
            <div>
              <Label htmlFor="principal">Principal Amount (USD)</Label>
              <Input id="principal" type="number" placeholder="680000" />
            </div>
            <div>
              <Label htmlFor="monthly">Monthly Payment (USD)</Label>
              <Input id="monthly" type="number" placeholder="3200" />
            </div>
            <div>
              <Label htmlFor="term">Term (months)</Label>
              <Input id="term" type="number" placeholder="240" />
            </div>
            <div>
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input id="rate" type="number" placeholder="5.5" step="0.1" />
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => createMortgageContract({})}
            disabled={isLoading}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            {isLoading ? 'Creating...' : 'Deploy Mortgage Contract'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PropGuard Blockchain
                </span>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                <Link className="w-4 h-4 mr-1" />
                Ethereum
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {isConnected && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                </div>
              )}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="contracts">Contracts</TabsTrigger>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="mortgages">Mortgages</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'contracts' && renderContracts()}
        {activeTab === 'properties' && renderProperties()}
        {activeTab === 'mortgages' && renderMortgages()}
        {activeTab === 'mint' && renderMintProperty()}
        {activeTab === 'create-mortgage' && renderCreateMortgage()}
      </div>
    </div>
  );
};

export default BlockchainIntegration;
