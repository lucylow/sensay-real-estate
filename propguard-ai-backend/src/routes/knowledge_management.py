"""
Knowledge Management Routes for PropGuard AI
API endpoints for knowledge training, bottleneck management, and continuous learning
"""

from flask import Blueprint, request, jsonify
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any
import logging

from ..knowledge_training import get_knowledge_trainer, get_bottleneck_manager, KnowledgeDomain
from ..continuous_learning_engine import get_continuous_learning_engine, FeedbackItem, FeedbackType

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

knowledge_bp = Blueprint('knowledge', __name__)

# Initialize knowledge management system
try:
    trainer = get_knowledge_trainer()
    bottleneck_manager = get_bottleneck_manager(trainer)
    learning_engine = get_continuous_learning_engine(trainer, bottleneck_manager)
    logger.info("Knowledge management system initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize knowledge management system: {e}")
    trainer = None
    bottleneck_manager = None
    learning_engine = None

@knowledge_bp.route('/health', methods=['GET'])
def knowledge_health():
    """Health check for knowledge management system"""
    try:
        if not all([trainer, bottleneck_manager, learning_engine]):
            return jsonify({
                'status': 'error',
                'message': 'Knowledge management system not properly initialized'
            }), 500
        
        health_status = {
            'status': 'healthy',
            'knowledge_items': len(trainer.knowledge_base),
            'embeddings_cached': len(trainer.embedding_cache),
            'domains_covered': len([d for d in KnowledgeDomain]),
            'last_updated': datetime.now().isoformat(),
            'system_components': {
                'trainer': 'operational',
                'bottleneck_manager': 'operational',
                'learning_engine': 'operational'
            }
        }
        
        return jsonify(health_status)
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@knowledge_bp.route('/query', methods=['POST'])
def query_knowledge():
    """Query the knowledge base with semantic search"""
    try:
        if not trainer:
            return jsonify({'error': 'Knowledge trainer not available'}), 500
        
        data = request.get_json()
        query = data.get('query', '').strip()
        domain_filter = data.get('domain')
        
        if not query:
            return jsonify({'error': 'Query is required'}), 400
        
        # Parse domain filter if provided
        domain = None
        if domain_filter:
            try:
                domain = KnowledgeDomain(domain_filter)
            except ValueError:
                return jsonify({'error': f'Invalid domain: {domain_filter}'}), 400
        
        # Find best match
        best_match, confidence = trainer.find_best_match(query, domain)
        
        if best_match:
            response = {
                'success': True,
                'query': query,
                'match': {
                    'id': best_match.id,
                    'domain': best_match.domain.value,
                    'question': best_match.question,
                    'answer': best_match.answer,
                    'confidence': confidence,
                    'tags': best_match.tags,
                    'last_updated': best_match.last_updated.isoformat()
                },
                'related_items': best_match.related_items
            }
        else:
            response = {
                'success': False,
                'query': query,
                'message': 'No confident match found',
                'suggestions': [
                    'Try rephrasing your question',
                    'Use more specific terms',
                    'Check spelling and grammar'
                ]
            }
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Query processing failed: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@knowledge_bp.route('/knowledge-base/stats', methods=['GET'])
def knowledge_base_stats():
    """Get statistics about the knowledge base"""
    try:
        if not trainer:
            return jsonify({'error': 'Knowledge trainer not available'}), 500
        
        # Calculate domain statistics
        domain_stats = {}
        for domain in KnowledgeDomain:
            domain_items = [item for item in trainer.knowledge_base.values() 
                          if item.domain == domain]
            
            if domain_items:
                avg_confidence = sum(item.confidence_threshold for item in domain_items) / len(domain_items)
                oldest_update = min(item.last_updated for item in domain_items)
                newest_update = max(item.last_updated for item in domain_items)
                
                domain_stats[domain.value] = {
                    'item_count': len(domain_items),
                    'avg_confidence_threshold': round(avg_confidence, 2),
                    'oldest_update': oldest_update.isoformat(),
                    'newest_update': newest_update.isoformat(),
                    'data_sources': list(set(
                        source for item in domain_items 
                        for source in item.data_sources
                    ))
                }
        
        overall_stats = {
            'total_items': len(trainer.knowledge_base),
            'total_embeddings': len(trainer.embedding_cache),
            'domains_covered': len(domain_stats),
            'avg_confidence_threshold': round(
                sum(item.confidence_threshold for item in trainer.knowledge_base.values()) 
                / max(len(trainer.knowledge_base), 1), 2
            ),
            'oldest_item': min(
                (item.last_updated for item in trainer.knowledge_base.values()),
                default=datetime.now()
            ).isoformat(),
            'newest_item': max(
                (item.last_updated for item in trainer.knowledge_base.values()),
                default=datetime.now()
            ).isoformat()
        }
        
        return jsonify({
            'overall_stats': overall_stats,
            'domain_breakdown': domain_stats
        })
        
    except Exception as e:
        logger.error(f"Stats calculation failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/bottlenecks/freshness', methods=['GET'])
def check_data_freshness():
    """Check data freshness across all domains"""
    try:
        if not bottleneck_manager:
            return jsonify({'error': 'Bottleneck manager not available'}), 500
        
        freshness_report = bottleneck_manager.check_data_freshness()
        
        # Add summary statistics
        total_items = sum(domain_data['total_items'] for domain_data in freshness_report.values())
        stale_items = sum(domain_data['stale_items_count'] for domain_data in freshness_report.values())
        
        summary = {
            'total_items': total_items,
            'stale_items': stale_items,
            'freshness_percentage': round((total_items - stale_items) / max(total_items, 1) * 100, 1),
            'domains_needing_attention': [
                domain for domain, data in freshness_report.items()
                if data['status'] == 'STALE'
            ]
        }
        
        return jsonify({
            'summary': summary,
            'detailed_report': freshness_report,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Freshness check failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/bottlenecks/ambiguity', methods=['POST'])
def analyze_ambiguity():
    """Analyze conversation logs for ambiguity patterns"""
    try:
        if not bottleneck_manager:
            return jsonify({'error': 'Bottleneck manager not available'}), 500
        
        data = request.get_json()
        conversation_logs = data.get('conversation_logs', [])
        
        if not conversation_logs:
            return jsonify({'error': 'Conversation logs are required'}), 400
        
        ambiguity_report = bottleneck_manager.detect_ambiguity_patterns(conversation_logs)
        
        return jsonify({
            'ambiguity_analysis': ambiguity_report,
            'timestamp': datetime.now().isoformat(),
            'logs_analyzed': len(conversation_logs)
        })
        
    except Exception as e:
        logger.error(f"Ambiguity analysis failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/edge-cases/analyze', methods=['POST'])
def analyze_edge_case():
    """Analyze a query for edge case handling"""
    try:
        if not bottleneck_manager:
            return jsonify({'error': 'Bottleneck manager not available'}), 500
        
        data = request.get_json()
        user_query = data.get('query', '').strip()
        conversation_context = data.get('context', {})
        
        if not user_query:
            return jsonify({'error': 'Query is required'}), 400
        
        edge_case_analysis = bottleneck_manager.handle_edge_cases(user_query, conversation_context)
        
        return jsonify({
            'query': user_query,
            'edge_case_analysis': edge_case_analysis,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Edge case analysis failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/feedback/submit', methods=['POST'])
def submit_feedback():
    """Submit user feedback for continuous learning"""
    try:
        if not learning_engine:
            return jsonify({'error': 'Learning engine not available'}), 500
        
        data = request.get_json()
        required_fields = ['session_id', 'original_query', 'ai_response', 'user_feedback']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create feedback item
        feedback = FeedbackItem(
            id=f"feedback_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{data['session_id'][:8]}",
            user_id=data.get('user_id'),
            session_id=data['session_id'],
            timestamp=datetime.now(),
            feedback_type=FeedbackType(data.get('feedback_type', 'general_feedback')),
            original_query=data['original_query'],
            ai_response=data['ai_response'],
            user_feedback=data['user_feedback'],
            rating=data.get('rating'),
            metadata=data.get('metadata', {})
        )
        
        # Process feedback
        processing_results = learning_engine.process_feedback_batch([feedback])
        
        return jsonify({
            'success': True,
            'feedback_id': feedback.id,
            'processing_results': processing_results,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Feedback submission failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/learning/performance', methods=['GET'])
def get_performance_metrics():
    """Get current performance metrics"""
    try:
        if not learning_engine:
            return jsonify({'error': 'Learning engine not available'}), 500
        
        performance_report = learning_engine.monitor_performance_metrics()
        
        return jsonify(performance_report)
        
    except Exception as e:
        logger.error(f"Performance metrics retrieval failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/learning/bias-audit', methods=['POST'])
def run_bias_audit():
    """Run comprehensive bias audit"""
    try:
        if not learning_engine:
            return jsonify({'error': 'Learning engine not available'}), 500
        
        bias_report = learning_engine.run_bias_audit()
        
        return jsonify({
            'bias_audit_results': bias_report,
            'timestamp': datetime.now().isoformat(),
            'status': 'completed'
        })
        
    except Exception as e:
        logger.error(f"Bias audit failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/learning/recommendations', methods=['GET'])
def get_improvement_recommendations():
    """Get actionable improvement recommendations"""
    try:
        if not learning_engine:
            return jsonify({'error': 'Learning engine not available'}), 500
        
        recommendations = learning_engine.generate_improvement_recommendations()
        
        return jsonify({
            'recommendations': recommendations,
            'total_recommendations': len(recommendations),
            'high_priority': len([r for r in recommendations if r['priority'] == 'high']),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Recommendations generation failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/knowledge-base/update', methods=['POST'])
def update_knowledge_item():
    """Update a knowledge base item"""
    try:
        if not trainer:
            return jsonify({'error': 'Knowledge trainer not available'}), 500
        
        data = request.get_json()
        item_id = data.get('item_id')
        updates = data.get('updates', {})
        
        if not item_id:
            return jsonify({'error': 'item_id is required'}), 400
        
        if not updates:
            return jsonify({'error': 'updates are required'}), 400
        
        success = trainer.update_knowledge_item(item_id, updates)
        
        if success:
            return jsonify({
                'success': True,
                'message': f'Knowledge item {item_id} updated successfully',
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({
                'success': False,
                'message': f'Knowledge item {item_id} not found'
            }), 404
        
    except Exception as e:
        logger.error(f"Knowledge item update failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/domains', methods=['GET'])
def list_domains():
    """List all available knowledge domains"""
    try:
        domains = [
            {
                'value': domain.value,
                'name': domain.value.replace('_', ' ').title(),
                'description': f"Knowledge items related to {domain.value.replace('_', ' ')}"
            }
            for domain in KnowledgeDomain
        ]
        
        return jsonify({
            'domains': domains,
            'total_domains': len(domains)
        })
        
    except Exception as e:
        logger.error(f"Domain listing failed: {e}")
        return jsonify({'error': str(e)}), 500

@knowledge_bp.route('/search/similar', methods=['POST'])
def find_similar_items():
    """Find knowledge items similar to a given query"""
    try:
        if not trainer:
            return jsonify({'error': 'Knowledge trainer not available'}), 500
        
        data = request.get_json()
        query = data.get('query', '').strip()
        limit = min(data.get('limit', 5), 20)  # Max 20 results
        min_confidence = data.get('min_confidence', 0.3)
        
        if not query:
            return jsonify({'error': 'Query is required'}), 400
        
        # Find all matches above threshold
        query_embedding = trainer.sentence_model.encode(query)
        similar_items = []
        
        for item_id, item in trainer.knowledge_base.items():
            if item_id in trainer.embedding_cache:
                item_embedding = trainer.embedding_cache[item_id]
                from sklearn.metrics.pairwise import cosine_similarity
                similarity = cosine_similarity([query_embedding], [item_embedding])[0][0]
                
                if similarity >= min_confidence:
                    similar_items.append({
                        'id': item.id,
                        'domain': item.domain.value,
                        'question': item.question,
                        'answer': item.answer[:200] + '...' if len(item.answer) > 200 else item.answer,
                        'similarity': round(similarity, 3),
                        'tags': item.tags
                    })
        
        # Sort by similarity and limit results
        similar_items.sort(key=lambda x: x['similarity'], reverse=True)
        similar_items = similar_items[:limit]
        
        return jsonify({
            'query': query,
            'similar_items': similar_items,
            'total_found': len(similar_items),
            'parameters': {
                'limit': limit,
                'min_confidence': min_confidence
            }
        })
        
    except Exception as e:
        logger.error(f"Similar items search failed: {e}")
        return jsonify({'error': str(e)}), 500

# Error handlers
@knowledge_bp.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'available_endpoints': [
            '/health',
            '/query',
            '/knowledge-base/stats',
            '/bottlenecks/freshness',
            '/bottlenecks/ambiguity',
            '/edge-cases/analyze',
            '/feedback/submit',
            '/learning/performance',
            '/learning/bias-audit',
            '/learning/recommendations',
            '/knowledge-base/update',
            '/domains',
            '/search/similar'
        ]
    }), 404

@knowledge_bp.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500
