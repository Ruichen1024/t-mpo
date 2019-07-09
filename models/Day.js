'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var daySchema= Schema( {
  userID: ObjectID,
  startAt: Number,
  endAt: Number,
  cash: Number,
  

} );

module.exports = mongoose.model( 'Comment', commentSchema );
