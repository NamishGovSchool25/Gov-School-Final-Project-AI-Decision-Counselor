# AI Decision Helper

## Overview

This is a Flask-based web application that helps users make difficult decisions by providing structured AI analysis. The application integrates with the Groq AI service to generate thoughtful decision guidance including pros, cons, considerations, and reflective questions. The platform now includes user authentication with Firebase, decision history tracking, and a comprehensive about page explaining its humanitarian mission.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✓ Added Firebase authentication with Google Sign-In
✓ Implemented user dashboard with decision history tracking  
✓ Created About page explaining humanitarian impact and mission
✓ Added dark/light theme toggle with persistent preferences
✓ Enhanced navigation with user profiles and authentication states
✓ Automatic decision saving to Firebase for logged-in users
✓ Responsive design improvements for mobile devices
✓ Simplified frontend design to look more like a high school project (January 17, 2025)
✓ Replaced formal icons with emojis and simplified language throughout
✓ Reduced complex styling and made UI more casual and approachable

## System Architecture

### Frontend Architecture
- **Technology**: HTML templates with Jinja2 templating engine
- **Styling**: Bootstrap with dark theme for responsive design
- **JavaScript**: Vanilla JavaScript for form handling and UI enhancements
- **Structure**: Template inheritance using a base template for consistent layout

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Pattern**: Simple MVC-like structure with routes, services, and templates
- **Session Management**: Flask sessions with configurable secret key
- **Middleware**: ProxyFix for proper proxy handling in deployment environments

### AI Integration
- **Service**: Groq AI API for generating decision analysis
- **Model**: Uses "llama-3.3-70b-versatile" model by default
- **Fallback**: Hardcoded API key with environment variable override capability

## Key Components

### Application Structure
- `app.py`: Main Flask application setup and configuration
- `routes.py`: Request handling and route definitions
- `groq_service.py`: AI service integration for decision analysis
- `main.py`: Application entry point

### Core Features
1. **Decision Input Form**: Collects user decisions with validation
2. **AI Analysis Generation**: Structured analysis with pros, cons, and reflective questions
3. **Results Display**: Formatted presentation of AI-generated guidance
4. **User Authentication**: Firebase Google Sign-In for personalized experience
5. **Decision History**: Dashboard showing saved decisions and analytics
6. **Theme Switching**: Dark/light mode toggle with persistent preferences
7. **About Page**: Comprehensive explanation of humanitarian mission and impact
8. **Navigation**: Dynamic navigation based on authentication state

### Templates
- `base.html`: Base template with navigation and common elements
- `index.html`: Main decision input form
- `result.html`: Analysis results display

## Data Flow

1. User submits decision through web form
2. Flask route validates input (minimum 10 characters)
3. Decision text sent to Groq AI service
4. AI generates structured analysis using predefined prompt template
5. Results formatted and displayed to user
6. User can start new analysis or return to home

## External Dependencies

### Required Services
- **Groq AI API**: Core AI analysis functionality
- **Bootstrap CDN**: UI styling and responsive design
- **Font Awesome CDN**: Icons for enhanced UI

### Python Dependencies
- Flask: Web framework
- Groq: AI service client library
- Werkzeug: WSGI utilities and middleware

### Environment Variables
- `GROQ_API_KEY`: API key for Groq service (optional, has hardcoded fallback)
- `SESSION_SECRET`: Flask session secret key (optional, has development fallback)

## Deployment Strategy

### Configuration
- **Host**: Configured for 0.0.0.0 to accept external connections
- **Port**: Default port 5000
- **Debug Mode**: Enabled for development
- **Proxy Support**: ProxyFix middleware for reverse proxy deployments

### Security Considerations
- Session secret key configurable via environment variable
- Input validation on decision text
- Error handling with user-friendly messages
- HTTPS-ready with proper proxy configuration

### Scalability Notes
- Stateless design suitable for horizontal scaling
- No database dependencies for simple deployment
- Session-based flash messaging for user feedback
- Configurable AI model selection for performance tuning