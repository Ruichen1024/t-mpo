'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var timeRecordingSchema = Schema( {
  userId: ObjectId,
  startAt: String,
  endAt:String,
  status:Boolean,
} );

module.exports = mongoose.model( 'TimeRecording', timeRecordingSchema );
