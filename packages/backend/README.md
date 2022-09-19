# backend

This folder contains the ccc's backend project. To begin development, you must have [Node.js](https://nodejs.org/en/) and the [Yarn](https://yarnpkg.com) package manager installed.

You also need a valid `.env` file. The easiest way to get one is by copying the `settings.env` file and rename the copy to `.env`. The default setup should be good to go.


## Dev Commands

```bash
# start in watch mode
yarn dev

# lint
yarn lint

# autofix lint errors
yarn lint:fix

# test
yarn test

# build production
yarn build

# start in production mode
yarn start
```

## Docker Commands

``` bash
# build docker image
./scripts/build-docker-image.sh

# run backend with docker compose
./scripts/run-docker.sh

# pause docker composed backend
./scripts/pause-docker.sh

# stop docker composed backend
./scripts/stop-docker.sh

# run a dev db for development
./scripts/run-dev-db.sh

# stop dev db
./scripts/stop-dev-db.sh
```