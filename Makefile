# Makefile was copied from a random github repository. If something doesn't work this can be the reason...

APPLICATION_NAME:=frontendui

.PHONY: test
test: ## Run all the tests
	yarn test

.PHONY: fmt
fmt:
	yarn format

#.PHONY: lint
#lint: ## Run all the linters
#	yarn lint

.PHONY: build
build: ## Build a version
	yarn build

# Absolutely awesome: http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := build

.PHONY: docker-build
docker-build:
	docker build -t gremiumsoft/${APPLICATION_NAME} .

.PHONY: docker-deploy
docker-deploy: docker-build
	docker push gremiumsoft/${APPLICATION_NAME}

.PHONY: deploy-latest
deploy-latest:
	kubectl patch deployment ${APPLICATION_NAME} -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"

.PHONY: kube-apply
kube-apply:
	kubectl apply -f k8s/
