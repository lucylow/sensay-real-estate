'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Upload, Shield, ExternalLink } from 'lucide-react';

interface Report {
  valuation: number;
  risk: any;
  compliance: any;
  address: string;
  property?: {
    features: any;
  };
}

export default function PropertyNFTMinter({ report }: { report: Report }) {
  const [status, setStatus] = useState<'idle' | 'minting' | 'minted' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');
  const [cid, setCid] = useState('');
  const [error, setError] = useState('');
  
  const simulateMint = async () => {
    setStatus('minting');
    setError('');
    
    // Simulate blockchain transaction
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          setTxHash('0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
          setCid('Qm' + [...Array(46)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
          setStatus('minted');
          resolve();
        } else {
          setError('Transaction failed: Insufficient gas fee');
          setStatus('error');
          reject();
        }
      }, 3000);
    });
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
      {/* Valuation Summary Card */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 rounded-lg p-2">
            <Coins className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-purple-800">Valuation Certificate</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(report.valuation)}</p>
              <p className="text-sm text-gray-600">{report.address}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-100">
            <div className="text-center">
              <p className="text-xs text-gray-500">Risk Level</p>
              <p className="font-medium text-sm">
                {report.risk && Object.values(report.risk).some((v: any) => v > 0.4) ? 'Medium' : 'Low'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Compliance</p>
              <p className={`font-medium text-sm ${
                report.compliance.status === 'APPROVED' ? 'text-green-600' : 
                report.compliance.status === 'REVIEW' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {report.compliance.status}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Timestamp</p>
              <p className="font-medium text-sm">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* NFT Features */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-700 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Blockchain Certification Features
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Immutable Record</span>
            </div>
            <p className="text-xs text-gray-600">Valuation data permanently stored on blockchain</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">IPFS Storage</span>
            </div>
            <p className="text-xs text-gray-600">Decentralized file storage with content addressing</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium">Data Provenance</span>
            </div>
            <p className="text-xs text-gray-600">Complete audit trail of data sources and methodology</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">APRA Compliance</span>
            </div>
            <p className="text-xs text-gray-600">Regulatory compliance verification included</p>
          </div>
        </div>
      </div>
      
      {/* Mint Button */}
      <button
        onClick={simulateMint}
        disabled={status === 'minting'}
        className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center transition-all ${
          status === 'minting' 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        }`}
      >
        {status === 'minting' ? (
          <>
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
            Minting NFT Certificate...
          </>
        ) : (
          <>
            <Coins className="w-5 h-5 mr-2" />
            Mint Valuation NFT
          </>
        )}
      </button>
      
      {/* Success State */}
      {status === 'minted' && (
        <motion.div 
          className="p-6 bg-green-50 rounded-xl border border-green-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-green-800">NFT Certificate Minted Successfully!</h4>
              <p className="text-sm text-green-600">Your valuation is now permanently recorded on blockchain</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Transaction Hash:</span>
              </div>
              <a 
                href={`https://polygonscan.com/tx/${txHash}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-mono text-sm"
              >
                {txHash.slice(0, 8)}...{txHash.slice(-6)}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">IPFS Content ID:</span>
              </div>
              <a 
                href={`https://ipfs.io/ipfs/${cid}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-mono text-sm"
              >
                {cid.slice(0, 8)}...{cid.slice(-6)}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
              <span className="text-sm text-gray-600">Network:</span>
              <span className="text-sm font-medium">Polygon Mainnet</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
              <span className="text-sm text-gray-600">Gas Fee:</span>
              <span className="text-sm font-medium">0.0023 MATIC (~$0.02)</span>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Error State */}
      {status === 'error' && (
        <motion.div 
          className="p-4 bg-red-50 rounded-lg border border-red-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xs">!</span>
            </div>
            Minting Failed
          </h4>
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-sm text-red-600 hover:text-red-700 underline"
          >
            Try again
          </button>
        </motion.div>
      )}
    </div>
  );
}