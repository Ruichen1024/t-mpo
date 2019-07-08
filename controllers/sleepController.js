'use strict';
const sleep = require( '../models/sleep' );

exports.saveSleep = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newSleep = new sleep(
   {
      userId: req.user._id,
      startAt:new Date(),
   }
  )

  //console.log("skill = "+newSkill)

  .save()
    .then( () => {
      res.redirect( '/afterSaveSleep' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.saveWakeUp = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  db.sleep.update(
   {userId: req.user._id },
   {
     endAt:new Date(),
     }
   }
)
};


// this don't necessarily need to work, so probably delete it later
exports.get = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  sleep.find()
    .exec()
    .then( ( userId ) => {
      res.render( '#', {
        title:"SleepResult",ratings:ratings
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
