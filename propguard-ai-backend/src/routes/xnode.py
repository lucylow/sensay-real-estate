from flask import Blueprint, request, jsonify
import hashlib
import json
import time
import random
import asyncio
import threading
import math
from datetime import datetime
from typing import Dict, List, Optional, Any

xnode_bp = Blueprint('xnode', __name__)

class XNodeWorker:
    """Base XNode worker class for distributed computation"""
    
    def __init__(self, node_id: str = None):
        self.node_id = node_id or f"node_{random.randint(1000, 9999)}"
        self.initialized = False
        self.computation_cache = {}
        self.consensus_threshold = 0.75
        
    async def initialize(self):
        """Initialize the worker"""
        self.initialized = True
        print(f"XNode Worker {self.node_id} initialized")

class ValuationWorker(XNodeWorker):
    """Distributed property valuation worker"""
    
    def __init__(self, node_id: str = None):
        super().__init__(node_id)
        self.model_weights = self._initialize_model_weights()
        
    def _initialize_model_weights(self):
        """Initialize mock neural network weights using pure Python"""
        # Simulate a 50-input neural network with random weights
        return {
            'layer1': [[random.gauss(0, 0.1) for _ in range(64)] for _ in range(50)],
            'bias1': [random.gauss(0, 0.1) for _ in range(64)],
            'layer2': [[random.gauss(0, 0.1) for _ in range(32)] for _ in range(64)],
            'bias2': [random.gauss(0, 0.1) for _ in range(32)],
            'layer3': [[random.gauss(0, 0.1) for _ in range(16)] for _ in range(32)],
            'bias3': [random.gauss(0, 0.1) for _ in range(16)],
            'output': [[random.gauss(0, 0.1)] for _ in range(16)],
            'output_bias': [random.gauss(0, 0.1)]
        }
    
    async def calculate_valuation(self, property_data, comparables, risk_data, market_factors):
        """Distributed valuation calculation"""
        try:
            # Prepare features for neural network
            features = self._prepare_features(property_data, comparables, risk_data, market_factors)
            
            # Run through mock neural network
            valuation = self._forward_pass(features)
            
            # Apply risk adjustments
            risk_adjustment = self._calculate_risk_adjustment(risk_data)
            final_valuation = valuation * risk_adjustment
            
            # Calculate confidence
            confidence = self._calculate_confidence(property_data, comparables, risk_data)
            
            return {
                'value': int(final_valuation),
                'confidence': confidence,
                'methodology': ['XNode Distributed Neural Network', 'Risk-Adjusted Valuation'],
                'node_id': self.node_id,
                'computation_time': time.time()
            }
            
        except Exception as e:
            print(f"Valuation error on node {self.node_id}: {e}")
            return {
                'value': 0,
                'confidence': 0,
                'error': str(e),
                'node_id': self.node_id
            }
    
    def _prepare_features(self, property_data, comparables, risk_data, market_factors):
        """Prepare 50-dimensional feature vector using pure Python"""
        features = [0.0] * 50
        
        # Property features (0-9)
        features[0] = property_data.get('bedrooms', 3) / 5.0
        features[1] = property_data.get('bathrooms', 2) / 3.0
        features[2] = property_data.get('land_size', 600) / 1000.0
        features[3] = property_data.get('floor_area', 150) / 200.0
        features[4] = min((2024 - property_data.get('year_built', 2000)) / 50.0, 1.0)
        features[5] = 1.0 if property_data.get('property_type') == 'House' else 0.0
        features[6] = len(comparables) / 10.0
        features[7] = self._average_comparable_price(comparables) / 1000000.0
        features[8] = self._get_location_score(property_data.get('address', ''))
        features[9] = property_data.get('last_sale_price', 800000) / 1000000.0
        
        # Risk features (10-19)
        features[10] = risk_data.get('flood', 0.3)
        features[11] = risk_data.get('fire', 0.3)
        features[12] = risk_data.get('coastal_erosion', 0.1)
        features[13] = risk_data.get('subsidence', 0.1)
        features[14] = risk_data.get('cyclone', 0.1)
        features[15] = risk_data.get('heatwave', 0.2)
        features[16] = risk_data.get('composite', 0.25)
        features[17] = 1.0 - risk_data.get('composite', 0.25)  # Risk inverse
        features[18] = min(risk_data.get('flood', 0) + risk_data.get('fire', 0), 1.0)
        features[19] = max(risk_data.get('coastal_erosion', 0), risk_data.get('subsidence', 0))
        
        # Market features (20-29)
        features[20] = market_factors.get('interest_rates', 0.05) / 0.1
        features[21] = market_factors.get('unemployment', 0.05) / 0.1
        features[22] = market_factors.get('inflation', 0.03) / 0.1
        features[23] = market_factors.get('population_growth', 0.02) / 0.05
        features[24] = market_factors.get('market_sentiment', 0.7)
        features[25] = market_factors.get('rental_yield', 0.035) / 0.1
        features[26] = market_factors.get('auction_clearance', 0.7)
        features[27] = market_factors.get('days_on_market', 45) / 100.0
        features[28] = market_factors.get('price_growth', 0.05) / 0.2
        features[29] = market_factors.get('volume_change', 0.1) / 0.5
        
        # Comparable features (30-39)
        recent_comparables = [c for c in comparables if self._is_recent_sale(c.get('sale_date', ''))]
        features[30] = len(recent_comparables) / 5.0
        features[31] = self._comparable_price_variance(comparables)
        features[32] = self._comparable_size_similarity(property_data, comparables)
        features[33] = self._comparable_age_similarity(property_data, comparables)
        features[34] = self._comparable_type_match(property_data, comparables)
        features[35] = min(len([c for c in comparables if c.get('price', 0) > 0]), 10) / 10.0
        features[36] = self._median_comparable_price(comparables) / 1000000.0
        features[37] = self._comparable_distance_factor(comparables)
        features[38] = self._comparable_market_time(comparables)
        features[39] = self._comparable_quality_score(comparables)
        
        # Additional engineered features (40-49)
        features[40] = features[0] * features[1]  # Bed-bath interaction
        features[41] = features[2] * features[5]  # Land size * house type
        features[42] = features[10] * features[11]  # Flood * fire risk
        features[43] = features[20] * features[24]  # Interest rate * sentiment
        features[44] = features[7] * features[16]  # Comparable price * risk
        features[45] = math.sqrt(features[2] * features[3])  # Size composite
        features[46] = (features[10] + features[11] + features[12]) / 3  # Climate risk avg
        features[47] = (features[20] + features[21] + features[22]) / 3  # Economic factors avg
        features[48] = features[6] * features[31]  # Comparable count * variance
        features[49] = features[8] * features[24]  # Location * sentiment
        
        return features
    
    def _matrix_multiply(self, matrix, vector):
        """Matrix multiplication using pure Python"""
        result = []
        for row in matrix:
            dot_product = sum(a * b for a, b in zip(row, vector))
            result.append(dot_product)
        return result
    
    def _vector_add(self, vec1, vec2):
        """Vector addition using pure Python"""
        return [a + b for a, b in zip(vec1, vec2)]
    
    def _relu(self, vector):
        """ReLU activation function"""
        return [max(0, x) for x in vector]
    
    def _dropout(self, vector, rate=0.2):
        """Simulate dropout during training"""
        return [x if random.random() > rate else 0 for x in vector]
    
    def _forward_pass(self, features):
        """Forward pass through mock neural network using pure Python"""
        # Layer 1
        x = self._matrix_multiply(self.model_weights['layer1'], features)
        x = self._vector_add(x, self.model_weights['bias1'])
        x = self._relu(x)
        x = self._dropout(x, 0.2)
        
        # Layer 2
        x = self._matrix_multiply(self.model_weights['layer2'], x)
        x = self._vector_add(x, self.model_weights['bias2'])
        x = self._relu(x)
        x = self._dropout(x, 0.2)
        
        # Layer 3
        x = self._matrix_multiply(self.model_weights['layer3'], x)
        x = self._vector_add(x, self.model_weights['bias3'])
        x = self._relu(x)
        
        # Output layer
        output = self._matrix_multiply(self.model_weights['output'], x)
        output = self._vector_add(output, self.model_weights['output_bias'])
        
        # Apply sigmoid-like scaling to get reasonable property values
        valuation = 500000 + (1000000 * (1 / (1 + math.exp(-output[0]))))
        
        return valuation
    
    
    def _calculate_risk_adjustment(self, risk_data):
        """Calculate risk adjustment multiplier"""
        composite_risk = risk_data.get('composite', 0.25)
        # Risk adjustment between 0.7 and 1.0
        return max(0.7, 1.0 - (composite_risk * 0.3))
    
    def _calculate_confidence(self, property_data, comparables, risk_data):
        """Calculate confidence score"""
        confidence = 0.5  # Base confidence
        
        # More comparables = higher confidence
        confidence += min(0.3, len(comparables) * 0.03)
        
        # Recent comparables boost confidence
        recent_count = len([c for c in comparables if self._is_recent_sale(c.get('sale_date', ''))])
        confidence += min(0.2, recent_count * 0.04)
        
        # Complete property data
        if all(property_data.get(field) for field in ['bedrooms', 'bathrooms', 'land_size']):
            confidence += 0.1
        
        # Lower risk = higher confidence
        confidence += (1 - risk_data.get('composite', 0.25)) * 0.15
        
        return max(0.3, min(0.95, confidence))
    
    def _average_comparable_price(self, comparables):
        """Calculate average comparable price"""
        if not comparables:
            return 800000
        prices = [c.get('price', 0) for c in comparables if c.get('price', 0) > 0]
        return sum(prices) / len(prices) if prices else 800000
    
    def _get_location_score(self, address):
        """Get location premium score"""
        premium_areas = ['sydney', 'melbourne', 'toorak', 'mosman', 'double bay', 'paddington']
        address_lower = address.lower()
        return 0.8 if any(area in address_lower for area in premium_areas) else 0.5
    
    def _is_recent_sale(self, sale_date):
        """Check if sale is within last 6 months"""
        if not sale_date:
            return False
        try:
            sale = datetime.strptime(sale_date, '%Y-%m-%d')
            return (datetime.now() - sale).days < 180
        except:
            return False
    
    def _comparable_price_variance(self, comparables):
        """Calculate price variance in comparables"""
        if len(comparables) < 2:
            return 0.5
        prices = [c.get('price', 0) for c in comparables if c.get('price', 0) > 0]
        if len(prices) < 2:
            return 0.5
        mean_price = sum(prices) / len(prices)
        variance = sum((p - mean_price) ** 2 for p in prices) / len(prices)
        return min(1.0, variance / (mean_price ** 2))
    
    def _comparable_size_similarity(self, property_data, comparables):
        """Calculate size similarity with comparables"""
        prop_size = property_data.get('floor_area', 150)
        if not comparables:
            return 0.5
        
        similarities = []
        for comp in comparables:
            comp_size = comp.get('floor_area', 150)
            similarity = 1 - abs(prop_size - comp_size) / max(prop_size, comp_size)
            similarities.append(max(0, similarity))
        
        return sum(similarities) / len(similarities) if similarities else 0.5
    
    def _comparable_age_similarity(self, property_data, comparables):
        """Calculate age similarity with comparables"""
        prop_age = 2024 - property_data.get('year_built', 2000)
        if not comparables:
            return 0.5
        
        similarities = []
        for comp in comparables:
            comp_age = 2024 - comp.get('year_built', 2000)
            age_diff = abs(prop_age - comp_age)
            similarity = max(0, 1 - age_diff / 50)  # 50 year max difference
            similarities.append(similarity)
        
        return sum(similarities) / len(similarities) if similarities else 0.5
    
    def _comparable_type_match(self, property_data, comparables):
        """Calculate property type match ratio"""
        prop_type = property_data.get('property_type', 'House')
        if not comparables:
            return 0.5
        
        matches = sum(1 for c in comparables if c.get('property_type') == prop_type)
        return matches / len(comparables)
    
    def _median_comparable_price(self, comparables):
        """Calculate median comparable price"""
        if not comparables:
            return 800000
        prices = sorted([c.get('price', 0) for c in comparables if c.get('price', 0) > 0])
        if not prices:
            return 800000
        n = len(prices)
        return prices[n // 2] if n % 2 == 1 else (prices[n // 2 - 1] + prices[n // 2]) / 2
    
    def _comparable_distance_factor(self, comparables):
        """Mock distance factor for comparables"""
        # In real implementation, would calculate actual distances
        return 0.8 if len(comparables) > 3 else 0.6
    
    def _comparable_market_time(self, comparables):
        """Calculate average market time for comparables"""
        if not comparables:
            return 0.5
        
        market_times = []
        for comp in comparables:
            # Mock market time calculation
            days_on_market = comp.get('days_on_market', 45)
            normalized_time = min(1.0, days_on_market / 100)
            market_times.append(1 - normalized_time)  # Faster sale = better
        
        return sum(market_times) / len(market_times) if market_times else 0.5
    
    def _comparable_quality_score(self, comparables):
        """Calculate overall quality score of comparables"""
        if not comparables:
            return 0.5
        
        quality_scores = []
        for comp in comparables:
            score = 0.5  # Base score
            
            # Recent sale bonus
            if self._is_recent_sale(comp.get('sale_date', '')):
                score += 0.2
            
            # Complete data bonus
            if all(comp.get(field) for field in ['bedrooms', 'bathrooms', 'price']):
                score += 0.2
            
            # Reasonable price range
            price = comp.get('price', 0)
            if 200000 <= price <= 5000000:
                score += 0.1
            
            quality_scores.append(min(1.0, score))
        
        return sum(quality_scores) / len(quality_scores) if quality_scores else 0.5

class RiskWorker(XNodeWorker):
    """Distributed risk assessment worker"""
    
    async def assess_climate_risk(self, lat, lng):
        """Distributed climate risk assessment"""
        try:
            # Simulate distributed risk calculation
            risks = {
                'flood': self._calculate_flood_risk(lat, lng),
                'fire': self._calculate_fire_risk(lat, lng),
                'coastal': self._calculate_coastal_risk(lat, lng),
                'subsidence': self._calculate_subsidence_risk(lat, lng),
                'cyclone': self._calculate_cyclone_risk(lat),
                'heatwave': self._calculate_heatwave_risk(lat, lng)
            }
            
            risks['composite'] = self._calculate_composite_risk(risks)
            
            confidence = self._calculate_risk_confidence(lat, lng)
            
            return {
                'risks': risks,
                'confidence': confidence,
                'data_source': 'xnode_distributed',
                'node_id': self.node_id,
                'computation_time': time.time()
            }
            
        except Exception as e:
            print(f"Risk assessment error on node {self.node_id}: {e}")
            return {
                'risks': self._get_fallback_risks(lat, lng),
                'confidence': 0.3,
                'data_source': 'fallback',
                'node_id': self.node_id,
                'error': str(e)
            }
    
    def _calculate_flood_risk(self, lat, lng):
        """Calculate flood risk based on location"""
        # Simulate flood risk calculation
        coastal_factor = max(0, 1 - self._distance_from_coast(lat, lng) / 20)
        river_factor = abs(np.sin(lat * 10) * np.cos(lng * 10))
        elevation_factor = max(0, 1 - abs(lat + 33) * 0.1)  # Lower elevation = higher risk
        
        return min(1.0, (coastal_factor * 0.4 + river_factor * 0.4 + elevation_factor * 0.2))
    
    def _calculate_fire_risk(self, lat, lng):
        """Calculate bushfire risk"""
        # Higher risk for inland and northern areas
        inland_factor = min(1.0, self._distance_from_coast(lat, lng) / 100)
        northern_factor = max(0, (lat + 20) / 15)  # More northern = higher risk
        vegetation_factor = 0.6 + random.random() * 0.4  # Mock vegetation density
        
        return min(1.0, (inland_factor * 0.3 + northern_factor * 0.4 + vegetation_factor * 0.3))
    
    def _calculate_coastal_risk(self, lat, lng):
        """Calculate coastal erosion risk"""
        distance = self._distance_from_coast(lat, lng)
        if distance > 10:
            return 0
        elif distance > 5:
            return 0.1
        elif distance > 1:
            return 0.3
        else:
            return 0.7
    
    def _calculate_subsidence_risk(self, lat, lng):
        """Calculate subsidence risk"""
        # Mock mining area detection
        mining_areas = [
            (-32.5, 151.5, 0.6),  # Hunter Valley
            (-37.5, 145.0, 0.4),  # Latrobe Valley
            (-23.5, 150.5, 0.5),  # Bowen Basin
        ]
        
        base_risk = 0.1
        for mine_lat, mine_lng, risk_level in mining_areas:
            distance = np.sqrt((lat - mine_lat)**2 + (lng - mine_lng)**2)
            if distance < 2:  # Within 2 degrees
                base_risk += risk_level * (1 - distance / 2)
        
        return min(1.0, base_risk)
    
    def _calculate_cyclone_risk(self, lat):
        """Calculate cyclone risk based on latitude"""
        if lat > -20:
            return min(0.8, max(0.3, (lat + 20) / 15))
        elif lat > -25:
            return 0.2
        else:
            return 0.05
    
    def _calculate_heatwave_risk(self, lat, lng):
        """Calculate heatwave risk"""
        inland_factor = min(0.4, self._distance_from_coast(lat, lng) / 100)
        northern_factor = min(0.4, (35 - abs(lat)) / 20)
        base_risk = 0.2
        
        return min(1.0, base_risk + inland_factor + northern_factor)
    
    def _calculate_composite_risk(self, risks):
        """Calculate weighted composite risk"""
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
            if risk_type in risks:
                composite += risks[risk_type] * weight
        
        return composite
    
    def _calculate_risk_confidence(self, lat, lng):
        """Calculate confidence in risk assessment"""
        # Higher confidence for well-known areas
        major_cities = [
            (-33.8688, 151.2093),  # Sydney
            (-37.8136, 144.9631),  # Melbourne
            (-27.4698, 153.0251),  # Brisbane
        ]
        
        min_distance = min(
            np.sqrt((lat - city_lat)**2 + (lng - city_lng)**2)
            for city_lat, city_lng in major_cities
        )
        
        # Closer to major cities = higher confidence
        confidence = max(0.5, 1 - min_distance / 10)
        return confidence
    
    def _distance_from_coast(self, lat, lng):
        """Calculate approximate distance from Australian coast"""
        # Simplified calculation using major coastal points
        coastal_points = [
            (-33.8688, 151.2093),  # Sydney
            (-37.8136, 144.9631),  # Melbourne
            (-31.9505, 115.8605),  # Perth
            (-27.4698, 153.0251),  # Brisbane
        ]
        
        distances = [
            np.sqrt((lat - coast_lat)**2 + (lng - coast_lng)**2) * 111  # Convert to km
            for coast_lat, coast_lng in coastal_points
        ]
        
        return min(distances)
    
    def _get_fallback_risks(self, lat, lng):
        """Get fallback risk values"""
        return {
            'flood': 0.3,
            'fire': 0.3,
            'coastal': 0.1,
            'subsidence': 0.1,
            'cyclone': 0.1,
            'heatwave': 0.2,
            'composite': 0.25
        }

class XNodeConsensus:
    """XNode consensus mechanism for distributed computation"""
    
    def __init__(self, threshold=0.75):
        self.threshold = threshold
        self.active_computations = {}
    
    async def aggregate_valuations(self, computation_id, valuations):
        """Aggregate valuation results from multiple nodes"""
        if len(valuations) < 2:
            return valuations[0] if valuations else None
        
        # Filter out failed computations
        valid_valuations = [v for v in valuations if 'error' not in v and v.get('confidence', 0) > 0.3]
        
        if not valid_valuations:
            return None
        
        # Weighted average based on confidence
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
    
    async def aggregate_risk_assessments(self, computation_id, assessments):
        """Aggregate risk assessment results"""
        if len(assessments) < 2:
            return assessments[0] if assessments else None
        
        valid_assessments = [a for a in assessments if 'error' not in a and a.get('confidence', 0) > 0.3]
        
        if not valid_assessments:
            return None
        
        # Weighted average for each risk type
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
            'data_quality': self._assess_data_quality(valid_assessments)
        }
    
    def _assess_data_quality(self, assessments):
        """Assess overall data quality"""
        live_data_count = sum(1 for a in assessments if a.get('data_source') == 'xnode_distributed')
        total_count = len(assessments)
        
        if live_data_count >= total_count * 0.8:
            return 'excellent'
        elif live_data_count >= total_count * 0.5:
            return 'good'
        elif live_data_count >= total_count * 0.3:
            return 'fair'
        else:
            return 'poor'

# Initialize XNode components
valuation_workers = [ValuationWorker(f"val_node_{i}") for i in range(3)]
risk_workers = [RiskWorker(f"risk_node_{i}") for i in range(3)]
consensus_engine = XNodeConsensus()

@xnode_bp.route('/distributed-valuation', methods=['POST'])
def distributed_valuation():
    """Perform distributed property valuation across XNodes"""
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
                # Simulate async computation
                result = asyncio.run(worker.calculate_valuation(
                    data['property_data'],
                    data['comparables'],
                    data['risk_data'],
                    data['market_factors']
                ))
                valuations.append(result)
            except Exception as e:
                print(f"Worker {worker.node_id} failed: {e}")
                continue
        
        # Aggregate results using consensus
        consensus_result = asyncio.run(
            consensus_engine.aggregate_valuations(computation_id, valuations)
        )
        
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
    """Perform distributed risk assessment across XNodes"""
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
                result = asyncio.run(worker.assess_climate_risk(lat, lng))
                assessments.append(result)
            except Exception as e:
                print(f"Risk worker {worker.node_id} failed: {e}")
                continue
        
        # Aggregate results using consensus
        consensus_result = asyncio.run(
            consensus_engine.aggregate_risk_assessments(computation_id, assessments)
        )
        
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
    """Check XNode cluster health"""
    try:
        valuation_health = []
        for worker in valuation_workers:
            health = {
                'node_id': worker.node_id,
                'initialized': worker.initialized,
                'cache_size': len(worker.computation_cache),
                'status': 'healthy' if worker.initialized else 'initializing'
            }
            valuation_health.append(health)
        
        risk_health = []
        for worker in risk_workers:
            health = {
                'node_id': worker.node_id,
                'initialized': worker.initialized,
                'cache_size': len(worker.computation_cache),
                'status': 'healthy' if worker.initialized else 'initializing'
            }
            risk_health.append(health)
        
        cluster_stats = {
            'total_valuation_nodes': len(valuation_workers),
            'healthy_valuation_nodes': sum(1 for w in valuation_workers if w.initialized),
            'total_risk_nodes': len(risk_workers),
            'healthy_risk_nodes': sum(1 for w in risk_workers if w.initialized),
            'consensus_threshold': consensus_engine.threshold,
            'active_computations': len(consensus_engine.active_computations)
        }
        
        return jsonify({
            "success": True,
            "cluster_health": {
                "valuation_nodes": valuation_health,
                "risk_nodes": risk_health,
                "cluster_stats": cluster_stats,
                "overall_status": "healthy" if cluster_stats['healthy_valuation_nodes'] >= 2 and cluster_stats['healthy_risk_nodes'] >= 2 else "degraded"
            }
        })
        
    except Exception as e:
        return jsonify({"error": f"Health check failed: {str(e)}"}), 500

@xnode_bp.route('/xnode-consensus-test', methods=['POST'])
def xnode_consensus_test():
    """Test XNode consensus mechanism"""
    try:
        data = request.get_json()
        test_type = data.get('test_type', 'valuation')
        
        if test_type == 'valuation':
            # Generate mock valuation results
            mock_valuations = []
            for i, worker in enumerate(valuation_workers):
                base_value = 1000000 + random.randint(-200000, 200000)
                confidence = 0.7 + random.random() * 0.25
                
                mock_valuations.append({
                    'value': base_value,
                    'confidence': confidence,
                    'node_id': worker.node_id,
                    'computation_time': time.time()
                })
            
            computation_id = f"test_{int(time.time())}"
            consensus_result = asyncio.run(
                consensus_engine.aggregate_valuations(computation_id, mock_valuations)
            )
            
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
            consensus_result = asyncio.run(
                consensus_engine.aggregate_risk_assessments(computation_id, mock_assessments)
            )
            
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

# Initialize workers on module load
async def initialize_workers():
    """Initialize all XNode workers"""
    for worker in valuation_workers + risk_workers:
        await worker.initialize()

# Run initialization in background thread
def run_initialization():
    asyncio.run(initialize_workers())

initialization_thread = threading.Thread(target=run_initialization)
initialization_thread.daemon = True
initialization_thread.start()


        composite_risk = risk_data.get('composite', 0.25)
        # Risk adjustment between 0.7 and 1.0
        return max(0.7, 1.0 - (composite_risk * 0.3))
    
    def _calculate_confidence(self, property_data, comparables, risk_data):
        """Calculate confidence score"""
        confidence = 0.5  # Base confidence
        
        # More comparables = higher confidence
        confidence += min(0.3, len(comparables) * 0.03)
        
        # Recent comparables boost confidence
        recent_count = len([c for c in comparables if self._is_recent_sale(c.get('sale_date', ''))])
        confidence += min(0.2, recent_count * 0.04)
        
        # Complete property data
        if all(property_data.get(field) for field in ['bedrooms', 'bathrooms', 'land_size']):
            confidence += 0.1
        
        # Lower risk = higher confidence
        confidence += (1 - risk_data.get('composite', 0.25)) * 0.15
        
        return max(0.3, min(0.95, confidence))
    
    def _average_comparable_price(self, comparables):
        """Calculate average comparable price"""
        if not comparables:
            return 800000
        prices = [c.get('price', 0) for c in comparables if c.get('price', 0) > 0]
        return sum(prices) / len(prices) if prices else 800000
    
    def _get_location_score(self, address):
        """Get location premium score"""
        premium_areas = ['sydney', 'melbourne', 'toorak', 'mosman', 'double bay', 'paddington']
        address_lower = address.lower()
        return 0.8 if any(area in address_lower for area in premium_areas) else 0.5
    
    def _is_recent_sale(self, sale_date):
        """Check if sale is within last 6 months"""
        if not sale_date:
            return False
        try:
            sale = datetime.strptime(sale_date, '%Y-%m-%d')
            return (datetime.now() - sale).days < 180
        except:
            return False
    
    def _comparable_price_variance(self, comparables):
        """Calculate price variance in comparables"""
        if len(comparables) < 2:
            return 0.5
        prices = [c.get('price', 0) for c in comparables if c.get('price', 0) > 0]
        if len(prices) < 2:
            return 0.5
        mean_price = sum(prices) / len(prices)
        variance = sum((p - mean_price) ** 2 for p in prices) / len(prices)
        return min(1.0, variance / (mean_price ** 2))
    
    def _comparable_size_similarity(self, property_data, comparables):
        """Calculate size similarity with comparables"""
        prop_size = property_data.get('floor_area', 150)
        if not comparables:
            return 0.5
        
        similarities = []
        for comp in comparables:
            comp_size = comp.get('floor_area', 150)
            similarity = 1 - abs(prop_size - comp_size) / max(prop_size, comp_size)
            similarities.append(max(0, similarity))
        
        return sum(similarities) / len(similarities) if similarities else 0.5
    
    def _comparable_age_similarity(self, property_data, comparables):
        """Calculate age similarity with comparables"""
        prop_age = 2024 - property_data.get('year_built', 2000)
        if not comparables:
            return 0.5
        
        similarities = []
        for comp in comparables:
            comp_age = 2024 - comp.get('year_built', 2000)
            age_diff = abs(prop_age - comp_age)
            similarity = max(0, 1 - age_diff / 50)  # 50 year max difference
            similarities.append(similarity)
        
        return sum(similarities) / len(similarities) if similarities else 0.5
    
    def _comparable_type_match(self, property_data, comparables):
        """Calculate property type match ratio"""
        prop_type = property_data.get('property_type', 'House')
        if not comparables:
            return 0.5
        
        matches = sum(1 for c in comparables if c.get('property_type') == prop_type)
        return matches / len(comparables)
    
    def _median_comparable_price(self, comparables):
        """Calculate median comparable price"""
        if not comparables:
            return 800000
        prices = sorted([c.get('price', 0) for c in comparables if c.get('price', 0) > 0])
        if not prices:
            return 800000
        n = len(prices)
        return prices[n // 2] if n % 2 == 1 else (prices[n // 2 - 1] + prices[n // 2]) / 2
    
    def _comparable_distance_factor(self, comparables):
        """Mock distance factor for comparables"""
        return 0.8 if len(comparables) > 3 else 0.6
    
    def _comparable_market_time(self, comparables):
        """Calculate average market time for comparables"""
        if not comparables:
            return 0.5
        
        market_times = []
        for comp in comparables:
            days_on_market = comp.get('days_on_market', 45)
            normalized_time = min(1.0, days_on_market / 100)
            market_times.append(1 - normalized_time)  # Faster sale = better
        
        return sum(market_times) / len(market_times) if market_times else 0.5
    
    def _comparable_quality_score(self, comparables):
        """Calculate overall quality score of comparables"""
        if not comparables:
            return 0.5
        
        quality_scores = []
        for comp in comparables:
            score = 0.5  # Base score
            
            # Recent sale bonus
            if self._is_recent_sale(comp.get('sale_date', '')):
                score += 0.2
            
            # Complete data bonus
            if all(comp.get(field) for field in ['bedrooms', 'bathrooms', 'price']):
                score += 0.2
            
            # Reasonable price range
            price = comp.get('price', 0)
            if 200000 <= price <= 5000000:
                score += 0.1
            
            quality_scores.append(min(1.0, score))
        
        return sum(quality_scores) / len(quality_scores) if quality_scores else 0.5

class RiskWorker(XNodeWorker):
    """Distributed risk assessment worker"""
    
    async def assess_climate_risk(self, lat, lng):
        """Distributed climate risk assessment"""
        try:
            risks = {
                'flood': self._calculate_flood_risk(lat, lng),
                'fire': self._calculate_fire_risk(lat, lng),
                'coastal': self._calculate_coastal_risk(lat, lng),
                'subsidence': self._calculate_subsidence_risk(lat, lng),
                'cyclone': self._calculate_cyclone_risk(lat),
                'heatwave': self._calculate_heatwave_risk(lat, lng)
            }
            
            risks['composite'] = self._calculate_composite_risk(risks)
            confidence = self._calculate_risk_confidence(lat, lng)
            
            return {
                'risks': risks,
                'confidence': confidence,
                'data_source': 'xnode_distributed',
                'node_id': self.node_id,
                'computation_time': time.time()
            }
            
        except Exception as e:
            print(f"Risk assessment error on node {self.node_id}: {e}")
            return {
                'risks': self._get_fallback_risks(lat, lng),
                'confidence': 0.3,
                'data_source': 'fallback',
                'node_id': self.node_id,
                'error': str(e)
            }
    
    def _calculate_flood_risk(self, lat, lng):
        """Calculate flood risk based on location"""
        coastal_factor = max(0, 1 - self._distance_from_coast(lat, lng) / 20)
        river_factor = abs(math.sin(lat * 10) * math.cos(lng * 10))
        elevation_factor = max(0, 1 - abs(lat + 33) * 0.1)
        
        return min(1.0, (coastal_factor * 0.4 + river_factor * 0.4 + elevation_factor * 0.2))
    
    def _calculate_fire_risk(self, lat, lng):
        """Calculate bushfire risk"""
        inland_factor = min(1.0, self._distance_from_coast(lat, lng) / 100)
        northern_factor = max(0, (lat + 20) / 15)
        vegetation_factor = 0.6 + random.random() * 0.4
        
        return min(1.0, (inland_factor * 0.3 + northern_factor * 0.4 + vegetation_factor * 0.3))
    
    def _calculate_coastal_risk(self, lat, lng):
        """Calculate coastal erosion risk"""
        distance = self._distance_from_coast(lat, lng)
        if distance > 10:
            return 0
        elif distance > 5:
            return 0.1
        elif distance > 1:
            return 0.3
        else:
            return 0.7
    
    def _calculate_subsidence_risk(self, lat, lng):
        """Calculate subsidence risk"""
        mining_areas = [
            (-32.5, 151.5, 0.6),  # Hunter Valley
            (-37.5, 145.0, 0.4),  # Latrobe Valley
            (-23.5, 150.5, 0.5),  # Bowen Basin
        ]
        
        base_risk = 0.1
        for mine_lat, mine_lng, risk_level in mining_areas:
            distance = math.sqrt((lat - mine_lat)**2 + (lng - mine_lng)**2)
            if distance < 2:
                base_risk += risk_level * (1 - distance / 2)
        
        return min(1.0, base_risk)
    
    def _calculate_cyclone_risk(self, lat):
        """Calculate cyclone risk based on latitude"""
        if lat > -20:
            return min(0.8, max(0.3, (lat + 20) / 15))
        elif lat > -25:
            return 0.2
        else:
            return 0.05
    
    def _calculate_heatwave_risk(self, lat, lng):
        """Calculate heatwave risk"""
        inland_factor = min(0.4, self._distance_from_coast(lat, lng) / 100)
        northern_factor = min(0.4, (35 - abs(lat)) / 20)
        base_risk = 0.2
        
        return min(1.0, base_risk + inland_factor + northern_factor)
    
    def _calculate_composite_risk(self, risks):
        """Calculate weighted composite risk"""
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
            if risk_type in risks:
                composite += risks[risk_type] * weight
        
        return composite
    
    def _calculate_risk_confidence(self, lat, lng):
        """Calculate confidence in risk assessment"""
        major_cities = [
            (-33.8688, 151.2093),  # Sydney
            (-37.8136, 144.9631),  # Melbourne
            (-27.4698, 153.0251),  # Brisbane
        ]
        
        min_distance = min(
            math.sqrt((lat - city_lat)**2 + (lng - city_lng)**2)
            for city_lat, city_lng in major_cities
        )
        
        confidence = max(0.5, 1 - min_distance / 10)
        return confidence
    
    def _distance_from_coast(self, lat, lng):
        """Calculate approximate distance from Australian coast"""
        coastal_points = [
            (-33.8688, 151.2093),  # Sydney
            (-37.8136, 144.9631),  # Melbourne
            (-31.9505, 115.8605),  # Perth
            (-27.4698, 153.0251),  # Brisbane
        ]
        
        distances = [
            math.sqrt((lat - coast_lat)**2 + (lng - coast_lng)**2) * 111
            for coast_lat, coast_lng in coastal_points
        ]
        
        return min(distances)
    
    def _get_fallback_risks(self, lat, lng):
        """Get fallback risk values"""
        return {
            'flood': 0.3,
            'fire': 0.3,
            'coastal': 0.1,
            'subsidence': 0.1,
            'cyclone': 0.1,
            'heatwave': 0.2,
            'composite': 0.25
        }

class XNodeConsensus:
    """XNode consensus mechanism for distributed computation"""
    
    def __init__(self, threshold=0.75):
        self.threshold = threshold
        self.active_computations = {}
    
    async def aggregate_valuations(self, computation_id, valuations):
        """Aggregate valuation results from multiple nodes"""
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
    
    async def aggregate_risk_assessments(self, computation_id, assessments):
        """Aggregate risk assessment results"""
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
            'data_quality': self._assess_data_quality(valid_assessments)
        }
    
    def _assess_data_quality(self, assessments):
        """Assess overall data quality"""
        live_data_count = sum(1 for a in assessments if a.get('data_source') == 'xnode_distributed')
        total_count = len(assessments)
        
        if live_data_count >= total_count * 0.8:
            return 'excellent'
        elif live_data_count >= total_count * 0.5:
            return 'good'
        elif live_data_count >= total_count * 0.3:
            return 'fair'
        else:
            return 'poor'

# Initialize XNode components
valuation_workers = [ValuationWorker(f"val_node_{i}") for i in range(3)]
risk_workers = [RiskWorker(f"risk_node_{i}") for i in range(3)]
consensus_engine = XNodeConsensus()

@xnode_bp.route('/distributed-valuation', methods=['POST'])
def distributed_valuation():
    """Perform distributed property valuation across XNodes"""
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
                result = asyncio.run(worker.calculate_valuation(
                    data['property_data'],
                    data['comparables'],
                    data['risk_data'],
                    data['market_factors']
                ))
                valuations.append(result)
            except Exception as e:
                print(f"Worker {worker.node_id} failed: {e}")
                continue
        
        # Aggregate results using consensus
        consensus_result = asyncio.run(
            consensus_engine.aggregate_valuations(computation_id, valuations)
        )
        
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
    """Perform distributed risk assessment across XNodes"""
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
                result = asyncio.run(worker.assess_climate_risk(lat, lng))
                assessments.append(result)
            except Exception as e:
                print(f"Risk worker {worker.node_id} failed: {e}")
                continue
        
        # Aggregate results using consensus
        consensus_result = asyncio.run(
            consensus_engine.aggregate_risk_assessments(computation_id, assessments)
        )
        
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
    """Check XNode cluster health"""
    try:
        valuation_health = []
        for worker in valuation_workers:
            health = {
                'node_id': worker.node_id,
                'initialized': worker.initialized,
                'cache_size': len(worker.computation_cache),
                'status': 'healthy' if worker.initialized else 'initializing'
            }
            valuation_health.append(health)
        
        risk_health = []
        for worker in risk_workers:
            health = {
                'node_id': worker.node_id,
                'initialized': worker.initialized,
                'cache_size': len(worker.computation_cache),
                'status': 'healthy' if worker.initialized else 'initializing'
            }
            risk_health.append(health)
        
        cluster_stats = {
            'total_valuation_nodes': len(valuation_workers),
            'healthy_valuation_nodes': sum(1 for w in valuation_workers if w.initialized),
            'total_risk_nodes': len(risk_workers),
            'healthy_risk_nodes': sum(1 for w in risk_workers if w.initialized),
            'consensus_threshold': consensus_engine.threshold,
            'active_computations': len(consensus_engine.active_computations)
        }
        
        return jsonify({
            "success": True,
            "cluster_health": {
                "valuation_nodes": valuation_health,
                "risk_nodes": risk_health,
                "cluster_stats": cluster_stats,
                "overall_status": "healthy" if cluster_stats['healthy_valuation_nodes'] >= 2 and cluster_stats['healthy_risk_nodes'] >= 2 else "degraded"
            }
        })
        
    except Exception as e:
        return jsonify({"error": f"Health check failed: {str(e)}"}), 500

@xnode_bp.route('/xnode-consensus-test', methods=['POST'])
def xnode_consensus_test():
    """Test XNode consensus mechanism"""
    try:
        data = request.get_json()
        test_type = data.get('test_type', 'valuation')
        
        if test_type == 'valuation':
            # Generate mock valuation results
            mock_valuations = []
            for i, worker in enumerate(valuation_workers):
                base_value = 1000000 + random.randint(-200000, 200000)
                confidence = 0.7 + random.random() * 0.25
                
                mock_valuations.append({
                    'value': base_value,
                    'confidence': confidence,
                    'node_id': worker.node_id,
                    'computation_time': time.time()
                })
            
            computation_id = f"test_{int(time.time())}"
            consensus_result = asyncio.run(
                consensus_engine.aggregate_valuations(computation_id, mock_valuations)
            )
            
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
            consensus_result = asyncio.run(
                consensus_engine.aggregate_risk_assessments(computation_id, mock_assessments)
            )
            
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

# Initialize workers on module load
async def initialize_workers():
    """Initialize all XNode workers"""
    for worker in valuation_workers + risk_workers:
        await worker.initialize()

# Run initialization in background thread
def run_initialization():
    asyncio.run(initialize_workers())

initialization_thread = threading.Thread(target=run_initialization)
initialization_thread.daemon = True
initialization_thread.start()

