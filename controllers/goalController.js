'use strict';
const ForumPost = require( '../models/Goal' );


exports.saveGoal = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newGoal = new Goal(
   {
    start: req.body.start,
    end: req.body.end,
    location: req.body.location,
    audio: req.body.audio,
    accel: req.body.accel,
    orientation: req.body.orientation,
    success: req.body.success
   }
  )

  //console.log("skill = "+newSkill)

  newGoal.save()
    .then( () => {
      res.redirect( '/showGoals' );
    } )
    .catch( error => {
      res.send( error );
    } );
};



// this displays all of the skills
exports.getAllGoals = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Comment.find()
    .exec()
    .then( ( goals ) => {
      res.render( 'comments', {
        goals:goals, title:"Goals"
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

// this displays all of the skills
exports.getOneGoal = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Comment.findOne({_id:id})
    .exec()
    .then( ( comment ) => {
      res.render( 'comment', {
        goal:goal, title:"Goals"
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
