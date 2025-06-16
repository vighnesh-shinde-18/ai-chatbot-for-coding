const { generateContentFromPrompt } = require('../utils/googleGeminiApi');
const promptsObj = require('../utils/prompts');
const DSAInteraction = require('../models/dsaInteractionModel.js');
const sanitizeHtml = require('sanitize-html');

exports.processAIRequest = async (req, res, next) => {
  try {
    let { featureType, userInput, targetLanguage } = req.body;

    if (!featureType || !userInput) {
      return res.status(400).json({
        success: false,
        message: 'Feature type and user input are required.',
      });
    }


    userInput = sanitizeHtml(userInput, {
      allowedTags: [],
      allowedAttributes: {},
    });


    const basePrompt = promptsObj[featureType];
    if (!basePrompt) {
      return res.status(400).json({
        success: false,
        message: 'Invalid feature type.',
      });
    }

    let finalPrompt = basePrompt.trim();

    if (featureType === 'convertCode' && targetLanguage) {
      finalPrompt = finalPrompt.replace('Target Language:', `Target Language: ${targetLanguage}`);
    }

    finalPrompt += `\n${userInput}`;

    const aiRawText = await generateContentFromPrompt(finalPrompt);
   let aiOutput = null;

if (aiRawText) {
  try {
    // In case the JSON is in a code block (e.g., surrounded by ```json ... ```)
    const match = aiRawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);

    const jsonText = match ? match[1] : aiRawText;
    console.log("✅ json AI output:", jsonText);

    aiOutput = JSON.parse(jsonText);
    console.log("✅ Parsed AI output:", aiOutput);
  } catch (err) {
    console.error("❌ Failed to parse AI JSON:", err);
    console.log("Raw text for debugging:", aiRawText);
  }
} else {
  console.warn("⚠️ No AI text found.");
}

    const newInteraction = new DSAInteraction({
      userId: req.user.id,
      featureType,
      userInput,
      aiOutput,

    });
    await newInteraction.save();



    return res.status(201).json({
      success: true,
      message: 'AI response generated successfully',
      data: aiOutput,
    });

  } catch (error) {
    console.error('Error processing AI request:', error);
    return next(error);
  }
};
