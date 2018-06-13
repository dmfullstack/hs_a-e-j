#!/usr/bin/node

const mongoose = require('mongoose');
const evalfindings = require('./models/evalfindings');
const EvalFindingsModel = evalfindings.EvalFindingsModel;
const reportPreprocessing = require('./reportPreprocessing');
const dbUrl = process.env.MONGO_URL;

mongoose.Promise = global.Promise;
const connection = mongoose.connect(dbUrl);

//let evalOutput = new evalfindings.EvalFindingsModel();
const evalOutput = {};
// evalOutput.commitid = process.env.COMMIT_ID;
evalOutput.commitid = process.env.ASSIGNMENT_SUBMISSION;
evalOutput.repo = process.env.ASSIGNMENT_SUBMISSION;
evalOutput.ref = process.env.ASSIGNMENT_SUBMISSION_REF;
evalOutput.refType = "branch";
evalOutput.evalon = Date.now();
evalOutput.outcomes = [];
evalOutput.outcomes.push(reportPreprocessing.eslintProcessor());
evalOutput.outcomes.push(reportPreprocessing.mochaProcessor());
//Ignoring the JSON Lint for now
//evalOutput.outcomes.push(reportPreprocessing.jsonLintProcessor());

const conditions = {
  commitid: evalOutput.commitid
};

const options = {
  new: true,
  upsert: true
};

EvalFindingsModel.findOneAndUpdate(conditions,
  evalOutput,
  options,
  function(err,
    savedEvalOutput) {
    if (err)
      console.log(err);
    else {
      console.log('Record saved in Mongodb');
    }
    mongoose.connection.close();
  });

/*evalOutput.save(function(err) {
  if (err)
    console.log(err);
  else {
    console.log('Record saved in Mongodb');
  }
  mongoose.connection.close();
});
*/
