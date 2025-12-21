import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  img: {
    type: String,
    default: null
  },
  is_past: {
    type: Boolean,
    default: false
  },
  registration_link: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
