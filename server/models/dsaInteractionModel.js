const mongoose = require("mongoose");

const dsaInteractionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  featureType: {
    type: String,
    required: true,
    enum: [
      "codeDebugging",
      "codeReview",
      "codeGeneration",
      "explainCode",
      "convertCode",
      "generateTestCases"
    ],
  },
  userInput: {
    type: String,
    required: true,
  },
  aiOutput: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  title:{
    type:String,
    required : true
  }
}, { timestamps: true });


dsaInteractionSchema.index({ userInput: "text", aiOutput: "text" });

module.exports = mongoose.model("DSAInteraction", dsaInteractionSchema);
