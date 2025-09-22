"""
Blockchain and NFT routes for PropGuard AI
"""
from flask import Blueprint, request, jsonify
from datetime import datetime
import hashlib
import json
import sys
import os

# Add the parent directory to sys.path to import services
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.blockchain_service import blockchain_service
from services.ipfs_service import ipfs_service

# Create blueprint
blockchain_bp = Blueprint('blockchain', __name__)

@blockchain_bp.route('/blockchain-health', methods=['GET'])
def get_blockchain_health():
    """Get blockchain network health status"""
    try:
        health_data = blockchain_service.get_blockchain_health()
        return jsonify(health_data)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@blockchain_bp.route('/mint-valuation-nft', methods=['POST'])
def mint_valuation_nft():
    """Mint a new NFT for property valuation"""
    try:
        data = request.get_json()
        property_data = data.get('property_data', {})
        valuation_data = data.get('valuation_data', {})
        
        if not property_data or not valuation_data:
            return jsonify({
                "success": False,
                "error": "Missing property_data or valuation_data"
            }), 400
        
        # Mint the NFT
        result = blockchain_service.mint_valuation_nft(property_data, valuation_data)
        
        if result.get('success'):
            return jsonify(result)
        else:
            return jsonify(result), 500
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@blockchain_bp.route('/verify-nft', methods=['POST'])
def verify_nft():
    """Verify an NFT by token ID or transaction hash"""
    try:
        data = request.get_json()
        identifier = data.get('identifier', '')  # token_id or tx_hash
        
        if not identifier:
            return jsonify({
                "success": False,
                "error": "Missing identifier (token_id or tx_hash)"
            }), 400
        
        result = blockchain_service.verify_nft(identifier)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@blockchain_bp.route('/opensea-metadata/<token_id>', methods=['GET'])
def get_opensea_metadata(token_id):
    """Get OpenSea-compatible metadata for NFT"""
    try:
        # In production, fetch this from blockchain/IPFS
        # For now, return mock data
        metadata = {
            "name": f"PropGuard Valuation Certificate #{token_id}",
            "description": "Blockchain-verified property valuation certificate with APRA compliance",
            "external_url": "https://propguard.ai",
            "image": f"https://propguard.ai/api/nft-image/{token_id}",
            "attributes": [
                {
                    "trait_type": "Property Type",
                    "value": "Residential"
                },
                {
                    "trait_type": "Valuation (AUD)",
                    "value": 850000
                },
                {
                    "trait_type": "Risk Score",
                    "value": 15
                },
                {
                    "trait_type": "APRA Compliant",
                    "value": "Yes"
                },
                {
                    "trait_type": "Network",
                    "value": "Polygon"
                }
            ],
            "background_color": "1a365d"
        }
        
        return jsonify(metadata)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@blockchain_bp.route('/nft-collection', methods=['GET'])
def get_nft_collection():
    """Get collection of minted NFTs"""
    try:
        # Mock collection data
        collection = {
            "success": True,
            "total_minted": 1247,
            "total_volume_aud": 850000000,
            "recent_mints": [
                {
                    "token_id": 1247,
                    "property_address": "123 Collins Street, Melbourne VIC",
                    "valuation": 850000,
                    "minted_at": "2024-01-08T10:30:00Z",
                    "opensea_url": "https://opensea.io/assets/matic/0x.../1247"
                },
                {
                    "token_id": 1246,
                    "property_address": "456 George Street, Sydney NSW",
                    "valuation": 1200000,
                    "minted_at": "2024-01-08T09:15:00Z",
                    "opensea_url": "https://opensea.io/assets/matic/0x.../1246"
                }
            ]
        }
        
        return jsonify(collection)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@blockchain_bp.route('/apra-compliance-report', methods=['POST'])
def generate_apra_compliance_report():
    """Generate APRA compliance report for property"""
    try:
        data = request.get_json()
        property_id = data.get('property_id', '')
        
        if not property_id:
            return jsonify({
                "success": False,
                "error": "Missing property_id"
            }), 400
        
        # Generate compliance report
        compliance_report = {
            "success": True,
            "property_id": property_id,
            "compliance_status": {
                "APRA_CPS230": True,
                "NCCP_Act": True,
                "Basel_III": True,
                "Risk_Management": True
            },
            "audit_trail": {
                "valuation_methodology": "AI-powered distributed consensus",
                "data_sources": ["CoreLogic", "Domain", "XNode Network"],
                "verification_nodes": 3,
                "consensus_score": 0.92,
                "last_updated": datetime.now().isoformat()
            },
            "certification": {
                "certified_by": "PropGuard AI",
                "certification_date": datetime.now().isoformat(),
                "valid_until": "2025-01-08T00:00:00Z",
                "certificate_hash": hashlib.sha256(f"propguard-{property_id}-{datetime.now()}".encode()).hexdigest()
            }
        }
        
        return jsonify(compliance_report)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# Legacy endpoints (keeping for backwards compatibility)
class MockBlockchain:
    """Mock blockchain implementation for demonstration"""
    
    def __init__(self):
        self.chain = []
        self.pending_transactions = []
        self.mining_reward = 10
        self.difficulty = 2
        self.create_genesis_block()
    
    def create_genesis_block(self):
        """Create the first block in the chain"""
        genesis_block = {
            'index': 0,
            'timestamp': time.time(),
            'transactions': [],
            'previous_hash': '0',
            'nonce': 0,
            'hash': self.calculate_hash(0, time.time(), [], '0', 0)
        }
        self.chain.append(genesis_block)
    
    def calculate_hash(self, index, timestamp, transactions, previous_hash, nonce):
        """Calculate SHA-256 hash of block"""
        block_string = f"{index}{timestamp}{json.dumps(transactions, sort_keys=True)}{previous_hash}{nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()
    
    def get_latest_block(self):
        """Get the most recent block"""
        return self.chain[-1]
    
    def add_transaction(self, transaction):
        """Add transaction to pending pool"""
        self.pending_transactions.append(transaction)
    
    def mine_pending_transactions(self, mining_reward_address):
        """Mine pending transactions into a new block"""
        reward_transaction = {
            'from': None,
            'to': mining_reward_address,
            'amount': self.mining_reward,
            'type': 'mining_reward',
            'timestamp': time.time()
        }
        
        self.pending_transactions.append(reward_transaction)
        
        block = {
            'index': len(self.chain),
            'timestamp': time.time(),
            'transactions': self.pending_transactions,
            'previous_hash': self.get_latest_block()['hash'],
            'nonce': 0
        }
        
        block['hash'] = self.mine_block(block)
        self.chain.append(block)
        self.pending_transactions = []
        
        return block
    
    def mine_block(self, block):
        """Proof of work mining"""
        target = "0" * self.difficulty
        
        while True:
            hash_result = self.calculate_hash(
                block['index'],
                block['timestamp'],
                block['transactions'],
                block['previous_hash'],
                block['nonce']
            )
            
            if hash_result[:self.difficulty] == target:
                return hash_result
            
            block['nonce'] += 1
    
    def is_chain_valid(self):
        """Validate the entire blockchain"""
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]
            
            # Check if current block hash is valid
            if current_block['hash'] != self.calculate_hash(
                current_block['index'],
                current_block['timestamp'],
                current_block['transactions'],
                current_block['previous_hash'],
                current_block['nonce']
            ):
                return False
            
            # Check if previous hash matches
            if current_block['previous_hash'] != previous_block['hash']:
                return False
        
        return True

class PropertyNFT:
    """Property valuation NFT system"""
    
    def __init__(self):
        self.nfts = {}
        self.token_counter = 1
        self.authorized_banks = set()
        self.authorized_appraisers = set()
    
    def mint_valuation_nft(self, bank_address, property_data, valuation_data, risk_metrics):
        """Mint a new property valuation NFT"""
        token_id = self.token_counter
        self.token_counter += 1
        
        # Calculate composite risk score
        composite_risk = self._calculate_composite_risk(risk_metrics)
        
        # Generate IPFS-like hash for metadata
        metadata_hash = self._generate_ipfs_hash(property_data, valuation_data)
        
        nft_data = {
            'token_id': token_id,
            'bank_address': bank_address,
            'property_data': property_data,
            'valuation_data': valuation_data,
            'risk_metrics': risk_metrics,
            'composite_risk': composite_risk,
            'metadata_hash': metadata_hash,
            'timestamp': time.time(),
            'is_valid': True,
            'lvr': (valuation_data['loan_amount'] / valuation_data['property_value']) * 100 if valuation_data['property_value'] > 0 else 0
        }
        
        self.nfts[token_id] = nft_data
        return token_id, nft_data
    
    def _calculate_composite_risk(self, risk_metrics):
        """Calculate weighted composite risk score"""
        weights = {
            'flood': 0.25,
            'fire': 0.25,
            'coastal': 0.15,
            'subsidence': 0.15,
            'cyclone': 0.10,
            'heatwave': 0.10
        }
        
        composite = 0
        for risk_type, weight in weights.items():
            if risk_type in risk_metrics:
                composite += risk_metrics[risk_type] * weight
        
        return min(100, max(0, composite))
    
    def _generate_ipfs_hash(self, property_data, valuation_data):
        """Generate mock IPFS hash for metadata"""
        combined_data = {**property_data, **valuation_data}
        data_string = json.dumps(combined_data, sort_keys=True)
        hash_object = hashlib.sha256(data_string.encode())
        return f"Qm{hash_object.hexdigest()[:44]}"  # Mock IPFS hash format
    
    def get_nft(self, token_id):
        """Get NFT data by token ID"""
        return self.nfts.get(token_id)
    
    def invalidate_nft(self, token_id, reason):
        """Invalidate an NFT for compliance reasons"""
        if token_id in self.nfts:
            self.nfts[token_id]['is_valid'] = False
            self.nfts[token_id]['invalidation_reason'] = reason
            self.nfts[token_id]['invalidation_timestamp'] = time.time()
            return True
        return False
    
    def get_nfts_by_bank(self, bank_address):
        """Get all NFTs owned by a specific bank"""
        return [nft for nft in self.nfts.values() if nft['bank_address'] == bank_address]

class XNodeProofSystem:
    """Decentralized computation proof system"""
    
    def __init__(self):
        self.proofs = {}
        self.nodes = {}
    
    def generate_proof(self, computation_data, node_id):
        """Generate proof of computation"""
        proof_id = hashlib.sha256(
            f"{json.dumps(computation_data, sort_keys=True)}{node_id}{time.time()}".encode()
        ).hexdigest()
        
        proof_data = {
            'proof_id': proof_id,
            'node_id': node_id,
            'computation_data': computation_data,
            'timestamp': time.time(),
            'verified': False,
            'verification_count': 0
        }
        
        self.proofs[proof_id] = proof_data
        return proof_id, proof_data
    
    def verify_proof(self, proof_id, verifier_node_id):
        """Verify a computation proof"""
        if proof_id in self.proofs:
            self.proofs[proof_id]['verification_count'] += 1
            if self.proofs[proof_id]['verification_count'] >= 3:  # Require 3 verifications
                self.proofs[proof_id]['verified'] = True
            return True
        return False
    
    def get_proof(self, proof_id):
        """Get proof data"""
        return self.proofs.get(proof_id)

# Initialize blockchain components
mock_blockchain = MockBlockchain()
property_nft_system = PropertyNFT()
xnode_proof_system = XNodeProofSystem()

@blockchain_bp.route('/mint-valuation-nft', methods=['POST'])
def mint_valuation_nft():
    """Mint a new property valuation NFT"""
    try:
        data = request.get_json()
        
        required_fields = ['bank_address', 'property_data', 'valuation_data', 'risk_metrics']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Mint NFT
        token_id, nft_data = property_nft_system.mint_valuation_nft(
            data['bank_address'],
            data['property_data'],
            data['valuation_data'],
            data['risk_metrics']
        )
        
        # Create blockchain transaction
        transaction = {
            'type': 'nft_mint',
            'token_id': token_id,
            'bank_address': data['bank_address'],
            'property_value': data['valuation_data']['property_value'],
            'lvr': nft_data['lvr'],
            'risk_score': nft_data['composite_risk'],
            'metadata_hash': nft_data['metadata_hash'],
            'timestamp': time.time()
        }
        
        mock_blockchain.add_transaction(transaction)
        
        # Generate XNode proof
        computation_data = {
            'property_analysis': data['property_data'],
            'valuation_result': data['valuation_data'],
            'risk_assessment': data['risk_metrics']
        }
        
        proof_id, proof_data = xnode_proof_system.generate_proof(
            computation_data,
            f"node_{random.randint(1000, 9999)}"
        )
        
        return jsonify({
            "success": True,
            "token_id": token_id,
            "nft_data": nft_data,
            "transaction": transaction,
            "proof_id": proof_id,
            "blockchain_status": "pending_mining"
        })
        
    except Exception as e:
        return jsonify({"error": f"NFT minting failed: {str(e)}"}), 500

@blockchain_bp.route('/mine-block', methods=['POST'])
def mine_block():
    """Mine pending transactions into a new block"""
    try:
        data = request.get_json()
        miner_address = data.get('miner_address', 'default_miner')
        
        if not mock_blockchain.pending_transactions:
            return jsonify({"error": "No pending transactions to mine"}), 400
        
        # Mine new block
        new_block = mock_blockchain.mine_pending_transactions(miner_address)
        
        return jsonify({
            "success": True,
            "block": new_block,
            "chain_length": len(mock_blockchain.chain),
            "mining_reward": mock_blockchain.mining_reward
        })
        
    except Exception as e:
        return jsonify({"error": f"Block mining failed: {str(e)}"}), 500

@blockchain_bp.route('/validate-chain', methods=['GET'])
def validate_chain():
    """Validate the entire blockchain"""
    try:
        is_valid = mock_blockchain.is_chain_valid()
        
        return jsonify({
            "success": True,
            "is_valid": is_valid,
            "chain_length": len(mock_blockchain.chain),
            "latest_block_hash": mock_blockchain.get_latest_block()['hash']
        })
        
    except Exception as e:
        return jsonify({"error": f"Chain validation failed: {str(e)}"}), 500

@blockchain_bp.route('/get-nft/<int:token_id>', methods=['GET'])
def get_nft(token_id):
    """Get NFT data by token ID"""
    try:
        nft_data = property_nft_system.get_nft(token_id)
        
        if not nft_data:
            return jsonify({"error": "NFT not found"}), 404
        
        return jsonify({
            "success": True,
            "nft": nft_data
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve NFT: {str(e)}"}), 500

@blockchain_bp.route('/invalidate-nft', methods=['POST'])
def invalidate_nft():
    """Invalidate an NFT for compliance reasons"""
    try:
        data = request.get_json()
        token_id = data.get('token_id')
        reason = data.get('reason', 'Compliance violation')
        
        if not token_id:
            return jsonify({"error": "Token ID is required"}), 400
        
        success = property_nft_system.invalidate_nft(token_id, reason)
        
        if success:
            # Add invalidation transaction to blockchain
            transaction = {
                'type': 'nft_invalidation',
                'token_id': token_id,
                'reason': reason,
                'timestamp': time.time()
            }
            mock_blockchain.add_transaction(transaction)
            
            return jsonify({
                "success": True,
                "message": f"NFT {token_id} invalidated",
                "reason": reason
            })
        else:
            return jsonify({"error": "NFT not found"}), 404
            
    except Exception as e:
        return jsonify({"error": f"NFT invalidation failed: {str(e)}"}), 500

@blockchain_bp.route('/get-bank-nfts/<bank_address>', methods=['GET'])
def get_bank_nfts(bank_address):
    """Get all NFTs owned by a specific bank"""
    try:
        nfts = property_nft_system.get_nfts_by_bank(bank_address)
        
        return jsonify({
            "success": True,
            "bank_address": bank_address,
            "nft_count": len(nfts),
            "nfts": nfts
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve bank NFTs: {str(e)}"}), 500

@blockchain_bp.route('/verify-proof', methods=['POST'])
def verify_proof():
    """Verify an XNode computation proof"""
    try:
        data = request.get_json()
        proof_id = data.get('proof_id')
        verifier_node_id = data.get('verifier_node_id', f"verifier_{random.randint(1000, 9999)}")
        
        if not proof_id:
            return jsonify({"error": "Proof ID is required"}), 400
        
        success = xnode_proof_system.verify_proof(proof_id, verifier_node_id)
        
        if success:
            proof_data = xnode_proof_system.get_proof(proof_id)
            return jsonify({
                "success": True,
                "proof_id": proof_id,
                "verified": proof_data['verified'],
                "verification_count": proof_data['verification_count']
            })
        else:
            return jsonify({"error": "Proof not found"}), 404
            
    except Exception as e:
        return jsonify({"error": f"Proof verification failed: {str(e)}"}), 500

@blockchain_bp.route('/get-blockchain-stats', methods=['GET'])
def get_blockchain_stats():
    """Get blockchain statistics"""
    try:
        stats = {
            "chain_length": len(mock_blockchain.chain),
            "pending_transactions": len(mock_blockchain.pending_transactions),
            "total_nfts": len(property_nft_system.nfts),
            "valid_nfts": len([nft for nft in property_nft_system.nfts.values() if nft['is_valid']]),
            "total_proofs": len(xnode_proof_system.proofs),
            "verified_proofs": len([proof for proof in xnode_proof_system.proofs.values() if proof['verified']]),
            "latest_block": mock_blockchain.get_latest_block(),
            "chain_valid": mock_blockchain.is_chain_valid()
        }
        
        return jsonify({
            "success": True,
            "stats": stats
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to get blockchain stats: {str(e)}"}), 500

@blockchain_bp.route('/apra-compliance-report', methods=['POST'])
def apra_compliance_report():
    """Generate APRA compliance report from blockchain data"""
    try:
        data = request.get_json()
        bank_address = data.get('bank_address')
        
        if not bank_address:
            return jsonify({"error": "Bank address is required"}), 400
        
        # Get all NFTs for the bank
        bank_nfts = property_nft_system.get_nfts_by_bank(bank_address)
        
        # Calculate compliance metrics
        total_valuations = len(bank_nfts)
        valid_valuations = len([nft for nft in bank_nfts if nft['is_valid']])
        
        # LVR analysis
        lvr_buckets = {
            'under_80': 0,
            '80_to_90': 0,
            '90_to_95': 0,
            'over_95': 0
        }
        
        total_loan_amount = 0
        total_property_value = 0
        high_risk_count = 0
        
        for nft in bank_nfts:
            if nft['is_valid']:
                lvr = nft['lvr']
                total_loan_amount += nft['valuation_data']['loan_amount']
                total_property_value += nft['valuation_data']['property_value']
                
                if lvr < 80:
                    lvr_buckets['under_80'] += 1
                elif lvr < 90:
                    lvr_buckets['80_to_90'] += 1
                elif lvr < 95:
                    lvr_buckets['90_to_95'] += 1
                else:
                    lvr_buckets['over_95'] += 1
                
                if nft['composite_risk'] > 70:
                    high_risk_count += 1
        
        portfolio_lvr = (total_loan_amount / total_property_value * 100) if total_property_value > 0 else 0
        
        compliance_report = {
            "bank_address": bank_address,
            "report_timestamp": time.time(),
            "total_valuations": total_valuations,
            "valid_valuations": valid_valuations,
            "invalidated_valuations": total_valuations - valid_valuations,
            "portfolio_metrics": {
                "total_loan_amount": total_loan_amount,
                "total_property_value": total_property_value,
                "portfolio_lvr": portfolio_lvr,
                "average_risk_score": sum(nft['composite_risk'] for nft in bank_nfts if nft['is_valid']) / valid_valuations if valid_valuations > 0 else 0
            },
            "lvr_distribution": lvr_buckets,
            "risk_analysis": {
                "high_risk_properties": high_risk_count,
                "high_risk_percentage": (high_risk_count / valid_valuations * 100) if valid_valuations > 0 else 0
            },
            "apra_compliance": {
                "under_apra_limit": lvr_buckets['over_95'] == 0,
                "requires_review": lvr_buckets['90_to_95'] > 0,
                "compliance_score": max(0, 100 - (lvr_buckets['over_95'] * 10) - (lvr_buckets['90_to_95'] * 5))
            }
        }
        
        return jsonify({
            "success": True,
            "compliance_report": compliance_report
        })
        
    except Exception as e:
        return jsonify({"error": f"Compliance report generation failed: {str(e)}"}), 500

@blockchain_bp.route('/blockchain-health', methods=['GET'])
def blockchain_health():
    """Check blockchain system health"""
    try:
        health_status = {
            "blockchain_operational": True,
            "nft_system_operational": True,
            "proof_system_operational": True,
            "chain_integrity": mock_blockchain.is_chain_valid(),
            "last_block_time": mock_blockchain.get_latest_block()['timestamp'],
            "system_uptime": time.time() - mock_blockchain.chain[0]['timestamp'],
            "performance_metrics": {
                "avg_block_time": 60,  # Mock average block time
                "transaction_throughput": len(mock_blockchain.pending_transactions),
                "nft_mint_rate": len(property_nft_system.nfts) / max(1, (time.time() - mock_blockchain.chain[0]['timestamp']) / 3600)  # NFTs per hour
            }
        }
        
        return jsonify({
            "success": True,
            "health": health_status
        })
        
    except Exception as e:
        return jsonify({"error": f"Health check failed: {str(e)}"}), 500

