require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: `You are a Roblox Lua coding assistant. Return ONLY raw valid Lua code without markdown block quotes or explanations. Prompt: ${prompt}` }] }]
            }
        );

        const aiResponse = response.data.candidates[0].content.parts[0].text;
        res.json({ success: true, result: aiResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Pake process.env.PORT biar gak error di Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy jalan di port ${PORT}`));