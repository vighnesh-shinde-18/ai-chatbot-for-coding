require('dotenv').config();

const generateCode = async (req, res) => {
    try {
        const { prompt } = req.body;

        const fetch = (await import('node-fetch')).default;

        const response = await fetch('https://api-inference.huggingface.co/models/bigcode/starcoder', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: prompt })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ output: data[0]?.generated_text || "No response from AI" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateCode };
