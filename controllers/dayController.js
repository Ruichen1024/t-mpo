'use strict';
const ForumPost = require( '../models/ForumPost' );

exports.saveForumPost = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("log in to see your schedule")
  }

  let newDay = new Day(
   {

    userID: req.ObjectID,
    startAt: req.startAt,
    endAt: req.endAt,
    cash: req.cash

   }
  )

  //console.log("skill = "+newSkill)

  newDay.save()
    .then( () => {
      res.redirect( 'calendar' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


// this displays all of the skills
// exports.getAllForumPosts = ( req, res, next ) => {
//   //gconsle.log('in getAllSkills')
//   ForumPost.find({}).sort({createdAt: -1})
//     .exec()
//     .then( ( posts ) => {
//       res.render('forum',{posts:posts,title:"Forum"})
//     } )
//     .catch( ( error ) => {
//       console.log( error.message );
//       return [];
//     } )
//     .then( () => {
//       //console.log( 'skill promise complete' );
//     } );
// };

// exports.deleteForumPost = (req, res) => {
//   console.log("in deleteId")
//   let deleteId = req.body.delete
//   if (typeof(deleteId)=='string') {
//       ForumPost.deleteOne({_id:deleteId})
//            .exec()
//            .then(()=>{res.redirect('/forum')})
//            .catch((error)=>{res.send(error)})
//   } else if (typeof(deleteId)=='object'){
//       ForumPost.deleteMany({_id:{$in:deleteId}})
//            .exec()
//            .then(()=>{res.redirect('/skills')})
//            .catch((error)=>{res.send(error)})
//   } else if (typeof(deleteId)=='undefined'){
//       //console.log("This is if they didn't select a skill")
//       res.redirect('/forum')
//   } else {
//     //console.log("This shouldn't happen!")
//     res.send(`unknown skillName: ${deleteId} Contact the Developer`)
//   }
//
// };
