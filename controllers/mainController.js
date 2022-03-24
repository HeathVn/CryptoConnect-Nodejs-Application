const express = require('express');

const main = express();

exports.index = (req,res)=>{
    
    res.render('index');
};

exports.about = (req,res)=>{
    
    res.render('about');
};

exports.contact = (req,res)=>{
    
    res.render('contact');
};

