const mongoose = require('mongoose');
const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ text: String, votes: { type: Number, default: 0 } }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiresAt: { type: Date },
  voters: [String]
}, { timestamps: true });
module.exports = mongoose.model('Poll', PollSchema);