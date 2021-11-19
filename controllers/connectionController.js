const model = require('../models/connection');

exports.index = (req,res, next)=>{
   model.find()
   .then(connections=>{
     
    console.log(connections);
    return res.render('./connections/connections', {connections})
   })
   .catch(err=>next(err));
   
 };
 

 exports.new = (req,res)=>{
     res.render('./connections/newConnection');
  };
 


 exports.create = (req,res,next)=>{
    
    
    let connection = new model(req.body);
    connection.save()
    .then((connection)=>{
      console.log(connection);
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



     //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error('Invalid story id');
      err.status =400;
      return next(err);
    }

   model.findById(id)
   .then(connection=>{
       if(connection) {
       res.render('./connections/connection', {connection});
   } else {
       let err = new Error('Cannot find a story with id ' + id);
       err.status = 404;
       next(err);
   }
   })
   .catch(err=>next(err));


    
  };
 
 
 
 exports.edit = (req,res, next)=>{
     

     let id = req.params.id;
   


   //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error('Invalid story id');
      err.status =400;
      return next(err);
    }

   model.findById(id)
   .then(connection=>{
       if(connection) {
       res.render('./connections/edit', {connection});
   } else {
       let err = new Error('Cannot find a story with id ' + id);
       err.status = 404;
       next(err);
   }
   })
   .catch(err=>next(err));
   
   

  };
 
 
  exports.update = (req,res, next)=>{
     
     let id = req.params.id;
     let connection = req.body;
   

     if(!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error('Invalid story id');
      err.status =400;
      return next(err);
    }

    model.findByIdAndUpdate(id,connection,{useFindAndModify: false, runValidators:true})
    .then(connection=>{
        if(connection){
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


     if(!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error('Invalid story id');
      err.status =400;
      return next(err);
    }

    model.findByIdAndDelete(id,{useFindAndModify: false})
    .then(connection=>{
        if(connection){
            res.redirect('/connections');
        }else{
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err))
  };  
 