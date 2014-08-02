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