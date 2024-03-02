import { OpenAI } from "openai";
class LLM {
    constructor(masterPrompt) {
        this.masterPrompt = masterPrompt;
        this.openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });
    }

    async getRespose(prompt) {
        const completion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: this.masterPrompt,
                },
                prompt,
            ],
            model: "gpt-3.5-turbo-1106",
            // response_format: { type: "json_object" },
        });

        return completion.choices[0].message.content;
    }
}


export default LLM;