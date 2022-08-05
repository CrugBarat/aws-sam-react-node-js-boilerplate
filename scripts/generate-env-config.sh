#!/bin/bash

[ -z "$1" ] && echo "Please supply an AWS CloudFormation stack name as a parameter" && exit 1

STACK_NAME=$1
USER_POOL_ID=$(aws cloudformation list-exports --query "Exports[?Name==\`${STACK_NAME}-user-pool-id\`].Value" --no-paginate --output text)
USER_POOL_CLIENT_ID=$(aws cloudformation list-exports --query "Exports[?Name==\`${STACK_NAME}-user-pool-client-id\`].Value" --no-paginate --output text)
CLOUDFRONT_DOMAIN_NAME=$(aws cloudformation list-exports --query "Exports[?Name==\`${STACK_NAME}-cloudfront-domain-name\`].Value" --no-paginate --output text)
REGION="eu-west-2"

echo "USER_POOL_ID:$USER_POOL_ID|USER_POOL_CLIENT_ID:${USER_POOL_CLIENT_ID}|CLOUDFRONT_DOMAIN_NAME:${CLOUDFRONT_DOMAIN_NAME}|REGION:${REGION}" |
 jq -Rc 'split("|") | map( split(":") | {(.[0]): .[1]} ) | add' > ../packages/frontend/src/config/env-config.json

if [[ -z $USER_POOL_ID || -z $USER_POOL_CLIENT_ID || -z $CLOUDFRONT_DOMAIN_NAME ]]; then
  echo 'One or more of the config vars are undefined - please check that your stack has deployed successfully :('
  exit 1
else
  echo "beep bop boop ....... AWS CONFIG SUCCESSFULLY CREATED :)"
fi