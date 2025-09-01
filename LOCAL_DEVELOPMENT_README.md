# Local Development Setup for Emotion Analysis

## Overview

This guide explains how to set up the Emotion Analysis application for local development without needing to be redirected from Knowledge Forum (KF).

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm (for local development outside Docker)

## Quick Start

### 1. Environment Configuration

The application automatically detects when running on localhost and uses local authentication.

### 2. Docker Setup

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f backend
```

### 3. Access the Application

- Main App: http://localhost
- Form: http://localhost/form
- Backend API: http://localhost/api

## How Local Authentication Works

### Automatic Token Setup

When you access the application on localhost, it automatically:

1. **Detects Local Environment**: Checks if hostname is `localhost`, `127.0.0.1`, or `0.0.0.0`
2. **Authenticates with Backend**: Calls `/api/test-auth` endpoint using RDC credentials
3. **Stores Token**: Saves the token in localStorage for API calls
4. **Sets Community ID**: Uses a static community ID for development

### RDC Credentials

The backend uses these environment variables (set in docker-compose.yml):

```yaml
RDC_USERNAME: gaoxiazhu
RDC_PASSWORD: Testemotionanalytics
```

### Static Community ID

For local development, the app uses:

```typescript
communityId: "6645ab836782b352b64ea86c";
```

## Manual Token Management

### Check Current Setup

You can check the current authentication status by opening browser console and running:

```javascript
// Check if token exists
localStorage.getItem("access_token");

// Check current community ID
// (This requires accessing the CommunityService, but you can see it in console logs)
```

### Manual Token Setup

If needed, you can manually set a token:

```javascript
// Set a token manually (replace with actual token)
localStorage.setItem("access_token", "your-token-here");
```

### Reset Local Environment

To reset the local setup:

```javascript
// Clear token
localStorage.removeItem("access_token");

// The app will re-authenticate on next page load
```

## Troubleshooting

### Token Issues

If you're having token problems:

1. **Check Backend Logs**:

   ```bash
   docker-compose logs backend
   ```

2. **Test Authentication Endpoint**:

   ```bash
   curl http://localhost/api/test-auth
   ```

3. **Verify RDC Credentials**: Make sure the credentials in docker-compose.yml are correct

### Community ID Issues

If community data isn't loading:

1. **Check Console Logs**: Look for community ID related messages
2. **Verify Community ID**: The static ID should be `6645ab836782b352b64ea86c`
3. **Check API Endpoints**: Ensure the backend can access the community data

### Database Issues

If reflection history or survey data isn't showing:

1. **Check MongoDB Connection**:

   ```bash
   docker-compose logs mongo
   ```

2. **Verify Data**: Connect to MongoDB and check collections:
   ```bash
   docker exec -it emotion_mongo mongo -u liang -p luya --authenticationDatabase Emotion
   ```

## Development Workflow

### Making Changes

1. **Frontend Changes**: The app auto-reloads when running with `ng serve`
2. **Backend Changes**: Restart the backend container:
   ```bash
   docker-compose restart backend
   ```
3. **Database Changes**: MongoDB data persists in `./mongo-data/`

### Testing Different Scenarios

- **Different Community IDs**: Update the static community ID in `environment.ts`
- **Different Tokens**: Manually set tokens in localStorage for testing
- **API Testing**: Use tools like Postman to test endpoints directly

## Configuration Files

### Key Files for Local Development

- `docker-compose.yml`: Service configuration and environment variables
- `EmotionFrontend/src/environment.ts`: Frontend environment settings
- `EmotionFrontend/src/app/services/local-setup.service.ts`: Local authentication logic
- `EmotionBackend/routes/routes.js`: Backend authentication endpoints

### Environment Variables

```yaml
# Backend
RDC_USERNAME: gaoxiazhu
RDC_PASSWORD: Testemotionanalytics
API_HOST: https://kf6.rdc.nie.edu.sg/api/analytics/emotions/note-emotions/community-id

# Frontend
apiUrl: "http://localhost/api"
useLocalToken: true
communityId: "6645ab836782b352b64ea86c"
```

## Advanced Configuration

### Custom Community ID

To use a different community ID for testing:

```typescript
// In environment.ts
localDev: {
  communityId: "your-custom-community-id";
}
```

### Disable Local Token Setup

To disable automatic local token setup:

```typescript
// In environment.ts
localDev: {
  useLocalToken: false;
}
```

### Custom RDC Credentials

To use different RDC credentials:

```yaml
# In docker-compose.yml
environment:
  RDC_USERNAME: your-username
  RDC_PASSWORD: your-password
```

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Review Docker container logs
3. Verify network connectivity to external APIs
4. Ensure MongoDB is running and accessible
