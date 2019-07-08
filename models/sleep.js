'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var sleepSchema = Schema( {
  userId: ObjectId,
  startAt: String,
  endAt:String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  success: Boolean,
  orientation:String, //don't know how to track the three below yet
  audioLevel:String,
  accelerometer:String,
} );

module.exports = mongoose.model( 'sleep', sleepSchema );
