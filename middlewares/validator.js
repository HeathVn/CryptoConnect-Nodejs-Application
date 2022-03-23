const {body} = require('express-validator');
const {validationResult} = require('express-validator');


//validate story id

exports.validateId = (req, res, next)=>{

    let id = req.params.id;

    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    }else{
        let err = new Error('Invalid connection id');
        err.status = 400;
        
        return next(err);
    }
}

exports.validateTime = (req, res, next)=>{


    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    
    if(startTime > endTime){
      req.flash('error', 'Start time must be before end time');

    }
    

    if(startTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)  && endTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) && startTime < endTime) {
        return next();
    }else{
        let err = new Error('Invalid time format');
        err.status = 400;
        res.redirect('back');
        return next(err);
    }

}

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','Password must be at least 8 characters and at most 64 characters').isLength({min:8, max:64}).trim().escape()];

exports.validateLogIn = [
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min:8, max:64}).trim().escape()
];

exports.validateResult = (req,res,next) =>{

    let errors = validationResult(req);

    if(!errors.isEmpty()){
       errors.array().forEach(error=>{
         req.flash('error', error.msg);
       });
       return res.redirect('back');
    }else{
       return next();
    }
};

exports.validateConnectionCreation = [
    body('name', 'Connection name must be at least 6 characters').isLength({min:1}).trim().escape(),
    body('topic', 'Topic must be at least 6 characters').trim().escape().isLength({min:1}),
    body('details', 'Connnection details must be at least 10 characters').trim().escape().isLength({min:10}),
    body('location', 'Location must be at least 6 characters').isLength({min:6}).trim().escape(),
    body('date', 'Date is not valid').isDate().trim().escape(),
];

exports.validateConnectionUpdate = [
    body('name', 'Connection name must be at least 6 characters').isLength({min:1}).trim().escape(),
    body('topic', 'Topic must be at least 6 characters').trim().escape().isLength({min:1}),
    body('details', 'Connnection details must be at least 10 characters').trim().escape().isLength({min:10}),
    body('date', 'Date is not valid').isDate().trim().escape(),
];