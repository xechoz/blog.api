'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, trim: true},
  name: {type: String, trim: true, index: true},
  tel: {type: String, trim: true},
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  avatar: {type: String, trim: true},
  accessToken: {type: String, trim: true, index: true},
  city: {type: String, trim: true},
  province: String,
  deviceInfo: [{type: Schema.Types.Mixed}],
  articles: [Schema.Types.ObjectId],
  extra: Schema.Types.Mixed,
  tech: [{type: String, index: true}],
  password: {type: String, trim: true, required: true}
});

const user = mongoose.model('user', userSchema);

module.exports = user;
