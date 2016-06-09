#!/bin/bash

echo "This assumes the Node.js and other basics are installed"

npm install -g angular-cli
npm install

cp "node_modules/jacob-friesens-resume/jacob.json" "src/jacob.json"

echo
echo "Installation Complete."