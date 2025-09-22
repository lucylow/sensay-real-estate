import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Link2, 
  Shield, 
  FileText, 
  Clock,
  CheckCircle,
  ExternalLink,
  Copy,
  Eye
} from 'lucide-react';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';
import { NFTMintDialog } from '@/components/blockchain/NFTMintDialog';
import { PropertyAnalysis } from '@/types/property';

interface BlockchainDashboardProps {
  analysis?: PropertyAnalysis | null;
}

export const BlockchainDashboard: React.FC<BlockchainDashboardProps> = ({ analysis }) => {
  const data = COLLINS_STREET_MOCK_DATA;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateHash = (hash: string, length = 8) => {
    return `${hash.slice(0, length)}...${hash.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* NFT Collection Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-purple-500" />
            Property NFT Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.blockchain.nft_collection.map((nft, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{nft.property}</div>
                    <div className="text-sm text-muted-foreground">Token ID: {nft.id}</div>
                  </div>
                  <div className="flex gap-2">
                    {nft.verified && (
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                    {nft.apra_compliant && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        APRA
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Minted</div>
                    <div className="font-medium">{formatDate(nft.minted_date)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Block #</div>
                    <div className="font-medium">{nft.block_number.toLocaleString()}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Transaction Hash</div>
                    <div className="font-mono text-xs flex items-center gap-2">
                      {truncateHash(nft.transaction_hash, 12)}
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Owner</div>
                    <div className="font-mono text-xs flex items-center gap-2">
                      {truncateHash(nft.owner, 12)}
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Polygonscan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mint New Certificate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            Mint Valuation Certificate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium mb-2">Property Details</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="font-medium">123 Collins Street, Melbourne VIC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valuation:</span>
                    <span className="font-medium">
                      {analysis?.current_valuation 
                        ? `$${(analysis.current_valuation).toLocaleString('en-AU')} AUD`
                        : '$8,500,000 AUD'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Score:</span>
                    <span className="font-medium">66/100</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Blockchain Details</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Network:</span>
                    <span className="font-medium">Polygon</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gas Fee:</span>
                    <span className="font-medium">~$0.02 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confirmation:</span>
                    <span className="font-medium">~2 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>APRA Compliant:</span>
                    <Badge variant="default">Yes</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <NFTMintDialog 
                trigger={
                  <Button className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    Mint NFT Certificate
                  </Button>
                }
              />
              <Button variant="outline">
                Preview Certificate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Blockchain Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.blockchain.audit_trail.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">
                  {event.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{event.event}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(event.timestamp)}
                  </div>
                </div>
                <Badge variant={event.status === 'success' ? 'default' : 'secondary'}>
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              NFT Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter Token ID or Transaction Hash
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PG-V-123COLLINS-20240108"
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <Button>Verify</Button>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Verification Results</span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div>✅ Valuation Hash: Verified</div>
                  <div>✅ APRA Compliance: Verified</div>
                  <div>✅ Data Provenance: 98% match</div>
                  <div>✅ Fraud Detection: No anomalies</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              Certificate Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Export blockchain certificates for compliance and reporting
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download PDF Certificate
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export JSON Metadata
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on OpenSea
                </Button>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
                <div className="font-medium">Smart Contract Details</div>
                <div className="mt-1 space-y-1">
                  <div>Contract: 0x7b2F...4a8C</div>
                  <div>Standard: ERC-721</div>
                  <div>Network: Polygon Mainnet</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};