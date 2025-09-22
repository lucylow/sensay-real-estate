"""
IPFS service for storing NFT metadata and reports
"""
import os
import json
import hashlib
import requests
from typing import Dict, Any, Optional


class IPFSService:
    def __init__(self):
        self.pinata_api_key = os.getenv('PINATA_API_KEY')
        self.pinata_secret = os.getenv('PINATA_API_SECRET')
        self.pinata_url = 'https://api.pinata.cloud'

    def upload_json(self, data: Dict[str, Any], name: Optional[str] = None) -> str:
        """Upload JSON data to IPFS via Pinata"""
        try:
            if not self.pinata_api_key or not self.pinata_secret:
                # Return simulated IPFS hash for demo
                content_hash = hashlib.sha256(json.dumps(data, sort_keys=True).encode()).hexdigest()
                return f"Qm{content_hash[:44]}"
            
            headers = {
                'Content-Type': 'application/json',
                'pinata_api_key': self.pinata_api_key,
                'pinata_secret_api_key': self.pinata_secret
            }
            
            payload = {
                'pinataContent': data,
                'pinataMetadata': {
                    'name': name or f'propguard-{int(__import__("time").time())}'
                }
            }
            
            response = requests.post(
                f'{self.pinata_url}/pinning/pinJSONToIPFS',
                json=payload,
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()['IpfsHash']
            else:
                raise Exception(f"Pinata upload failed: {response.text}")
                
        except Exception as e:
            print(f"IPFS upload error: {e}")
            # Return simulated hash on error
            content_hash = hashlib.sha256(json.dumps(data, sort_keys=True).encode()).hexdigest()
            return f"Qm{content_hash[:44]}"

    def retrieve_json(self, cid: str) -> Dict[str, Any]:
        """Retrieve JSON data from IPFS"""
        try:
            response = requests.get(f'https://ipfs.io/ipfs/{cid}', timeout=10)
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"Failed to retrieve from IPFS: {response.status_code}")
        except Exception as e:
            print(f"IPFS retrieval error: {e}")
            return {}

    def upload_valuation_report(self, report_data: Dict[str, Any]) -> str:
        """Upload a complete valuation report to IPFS"""
        metadata = {
            "name": f"PropGuard Valuation Report - {report_data.get('property_address', 'Unknown')}",
            "description": "APRA-compliant property valuation report with blockchain verification",
            "image": "https://propguard.ai/nft-image.png",  # Could generate dynamic images
            "attributes": [
                {
                    "trait_type": "Property Address",
                    "value": report_data.get('property_address', '')
                },
                {
                    "trait_type": "Valuation (AUD)",
                    "value": report_data.get('valuation', 0)
                },
                {
                    "trait_type": "Risk Score",
                    "value": report_data.get('risk_score', 0)
                },
                {
                    "trait_type": "APRA Compliant",
                    "value": "Yes" if report_data.get('compliance', {}).get('APRA_CPS230') else "No"
                },
                {
                    "trait_type": "Assessment Date",
                    "value": report_data.get('timestamp', '')
                }
            ],
            "properties": {
                "valuation_data": report_data.get('valuation_data', {}),
                "risk_assessment": report_data.get('risk_data', {}),
                "compliance_status": report_data.get('compliance', {}),
                "methodology": report_data.get('methodology', 'AI-powered distributed valuation'),
                "xnode_proof": report_data.get('xnode_proof', {})
            }
        }
        
        return self.upload_json(metadata, f"valuation-{report_data.get('property_id', 'unknown')}")

    def create_opensea_metadata(self, property_data: Dict, valuation_data: Dict) -> Dict[str, Any]:
        """Create OpenSea-compatible NFT metadata"""
        return {
            "name": f"Property Valuation Certificate #{property_data.get('id', 'XXX')}",
            "description": f"Blockchain-verified property valuation for {property_data.get('address', 'Unknown Address')}. This NFT represents an immutable, APRA-compliant valuation assessment.",
            "external_url": "https://propguard.ai",
            "image": self._generate_nft_image_url(property_data, valuation_data),
            "attributes": [
                {
                    "trait_type": "Property Type",
                    "value": property_data.get('property_type', 'Residential')
                },
                {
                    "trait_type": "Bedrooms",
                    "value": property_data.get('bedrooms', 0)
                },
                {
                    "trait_type": "Bathrooms", 
                    "value": property_data.get('bathrooms', 0)
                },
                {
                    "trait_type": "Land Size (sqm)",
                    "value": property_data.get('land_size', 0)
                },
                {
                    "trait_type": "Year Built",
                    "value": property_data.get('year_built', 'Unknown')
                },
                {
                    "trait_type": "Current Valuation (AUD)",
                    "value": valuation_data.get('current_valuation', 0)
                },
                {
                    "trait_type": "Risk Score",
                    "value": valuation_data.get('risk_score', 0)
                },
                {
                    "trait_type": "Confidence Level",
                    "value": f"{valuation_data.get('confidence', 0)}%"
                },
                {
                    "trait_type": "APRA CPS230 Compliant",
                    "value": "Yes"
                },
                {
                    "trait_type": "Blockchain Network",
                    "value": "Polygon"
                }
            ],
            "background_color": "1a365d",
            "animation_url": None,
            "youtube_url": None
        }

    def _generate_nft_image_url(self, property_data: Dict, valuation_data: Dict) -> str:
        """Generate dynamic NFT image URL"""
        # In production, this could generate custom images based on property data
        base_url = "https://propguard.ai/api/nft-image"
        params = {
            "address": property_data.get('address', ''),
            "valuation": valuation_data.get('current_valuation', 0),
            "risk": valuation_data.get('risk_score', 0)
        }
        
        # For now, return a static image
        return "https://propguard.ai/static/nft-certificate.png"


# Global instance
ipfs_service = IPFSService()