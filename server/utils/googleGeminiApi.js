const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateContentFromPrompt(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
  
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("Failed to generate content from Gemini API");
  }
}

module.exports = { generateContentFromPrompt };
