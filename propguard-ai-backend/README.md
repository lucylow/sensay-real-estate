# PropGuard AI Backend

Python backend services for the PropGuard AI platform with comprehensive AI features and integrations.

## 🚀 Features

### AI-Powered Services
- **Knowledge Management**: Automated knowledge training and retrieval
- **Continuous Learning**: Self-improving AI models
- **LLM Integration**: Custom language model integration
- **AI Features**: Advanced AI capabilities for real estate analysis

### Blockchain Integration
- **NFT Management**: Property certificate tokenization
- **Smart Contracts**: Automated escrow and transactions
- **Audit Trails**: Immutable property history records

###
### External Integrations
- **ElevenLabs TTS**: Text-to-speech for voice tours
- **HeyGen Avatar**: AI-powered avatars for virtual tours
- **PropGuard API**: Property analysis and risk assessment

## 📁 Project Structure

```
propguard-ai-backend/
├── src/
│   ├── continuous_learning_engine.py  # Self-learning AI system
│   ├── knowledge_training.py          # Knowledge management
│   ├── generatory.py                   # AI generation utilities
│   ├── models/                        # Data models
│   │   ├── nft.py                     # NFT certificate model
│   │   └── user.py                    # User model
│   ├── routes/                        # API endpoints
│   │   ├── ai_features.py             # AI feature endpoints
│   │   ├── blockchain.py              # Blockchain operations
│   │   ├── elevenlabs.py              # ElevenLabs integration
│   │   ├── heygen.py                  # HeyGen integration
│   │   ├── knowledge_management.py    # Knowledge operations
│   │   ├── llm_integration.py         # LLM integration
│   │   ├── propguard.py               # PropGuard AI operations
│   │   └── user.py                     # User management
│   └── services/                       # Business logic
├── database/
│   └── app.db                         # SQLite database
├── requirements.txt                   # Python requirements
└── nyx-os-config.yaml                # Configuration
```

## 🔧 Installation

### Prerequisites
- Python 3.8+
- pip or pipenv

### Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Initialize database
python src/main.py --init-db

# Start development server
python src/main.py
```

## 🛠️ API Endpoints

### AI Features
- `POST /api/ai/generate`: Generate AI content
- `GET /api/ai/insights`: Get AI insights
- `POST /api/ai/learn`: Process learning data

### Blockchain
- `POST /api/blockchain/mint`: Mint NFT certificate
- `GET /api/blockchain/verify`: Verify property NFT
- `GET /api/blockchain/history`: Property audit trail

### User Management
- `POST /api/users/register`: Register new user
- `POST /api/users/login`: User authentication
- `GET /api/users/profile`: Get user profile

### Integrations
- `POST /api/elevenlabs/synthesize`: Text-to-speech conversion
- `POST /api/heygen/create`: Create AI avatar
- `GET /api/propguard/analyze`: Property analysis

## 📊 Database Schema

### Users Table
- `id`: Primary key
- `email`: User email (unique)
- `profile_data`: JSON user preferences
- `created_at`: Registration timestamp

### NFTs Table
- `id`: Token ID
- `property_id`: Associated property
- `metadata`: JSON property metadata
- `contract_address`: Blockchain address

### Knowledge Base
- `id`: Knowledge entry ID
- `content`: Knowledge content
- `embeddings`: Vector embeddings
- `source`: Source of knowledge

## 🔬 AI Features

### Knowledge Management
Automated knowledge extraction, processing, and retrieval system.

### Continuous Learning
Self-improving AI models that learn from user interactions and feedback.

### LLM Integration
Custom language model integration for real estate domain expertise.

## 🌐 Deployment

### Local Development
```bash
python src/main.py
```

### Production Deployment
```bash
# Using Gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 src.main:app

# Using Docker
docker build -t propguard-backend .
docker run -p 8000:8000 propguard-backend
```

## 📚 Related Services

- **[Frontend Application](../src/)**
- **[Supabase Functions](../supabase/functions/)**
- **[API Integration](../docs/integration/README.md)**
