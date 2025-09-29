# PropGuard AI - Sensay Platform Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
git clone https://github.com/your-username/sensay-real-estate.git
cd sensay-real-estate
npm install
```

### Environment Configuration
Create `.env.local`:
```env
# Sensay API Configuration
VITE_SENSAY_API_KEY=your_sensay_api_key
VITE_SENSAY_ORG_ID=your_organization_id

# PropGuard AI Integration
VITE_PROPGUARD_API_URL=https://api.propguard.ai/v1
VITE_PROPGUARD_API_KEY=your_propguard_api_key

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: ElevenLabs Integration
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build

# Deploy to Vercel (recommended)
npx vercel --prod
```

## 📁 Project Structure

```
sensay-real-estate/
├── src/                          # Frontend React application
│   ├── components/              # React components
│   │   ├── sensay/              # Sensay AI integration components
│   │   ├── dashboard/           # Dashboard components
│   │   └── ui/                  # Reusable UI components
│   ├── pages/                   # Application pages
│   ├── services/                # API services and business logic
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
├── docs/                        # Documentation
│   ├── setup/                   # Setup and configuration guides
│   ├── integration/             # API integration documentation
│   └── features/                # Feature documentation
├── scripts/                     # Setup scripts and utilities
├── supabase/                    # Supabase configuration and functions
├── propguard-ai-backend/        # Python backend services
└── reports/                     # Sample reports and documentation
```

## 🔧 Setup Scripts

Run setup scripts from the `scripts/` directory:

```bash
# HeyGen setup
./scripts/setup-heygen.sh

# Supabase secrets configuration
./scripts/setup-supabase-secrets.sh
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### Manual
```bash
npm run build
# Serve dist/ folder with your preferred web server
```

## 📚 Additional Documentation

- **[Complete Hackathon Submission](docs/README_SUBMISSION.md)**
- **[API Integration Guide](docs/integration/)**
- **[Feature Documentation](docs/features/)**
- **[Backend Setup](propguard-ai-backend/README.md)**

## 🆘 Support

- **GitHub Issues**: [Open Issue](https://github.com/your-username/sensay-real-estate/issues)
- **Documentation**: Check documentation in `docs/` directory
- **Live Demo**: [PropGuard AI Sensay Platform](https://propguard-ai-sensay.vercel.app)
