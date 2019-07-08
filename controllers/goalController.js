'use strict';
const Goal = require( '../models/Goal' );

exports.saveGoal = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newGoal = new Goal(
   {
    userId: req.user._id,
    userName:req.user.userName,
    cash: req.body.cash,
    numDay: req.body.numDay,
    dailyHr: req.body.dailyHr,
    startAt: req.body.startAt,
    endAt: req.body.endAt,
    success: 0,
    active: true
   }
  )

  //console.log("skill = "+newSkill)

  newGoal.save()
    .then( () => {
      res.redirect( 'goals' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.updateGoal = (req, res) => {
    // Find note and update it with the request body
    Goal.findByIdAndUpdate(req.params._id, {
        active: req.body.active,
        success: req.body.success
    }, {new: true})
    .then(goal => {
        if(!goal) {
            return res.status(404).send({
                message: "Goal not found with id " + req.params.noteId
            });
        }
        res.send(goal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Goal not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating goal with id " + req.params.noteId
        });
    });
};

exports.getGoal = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  Goal.findOne({_id:id})
    .exec()
    .then( ( goals ) => {
      res.render( 'goals', {
        goals:goals, title:"goals"
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
