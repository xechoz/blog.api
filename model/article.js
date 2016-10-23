'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let articleSchema = new Schema({
  title: {type: String, trim: true},
  content: String,
  comments: [Schema.Types.Mixed],
  tags: [{type: String, trim: true}],
  author: {type: Schema.Types.ObjectId, required: true},
  extra: Schema.Types.Mixed
}, {
  timestamps: true
});

let article = mongoose.model('article', articleSchema);

module.exports = article;
