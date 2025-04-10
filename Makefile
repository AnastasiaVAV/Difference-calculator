install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint .

jest:
	npx jest

jest-coverage:
	npx jest --coverage