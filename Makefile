ENV?=$(shell whoami)
PROJECT?=sam-react-node-boilerplate
STACK_NAME=${PROJECT}-$(ENV)
BUCKET_NAME=${PROJECT}-sam-artifact-bucket-$(ENV)
SITE_BUCKET=${PROJECT}-s3-site-bucket-$(ENV)
API_GATEWAY=${PROJECT}-api-gateway-$(ENV)
USER_POOL=${PROJECT}-user-pool-$(ENV)
DDB_ENDPOINT?=https://dynamodb.eu-west-2.amazonaws.com
EXAMPLES_TABLE_NAME=${PROJECT}-example-table-$(ENV)
REGION=eu-west-2
USER_POOL_ID=$(shell aws cloudformation list-exports --query "Exports[?Name==\`${STACK_NAME}-user-pool-id\`].Value" --no-paginate --output text --region ${REGION})
CLOUDFRONT_DOMAIN_NAME=$(shell aws cloudformation list-exports --query "Exports[?Name==\`${STACK_NAME}-cloudfront-domain-name\`].Value" --no-paginate --output text --region ${REGION})

.PHONY: build

apiInstall:
	cd ./packages/api && yarn install --production=true
samBuild:
	make apiInstall && sam build -t ./packages/sam/template.yaml --parameter-overrides DDBEndpoint=$(DDB_ENDPOINT)
samDeploy:
	if aws s3 ls "s3://$(BUCKET_NAME)"; then aws s3 rb s3://$(BUCKET_NAME) --force --region $(REGION); fi; aws s3 mb s3://$(BUCKET_NAME) --region $(REGION)
	sam package --template-file ./packages/sam/template.yaml --output-template-file ./packages/sam/packaged.yaml --s3-bucket $(BUCKET_NAME) --region $(REGION)
	sam deploy --template-file ./packages/sam/packaged.yaml --stack-name $(STACK_NAME) --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND --parameter-overrides BucketName=$(SITE_BUCKET) UserPoolName=$(USER_POOL) APIGatewayName=$(API_GATEWAY) ExamplesTableName=$(EXAMPLES_TABLE_NAME) EnvironmentName=$(ENV) --region $(REGION)
envConfig:
	cd ./scripts && chmod +x generate-env-config.sh && ./generate-env-config.sh $(STACK_NAME)
appInstall:
	cd ./packages/frontend && yarn install && cd ../.. && make envConfig
appBuild:
	yarn build
siteSync:
	aws s3 sync ./packages/frontend/build/ s3://$(SITE_BUCKET)
appSync:
	make appInstall && make appBuild && make siteSync
appLaunch:
	open "https://$(CLOUDFRONT_DOMAIN_NAME)"
userCreate:
	cd ./scripts && chmod +x create-user.sh && ./create-user.sh $(STACK_NAME)
infraDestroy:
	aws s3 rm s3://$(SITE_BUCKET) --recursive
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(REGION)
	aws s3 rb s3://$(BUCKET_NAME) --force --region $(REGION)
lazyLoad:
	make samBuild && make samDeploy && make appSync && make userCreate && make appLaunch
ciDeploy:
	make samBuild && make samDeploy && make appSync