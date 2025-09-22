from flask import Blueprint, request, jsonify
import requests
import json
import random
import math
from datetime import datetime, timedelta

ai_features_bp = Blueprint('ai_features', __name__)

# Ollama API configuration
OLLAMA_BASE_URL = "http://localhost:11434"

class PropertyGeocoder:
    """Property geocoding service for Australian addresses"""
    
    @staticmethod
    def address_to_coords(address):
        """Convert address to coordinates with mock data for demo"""
        # Mock geocoding based on common Australian cities
        city_coords = {
            'sydney': {'lat': -33.8688, 'lng': 151.2093},
            'melbourne': {'lat': -37.8136, 'lng': 144.9631},
            'brisbane': {'lat': -27.4698, 'lng': 153.0251},
            'perth': {'lat': -31.9505, 'lng': 115.8605},
            'adelaide': {'lat': -34.9285, 'lng': 138.6007}
        }
        
        address_lower = address.lower()
        for city, coords in city_coords.items():
            if city in address_lower:
                # Add small random variation
                coords['lat'] += (random.random() - 0.5) * 0.1
                coords['lng'] += (random.random() - 0.5) * 0.1
                return {
                    'lat': coords['lat'],
                    'lng': coords['lng'],
                    'formatted_address': address
                }
        
        # Default to Sydney with variation
        return {
            'lat': -33.8688 + (random.random() - 0.5) * 0.5,
            'lng': 151.2093 + (random.random() - 0.5) * 0.5,
            'formatted_address': address
        }

class CoreLogicClient:
    """CoreLogic API client for property data"""
    
    @staticmethod
    def get_property_data(address):
        """Get property features and data"""
        coords = PropertyGeocoder.address_to_coords(address)
        
        # Determine property characteristics based on address
        is_apartment = any(word in address.lower() for word in ['apt', 'unit', '/'])
        is_premium = any(word in address.lower() for word in ['sydney', 'melbourne'])
        
        base_price = 1200000 if is_premium else 600000
        variation = (random.random() - 0.5) * 0.4
        
        return {
            'id': f"PROP-{random.randint(100000, 999999)}",
            'address': address,
            'bedrooms': random.randint(1, 2) + 1 if is_apartment else random.randint(2, 4) + 1,
            'bathrooms': random.randint(1, 2) if is_apartment else random.randint(1, 3) + 1,
            'land_size': 0 if is_apartment else random.randint(400, 800),
            'floor_area': random.randint(60, 140) if is_apartment else random.randint(120, 250),
            'year_built': random.randint(1990, 2020),
            'property_type': 'Apartment' if is_apartment else 'House',
            'last_sale_price': int(base_price * (1 + variation)),
            'last_sale_date': (datetime.now() - timedelta(days=random.randint(30, 730))).strftime('%Y-%m-%d'),
            'coordinates': coords,
            'zoning': 'Residential',
            'council_area': f"{address.split(',')[-1].strip()} Council" if ',' in address else 'Local Council'
        }
    
    @staticmethod
    def get_comparable_sales(postcode, property_type, bedrooms):
        """Get comparable sales data"""
        base_price = 1000000 if postcode.startswith(('20', '30')) else 600000
        comparables = []
        
        for i in range(5):
            variation = (random.random() - 0.5) * 0.3
            comparables.append({
                'address': f"{random.randint(1, 200)} Mock Street, {postcode}",
                'price': int(base_price * (1 + variation)),
                'sale_date': (datetime.now() - timedelta(days=random.randint(1, 365))).strftime('%Y-%m-%d'),
                'bedrooms': bedrooms,
                'bathrooms': random.randint(1, 3),
                'property_type': property_type
            })
        
        return comparables

class ClimateRiskCalculator:
    """Climate risk assessment for properties"""
    
    @staticmethod
    def get_risk_factors(lat, lng):
        """Calculate comprehensive climate risk factors"""
        # Distance from coast calculation
        coast_distance = ClimateRiskCalculator._calculate_distance_from_coast(lat, lng)
        is_northern = lat > -25
        is_coastal = coast_distance < 20
        is_urban = ClimateRiskCalculator._is_urban_area(lat, lng)
        
        # Calculate individual risk factors
        flood_risk = ClimateRiskCalculator._calculate_flood_risk(lat, lng, is_coastal)
        fire_risk = ClimateRiskCalculator._calculate_fire_risk(lat, lng, is_urban)
        coastal_risk = ClimateRiskCalculator._calculate_coastal_risk(coast_distance)
        subsidence_risk = ClimateRiskCalculator._calculate_subsidence_risk(lat, lng)
        cyclone_risk = ClimateRiskCalculator._calculate_cyclone_risk(lat)
        heatwave_risk = ClimateRiskCalculator._calculate_heatwave_risk(lat, coast_distance)
        
        risks = [flood_risk, fire_risk, coastal_risk, subsidence_risk, cyclone_risk, heatwave_risk]
        composite_risk = ClimateRiskCalculator._calculate_composite_risk(risks)
        
        return {
            'flood': flood_risk,
            'fire': fire_risk,
            'coastal_erosion': coastal_risk,
            'subsidence': subsidence_risk,
            'cyclone': cyclone_risk,
            'heatwave': heatwave_risk,
            'composite': composite_risk
        }
    
    @staticmethod
    def _calculate_distance_from_coast(lat, lng):
        """Calculate approximate distance from Australian coast"""
        australian_coasts = [
            {'lat': -33.8688, 'lng': 151.2093},  # Sydney
            {'lat': -37.8136, 'lng': 144.9631},  # Melbourne
            {'lat': -31.9505, 'lng': 115.8605},  # Perth
            {'lat': -27.4698, 'lng': 153.0251},  # Brisbane
        ]
        
        distances = []
        for coast in australian_coasts:
            distance = math.sqrt((lat - coast['lat'])**2 + (lng - coast['lng'])**2) * 111
            distances.append(distance)
        
        return min(distances)
    
    @staticmethod
    def _is_urban_area(lat, lng):
        """Check if location is in major urban area"""
        urban_centers = [
            {'lat': -33.8688, 'lng': 151.2093, 'radius': 0.5},  # Sydney
            {'lat': -37.8136, 'lng': 144.9631, 'radius': 0.5},  # Melbourne
            {'lat': -27.4698, 'lng': 153.0251, 'radius': 0.3},  # Brisbane
            {'lat': -31.9505, 'lng': 115.8605, 'radius': 0.3},  # Perth
            {'lat': -34.9285, 'lng': 138.6007, 'radius': 0.2},  # Adelaide
        ]
        
        for center in urban_centers:
            distance = math.sqrt((lat - center['lat'])**2 + (lng - center['lng'])**2)
            if distance < center['radius']:
                return True
        return False
    
    @staticmethod
    def _calculate_flood_risk(lat, lng, is_coastal):
        """Calculate flood risk based on location"""
        base_risk = 0.1
        if is_coastal:
            base_risk += 0.3
        # River proximity simulation
        if abs(math.sin(lat * 10) * math.cos(lng * 10)) > 0.5:
            base_risk += 0.2
        return min(1.0, base_risk + random.random() * 0.2)
    
    @staticmethod
    def _calculate_fire_risk(lat, lng, is_urban):
        """Calculate bushfire risk"""
        base_risk = 0.1 if is_urban else 0.3
        # Inland and dry areas have higher risk
        if lng > 140:  # Rough inland approximation
            base_risk += 0.2
        return min(1.0, base_risk + random.random() * 0.2)
    
    @staticmethod
    def _calculate_coastal_risk(coast_distance):
        """Calculate coastal erosion risk"""
        if coast_distance > 10:
            return 0
        elif coast_distance > 5:
            return 0.1
        elif coast_distance > 1:
            return 0.3
        else:
            return 0.7
    
    @staticmethod
    def _calculate_subsidence_risk(lat, lng):
        """Calculate subsidence risk"""
        base_risk = 0.1
        # Mining areas (simplified)
        if -32 < lat < -28 and 148 < lng < 152:  # Hunter Valley approximation
            base_risk += 0.4
        return min(1.0, base_risk + random.random() * 0.1)
    
    @staticmethod
    def _calculate_cyclone_risk(lat):
        """Calculate cyclone risk based on latitude"""
        if lat > -20:
            return min(0.8, max(0.3, (lat + 20) / 15))
        elif lat > -25:
            return 0.2
        else:
            return 0.05
    
    @staticmethod
    def _calculate_heatwave_risk(lat, coast_distance):
        """Calculate heatwave risk"""
        base_risk = 0.2
        base_risk += min(0.4, coast_distance / 100)  # Inland factor
        base_risk += min(0.4, (35 - abs(lat)) / 20)  # Northern factor
        return min(1.0, base_risk)
    
    @staticmethod
    def _calculate_composite_risk(risks):
        """Calculate weighted composite risk"""
        weights = [0.25, 0.25, 0.15, 0.15, 0.1, 0.1]  # flood, fire, coastal, subsidence, cyclone, heatwave
        return sum(risk * weight for risk, weight in zip(risks, weights))

def call_ollama_ai(model, prompt):
    """Enhanced Ollama API call with better error handling"""
    try:
        response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={
                "model": model,
                "prompt": prompt,
                "stream": False,
                "format": "json",
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "num_predict": 1000
                }
            },
            timeout=45
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get('response', '{}')
        else:
            print(f"Ollama API error: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return None

@ai_features_bp.route('/enhanced-analysis', methods=['POST'])
def enhanced_property_analysis():
    """Enhanced property analysis with full AI integration"""
    try:
        data = request.get_json()
        address = data.get('address', '').strip()
        
        if not address:
            return jsonify({"error": "Address is required"}), 400
        
        # Get property data
        property_data = CoreLogicClient.get_property_data(address)
        coords = property_data['coordinates']
        
        # Get climate risk data
        climate_risks = ClimateRiskCalculator.get_risk_factors(coords['lat'], coords['lng'])
        
        # Get comparable sales
        postcode = address.split()[-1] if address.split() else "2000"
        comparables = CoreLogicClient.get_comparable_sales(postcode, property_data['property_type'], property_data['bedrooms'])
        
        # Create comprehensive AI prompt
        prompt = f"""
You are PropGuard AI, an advanced property analysis system. Analyze this property comprehensively.

Property Details:
{json.dumps(property_data, indent=2)}

Climate Risk Assessment:
{json.dumps(climate_risks, indent=2)}

Comparable Sales:
{json.dumps(comparables[:3], indent=2)}

Provide a comprehensive analysis in JSON format:
{{
  "valuation": {{
    "current_value": 1200000,
    "confidence": 0.85,
    "value_range": {{"min": 1100000, "max": 1300000}},
    "methodology": "Comparative market analysis with risk adjustment"
  }},
  "risk_assessment": {{
    "overall_score": 35,
    "climate_risks": {{"flood": 25, "fire": 40, "coastal": 10}},
    "market_risks": {{"volatility": 30, "liquidity": 20}},
    "investment_grade": "B+"
  }},
  "market_analysis": {{
    "trend": "stable",
    "growth_forecast": 0.05,
    "rental_yield": 3.2,
    "days_on_market": 45
  }},
  "recommendations": [
    "Consider flood insurance due to moderate flood risk",
    "Property shows good investment potential",
    "Monitor local market trends"
  ],
  "compliance": {{
    "apra_status": "approved",
    "lending_ratio": 0.8,
    "serviceability": "good"
  }}
}}

Consider Australian property market conditions, APRA regulations, and climate change impacts.
"""
        
        # Call AI for analysis
        ai_response = call_ollama_ai("deepseek-r1:8b", prompt)
        
        if ai_response:
            try:
                analysis = json.loads(ai_response)
                
                return jsonify({
                    "success": True,
                    "property": property_data,
                    "analysis": analysis,
                    "climate_risks": climate_risks,
                    "comparables": comparables,
                    "model_used": "deepseek-r1:8b",
                    "timestamp": datetime.now().isoformat()
                })
                
            except json.JSONDecodeError:
                # Fallback to structured mock analysis
                return generate_enhanced_mock_analysis(property_data, climate_risks, comparables)
        else:
            return generate_enhanced_mock_analysis(property_data, climate_risks, comparables)
            
    except Exception as e:
        print(f"Error in enhanced analysis: {e}")
        return jsonify({"error": "Analysis failed"}), 500

@ai_features_bp.route('/market-sentiment-analysis', methods=['POST'])
def market_sentiment_analysis():
    """Advanced market sentiment analysis"""
    try:
        data = request.get_json()
        location = data.get('location', 'Australia')
        property_type = data.get('property_type', 'House')
        
        prompt = f"""
Analyze the current property market sentiment for {location}, focusing on {property_type} properties.

Consider these factors:
- Interest rate environment
- Population growth and migration
- Employment levels
- Infrastructure development
- Government policies
- Supply and demand dynamics

Return JSON analysis:
{{
  "sentiment": {{
    "score": 0.75,
    "trend": "positive",
    "confidence": 0.8
  }},
  "market_indicators": {{
    "price_growth": 0.05,
    "volume_change": 0.1,
    "inventory_levels": "low",
    "auction_clearance": 0.7
  }},
  "key_factors": [
    "Low interest rates supporting demand",
    "Strong population growth in {location}",
    "Limited housing supply"
  ],
  "forecast": {{
    "6_month": "stable_growth",
    "12_month": "moderate_growth",
    "outlook": "Positive fundamentals with some headwinds"
  }},
  "risks": [
    "Interest rate increases",
    "Economic uncertainty",
    "Oversupply in some segments"
  ]
}}
"""
        
        ai_response = call_ollama_ai("llama3.2:1b", prompt)
        
        if ai_response:
            try:
                sentiment = json.loads(ai_response)
                return jsonify({
                    "success": True,
                    "sentiment": sentiment,
                    "location": location,
                    "property_type": property_type,
                    "model_used": "llama3.2:1b"
                })
            except json.JSONDecodeError:
                pass
        
        # Fallback mock sentiment
        return jsonify({
            "success": True,
            "sentiment": generate_mock_sentiment(location, property_type),
            "location": location,
            "property_type": property_type,
            "model_used": "mock_fallback"
        })
        
    except Exception as e:
        print(f"Error in sentiment analysis: {e}")
        return jsonify({"error": "Sentiment analysis failed"}), 500

@ai_features_bp.route('/risk-simulation', methods=['POST'])
def risk_simulation():
    """Simulate various risk scenarios"""
    try:
        data = request.get_json()
        scenario = data.get('scenario', 'flood')
        property_value = data.get('property_value', 1000000)
        location = data.get('location', 'Sydney')
        
        coords = PropertyGeocoder.address_to_coords(location)
        base_risks = ClimateRiskCalculator.get_risk_factors(coords['lat'], coords['lng'])
        
        # Simulate scenario impact
        scenario_impacts = {
            'flood': {
                'probability': base_risks['flood'] * 1.5,
                'value_impact': -0.15,
                'insurance_increase': 0.5,
                'description': 'Major flood event simulation'
            },
            'fire': {
                'probability': base_risks['fire'] * 1.3,
                'value_impact': -0.25,
                'insurance_increase': 0.8,
                'description': 'Bushfire risk scenario'
            },
            'economic_downturn': {
                'probability': 0.3,
                'value_impact': -0.2,
                'insurance_increase': 0.1,
                'description': 'Economic recession impact'
            },
            'interest_rate_rise': {
                'probability': 0.6,
                'value_impact': -0.1,
                'insurance_increase': 0,
                'description': '2% interest rate increase'
            }
        }
        
        impact = scenario_impacts.get(scenario, scenario_impacts['flood'])
        
        simulated_value = property_value * (1 + impact['value_impact'])
        
        return jsonify({
            "success": True,
            "scenario": scenario,
            "simulation": {
                "original_value": property_value,
                "simulated_value": int(simulated_value),
                "value_change": impact['value_impact'],
                "probability": min(1.0, impact['probability']),
                "insurance_impact": impact['insurance_increase'],
                "description": impact['description'],
                "risk_factors": base_risks,
                "recommendations": generate_scenario_recommendations(scenario, impact)
            }
        })
        
    except Exception as e:
        print(f"Error in risk simulation: {e}")
        return jsonify({"error": "Risk simulation failed"}), 500

def generate_enhanced_mock_analysis(property_data, climate_risks, comparables):
    """Generate comprehensive mock analysis when AI is unavailable"""
    avg_comparable_price = sum(comp['price'] for comp in comparables) / len(comparables) if comparables else property_data['last_sale_price']
    
    analysis = {
        "valuation": {
            "current_value": int(avg_comparable_price * (1 + random.uniform(-0.1, 0.1))),
            "confidence": round(random.uniform(0.7, 0.9), 2),
            "value_range": {
                "min": int(avg_comparable_price * 0.9),
                "max": int(avg_comparable_price * 1.1)
            },
            "methodology": "Comparative market analysis with risk adjustment"
        },
        "risk_assessment": {
            "overall_score": int(climate_risks['composite'] * 100),
            "climate_risks": {
                "flood": int(climate_risks['flood'] * 100),
                "fire": int(climate_risks['fire'] * 100),
                "coastal": int(climate_risks['coastal_erosion'] * 100)
            },
            "market_risks": {
                "volatility": random.randint(20, 40),
                "liquidity": random.randint(15, 35)
            },
            "investment_grade": random.choice(["A-", "B+", "B", "B-"])
        },
        "market_analysis": {
            "trend": random.choice(["stable", "growing", "declining"]),
            "growth_forecast": round(random.uniform(0.02, 0.08), 3),
            "rental_yield": round(random.uniform(2.5, 4.5), 1),
            "days_on_market": random.randint(30, 60)
        },
        "recommendations": [
            "Consider comprehensive insurance coverage",
            "Monitor local market conditions",
            "Regular property maintenance recommended"
        ],
        "compliance": {
            "apra_status": random.choice(["approved", "review"]),
            "lending_ratio": round(random.uniform(0.7, 0.9), 2),
            "serviceability": random.choice(["excellent", "good", "fair"])
        }
    }
    
    return jsonify({
        "success": True,
        "property": property_data,
        "analysis": analysis,
        "climate_risks": climate_risks,
        "comparables": comparables,
        "model_used": "mock_fallback",
        "timestamp": datetime.now().isoformat()
    })

def generate_mock_sentiment(location, property_type):
    """Generate mock market sentiment data"""
    return {
        "sentiment": {
            "score": round(random.uniform(0.5, 0.9), 2),
            "trend": random.choice(["positive", "neutral", "negative"]),
            "confidence": round(random.uniform(0.6, 0.9), 2)
        },
        "market_indicators": {
            "price_growth": round(random.uniform(0.02, 0.08), 3),
            "volume_change": round(random.uniform(-0.1, 0.2), 2),
            "inventory_levels": random.choice(["low", "moderate", "high"]),
            "auction_clearance": round(random.uniform(0.6, 0.8), 2)
        },
        "key_factors": [
            f"Market conditions in {location}",
            f"Demand for {property_type} properties",
            "Economic fundamentals"
        ],
        "forecast": {
            "6_month": random.choice(["stable_growth", "moderate_growth", "stable"]),
            "12_month": random.choice(["moderate_growth", "stable", "uncertain"]),
            "outlook": f"Market outlook for {location} {property_type} properties"
        },
        "risks": [
            "Interest rate changes",
            "Economic uncertainty",
            "Supply and demand imbalances"
        ]
    }

def generate_scenario_recommendations(scenario, impact):
    """Generate recommendations based on risk scenario"""
    recommendations = {
        'flood': [
            "Consider comprehensive flood insurance",
            "Evaluate property elevation and drainage",
            "Review emergency evacuation plans"
        ],
        'fire': [
            "Implement fire-resistant landscaping",
            "Install fire detection systems",
            "Create defensible space around property"
        ],
        'economic_downturn': [
            "Maintain emergency fund reserves",
            "Consider fixed-rate financing",
            "Diversify investment portfolio"
        ],
        'interest_rate_rise': [
            "Lock in current interest rates",
            "Review loan serviceability",
            "Consider offset account strategies"
        ]
    }
    
    return recommendations.get(scenario, ["Monitor situation closely", "Seek professional advice"])

