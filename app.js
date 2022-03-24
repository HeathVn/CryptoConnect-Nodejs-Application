//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverrride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');




//create application
const app = express();


//configure application
//let port = 3000;
//let host = 'localhost';

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


//connect to database
mongoose.connect('mongodb://localhost:27017/connect',
                {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err=>console.log(err.message));

//const host = '0.0.0.0';
//const port = process.env.PORT || 3000;

//mount middleware

//tell express where to locate static files /images etc.
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverrride('_method'));

//set up session
app.use(session({

    secret: 'jiaru90aeur90ef93oioefe',
    resave:false,
    saveUninitialized: true,
    cookie:{maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/connect'})
}));

app.use(flash());

app.use((req, res, next)=>{
  
  let validIps = ['127.0.0.1']; // Put your IP whitelist in this array

 
    console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.name = req.session.name||"user";
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
  
    next();
  
});




app.use(express.static(__dirname+'/public'));



app.use('', mainRoutes);
app.use('/connections', connectionRoutes);
app.use('/users', userRoutes);
app.use('/rsvps', rsvpRoutes);




app.use((req, res, next)=>{
   let err = new Error('The server cannot locate ' + req.url);
   err.status = 404;
   next(err);
});


app.use((err, req, res, next)=>{
   if(!err.status){
       err.status = 500;
       err.message = ("Internal Server Error");
   }

   res.status(err.status);
   res.render('error', {error:err});
}); 
 



