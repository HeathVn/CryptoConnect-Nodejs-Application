const model = require('../models/connection');

exports.index = (req,res)=>{
   let connections = model.find();
   res.render('./connections/connections', {connections});
 };
 

 exports.new = (req,res)=>{
     res.render('./connections/newConnection');
  };
 


 exports.create = (req,res)=>{
    
    console.log(req.body);
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
  }; 
  

 

 
 exports.show = (req,res, next)=>{

     let id = req.params.id;
     let connection = model.findById(id);

     if(connection){
        res.render('./connections/connection', {connection});
     }else{
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
     }
     
     res.status(404).send('Cannot find story with id ' + id);
  };
 
 
 
 exports.edit = (req,res, next)=>{
     

     let id = req.params.id;
     let connection = model.findById(id);

     if(connection){
      res.render('./connections/edit', {connection});
   } else{
      let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
   }
   
   

  };
 
 
  exports.update = (req,res, next)=>{
     
     let id = req.params.id;
     let connection = req.body;
     

     if(model.updateById(id, connection)){
        res.redirect('/connections/' + id);
     }else{
      let err = new Error('Cannot find a story with id ' + id);
      err.status = 404;
      next(err);
     }
  };
 
 
 exports.delete = (req,res, next)=>{
     let id = req.params.id;
     if(model.deleteById(id)){
        res.redirect('/connections');
     }else{
      let err = new Error('Cannot find a story with id ' + id);
      err.status = 404;
      next(err);
     }
  };  
 