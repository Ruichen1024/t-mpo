'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var daySchema= Schema( {
  name: String,
  startAt: Number,
  endAt: Number,
  cash: Number,



} );

module.exports = mongoose.model( 'Comment', commentSchema );
