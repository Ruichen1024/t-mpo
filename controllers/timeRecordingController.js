'use strict';
const TimeRecording = require( '../models/TimeRecording' );

exports.saveStartTime = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newTimeRecording = new TimeRecording(
   {
      userId: req.user._id,
      startAt:new Date(),
      status:'true',
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
      endAt:new Date(),
      status:'false',
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
exports.get = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  MovieRating.find()
    .exec()
    .then( ( ratings ) => {
      res.render( 'quiz2', {
        title:"Quiz2",ratings:ratings
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
