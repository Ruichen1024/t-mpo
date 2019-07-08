'use strict';
const TimeRecording = require( '../models/TimeRecording' );

exports.saveStartTime = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newTimeRecording = new TimeRecording(
   {
      userId: req.user._id,
      startAt:new Date()
   }
  )

  //console.log("skill = "+newSkill)

  .save()
    .then( () => {
      res.redirect( '/timeREnd' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.saveEndTime = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newTimeRecording = new TimeRecording(
   {
      userId: req.user._id,
      endAt:new Date()
   }
  )

  //console.log("skill = "+newSkill)

  .save()
    .then( () => {
      res.redirect( '/timeResult' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


// this displays all of the skills
exports.getTimeRecording = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  TimeRecording.find()
    .exec()
    .then( ( timeResult ) => {
      res.render( 'timeResult', {
        title:"timeResult",timeResult:timeResult
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
