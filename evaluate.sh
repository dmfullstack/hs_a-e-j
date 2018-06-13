#!/bin/sh

export ROOT_DIR=`pwd`

# Print Input ENV variables.
echo ASSIGNMENT_SOLUTION $ASSIGNMENT_SOLUTION
echo ASSIGNMENT_SOLUTION_REF $ASSIGNMENT_SOLUTION_REF
echo ASSIGNMENT_SUBMISSION $ASSIGNMENT_SUBMISSION
echo ASSIGNMENT_SUBMISSION_REF $ASSIGNMENT_SUBMISSION_REF

# Clean work directory
rm solution -rf
rm submission -rf
rm output/* -rf # Folder is expected when running tests

# Configure Private Key for git commands
export GIT_SSH_COMMAND="ssh -o \"StrictHostKeyChecking no\" -i /evaluation/data/id_rsa"

# Clone Solution and Submission
git clone $ASSIGNMENT_SOLUTION solution && cd solution && git checkout $ASSIGNMENT_SOLUTION_REF && cd $ROOT_DIR
git clone $ASSIGNMENT_SUBMISSION submission && cd submission && git checkout $ASSIGNMENT_SUBMISSION_REF && cd $ROOT_DIR

# Extract Commit ID
cd $ROOT_DIR/submission
export COMMIT_ID=`git log --pretty=oneline | awk -F" " '{print $1}' | head -n 1`
cd $ROOT_DIR

# Copy eslint rules and mocha tests from solution into submission
cp solution/.eslintrc.js submission/.eslintrc.js
cp solution/test submission/commander -rf

# Perform eslint
mkdir $ROOT_DIR/output -p
cd $ROOT_DIR/submission
mkdir output -p
eslint --format=../node_modules/eslint-json **/*.js *.js> $ROOT_DIR/output/eslint.report.json

# Run Project
ln -s /assignments/data data
yarn
yarn start

# Execute Cadet and Commander test cases
# mocha --reporter mochawesome --reporter-options reportDir=../output,reportName=jsonreport test
mocha --reporter mochawesome --reporter-options reportDir=../output,reportFilename=mocha.report commander

# Run JSONLint script
cd $ROOT_DIR
yarn jsonlint

# Publish evaluation findings into mongodb.
./eslint-to-mongo.js
