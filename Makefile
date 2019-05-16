install:
	npm install -g

start:
	npm run babel-node -- src/server.js

lint:
	npm run eslint src