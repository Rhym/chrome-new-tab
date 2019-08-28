CURRENT_DIR = ${CURDIR}
PACKAGE_BIN = node_modules/.bin
SRC_DIR = $(CURRENT_DIR)/src

default: help
install: ## Install dependencies
	cd $(CURRENT_DIR); npm install;
build: prettier ## Build dist files
	cd $(CURRENT_DIR); npm run build;
bundle: ## Bundle project for Chrome web store
	cd $(CURRENT_DIR); npm run bundle;
watch: ## Start webpack server
	cd $(CURRENT_DIR); npm run start;
prettier: ## Run [Prettier](https://prettier.io/)
	cd $(CURRENT_DIR); $(PACKAGE_BIN)/prettier --write "{src,__{tests,mocks}__}/**/*.{js,css}";
help: ## Display a list of commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
