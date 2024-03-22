install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npm start

build:
	rm frontend/build -rf
	npm run build

lint:
	make -C frontend lint