const fs = require('fs');
const rawEslintJsonOutput = fs.readFileSync('output/eslint.report.json', 'utf-8');
const mochaObject = JSON.parse(fs.readFileSync('output/mocha.report.json', 'utf-8'));
const jsonLintOutput = JSON.parse(fs.readFileSync('output/jsonlint.report.json', 'utf-8'));

const processedEslintJsonOutput = JSON.parse(rawEslintJsonOutput).map((fileReport) => {
  delete fileReport.source;
  fileReport.messages.map((errorReport) => {
    delete errorReport.source;
  });
  return fileReport;
});

const eslintProcessor = function() {
  const eslintReport = {};
  eslintReport.score = 0;
  eslintReport.type = 'eslint';
  eslintReport.status = 'passing';
  processedEslintJsonOutput.map((fileReport) => {
    if (eslintReport.status === 'passing' &&
        fileReport.errorCount === 0 && fileReport.warningCount === 0) {
      eslintReport.status = 'passing';
    } else {
      eslintReport.status = 'failing';
    }
    eslintReport.score += fileReport.errorCount + fileReport.warningCount;
  });
  eslintReport.report = processedEslintJsonOutput;

  return eslintReport;
}


const mochaProcessor = function () {
  if(mochaObject.stats.passPercent === 100){
    status = 'passing';
  } else {
      status = 'failing';
  }
  const mochaReport = {
    type : 'unittestMocha',
    status : status,
    report : mochaObject,
    score : mochaObject.stats.passPercent+'%'
  }
  return mochaReport;
};

const jsonLintProcessor = function () {
  const jsonLintReport = {};
  jsonLintReport.type =  'jsonLint';
  if(jsonLintOutput[0].filePath === 'NA')
  {
    jsonLintReport.status = 'passing';
  }
  else
  {
    jsonLintReport.status = 'failing';
  }
  jsonLintReport.report = jsonLintOutput;
  jsonLintReport.score = 'NA';

  return jsonLintReport;
};

module.exports = {
  eslintProcessor : eslintProcessor,
  mochaProcessor : mochaProcessor,
  jsonLintProcessor: jsonLintProcessor
};
