# Sensay API Tutorial: Building a Chat Application

This tutorial demonstrates how to build a modern chat application using Sensay API with React, TypeScript, and Tailwind CSS. The implementation follows the official Sensay API tutorial patterns and includes all the key components outlined in the tutorial.

## 🚀 Live Demo

- **Tutorial Application**: Navigate to `/tutorial` in this application
- **Source Code**: Available in this repository
- **Live Deployment**: [https://sensay-api-chat-tutorial-sensay.vercel.app/](https://sensay-api-chat-tutorial-sensay.vercel.app/)

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ Node.js 18+ installed (we recommend using [fnm](https://github.com/Schniz/fnm) for version management)
- ✅ A Sensay API key (either an invitation code or an active API key)
- ✅ Basic knowledge of React, TypeScript, and Vite/Next.js
- ✅ Git installed

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd sensay-real-estate-tutorial
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Sensay API Configuration
VITE_SENSAY_API_KEY=your_api_key_here
VITE_SENSAY_ORG_ID=your_organization_id_here  # Optional
VITE_SENSAY_BASE_URL=https://api.sensay.io   # Optional
```

**Alternative**: You can also paste your API key directly in the application interface when prompted.

### 4. Generate SDK (Optional)

To generate the latest Sensay API SDK:

```bash
npm run generate-sdk
```

⚠️ **Note**: The SDK generation requires valid Sensay API access. A fallback SDK is provided for development.

### 5. Run the Application

```bash
npm run dev
```

This will start the application on `http://localhost:3000`. Navigate to `/tutorial` to access the chat application tutorial.

## 🏗️ Architecture Overview

The tutorial application demonstrates a complete integration with Sensay API, handling:

### Core Components

1. **SDK Generation**: Uses `openapi-typescript-codegen` to generate a fully typed client
2. **Authentication Flow**: Demonstrates both organization-level and user-level authentication
3. **Chat Interface**: A responsive UI built with React and Tailwind CSS
4. **User Management**: Creates and manages users
5. **Replica Management**: Handles replica creation and retrieval
6. **Conversation Management**: Maintains chat sessions and context

### Key Files

```
src/
├── components/
│   ├── ChatApplication.tsx     # Main chat interface
│   └── TutorialPage.tsx       # Tutorial navigation and setup
├── lib/
│   └── sensay-client.ts       # Sensay API client and utilities
├── pages/
│   └── TutorialPage.tsx       # Tutorial application page
└── sdk/
    └── Client.ts              # Generated Sensay API client
```

## 📚 Tutorial Implementation

### Application Initialization Flow

When you first start the application, it performs the following steps (following the tutorial pattern):

1. **Initializes a client** using your provided API key
2. **Checks if a sample user exists**, creating one if necessary
3. **Checks for existing replicas**, creating a default one if none exists
4. **Sets up the authenticated chat session**

### Key Implementation Patterns

#### Client Initialization

```typescript
// Organization-level authentication (admin access)
const organizationClient = new Client({
  BASE: 'https://api.sensay.io',
  HEADERS: {
    'X-ORGANIZATION-SECRET': apiKey,
    'Content-Type': 'application/json',
  },
});

// User-level authentication
const userClient = new Client({
  BASE: 'https://api.sensay.io',
  HEADERS: {
    'X-ORGANIZATION-SECRET': apiKey,
    'X-USER-ID': userId,
    'Content-Type': 'application/json',
  },
});
```

#### User Management

```typescript
// Check if user exists
try {
  const user = await organizationClient.users.getUsersGet({
    id: userId,
  });
  console.log('User exists:', user);
  return user;
} catch (error) {
  if (error.status === 404) {
    // Create user if not found
    const newUser = await organizationClient.users.createUsersPost({
      id: userId,
    });
    console.log('Created new user:', newUser);
    return newUser;
  }
  throw error;
}
```

#### Replica Management

```typescript
// List replicas for the user
const replicas = await userClient.replicas.listReplicasGet();

if (replicas.items.length === 0) {
  // Create a new replica if none exists
  const newReplica = await userClient.replicas.createReplicaPost({
    name: `Sample Replica ${Date.now()}`,
    shortDescription: 'A helpful assistant for demonstration purposes',
    greeting: 'Hello! I am a sample replica. How can I help you today?',
    ownerID: userId,
    private: false,
    slug: `sample-replica-${Date.now()}`,
    llm: {
      provider: 'openai',
      model: 'gpt-4o',
    },
  });
  return newReplica.uuid;
}

// Use the first available replica
return replicas.items[0].uuid;
```

#### Chat Interaction

```typescript
// Send a chat message and get a response
const response = await userClient.replicaChatCompletions.createChatCompletionPost({
  replicaUuid: replicaId,
  content: message,
});

if (response.success) {
  // Process and display the response
  setMessages((prev) => [
    ...prev,
    { role: 'assistant', content: response.content },
  ]);
}
```

## 🔄 SDK Regeneration

One of the key features of this integration approach is the ability to quickly adapt to API changes by regenerating the SDK:

```bash
npm run generate-sdk
```

This script fetches the latest OpenAPI specification and generates updated TypeScript client code in the `src/sdk` directory.

💡 **Recommendation**: Regenerate your SDK regularly to stay current with the API.

## 🛠️ Troubleshooting

### Common Issues

#### 1. Authentication Errors
**Problem**: If you encounter authentication errors
**Solutions**:
- Verify your API key is correct and not expired
- Check that you're including the proper headers for your requests
- Ensure you're using the correct user ID when authenticating as a user

#### 2. "User not found" Errors
**Problem**: This typically means the user ID doesn't exist in your organization
**Solutions**:
- Verify the user has been created using the tutorial flow
- Check that you're using the correct organization API key
- Ensure you're not mixing user IDs between different organizations

#### 3. SDK Type Errors
**Problem**: If you encounter TypeScript errors after regenerating the SDK
**Solutions**:
- Make sure your code is updated to match any breaking changes in the API
- Check the Sensay API documentation for information about API changes
- Join the Sensay API Telegram Channel for announcements about breaking changes

#### 4. SDK Generation Fails
**Problem**: The SDK generation script fails
**Solutions**:
- Ensure you have `openapi-typescript-codegen` installed globally or locally
- Check your internet connection to access the Sensay OpenAPI specification
- Use the fallback SDK provided for development

## 🎯 Features Demonstrated

This tutorial demonstrates all the key features mentioned in the official Sensay tutorial:

- ✅ **SDK Generation**: Automatic client generation from OpenAPI spec
- ✅ **Organization Authentication**: Admin-level access for user management
- ✅ **User-level Authentication**: Scoped access for user operations
- ✅ **User Management**: Create, retrieve, and manage users
- ✅ **Replica Management**: List and create replicas with LLM configuration
- ✅ **Chat Interface**: Real-time chat with message handling
- ✅ **Conversation Continuity**: Maintain context across chat sessions
- ✅ **Error Handling**: Graceful fallbacks and error recovery
- ✅ **Responsive UI**: Modern, mobile-friendly interface
- ✅ **Tutorial Flow**: Step-by-step guidance for setup and usage

## 📖 Next Steps

Now that you have a working chat application, consider:

1. **Customizing the UI**: Adapt the interface to match your brand and requirements
2. **Adding Training**: Use the Training API to make your replicas more knowledgeable
3. **Implementing Additional Features**: Explore features like voice integration or multiple replica support
4. **Deploying Your Application**: Deploy to services like Vercel, Netlify, or your own infrastructure

## 🔗 Additional Resources

- [Sensay Documentation](https://sensay.io/docs)
- [Sensay API Telegram Channel](https://t.me/sensayapi)
- [OpenAPI Tools](https://openapi.tools/)
- [Source Code Repository](https://github.com/sensay-io/chat-client-sample)

## 📝 License

This tutorial implementation is provided as-is for educational purposes. Please refer to Sensay's terms of service for usage of their API.

---

**Built with ❤️ using Sensay API, React, TypeScript, and Tailwind CSS**
