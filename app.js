var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apikey = require('./config/apikey');

// AUTHENTICATION MODULES
session = require("express-session"),
bodyParser = require("body-parser"),
User = require( './models/User' ),
flash = require('connect-flash')
// END OF AUTHENTICATION MODULES

const MONGODB_URI = 'mongodb://heroku_08b9h9sf:284pk9fr4m4qiitapfadln47qa@ds253567.mlab.com:53567/heroku_08b9h9sf';
const LOCAL_URI = 'mongodb://localhost:27017/tempo'
console.log("mongodb is "+LOCAL_URI)

const mongoose = require( 'mongoose' );
mongoose.connect(LOCAL_URI, { userNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});


const commentController = require('./controllers/commentController')
const profileController = require('./controllers/profileController')
const forumPostController = require('./controllers/forumPostController')
const timeRecordingController = require('./controllers/timeRecordingController')
const sleepController = require('./controllers/sleepController')
const workController = require('./controllers/workController')

const calendarController = require('./controllers/calendarController')
const goalController = require('./controllers/goalController')

// Authentication
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// here we set up authentication with passport
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/*************************************************************************
     HERE ARE THE AUTHENTICATION ROUTES
**************************************************************************/

app.use(session({ secret: 'zzbbyanana' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));



const approvedLogins = ["tjhickey724@gmail.com","csjbs2018@gmail.com"];

// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.title="tempo"
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      res.locals.user = req.user
      res.locals.loggedIn = true
    }
  else {
    res.locals.loggedIn = false
  }
  next()
})



// here are the authentication routes

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

app.get('/calendar',
  timeRecordingController.addSleepHours,
  function(req,res){
     res.render('calendar',{})
})

app.get('/test', function(req,res){
  res.render('testMap',{})
})



// route for logging out
app.get('/logout', function(req, res) {
        req.session.destroy((error)=>{console.log("Error in destroying session: "+error)});
        console.log("session has been destroyed")
        req.logout();
        res.redirect('/');
    });


// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/loginerror'
        })
      );


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    res.locals.loggedIn = false
    if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      res.locals.loggedIn = true
      return next();
    } else {
      console.log("user has not been authenticated...")
      res.redirect('/login');
    }
}

// we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile')
})

app.post('/calendar', isLoggedIn, function(req, res) {
        res.render('calendar'),
        calendarController.saveDate
    });

app.get('/goals', isLoggedIn, function(req, res) {
                res.render('goals')
      });


app.get('/editProfile',isLoggedIn, (req,res)=>{
  res.render('editProfile')
})

app.get('/daypage/:year/:month/:day',
    timeRecordingController.showAllHistory,
    calendarController.returnDate)

app.get('/daypage',isLoggedIn,
  //calendarController.returnDate,
  timeRecordingController.showAllHistory,
(req,res)=>{
  res.render('daypage')
})


app.get('/historyData',
   isLoggedIn,
   timeRecordingController.showAllHistory,
   timeRecordingController.addSleepHours,
   (req,res)=>{
       res.render('historyData')
})

app.get('/sleep',isLoggedIn, (req,res)=>{
  res.render('sleep', {title:"startSleep"})
});

app.get('/countdown', workController.getOneWork);


app.get('/work',isLoggedIn, (req,res)=>{
  res.render('work', {title:"work"})
});

app.get('/napend', function(req,res){
  res.render('napend',{title:"napEnd"})
});

app.get('/tournament',isLoggedIn, (req,res)=>{
  res.render('tournament', {title:"Tournament"})
});

app.get('/tset',isLoggedIn, (req,res)=>{
  res.render('tset', {title:"Tournament Set Goal"})
});

app.get('/profiles', isLoggedIn, profileController.getAllProfiles);
app.get('/showProfile/:id', isLoggedIn, profileController.getOneProfile);


app.post('/updateProfile',profileController.update)

// add page for editProfile and views
// add router for updateProfile and send browser to /profie

// END OF THE AUTHENTICATION ROUTES

app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.headers)
  next()
});


app.get('/', function(req, res, next) {
  res.render('index',{title:"tempo"});
});

app.get('/about', function(req, res, next) {
  res.render('about',{title:"YellowCartwheel"});
});

app.get('/forum',forumPostController.getAllForumPosts)

app.post('/forum',forumPostController.saveForumPost)

app.post('/forumDelete',forumPostController.deleteForumPost)

app.post('/processGoals',goalController.saveGoal)

app.get('/goals',goalController.getGoal)

app.get('/griddemo', function(req, res, next) {
  res.render('griddemo',{title:"Grid Demo"});
});

app.post('/sleepStart',sleepController.saveSleep)

app.get('/bmidemo', (req, res) => {
  res.render('bmidemo',{title:"BMI Demo"});
});



// myform demo ...

app.get('/myform', function(req, res, next) {
  res.render('myform',{title:"Form Demo"});
});

app.post('/processform', commentController.saveComment)

app.get('/showComments', commentController.getAllComments)
// app.use('/', indexRouter);  // this is how we use a router to handle the / path
// but here we are more direct

app.post('/setwork', workController.saveWork)

app.get('/showComment/:id', commentController.getOneComment)

function processFormData(req,res,next){
  res.render('formdata',
     {title:"Form Data",url:req.body.url, coms:req.body.theComments})
}


app.post('/processStart',timeRecordingController.saveStartTime)

app.post('/processEnd',timeRecordingController.saveEndTime)

app.get('/feedbackGoals', (req,res) => {
  res.render('feedbackGoal',{title:"feedbackGoal"});
});

app.get('/timeResult', (req, res) => {
  res.render('timeResult',{title:"timeResult"});
});
app.get('/timeResult', timeRecordingController.getTimeRecording)

app.get('/timeRecording', (req, res) => {
  res.render('timeRecording',{title:"timeRecording"});
});

app.get('/timeREnd', (req, res) => {
  res.render('timeREnd',{title:"timeRecording"});
});

app.get('/timeREnd/BadSleeper/:tla/:tlo/:cla/clo', (req, res) => {
  res.render('timeREnd',{title:"timeRecording"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
