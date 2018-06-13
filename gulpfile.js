const gulp = require('gulp');
//const eslint = require('gulp-eslint');
//const jsonReporter = require('eslint-json');
const size = require('gulp-size');
const jsonlint = require('gulp-jsonlint');
const fs = require('fs');
const path = require('path');
const errorLogs = [];

gulp.task('lint', ['jsonlint']);

var jsonErrorReporter = function (file)
{
    errorLogs.push({filePath:file.path, errorMessage: file.jsonlint.message});
}

var writeJsonToFile = function()
{
  if(errorLogs.length != 0 )
  {
    fs.writeFileSync(path.join(__dirname, 'output/jsonlint.report.json'), JSON.stringify(errorLogs),'utf-8');
  }
  else
  {
    errorLogs.push({filePath:'NA', errorMessage: "There is no error in json file"});
    fs.writeFileSync(path.join(__dirname, 'output','jsonlint.report.json'), JSON.stringify(errorLogs),'utf-8');
  }

}

gulp.task('jsonlint', function() {
  gulp.src(['solution/**/*.json'])
      .pipe(size({showFiles:true}))
      .pipe(jsonlint())
      .pipe(jsonlint.reporter(jsonErrorReporter))
      .on('end', function () { writeJsonToFile();  });
});
