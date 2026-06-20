import express from "express";
import { pool } from "./db.js";
import cors from 'cors';
import { generateAiResponse, type ChatMessage } from "./llm.service.js";

const app = express();


app.use(cors());
app.use(express.json());

app.listen(3000, "0.0.0.0", () => {
    console.log('Server running on port 3000');
});

app.get('/api/chat/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        const result = await pool.query(
            `SELECT
                m.id,
                m.sender AS role,
                m.text AS content
            FROM messages as m
            JOIN conversations c ON m.conversation_id = c.id
            WHERE c.session_id = $1
            ORDER BY m.created_at ASC`,
            [sessionId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch history", error);
        res.status(500).json({ error: "Could not load previous chat" });
    }
});


app.post('/api/chat', async (req, res) => {
    try {
        const { content, sessionId } = req.body

        let conversationId;
        const convoResult = await pool.query(
            'SELECT id FROM conversations WHERE session_id = $1',
            [sessionId] 
        )

        if (convoResult.rows.length > 0) {
            conversationId = convoResult.rows[0].id;
        } else {
            conversationId = crypto.randomUUID();
            await pool.query(
                'INSERT INTO conversations (id, session_id) VALUES ($1, $2)',
                [conversationId, sessionId]
            );
        }

        const userMessageId = crypto.randomUUID();
        await pool.query(
            'INSERT INTO messages (id, conversation_id, sender, text) VALUES ($1, $2, $3, $4)',
            [userMessageId, conversationId, 'user', content] 
        );

        // Creating context
        const historyResult = await pool.query(`
            SELECT sender, text FROM messages
            WHERE conversation_id = $1
            ORDER BY created_at DESC
            LIMIT 10
        `, [conversationId]);

        const recentHistory: ChatMessage[] = historyResult.rows.reverse().map(row => ({
            role: row.sender === 'ai' ? 'assistant' : 'user',
            content: row.text
        }));

        let fullAiResponse = "";
        try {
            fullAiResponse = await generateAiResponse(recentHistory);
        } catch (llmError: any) {
            return res.status(503).json({ error: llmError.message });
        }

        const aiMessageId = crypto.randomUUID();
        await pool.query(
            'INSERT INTO messages (id, conversation_id, sender, text) VALUES ($1, $2, $3, $4)',
            [aiMessageId, conversationId, 'ai', fullAiResponse]
        );
        
        res.json({
            id: aiMessageId,
            role: 'ai',
            content: fullAiResponse
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Failed to generate response"
        });
    }
});