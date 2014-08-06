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

# Cleaning

clean-js:
	cd public && ./clean_constants
	cd public/javascripts && ./clean
clean-javascript: compile-js

clean-css:
	cd public/stylesheets && ./clean
	cd public/stylesheets/desktop && ./clean
	cd public/stylesheets/mobile && ./clean

clean-a: clean-js clean-css
clean-all: clean-a
clean: clean-all

.PHONY: clean-js clean-javascript clean-css clean-a clean-all clean

# Compilation

compile-js:
	cd public && ./compress_constants
	cd public/javascripts && ./minify
compile-javascript: compile-js

compile-css:
	cd public/stylesheets && ./minify
	cd public/stylesheets/desktop && ./minify
	cd public/stylesheets/mobile && ./minify

compile-layout:
	cd views && ./minify

compile-a: compile-js compile-css compile-layout
compile-all: compile-a
compile: compile-all

# compile-index

.PHONY: compile-js compile-javascript compile-css compile-layout compile-a compile-all compile