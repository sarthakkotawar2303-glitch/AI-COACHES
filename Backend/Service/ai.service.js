const { GoogleGenAI, Type } = require("@google/genai");

// Initialize the Gemini client using environment variables
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Define the schema natively to prevent OpenApi conversion breaks
const nativeInterviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { 
            type: Type.INTEGER, 
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job requirements." 
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked in the interview.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question text." },
                    intension: { type: Type.STRING, description: "The core technical reason why an interviewer asks this." },
                    answer: { type: Type.STRING, description: "Comprehensive guide answer covering exact points." }
                },
                required: ["question", "intension", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions tailored to the position.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question text." },
                    intension: { type: Type.STRING, description: "The soft-skill assessment reason why an interviewer asks this." },
                    answer: { type: Type.STRING, description: "Detailed guide answer using structural STAR method." }
                },
                required: ["question", "intension", "answer"]
            }
        },
        skillGap: {
            type: Type.ARRAY,
            description: "List of missing skills or technical frameworks.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The name of the missing technology or conceptual field." },
                    severity: { type: Type.STRING, enum: ["low", "medium", "high"], description: "The critical gap depth." }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "Day-wise progressive roadmap objects.",
            items: {
                type: Type.OBJECT,  
                properties: {
                    day: { type: Type.INTEGER, description: "Pure numeric value from 1 upwards." },
                    content: { type: Type.STRING, description: "The high-level core theme topic of the day." },
                    focus: { type: Type.STRING, description: "Granular subtasks and training actions." }
                },
                required: ["day", "content", "focus"]
            }
        },
        title: { type: Type.STRING, description: "Title of the report." }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGap", "preparationPlan", "title"]
};

// 3. Main processing function
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert technical interviewer and career coach. Your task is to analyze the candidate's Resume and Self-Description against the target Job Description to generate a structured interview preparation report.

    Candidate Details:
    - Resume: ${resume}
    - Self Description: ${selfDescription}
    
    Target Position Details:
    - Job Description: ${jobDescription}

    Evaluate everything and fill out every single object key defined in the requested schema. Provide a deeply relevant day-by-day roadmap, specific targeted engineering/behavioral questions, and explicit answers.`;

    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError = null;

    for (const model of models) {
        try {
            console.log(`Attempting report generation using model: ${model}...`);
            const response = await ai.models.generateContent({
                model: model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: nativeInterviewReportSchema,
                    temperature: 0.1 
                }
            });

            if (!response.text) {
                throw new Error("Gemini returned an empty response stream.");
            }

            return JSON.parse(response.text);
        } catch (error) {
            lastError = error;
            console.warn(`Failed generation with ${model}:`, error.message || error);
            // Wait 1 second before trying next model
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    console.error("All Gemini models failed. Last Error:", lastError);
    throw lastError;
}

module.exports = generateInterviewReport;
