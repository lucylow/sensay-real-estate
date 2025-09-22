from flask import Blueprint, request, jsonify
import json
import time
from datetime import datetime
from src.generatory import get_generator

llm_bp = Blueprint('llm', __name__)

# Initialize Ollama generator
generator = get_generator()

@llm_bp.route('/health', methods=['GET'])
def llm_health():
    """Check LLM service health and available models"""
    try:
        is_healthy = generator.health_check()
        
        return jsonify({
            "success": True,
            "llm_status": "healthy" if is_healthy else "unavailable",
            "active_model": generator.active_model,
            "available_models": generator.available_models,
            "fallback_model": generator.fallback_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"LLM health check failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/switch-model', methods=['POST'])
def switch_model():
    """Switch active LLM model"""
    try:
        data = request.get_json()
        model_name = data.get('model_name')
        
        if not model_name:
            return jsonify({"error": "model_name is required"}), 400
        
        success = generator.switch_model(model_name)
        
        return jsonify({
            "success": success,
            "active_model": generator.active_model,
            "message": f"Switched to {model_name}" if success else f"Failed to switch to {model_name}",
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Model switch failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/property-sentiment', methods=['POST'])
def property_sentiment():
    """Analyze property description sentiment and risk"""
    try:
        data = request.get_json()
        description = data.get('description')
        
        if not description:
            return jsonify({"error": "description is required"}), 400
        
        # Perform sentiment analysis
        sentiment_result = generator.property_sentiment_analysis(description)
        
        return jsonify({
            "success": True,
            "sentiment_analysis": sentiment_result,
            "description": description,
            "model_used": generator.active_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Sentiment analysis failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/market-sentiment', methods=['POST'])
def market_sentiment():
    """Analyze market sentiment from market data"""
    try:
        data = request.get_json()
        market_data = data.get('market_data', {})
        
        # Perform market sentiment analysis
        sentiment_result = generator.analyze_market_sentiment(market_data)
        
        return jsonify({
            "success": True,
            "market_sentiment": sentiment_result,
            "input_data": market_data,
            "model_used": generator.active_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Market sentiment analysis failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/generate-lvr-report', methods=['POST'])
def generate_lvr_report():
    """Generate Dynamic LVR certificate report"""
    try:
        data = request.get_json()
        property_data = data.get('property_data', {})
        
        if not property_data:
            return jsonify({"error": "property_data is required"}), 400
        
        # Generate LVR report
        report = generator.generate_dynamic_lvr_report(property_data)
        
        return jsonify({
            "success": True,
            "lvr_report": report,
            "property_data": property_data,
            "model_used": generator.active_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"LVR report generation failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/risk-assessment', methods=['POST'])
def risk_assessment():
    """Generate comprehensive risk assessment narrative"""
    try:
        data = request.get_json()
        property_data = data.get('property_data', {})
        climate_data = data.get('climate_data', {})
        
        if not property_data:
            return jsonify({"error": "property_data is required"}), 400
        
        # Generate risk assessment
        assessment = generator.generate_risk_assessment(property_data, climate_data)
        
        return jsonify({
            "success": True,
            "risk_assessment": assessment,
            "property_data": property_data,
            "climate_data": climate_data,
            "model_used": generator.active_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Risk assessment failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/explain-valuation', methods=['POST'])
def explain_valuation():
    """Generate explanation of valuation methodology"""
    try:
        data = request.get_json()
        valuation_data = data.get('valuation_data', {})
        
        if not valuation_data:
            return jsonify({"error": "valuation_data is required"}), 400
        
        # Generate valuation explanation
        explanation = generator.explain_valuation_methodology(valuation_data)
        
        return jsonify({
            "success": True,
            "valuation_explanation": explanation,
            "valuation_data": valuation_data,
            "model_used": generator.active_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Valuation explanation failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/generate-text', methods=['POST'])
def generate_text():
    """General text generation endpoint"""
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        system_prompt = data.get('system_prompt')
        temperature = data.get('temperature', 0.7)
        max_tokens = data.get('max_tokens', 1024)
        format_json = data.get('format_json', False)
        
        if not prompt:
            return jsonify({"error": "prompt is required"}), 400
        
        # Generate text
        response = generator.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=temperature,
            max_tokens=max_tokens,
            format_json=format_json
        )
        
        return jsonify({
            "success": True,
            "generated_text": response,
            "parameters": {
                "prompt": prompt,
                "system_prompt": system_prompt,
                "temperature": temperature,
                "max_tokens": max_tokens,
                "format_json": format_json
            },
            "model_used": generator.active_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Text generation failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/comprehensive-analysis', methods=['POST'])
def comprehensive_analysis():
    """Perform comprehensive property analysis using multiple LLM capabilities"""
    try:
        data = request.get_json()
        property_data = data.get('property_data', {})
        market_data = data.get('market_data', {})
        climate_data = data.get('climate_data', {})
        
        if not property_data:
            return jsonify({"error": "property_data is required"}), 400
        
        # Perform multiple analyses
        results = {}
        
        # Property sentiment analysis
        if property_data.get('description'):
            results['property_sentiment'] = generator.property_sentiment_analysis(
                property_data['description']
            )
        
        # Market sentiment analysis
        if market_data:
            results['market_sentiment'] = generator.analyze_market_sentiment(market_data)
        
        # Risk assessment
        if climate_data:
            results['risk_assessment'] = generator.generate_risk_assessment(
                property_data, climate_data
            )
        
        # LVR report if loan amount provided
        if property_data.get('loan_amount') and property_data.get('value'):
            results['lvr_report'] = generator.generate_dynamic_lvr_report(property_data)
        
        # Valuation explanation if valuation data provided
        valuation_data = data.get('valuation_data')
        if valuation_data:
            results['valuation_explanation'] = generator.explain_valuation_methodology(
                valuation_data
            )
        
        return jsonify({
            "success": True,
            "comprehensive_analysis": results,
            "input_data": {
                "property_data": property_data,
                "market_data": market_data,
                "climate_data": climate_data,
                "valuation_data": valuation_data
            },
            "model_used": generator.active_model,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Comprehensive analysis failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@llm_bp.route('/model-performance', methods=['GET'])
def model_performance():
    """Get model performance metrics and statistics"""
    try:
        # Simulate performance metrics (in real implementation, track actual metrics)
        performance_data = {
            "active_model": generator.active_model,
            "model_metrics": {
                "average_response_time": "2.3s",
                "success_rate": "98.7%",
                "tokens_per_second": 45,
                "gpu_utilization": "67%",
                "memory_usage": "8.2GB"
            },
            "request_statistics": {
                "total_requests": 1247,
                "successful_requests": 1231,
                "failed_requests": 16,
                "average_tokens_generated": 342
            },
            "model_availability": {
                model: generator.health_check() for model in generator.available_models
            },
            "last_updated": datetime.now().isoformat()
        }
        
        return jsonify({
            "success": True,
            "performance_data": performance_data
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Performance metrics failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

