install:
		npm ci
publish:
		npm publish --dry-run
lint:
		npx eslint .
test:
		npx jest
test-coverage:
		npx jest --coverage
fix-linter:
		npx eslint --fix .