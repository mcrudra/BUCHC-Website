import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Static methods
settingSchema.statics.get = async function(key, defaultValue = null) {
  const setting = await this.findOne({ key });
  return setting ? setting.value : defaultValue;
};

settingSchema.statics.set = async function(key, value) {
  return await this.findOneAndUpdate(
    { key },
    { value },
    { upsert: true, new: true }
  );
};

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
