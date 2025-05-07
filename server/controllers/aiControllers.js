const { generateContentFromPrompt } = require('../utils/googleGeminiApi');
const promptsObj = require('../utils/prompts');
const Conversation = require('../models/conversationModel');

exports.processAIRequest = async (req, res, next) => {
  try {
    const { featureType, userInput, targetLanguage } = req.body;

    if (!featureType || !userInput) {
      return res.status(400).json({ success: false, message: 'Feature type and user input are required.' });
    }

    let prompt = promptsObj[featureType];

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Invalid feature type.' });
    }

    let finalPrompt = prompt + userInput;

    if (featureType === 'convertCode' && targetLanguage) {
      finalPrompt += `\nTarget Language: ${targetLanguage}`;
    }

    const aiResponse = await generateContentFromPrompt(finalPrompt);
    const aiOutput = aiResponse?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    const newConversation = new Conversation({
      userId: req.user.id,
      featureType,
      userInput,
      aiOutput,
    });

    await newConversation.save();

    res.status(201).json({ 
      success: true,
      message: 'AI response generated successfully',
      data: aiOutput 
    });

  } catch (error) {
    next(error);
  }
};
