const model = require('../models/connection');
const User = require('../models/user');
const RSVP= require('../models/rsvp');



exports.index = (req,res, next)=>{
   model.find()
   .then(connections=>{
     
    console.log(connections);
    return res.render('./connections/connections', {connections})
   })
   .catch(err=>next(err));
   
 };
 

 exports.new = (req,res)=>{

    let id = req.session.user;
    let user = User.findById(id);

    console.log(id);

    Promise.all([User.findById(id)])
    .then(results=>{
    const [user] =  results;

    res.render('./connections/newConnection', {user});
    }).catch(err=>next(err));
       
     
  };
 


 exports.create = (req,res,next)=>{
    
    
    let connection = new model(req.body);

    connection.hostName = req.session.user;

    connection.save()
    .then((connection)=>{
      console.log(connection);
      req.flash('success', 'Your connection was created successfully');
      res.redirect('/connections');
    })
    .catch(err=>{
      if(err.name === 'ValidationError'){
         err.status = 400;
     }
     next(err);
    });
    
  }; 
  

 

 
 exports.show = (req,res, next)=>{

     let id = req.params.id;

   

   Promise.all([model.findById(id).populate('hostName'), RSVP.find({connectionName: id}).populate('user')])
   .then(results=>{
       if(results) {

       const [connection, rsvps] =  results;
       console.log(rsvps);
      
       req.session.connection = connection._id;
      
       res.render('./connections/connection', {connection, rsvps});
   } else {
       let err = new Error('Cannot find a connection with id ' + id);
       err.status = 404;
       next(err);
   }
   })
   .catch(err=>next(err));


    
  };
 
 
 
 exports.edit = (req,res, next)=>{
     

   let id = req.params.id;
   

   model.findById(id)
   .then(connection=>{
       if(connection) {
       res.render('./connections/edit', {connection});
   } else {
       let err = new Error('Cannot find a connection with id ' + id);
       err.status = 404;
       next(err);
   }
   })
   .catch(err=>next(err));
   
   

  };
 
 
  exports.update = (req,res, next)=>{
     
     let id = req.params.id;
     let connection = req.body;
   
    

    model.findByIdAndUpdate(id,connection,{useFindAndModify: false, runValidators:true})
    .then(connection=>{
        if(connection){
          req.flash('success', 'Your connection updated successfully');
          res.redirect('/connections/'+id);
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

    RSVP.deleteMany({connectionName: id})
    

    model.findByIdAndDelete(id,{useFindAndModify: false})
    .then(connection=>{
        if(connection){

         

            
    
             req.flash('success', 'Your connection was deleted successfully');
            res.redirect('/connections');
        }else{
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err))


    
  };  
 