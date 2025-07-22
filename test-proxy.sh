#!/bin/bash

echo "Testing Squid Proxy Connectivity..."

# Test 1: Check if squid container is running
echo "1. Checking if squid container is running..."
docker ps | grep squid

# Test 2: Test proxy connectivity from backend container
echo "2. Testing proxy connectivity from backend container..."
docker exec emotion_backend sh -c "curl -I --proxy squid:3128 https://kf6.rdc.nie.edu.sg/auth/local"

# Test 3: Test direct connectivity (without proxy)
echo "3. Testing direct connectivity from backend container..."
docker exec emotion_backend sh -c "curl -I https://kf6.rdc.nie.edu.sg/auth/local"

# Test 4: Check squid logs
echo "4. Checking squid access logs..."
docker logs squid_proxy --tail 20

echo "Test completed!"
