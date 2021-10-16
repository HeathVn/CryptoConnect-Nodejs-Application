exports.index = (req,res)=>{
    
    res.render('./views/index');
};

exports.about = (req,res)=>{
    
    res.render('about');
};

exports.contact = (req,res)=>{
    
    res.render('contact');
};

