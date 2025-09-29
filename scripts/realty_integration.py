"""
Flask routes for Realty Base AU API integration with PropGuard AI
"""

from flask import Blueprint, request, jsonify
import os
import json
from datetime import datetime
from src.services.realty_base_au import RealtyBaseAUService
from src.generatory import get_generator

realty_bp = Blueprint('realty', __name__)

# Initialize services
RAPIDAPI_KEY = os.getenv('RAPIDAPI_KEY', 'your-rapidapi-key-here')
realty_service = RealtyBaseAUService(RAPIDAPI_KEY)
generator = get_generator()

@realty_bp.route('/health', methods=['GET'])
def realty_health():
    """Check Realty Base AU integration health"""
    try:
        # Test API connectivity
        test_search = realty_service.search_properties(location="Sydney", limit=1)
        
        return jsonify({
            "success": True,
            "service": "Realty Base AU Integration",
            "status": "operational",
            "api_key_configured": bool(RAPIDAPI_KEY and RAPIDAPI_KEY != 'your-rapidapi-key-here'),
            "cache_size": len(realty_service.cache),
            "test_search_success": bool(test_search),
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "service": "Realty Base AU Integration",
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@realty_bp.route('/search', methods=['POST'])
def search_properties():
    """
    Search for properties using Realty Base AU API
    
    Request body:
    {
        "location": "Sydney",
        "property_type": "for-sale",
        "min_price": 500000,
        "max_price": 1500000,
        "bedrooms": 3,
        "bathrooms": 2,
        "limit": 20
    }
    """
    try:
        data = request.get_json() or {}
        
        # Extract search parameters
        location = data.get('location')
        property_type = data.get('property_type', 'for-sale')
        min_price = data.get('min_price')
        max_price = data.get('max_price')
        bedrooms = data.get('bedrooms')
        bathrooms = data.get('bathrooms')
        limit = data.get('limit', 20)
        
        if not location:
            return jsonify({
                "success": False,
                "error": "Location parameter is required"
            }), 400
        
        # Search properties
        search_results = realty_service.search_properties(
            location=location,
            property_type=property_type,
            min_price=min_price,
            max_price=max_price,
            bedrooms=bedrooms,
            bathrooms=bathrooms,
            limit=limit
        )
        
        # Enhance results with PropGuard AI analysis
        enhanced_results = []
        properties = search_results.get('properties', [])
        
        for property_data in properties[:10]:  # Limit enhancement to first 10 for performance
            try:
                enhanced_property = realty_service.enhance_property_data(property_data)
                enhanced_results.append(enhanced_property)
            except Exception as e:
                # Include original property if enhancement fails
                property_data['enhancement_error'] = str(e)
                enhanced_results.append(property_data)
        
        return jsonify({
            "success": True,
            "search_parameters": {
                "location": location,
                "property_type": property_type,
                "min_price": min_price,
                "max_price": max_price,
                "bedrooms": bedrooms,
                "bathrooms": bathrooms,
                "limit": limit
            },
            "total_results": len(properties),
            "enhanced_results": len(enhanced_results),
            "properties": enhanced_results,
            "raw_results": search_results,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Property search failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@realty_bp.route('/property/<listing_id>', methods=['GET'])
def get_property_details(listing_id):
    """Get detailed property information with PropGuard AI enhancement"""
    try:
        # Get property details from Realty Base AU
        property_details = realty_service.get_property_details(listing_id)
        
        # Enhance with PropGuard AI analysis
        enhanced_details = realty_service.enhance_property_data(property_details)
        
        # Generate AI-powered insights using LLM
        try:
            property_description = enhanced_details.get('description', '')
            if property_description:
                ai_insights = generator.property_sentiment_analysis(property_description)
                enhanced_details['ai_insights'] = ai_insights
        except Exception as e:
            enhanced_details['ai_insights_error'] = str(e)
        
        return jsonify({
            "success": True,
            "listing_id": listing_id,
            "property_details": enhanced_details,
            "propguard_enhanced": True,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to get property details: {str(e)}",
            "listing_id": listing_id,
            "timestamp": datetime.now().isoformat()
        }), 500

@realty_bp.route('/property-history', methods=['POST'])
def get_property_history():
    """
    Get property history and sold data
    
    Request body:
    {
        "address": "123 Collins Street, Melbourne VIC 3000"
    }
    """
    try:
        data = request.get_json() or {}
        address = data.get('address')
        
        if not address:
            return jsonify({
                "success": False,
                "error": "Address parameter is required"
            }), 400
        
        # Get property history
        history_data = realty_service.get_property_history(address)
        
        # Analyze historical trends with AI
        try:
            if history_data.get('sales_history'):
                trend_analysis = generator.analyze_market_sentiment({
                    'address': address,
                    'sales_history': history_data['sales_history']
                })
                history_data['trend_analysis'] = trend_analysis
        except Exception as e:
            history_data['trend_analysis_error'] = str(e)
        
        return jsonify({
            "success": True,
            "address": address,
            "history_data": history_data,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to get property history: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@realty_bp.route('/market-analysis', methods=['POST'])
def market_analysis():
    """
    Comprehensive market analysis for a location
    
    Request body:
    {
        "location": "Sydney",
        "property_type": "house",
        "analysis_depth": "comprehensive"
    }
    """
    try:
        data = request.get_json() or {}
        location = data.get('location')
        property_type = data.get('property_type', 'house')
        analysis_depth = data.get('analysis_depth', 'standard')
        
        if not location:
            return jsonify({
                "success": False,
                "error": "Location parameter is required"
            }), 400
        
        # Get sold properties for market analysis
        sold_properties = realty_service.get_sold_properties(location, limit=50)
        
        # Get current listings for comparison
        current_listings = realty_service.search_properties(
            location=location,
            property_type='for-sale',
            limit=30
        )
        
        # Perform comprehensive market analysis
        market_data = {
            'location': location,
            'property_type': property_type,
            'sold_properties': sold_properties,
            'current_listings': current_listings,
            'analysis_date': datetime.now().isoformat()
        }
        
        # Generate AI market insights
        try:
            market_insights = generator.analyze_market_sentiment(market_data)
            market_data['ai_insights'] = market_insights
        except Exception as e:
            market_data['ai_insights_error'] = str(e)
        
        # Calculate market metrics
        market_metrics = calculate_market_metrics(sold_properties, current_listings)
        market_data['metrics'] = market_metrics
        
        return jsonify({
            "success": True,
            "market_analysis": market_data,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Market analysis failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@realty_bp.route('/valuation-report', methods=['POST'])
def generate_valuation_report():
    """
    Generate comprehensive PropGuard AI valuation report
    
    Request body:
    {
        "listing_id": "12345",
        "loan_amount": 800000,
        "include_blockchain": true
    }
    """
    try:
        data = request.get_json() or {}
        listing_id = data.get('listing_id')
        loan_amount = data.get('loan_amount', 0)
        include_blockchain = data.get('include_blockchain', False)
        
        if not listing_id:
            return jsonify({
                "success": False,
                "error": "listing_id parameter is required"
            }), 400
        
        # Get property details
        property_details = realty_service.get_property_details(listing_id)
        enhanced_details = realty_service.enhance_property_data(property_details)
        
        # Generate comprehensive report
        report_data = {
            'property_details': enhanced_details,
            'valuation': enhanced_details.get('propguard_valuation', {}),
            'risk_assessment': enhanced_details.get('propguard_risk', {}),
            'market_sentiment': enhanced_details.get('propguard_market_sentiment', {}),
            'compliance': enhanced_details.get('propguard_compliance', {}),
            'loan_amount': loan_amount,
            'report_date': datetime.now().isoformat()
        }
        
        # Calculate LVR if loan amount provided
        if loan_amount > 0:
            property_value = enhanced_details.get('propguard_valuation', {}).get('ai_valuation', 0)
            if property_value > 0:
                lvr = loan_amount / property_value
                report_data['lvr_analysis'] = {
                    'loan_amount': loan_amount,
                    'property_value': property_value,
                    'lvr_ratio': lvr,
                    'lvr_percentage': lvr * 100,
                    'apra_compliant': lvr <= 0.8,
                    'risk_category': 'Low' if lvr <= 0.8 else 'Medium' if lvr <= 0.9 else 'High'
                }
        
        # Generate AI report narrative
        try:
            report_narrative = generator.generate_dynamic_lvr_report(report_data)
            report_data['ai_narrative'] = report_narrative
        except Exception as e:
            report_data['ai_narrative_error'] = str(e)
        
        # Blockchain integration if requested
        if include_blockchain:
            try:
                # This would integrate with the blockchain service
                blockchain_cert = {
                    'certificate_id': f"PG-{listing_id}-{int(datetime.now().timestamp())}",
                    'property_address': enhanced_details.get('address', ''),
                    'valuation': enhanced_details.get('propguard_valuation', {}).get('ai_valuation', 0),
                    'risk_score': enhanced_details.get('propguard_risk', {}).get('composite_risk', 0),
                    'timestamp': datetime.now().isoformat(),
                    'blockchain_hash': f"0x{hash(str(report_data)) % (10**16):016x}"
                }
                report_data['blockchain_certificate'] = blockchain_cert
            except Exception as e:
                report_data['blockchain_error'] = str(e)
        
        return jsonify({
            "success": True,
            "valuation_report": report_data,
            "report_id": f"VR-{listing_id}-{int(datetime.now().timestamp())}",
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Valuation report generation failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

@realty_bp.route('/bulk-analysis', methods=['POST'])
def bulk_property_analysis():
    """
    Bulk analysis of multiple properties for portfolio assessment
    
    Request body:
    {
        "listing_ids": ["12345", "67890", "11111"],
        "analysis_type": "portfolio"
    }
    """
    try:
        data = request.get_json() or {}
        listing_ids = data.get('listing_ids', [])
        analysis_type = data.get('analysis_type', 'standard')
        
        if not listing_ids:
            return jsonify({
                "success": False,
                "error": "listing_ids parameter is required"
            }), 400
        
        if len(listing_ids) > 20:
            return jsonify({
                "success": False,
                "error": "Maximum 20 properties allowed for bulk analysis"
            }), 400
        
        # Analyze each property
        analyzed_properties = []
        total_value = 0
        total_risk = 0
        
        for listing_id in listing_ids:
            try:
                property_details = realty_service.get_property_details(listing_id)
                enhanced_details = realty_service.enhance_property_data(property_details)
                
                analyzed_properties.append({
                    'listing_id': listing_id,
                    'analysis': enhanced_details,
                    'success': True
                })
                
                # Aggregate metrics
                valuation = enhanced_details.get('propguard_valuation', {})
                risk = enhanced_details.get('propguard_risk', {})
                
                total_value += valuation.get('ai_valuation', 0)
                total_risk += risk.get('composite_risk', 0)
                
            except Exception as e:
                analyzed_properties.append({
                    'listing_id': listing_id,
                    'error': str(e),
                    'success': False
                })
        
        # Portfolio summary
        successful_analyses = [p for p in analyzed_properties if p.get('success')]
        portfolio_summary = {
            'total_properties': len(listing_ids),
            'successful_analyses': len(successful_analyses),
            'total_portfolio_value': total_value,
            'average_risk_score': total_risk / max(len(successful_analyses), 1),
            'portfolio_risk_grade': realty_service._get_risk_grade(total_risk / max(len(successful_analyses), 1)),
            'analysis_date': datetime.now().isoformat()
        }
        
        return jsonify({
            "success": True,
            "bulk_analysis": {
                'properties': analyzed_properties,
                'portfolio_summary': portfolio_summary,
                'analysis_type': analysis_type
            },
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Bulk analysis failed: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

def calculate_market_metrics(sold_properties, current_listings):
    """Calculate market metrics from sold and current property data"""
    try:
        sold_data = sold_properties.get('properties', [])
        current_data = current_listings.get('properties', [])
        
        if not sold_data or not current_data:
            return {"error": "Insufficient data for market metrics"}
        
        # Calculate average prices
        sold_prices = [p.get('price', 0) for p in sold_data if p.get('price')]
        current_prices = [p.get('price', 0) for p in current_data if p.get('price')]
        
        avg_sold_price = sum(sold_prices) / len(sold_prices) if sold_prices else 0
        avg_current_price = sum(current_prices) / len(current_prices) if current_prices else 0
        
        # Price growth calculation
        price_growth = ((avg_current_price - avg_sold_price) / avg_sold_price * 100) if avg_sold_price > 0 else 0
        
        # Days on market (simplified)
        avg_days_on_market = 35  # Mock data
        
        # Market activity
        market_activity = len(current_data) / max(len(sold_data), 1)
        
        return {
            'average_sold_price': round(avg_sold_price),
            'average_current_price': round(avg_current_price),
            'price_growth_percentage': round(price_growth, 2),
            'average_days_on_market': avg_days_on_market,
            'market_activity_ratio': round(market_activity, 2),
            'total_sold_properties': len(sold_data),
            'total_current_listings': len(current_data)
        }
        
    except Exception as e:
        return {"error": f"Market metrics calculation failed: {str(e)}"}

# Cache management endpoints
@realty_bp.route('/cache/status', methods=['GET'])
def cache_status():
    """Get cache status and statistics"""
    return jsonify({
        "success": True,
        "cache_stats": {
            "total_entries": len(realty_service.cache),
            "cache_ttl_seconds": realty_service.cache_ttl,
            "cache_keys": list(realty_service.cache.keys())[:10]  # First 10 keys
        },
        "timestamp": datetime.now().isoformat()
    })

@realty_bp.route('/cache/clear', methods=['POST'])
def clear_cache():
    """Clear the API cache"""
    try:
        cache_size_before = len(realty_service.cache)
        realty_service.cache.clear()
        
        return jsonify({
            "success": True,
            "message": f"Cache cleared. Removed {cache_size_before} entries.",
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to clear cache: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }), 500

