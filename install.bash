#!/bin/bash

echo "This assumes the Node.js and other basics are installed"

npm install -g angular-cli
npm install

echo
echo "File copies."
cp "node_modules/jacob-friesens-resume/jacob.json" "src/jacob.json"
cp "customServer.js" "dist/server.js"

echo
echo "Installation Complete."