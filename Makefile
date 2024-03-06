install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npx start-server -p 5001 -s ./frontend/build

build:
	rm frontend/build -rf
	npm run build