// Blockchain Integration Service for PropGuard AI
// Handles smart contract interactions for property titles and mortgages

import { ethers } from 'ethers';

// Contract ABIs (Application Binary Interfaces)
export const PROPERTY_TITLE_NFT_ABI = [
  "function mintTitle(address to, uint256 tokenId, tuple(string location, uint256 areaSqFt, uint256 valuationUSD, string legalDescription, bool hasMortgage) details) external",
  "function updateMortgageStatus(uint256 tokenId, bool hasMortgage) external",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function transferFrom(address from, address to, uint256 tokenId) external",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export const MORTGAGE_MANAGER_ABI = [
  "constructor(address _lender, address _borrower, address _propertyToken, uint256 _tokenId, uint256 _principal, uint256 _interestRate, uint256 _termMonths)",
  "function activateMortgage() external",
  "function payMonthly(uint256 monthNum) external payable",
  "function calcMonthlyPayment() external view returns (uint256)",
  "function getMortgageStatus() external view returns (uint8)",
  "function getPaymentHistory() external view returns (tuple(uint256 monthNum, uint256 amount, uint256 timestamp)[])",
  "event Payment(address indexed payer, uint256 monthNum, uint256 amount, uint256 timestamp)",
  "event MortgageActivated(address indexed borrower, uint256 principal)",
  "event MortgagePaidOff(address indexed borrower, uint256 totalPaid)"
];

export const PROP_GUARD_CLOSING_ABI = [
  "function startMortgage(address borrower, uint256 tokenId, uint256 principal, uint256 interestRate, uint256 termMonths) external returns (address)",
  "function releaseTitle(uint256 tokenId, address payable borrower) external",
  "function getActiveMortgages() external view returns (address[])",
  "event MortgageCreated(address indexed borrower, address indexed mortgageContract, uint256 tokenId)",
  "event TitleReleased(address indexed borrower, uint256 tokenId)"
];

// Contract addresses (these would be deployed addresses in production)
export const CONTRACT_ADDRESSES = {
  PROPERTY_TITLE_NFT: process.env.REACT_APP_PROPERTY_TITLE_NFT_ADDRESS || "0xPropertyNFT1234567890123456789012345678901234567890",
  MORTGAGE_MANAGER_FACTORY: process.env.REACT_APP_MORTGAGE_MANAGER_FACTORY_ADDRESS || "0xMortgageFactory1234567890123456789012345678901234567890",
  PROP_GUARD_CLOSING: process.env.REACT_APP_PROP_GUARD_CLOSING_ADDRESS || "0xPropGuardClosing1234567890123456789012345678901234567890"
};

// Types for blockchain data
export interface PropertyDetails {
  location: string;
  areaSqFt: number;
  valuationUSD: number;
  legalDescription: string;
  hasMortgage: boolean;
}

export interface MortgageDetails {
  lender: string;
  borrower: string;
  propertyTokenId: string;
  principal: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  startTimestamp: number;
}

export interface PaymentRecord {
  monthNum: number;
  amount: number;
  timestamp: number;
}

export class BlockchainService {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private propertyTitleContract: ethers.Contract | null = null;
  private propGuardClosingContract: ethers.Contract | null = null;

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      
      // Initialize contracts
      this.propertyTitleContract = new ethers.Contract(
        CONTRACT_ADDRESSES.PROPERTY_TITLE_NFT,
        PROPERTY_TITLE_NFT_ABI,
        this.signer
      );

      this.propGuardClosingContract = new ethers.Contract(
        CONTRACT_ADDRESSES.PROP_GUARD_CLOSING,
        PROP_GUARD_CLOSING_ABI,
        this.signer
      );
    }
  }

  // Wallet connection
  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not detected');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      await this.initializeProvider();
      return accounts[0];
    } catch (error) {
      throw new Error('Failed to connect wallet');
    }
  }

  async getWalletAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return await this.signer.getAddress();
  }

  // Property Title NFT functions
  async mintPropertyTitle(
    to: string,
    tokenId: number,
    details: PropertyDetails
  ): Promise<string> {
    if (!this.propertyTitleContract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.propertyTitleContract.mintTitle(
        to,
        tokenId,
        [
          details.location,
          details.areaSqFt,
          details.valuationUSD,
          details.legalDescription,
          details.hasMortgage
        ]
      );

      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      throw new Error('Failed to mint property title');
    }
  }

  async getPropertyOwner(tokenId: number): Promise<string> {
    if (!this.propertyTitleContract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.propertyTitleContract.ownerOf(tokenId);
    } catch (error) {
      throw new Error('Failed to get property owner');
    }
  }

  async updateMortgageStatus(tokenId: number, hasMortgage: boolean): Promise<string> {
    if (!this.propertyTitleContract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.propertyTitleContract.updateMortgageStatus(tokenId, hasMortgage);
      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      throw new Error('Failed to update mortgage status');
    }
  }

  async getTotalProperties(): Promise<number> {
    if (!this.propertyTitleContract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.propertyTitleContract.totalSupply();
    } catch (error) {
      throw new Error('Failed to get total properties');
    }
  }

  // Mortgage functions
  async createMortgage(
    borrower: string,
    tokenId: number,
    principal: number,
    interestRate: number,
    termMonths: number
  ): Promise<string> {
    if (!this.propGuardClosingContract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.propGuardClosingContract.startMortgage(
        borrower,
        tokenId,
        ethers.utils.parseEther(principal.toString()),
        Math.floor(interestRate * 100), // Convert to basis points
        termMonths
      );

      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      throw new Error('Failed to create mortgage');
    }
  }

  async makeMortgagePayment(
    mortgageContractAddress: string,
    monthNum: number,
    amount: number
  ): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const mortgageContract = new ethers.Contract(
        mortgageContractAddress,
        MORTGAGE_MANAGER_ABI,
        this.signer
      );

      const tx = await mortgageContract.payMonthly(monthNum, {
        value: ethers.utils.parseEther(amount.toString())
      });

      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      throw new Error('Failed to make mortgage payment');
    }
  }

  async getMortgageStatus(mortgageContractAddress: string): Promise<number> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const mortgageContract = new ethers.Contract(
        mortgageContractAddress,
        MORTGAGE_MANAGER_ABI,
        this.signer
      );

      return await mortgageContract.getMortgageStatus();
    } catch (error) {
      throw new Error('Failed to get mortgage status');
    }
  }

  async getPaymentHistory(mortgageContractAddress: string): Promise<PaymentRecord[]> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const mortgageContract = new ethers.Contract(
        mortgageContractAddress,
        MORTGAGE_MANAGER_ABI,
        this.signer
      );

      return await mortgageContract.getPaymentHistory();
    } catch (error) {
      throw new Error('Failed to get payment history');
    }
  }

  async releasePropertyTitle(tokenId: number, borrower: string): Promise<string> {
    if (!this.propGuardClosingContract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.propGuardClosingContract.releaseTitle(tokenId, borrower);
      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      throw new Error('Failed to release property title');
    }
  }

  // Utility functions
  async getNetworkInfo(): Promise<{ chainId: number; name: string }> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      const network = await this.provider.getNetwork();
      return {
        chainId: network.chainId,
        name: network.name
      };
    } catch (error) {
      throw new Error('Failed to get network info');
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      const balance = await this.provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      throw new Error('Failed to get balance');
    }
  }

  // Event listeners
  async listenToPropertyTransfers(callback: (from: string, to: string, tokenId: number) => void) {
    if (!this.propertyTitleContract) {
      throw new Error('Contract not initialized');
    }

    this.propertyTitleContract.on('Transfer', (from, to, tokenId) => {
      callback(from, to, tokenId.toNumber());
    });
  }

  async listenToMortgagePayments(
    mortgageContractAddress: string,
    callback: (payer: string, monthNum: number, amount: number, timestamp: number) => void
  ) {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const mortgageContract = new ethers.Contract(
      mortgageContractAddress,
      MORTGAGE_MANAGER_ABI,
      this.signer
    );

    mortgageContract.on('Payment', (payer, monthNum, amount, timestamp) => {
      callback(payer, monthNum.toNumber(), parseFloat(ethers.utils.formatEther(amount)), timestamp.toNumber());
    });
  }

  // Cleanup
  removeAllListeners() {
    if (this.propertyTitleContract) {
      this.propertyTitleContract.removeAllListeners();
    }
  }
}

// Global instance
export const blockchainService = new BlockchainService();

// Helper functions for PropGuard AI integration
export const integrateWithPropGuardAI = {
  // Get property risk data from PropGuard AI and use it in smart contracts
  async createRiskAdjustedMortgage(
    propertyAddress: string,
    borrowerAddress: string,
    baseInterestRate: number
  ): Promise<{ adjustedRate: number; riskScore: number }> {
    // This would integrate with PropGuard AI's risk assessment
    // For now, return mock data
    const riskScore = Math.random() * 100; // 0-100 risk score
    const riskAdjustment = (riskScore - 50) * 0.01; // Adjust rate based on risk
    const adjustedRate = baseInterestRate + riskAdjustment;

    return {
      adjustedRate: Math.max(adjustedRate, 0.01), // Minimum 1%
      riskScore
    };
  },

  // Update property valuation based on PropGuard AI market analysis
  async updatePropertyValuation(tokenId: number): Promise<number> {
    // This would integrate with PropGuard AI's market analysis
    // For now, return mock data
    const baseValue = 500000;
    const marketAdjustment = (Math.random() - 0.5) * 0.2; // ±10% adjustment
    return Math.floor(baseValue * (1 + marketAdjustment));
  },

  // Get climate risk data for property
  async getClimateRiskData(propertyAddress: string): Promise<{
    floodRisk: number;
    fireRisk: number;
    stormRisk: number;
  }> {
    // This would integrate with PropGuard AI's climate risk assessment
    return {
      floodRisk: Math.random() * 100,
      fireRisk: Math.random() * 100,
      stormRisk: Math.random() * 100
    };
  }
};

export default blockchainService;
export default blockchainService;
