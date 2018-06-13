As a developer, I want to run a job for evaluating an assignment.

- TODO: It should be reusable for evaluating multiple jobs at multiple times
- It should take as input repository URL
- It should perform eslint
- TODO: It should create a report in mongodb
- TODO: It should count occurences of every eslint violation


Instruction to use

Step 1:
  set REPO_URL (export REPO_URL=https://gitlab.com/assignment.git)
  set REPO_BRANCH (export REPO_BRANCH=master)

Step 2:
  execute evaluate.sh (./evaluate.sh)

Assumptions:
The assignment can be run using npm start.
