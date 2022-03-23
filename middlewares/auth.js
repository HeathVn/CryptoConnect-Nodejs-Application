const Connection = require('../models/connection');


//Check if user is guest
exports.isGuest = (req, res, next)=>{
    
    if(!req.session.user){
        return next();
    }else{
        //If user is logged in, don't ask them to signup

        req.flash('error', 'You are logged in already');
        return res.redirect('/users/profile');
    }
}


//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next();
    }else{
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
}

//check if user is author of the connection
exports.isAuthor = (req, res, next) => {
   let id = req.params.id;
   Connection.findById(id)
   .then(connect=>{
     
      if(connect){
          if(connect.hostName == req.session.user){
              return next();
          }else{
              let err = new Error('Unauthorized to access the resource');
              err.status = 401;
              return next(err);
          }
      }
   })
   .catch(err=>next(err));
};

exports.isAuthor2 = (req, res, next) => {
    let id = req.session.connection;
    Connection.findById(id)
    .then(connect=>{
      
       if(connect){
           if(connect.hostName != req.session.user){
               return next();
           }else{
               let err = new Error('Unauthorized to access the resource');
               err.status = 401;
               return next(err);
           }
       }
    })
    .catch(err=>next(err));
 };