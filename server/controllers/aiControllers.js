const prompts = require('../utils/prompts');
const { generateContentFromPrompt } = require('../utils/googleGeminiApi'); // Importing the new function
const saveConversation = require('../utils/saveConvertation');

const processAIRequest = async (req, res) => {
  try {
    const { featureType, userInput, language } = req.body;

    if (!featureType || !userInput) {
      return res.status(400).json({ error: "Missing required inputs." });
    }

    let prompt = prompts[featureType];

    if (!prompt) {
      return res.status(400).json({ error: "Invalid feature selected." });
    }

    let fullPrompt = prompt;
    if (featureType === "convertCode" && language) {
      fullPrompt += `Convert following code into ${language} language , Code : `;
    }
    fullPrompt += userInput;

    const response = await generateContentFromPrompt(fullPrompt);  
    
    console.log("response " , response.response.text())
   saveConversation(req.user.id, featureType, userInput, response);

    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { processAIRequest };
