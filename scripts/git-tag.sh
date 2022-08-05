#!/bin/bash

PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
git tag -a ${PACKAGE_VERSION} -m "Version ${PACKAGE_VERSION}"
git push --tags