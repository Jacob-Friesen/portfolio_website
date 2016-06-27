#!/bin/bash

BASIS="$(pwd)/"
RESUME_BODY_TO="${BASIS}src/app/+resume/resume-body.pug"
# Sending it as scss avoids it getting potentially overridden which could lead to weird errors (CSS is valid SCSS)
RESUME_CSS_TO="${BASIS}src/scss/resume.scss"
JSON_TO="${BASIS}src/jacob.json"
DOWNLOADS="${BASIS}/src/downloads/"

echo "This assumes the Node.js and other basics are installed"
echo

if [ "${1}" != "--no-npm-install" ]; then
  echo "Refreshing NPM packages..."
  npm install -g angular-cli
  npm install -g typings
  npm install
  typings install lodash --global --save
fi

echo "File copies..."
mkdir -p "${DOWNLOADS}"
cp "${BASIS}node_modules/jacob-friesens-resume/Jacob_Friesen_Resume.pdf" "${DOWNLOADS}Jacob_Friesen_Resume.pdf"
cp "${BASIS}node_modules/jacob-friesens-resume/jacob.json" "${JSON_TO}.tmp"
cp "${BASIS}node_modules/jacob-friesens-resume/resume_body.pug" "${RESUME_BODY_TO}.tmp"
cp "${BASIS}node_modules/jacob-friesens-resume/style.css" "${RESUME_CSS_TO}"
cp "${BASIS}node_modules/tingle.js/dist/tingle.min.js" "${BASIS}src/app/tingle/tingle.min.js"
mkdir -p "src/css/tingle"
cp "${BASIS}node_modules/tingle.js/dist/tingle.min.css" "${BASIS}src/css/tingle/tingle.min.css"

echo "Resume Extraction..."
node bin/resumeExtraction.js "${RESUME_BODY_TO}.tmp" "${RESUME_BODY_TO}" "${JSON_TO}.tmp" "${JSON_TO}"

echo "Cleanup..."
rm "${RESUME_BODY_TO}.tmp"
rm "${JSON_TO}.tmp"

echo
echo "Installation Complete."