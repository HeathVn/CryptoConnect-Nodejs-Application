const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
       
    connectionName:{type: Schema.Types.ObjectId, ref: 'Connections', required:[true, 'Connection name is required']}, 
    user:{type: Schema.Types.ObjectId, ref: 'User', required:[true, 'Host name is required']},
    status:{type: String, required:[true, 'RSVP status is required']},
    

});


module.exports = mongoose.model('rsvps', rsvpSchema);