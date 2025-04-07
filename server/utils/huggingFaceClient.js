const axios = require('axios');

const callHuggingFaceAPI = async (fullPrompt) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/bigcode/starcoder",  
      {
        inputs: fullPrompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Hugging Face API Error", err.response?.data || err.message);
    return { error: "AI processing failed. Please try again." };
  }
};

module.exports = callHuggingFaceAPI;
