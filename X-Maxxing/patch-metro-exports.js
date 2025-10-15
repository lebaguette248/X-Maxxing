#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of Metro packages that need patching
const metroPackages = [
  'metro',
  'metro-cache',
  'metro-config',
  'metro-core',
  'metro-file-map',
  'metro-resolver',
  'metro-runtime',
  'metro-source-map',
  'metro-transform-plugins',
  'metro-transform-worker',
  'metro-babel-transformer',
  'metro-cache-key',
  'metro-minify-terser'
];

function patchPackageExports(packageName) {
  const packageJsonPath = path.join(__dirname, 'node_modules', packageName, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`Package ${packageName} not found, skipping...`);
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Remove the restrictive exports completely to fall back to traditional resolution
    if (packageJson.exports) {
      delete packageJson.exports;
      
      // Write back the modified package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`✓ Removed restrictive exports from ${packageName}`);
    } else {
      console.log(`${packageName} has no exports field, skipping...`);
    }
  } catch (error) {
    console.error(`Error patching ${packageName}:`, error.message);
  }
}

console.log('Patching Metro package exports...');
metroPackages.forEach(patchPackageExports);
console.log('Done!');