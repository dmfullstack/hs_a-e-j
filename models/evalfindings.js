const mongoose = require('mongoose');

const EVAL_FINDER_TYPES = ['eslint', 'htmlhint', 'unittestMocha', 'jsonLint'];
const EVAL_REPORT_STATUS = ['passing', 'failing', 'error'];
const REPO_REF_TYPES = ['branch', 'tag', 'commit'];

const evalfindings = new mongoose.Schema({
  commitid: { type: String, required: true },
  repo: { type: String, required: true },
  ref: { type: String, required: true, default: 'master' },
  refType: { type: String, enum: REPO_REF_TYPES, required: true, default: 'branch' },
  evalon: { type: Date, required: true, default: Date.now },
  outcomes: [
    {
      type: { type: String, required: true, enum: EVAL_FINDER_TYPES },
      status: { type:String, enum: EVAL_REPORT_STATUS, required: true },
      report: {},
      score: {}
    }
  ]
}, { collection: 'evalfindings', versionKey: false });

evalfindings.index({ commitid: 1 }, { unique: true });

const model = mongoose.model('evalfindings', evalfindings);

module.exports = {
  EvalFindingsModel: model,
  REPO_REF_TYPES: REPO_REF_TYPES,
  EVAL_FINDER_TYPES: EVAL_FINDER_TYPES,
  EVAL_REPORT_STATUS: EVAL_REPORT_STATUS
};
