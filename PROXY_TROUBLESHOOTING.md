# Squid Proxy Troubleshooting Guide

## Issue
The API endpoint `https://emotion-analysis.rdc.nie.edu.sg/api/community-data/community-id` is returning 500 errors due to squid proxy configuration issues.

## Root Causes
1. Missing `squid.conf` configuration file
2. Proxy authentication/connectivity issues
3. Network routing problems between containers

## Solutions Applied

### 1. Created Squid Configuration (`squid.conf`)
- Added proper ACLs for Docker networks
- Configured SSL/HTTPS support
- Added specific rules for RDC domains
- Set up proper logging and DNS configuration

### 2. Enhanced Backend Error Handling
- Improved proxy configuration in axios requests
- Added detailed logging for debugging
- Better error responses with HTTP status codes
- Added request timeouts

### 3. Network Connectivity
- Ensured squid container is properly networked
- Added proxy connectivity testing script

## Testing Steps

### Step 1: Rebuild and Start Services
```bash
# Stop all services
docker-compose down

# Rebuild with new configuration
docker-compose up --build -d
```

### Step 2: Test Proxy Connectivity
```bash
# Run the proxy test script
./test-proxy.sh

# Or manually test from backend container
docker exec emotion_backend curl -I --proxy squid:3128 https://kf6.rdc.nie.edu.sg/auth/local
```

### Step 3: Check Logs
```bash
# Backend logs
docker logs emotion_backend -f

# Squid logs
docker logs squid_proxy -f

# Test API endpoint
curl "http://localhost/api/community-data/community-id/YOUR_COMMUNITY_ID"
```

### Step 4: Debug Mode (Optional)
```bash
# Run with debug configuration
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up --build
```

## Common Issues and Solutions

### Issue 1: Squid Container Won't Start
**Symptoms**: `squid_proxy` container exits immediately
**Solutions**:
- Check `squid.conf` syntax
- Ensure proper file permissions
- Check Docker logs: `docker logs squid_proxy`

### Issue 2: Proxy Authentication Failed
**Symptoms**: 407 Proxy Authentication Required
**Solutions**:
- Verify RDC credentials in docker-compose.yml
- Check if proxy requires authentication
- Test with direct connection (temporarily remove proxy)

### Issue 3: Network Connectivity Issues
**Symptoms**: Connection timeouts, ECONNREFUSED
**Solutions**:
- Verify all containers are on same network
- Check container name resolution: `docker exec emotion_backend ping squid`
- Ensure squid is listening on port 3128

### Issue 4: SSL/TLS Issues
**Symptoms**: SSL handshake errors, certificate issues
**Solutions**:
- Update squid SSL configuration
- Add certificate handling
- Test with HTTP first, then HTTPS

## Environment Variables

Make sure these are set in your backend service:
```yaml
environment:
  HTTPS_PROXY: http://squid:3128
  RDC_USERNAME: your_username
  RDC_PASSWORD: your_password
```

## Monitoring

### Real-time Logs
```bash
# Watch all logs
docker-compose logs -f

# Watch specific service
docker-compose logs -f backend squid
```

### Health Checks
```bash
# Check if services are running
docker-compose ps

# Test API endpoint health
curl -v "http://localhost/api/user-info"
```

## Fallback Options

If proxy continues to cause issues:

1. **Temporary Direct Connection**: Remove proxy configuration temporarily
2. **Alternative Proxy**: Use different proxy service
3. **Network Debugging**: Use tcpdump/wireshark in containers
4. **VPN Solution**: Consider VPN instead of HTTP proxy
