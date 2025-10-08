#!/usr/bin/env node

/**
 * Environment Configuration Checker
 * Validates that all required environment variables are set correctly
 */

const requiredBackendVars = [
  'DATABASE_URL',
  'NODE_ENV',
  'PORT',
  'HOST',
  'CORS_ORIGIN',
];

const optionalBackendVars = [
  'JWT_SECRET',
  'API_KEY',
  'RATE_LIMIT_MAX',
  'RATE_LIMIT_WINDOW',
  'LOG_LEVEL',
];

const requiredFrontendVars = [
  'NEXT_PUBLIC_API_URL',
];

function checkEnvironment(vars, label, isRequired = true) {
  console.log(`\n${label}:`);
  console.log('─'.repeat(50));
  
  let allSet = true;
  
  vars.forEach(varName => {
    const value = process.env[varName];
    const isSet = value !== undefined && value !== '';
    
    if (isSet) {
      // Mask sensitive values
      const displayValue = ['DATABASE_URL', 'JWT_SECRET', 'API_KEY'].includes(varName)
        ? '***' + value.slice(-4)
        : value;
      console.log(`✅ ${varName}: ${displayValue}`);
    } else {
      if (isRequired) {
        console.log(`❌ ${varName}: NOT SET (REQUIRED)`);
        allSet = false;
      } else {
        console.log(`⚠️  ${varName}: NOT SET (optional)`);
      }
    }
  });
  
  return allSet;
}

function validateValues() {
  console.log('\n\nValidation Checks:');
  console.log('─'.repeat(50));
  
  const errors = [];
  
  // Check DATABASE_URL format
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && !dbUrl.startsWith('postgres://') && !dbUrl.startsWith('postgresql://')) {
    errors.push('DATABASE_URL should start with postgresql://');
  }
  
  // Check PORT is a number
  const port = process.env.PORT;
  if (port && isNaN(Number(port))) {
    errors.push('PORT should be a valid number');
  }
  
  // Check CORS_ORIGIN format
  const corsOrigin = process.env.CORS_ORIGIN;
  if (corsOrigin && corsOrigin !== '*' && !corsOrigin.startsWith('http')) {
    errors.push('CORS_ORIGIN should start with http:// or https://');
  }
  
  // Check NEXT_PUBLIC_API_URL format
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl && !apiUrl.startsWith('http')) {
    errors.push('NEXT_PUBLIC_API_URL should start with http:// or https://');
  }
  
  if (errors.length > 0) {
    errors.forEach(err => console.log(`❌ ${err}`));
    return false;
  } else {
    console.log('✅ All validation checks passed');
    return true;
  }
}

function main() {
  console.log('\n🔍 Environment Configuration Check');
  console.log('═'.repeat(50));
  
  // Determine which set of variables to check
  const isBackend = process.cwd().includes('backend');
  const isFrontend = process.cwd().includes('frontend');
  
  let allValid = true;
  
  if (isBackend || (!isBackend && !isFrontend)) {
    console.log('\n📦 BACKEND Configuration');
    const requiredOk = checkEnvironment(requiredBackendVars, 'Required Variables', true);
    checkEnvironment(optionalBackendVars, 'Optional Variables', false);
    allValid = allValid && requiredOk;
  }
  
  if (isFrontend || (!isBackend && !isFrontend)) {
    console.log('\n🎨 FRONTEND Configuration');
    const requiredOk = checkEnvironment(requiredFrontendVars, 'Required Variables', true);
    allValid = allValid && requiredOk;
  }
  
  const validationOk = validateValues();
  allValid = allValid && validationOk;
  
  console.log('\n' + '═'.repeat(50));
  
  if (allValid) {
    console.log('\n✅ Configuration is valid! Ready to deploy.\n');
    process.exit(0);
  } else {
    console.log('\n❌ Configuration has issues. Please fix them before deploying.\n');
    console.log('💡 Tip: Copy .env.example to .env and fill in the values.\n');
    process.exit(1);
  }
}

// Load .env file if it exists
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not available, that's ok
}

main();
