const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  url:        { type: String, required: true },
  public_id:  { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Upload', uploadSchema)