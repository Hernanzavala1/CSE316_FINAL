var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  borderColor: String,
  backgroundColor: String,
  fontSize: { type: Number, min: 2, max: 144 },
  borderRadius: {type: Number, min: 0,max: 144},
  borderWidth: {type: Number, min: 0, max: 144},
  padding : {type: Number, min : 0, max: 144},
  margin : {type: Number, min : 0, max: 144},
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);