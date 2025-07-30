# CLAUDE.md

This file contains guidance for Claude Code when working with this codebase. This document should be updated when the codebase structure or architecture changes significantly.

## Project Overview

**Chatbot Ambiental** is a Portuguese-language environmental chatbot web application designed to answer questions about environmental regulations, particularly focused on oil and gas decommissioning processes. The application provides a simple chat interface where users can ask environmental questions and receive automated responses.

## Development Commands

### Core Commands
```bash
# Install dependencies
npm install

# Start the development server
npm start
# or
node server.js

# Run tests (basic test setup)
npm test
```

### Development Workflow
```bash
# Start development server (runs on port 3001)
node server.js

# Access the application
# Frontend: http://localhost:3001
# API base: http://localhost:3001/api
```

## Architecture Overview

### High-Level Architecture
This is a simple **monolithic web application** with the following structure:

```
chatambiental/
├── index.html          # Frontend chat interface (SPA)
├── server.js           # Express.js backend server
├── app.js              # Alternative/backup server file
├── package.json        # Dependencies and scripts
├── test.js             # Basic test file
├── src/                # Organized source code (empty structure ready for expansion)
│   ├── components/     # Future React/frontend components
│   ├── config/         # Configuration files
│   ├── services/       # Business logic services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── public/             # Static assets (currently empty)
├── tests/              # Test files (currently empty)
├── docs/               # Documentation (currently empty)
├── database/           # Database-related files
└── node_modules/       # Dependencies
```

### Technology Stack
- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla HTML/CSS/JavaScript (single-page application)
- **Styling**: Inline CSS with environmental green theme
- **HTTP**: RESTful API endpoints
- **Dependencies**: Express, CORS, Socket.IO, MongoDB/Mongoose, PostgreSQL, SQLite3, Jest (testing framework)

### Key Components

#### 1. Frontend (index.html)
- **Single-page chat application** with embedded CSS and JavaScript
- **Responsive design** with centered chat container (600px max-width)
- **Environmental theme** with green color scheme (#2e8b57)
- **Dark mode support** with theme toggle button and localStorage persistence
- **Real-time chat interface** with user/bot message differentiation
- **API integration** via fetch() to backend endpoint

#### 2. Backend Server (server.js)
- **Express.js server** running on port 3001
- **CORS enabled** for cross-origin requests
- **Static file serving** for frontend assets
- **Simple chat API** with basic keyword-based responses
- **JSON request/response handling**

#### 3. API Endpoints
```
GET  /                 # Serves main chat interface
POST /api/chat         # Processes chat messages
```

#### 4. Chat Logic
- **Keyword-based responses**: Currently detects "descomissionamento" (decommissioning)
- **Extensible architecture**: Ready for AI/ML integration or more sophisticated NLP
- **Portuguese language**: All responses in Brazilian Portuguese

### Data Flow
1. **User Input**: User types message in chat interface
2. **Frontend Processing**: JavaScript captures input, sends POST to `/api/chat`
3. **Backend Processing**: Express server receives message, applies simple keyword matching
4. **Response Generation**: Server generates appropriate response based on content
5. **Frontend Display**: Response is displayed in chat interface

### Key Patterns and Conventions

#### Code Organization
- **Single-file frontend**: All HTML, CSS, and JavaScript in `index.html` for simplicity
- **Modular backend**: Express server with clear separation of concerns
- **Environment configuration**: Ready for environment variables (PORT, database configs)

#### Naming Conventions
- **Portuguese variables**: Backend uses Portuguese variable names (`resposta`, `message`)
- **Camel case**: JavaScript follows camelCase convention
- **Kebab case**: CSS classes use kebab-case

#### Styling Patterns
- **Environmental theme**: Green color palette (#2e8b57, #1e6b47)
- **Dark mode support**: CSS custom properties with automatic theme switching
- **Responsive design**: Flexible layout with max-width constraints
- **Accessibility**: Semantic HTML structure with proper contrast in both themes
- **Smooth transitions**: 0.3s ease transitions for theme changes

## Database Architecture (Prepared but not implemented)

The project includes dependencies for multiple database options:
- **MongoDB**: With Mongoose ODM for document-based storage
- **PostgreSQL**: With pg driver for relational data
- **SQLite3**: For lightweight local development

### Future Database Schema (Environmental Focus)
```sql
-- Regulations table
regulations {
  id: PRIMARY KEY
  title: TEXT
  content: TEXT
  category: TEXT (decommissioning, waste_management, etc.)
  last_updated: TIMESTAMP
}

-- Chat sessions
chat_sessions {
  id: PRIMARY KEY
  user_id: TEXT
  created_at: TIMESTAMP
  messages: JSON
}

-- Knowledge base
knowledge_base {
  id: PRIMARY KEY
  keyword: TEXT
  response: TEXT
  category: TEXT
  confidence_score: FLOAT
}
```

## Testing Strategy

### Current Testing
- **Basic test setup**: Jest framework configured
- **Test structure**: Empty tests directory ready for expansion

### Recommended Testing Approach
```bash
# Unit tests for API endpoints
npm test -- --testPathPattern=api

# Integration tests for chat flow
npm test -- --testPathPattern=integration

# Frontend tests (when migrated to React/Vue)
npm test -- --testPathPattern=components
```

## Development Guidelines

### Adding New Features
1. **API Endpoints**: Add to `server.js` following existing pattern
2. **Frontend Logic**: Update `index.html` script section
3. **Styling**: Add CSS to existing style block, use CSS custom properties for theme compatibility
4. **Database**: Implement database models in `src/services/`
5. **Theme Support**: Ensure new UI elements support both light and dark themes using CSS variables

### Environmental Domain Knowledge
- **Decommissioning**: Oil and gas platform deactivation processes
- **Brazilian Regulations**: Focus on ANP (National Oil Agency) guidelines
- **PNRS**: National Solid Waste Policy (Law 12,305/2010)
- **Environmental Licensing**: IBAMA and state environmental agencies

### Scaling Considerations
- **AI Integration**: Ready for OpenAI API, Hugging Face, or local NLP models
- **Database Migration**: Multi-database support already configured
- **Frontend Framework**: Structure prepared for React/Vue.js migration
- **Microservices**: Can be split into chat service, knowledge service, user service

## Dark Mode Implementation

The application includes a complete dark mode implementation with the following features:

### Theme System
- **CSS Custom Properties**: All colors defined as CSS variables in `:root` and `[data-theme="dark"]`
- **Theme Toggle**: Circular button in the header with moon/sun icons
- **localStorage Persistence**: User preference saved and restored on page reload
- **Smooth Transitions**: 0.3s ease transitions for all theme changes

### Theme Colors
```css
/* Light Theme */
--bg-color: #f0f8ff;
--container-bg: white;
--header-bg: #2e8b57;

/* Dark Theme */
--bg-color: #1a1a1a;
--container-bg: #2d2d2d;
--header-bg: #1e5f3f;
```

### JavaScript Functions
- `initializeTheme()`: Sets initial theme based on localStorage
- `toggleTheme()`: Switches between light and dark modes
- Theme state managed through `data-theme` attribute on `<html>` element

### Usage
- Click the moon/sun button in the header to toggle themes
- Theme preference automatically saved and restored on next visit
- All UI elements adapt colors automatically through CSS variables

## Security Notes
- **CORS configured**: Allows cross-origin requests
- **Input validation**: Currently minimal, should be enhanced for production
- **Authentication**: Not implemented, ready for JWT integration
- **Rate limiting**: Express-rate-limit dependency available

## Production Deployment
```bash
# Environment variables to configure
PORT=3001
NODE_ENV=production
DATABASE_URL=<database_connection_string>
API_KEY=<external_api_keys>

# Build and deploy
npm install --production
node server.js
```

## Future Enhancements Ready for Implementation
1. **AI Integration**: LLM-powered responses for complex environmental queries
2. **User Authentication**: JWT-based session management
3. **Document Upload**: PDF processing for environmental regulation documents
4. **Multi-language Support**: English and Spanish versions
5. **Advanced Search**: Vector search for environmental knowledge base
6. **Real-time Updates**: WebSocket implementation for live updates
7. **Analytics Dashboard**: User interaction and query analysis
8. **Theme Customization**: Allow users to customize color schemes beyond light/dark modes

## Troubleshooting

### Common Issues
- **Port conflicts**: Change PORT in server.js if 3001 is occupied
- **CORS errors**: Verify CORS configuration in server.js
- **Database connections**: Check database service status and connection strings
- **Node version**: Requires Node.js 14+ for ES6 features

### Debugging
```bash
# Enable debug logging
DEBUG=* node server.js

# Check server health
curl http://localhost:3001

# Test API endpoint
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"descomissionamento"}'
```

This codebase represents a foundational environmental chatbot with clear growth paths for AI integration, database implementation, and frontend framework adoption while maintaining its focus on Brazilian environmental regulations and Portuguese language support.