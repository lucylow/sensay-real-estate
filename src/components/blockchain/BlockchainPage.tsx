import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NFTMintDialog } from './NFTMintDialog';

export const BlockchainPage: React.FC = () => {
  const [verificationInput, setVerificationInput] = useState('');

  const mockNFTs = [
    {
      id: '1247',
      address: '123 Collins Street, Melbourne VIC',
      valuation: 850000,
      mintedAt: '2024-01-08T10:30:00Z',
      txHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead79fade1c0d57a7a',
      owner: 'Bank of Melbourne'
    },
    {
      id: '1246', 
      address: '456 George Street, Sydney NSW',
      valuation: 1200000,
      mintedAt: '2024-01-08T09:15:00Z',
      txHash: '0x8a1fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead79fade1c0d57a8b',
      owner: 'Commonwealth Bank'
    }
  ];


  return (
    <div className="space-y-6">
      <Tabs defaultValue="collection" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="collection">NFT Collection</TabsTrigger>
          <TabsTrigger value="mint">Mint Certificate</TabsTrigger>
          <TabsTrigger value="verify">Verify NFT</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="collection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PropertyValuation NFT Collection</CardTitle>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <span>Total Minted: 1,247</span>
                <span>Total Volume: $850M AUD</span>
                <span>Network: Polygon</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockNFTs.map((nft) => (
                  <Card key={nft.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">Certificate #{nft.id}</h4>
                        <Badge variant="secondary">Verified</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{nft.address}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Valuation:</span>
                          <span className="font-medium">${nft.valuation.toLocaleString()} AUD</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Owner:</span>
                          <span>{nft.owner}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Minted:</span>
                          <span>{new Date(nft.mintedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => window.open(`https://opensea.io/assets/matic/0x.../${nft.id}`, '_blank')}
                      >
                        View on OpenSea
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mint" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mint Valuation Certificate NFT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Ready to Mint</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Property: 123 Collins Street, Melbourne</div>
                  <div>Valuation: $850,000 AUD</div>
                  <div>Risk Score: 15/100</div>
                  <div>APRA Compliant: ✓ Yes</div>
                </div>
              </div>
              
              <NFTMintDialog 
                trigger={
                  <Button className="w-full">
                    Mint Valuation NFT on Polygon
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verify Valuation NFT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter NFT ID or Transaction Hash"
                  value={verificationInput}
                  onChange={(e) => setVerificationInput(e.target.value)}
                />
                <Button>Verify</Button>
              </div>
              
              {verificationInput && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-800">Verification Successful</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Property ID: {verificationInput}</div>
                    <div>Valuation: $850,000</div>
                    <div>Appraiser: PropGuard AI</div>
                    <div>IPFS: QmDemo123...</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Valuation Assessment</h4>
                  <p className="text-sm text-muted-foreground">AI-powered distributed consensus across 3 XNodes</p>
                  <p className="text-xs text-muted-foreground">Block #52847392 • 2 hours ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">APRA Compliance Check</h4>
                  <p className="text-sm text-muted-foreground">CPS 230 compliance verified and certified</p>
                  <p className="text-xs text-muted-foreground">Block #52847391 • 2 hours ago</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">NFT Minting</h4>
                  <p className="text-sm text-muted-foreground">Certificate minted on Polygon network</p>
                  <p className="text-xs text-muted-foreground">Block #52847390 • 2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};