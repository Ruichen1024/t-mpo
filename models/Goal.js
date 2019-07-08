'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var goalSchema = Schema( {
  userId: ObjectId,
  cash: Number,
  numDay: Number,
  dailyHr: Number,
  startAt: String,
  endAt: String,
  success: Number,
  active: Boolean
} );

module.exports = mongoose.model( 'Goal', goalSchema );
