#!/usr/bin/env node

/**
 * Production Health Check Script
 * Tests if the backend is running correctly
 */

const https = require('https');
const http = require('http');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const TIMEOUT = 10000; // 10 seconds

function checkHealth(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(`${url}/api/health`, { timeout: TIMEOUT }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ statusCode: res.statusCode, body: response });
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function main() {
  console.log(`🔍 Checking health of: ${BACKEND_URL}`);
  console.log('');
  
  try {
    const { statusCode, body } = await checkHealth(BACKEND_URL);
    
    if (statusCode === 200 && body.status === 'healthy') {
      console.log('✅ Backend is healthy!');
      console.log('');
      console.log('Response:', JSON.stringify(body, null, 2));
      process.exit(0);
    } else {
      console.error('❌ Backend is unhealthy');
      console.error('Status Code:', statusCode);
      console.error('Response:', JSON.stringify(body, null, 2));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Health check failed');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
