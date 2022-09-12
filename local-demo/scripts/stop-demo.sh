#!/bin/bash

# Stops the local demo

###################################################################################################
# CONFIGURATION
###################################################################################################


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

SUDO=""
if [ $(uname) == Linux ]; then
    SUDO="sudo"
fi

echo "[INFO] Stopping and removing docker containers..."
cd ${HERE}/../config
${SUDO} docker-compose -p ccc-backend -f docker-compose-local-backend.yml down
${SUDO} docker-compose -p ccc-chain -f docker-compose-local-chain.yml down
${SUDO} docker volume prune -f

echo "[INFO] Done."