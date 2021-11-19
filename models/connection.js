const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
       
    name:{type:String, required:[true, 'title is required']}, 
    topic:{type:String, required:[true, 'topic is required']},
    details:{type:String, required:[true, 'details are required']},
    date:{type:String, required:[true, 'date is required']},
    startTime:{type:String, required:[true, 'startTime is required']},
    endTime:{type:String, required:[true, 'endTime is required']},
    hostName:{type:String, required:[true, 'Host name is required']},
    image:{type:String, required:[true, 'imageURL is required']},

});


module.exports = mongoose.model('Connections', connectionSchema);




