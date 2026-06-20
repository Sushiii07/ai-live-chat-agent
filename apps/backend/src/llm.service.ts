import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const SYSTEM_PROMPT = `You are a helpful, friendly support agent for an e-commerce store called TechHaven. 
Answer clearly and concisely. Do not make up information.

Domain Knowledge:
- Shipping: Free shipping on orders over $50. Standard shipping takes 3-5 business days.
- Returns: 30-day return policy. Items must be in original packaging to qualify for a full refund.
- Support Hours: Monday to Friday, 9 AM to 5 PM EST.`;

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}


export async function generateAiResponse(
    history: ChatMessage[] = []    
): Promise<string> {
    try {
        const apiMessage = [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            ...history,
        ];

        const completion = await groq.chat.completions.create({
            messages: apiMessage as any,
            model: "llama-3.1-8b-instant",
            stream: false,
            max_tokens: 300,
            temperature: 0.2
        });

        return completion.choices[0]?.message?.content || "";
    } catch (error: any) {
        console.error("LLM Service Error:", error.message);
        // Throw a user-friendly error that the Express route can catch and send
        throw new Error("I'm currently experiencing high traffic. Please try again in a moment!");
    }
}