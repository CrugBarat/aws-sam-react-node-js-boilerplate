# AWS SAM React Node Boilerplate

### Contents

1. [Project Structure](#Structure)
2. [Navigation](#Navigation)
3. [Setup](#Setup)
4. [Scripts](#Scripts)


## Project Structure

The project utilises a [Monorepo](https://en.wikipedia.org/wiki/Monorepo) structure to maximise code visibility, ease of collaboration and to provide a quick feedback loop while developing.

Instead of managing multiple repositories for frontend, backend and any infrastructure, the isolated code is managed as [packages](./packages).

Each package contains the constituent parts of the project, these include:

- Backend: [api](./packages/api)
- Frontend: [frontend](./packages/frontend)
- Infrastructure: [sam](./packages/sam)  

For further reading on the advantages and disadvantages of monorepos, check out this [article](https://www.happycoders.eu/java/monorepos-advantages-disadvantages/).

## Navigation

🚀 Each package can be built, run and published in isolation. While each package has its own `package.json` to record its own metadata and dependencies, the [package.json](./package.json) found in the project's root can act as an entry point for each of the packages and here you can find useful [scripts](#Scripts) to interact with the packages without having to navigate to that package.

**Please note:** If you intend to add any dependency to a specific package, then you should navigate to the root of that package to install it so it can be recorded in its `package.json`.

*Ultimately, which package you chose to work on is up to you. For example, if you want to work exclusively on frontend code then you can without the need to interact with any other package. You can even load a specific package into your IDE and get to work. Or if you want to work on the full stack - you can too* 😎.  

Further information on each individual package can be found in a README in its root (working on it 🔨):

- [Frontend](./packages/frontend/README.md)  
- [Backend](./packages/api/README.md)
- [Infrastructure](./packages/sam/README.md)

## Setup   

### Prerequisites

All packages:
- [Node](https://nodejs.org/en/)

Backend:
- [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
- `.env` file in the root (give me a shout 📢)

Infra (*optional*):
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html) (requires access to AWS account)

### Quick Start  

1. Clone the repo:  

```
git clone https://github.com/CrugBarat/aws-sam-react-node-js-boilerplate.git
```  

2. Navigate to the project's directory and run:

```
yarn install
```  

3. To start the full stack locally, first run your locally deployed DynamoDB and then run:

```
yarn start:dev-stack-local
```  

4. **OR** to start just the frontend server, run:

```
yarn start:frontend
```  

5. **OR** to start just the backend server, first run your locally deployed DynamoDB and then run:

```
yarn start:api-local
```  

## Scripts

The following yarn scripts can be run from the root of the project:

|  Script   |                             Description                              |
| :----------- | :------------------------------------------------------------------ |
|`yarn version-bump` | runs a [script](./tools/version-bump) which helps automate version bumps across all packages |
|`yarn build` | build the frontend package |
|`yarn test:ci` | runs tests with coverage across all packages |
|`yarn lint:fix` | runs the linter to correct errors, bugs and stylistic errors |
|`yarn start:frontend` | starts the frontend development server |
|`yarn start:api-local` | starts the backend server |
|`yarn start:dev-stack-local` | starts the frontend and backend servers |
|`yarn start:api-gateway-local` | runs a containerised api gateway and backend server |
|`yarn drop-local-ddb-tables` | drops any project specific tables in a locally deployed DynamoDB |  
