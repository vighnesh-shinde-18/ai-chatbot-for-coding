const Conversation = require('../models/conversationModel')
const saveConversation = async (userId, featureType, userInput, aiResponse) => {
  const aiOutput = {};

  try {

    const responseText = aiResponse.response.text();

    console.log("Response Text:", responseText);

    const conversation = new Conversation({
      userId,
      featureType,
      userInput,
      aiOutput : responseText,
    });
  
    await conversation.save();
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return;
  }

 
};

module.exports = saveConversation;
