#!/bin/bash

[ -z "$1" ] && echo "Please supply a stack name" && exit 1

STACK_NAME=$1
REGION=eu-west-2
USER_POOL_ID=$(aws cloudformation list-exports --query "Exports[?Name==\`${STACK_NAME}-user-pool-id\`].Value" --no-paginate --output text)
USERNAME=admin@and.digital
PASSWORD=Password1!

aws cognito-idp admin-create-user --user-pool-id $USER_POOL_ID --username $USERNAME --output table --no-cli-pager
aws cognito-idp admin-set-user-password --user-pool-id $USER_POOL_ID --username $USERNAME --password $PASSWORD --permanent --output table --no-cli-pager

if [[ -z $USER_POOL_ID ]]; then
  echo 'User Pool ID not found - please check that your stack has deployed successfully :('
  exit 1
else
  echo "beep bop boop ....... admin user successfully created and added to user group :)"
fi