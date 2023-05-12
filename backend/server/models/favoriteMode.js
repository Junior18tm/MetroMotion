const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',  
    required: true
  },
  stopId: { 
    type: String, 
    required: true 
  },
  stopName: { 
    type: String, 
    required: true 
  },
  lineColor: { 
    type: String, 
    required: true 
  },
  arrivalTime: { 
    type: String 
  },
  lineName: { 
    type: String
  },
  destination: { 
    type: String, 
    required: true 
  }
});


module.exports = mongoose.model('Favorite', FavoriteSchema);
