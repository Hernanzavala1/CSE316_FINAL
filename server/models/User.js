var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

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
                text: String
             }],
             images: [{
                id: String,
                imageURL: String,
                imageWidth: {type: Number, min: 0, max: 100},
                imageHeight: {type: Number, min: 0, max: 100},
                
           }],
           width: {type: Number, min: 0, max: 100},
           height: {type: Number, min: 0, max: 100},
           backgroundColor: String,
           borderColor: String,
           borderWidth: {type: Number, min: 0, max: 100},
           borderRadius: {type: Number, min: 0, max: 100},
           padding: {type: Number, min: 0, max: 100},
           margin:  {type: Number, min: 0, max: 100}
           
    }]
    
  },{ collection: 'User' });

  UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};


  module.exports = mongoose.model('User', UserSchema);
  