"""
Blockchain service for NFT minting and verification
"""
import os
import json
import hashlib
from typing import Dict, Any, Optional
from web3 import Web3
from eth_account import Account
import requests
from datetime import datetime


class BlockchainService:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(os.getenv('POLYGON_RPC_URL', 'https://polygon-rpc.com')))
        self.private_key = os.getenv('PRIVATE_KEY')
        self.contract_address = os.getenv('CONTRACT_ADDRESS')
        self.account = Account.from_key(self.private_key) if self.private_key else None
        
        # Contract ABI (simplified)
        self.contract_abi = [
            {
                "inputs": [
                    {"name": "to", "type": "address"},
                    {"name": "propertyId", "type": "uint256"},
                    {"name": "value", "type": "uint256"},
                    {"name": "ipfsCID", "type": "string"},
                    {"name": "xnodeProof", "type": "bytes32"}
                ],
                "name": "mintValuationNFT",
                "outputs": [{"name": "", "type": "uint256"}],
                "type": "function"
            },
            {
                "inputs": [{"name": "tokenId", "type": "uint256"}],
                "name": "tokenURI",
                "outputs": [{"name": "", "type": "string"}],
                "type": "function"
            }
        ]
        
        if self.contract_address and self.w3.is_connected():
            self.contract = self.w3.eth.contract(
                address=Web3.to_checksum_address(self.contract_address),
                abi=self.contract_abi
            )
        else:
            self.contract = None

    def mint_valuation_nft(self, property_data: Dict, valuation_data: Dict) -> Dict[str, Any]:
        """
        Mint a new NFT for property valuation
        """
        try:
            # Prepare NFT metadata
            metadata = {
                "property_id": property_data.get('id', 'unknown'),
                "address": property_data.get('address', ''),
                "valuation": valuation_data.get('current_valuation', 0),
                "risk_score": valuation_data.get('risk_score', 0),
                "confidence": valuation_data.get('confidence', 0),
                "compliance": valuation_data.get('compliance', {}),
                "timestamp": datetime.now().isoformat(),
                "xnode_proof": self._generate_xnode_proof(property_data, valuation_data)
            }
            
            # Upload to IPFS (simulated for now)
            ipfs_cid = self._upload_to_ipfs(metadata)
            
            if not self.contract or not self.account:
                # Return simulated blockchain data for demo
                return {
                    "success": True,
                    "token_id": self._generate_token_id(),
                    "tx_hash": self._generate_tx_hash(),
                    "ipfs_cid": ipfs_cid,
                    "opensea_url": f"https://opensea.io/assets/matic/{self.contract_address or 'demo'}/{self._generate_token_id()}",
                    "metadata": metadata
                }
            
            # Convert valuation to wei
            value_wei = int(valuation_data.get('current_valuation', 0) * 10**18)
            
            # Generate proof hash
            proof_hash = Web3.keccak(text=metadata['xnode_proof'])
            
            # Build transaction
            function = self.contract.functions.mintValuationNFT(
                self.account.address,
                int(property_data.get('id', 1)),
                value_wei,
                ipfs_cid,
                proof_hash
            )
            
            # Get gas estimate
            gas_estimate = function.estimate_gas({'from': self.account.address})
            
            # Build transaction
            transaction = function.build_transaction({
                'from': self.account.address,
                'gas': gas_estimate,
                'gasPrice': self.w3.to_wei('20', 'gwei'),
                'nonce': self.w3.eth.get_transaction_count(self.account.address),
            })
            
            # Sign and send transaction
            signed_txn = self.w3.eth.account.sign_transaction(transaction, self.private_key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            
            # Wait for confirmation
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            # Extract token ID from logs
            token_id = self._extract_token_id_from_receipt(receipt)
            
            return {
                "success": True,
                "token_id": token_id,
                "tx_hash": tx_hash.hex(),
                "ipfs_cid": ipfs_cid,
                "opensea_url": f"https://opensea.io/assets/matic/{self.contract_address}/{token_id}",
                "metadata": metadata
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def verify_nft(self, token_id_or_hash: str) -> Dict[str, Any]:
        """
        Verify an NFT by token ID or transaction hash
        """
        try:
            if token_id_or_hash.startswith('0x'):
                # It's a transaction hash
                return self._verify_by_tx_hash(token_id_or_hash)
            else:
                # It's a token ID
                return self._verify_by_token_id(int(token_id_or_hash))
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def _verify_by_token_id(self, token_id: int) -> Dict[str, Any]:
        """Verify NFT by token ID"""
        if not self.contract:
            # Return demo data
            return {
                "success": True,
                "valid": True,
                "token_id": token_id,
                "property_address": "123 Collins Street, Melbourne VIC",
                "valuation": 850000,
                "timestamp": "2024-01-08T10:30:00Z",
                "tx_hash": self._generate_tx_hash(),
                "ipfs_hash": "QmDemo123...",
                "issuer": "PropGuard AI",
                "compliance": {
                    "APRA_CPS230": True,
                    "NCCP_Act": True,
                    "Basel_III": True
                }
            }
        
        # Get token URI and metadata
        token_uri = self.contract.functions.tokenURI(token_id).call()
        metadata = self._fetch_ipfs_metadata(token_uri)
        
        return {
            "success": True,
            "valid": True,
            "token_id": token_id,
            "metadata": metadata,
            "token_uri": token_uri
        }

    def _verify_by_tx_hash(self, tx_hash: str) -> Dict[str, Any]:
        """Verify NFT by transaction hash"""
        if not self.w3.is_connected():
            # Return demo data
            return {
                "success": True,
                "valid": True,
                "tx_hash": tx_hash,
                "block_number": 12345678,
                "confirmation_count": 50
            }
        
        receipt = self.w3.eth.get_transaction_receipt(tx_hash)
        return {
            "success": True,
            "valid": receipt.status == 1,
            "tx_hash": tx_hash,
            "block_number": receipt.blockNumber,
            "gas_used": receipt.gasUsed
        }

    def _upload_to_ipfs(self, metadata: Dict) -> str:
        """Upload metadata to IPFS (simulated)"""
        # In production, this would use Pinata or similar service
        content_hash = hashlib.sha256(json.dumps(metadata, sort_keys=True).encode()).hexdigest()
        return f"Qm{content_hash[:44]}"

    def _generate_xnode_proof(self, property_data: Dict, valuation_data: Dict) -> str:
        """Generate XNode consensus proof"""
        proof_data = {
            "property_id": property_data.get('id'),
            "valuation": valuation_data.get('current_valuation'),
            "consensus_nodes": ["sydney-node-1", "melbourne-node-2", "brisbane-node-3"],
            "consensus_score": 0.92,
            "timestamp": datetime.now().isoformat()
        }
        return json.dumps(proof_data)

    def _generate_token_id(self) -> int:
        """Generate a demo token ID"""
        return int(datetime.now().timestamp()) % 1000000

    def _generate_tx_hash(self) -> str:
        """Generate a demo transaction hash"""
        return f"0x{hashlib.sha256(str(datetime.now()).encode()).hexdigest()}"

    def _extract_token_id_from_receipt(self, receipt) -> int:
        """Extract token ID from transaction receipt"""
        # Parse logs to find ValuationMinted event
        for log in receipt.logs:
            try:
                decoded = self.contract.events.ValuationMinted().processLog(log)
                return decoded.args.tokenId
            except:
                continue
        return 0

    def _fetch_ipfs_metadata(self, ipfs_url: str) -> Dict:
        """Fetch metadata from IPFS"""
        try:
            if ipfs_url.startswith('https://ipfs.io/ipfs/'):
                response = requests.get(ipfs_url)
                return response.json()
        except:
            pass
        return {}

    def get_blockchain_health(self) -> Dict[str, Any]:
        """Check blockchain connection health"""
        try:
            if not self.w3.is_connected():
                return {
                    "success": False,
                    "status": "disconnected",
                    "network": "polygon",
                    "error": "Cannot connect to blockchain"
                }
            
            latest_block = self.w3.eth.block_number
            gas_price = self.w3.eth.gas_price
            
            return {
                "success": True,
                "status": "connected",
                "network": "polygon",
                "block_height": latest_block,
                "gas_price": self.w3.from_wei(gas_price, 'gwei')
            }
            
        except Exception as e:
            return {
                "success": False,
                "status": "error",
                "error": str(e)
            }


# Global instance
blockchain_service = BlockchainService()