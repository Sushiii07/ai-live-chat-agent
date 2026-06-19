import express from "express";
import { pool } from "./db.js";
import Groq from "groq-sdk";
import cors from 'cors';

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.get('/', async (_, res) => {
    const result = await pool.query('SELECT NOW()');

    res.json({
        time: result.rows[0].now,
    });
});

app.listen(3000, "0.0.0.0", () => {
    console.log('Server running on port 3000');
});

app.post('/api/chat', async (req, res) => {
    try {
        const { content, sessionId } = req.body
        console.log(content)
        const reply = await getGroqChatCompletion(content);
        
        res.json({
            id: Date.now(),
            role: 'ai',
            content: reply
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to generate response"
        });
    }
});

export async function getGroqChatCompletion(message: string) {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: message
            }
        ],
        model: "llama-3.1-8b-instant"
    });

    return completion.choices[0]?.message?.content || "";
}