"""
Example usage of Realty Base AU API integration with PropGuard AI
This demonstrates how to use the new API endpoints
"""

import requests
import json

# PropGuard AI backend URL with Realty Base AU integration
BASE_URL = "https://9yhyi3c8nkjv.manus.space/api/realty"

def test_realty_integration():
    """Test the Realty Base AU integration"""
    
    print("🏠 Testing PropGuard AI + Realty Base AU Integration")
    print("=" * 60)
    
    # 1. Check integration health
    print("\n1. Checking integration health...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        health_data = response.json()
        print(f"✅ Health Status: {health_data.get('status', 'unknown')}")
        print(f"   API Key Configured: {health_data.get('api_key_configured', False)}")
        print(f"   Cache Size: {health_data.get('cache_size', 0)}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
    
    # 2. Search for properties in Sydney
    print("\n2. Searching for properties in Sydney...")
    try:
        search_payload = {
            "location": "Sydney",
            "property_type": "for-sale",
            "min_price": 800000,
            "max_price": 1500000,
            "bedrooms": 3,
            "limit": 5
        }
        
        response = requests.post(f"{BASE_URL}/search", json=search_payload)
        search_results = response.json()
        
        if search_results.get('success'):
            properties = search_results.get('properties', [])
            print(f"✅ Found {len(properties)} properties")
            
            for i, prop in enumerate(properties[:3]):  # Show first 3
                print(f"\n   Property {i+1}:")
                print(f"   Address: {prop.get('address', 'N/A')}")
                print(f"   Price: ${prop.get('price', 0):,}")
                print(f"   Bedrooms: {prop.get('bedrooms', 'N/A')}")
                print(f"   Bathrooms: {prop.get('bathrooms', 'N/A')}")
                
                # PropGuard AI enhancements
                valuation = prop.get('propguard_valuation', {})
                risk = prop.get('propguard_risk', {})
                
                if valuation:
                    print(f"   🤖 AI Valuation: ${valuation.get('ai_valuation', 0):,}")
                    print(f"   📊 Confidence: {valuation.get('confidence_score', 0):.2f}")
                
                if risk:
                    print(f"   ⚠️ Risk Score: {risk.get('composite_risk', 0):.2f}")
                    print(f"   🏆 Risk Grade: {risk.get('risk_grade', 'N/A')}")
        else:
            print(f"❌ Search failed: {search_results.get('error', 'Unknown error')}")
            
    except Exception as e:
        print(f"❌ Property search failed: {e}")
    
    # 3. Get detailed property analysis (if we have a listing ID)
    print("\n3. Getting detailed property analysis...")
    try:
        # This would use a real listing ID from the search results
        # For demo purposes, we'll use a mock ID
        listing_id = "mock-listing-12345"
        
        response = requests.get(f"{BASE_URL}/property/{listing_id}")
        if response.status_code == 200:
            property_details = response.json()
            
            if property_details.get('success'):
                details = property_details.get('property_details', {})
                print(f"✅ Property details retrieved")
                print(f"   Address: {details.get('address', 'N/A')}")
                
                # PropGuard AI analysis
                valuation = details.get('propguard_valuation', {})
                risk = details.get('propguard_risk', {})
                market = details.get('propguard_market_sentiment', {})
                compliance = details.get('propguard_compliance', {})
                
                if valuation:
                    print(f"\n   🤖 AI VALUATION:")
                    print(f"   Value: ${valuation.get('ai_valuation', 0):,}")
                    print(f"   Range: ${valuation.get('valuation_range', {}).get('min', 0):,} - ${valuation.get('valuation_range', {}).get('max', 0):,}")
                    print(f"   Confidence: {valuation.get('confidence_score', 0):.2f}")
                
                if risk:
                    print(f"\n   ⚠️ RISK ASSESSMENT:")
                    print(f"   Composite Risk: {risk.get('composite_risk', 0):.2f}")
                    print(f"   Risk Grade: {risk.get('risk_grade', 'N/A')}")
                    
                    climate_risks = risk.get('climate_risks', {})
                    if climate_risks:
                        print(f"   Flood Risk: {climate_risks.get('flood', 0):.2f}")
                        print(f"   Fire Risk: {climate_risks.get('fire', 0):.2f}")
                        print(f"   Coastal Risk: {climate_risks.get('coastal', 0):.2f}")
                
                if market:
                    print(f"\n   📈 MARKET SENTIMENT:")
                    print(f"   Sentiment Score: {market.get('sentiment_score', 0):.2f}")
                    print(f"   Trend: {market.get('trend', 'N/A')}")
                    print(f"   Confidence: {market.get('confidence', 0):.2f}")
                
                if compliance:
                    print(f"\n   📋 APRA COMPLIANCE:")
                    print(f"   CPS 230 Compliant: {compliance.get('apra_cps230_compliant', False)}")
                    print(f"   Compliance Score: {compliance.get('compliance_score', 0):.2f}")
            else:
                print(f"❌ Property details failed: {property_details.get('error', 'Unknown error')}")
        else:
            print(f"❌ Property details request failed with status {response.status_code}")
            
    except Exception as e:
        print(f"❌ Property details failed: {e}")
    
    # 4. Generate valuation report
    print("\n4. Generating comprehensive valuation report...")
    try:
        report_payload = {
            "listing_id": "mock-listing-12345",
            "loan_amount": 1200000,
            "include_blockchain": True
        }
        
        response = requests.post(f"{BASE_URL}/valuation-report", json=report_payload)
        if response.status_code == 200:
            report_data = response.json()
            
            if report_data.get('success'):
                report = report_data.get('valuation_report', {})
                print(f"✅ Valuation report generated")
                print(f"   Report ID: {report_data.get('report_id', 'N/A')}")
                
                # LVR Analysis
                lvr_analysis = report.get('lvr_analysis', {})
                if lvr_analysis:
                    print(f"\n   💰 LVR ANALYSIS:")
                    print(f"   Loan Amount: ${lvr_analysis.get('loan_amount', 0):,}")
                    print(f"   Property Value: ${lvr_analysis.get('property_value', 0):,}")
                    print(f"   LVR Ratio: {lvr_analysis.get('lvr_percentage', 0):.1f}%")
                    print(f"   APRA Compliant: {lvr_analysis.get('apra_compliant', False)}")
                    print(f"   Risk Category: {lvr_analysis.get('risk_category', 'N/A')}")
                
                # Blockchain Certificate
                blockchain_cert = report.get('blockchain_certificate', {})
                if blockchain_cert:
                    print(f"\n   ⛓️ BLOCKCHAIN CERTIFICATE:")
                    print(f"   Certificate ID: {blockchain_cert.get('certificate_id', 'N/A')}")
                    print(f"   Blockchain Hash: {blockchain_cert.get('blockchain_hash', 'N/A')}")
            else:
                print(f"❌ Report generation failed: {report_data.get('error', 'Unknown error')}")
        else:
            print(f"❌ Report request failed with status {response.status_code}")
            
    except Exception as e:
        print(f"❌ Report generation failed: {e}")
    
    # 5. Market analysis
    print("\n5. Performing market analysis...")
    try:
        market_payload = {
            "location": "Melbourne",
            "property_type": "house",
            "analysis_depth": "comprehensive"
        }
        
        response = requests.post(f"{BASE_URL}/market-analysis", json=market_payload)
        if response.status_code == 200:
            market_data = response.json()
            
            if market_data.get('success'):
                analysis = market_data.get('market_analysis', {})
                metrics = analysis.get('metrics', {})
                
                print(f"✅ Market analysis completed for {analysis.get('location', 'N/A')}")
                
                if metrics:
                    print(f"\n   📊 MARKET METRICS:")
                    print(f"   Average Sold Price: ${metrics.get('average_sold_price', 0):,}")
                    print(f"   Average Current Price: ${metrics.get('average_current_price', 0):,}")
                    print(f"   Price Growth: {metrics.get('price_growth_percentage', 0):.2f}%")
                    print(f"   Days on Market: {metrics.get('average_days_on_market', 0)}")
                    print(f"   Market Activity: {metrics.get('market_activity_ratio', 0):.2f}")
                
                ai_insights = analysis.get('ai_insights', {})
                if ai_insights:
                    print(f"\n   🤖 AI MARKET INSIGHTS:")
                    print(f"   Sentiment: {ai_insights.get('sentiment_score', 0):.2f}")
                    print(f"   Trend: {ai_insights.get('trend', 'N/A')}")
                    print(f"   Summary: {ai_insights.get('summary', 'N/A')}")
            else:
                print(f"❌ Market analysis failed: {market_data.get('error', 'Unknown error')}")
        else:
            print(f"❌ Market analysis request failed with status {response.status_code}")
            
    except Exception as e:
        print(f"❌ Market analysis failed: {e}")
    
    print("\n" + "=" * 60)
    print("🎉 PropGuard AI + Realty Base AU Integration Test Complete!")
    print("\nAvailable API Endpoints:")
    print("• GET  /api/realty/health - Check integration health")
    print("• POST /api/realty/search - Search properties")
    print("• GET  /api/realty/property/<id> - Get property details")
    print("• POST /api/realty/property-history - Get property history")
    print("• POST /api/realty/market-analysis - Market analysis")
    print("• POST /api/realty/valuation-report - Generate reports")
    print("• POST /api/realty/bulk-analysis - Bulk property analysis")
    print("• GET  /api/realty/cache/status - Cache status")
    print("• POST /api/realty/cache/clear - Clear cache")

def example_frontend_integration():
    """Example of how to integrate with frontend"""
    
    print("\n🖥️ Frontend Integration Example:")
    print("=" * 40)
    
    frontend_code = '''
    // Frontend JavaScript integration example
    
    class PropGuardRealtyAPI {
        constructor() {
            this.baseURL = 'https://9yhyi3c8nkjv.manus.space/api/realty';
        }
        
        async searchProperties(searchParams) {
            const response = await fetch(`${this.baseURL}/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchParams)
            });
            return response.json();
        }
        
        async getPropertyDetails(listingId) {
            const response = await fetch(`${this.baseURL}/property/${listingId}`);
            return response.json();
        }
        
        async generateReport(reportParams) {
            const response = await fetch(`${this.baseURL}/valuation-report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reportParams)
            });
            return response.json();
        }
    }
    
    // Usage example
    const api = new PropGuardRealtyAPI();
    
    // Search for properties
    const searchResults = await api.searchProperties({
        location: 'Sydney',
        property_type: 'for-sale',
        min_price: 800000,
        max_price: 1500000,
        bedrooms: 3
    });
    
    // Get detailed analysis
    const propertyDetails = await api.getPropertyDetails('listing-123');
    
    // Generate comprehensive report
    const report = await api.generateReport({
        listing_id: 'listing-123',
        loan_amount: 1200000,
        include_blockchain: true
    });
    '''
    
    print(frontend_code)

if __name__ == "__main__":
    test_realty_integration()
    example_frontend_integration()

