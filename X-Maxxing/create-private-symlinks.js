#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of Metro packages that need private symlinks
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

function createPrivateSymlink(packageName) {
  const packageDir = path.join(__dirname, 'node_modules', packageName);
  
  if (!fs.existsSync(packageDir)) {
    console.log(`Package ${packageName} not found, skipping...`);
    return;
  }

  const srcDir = path.join(packageDir, 'src');
  const privateLink = path.join(packageDir, 'private');

  if (!fs.existsSync(srcDir)) {
    console.log(`${packageName} has no src directory, skipping...`);
    return;
  }

  try {
    // Remove existing private link/dir if it exists
    if (fs.existsSync(privateLink)) {
      fs.unlinkSync(privateLink);
    }
    
    // Create symlink from private -> src
    fs.symlinkSync('src', privateLink);
    console.log(`✓ Created private symlink for ${packageName}`);
  } catch (error) {
    console.error(`Error creating symlink for ${packageName}:`, error.message);
  }
}

console.log('Creating private symlinks for Metro packages...');
metroPackages.forEach(createPrivateSymlink);
console.log('Done!');