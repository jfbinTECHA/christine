#!/bin/bash

# Run npm audit to check for vulnerabilities
npm audit

# Fix vulnerabilities with npm audit fix --force
npm audit fix --force

# Install missing dependencies
npm install

# Verify if expo is installed
if [ -x "$(command -v expo)" ]; then
    # If expo is installed, update to the latest version
    expo upgrade
else
    # If expo is not installed, install it globally
    npm install -g expo-cli
fi
