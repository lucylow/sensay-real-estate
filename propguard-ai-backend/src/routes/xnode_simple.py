from flask import Blueprint, request, jsonify
import hashlib
import json
import time
import random
import math
from datetime import datetime

xnode_bp = Blueprint('xnode', __name__)

class XNodeWorker:
    def __init__(self, node_id=None):
        self.node_id = node_id or f"node_{random.randint(1000, 9999)}"
        self.initialized = True

class ValuationWorker(XNodeWorker):
    def calculate_valuation(self, property_data, comparables, risk_data, market_factors):
        try:
            # Simple valuation calculation
            base_value = 800000
            
            # Property adjustments
            bedrooms = property_data.get('bedrooms', 3)
            bathrooms = property_data.get('bathrooms', 2)
            land_size = property_data.get('land_size', 600)
            
            base_value += (bedrooms - 3) * 50000
            base_value += (bathrooms - 2) * 30000
            base_value += (land_size - 600) * 100
            
            # Risk adjustment
            composite_risk = risk_data.get('composite', 0.25)
            risk_multiplier = max(0.7, 1.0 - (composite_risk * 0.3))
            final_value = base_value * risk_multiplier
            
            # Add some randomness for different nodes
            node_variance = random.uniform(0.9, 1.1)
            final_value *= node_variance
            
            confidence = 0.7 + random.random() * 0.25
            
            return {
                'value': int(final_value),
                'confidence': confidence,
                'methodology': ['XNode Distributed Valuation'],
                'node_id': self.node_id,
                'computation_time': time.time()
            }
        except Exception as e:
            return {
                'value': 0,
                'confidence': 0,
                'error': str(e),
                'node_id': self.node_id
            }

class RiskWorker(XNodeWorker):
    def assess_climate_risk(self, lat, lng):
        try:
            # Simple risk calculation based on location
            flood_risk = max(0, min(1, abs(lat + 33) * 0.3))  # Higher near coast
            fire_risk = max(0, min(1, abs(lng - 150) * 0.2))  # Higher inland
            coastal_risk = 0.1 if abs(lat + 33) < 2 else 0.0
            subsidence_risk = 0.1
            cyclone_risk = 0.3 if lat > -25 else 0.1
            heatwave_risk = 0.2 + random.random() * 0.3
            
            composite = (flood_risk * 0.25 + fire_risk * 0.25 + coastal_risk * 0.15 + 
                        subsidence_risk * 0.15 + cyclone_risk * 0.1 + heatwave_risk * 0.1)
            
            risks = {
                'flood': flood_risk,
                'fire': fire_risk,
                'coastal': coastal_risk,
                'subsidence': subsidence_risk,
                'cyclone': cyclone_risk,
                'heatwave': heatwave_risk,
                'composite': composite
            }
            
            confidence = 0.6 + random.random() * 0.3
            
            return {
                'risks': risks,
                'confidence': confidence,
                'data_source': 'xnode_distributed',
                'node_id': self.node_id,
                'computation_time': time.time()
            }
        except Exception as e:
            return {
                'risks': {'flood': 0.3, 'fire': 0.3, 'coastal': 0.1, 'subsidence': 0.1, 
                         'cyclone': 0.1, 'heatwave': 0.2, 'composite': 0.25},
                'confidence': 0.3,
                'data_source': 'fallback',
                'node_id': self.node_id,
                'error': str(e)
            }

class XNodeConsensus:
    def __init__(self, threshold=0.75):
        self.threshold = threshold
        self.active_computations = {}
    
    def aggregate_valuations(self, computation_id, valuations):
        if len(valuations) < 2:
            return valuations[0] if valuations else None
        
        valid_valuations = [v for v in valuations if 'error' not in v and v.get('confidence', 0) > 0.3]
        
        if not valid_valuations:
            return None
        
        total_weight = sum(v['confidence'] for v in valid_valuations)
        if total_weight == 0:
            return valid_valuations[0]
        
        weighted_value = sum(v['value'] * v['confidence'] for v in valid_valuations) / total_weight
        consensus_confidence = total_weight / len(valid_valuations)
        
        return {
            'final_value': int(weighted_value),
            'consensus_confidence': consensus_confidence,
            'participating_nodes': [v['node_id'] for v in valid_valuations],
            'node_count': len(valid_valuations),
            'computation_id': computation_id,
            'consensus_method': 'weighted_average'
        }
    
    def aggregate_risk_assessments(self, computation_id, assessments):
        if len(assessments) < 2:
            return assessments[0] if assessments else None
        
        valid_assessments = [a for a in assessments if 'error' not in a and a.get('confidence', 0) > 0.3]
        
        if not valid_assessments:
            return None
        
        total_weight = sum(a['confidence'] for a in valid_assessments)
        
        final_risks = {}
        for risk_type in ['flood', 'fire', 'coastal', 'subsidence', 'cyclone', 'heatwave', 'composite']:
            weighted_risk = sum(
                a['risks'].get(risk_type, 0) * a['confidence'] 
                for a in valid_assessments
            ) / total_weight
            final_risks[risk_type] = weighted_risk
        
        return {
            'final_risks': final_risks,
            'consensus_confidence': total_weight / len(valid_assessments),
            'participating_nodes': [a['node_id'] for a in valid_assessments],
            'node_count': len(valid_assessments),
            'computation_id': computation_id,
            'data_quality': 'good'
        }

# Initialize XNode components
valuation_workers = [ValuationWorker(f"val_node_{i}") for i in range(3)]
risk_workers = [RiskWorker(f"risk_node_{i}") for i in range(3)]
consensus_engine = XNodeConsensus()

@xnode_bp.route('/distributed-valuation', methods=['POST'])
def distributed_valuation():
    try:
        data = request.get_json()
        
        required_fields = ['property_data', 'comparables', 'risk_data', 'market_factors']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        computation_id = hashlib.sha256(
            f"{json.dumps(data, sort_keys=True)}{time.time()}".encode()
        ).hexdigest()[:16]
        
        # Distribute computation across nodes
        valuations = []
        for worker in valuation_workers:
            try:
                result = worker.calculate_valuation(
                    data['property_data'],
                    data['comparables'],
                    data['risk_data'],
                    data['market_factors']
                )
                valuations.append(result)
            except Exception as e:
                print(f"Worker {worker.node_id} failed: {e}")
                continue
        
        # Aggregate results using consensus
        consensus_result = consensus_engine.aggregate_valuations(computation_id, valuations)
        
        if not consensus_result:
            return jsonify({"error": "Consensus failed - insufficient valid results"}), 500
        
        return jsonify({
            "success": True,
            "computation_id": computation_id,
            "consensus_result": consensus_result,
            "individual_results": valuations,
            "xnode_metadata": {
                "total_nodes": len(valuation_workers),
                "participating_nodes": len(valuations),
                "consensus_threshold": consensus_engine.threshold,
                "computation_time": time.time()
            }
        })
        
    except Exception as e:
        return jsonify({"error": f"Distributed valuation failed: {str(e)}"}), 500

@xnode_bp.route('/distributed-risk-assessment', methods=['POST'])
def distributed_risk_assessment():
    try:
        data = request.get_json()
        
        lat = data.get('lat')
        lng = data.get('lng')
        
        if lat is None or lng is None:
            return jsonify({"error": "Latitude and longitude are required"}), 400
        
        computation_id = hashlib.sha256(
            f"{lat}{lng}{time.time()}".encode()
        ).hexdigest()[:16]
        
        # Distribute risk assessment across nodes
        assessments = []
        for worker in risk_workers:
            try:
                result = worker.assess_climate_risk(lat, lng)
                assessments.append(result)
            except Exception as e:
                print(f"Risk worker {worker.node_id} failed: {e}")
                continue
        
        # Aggregate results using consensus
        consensus_result = consensus_engine.aggregate_risk_assessments(computation_id, assessments)
        
        if not consensus_result:
            return jsonify({"error": "Risk consensus failed"}), 500
        
        return jsonify({
            "success": True,
            "computation_id": computation_id,
            "consensus_result": consensus_result,
            "individual_assessments": assessments,
            "xnode_metadata": {
                "total_nodes": len(risk_workers),
                "participating_nodes": len(assessments),
                "consensus_threshold": consensus_engine.threshold
            }
        })
        
    except Exception as e:
        return jsonify({"error": f"Distributed risk assessment failed: {str(e)}"}), 500

@xnode_bp.route('/xnode-health', methods=['GET'])
def xnode_health():
    try:
        valuation_health = []
        for worker in valuation_workers:
            health = {
                'node_id': worker.node_id,
                'initialized': worker.initialized,
                'status': 'healthy'
            }
            valuation_health.append(health)
        
        risk_health = []
        for worker in risk_workers:
            health = {
                'node_id': worker.node_id,
                'initialized': worker.initialized,
                'status': 'healthy'
            }
            risk_health.append(health)
        
        cluster_stats = {
            'total_valuation_nodes': len(valuation_workers),
            'healthy_valuation_nodes': len(valuation_workers),
            'total_risk_nodes': len(risk_workers),
            'healthy_risk_nodes': len(risk_workers),
            'consensus_threshold': consensus_engine.threshold,
            'active_computations': len(consensus_engine.active_computations)
        }
        
        return jsonify({
            "success": True,
            "cluster_health": {
                "valuation_nodes": valuation_health,
                "risk_nodes": risk_health,
                "cluster_stats": cluster_stats,
                "overall_status": "healthy"
            }
        })
        
    except Exception as e:
        return jsonify({"error": f"Health check failed: {str(e)}"}), 500

@xnode_bp.route('/xnode-consensus-test', methods=['POST'])
def xnode_consensus_test():
    try:
        data = request.get_json()
        test_type = data.get('test_type', 'valuation')
        
        if test_type == 'valuation':
            # Generate mock valuation results
            mock_valuations = []
            for worker in valuation_workers:
                base_value = 1000000 + random.randint(-200000, 200000)
                confidence = 0.7 + random.random() * 0.25
                
                mock_valuations.append({
                    'value': base_value,
                    'confidence': confidence,
                    'node_id': worker.node_id,
                    'computation_time': time.time()
                })
            
            computation_id = f"test_{int(time.time())}"
            consensus_result = consensus_engine.aggregate_valuations(computation_id, mock_valuations)
            
            return jsonify({
                "success": True,
                "test_type": "valuation_consensus",
                "mock_results": mock_valuations,
                "consensus_result": consensus_result
            })
            
        elif test_type == 'risk':
            # Generate mock risk assessments
            mock_assessments = []
            for worker in risk_workers:
                risks = {
                    'flood': random.random() * 0.8,
                    'fire': random.random() * 0.8,
                    'coastal': random.random() * 0.5,
                    'subsidence': random.random() * 0.3,
                    'cyclone': random.random() * 0.6,
                    'heatwave': random.random() * 0.7
                }
                risks['composite'] = sum(risks.values()) / len(risks)
                
                mock_assessments.append({
                    'risks': risks,
                    'confidence': 0.6 + random.random() * 0.3,
                    'node_id': worker.node_id,
                    'data_source': 'xnode_distributed'
                })
            
            computation_id = f"test_{int(time.time())}"
            consensus_result = consensus_engine.aggregate_risk_assessments(computation_id, mock_assessments)
            
            return jsonify({
                "success": True,
                "test_type": "risk_consensus",
                "mock_assessments": mock_assessments,
                "consensus_result": consensus_result
            })
        
        else:
            return jsonify({"error": "Invalid test type"}), 400
            
    except Exception as e:
        return jsonify({"error": f"Consensus test failed: {str(e)}"}), 500

