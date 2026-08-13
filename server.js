require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Pake model 1.5-flash via SDK resmi
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const fullPrompt = `You are a Roblox Lua coding assistant. Return ONLY valid Lua code without markdown block quotes or extra text. Prompt: ${prompt}`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ success: true, result: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy jalan di port ${PORT}`));
