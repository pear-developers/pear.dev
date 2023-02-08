NAME = pear.dev
VERSION = 0.0.1

.PHONY: build run dev

build:
	@cd www/ && yarn && yarn build
	@cp server/src/* build/ && mv build/_customServer.ts build/index.ts && rm build/index.js

run:
	@deno run --allow-env --allow-read --allow-net build/index.ts

dev:
	@cd www/ && yarn && yarn dev