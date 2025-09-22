"""
NFT models for PropGuard AI
"""
from dataclasses import dataclass
from typing import Dict, Any, Optional, List
from datetime import datetime


@dataclass
class PropertyNFT:
    """Property Valuation NFT model"""
    token_id: str
    property_address: str
    valuation: float
    risk_score: int
    minted_at: str
    owner: str
    tx_hash: str
    ipfs_cid: str
    compliance_status: Dict[str, bool]
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "token_id": self.token_id,
            "property_address": self.property_address,
            "valuation": self.valuation,
            "risk_score": self.risk_score,
            "minted_at": self.minted_at,
            "owner": self.owner,
            "tx_hash": self.tx_hash,
            "ipfs_cid": self.ipfs_cid,
            "compliance_status": self.compliance_status
        }


@dataclass
class NFTMetadata:
    """OpenSea-compatible NFT metadata"""
    name: str
    description: str
    image: str
    external_url: str
    attributes: List[Dict[str, Any]]
    background_color: str
    animation_url: Optional[str] = None
    youtube_url: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "external_url": self.external_url,
            "attributes": self.attributes,
            "background_color": self.background_color,
            "animation_url": self.animation_url,
            "youtube_url": self.youtube_url
        }


@dataclass
class ComplianceStatus:
    """APRA compliance status model"""
    APRA_CPS230: bool
    NCCP_Act: bool
    Basel_III: bool
    Risk_Management: bool = True
    
    def to_dict(self) -> Dict[str, bool]:
        return {
            "APRA_CPS230": self.APRA_CPS230,
            "NCCP_Act": self.NCCP_Act,
            "Basel_III": self.Basel_III,
            "Risk_Management": self.Risk_Management
        }


@dataclass
class BlockchainHealth:
    """Blockchain network health model"""
    status: str
    block_height: int
    network: str
    gas_price: float
    last_updated: str
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "status": self.status,
            "block_height": self.block_height,
            "network": self.network,
            "gas_price": self.gas_price,
            "last_updated": self.last_updated
        }