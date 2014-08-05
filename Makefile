# Unit
test:
	karma start config/karma.conf.js
test-u: test
test-unit: test-u

test-w:
	karma start config/karma-watch.conf.js
test-u-w: test-w
test-unit-watch: test-u-w

# Integration
test-e:
	karma start config/karma-e2e.conf.js
test-end-to-end: test-e

test-e-w:
	karma start config/karma-e2e-watch.conf.js
test-end-to-end-watch: test-e-w

# All at once
test-a:
	karma start config/karma.conf.js && karma start config/karma-e2e.conf.js
test-all: test-a

.PHONY: test test-w test-e test-e-w test-a

# Compilation

compile-js:
	cd public && ./compress_constants
	cd public/javascripts && ./minify
	cd public/javascripts/desktop && ./minify
	cd public/javascripts/mobile && ./minify
compile-javascript: compile-js

compile-css:
	cd public/stylesheets && ./minify
	cd public/stylesheets/desktop && ./minify
	cd public/stylesheets/mobile && ./minify

compile-layout:
	cd views && ./minify

compile-a: compile-js compile-css compile-layout
compile-all: compile-a

# compile-index

.PHONY: compile-js compile-javascript compile-css compile-layout compile-a compile-all