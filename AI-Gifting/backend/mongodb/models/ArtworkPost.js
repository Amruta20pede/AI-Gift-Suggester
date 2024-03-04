
import mongoose from 'mongoose';

const ArtworkPost = new mongoose.Schema({
  prompt:{
    type:String,
    required: true
  },
  image:{
    type:String,
    required:true
  }
});

const ArtworkPostSchema = mongoose.model('ArtworkPost', ArtworkPost);

export default ArtworkPostSchema;