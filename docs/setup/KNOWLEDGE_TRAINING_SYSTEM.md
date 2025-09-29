# PropGuard AI Knowledge Training System

## Overview

The PropGuard AI Knowledge Training System is a comprehensive framework for managing, training, and continuously improving the knowledge base that powers the PropGuard AI real estate chatbot. This system addresses critical aspects of knowledge management including semantic search, bottleneck detection, bias mitigation, and continuous learning.

## Architecture

### Core Components

1. **ProductKnowledgeTrainer** - Main knowledge management engine
2. **KnowledgeBottleneckManager** - Bottleneck detection and mitigation
3. **ContinuousLearningEngine** - Feedback processing and continuous improvement
4. **BiasDetectionEngine** - Automated bias detection and mitigation
5. **KnowledgeMonitoringDashboard** - Real-time monitoring and management interface

### System Integration

```
┌─────────────────────────────────────────────────────────────┐
│                    PropGuard AI System                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Sensay API    │  │   TensorFlow    │  │   Ollama    │  │
│  │   Integration   │  │    Models       │  │    LLM      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│              Knowledge Training System                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Knowledge Base (Semantic Search + Embeddings)         │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │  │
│  │  │  Property   │ │    Risk     │ │ Regulatory  │      │  │
│  │  │ Valuation   │ │ Assessment  │ │ Compliance  │ ...  │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │           Bottleneck Management                         │  │
│  │  • Data Staleness Monitoring                           │  │
│  │  • Ambiguity Pattern Detection                         │  │
│  │  • Edge Case Handling                                  │  │
│  │  • Integration Error Management                        │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │           Continuous Learning Engine                    │  │
│  │  • User Feedback Analysis                              │  │
│  │  • Bias Detection & Mitigation                         │  │
│  │  • Performance Monitoring                              │  │
│  │  • Automated Improvements                              │  │
│  └─────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Data Sources                             │
│  NASA FIRMS • MLS • Environmental Data • Market Feeds      │
└─────────────────────────────────────────────────────────────┘
```

## Features

### 1. Intelligent Knowledge Management

#### Semantic Search
- Uses sentence-transformers for semantic understanding
- Context-aware query matching
- Confidence-based response filtering
- Related item suggestions

#### Knowledge Domains
- **Property Valuation**: TensorFlow model explanations, valuation processes
- **Risk Assessment**: Environmental risks, climate data, insurance implications
- **Real Estate Process**: Buying/selling processes, legal requirements
- **Regulatory Compliance**: CPS 230, USPAP, Fair Housing Act compliance
- **Market Analysis**: Market trends, investment strategies
- **PropGuard Features**: Platform capabilities and integrations
- **Sensay Integration**: API usage, conversation flows

### 2. Bottleneck Detection & Mitigation

#### Data Staleness Monitoring
- Real-time freshness tracking across domains
- Automated alerts for outdated information
- Intelligent caching strategies
- Proactive update scheduling

#### Ambiguity Pattern Detection
- Low-confidence query identification
- Common ambiguous phrase tracking
- Clarification strategy recommendations
- Problem query analysis

#### Edge Case Handling
- Complex regulatory query detection
- Technical question escalation
- Multi-part query decomposition
- Emotional query sensitivity detection

### 3. Continuous Learning & Improvement

#### Feedback Analysis
- Sentiment analysis of user feedback
- Knowledge gap identification
- Update requirement detection
- Quality metric assessment

#### Bias Detection
- Demographic bias monitoring
- Economic assumption checking
- Geographic preference detection
- Automated fairness assessments

#### Performance Monitoring
- Response accuracy tracking
- Knowledge coverage metrics
- User satisfaction analysis
- System health monitoring

## Installation & Setup

### Backend Setup

1. **Install Dependencies**
```bash
cd propguard-ai-backend
pip install -r requirements.txt
```

2. **Setup Redis (Optional but Recommended)**
```bash
# Install Redis
sudo apt-get install redis-server  # Ubuntu
brew install redis                 # macOS

# Start Redis
redis-server
```

3. **Initialize Knowledge Base**
```python
from src.knowledge_training import get_knowledge_trainer

trainer = get_knowledge_trainer()
# Knowledge base is automatically loaded with default PropGuard AI data
```

4. **Start the Flask Application**
```bash
python src/main.py
```

### Frontend Integration

1. **Import the Knowledge Service**
```typescript
import { knowledgeService } from '@/services/api/knowledgeService';
```

2. **Use in Components**
```typescript
// Query knowledge base
const result = await knowledgeService.queryKnowledge("How does PropGuard AI work?");

// Get dashboard data
const dashboardData = await knowledgeService.getDashboardData();

// Submit feedback
await knowledgeService.submitFeedback({
  session_id: "user_session_123",
  original_query: "What are the risks?",
  ai_response: "Environmental risks include...",
  user_feedback: "Very helpful!",
  rating: 5
});
```

## API Endpoints

### Knowledge Management
- `GET /api/propguard/knowledge/health` - System health check
- `POST /api/propguard/knowledge/query` - Query knowledge base
- `GET /api/propguard/knowledge/knowledge-base/stats` - Knowledge statistics
- `GET /api/propguard/knowledge/domains` - List available domains

### Bottleneck Management
- `GET /api/propguard/knowledge/bottlenecks/freshness` - Data freshness report
- `POST /api/propguard/knowledge/bottlenecks/ambiguity` - Ambiguity analysis
- `POST /api/propguard/knowledge/edge-cases/analyze` - Edge case analysis

### Learning & Improvement
- `POST /api/propguard/knowledge/feedback/submit` - Submit user feedback
- `GET /api/propguard/knowledge/learning/performance` - Performance metrics
- `POST /api/propguard/knowledge/learning/bias-audit` - Run bias audit
- `GET /api/propguard/knowledge/learning/recommendations` - Get improvements

### Advanced Features
- `POST /api/propguard/knowledge/search/similar` - Find similar items
- `POST /api/propguard/knowledge/knowledge-base/update` - Update knowledge items

## Configuration

### Knowledge Base Structure

```json
{
  "knowledge_item_id": {
    "domain": "property_valuation",
    "question": "How does PropGuard AI determine property valuations?",
    "answer": "PropGuard AI uses sophisticated TensorFlow models...",
    "confidence_threshold": 0.8,
    "last_updated": "2024-01-15T10:30:00",
    "data_sources": ["TensorFlow_Models", "Market_Data"],
    "metadata": {
      "technical_complexity": "high",
      "update_frequency": "weekly"
    },
    "tags": ["valuation", "tensorflow", "ai"],
    "related_items": ["risk_assessment_001"]
  }
}
```

### Environment Variables

```bash
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Knowledge System Settings
KNOWLEDGE_CONFIDENCE_THRESHOLD=0.7
KNOWLEDGE_UPDATE_FREQUENCY=daily
BIAS_AUDIT_SCHEDULE=weekly

# Embedding Model
SENTENCE_TRANSFORMER_MODEL=all-MiniLM-L6-v2
EMBEDDING_CACHE_TTL=24h
```

## Monitoring & Dashboards

### Real-time Dashboard Features

1. **System Overview**
   - Total knowledge items
   - Domain coverage
   - Response accuracy
   - User satisfaction metrics

2. **Data Freshness Monitoring**
   - Per-domain staleness tracking
   - Update schedules
   - Alert management

3. **Performance Analytics**
   - Query success rates
   - Response times
   - Confidence distributions
   - Bias metrics

4. **Interactive Testing**
   - Live query testing
   - Confidence analysis
   - Similar item discovery

### Alert Management

- **Critical Alerts**: System failures, high bias scores
- **Warning Alerts**: Stale data, low accuracy domains
- **Info Alerts**: Scheduled updates, routine maintenance

## Best Practices

### Knowledge Item Creation
1. Use clear, specific questions
2. Provide comprehensive answers
3. Include relevant tags and metadata
4. Set appropriate confidence thresholds
5. Link related items

### Bias Prevention
1. Use inclusive language
2. Avoid demographic assumptions
3. Provide range-based information
4. Regular bias audits
5. Diverse data sources

### Performance Optimization
1. Regular embedding regeneration
2. Intelligent caching strategies
3. Query optimization
4. Domain-specific tuning
5. Feedback loop implementation

## Troubleshooting

### Common Issues

1. **Low Query Confidence**
   - Check question clarity
   - Review embedding quality
   - Adjust confidence thresholds
   - Add more training examples

2. **Stale Data Warnings**
   - Review update schedules
   - Check data source availability
   - Verify automation scripts
   - Manual content updates

3. **High Bias Scores**
   - Run detailed bias audit
   - Review flagged content
   - Update problematic items
   - Implement mitigation strategies

4. **Performance Issues**
   - Check Redis connectivity
   - Monitor embedding cache
   - Optimize query patterns
   - Scale infrastructure

### Logs & Debugging

```python
# Enable debug logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Monitor knowledge queries
from src.knowledge_training import get_knowledge_trainer
trainer = get_knowledge_trainer()
result, confidence = trainer.find_best_match("your query here")
print(f"Best match: {result.id if result else 'None'}, Confidence: {confidence}")
```

## Integration with PropGuard AI

### Sensay Platform Integration
- Natural language query processing
- Multi-channel deployment support
- Conversation context awareness
- Multilingual capabilities

### TensorFlow Model Integration
- Model explanation queries
- Technical documentation access
- Performance metric explanations
- Training data insights

### Ollama LLM Integration
- Advanced reasoning queries
- Sentiment analysis feedback
- Dynamic response generation
- Context-aware conversations

## Future Enhancements

### Planned Features
1. **Advanced NLP Models**: Integration with latest transformer models
2. **Automated Content Generation**: AI-powered knowledge item creation
3. **Multi-modal Learning**: Image and video content understanding
4. **Predictive Analytics**: Query trend prediction and proactive content creation
5. **Advanced Personalization**: User-specific knowledge recommendations

### Research Areas
1. **Federated Learning**: Distributed knowledge sharing
2. **Explainable AI**: Better transparency in knowledge matching
3. **Cross-domain Transfer**: Knowledge sharing between domains
4. **Real-time Adaptation**: Dynamic knowledge base updates

## Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Run bias and quality checks
5. Submit pull request

### Code Standards
- Python 3.8+ with type hints
- Comprehensive docstrings
- Unit tests for all functions
- Bias testing for knowledge content
- Performance benchmarking

## License

This knowledge training system is part of the PropGuard AI project and is licensed under the MIT License. See the LICENSE file for details.

## Support

For technical support and questions:
- GitHub Issues: [PropGuard AI Repository]
- Documentation: [Knowledge System Docs]
- Community: [PropGuard AI Discord]

---

*Built for the Sensay Hackathon 2024 - Advancing AI-powered real estate intelligence with responsible knowledge management.*
