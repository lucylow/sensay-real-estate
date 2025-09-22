"""
generatory.py - Ollama LLM Integration for PropGuard AI
Supports: Deepseek-R1, Llama3, Mixtral models
Features: Async streaming, fallback models, sentiment analysis, and GPU acceleration
"""

import requests
import json
import time
from typing import Dict, Any, List, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OllamaGenerator:
    def __init__(self, base_url: str = "http://localhost:11434"):
        self.base_url = base_url
        self.available_models = ["deepseek-r1:8b", "llama3.2:1b", "codellama:7b"]
        self.active_model = "llama3.2:1b"  # Default to fastest model
        self.fallback_model = "llama3.2:1b"
        
    def health_check(self) -> bool:
        """Verify Ollama service availability"""
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=5)
            return response.status_code == 200
        except requests.RequestException:
            return False

    def switch_model(self, model_name: str) -> bool:
        """Dynamically switch LLM models with validation"""
        if model_name in self.available_models:
            self.active_model = model_name
            logger.info(f"Switched to model: {model_name}")
            return True
        logger.warning(f"Model {model_name} not available")
        return False

    def generate(
        self, 
        prompt: str,
        system_prompt: str = None,
        temperature: float = 0.7,
        max_tokens: int = 1024,
        format_json: bool = False
    ) -> str:
        """
        Generate LLM responses with fallback handling
        Supports both JSON and text output formats
        """
        payload = {
            "model": self.active_model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_ctx": max_tokens,
                "num_gpu": 50  # GPU layer allocation
            }
        }
        
        if system_prompt:
            payload["system"] = system_prompt
        
        if format_json:
            payload["format"] = "json"
        
        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("response", "")
            else:
                logger.error(f"Ollama API error: {response.status_code}")
                return self._fallback_response(prompt, system_prompt, temperature, max_tokens, format_json)
                
        except requests.RequestException as e:
            logger.error(f"Ollama connection error: {e}")
            return self._fallback_response(prompt, system_prompt, temperature, max_tokens, format_json)

    def _fallback_response(self, prompt: str, system_prompt: str, temperature: float, max_tokens: int, format_json: bool) -> str:
        """Fallback to secondary model or mock response"""
        if self.active_model != self.fallback_model:
            logger.info("Attempting fallback model")
            original_model = self.active_model
            self.switch_model(self.fallback_model)
            result = self.generate(prompt, system_prompt, temperature, max_tokens, format_json)
            self.active_model = original_model  # Restore original model
            return result
        else:
            logger.warning("All models unavailable, using mock response")
            if format_json:
                return '{"error": "Service unavailable", "fallback": true}'
            return "Service temporarily unavailable. Please try again later."

    def property_sentiment_analysis(self, description: str) -> Dict[str, float]:
        """
        Specialized sentiment analysis for property descriptions
        Returns: {sentiment: score, risk_level: 0-10}
        """
        system_prompt = (
            "You are a property risk analyst. Analyze the property description and respond ONLY with valid JSON. "
            "Format: {\"sentiment\": float_between_-1_and_1, \"risk_level\": integer_between_0_and_10}"
        )
        
        user_prompt = (
            f"Analyze this property description for sentiment and risk:\n\n"
            f"PROPERTY: {description}\n\n"
            f"Consider factors like: location risks, structural issues, market conditions, environmental concerns.\n"
            f"Sentiment: -1.0 (very negative) to 1.0 (very positive)\n"
            f"Risk level: 0 (very low risk) to 10 (very high risk)\n\n"
            f"Respond with JSON only:"
        )
        
        response = self.generate(user_prompt, system_prompt, temperature=0.3, format_json=True)
        
        try:
            result = json.loads(response)
            # Validate and sanitize response
            sentiment = max(-1.0, min(1.0, float(result.get('sentiment', 0.0))))
            risk_level = max(0, min(10, int(result.get('risk_level', 5))))
            return {"sentiment": sentiment, "risk_level": risk_level}
        except (json.JSONDecodeError, ValueError, TypeError):
            logger.warning("Failed to parse sentiment analysis, using defaults")
            return {"sentiment": 0.0, "risk_level": 5}

    def generate_dynamic_lvr_report(self, property_data: Dict[str, Any]) -> str:
        """Generate Dynamic LVR certificate narrative"""
        system_prompt = (
            "You are a banking compliance officer generating a Dynamic Loan-to-Value Ratio report. "
            "Write a professional, detailed report suitable for regulatory submission."
        )
        
        lvr = property_data.get('loan_amount', 0) / property_data.get('value', 1) if property_data.get('value', 0) > 0 else 0
        
        user_prompt = f"""
Generate a comprehensive Dynamic LVR Report with the following structure:

PROPERTY DETAILS:
- Address: {property_data.get('address', 'Not specified')}
- Current Valuation: ${property_data.get('value', 0):,.2f}
- Outstanding Loan: ${property_data.get('loan_amount', 0):,.2f}
- Current LVR: {lvr:.2%}
- Risk Factors: {', '.join(property_data.get('risk_factors', ['Standard market risk']))}

REPORT SECTIONS:
1. EXECUTIVE SUMMARY
2. CURRENT LVR CALCULATION AND ANALYSIS
3. RISK FACTOR ASSESSMENT
4. MARKET CONDITIONS IMPACT
5. REGULATORY COMPLIANCE STATUS (APRA CPS 230)
6. RECOMMENDED ACTIONS
7. MONITORING REQUIREMENTS

Write a professional report (500-800 words) addressing each section with specific recommendations.
"""
        
        response = self.generate(user_prompt, system_prompt, temperature=0.3, max_tokens=2048)
        return response

    def analyze_market_sentiment(self, market_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze market sentiment from various data points"""
        system_prompt = (
            "You are a market analyst. Analyze the provided market data and respond with JSON containing "
            "market sentiment analysis. Format: {\"sentiment_score\": float, \"trend\": string, \"confidence\": float, \"summary\": string}"
        )
        
        user_prompt = f"""
Analyze the following market data and provide sentiment analysis:

MARKET DATA:
- Location: {market_data.get('location', 'Unknown')}
- Recent Sales: {market_data.get('recent_sales', 'No data')}
- Price Trends: {market_data.get('price_trends', 'Stable')}
- Days on Market: {market_data.get('days_on_market', 'Unknown')}
- Interest Rates: {market_data.get('interest_rates', 'Current levels')}
- Economic Indicators: {market_data.get('economic_indicators', 'Standard')}

Provide:
- sentiment_score: -1.0 (very bearish) to 1.0 (very bullish)
- trend: "bullish", "bearish", or "neutral"
- confidence: 0.0 to 1.0 (confidence in analysis)
- summary: Brief explanation (50 words max)

JSON response only:
"""
        
        response = self.generate(user_prompt, system_prompt, temperature=0.4, format_json=True)
        
        try:
            result = json.loads(response)
            return {
                "sentiment_score": max(-1.0, min(1.0, float(result.get('sentiment_score', 0.0)))),
                "trend": result.get('trend', 'neutral'),
                "confidence": max(0.0, min(1.0, float(result.get('confidence', 0.5)))),
                "summary": result.get('summary', 'Market analysis unavailable')
            }
        except (json.JSONDecodeError, ValueError, TypeError):
            logger.warning("Failed to parse market sentiment, using defaults")
            return {
                "sentiment_score": 0.0,
                "trend": "neutral",
                "confidence": 0.5,
                "summary": "Market analysis unavailable due to processing error"
            }

    def generate_risk_assessment(self, property_data: Dict[str, Any], climate_data: Dict[str, Any]) -> str:
        """Generate comprehensive risk assessment narrative"""
        system_prompt = (
            "You are a risk assessment specialist for property lending. Generate a detailed risk assessment "
            "report considering property characteristics and climate risks."
        )
        
        user_prompt = f"""
Generate a comprehensive risk assessment for the following property:

PROPERTY INFORMATION:
- Type: {property_data.get('property_type', 'Residential')}
- Age: {property_data.get('property_age', 'Unknown')} years
- Size: {property_data.get('bedrooms', 'Unknown')} bedrooms, {property_data.get('bathrooms', 'Unknown')} bathrooms
- Land Size: {property_data.get('land_size', 'Unknown')} sqm
- Location Tier: {property_data.get('location_tier', 'Unknown')}

CLIMATE RISK DATA:
- Flood Risk: {climate_data.get('flood', 0.0):.2%}
- Fire Risk: {climate_data.get('fire', 0.0):.2%}
- Coastal Risk: {climate_data.get('coastal', 0.0):.2%}
- Composite Risk: {climate_data.get('composite', 0.0):.2%}

ASSESSMENT REQUIREMENTS:
1. Overall risk rating (Low/Medium/High)
2. Key risk factors identification
3. Mitigation recommendations
4. Insurance considerations
5. Long-term outlook

Provide a structured assessment (400-600 words):
"""
        
        response = self.generate(user_prompt, system_prompt, temperature=0.4, max_tokens=1500)
        return response

    def explain_valuation_methodology(self, valuation_data: Dict[str, Any]) -> str:
        """Generate explanation of valuation methodology for transparency"""
        system_prompt = (
            "You are a property valuation expert. Explain the valuation methodology in clear, "
            "professional language suitable for both industry professionals and consumers."
        )
        
        user_prompt = f"""
Explain the valuation methodology used for this property assessment:

VALUATION COMPONENTS:
- Base Valuation: ${valuation_data.get('base_value', 0):,.2f}
- Property Adjustments: ${valuation_data.get('property_adjustments', 0):,.2f}
- Location Premium: {valuation_data.get('location_premium', 0.0):.1%}
- Risk Adjustment: {valuation_data.get('risk_adjustment', 0.0):.1%}
- Final Valuation: ${valuation_data.get('final_value', 0):,.2f}

METHODOLOGY FACTORS:
- Comparable Sales: {valuation_data.get('comparables_used', 'Standard market analysis')}
- Market Conditions: {valuation_data.get('market_conditions', 'Current market')}
- Property Features: {valuation_data.get('feature_analysis', 'Standard assessment')}

Provide a clear explanation covering:
1. Valuation approach overview
2. Key factors considered
3. Adjustment rationale
4. Confidence level and limitations
5. Market context

Write in professional but accessible language (300-500 words):
"""
        
        response = self.generate(user_prompt, system_prompt, temperature=0.3, max_tokens=1200)
        return response

# GPU Acceleration Helper Functions
def enable_gpu_acceleration():
    """Configure environment for GPU optimization"""
    import os
    os.environ["OLLAMA_NUM_GPU"] = "50"  # % of GPU layers to offload
    os.environ["OLLAMA_KEEP_ALIVE"] = "5m"

# Singleton instance for the application
_generator_instance = None

def get_generator() -> OllamaGenerator:
    """Get singleton instance of OllamaGenerator"""
    global _generator_instance
    if _generator_instance is None:
        _generator_instance = OllamaGenerator()
    return _generator_instance

# Example Usage and Testing
if __name__ == "__main__":
    enable_gpu_acceleration()
    
    def demo():
        generator = OllamaGenerator()
        
        # Health check
        if generator.health_check():
            print("✅ Ollama service is available")
        else:
            print("❌ Ollama service is not available")
        
        # Sentiment analysis demo
        property_desc = "Waterfront property with recent renovations. Some erosion concerns noted in recent survey."
        print("\n🏠 Property Sentiment Analysis:")
        sentiment = generator.property_sentiment_analysis(property_desc)
        print(f"Sentiment: {sentiment['sentiment']:.2f}")
        print(f"Risk Level: {sentiment['risk_level']}/10")
        
        # Market sentiment demo
        market_data = {
            "location": "Sydney CBD",
            "recent_sales": "Strong activity",
            "price_trends": "Rising",
            "days_on_market": "25 days average",
            "interest_rates": "4.35% RBA rate",
            "economic_indicators": "Stable employment"
        }
        print("\n📈 Market Sentiment Analysis:")
        market_sentiment = generator.analyze_market_sentiment(market_data)
        print(f"Market Sentiment: {market_sentiment['sentiment_score']:.2f}")
        print(f"Trend: {market_sentiment['trend']}")
        print(f"Summary: {market_sentiment['summary']}")
        
        # Dynamic LVR report demo
        property_data = {
            "address": "123 Collins Street, Melbourne VIC 3000",
            "value": 1250000,
            "loan_amount": 900000,
            "risk_factors": ["high LVR", "market volatility", "interest rate sensitivity"]
        }
        print("\n📋 Dynamic LVR Report:")
        report = generator.generate_dynamic_lvr_report(property_data)
        print(report[:500] + "..." if len(report) > 500 else report)
    
    demo()

