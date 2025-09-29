# Scripts Directory

This directory contains utility scripts and integration examples for the PropGuard AI - Sensay platform.

## 📋 Script Files

### Setup Scripts

#### `setup-heygen.sh`
HeyGen AI Avatar service setup script
- Configures HeyGen API credentials
- Sets up avatar creation environment
- Initializes video generation pipeline

#### `setup-supabase-secrets.sh`
Supabase secrets configuration script
- Configures database connection
- Sets up environment variables
- Initializes authentication system

### Demo Scripts

#### `sensay-demo.js`
Sensit live demonstration script
- Demonstrates Sensay API integration
- Shows conversation flow examples
- Tests multi-language functionality

#### `test-sensay-supabase.js`
Sensay-Supabase integration testing
- Tests database connectivity
- Validates Sensay API calls
- Checks real-time functionality

### Integration Examples

#### `realty-integration-example.py`
Real estate data integration example
- Property data API examples
- Market analysis integration
- Risk assessment examples

#### `realty_base_au.py`
Australian real estate base integration
- Domain.com.au API integration
- Property search algorithms
- Market data processing

#### `realty_base_global.py`
Global real estate data integration
- International property APIs
- Market comparison algorithms
- Cross-border data processing

#### `realty_integration.py`
Complete real estate integration
- Multi-source data aggregation
- Property analysis algorithms
- Market intelligence processing

## 🚀 Usage

### Setting up Development Environment
```bash
# Run setup scripts
chmod +x scripts/setup-*.sh
./scripts/setup-heygen.sh
./scripts/setup-supabase-secrets.sh
```

### Testing Integration
```bash
# Test Sensay integration
node scripts/test-sensay-supabase.js

# Demo Sensay features
node scripts/sensay-demo.js
```

### Python Integration Examples
```bash
# Run integration examples
python scripts/realty-integration-example.py
python scripts/realty_base_au.py
python scripts/realty_base_global.py
python scripts/realty_integration.py
```

## 📁 File Structure

```
scripts/
├── README.md                       # This documentation
├── setup-heygen.sh                 # HeyGen setup script
├── setup-supabase-secrets.sh       # Supabase secrets script
├── sensay-demo.js                  # Sensay demo script
├── test-sensay-supabase.js         # Sensay-Supabase test
├── realty-integration-example.py   # Property integration example
├── realty_base_au.py               # Australian property API
├── realty_base_global.py           # Global property API
└── realty_integration.py           # Complete property integration
```

## 🔧 Configuration

Before running scripts, ensure you have:

1. **Node.js 18+** for JavaScript scripts
2. **Python 3.8+** for Python scripts
3. **Required API keys** in environment variables
4. **Proper permissions** for script execution

## 📚 Related Documentation

- **[Main Setup Guide](../docs/SETUP_GUIDE.md)**
- **[API Integration](../docs/integration/README.md)**
- **[Features Documentation](../docs/features/README.md)**
