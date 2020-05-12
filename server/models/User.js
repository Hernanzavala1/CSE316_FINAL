var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String,
    Logos: [{
              id: String ,
             Texts: [{
               id: String,
                fontSize: {type: Number, min: 2, max: 100},
                color: String,
                backgroundColor: String,
                borderColor: String,
                borderWidth: {type: Number, min: 0, max: 100},
                borderRadius: {type: Number, min: 0, max: 100},
                text: String
             }],
             images: [{
                id: String,
                imageURL: String,
                width: {type: Number, min: 0, max: 100},
                height: {type: Number, min: 0, max: 100},
                
           }],
           width: {type: Number, min: 0, max: 100},
           height: {type: Number, min: 0, max: 100}
           
    }]
    
  },{ collection: 'User' });
  
  module.exports = mongoose.model('User', UserSchema);
  