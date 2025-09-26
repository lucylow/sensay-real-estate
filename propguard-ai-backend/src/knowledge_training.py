"""
PropGuard AI Knowledge Training System
Comprehensive framework for training product knowledge and handling knowledge bottlenecks
"""

import json
import redis
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass
from enum import Enum
import logging
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import requests

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class KnowledgeDomain(Enum):
    """Knowledge domains for PropGuard AI chatbot"""
    PROPERTY_VALUATION = "property_valuation"
    RISK_ASSESSMENT = "risk_assessment"
    REAL_ESTATE_PROCESS = "real_estate_process"
    REGULATORY_COMPLIANCE = "regulatory_compliance"
    MARKET_ANALYSIS = "market_analysis"
    INVESTMENT_STRATEGY = "investment_strategy"
    PROPGUARD_FEATURES = "propguard_features"
    SENSAY_INTEGRATION = "sensay_integration"

@dataclass
class KnowledgeItem:
    """Structured knowledge item for the chatbot"""
    id: str
    domain: KnowledgeDomain
    question: str
    answer: str
    confidence_threshold: float
    last_updated: datetime
    data_sources: List[str]
    metadata: Dict[str, Any]
    tags: List[str]
    related_items: List[str]

class ProductKnowledgeTrainer:
    """Main class for training and managing product knowledge"""
    
    def __init__(self, redis_host: str = 'localhost', redis_port: int = 6379):
        try:
            self.redis_client = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)
            # Test Redis connection
            self.redis_client.ping()
            logger.info("Connected to Redis successfully")
        except redis.ConnectionError:
            logger.warning("Redis connection failed, using in-memory storage")
            self.redis_client = None
        
        self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.knowledge_base: Dict[str, KnowledgeItem] = {}
        self.embedding_cache: Dict[str, np.ndarray] = {}
        
    def load_knowledge_base(self, knowledge_file: str = None) -> Dict[str, KnowledgeItem]:
        """Load and structure the knowledge base from JSON file or use default data"""
        try:
            if knowledge_file:
                with open(knowledge_file, 'r', encoding='utf-8') as f:
                    knowledge_data = json.load(f)
            else:
                # Use default PropGuard AI knowledge base
                knowledge_data = self._get_default_knowledge_base()
            
            for item_id, item_data in knowledge_data.items():
                self.knowledge_base[item_id] = KnowledgeItem(
                    id=item_id,
                    domain=KnowledgeDomain(item_data['domain']),
                    question=item_data['question'],
                    answer=item_data['answer'],
                    confidence_threshold=item_data.get('confidence_threshold', 0.7),
                    last_updated=datetime.fromisoformat(item_data['last_updated']),
                    data_sources=item_data.get('data_sources', []),
                    metadata=item_data.get('metadata', {}),
                    tags=item_data.get('tags', []),
                    related_items=item_data.get('related_items', [])
                )
                
            logger.info(f"Loaded {len(self.knowledge_base)} knowledge items")
            return self.knowledge_base
            
        except Exception as e:
            logger.error(f"Error loading knowledge base: {e}")
            return self._get_fallback_knowledge_base()

    def _get_default_knowledge_base(self) -> Dict[str, Any]:
        """Default PropGuard AI knowledge base"""
        return {
            "property_valuation_001": {
                "domain": "property_valuation",
                "question": "How does PropGuard AI determine property valuations?",
                "answer": "PropGuard AI uses sophisticated TensorFlow models that analyze property tracking data, real-time market trends, environmental risk maps from NASA FIRMS, and local employment data. Our multi-modal approach combines computer vision for property assessment, sentiment analysis using Ollama LLMs, and predictive modeling to provide rapid and accurate property value assessments typically within minutes.",
                "confidence_threshold": 0.8,
                "last_updated": "2024-01-15T10:30:00",
                "data_sources": ["MLS", "NASA_FIRMS", "Bureau_of_Statistics", "TensorFlow_Models"],
                "metadata": {"technical_complexity": "high", "update_frequency": "weekly"},
                "tags": ["valuation", "tensorflow", "ai", "accuracy"],
                "related_items": ["risk_assessment_001", "market_analysis_001"]
            },
            "risk_assessment_001": {
                "domain": "risk_assessment",
                "question": "What environmental risks does PropGuard AI analyze?",
                "answer": "We analyze comprehensive environmental risks including: flood risk using government environmental data and NASA FIRMS satellite data, wildfire probability models with real-time fire danger ratings, sea level rise projections for coastal properties, air quality indexes, and climate change impact assessments. This analysis helps understand long-term property viability and insurance implications.",
                "confidence_threshold": 0.75,
                "last_updated": "2024-01-10T14:20:00",
                "data_sources": ["NASA", "Environmental_Agency", "Climate_Data", "Insurance_Data"],
                "metadata": {"technical_complexity": "medium", "update_frequency": "daily"},
                "tags": ["risk", "environment", "climate", "insurance"],
                "related_items": ["property_valuation_001", "investment_strategy_001"]
            },
            "propguard_features_001": {
                "domain": "propguard_features",
                "question": "What are PropGuard AI's key features?",
                "answer": "PropGuard AI offers: 1) AI-powered property valuations using TensorFlow models, 2) Comprehensive risk assessment with environmental data, 3) Dynamic LVR certificate generation, 4) Real-time market sentiment analysis using Ollama LLMs, 5) CPS 230 compliance monitoring, 6) Blockchain-based property verification, 7) Multi-channel deployment through Sensay platform, 8) Predictive analytics for investment decisions.",
                "confidence_threshold": 0.9,
                "last_updated": "2024-01-20T09:00:00",
                "data_sources": ["PropGuard_Documentation", "Feature_Specifications"],
                "metadata": {"technical_complexity": "low", "update_frequency": "monthly"},
                "tags": ["features", "overview", "capabilities"],
                "related_items": ["sensay_integration_001", "regulatory_compliance_001"]
            },
            "sensay_integration_001": {
                "domain": "sensay_integration",
                "question": "How does PropGuard AI integrate with Sensay?",
                "answer": "PropGuard AI integrates seamlessly with the Sensay chatbot platform through RESTful APIs. The integration includes: natural language processing for property queries, multi-channel deployment (web, mobile, voice), conversation memory management, multilingual support (English, Spanish, French, Mandarin), and real-time data synchronization. Users can access all PropGuard AI features through conversational interfaces.",
                "confidence_threshold": 0.8,
                "last_updated": "2024-01-18T16:30:00",
                "data_sources": ["Sensay_API_Docs", "Integration_Specs"],
                "metadata": {"technical_complexity": "medium", "update_frequency": "weekly"},
                "tags": ["sensay", "integration", "api", "chatbot"],
                "related_items": ["propguard_features_001"]
            },
            "regulatory_compliance_001": {
                "domain": "regulatory_compliance",
                "question": "How does PropGuard AI ensure CPS 230 compliance?",
                "answer": "PropGuard AI maintains CPS 230 compliance through: comprehensive operational risk management frameworks, automated monitoring and alerting systems, detailed audit trails for all property assessments, data encryption and secure storage protocols, regular compliance reporting, and third-party security audits. All AI models are validated against regulatory standards.",
                "confidence_threshold": 0.85,
                "last_updated": "2024-01-12T11:15:00",
                "data_sources": ["CPS_230_Guidelines", "Compliance_Audit_Reports"],
                "metadata": {"technical_complexity": "high", "update_frequency": "monthly"},
                "tags": ["compliance", "cps230", "regulations", "audit"],
                "related_items": ["propguard_features_001"]
            }
        }

    def _get_fallback_knowledge_base(self) -> Dict[str, KnowledgeItem]:
        """Fallback knowledge base in case of loading errors"""
        fallback_item = KnowledgeItem(
            id="fallback_001",
            domain=KnowledgeDomain.PROPGUARD_FEATURES,
            question="What can PropGuard AI help with?",
            answer="I'm an AI-powered real estate assistant that can help with property valuations, risk assessments, market analysis, and investment guidance. Please ask me specific questions about properties or real estate.",
            confidence_threshold=0.5,
            last_updated=datetime.now(),
            data_sources=["Fallback"],
            metadata={"fallback": True},
            tags=["general", "help"],
            related_items=[]
        )
        return {"fallback_001": fallback_item}

    def generate_embeddings(self) -> Dict[str, np.ndarray]:
        """Generate embeddings for all knowledge items for semantic search"""
        embeddings = {}
        for item_id, item in self.knowledge_base.items():
            # Combine question, answer, and tags for better semantic understanding
            text = f"{item.question} {item.answer} {' '.join(item.tags)}"
            embedding = self.sentence_model.encode(text)
            embeddings[item_id] = embedding
            self.embedding_cache[item_id] = embedding
            
        # Cache embeddings in Redis if available
        if self.redis_client:
            try:
                for item_id, embedding in embeddings.items():
                    self.redis_client.setex(
                        f"embedding:{item_id}",
                        timedelta(hours=24),
                        json.dumps(embedding.tolist())
                    )
                logger.info("Cached embeddings in Redis")
            except Exception as e:
                logger.warning(f"Failed to cache embeddings in Redis: {e}")
            
        logger.info("Generated embeddings for knowledge base")
        return embeddings

    def find_best_match(self, user_query: str, domain: Optional[KnowledgeDomain] = None) -> Tuple[Optional[KnowledgeItem], float]:
        """Find the best matching knowledge item using semantic similarity"""
        try:
            query_embedding = self.sentence_model.encode(user_query)
            best_match_id = None
            best_similarity = 0.0
            
            # Filter by domain if specified
            candidate_items = self.knowledge_base.values()
            if domain:
                candidate_items = [item for item in candidate_items if item.domain == domain]
            
            for item in candidate_items:
                if item.id in self.embedding_cache:
                    item_embedding = self.embedding_cache[item.id]
                    similarity = cosine_similarity(
                        [query_embedding], 
                        [item_embedding]
                    )[0][0]
                    
                    if similarity > best_similarity and similarity > item.confidence_threshold:
                        best_similarity = similarity
                        best_match_id = item.id
            
            if best_match_id:
                return self.knowledge_base[best_match_id], best_similarity
            return None, 0.0
            
        except Exception as e:
            logger.error(f"Error finding best match: {e}")
            return None, 0.0

    def update_knowledge_item(self, item_id: str, updates: Dict[str, Any]) -> bool:
        """Update existing knowledge item"""
        try:
            if item_id in self.knowledge_base:
                item = self.knowledge_base[item_id]
                for key, value in updates.items():
                    if hasattr(item, key):
                        setattr(item, key, value)
                item.last_updated = datetime.now()
                
                # Regenerate embedding
                text = f"{item.question} {item.answer} {' '.join(item.tags)}"
                self.embedding_cache[item_id] = self.sentence_model.encode(text)
                
                logger.info(f"Updated knowledge item: {item_id}")
                return True
            return False
        except Exception as e:
            logger.error(f"Error updating knowledge item: {e}")
            return False

class KnowledgeBottleneckManager:
    """Manages and mitigates knowledge bottlenecks"""
    
    def __init__(self, trainer: ProductKnowledgeTrainer):
        self.trainer = trainer
        self.bottleneck_metrics = {
            'data_staleness': {},
            'ambiguity_issues': {},
            'edge_case_failures': {},
            'integration_errors': {},
            'bias_detection': {}
        }
        
    def check_data_freshness(self) -> Dict[str, Any]:
        """Monitor data staleness across knowledge domains"""
        freshness_report = {}
        current_time = datetime.now()
        
        for domain in KnowledgeDomain:
            domain_items = [item for item in self.trainer.knowledge_base.values() 
                          if item.domain == domain]
            if not domain_items:
                continue
                
            avg_age_days = np.mean([
                (current_time - item.last_updated).days 
                for item in domain_items
            ])
            
            stale_items = [
                item for item in domain_items 
                if (current_time - item.last_updated).days > 30
            ]
            
            freshness_report[domain.value] = {
                'average_age_days': avg_age_days,
                'total_items': len(domain_items),
                'stale_items_count': len(stale_items),
                'stale_item_ids': [item.id for item in stale_items],
                'status': 'FRESH' if avg_age_days < 14 else ('STALE' if avg_age_days > 30 else 'AGING'),
                'last_update': max(item.last_updated for item in domain_items).isoformat()
            }
            
        self.bottleneck_metrics['data_staleness'] = freshness_report
        return freshness_report

    def detect_ambiguity_patterns(self, conversation_logs: List[Dict]) -> Dict[str, Any]:
        """Analyze conversation logs to detect ambiguous queries"""
        ambiguity_patterns = {
            'low_confidence_matches': 0,
            'frequent_clarifications': 0,
            'unresolved_queries': 0,
            'common_ambiguous_phrases': [],
            'problem_queries': []
        }
        
        phrase_counter = {}
        problem_queries = []
        
        for log in conversation_logs:
            confidence_score = log.get('confidence_score', 0)
            if confidence_score < 0.5:
                ambiguity_patterns['low_confidence_matches'] += 1
                problem_queries.append({
                    'query': log.get('user_query', ''),
                    'confidence': confidence_score,
                    'timestamp': log.get('timestamp', '')
                })
                
            if log.get('clarification_required', False):
                ambiguity_patterns['frequent_clarifications'] += 1
                
            if not log.get('resolved', False):
                ambiguity_patterns['unresolved_queries'] += 1
                
                # Extract phrases that led to ambiguity
                query = log.get('user_query', '')
                phrases = self._extract_ambiguous_phrases(query)
                for phrase in phrases:
                    phrase_counter[phrase] = phrase_counter.get(phrase, 0) + 1
        
        # Get top 10 most common ambiguous phrases
        ambiguity_patterns['common_ambiguous_phrases'] = sorted(
            phrase_counter.items(), 
            key=lambda x: x[1], 
            reverse=True
        )[:10]
        
        # Store most problematic queries for analysis
        ambiguity_patterns['problem_queries'] = sorted(
            problem_queries, 
            key=lambda x: x['confidence']
        )[:20]
        
        self.bottleneck_metrics['ambiguity_issues'] = ambiguity_patterns
        return ambiguity_patterns

    def _extract_ambiguous_phrases(self, query: str) -> List[str]:
        """Extract potentially ambiguous phrases from user queries"""
        ambiguous_indicators = [
            'maybe', 'possibly', 'not sure', 'kind of', 'sort of',
            'i think', 'probably', 'approximately', 'around', 'somewhere'
        ]
        
        phrases = []
        words = query.lower().split()
        
        # Check for ambiguous indicators
        for indicator in ambiguous_indicators:
            if indicator in query.lower():
                phrases.append(indicator)
        
        # Check for vague terms
        vague_terms = ['thing', 'stuff', 'something', 'anything', 'somewhere']
        for term in vague_terms:
            if term in words:
                phrases.append(term)
                
        return phrases

    def handle_edge_cases(self, user_query: str, conversation_context: Dict) -> Dict[str, Any]:
        """Specialized handling for complex edge cases"""
        edge_case_response = {
            'is_edge_case': False,
            'handling_strategy': None,
            'response': None,
            'requires_human_escalation': False,
            'edge_case_type': None
        }
        
        # Check for regulatory/compliance queries
        if self._is_complex_regulatory_query(user_query):
            edge_case_response.update({
                'is_edge_case': True,
                'edge_case_type': 'REGULATORY_COMPLEX',
                'handling_strategy': 'REGULATORY_DISCLAIMER',
                'response': "I can provide general information about real estate regulations and CPS 230 compliance, but for specific legal advice or complex compliance matters, I recommend consulting with a qualified legal professional or compliance expert.",
                'requires_human_escalation': True
            })
            
        # Check for highly technical AI/ML queries
        elif self._is_advanced_technical_query(user_query):
            edge_case_response.update({
                'is_edge_case': True,
                'edge_case_type': 'TECHNICAL_ADVANCED',
                'handling_strategy': 'TECHNICAL_DETAIL_REDIRECTION',
                'response': "That's a detailed technical question about our AI models and algorithms. I can provide general information about how PropGuard AI works, but for specific technical details about our TensorFlow models or Ollama integration, let me connect you with our technical team.",
                'requires_human_escalation': True
            })
            
        # Check for multi-part complex queries
        elif self._is_multi_part_query(user_query):
            edge_case_response.update({
                'is_edge_case': True,
                'edge_case_type': 'MULTI_PART_COMPLEX',
                'handling_strategy': 'QUERY_DECOMPOSITION',
                'response': "That's a comprehensive question with multiple parts. Let me break this down step by step to ensure I address each aspect properly. Which part would you like me to focus on first?"
            })
            
        # Check for emotional/sensitive queries
        elif self._is_emotional_query(user_query):
            edge_case_response.update({
                'is_edge_case': True,
                'edge_case_type': 'EMOTIONAL_SENSITIVE',
                'handling_strategy': 'EMPATHETIC_RESPONSE',
                'response': "I understand this might be a stressful situation. Let me help you with the factual information you need, and I can also connect you with a human agent who can provide additional support.",
                'requires_human_escalation': True
            })
            
        return edge_case_response

    def _is_complex_regulatory_query(self, query: str) -> bool:
        regulatory_keywords = [
            'legal advice', 'compliance violation', 'lawsuit', 'regulation breach',
            'lawyer', 'attorney', 'legal requirement', 'legal obligation',
            'court', 'litigation', 'penalty', 'fine'
        ]
        return any(keyword in query.lower() for keyword in regulatory_keywords)

    def _is_advanced_technical_query(self, query: str) -> bool:
        technical_keywords = [
            'algorithm details', 'model training process', 'neural network architecture',
            'tensorflow implementation', 'model weights', 'training data specifics',
            'api source code', 'database schema', 'server architecture'
        ]
        return any(keyword in query.lower() for keyword in technical_keywords)

    def _is_multi_part_query(self, query: str) -> bool:
        separators = [' and ', ' also ', ' additionally ', ' plus ', ' furthermore ', ' moreover ']
        question_count = query.count('?')
        return any(separator in query.lower() for separator in separators) or question_count > 1

    def _is_emotional_query(self, query: str) -> bool:
        emotional_keywords = [
            'worried', 'stressed', 'anxious', 'concerned', 'scared',
            'frustrated', 'upset', 'angry', 'confused', 'overwhelmed',
            'losing money', 'financial trouble', 'desperate'
        ]
        return any(keyword in query.lower() for keyword in emotional_keywords)

    def mitigate_data_staleness(self, domain: KnowledgeDomain) -> Dict[str, Any]:
        """Implement strategies to combat data staleness"""
        mitigation_plan = {
            'domain': domain.value,
            'scheduled_updates': self._schedule_domain_updates(domain),
            'real_time_monitoring': self._setup_real_time_alerts(domain),
            'cache_optimization': self._optimize_caching_strategy(domain),
            'data_validation': self._setup_data_validation(domain)
        }
        return mitigation_plan
    
    def _schedule_domain_updates(self, domain: KnowledgeDomain) -> Dict[str, Any]:
        """Create update schedule based on domain requirements"""
        update_frequencies = {
            KnowledgeDomain.MARKET_ANALYSIS: {'frequency': 'hourly', 'priority': 'high'},
            KnowledgeDomain.PROPERTY_VALUATION: {'frequency': 'daily', 'priority': 'high'}, 
            KnowledgeDomain.RISK_ASSESSMENT: {'frequency': 'daily', 'priority': 'medium'},
            KnowledgeDomain.REGULATORY_COMPLIANCE: {'frequency': 'weekly', 'priority': 'high'},
            KnowledgeDomain.PROPGUARD_FEATURES: {'frequency': 'monthly', 'priority': 'low'},
            KnowledgeDomain.SENSAY_INTEGRATION: {'frequency': 'weekly', 'priority': 'medium'}
        }
        
        schedule = update_frequencies.get(domain, {'frequency': 'weekly', 'priority': 'low'})
        
        return {
            'domain': domain.value,
            'update_frequency': schedule['frequency'],
            'priority': schedule['priority'],
            'next_update': self._calculate_next_update(domain, schedule['frequency']),
            'data_sources': self._get_domain_data_sources(domain)
        }
    
    def _calculate_next_update(self, domain: KnowledgeDomain, frequency: str) -> str:
        """Calculate next update time based on frequency"""
        now = datetime.now()
        if frequency == 'hourly':
            next_update = now + timedelta(hours=1)
        elif frequency == 'daily':
            next_update = now + timedelta(days=1)
        elif frequency == 'weekly':
            next_update = now + timedelta(weeks=1)
        else:  # monthly
            next_update = now + timedelta(days=30)
        
        return next_update.isoformat()
    
    def _get_domain_data_sources(self, domain: KnowledgeDomain) -> List[str]:
        """Get relevant data sources for each domain"""
        domain_sources = {
            KnowledgeDomain.MARKET_ANALYSIS: ["MLS", "Market_APIs", "News_Feeds"],
            KnowledgeDomain.PROPERTY_VALUATION: ["Property_Data", "TensorFlow_Models", "Valuation_APIs"],
            KnowledgeDomain.RISK_ASSESSMENT: ["NASA_FIRMS", "Environmental_Data", "Insurance_Data"],
            KnowledgeDomain.REGULATORY_COMPLIANCE: ["Regulatory_Updates", "Compliance_Feeds"],
            KnowledgeDomain.PROPGUARD_FEATURES: ["Documentation", "Feature_Specs"],
            KnowledgeDomain.SENSAY_INTEGRATION: ["Sensay_API", "Integration_Docs"]
        }
        return domain_sources.get(domain, ["Manual_Updates"])
    
    def _setup_real_time_alerts(self, domain: KnowledgeDomain) -> Dict[str, Any]:
        """Setup real-time monitoring and alerts"""
        return {
            'domain': domain.value,
            'alert_triggers': ['data_age_exceeds_threshold', 'accuracy_drops', 'user_complaints'],
            'notification_channels': ['email', 'slack', 'dashboard'],
            'escalation_policy': 'auto_escalate_after_2_hours'
        }
    
    def _optimize_caching_strategy(self, domain: KnowledgeDomain) -> Dict[str, Any]:
        """Optimize caching based on domain characteristics"""
        cache_strategies = {
            KnowledgeDomain.MARKET_ANALYSIS: {'ttl': '1hour', 'refresh': 'proactive'},
            KnowledgeDomain.PROPERTY_VALUATION: {'ttl': '6hours', 'refresh': 'on_demand'},
            KnowledgeDomain.REGULATORY_COMPLIANCE: {'ttl': '24hours', 'refresh': 'scheduled'}
        }
        
        strategy = cache_strategies.get(domain, {'ttl': '24hours', 'refresh': 'on_demand'})
        
        return {
            'domain': domain.value,
            'cache_ttl': strategy['ttl'],
            'refresh_strategy': strategy['refresh'],
            'invalidation_triggers': ['manual_update', 'data_source_change']
        }
    
    def _setup_data_validation(self, domain: KnowledgeDomain) -> Dict[str, Any]:
        """Setup data validation rules"""
        return {
            'domain': domain.value,
            'validation_rules': ['schema_validation', 'content_quality', 'accuracy_check'],
            'quality_metrics': ['completeness', 'accuracy', 'relevance', 'timeliness']
        }

def get_knowledge_trainer(redis_host: str = 'localhost') -> ProductKnowledgeTrainer:
    """Factory function to get a configured knowledge trainer"""
    trainer = ProductKnowledgeTrainer(redis_host=redis_host)
    trainer.load_knowledge_base()
    trainer.generate_embeddings()
    return trainer

def get_bottleneck_manager(trainer: ProductKnowledgeTrainer) -> KnowledgeBottleneckManager:
    """Factory function to get a configured bottleneck manager"""
    return KnowledgeBottleneckManager(trainer)

# Example usage
if __name__ == "__main__":
    # Initialize the system
    trainer = get_knowledge_trainer()
    bottleneck_manager = get_bottleneck_manager(trainer)
    
    # Test knowledge retrieval
    query = "How do you calculate property values?"
    best_match, confidence = trainer.find_best_match(query)
    
    print(f"Query: {query}")
    print(f"Best match: {best_match.id if best_match else 'None'}")
    print(f"Confidence: {confidence:.2f}")
    print(f"Answer: {best_match.answer if best_match else 'No match found'}")
    
    # Check system health
    freshness_report = bottleneck_manager.check_data_freshness()
    print("\nKnowledge Base Health:")
    for domain, metrics in freshness_report.items():
        print(f"  {domain}: {metrics['status']} ({metrics['total_items']} items)")
