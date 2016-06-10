#!/bin/bash

BASIS="$(pwd)/"
RESUME_BODY_TO="${BASIS}src/app/+resume/resume-body.pug"
# Sending it as scss avoids it getting potentially overridden which could lead to weird errors (CSS is valid SCSS)
RESUME_CSS_TO="${BASIS}src/scss/resume.scss"
JSON_TO="${BASIS}src/jacob.json"

echo "This assumes the Node.js and other basics are installed"

# npm install -g angular-cli
# npm install

echo
echo "File copies..."
cp "${BASIS}node_modules/jacob-friesens-resume/jacob.json" "${JSON_TO}.tmp"
cp "${BASIS}node_modules/jacob-friesens-resume/resume_body.pug" "${RESUME_BODY_TO}.tmp"
cp "${BASIS}node_modules/jacob-friesens-resume/style.css" "${RESUME_CSS_TO}"
cp "${BASIS}customServer.js" "${BASIS}dist/server.js"

echo "Resume Extraction..."
node bin/resumeExtraction.js "${RESUME_BODY_TO}.tmp" "${RESUME_BODY_TO}" "${JSON_TO}.tmp" "${JSON_TO}"

echo "Cleanup..."
rm "${RESUME_BODY_TO}.tmp"
rm "${JSON_TO}.tmp"

echo
echo "Installation Complete."