import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, Zap, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NFTMintDialogProps {
  trigger: React.ReactNode;
}

export const NFTMintDialog: React.FC<NFTMintDialogProps> = ({ trigger }) => {
  const [mintingStage, setMintingStage] = useState<'idle' | 'preparing' | 'submitting' | 'confirming' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const mockMintData = {
    propertyAddress: '123 Collins Street, Melbourne VIC',
    valuation: 850000,
    riskScore: 15,
    tokenId: '1248',
    txHash: '0x9b2fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead79fade1c0d57a7b2',
    ipfsHash: 'QmX4j8K3mPQr2N5VZxH7mK9fE3qR8sT2wY6uI9oP1bA7dC',
    gasUsed: '0.0023',
    blockNumber: '52847393'
  };

  const mintingStages = [
    { id: 'preparing', label: 'Preparing metadata', duration: 1000 },
    { id: 'submitting', label: 'Submitting to Polygon', duration: 2000 },
    { id: 'confirming', label: 'Confirming transaction', duration: 1500 },
    { id: 'success', label: 'NFT minted successfully', duration: 0 }
  ];

  const handleMintNFT = async () => {
    setMintingStage('preparing');
    setProgress(0);

    // Simulate the minting process with realistic timing
    for (let i = 0; i < mintingStages.length - 1; i++) {
      const stage = mintingStages[i];
      setMintingStage(stage.id as any);
      
      // Animate progress during each stage
      const progressIncrement = 100 / (mintingStages.length - 1);
      const startProgress = i * progressIncrement;
      const endProgress = (i + 1) * progressIncrement;
      
      for (let p = startProgress; p <= endProgress; p += 2) {
        setProgress(p);
        await new Promise(resolve => setTimeout(resolve, stage.duration / ((endProgress - startProgress) / 2)));
      }
    }

    setMintingStage('success');
    setProgress(100);

    toast({
      title: "NFT Minted Successfully!",
      description: `Certificate #${mockMintData.tokenId} has been minted on Polygon network.`,
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const resetDialog = () => {
    setMintingStage('idle');
    setProgress(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mint Valuation Certificate NFT</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Valuation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Address:</span>
                  <p className="font-medium">{mockMintData.propertyAddress}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Valuation:</span>
                  <p className="font-medium">${mockMintData.valuation.toLocaleString()} AUD</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Risk Score:</span>
                  <p className="font-medium">{mockMintData.riskScore}/100</p>
                </div>
                <div>
                  <span className="text-muted-foreground">APRA Compliant:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Minting Process */}
          {mintingStage === 'idle' && (
            <div className="text-center space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-2">Ready to Mint</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This will create an immutable certificate on the Polygon blockchain
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <span>⛽ Gas: ~0.002 MATIC</span>
                  <span>🔗 Network: Polygon</span>
                  <span>📄 IPFS Storage</span>
                </div>
              </div>
              <Button onClick={handleMintNFT} className="w-full" size="lg">
                Mint NFT Certificate
              </Button>
            </div>
          )}

          {/* Progress Animation */}
          {mintingStage !== 'idle' && mintingStage !== 'success' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">
                  {mintingStages.find(s => s.id === mintingStage)?.label}
                </h3>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
              </div>
              
              <div className="space-y-2">
                {mintingStages.map((stage, index) => {
                  const isActive = stage.id === mintingStage;
                  const isCompleted = mintingStages.findIndex(s => s.id === mintingStage) > index;
                  
                  return (
                    <div key={stage.id} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : isActive ? 'bg-primary animate-pulse' : 'bg-muted'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : isActive ? (
                          <Clock className="w-4 h-4 text-white" />
                        ) : (
                          <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                        )}
                      </div>
                      <span className={`text-sm ${isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Success State */}
          {mintingStage === 'success' && (
            <div className="space-y-4">
              <div className="text-center bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  NFT Minted Successfully!
                </h3>
                <p className="text-sm text-green-700">
                  Your property valuation certificate has been immortalized on the blockchain
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certificate Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Token ID:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">#{mockMintData.tokenId}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(mockMintData.tokenId, 'Token ID')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Transaction Hash:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{mockMintData.txHash.slice(0, 16)}...</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(mockMintData.txHash, 'Transaction Hash')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">IPFS Hash:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{mockMintData.ipfsHash.slice(0, 16)}...</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(mockMintData.ipfsHash, 'IPFS Hash')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gas Used:</span>
                      <span className="font-mono text-sm">{mockMintData.gasUsed} MATIC</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Block Number:</span>
                      <span className="font-mono text-sm">#{mockMintData.blockNumber}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(`https://opensea.io/assets/matic/0x.../` + mockMintData.tokenId, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on OpenSea
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.open(`https://polygonscan.com/tx/` + mockMintData.txHash, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on PolygonScan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setIsOpen(false)} 
                className="w-full"
                variant="secondary"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};