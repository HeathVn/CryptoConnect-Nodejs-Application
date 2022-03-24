const model = require('../models/connection');
const RSVP= require('../models/rsvp');


exports.create = (req,res,next)=>{
    
    
    let rsvp = new RSVP();

    rsvp.connectionName= req.session.connection;
    rsvp.user = req.session.user;
    rsvp.status = req.body.status.toUpperCase();

    console.log(rsvp);

    rsvp.save()
    .then((rsvp)=>{
      console.log(rsvp);
      req.flash('success', 'Your connection was created successfully');
      res.redirect('/users/profile');
    })
    .catch(err=>{
      if(err.name === 'ValidationError'){
         err.status = 400;
     }
     next(err);
    });
    
  }; 



  exports.update = (req,res, next)=>{
     
   let id = req.params.id;
 
   console.log(req.body.status);

   RSVP.findByIdAndUpdate(id,{status: req.body.status.toUpperCase() },{useFindAndModify: false, runValidators:true})
   .then(rsvp=>{
       if(rsvp){
         req.flash('success', 'Your rsvp has been updated successfully');
         res.redirect('/users/profile');
       }else{
         let err = new Error('Cannot find a connection with id ' + id);
         err.status = 404;
         next(err);
       }
   })
   .catch(err=>{
       
     if(err.name === 'ValidationError'){
         err.status = 400;
         
     }
     next(err);
     });
 };

 exports.delete = (req,res, next)=>{
  let id = req.params.id;



 RSVP.findByIdAndDelete(id,{useFindAndModify: false})
 .then(rsvp=>{
     if(rsvp){
         req.flash('success', 'Your RSVP was deleted successfully');
         res.redirect('/connections');
     }else{
         let err = new Error('Cannot find a RSVP with id ' + id);
         err.status = 404;
         return next(err);
     }
 })
 .catch(err=>next(err))
};  