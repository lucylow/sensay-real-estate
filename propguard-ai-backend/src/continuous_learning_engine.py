"""
Continuous Learning Engine for PropGuard AI Knowledge System
Implements feedback analysis, bias detection, and automated knowledge improvements
"""

import json
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import logging
from textblob import TextBlob
import re
from collections import defaultdict, Counter

from knowledge_training import ProductKnowledgeTrainer, KnowledgeBottleneckManager, KnowledgeDomain

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FeedbackType(Enum):
    """Types of user feedback"""
    POSITIVE = "positive"
    NEGATIVE = "negative"
    CORRECTION = "correction"
    SUGGESTION = "suggestion"
    BUG_REPORT = "bug_report"
    FEATURE_REQUEST = "feature_request"

class LearningPriority(Enum):
    """Priority levels for learning tasks"""
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

@dataclass
class FeedbackItem:
    """Structured feedback from users"""
    id: str
    user_id: Optional[str]
    session_id: str
    timestamp: datetime
    feedback_type: FeedbackType
    original_query: str
    ai_response: str
    user_feedback: str
    rating: Optional[int]  # 1-5 scale
    metadata: Dict[str, Any]
    processed: bool = False

@dataclass
class LearningTask:
    """Task for improving knowledge base"""
    id: str
    priority: LearningPriority
    task_type: str
    description: str
    knowledge_item_id: Optional[str]
    feedback_ids: List[str]
    suggested_action: str
    created_at: datetime
    status: str = "pending"
    assigned_to: Optional[str] = None

class FeedbackAnalyzer:
    """Analyzes user feedback to identify improvement opportunities"""
    
    def __init__(self):
        self.sentiment_model = TextBlob
        self.bias_patterns = self._load_bias_patterns()
        
    def analyze_feedback(self, feedback: FeedbackItem) -> Dict[str, Any]:
        """Comprehensive analysis of user feedback"""
        analysis = {
            'feedback_id': feedback.id,
            'sentiment_score': self._analyze_sentiment(feedback.user_feedback),
            'identifies_gap': self._identifies_knowledge_gap(feedback),
            'requires_knowledge_update': self._requires_update(feedback),
            'bias_indicators': self._detect_bias_indicators(feedback),
            'specific_issue': self._categorize_issue(feedback),
            'recommended_action': self._recommend_action(feedback),
            'urgency_level': self._assess_urgency(feedback),
            'quality_metrics': self._assess_response_quality(feedback)
        }
        
        return analysis
    
    def _analyze_sentiment(self, feedback_text: str) -> float:
        """Analyze sentiment of feedback using TextBlob"""
        try:
            blob = TextBlob(feedback_text)
            return blob.sentiment.polarity  # -1 to 1 scale
        except Exception as e:
            logger.warning(f"Sentiment analysis failed: {e}")
            return 0.0
    
    def _identifies_knowledge_gap(self, feedback: FeedbackItem) -> bool:
        """Check if feedback identifies a knowledge gap"""
        gap_indicators = [
            'don\'t know', 'not sure', 'no information', 'missing',
            'incomplete', 'wrong answer', 'incorrect', 'outdated',
            'no result', 'couldn\'t find', 'not helpful'
        ]
        
        feedback_lower = feedback.user_feedback.lower()
        return any(indicator in feedback_lower for indicator in gap_indicators)
    
    def _requires_update(self, feedback: FeedbackItem) -> bool:
        """Determine if feedback requires knowledge base update"""
        update_indicators = [
            'wrong', 'incorrect', 'outdated', 'changed', 'new rule',
            'update needed', 'not current', 'old information'
        ]
        
        feedback_lower = feedback.user_feedback.lower()
        return any(indicator in feedback_lower for indicator in update_indicators)
    
    def _detect_bias_indicators(self, feedback: FeedbackItem) -> List[str]:
        """Detect potential bias in AI responses"""
        bias_indicators = []
        
        # Check for demographic bias
        if self._contains_demographic_bias(feedback.ai_response):
            bias_indicators.append('demographic_bias')
        
        # Check for economic bias
        if self._contains_economic_bias(feedback.ai_response):
            bias_indicators.append('economic_bias')
        
        # Check for geographic bias
        if self._contains_geographic_bias(feedback.ai_response):
            bias_indicators.append('geographic_bias')
        
        return bias_indicators
    
    def _contains_demographic_bias(self, response: str) -> bool:
        """Check for demographic bias in response"""
        biased_phrases = [
            'typical family', 'normal household', 'standard buyer',
            'regular income', 'traditional family'
        ]
        return any(phrase in response.lower() for phrase in biased_phrases)
    
    def _contains_economic_bias(self, response: str) -> bool:
        """Check for economic bias in response"""
        biased_phrases = [
            'affordable for everyone', 'easily affordable', 'cheap property',
            'luxury for everyone', 'standard budget'
        ]
        return any(phrase in response.lower() for phrase in biased_phrases)
    
    def _contains_geographic_bias(self, response: str) -> bool:
        """Check for geographic bias in response"""
        # Check if response favors certain areas without justification
        biased_phrases = [
            'best area', 'perfect location', 'ideal neighborhood',
            'avoid this area', 'not recommended area'
        ]
        return any(phrase in response.lower() for phrase in biased_phrases)
    
    def _categorize_issue(self, feedback: FeedbackItem) -> str:
        """Categorize the type of issue reported"""
        feedback_lower = feedback.user_feedback.lower()
        
        if 'wrong' in feedback_lower or 'incorrect' in feedback_lower:
            return 'accuracy_issue'
        elif 'slow' in feedback_lower or 'timeout' in feedback_lower:
            return 'performance_issue'
        elif 'confusing' in feedback_lower or 'unclear' in feedback_lower:
            return 'clarity_issue'
        elif 'missing' in feedback_lower or 'incomplete' in feedback_lower:
            return 'completeness_issue'
        elif 'bias' in feedback_lower or 'unfair' in feedback_lower:
            return 'bias_issue'
        else:
            return 'general_feedback'
    
    def _recommend_action(self, feedback: FeedbackItem) -> str:
        """Recommend action based on feedback analysis"""
        issue_type = self._categorize_issue(feedback)
        
        action_map = {
            'accuracy_issue': 'update_knowledge_base',
            'performance_issue': 'optimize_response_time',
            'clarity_issue': 'improve_response_clarity',
            'completeness_issue': 'expand_knowledge_coverage',
            'bias_issue': 'review_for_bias',
            'general_feedback': 'monitor_and_analyze'
        }
        
        return action_map.get(issue_type, 'manual_review')
    
    def _assess_urgency(self, feedback: FeedbackItem) -> str:
        """Assess urgency level of the feedback"""
        if feedback.rating and feedback.rating <= 2:
            return 'high'
        elif 'urgent' in feedback.user_feedback.lower():
            return 'high'
        elif 'wrong' in feedback.user_feedback.lower():
            return 'medium'
        else:
            return 'low'
    
    def _assess_response_quality(self, feedback: FeedbackItem) -> Dict[str, float]:
        """Assess quality metrics of the AI response"""
        return {
            'relevance': self._calculate_relevance(feedback),
            'completeness': self._calculate_completeness(feedback),
            'accuracy': self._calculate_accuracy(feedback),
            'clarity': self._calculate_clarity(feedback)
        }
    
    def _calculate_relevance(self, feedback: FeedbackItem) -> float:
        """Calculate relevance score (0-1)"""
        # Simple relevance calculation based on keyword overlap
        query_words = set(feedback.original_query.lower().split())
        response_words = set(feedback.ai_response.lower().split())
        
        if not query_words:
            return 0.0
        
        overlap = len(query_words.intersection(response_words))
        return overlap / len(query_words)
    
    def _calculate_completeness(self, feedback: FeedbackItem) -> float:
        """Calculate completeness score (0-1)"""
        response_length = len(feedback.ai_response.split())
        # Assume optimal response length is 50-200 words
        if 50 <= response_length <= 200:
            return 1.0
        elif response_length < 50:
            return response_length / 50
        else:
            return max(0.5, 200 / response_length)
    
    def _calculate_accuracy(self, feedback: FeedbackItem) -> float:
        """Calculate accuracy based on feedback"""
        if feedback.rating:
            return feedback.rating / 5.0
        
        # Use sentiment as proxy for accuracy
        sentiment = self._analyze_sentiment(feedback.user_feedback)
        return max(0, (sentiment + 1) / 2)  # Convert -1,1 to 0,1
    
    def _calculate_clarity(self, feedback: FeedbackItem) -> float:
        """Calculate clarity score based on response structure"""
        response = feedback.ai_response
        
        # Check for clear structure
        structure_score = 0
        if any(marker in response for marker in ['1.', '2.', '•', '-']):
            structure_score += 0.3
        if '?' in response or ':' in response:
            structure_score += 0.2
        if len(response.split('.')) > 1:  # Multiple sentences
            structure_score += 0.3
        
        # Check for jargon and complexity
        complex_words = ['sophisticated', 'comprehensive', 'implementation', 'optimization']
        jargon_penalty = len([word for word in complex_words if word in response.lower()]) * 0.1
        
        return min(1.0, max(0.0, structure_score + 0.2 - jargon_penalty))
    
    def _load_bias_patterns(self) -> Dict[str, List[str]]:
        """Load patterns for bias detection"""
        return {
            'demographic': [
                'typical family', 'normal household', 'standard buyer'
            ],
            'economic': [
                'easily affordable', 'standard budget', 'typical price'
            ],
            'geographic': [
                'best area', 'perfect location', 'ideal neighborhood'
            ]
        }

class BiasDetectionEngine:
    """Specialized engine for detecting and mitigating bias in AI responses"""
    
    def __init__(self):
        self.bias_categories = {
            'demographic': ['age', 'gender', 'family_status', 'ethnicity'],
            'economic': ['income', 'wealth', 'credit_score', 'employment'],
            'geographic': ['location', 'neighborhood', 'region', 'urbanization'],
            'temporal': ['market_timing', 'seasonal', 'economic_cycle']
        }
        
    def analyze_bias_in_knowledge_base(self, knowledge_base: Dict) -> Dict[str, Any]:
        """Comprehensive bias analysis of the knowledge base"""
        bias_report = {
            'overall_bias_score': 0.0,
            'category_scores': {},
            'problematic_items': [],
            'recommendations': [],
            'bias_patterns': defaultdict(int)
        }
        
        total_bias_score = 0
        total_items = 0
        
        for item_id, item in knowledge_base.items():
            item_bias = self._analyze_item_bias(item)
            if item_bias['total_bias'] > 0.3:  # Threshold for concern
                bias_report['problematic_items'].append({
                    'item_id': item_id,
                    'bias_score': item_bias['total_bias'],
                    'bias_types': item_bias['bias_types'],
                    'suggested_fixes': item_bias['suggested_fixes']
                })
            
            total_bias_score += item_bias['total_bias']
            total_items += 1
            
            # Track bias patterns
            for bias_type in item_bias['bias_types']:
                bias_report['bias_patterns'][bias_type] += 1
        
        bias_report['overall_bias_score'] = total_bias_score / max(total_items, 1)
        bias_report['recommendations'] = self._generate_bias_recommendations(bias_report)
        
        return bias_report
    
    def _analyze_item_bias(self, item) -> Dict[str, Any]:
        """Analyze bias in a single knowledge item"""
        bias_analysis = {
            'total_bias': 0.0,
            'bias_types': [],
            'suggested_fixes': []
        }
        
        text_to_analyze = f"{item.question} {item.answer}"
        
        for category, subcategories in self.bias_categories.items():
            bias_score = self._detect_category_bias(text_to_analyze, category)
            if bias_score > 0.2:
                bias_analysis['bias_types'].append(category)
                bias_analysis['total_bias'] += bias_score
                bias_analysis['suggested_fixes'].append(
                    f"Review {category} assumptions and language"
                )
        
        return bias_analysis
    
    def _detect_category_bias(self, text: str, category: str) -> float:
        """Detect bias in specific category"""
        text_lower = text.lower()
        
        if category == 'demographic':
            biased_terms = [
                'typical family', 'normal household', 'standard buyer',
                'young professionals', 'retirees', 'families with children'
            ]
        elif category == 'economic':
            biased_terms = [
                'affordable for everyone', 'standard income', 'typical budget',
                'expensive area', 'cheap neighborhood', 'luxury market only'
            ]
        elif category == 'geographic':
            biased_terms = [
                'best area', 'worst location', 'desirable neighborhood',
                'avoid this area', 'perfect location', 'ideal for everyone'
            ]
        else:
            biased_terms = []
        
        bias_count = sum(1 for term in biased_terms if term in text_lower)
        return min(1.0, bias_count * 0.2)  # Max bias score of 1.0
    
    def _generate_bias_recommendations(self, bias_report: Dict) -> List[str]:
        """Generate recommendations to reduce bias"""
        recommendations = []
        
        if bias_report['overall_bias_score'] > 0.3:
            recommendations.append("Conduct comprehensive bias audit of all knowledge items")
        
        # Check for specific bias patterns
        bias_patterns = bias_report['bias_patterns']
        
        if bias_patterns['demographic'] > 5:
            recommendations.append("Review demographic assumptions and use inclusive language")
        
        if bias_patterns['economic'] > 3:
            recommendations.append("Avoid economic generalizations and provide range-based information")
        
        if bias_patterns['geographic'] > 3:
            recommendations.append("Use objective location descriptions instead of subjective judgments")
        
        if not recommendations:
            recommendations.append("Continue monitoring for bias patterns")
        
        return recommendations

class ContinuousLearningEngine:
    """Main engine for continuous learning and knowledge improvement"""
    
    def __init__(self, trainer: ProductKnowledgeTrainer, bottleneck_manager: KnowledgeBottleneckManager):
        self.trainer = trainer
        self.bottleneck_manager = bottleneck_manager
        self.feedback_analyzer = FeedbackAnalyzer()
        self.bias_detector = BiasDetectionEngine()
        self.learning_tasks: List[LearningTask] = []
        
    def process_feedback_batch(self, feedback_batch: List[FeedbackItem]) -> Dict[str, Any]:
        """Process a batch of user feedback"""
        processing_results = {
            'total_feedback': len(feedback_batch),
            'processed_successfully': 0,
            'learning_tasks_created': 0,
            'knowledge_updates_suggested': 0,
            'bias_alerts': 0,
            'processing_errors': []
        }
        
        for feedback in feedback_batch:
            try:
                # Analyze feedback
                analysis = self.feedback_analyzer.analyze_feedback(feedback)
                
                # Create learning tasks based on analysis
                if analysis['urgency_level'] in ['high', 'medium']:
                    task = self._create_learning_task(feedback, analysis)
                    self.learning_tasks.append(task)
                    processing_results['learning_tasks_created'] += 1
                
                # Check for knowledge updates needed
                if analysis['requires_knowledge_update']:
                    self._suggest_knowledge_update(feedback, analysis)
                    processing_results['knowledge_updates_suggested'] += 1
                
                # Check for bias indicators
                if analysis['bias_indicators']:
                    processing_results['bias_alerts'] += 1
                    logger.warning(f"Bias indicators detected in feedback {feedback.id}: {analysis['bias_indicators']}")
                
                processing_results['processed_successfully'] += 1
                
            except Exception as e:
                logger.error(f"Error processing feedback {feedback.id}: {e}")
                processing_results['processing_errors'].append({
                    'feedback_id': feedback.id,
                    'error': str(e)
                })
        
        return processing_results
    
    def _create_learning_task(self, feedback: FeedbackItem, analysis: Dict[str, Any]) -> LearningTask:
        """Create a learning task based on feedback analysis"""
        priority_map = {
            'high': LearningPriority.HIGH,
            'medium': LearningPriority.MEDIUM,
            'low': LearningPriority.LOW
        }
        
        task = LearningTask(
            id=f"task_{feedback.id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            priority=priority_map.get(analysis['urgency_level'], LearningPriority.LOW),
            task_type=analysis['specific_issue'],
            description=f"Address issue: {analysis['specific_issue']} from user feedback",
            knowledge_item_id=None,  # Will be determined during task execution
            feedback_ids=[feedback.id],
            suggested_action=analysis['recommended_action'],
            created_at=datetime.now()
        )
        
        return task
    
    def _suggest_knowledge_update(self, feedback: FeedbackItem, analysis: Dict[str, Any]) -> None:
        """Suggest updates to knowledge base based on feedback"""
        # Find the knowledge item that needs updating
        best_match, confidence = self.trainer.find_best_match(feedback.original_query)
        
        if best_match and confidence > 0.5:
            suggestion = {
                'knowledge_item_id': best_match.id,
                'feedback_id': feedback.id,
                'suggested_changes': self._generate_update_suggestions(feedback, best_match),
                'urgency': analysis['urgency_level'],
                'timestamp': datetime.now().isoformat()
            }
            
            logger.info(f"Knowledge update suggested for item {best_match.id}: {suggestion}")
            # In a real implementation, this would be stored in a database or queue
    
    def _generate_update_suggestions(self, feedback: FeedbackItem, knowledge_item) -> List[str]:
        """Generate specific suggestions for updating knowledge items"""
        suggestions = []
        
        if 'wrong' in feedback.user_feedback.lower():
            suggestions.append("Review accuracy of information")
        
        if 'outdated' in feedback.user_feedback.lower():
            suggestions.append("Update with latest information")
        
        if 'confusing' in feedback.user_feedback.lower():
            suggestions.append("Improve clarity and explanation")
        
        if 'missing' in feedback.user_feedback.lower():
            suggestions.append("Add missing information or details")
        
        return suggestions if suggestions else ["General review and improvement needed"]
    
    def run_bias_audit(self) -> Dict[str, Any]:
        """Run comprehensive bias audit on knowledge base"""
        logger.info("Starting bias audit of knowledge base")
        
        bias_report = self.bias_detector.analyze_bias_in_knowledge_base(
            self.trainer.knowledge_base
        )
        
        # Create high-priority tasks for problematic items
        for item in bias_report['problematic_items']:
            task = LearningTask(
                id=f"bias_task_{item['item_id']}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                priority=LearningPriority.HIGH,
                task_type="bias_mitigation",
                description=f"Address bias in knowledge item {item['item_id']}",
                knowledge_item_id=item['item_id'],
                feedback_ids=[],
                suggested_action=f"Review and fix: {', '.join(item['suggested_fixes'])}",
                created_at=datetime.now()
            )
            self.learning_tasks.append(task)
        
        logger.info(f"Bias audit complete. Created {len(bias_report['problematic_items'])} bias mitigation tasks")
        return bias_report
    
    def monitor_performance_metrics(self) -> Dict[str, Any]:
        """Continuous monitoring of chatbot performance metrics"""
        # This would typically query actual conversation logs from a database
        # For now, we'll simulate some metrics
        
        performance_report = {
            'timestamp': datetime.now().isoformat(),
            'knowledge_coverage': self._calculate_knowledge_coverage(),
            'response_accuracy': self._measure_response_accuracy(),
            'user_satisfaction': self._analyze_user_satisfaction(),
            'bias_metrics': self._get_bias_metrics(),
            'bottleneck_status': self.bottleneck_manager.bottleneck_metrics,
            'learning_progress': self._get_learning_progress()
        }
        
        return performance_report
    
    def _calculate_knowledge_coverage(self) -> Dict[str, Any]:
        """Calculate what percentage of user queries are successfully answered"""
        # In a real implementation, this would analyze actual conversation logs
        domain_coverage = {}
        
        for domain in KnowledgeDomain:
            domain_items = [item for item in self.trainer.knowledge_base.values() 
                          if item.domain == domain]
            domain_coverage[domain.value] = {
                'item_count': len(domain_items),
                'estimated_coverage': min(100, len(domain_items) * 10)  # Simple estimate
            }
        
        total_items = len(self.trainer.knowledge_base)
        overall_coverage = min(85, total_items * 2)  # Simulate coverage percentage
        
        return {
            'overall_coverage_percent': overall_coverage,
            'domain_breakdown': domain_coverage,
            'total_knowledge_items': total_items
        }
    
    def _measure_response_accuracy(self) -> Dict[str, Any]:
        """Measure response accuracy based on feedback and validation"""
        # Simulate accuracy metrics
        return {
            'overall_accuracy': 0.87,
            'accuracy_by_domain': {
                domain.value: np.random.uniform(0.8, 0.95) 
                for domain in KnowledgeDomain
            },
            'trending': 'stable',  # 'improving', 'declining', 'stable'
            'last_updated': datetime.now().isoformat()
        }
    
    def _analyze_user_satisfaction(self) -> Dict[str, Any]:
        """Analyze user satisfaction metrics"""
        # Simulate satisfaction metrics
        return {
            'average_rating': 4.2,
            'rating_distribution': {
                '5': 35, '4': 28, '3': 20, '2': 12, '1': 5
            },
            'satisfaction_trend': 'improving',
            'nps_score': 42,  # Net Promoter Score
            'last_updated': datetime.now().isoformat()
        }
    
    def _get_bias_metrics(self) -> Dict[str, Any]:
        """Get current bias metrics"""
        return {
            'overall_bias_score': 0.15,  # 0-1 scale, lower is better
            'bias_alerts_this_week': 2,
            'bias_items_addressed': 5,
            'bias_audit_status': 'scheduled',
            'last_bias_audit': '2024-01-20T10:00:00'
        }
    
    def _get_learning_progress(self) -> Dict[str, Any]:
        """Get progress on learning tasks"""
        pending_tasks = len([t for t in self.learning_tasks if t.status == 'pending'])
        completed_tasks = len([t for t in self.learning_tasks if t.status == 'completed'])
        
        return {
            'total_tasks': len(self.learning_tasks),
            'pending_tasks': pending_tasks,
            'completed_tasks': completed_tasks,
            'high_priority_pending': len([
                t for t in self.learning_tasks 
                if t.priority == LearningPriority.HIGH and t.status == 'pending'
            ]),
            'completion_rate': completed_tasks / max(len(self.learning_tasks), 1)
        }
    
    def generate_improvement_recommendations(self) -> List[Dict[str, Any]]:
        """Generate actionable recommendations for improving the knowledge system"""
        recommendations = []
        
        # Analyze performance metrics
        performance = self.monitor_performance_metrics()
        
        # Coverage recommendations
        if performance['knowledge_coverage']['overall_coverage_percent'] < 80:
            recommendations.append({
                'type': 'coverage_improvement',
                'priority': 'high',
                'description': 'Expand knowledge base coverage in underrepresented domains',
                'action': 'Add more knowledge items to domains with low coverage'
            })
        
        # Accuracy recommendations
        if performance['response_accuracy']['overall_accuracy'] < 0.85:
            recommendations.append({
                'type': 'accuracy_improvement',
                'priority': 'high',
                'description': 'Improve response accuracy',
                'action': 'Review and update inaccurate knowledge items'
            })
        
        # Bias recommendations
        if performance['bias_metrics']['overall_bias_score'] > 0.2:
            recommendations.append({
                'type': 'bias_mitigation',
                'priority': 'high',
                'description': 'Address bias in knowledge base',
                'action': 'Conduct comprehensive bias audit and remediation'
            })
        
        # Learning task recommendations
        if performance['learning_progress']['high_priority_pending'] > 5:
            recommendations.append({
                'type': 'task_management',
                'priority': 'medium',
                'description': 'Address backlog of high-priority learning tasks',
                'action': 'Allocate resources to complete pending high-priority tasks'
            })
        
        return recommendations

# Factory functions
def get_continuous_learning_engine(trainer: ProductKnowledgeTrainer, 
                                 bottleneck_manager: KnowledgeBottleneckManager) -> ContinuousLearningEngine:
    """Factory function to get configured continuous learning engine"""
    return ContinuousLearningEngine(trainer, bottleneck_manager)

# Example usage and testing
if __name__ == "__main__":
    from knowledge_training import get_knowledge_trainer, get_bottleneck_manager
    
    # Initialize the system
    trainer = get_knowledge_trainer()
    bottleneck_manager = get_bottleneck_manager(trainer)
    learning_engine = get_continuous_learning_engine(trainer, bottleneck_manager)
    
    # Run bias audit
    bias_report = learning_engine.run_bias_audit()
    print("Bias Audit Results:")
    print(f"  Overall bias score: {bias_report['overall_bias_score']:.2f}")
    print(f"  Problematic items: {len(bias_report['problematic_items'])}")
    
    # Monitor performance
    performance = learning_engine.monitor_performance_metrics()
    print(f"\nPerformance Metrics:")
    print(f"  Knowledge coverage: {performance['knowledge_coverage']['overall_coverage_percent']}%")
    print(f"  Response accuracy: {performance['response_accuracy']['overall_accuracy']:.2f}")
    print(f"  User satisfaction: {performance['user_satisfaction']['average_rating']:.1f}/5")
    
    # Generate recommendations
    recommendations = learning_engine.generate_improvement_recommendations()
    print(f"\nImprovement Recommendations ({len(recommendations)}):")
    for rec in recommendations:
        print(f"  - {rec['description']} (Priority: {rec['priority']})")
