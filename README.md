# AND Digital AWS SAM React Node Boilerplate

### Contents

1. [Project Structure](#Structure)
2. [Navigation](#Navigation)
3. [Setup](#Setup)
4. [Scripts](#Scripts)
5. [Git](#Git)
6. [Git Hooks](#Hooks)
7. [CI/CD](#CI/CD)
8. [Anything Else](#Anything-Else)


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
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html) (requires access to AWS account - let me know if you're interested and I can set you up)

### Quick Start  

1. Clone the repo:  

```
git clone https://gitlab.com/ANDigital/glasgow/aws-sam-react-node-boilerplate.git
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

## Git

The project uses [Gitflow](https://medium.com/@muneebsajjad/git-flow-explained-quick-and-simple-7a753313572f). At the moment our main branch is the `develop` branch which has [branch protection](https://docs.github.com/en/github/administering-a-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) enabled. This means we can't push our code straight to this branch. We need to create a feature branch, push that and have it reviewed by our peers before merging. A typical gitflow workflow would be:

1. On the `develop` branch, pull the latest code:

```
git pull
``` 

2. Create a new branch in the following format:  

```
git checkout -b <ticket-number>/<meaningful-branch-name>
```  

3. Make your code changes  

4. **IMPORTANT! Bump your version**. Minor for small features and patch for bugs. To bump, run:

```
yarn version-bump
```

5. Stage your code changes:

```
git add --all
```  

6. Commit your code with a message in the following format:  

```
git commit -s -m "<ticket-number>: meaningful commit message"
```  

7. Push your code:

```
git push --set-upstream origin <ticket-number>/<meaningful-branch-name>
```  

8. Navigate to the project's repo on GitHub and check the code diff - all good? ✅   Create a pull request.  

9. Once approved and merged. Checkout develop branch:

```
git checkout develop
```  

11. Pull the latest code. Rinse and repeat. 

**NB:** Got merge conflicts that need resolved before merging? No problem. Don't use GitHub's auto resolve feature. Go to your terminal. Pull the latest code into `develop`. Checkout your branch and run:

```
git merge develop
```  

Your IDE will give you a list of conflicts or unstaged code that needs resolved. Once resolved - add, commit and push the changes. All set 😎 - go back to the Pull Request and merge.

## Hooks

The project uses several [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 🪝 using a tool called [Husky](https://typicode.github.io/husky/#/) 🐺. These help automate the workflow of the project by triggering custom scripts with certain git commands and ultimately gives us peace of mind.

The hooks used here are:

- `pre-commit`, which runs the [linter](https://eslint.org/docs/user-guide/getting-started) before you commit any code - keeping all our code singing from the same song sheet.
- `pre-push`, which runs the test suites before you push any code, meaning you can't push code with failing tests
- `post-merge`, which [tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) the project using the version number from `package.json` and pushes the tag to GitHub (TODO: move to our [CI/CD](#CI/CD) pipeline)

Pssst 🥸 you don't have to run any of these commands - they are triggered automatically 🔫. The hooks are defined in the root level [package.json](./package.json):

```
"husky": {
    "hooks": {
      "pre-commit": "yarn lint:fix",
      "pre-push": "yarn test:ci",
      "post-merge": "yarn git-tag"
    }
  }
```  

## Anything Else

Anything not covered? Reach out and we can go through it or feel free to add it to this README yourself. Happy Coding 😊.