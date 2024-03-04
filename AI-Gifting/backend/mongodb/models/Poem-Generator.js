const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema(
  {
    relation: {
      type: String,
      required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    language : {
        type: String,
        required: true,
    }, 
    uniqueQualities : {
        type: String,
        required: true,
    },
  
  
});

module.exports = mongoose.model('Poem', poemSchema);
