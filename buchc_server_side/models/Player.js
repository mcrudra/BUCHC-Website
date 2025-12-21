import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
