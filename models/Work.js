'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var workSchema = Schema( {
  userId: ObjectId,
  startAt: Date,
  category: String,
  workHour: String,
  work: String
} );

module.exports = mongoose.model( 'Work', workSchema );
