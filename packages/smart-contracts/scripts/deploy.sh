#!/bin/bash

# Deploys the contract if not already deployed

###################################################################################################
# CONFIGURATION
###################################################################################################

CONTRACT_ADDRESS="0xe69040B036FaF59C62455e826D971A22EE8EEcd0"
RPC_URL="http://localhost:8545"
DEPLOYER_SECRET="0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18"
DEPLOY_OPTION="registry"


###################################################################################################
# PARAMETER PARSING
###################################################################################################

while getopts "h?u:c:s:f:" opt; do
    case "$opt" in
        h)
            echo "Parameter: [<value> / (flag)]"
            echo "-c <contract address>"
            echo "-s <deployer secret>"
            echo "-u <rpc url>"
            echo "-p <deploy command option>"
            exit 0
            ;;
        c)
            CONTRACT_ADDRESS=$OPTARG
            ;;
        s)
            DEPLOYER_SECRET=$OPTARG
            ;;
        u)
            RPC_URL=$OPTARG
            ;;
        u)
            RPC_URL=$OPTARG
            ;;
        o)
            DEPLOY_OPTION=$OPTARG
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

cd ${HERE}/..

if [ ! -z ${DEPLOY_OPTION} ]; then
    DEPLOY_OPTION=:${DEPLOY_OPTION}
fi

echo "Check if contract is already deployed..."
RPC_URL=${RPC_URL} CONTRACT_ADDRESS=${CONTRACT_ADDRESS} yarn check:contract
EXIT_CODE=$(echo $?)

if [ ${EXIT_CODE} == 3 ]; then # not deployed
    echo "Not deployed (exit code 3). Deploying..."
    RPC_URL=${RPC_URL} DEPLOYER_SECRET=${DEPLOYER_SECRET} yarn deploy${DEPLOY_OPTION}
elif [ ${EXIT_CODE} == 2 ]; then # error
    exit 1;
else
    echo "Contract already deployed. Skip deployment"
fi
