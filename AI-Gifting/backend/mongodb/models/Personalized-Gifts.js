const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema(
  {
    relationship: {
      type: String,
      required: true,
   },
    age: {
      type: [Number],
      required: true,
    },
  
  occasion : {
    type: String,
    required: true,
 },
  interest: {
    type: String,
    required: true,
 },
  
});

module.exports = mongoose.model('Gift', giftSchema);
