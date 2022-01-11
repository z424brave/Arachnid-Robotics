# Arachnid-Robotics
Coding Test for Ticker

## npm scripts (declared in package.json)
* build: Deletes /release directory and compiles /src using tsc with tsconfig.json
* clean: deletes ./nyc_output coverage, node_modules and release
* lint: Runs tslint on all TypeScript files i.e. /src and /test
* lint-fix: Runs tslint on all TypeScript files i.e. /src and /test and auto fixes where possible
* test-dev: Deletes ./.nyc_output ./coverage directories and runs mocha unit tests with nyc coverage 
* open-c: Opens coverage report (./coverage/index.html) in default browser
