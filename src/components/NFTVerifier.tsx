'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, AlertTriangle, ExternalLink, Copy } from 'lucide-react';

interface VerificationResult {
  isValid: boolean;
  nftId: string;
  propertyAddress: string;
  valuation: number;
  timestamp: string;
  txHash: string;
  ipfsHash: string;
  issuer: string;
  compliance: string;
}

export default function NFTVerifier() {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  const verifyNFT = async () => {
    if (!searchInput.trim()) return;
    
    setIsLoading(true);
    setError('');
    setResult(null);
    
    // Simulate verification API call
    setTimeout(() => {
      if (searchInput.length > 10) {
        // Simulate successful verification
        setResult({
          isValid: true,
          nftId: searchInput,
          propertyAddress: '123 Collins Street, Melbourne VIC 3000',
          valuation: 1250000,
          timestamp: '2024-01-08 14:32:45 UTC',
          txHash: '0x742d35cc6669c4c0b9b7d1b99b7c8b1d4c8f9b8e7f6d5c4b3a2918171615141312',
          ipfsHash: 'QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB',
          issuer: 'PropGuard AI Certified Appraiser',
          compliance: 'APRA Level 3 Compliant'
        });
      } else {
        setError('Invalid NFT ID or transaction hash format');
      }
      setIsLoading(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          NFT Verification System
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Verify the authenticity and details of a property valuation NFT by entering the NFT ID or transaction hash.
        </p>
      </div>

      {/* Search Input */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter NFT ID or transaction hash (0x... or Qm...)"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={verifyNFT}
            disabled={isLoading || !searchInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSearchInput('0x742d35cc6669c4c0b9b7d1b99b7c8b1d4c8f9b8e7f6d5c4b3a2918171615141312')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
          >
            Try example TX
          </button>
          <button
            onClick={() => setSearchInput('QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
          >
            Try example IPFS
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div 
          className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">Verifying NFT on blockchain...</p>
          <p className="text-xs text-gray-500 mt-1">Checking Polygon network and IPFS</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div 
          className="p-4 bg-red-50 rounded-lg border border-red-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="font-medium text-red-800">Verification Failed</h4>
          </div>
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

      {/* Success State */}
      {result && (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Verification Status */}
          <div className={`p-4 rounded-lg border ${
            result.isValid 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-6 h-6 ${
                result.isValid ? 'text-green-600' : 'text-red-600'
              }`} />
              <div>
                <h4 className={`font-medium ${
                  result.isValid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.isValid ? 'Valid NFT Certificate' : 'Invalid or Tampered NFT'}
                </h4>
                <p className={`text-sm ${
                  result.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.isValid 
                    ? 'This valuation NFT is authentic and verified on blockchain'
                    : 'This NFT could not be verified or has been tampered with'
                  }
                </p>
              </div>
            </div>
          </div>

          {result.isValid && (
            <>
              {/* Property Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="font-medium text-gray-800 mb-4">Property Valuation Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Property Address</label>
                    <p className="font-medium text-gray-900">{result.propertyAddress}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Valuation Amount</label>
                    <p className="font-medium text-gray-900 text-lg">{formatCurrency(result.valuation)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Valuation Date</label>
                    <p className="font-medium text-gray-900">{result.timestamp}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Compliance Status</label>
                    <p className="font-medium text-green-600">{result.compliance}</p>
                  </div>
                </div>
              </div>

              {/* Blockchain Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="font-medium text-gray-800 mb-4">Blockchain Verification</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm text-gray-600">Transaction Hash</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-800">
                        {result.txHash.slice(0, 8)}...{result.txHash.slice(-6)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(result.txHash)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://polygonscan.com/tx/${result.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm text-gray-600">IPFS Content Hash</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-800">
                        {result.ipfsHash.slice(0, 8)}...{result.ipfsHash.slice(-6)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(result.ipfsHash)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://ipfs.io/ipfs/${result.ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Issuing Authority</span>
                    <span className="text-sm font-medium text-gray-800">{result.issuer}</span>
                  </div>
                </div>
              </div>

              {/* Audit Trail */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Audit Trail Verified</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Data integrity confirmed via blockchain hash
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    IPFS content accessibility verified
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Issuer credentials authenticated
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Regulatory compliance validated
                  </li>
                </ul>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}