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
  TimeRecording.find({userId:req.user._id}).sort({startAt:-1})
    .exec()
    .then( ( timeResults ) => {
      let timeData = timeResults[0];
      timeData.endAt = new Date();
      timeData.save()
      .then((result) => {
        console.log("just saved time")
        console.dir(result)
        const timeInHours = (result.endAt.getTime()-result.startAt.getTime())/(1000*60*60);
        res.render('timeResult',{timeRecording:result,timeInHours:timeInHours})
      })
      .catch((error) => {
        console.log("error in saving the time:"+error.message)
      })

    })
    .catch( ( error ) => {
      console.log( "trying to update current timeResult:"+error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    })
}

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

exports.showAllTime = ( req, res, next ) => {
  //console.log("in saveSkill!")
  //console.dir(req)]
  console.log("in showAllTime")
  TimeRecording.find({userId:req.user._id}).sort({startAt:-1})
    .exec()
    .then( ( historyData ) => {
        console.log("found history data: "); console.dir(historyData)
        res.locals.timeRecording = historyData
        next()
    })
    .catch( ( error ) => {
      console.log( "ERROR in showAllTime:"+error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    })
}
