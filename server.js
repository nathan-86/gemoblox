require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Update URL model Gemini di sini:
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await axios.post(url, {
            contents: [{ 
                parts: [{ 
                    text: `You are a Roblox Lua coding assistant. Return ONLY valid Lua code without markdown block quotes or extra text. Prompt: ${prompt}` 
                }] 
            }]
        });

        const aiResponse = response.data.candidates[0].content.parts[0].text;
        res.json({ success: true, result: aiResponse });
    } catch (error) {
        // Biar keliatan error resminya di log Studio
        console.error("Gemini Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            success: false, 
            error: error.response ? JSON.stringify(error.response.data) : error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy jalan di port ${PORT}`));
