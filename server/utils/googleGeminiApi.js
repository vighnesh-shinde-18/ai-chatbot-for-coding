const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateContentFromPrompt(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result;
  } catch (err) {
    console.error('Error generating content:', err);
    throw new Error('Error generating content');
  }
}

module.exports = { generateContentFromPrompt };

