const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  featureType: {
    type: String,
    required: true,
  },
  userInput: {
    type: String,
    required: true,
  },
  aiOutput: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // Add timestamps for createdAt and updatedAt automatically

conversationSchema.index({ userInput: "text", aiOutput: "text" });

module.exports = mongoose.model("Conversation", conversationSchema);
