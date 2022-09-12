#!/bin/bash

# Runs the demo on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

BLOCK_CHAIN_WAITING_TIME_SECONDS=20
BUILD_IMAGES=false


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "h?b?" opt; do
    case "$opt" in
        h)
            echo "Parameter: [<value> / (flag)]"
            echo "-b (build docker images)"
            exit 0
            ;;
        b)
            BUILD_IMAGES=true
            ;;
    esac
done


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

cd ${HERE}
if [ ${BUILD_IMAGES} == true ]; then 
    ./build-demo.sh
fi

SUDO=""
if [ $(uname) == Linux ]; then
    SUDO="sudo"
fi

cd ../config
echo "[INFO] Starting local chain..."
${SUDO} docker-compose -p ccc-chain -f docker-compose-local-chain.yml up -d

echo "[INFO] Waiting for local chain to be started..."
sleep ${BLOCK_CHAIN_WAITING_TIME_SECONDS}

echo "[INFO] Deploying registry contract..."
COMPOSE_IGNORE_ORPHANS=true ${SUDO} docker-compose -p ccc-chain -f docker-compose-local-registry-deployer.yml up
EXIT_CODE=$(echo $?)
${SUDO} docker-compose -p ccc-chain -f docker-compose-local-registry-deployer.yml rm -s -f contract-deployer

if [ ${EXIT_CODE} == 1 ]; then
    exit 1;
fi

echo "[INFO] Deploying token contract..."
COMPOSE_IGNORE_ORPHANS=true ${SUDO} docker-compose -p ccc-chain -f docker-compose-local-token-deployer.yml up
EXIT_CODE=$(echo $?)
${SUDO} docker-compose -p ccc-chain -f docker-compose-local-token-deployer.yml rm -s -f contract-deployer

if [ ${EXIT_CODE} == 1 ]; then
    exit 1;
fi

echo "[INFO] Starting backend..."
cd ${HERE}/../config
${SUDO} docker-compose -p ccc-backend -f docker-compose-local-backend.yml up -d

echo "[INFO] Done."