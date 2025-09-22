from flask import Blueprint, request, jsonify
import json
import time
import random
from datetime import datetime
from src.generatory import get_generator

propguard_bp = Blueprint('propguard', __name__)

# Initialize Ollama generator
generator = get_generator()

# Ollama API configuration
OLLAMA_BASE_URL = "http://localhost:11434"

# Mock property database
MOCK_PROPERTIES = {
    "123 collins street melbourne": {
        "id": 1,
        "address": "123 Collins Street, Melbourne VIC 3000",
        "base_value": 1250000,
        "base_risk_score": 25,
        "flood_risk": 15,
        "fire_risk": 35,
        "market_sentiment": 0.7,
        "rental_yield": 3.2,
        "insurance_premium": 1800,
        "compliance": "approved"
    },
    "456 george street sydney": {
        "id": 2,
        "address": "456 George Street, Sydney NSW 2000",
        "base_value": 1850000,
        "base_risk_score": 40,
        "flood_risk": 60,
        "fire_risk": 20,
        "market_sentiment": 0.8,
        "rental_yield": 2.8,
        "insurance_premium": 2400,
        "compliance": "review"
    },
    "789 queen street brisbane": {
        "id": 3,
        "address": "789 Queen Street, Brisbane QLD 4000",
        "base_value": 950000,
        "base_risk_score": 55,
        "flood_risk": 75,
        "fire_risk": 35,
        "market_sentiment": 0.6,
        "rental_yield": 4.1,
        "insurance_premium": 3200,
        "compliance": "approved"
    }
}

def call_ollama(model, prompt):
    """Call Ollama API with the specified model and prompt"""
    try:
        response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={
                "model": model,
                "prompt": prompt,
                "stream": False,
                "format": "json"
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get('response', '{}')
        else:
            return None
    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return None

def find_property_by_address(command):
    """Find property in mock database by address"""
    command_lower = command.lower()
    for key, property_data in MOCK_PROPERTIES.items():
        if key in command_lower or any(word in command_lower for word in key.split()):
            return property_data
    return None

@propguard_bp.route('/process-command', methods=['POST'])
def process_command():
    """Process natural language property analysis commands"""
    try:
        data = request.get_json()
        command = data.get('command', '').strip()
        
        if not command:
            return jsonify({"error": "No command provided"}), 400
        
        # Find relevant property
        property_data = find_property_by_address(command)
        
        # Create AI prompt for property analysis
        prompt = f"""
You are PropGuard AI, a real estate valuation and risk assessment system.
Analyze this command and return a JSON response with property metrics.

Command: "{command}"

Base Property Data (if found):
{json.dumps(property_data, indent=2) if property_data else "No specific property found - use Australian market averages"}

Return JSON in this exact format:
{{
  "command_summary": "Brief description of the analysis performed",
  "property_address": "Property address or 'Market Analysis'",
  "property_value": 1200000,
  "risk_score": 35,
  "flood_risk": 25,
  "fire_risk": 30,
  "market_sentiment": 0.7,
  "rental_yield": 3.2,
  "insurance_premium": 2000,
  "compliance_status": "approved",
  "explanation": "Detailed explanation of the analysis and factors considered",
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}}

Rules:
1. For specific addresses, modify the base values based on the command
2. For market analysis, use Australian property market averages
3. For risk simulations (flood, fire), increase relevant risk scores
4. For economic changes, adjust property values and market sentiment
5. Always provide realistic Australian property values (500k-3M AUD)
6. Risk scores should be 0-100 scale
7. Market sentiment should be 0-1 scale (0=negative, 1=positive)
8. Compliance status: "approved", "review", or "rejected"
"""
        
        # Call Ollama with deepseek-r1:8b for advanced analysis
        ai_response = call_ollama("deepseek-r1:8b", prompt)
        
        if ai_response:
            try:
                # Parse AI response
                analysis = json.loads(ai_response)
                
                # Validate and ensure all required fields
                required_fields = [
                    'command_summary', 'property_address', 'property_value',
                    'risk_score', 'flood_risk', 'fire_risk', 'market_sentiment',
                    'rental_yield', 'insurance_premium', 'compliance_status',
                    'explanation', 'recommendations'
                ]
                
                for field in required_fields:
                    if field not in analysis:
                        analysis[field] = get_default_value(field)
                
                return jsonify({
                    "success": True,
                    "analysis": analysis,
                    "timestamp": request.headers.get('X-Timestamp', ''),
                    "model_used": "deepseek-r1:8b"
                })
                
            except json.JSONDecodeError:
                # Fallback to mock analysis if AI response is invalid
                return generate_mock_analysis(command, property_data)
        else:
            # Fallback to mock analysis if Ollama is unavailable
            return generate_mock_analysis(command, property_data)
            
    except Exception as e:
        print(f"Error in process_command: {e}")
        return jsonify({"error": "Internal server error"}), 500

def get_default_value(field):
    """Get default values for missing fields"""
    defaults = {
        'command_summary': 'Property analysis completed',
        'property_address': 'Australian Property Market',
        'property_value': 1200000,
        'risk_score': 30,
        'flood_risk': 25,
        'fire_risk': 30,
        'market_sentiment': 0.7,
        'rental_yield': 3.2,
        'insurance_premium': 2000,
        'compliance_status': 'approved',
        'explanation': 'Analysis completed using market data and risk assessment models.',
        'recommendations': ['Consider regular property inspections', 'Review insurance coverage annually']
    }
    return defaults.get(field, '')

def generate_mock_analysis(command, property_data):
    """Generate mock analysis when AI is unavailable"""
    if property_data:
        analysis = {
            "command_summary": f"Analysis of {property_data['address']}",
            "property_address": property_data['address'],
            "property_value": property_data['base_value'] + random.randint(-100000, 100000),
            "risk_score": property_data['base_risk_score'] + random.randint(-10, 10),
            "flood_risk": property_data['flood_risk'],
            "fire_risk": property_data['fire_risk'],
            "market_sentiment": property_data['market_sentiment'],
            "rental_yield": property_data['rental_yield'],
            "insurance_premium": property_data['insurance_premium'],
            "compliance_status": property_data['compliance'],
            "explanation": f"Mock analysis for {property_data['address']} based on current market conditions.",
            "recommendations": ["Regular property maintenance", "Monitor market trends"]
        }
    else:
        analysis = {
            "command_summary": "General market analysis",
            "property_address": "Australian Property Market",
            "property_value": 1200000 + random.randint(-200000, 300000),
            "risk_score": random.randint(20, 60),
            "flood_risk": random.randint(10, 50),
            "fire_risk": random.randint(15, 45),
            "market_sentiment": round(random.uniform(0.4, 0.9), 1),
            "rental_yield": round(random.uniform(2.5, 4.5), 1),
            "insurance_premium": random.randint(1500, 3500),
            "compliance_status": random.choice(["approved", "review"]),
            "explanation": "Mock analysis based on Australian property market averages.",
            "recommendations": ["Diversify property portfolio", "Consider location-specific risks"]
        }
    
    return jsonify({
        "success": True,
        "analysis": analysis,
        "timestamp": request.headers.get('X-Timestamp', ''),
        "model_used": "mock_fallback"
    })

@propguard_bp.route('/market-sentiment', methods=['POST'])
def analyze_market_sentiment():
    """Analyze market sentiment using AI"""
    try:
        data = request.get_json()
        location = data.get('location', 'Australia')
        
        prompt = f"""
Analyze the current property market sentiment for {location}.
Return a JSON response with market analysis.

Return JSON in this format:
{{
  "location": "{location}",
  "sentiment_score": 0.75,
  "market_trend": "positive",
  "key_factors": ["Interest rates", "Population growth", "Infrastructure development"],
  "outlook": "Positive outlook with steady growth expected",
  "confidence": 0.8
}}

Consider factors like interest rates, employment, population growth, and recent market data.
Sentiment score: 0-1 (0=very negative, 1=very positive)
Market trend: "positive", "neutral", or "negative"
"""
        
        ai_response = call_ollama("llama3.2:1b", prompt)
        
        if ai_response:
            try:
                sentiment_analysis = json.loads(ai_response)
                return jsonify({
                    "success": True,
                    "sentiment": sentiment_analysis,
                    "model_used": "llama3.2:1b"
                })
            except json.JSONDecodeError:
                pass
        
        # Fallback mock sentiment
        return jsonify({
            "success": True,
            "sentiment": {
                "location": location,
                "sentiment_score": round(random.uniform(0.5, 0.9), 2),
                "market_trend": random.choice(["positive", "neutral"]),
                "key_factors": ["Interest rates", "Population growth", "Infrastructure"],
                "outlook": "Moderate growth expected in the property market",
                "confidence": 0.7
            },
            "model_used": "mock_fallback"
        })
        
    except Exception as e:
        print(f"Error in market sentiment analysis: {e}")
        return jsonify({"error": "Internal server error"}), 500

@propguard_bp.route('/compliance-check', methods=['POST'])
def check_compliance():
    """Check APRA compliance for property lending"""
    try:
        data = request.get_json()
        property_value = data.get('property_value', 1000000)
        loan_amount = data.get('loan_amount', 800000)
        
        lvr = (loan_amount / property_value) * 100 if property_value > 0 else 0
        
        # APRA compliance rules (simplified)
        if lvr > 90:
            status = "rejected"
            reason = "LVR exceeds 90% - requires mortgage insurance"
        elif lvr > 80:
            status = "review"
            reason = "LVR above 80% - additional documentation required"
        elif property_value > 5000000:
            status = "review"
            reason = "High-value property - enhanced due diligence required"
        else:
            status = "approved"
            reason = "Meets standard APRA requirements"
        
        return jsonify({
            "success": True,
            "compliance": {
                "status": status,
                "lvr": round(lvr, 2),
                "reason": reason,
                "property_value": property_value,
                "loan_amount": loan_amount,
                "apra_compliant": status == "approved"
            }
        })
        
    except Exception as e:
        print(f"Error in compliance check: {e}")
        return jsonify({"error": "Internal server error"}), 500

@propguard_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Test Ollama connection
        ollama_status = "connected"
        try:
            response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
            if response.status_code != 200:
                ollama_status = "disconnected"
        except:
            ollama_status = "disconnected"
        
        return jsonify({
            "status": "healthy",
            "ollama_status": ollama_status,
            "available_models": ["llama3.2:1b", "deepseek-r1:8b", "codellama:7b"],
            "endpoints": [
                "/api/propguard/process-command",
                "/api/propguard/market-sentiment", 
                "/api/propguard/compliance-check"
            ]
        })
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

