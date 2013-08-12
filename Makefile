test:
	karma start config/karma.conf.js
test-u: test
test-unit: test-u

test-e:
	karma start config/karma-e2e.conf.js
test-end-to-end: test-e

.PHONY: test test-e