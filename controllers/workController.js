'use strict';
const Work = require( '../models/Work' );

exports.saveWork = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newWork = new Work(
   {
    userId: req.user._id,
    startAt: new Date(),
    category: req.body.category,
    workHour: req.body.workHour,
    work: req.body.work
   }
  )

  console.log(newWork.category)

  newWork.save()
    .then( () => {
      res.redirect( '/countdown' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


exports.getOneWork = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  User.find({_id:id})
    .sort({startAt: -1})
    .limit(1)
    .exec()
    .then( ( doWork ) => {
      res.render( 'doWork', {
        doWork:doWork, title:"doWork"
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
