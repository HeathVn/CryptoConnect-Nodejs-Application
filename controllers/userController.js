const User = require('../models/user');

//get the sign up form
exports.new = (req, res)=>{
    res.render('./user/new');
};

exports.createUser = (req,res, next)=>{

    let user = new User(req.body);
    user.save()
    .then(()=> res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }

        if(err.code === 11000){
            req.flash('error', 'Email address has been used');
            return res.redirect('/users/new');
        }

        next(err);

    });
};

exports.login = (req, res)=>{
    
    res.render('./user/login');
}


exports.processLogin = (req, res)=>{
   
    //authenticate user's login request
    let email = req.body.email;

    console.log(email);

    let password = req.body.password;

    

    //get the user that matches the email

    User.findOne({email:email})
    .then(user=>{
  
        if(user){
            //user found in database

            user.comparePassword(password)
            .then(result => {
                if(result){
                    req.session.user = user._id; // store user in session
                    req.flash('success', 'You have successfully logged in')
                    res.redirect('/users/profile');
                }else{

                    
                    req.flash('error','Wrong password');
                    res.redirect('/users/login');
                }
            });

        }else{
            
            req.flash('error','Wrong email address');
            res.redirect('/users/login');

        }
    })
    .catch(err=>next(err));

};

exports.profile = (req,res)=>{

    let id = req.session.user;

    console.log(req.flash())
    User.findById(id)
    .then(user => res.render('./user/profile', {user}))
    .catch(err=>next(err));

   
};

exports.logout = (req,res,next)=>{
    req.session.destroy(err =>{
  
      if(err){
          return next(err);
      }
      else{
          res.redirect('/');
      }
    });
  };