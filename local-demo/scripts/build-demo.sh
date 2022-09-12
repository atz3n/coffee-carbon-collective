#!/bin/bash

# Builds demo images on your machine

###################################################################################################
# CONFIGURATION
###################################################################################################

RELATIVE_BACKEND_PATH="../../packages/backend"
RELATIVE_SMART_CONTRACTS_PATH="../../packages/smart-contracts"


###################################################################################################
# DEFINES
###################################################################################################

HERE="$(pwd)/$(dirname $0)"


###################################################################################################
# MAIN
###################################################################################################

cd ${HERE}

echo "[INFO] Building ccc-backend image..."
cd ${HERE}/${RELATIVE_BACKEND_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Building contract deployer image..."
cd ${HERE}/${RELATIVE_SMART_CONTRACTS_PATH}
./scripts/build-docker-image.sh

echo "[INFO] Done."