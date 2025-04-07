const prompts = require('../utils/prompts');
const callHuggingFaceAPI = require('../utils/huggingFaceClient');
const Conversation = require('../models/conversationModel');

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
            fullPrompt += ` Convert following code into ${language} language , Code : `;
        }

        fullPrompt += `\n\n${userInput}`;

        const result = await callHuggingFaceAPI(fullPrompt);

        if (req.user) {
            await Conversation.create({
                userId: req.user.id,
                featureType,
                userInput,
                aiOutput: result?.[0]?.generated_text || "No response",
            });

            res.status(200).json(result);
        }
    }
    catch (e) {
        res.status(500).json({ error: err.message });
    }

};

module.exports = { processAIRequest };



