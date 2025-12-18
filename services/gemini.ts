import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SpeedAuditPlan, OptimizationTask } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const auditSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    estimatedCurrentScore: {
      type: Type.NUMBER,
      description: "An estimated Lighthouse performance score (0-100) typical for an unoptimized site of this description.",
    },
    summary: {
      type: Type.STRING,
      description: "A strategic summary of the performance bottlenecks.",
    },
    tasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          difficulty: { 
            type: Type.STRING, 
            enum: ["Easy", "Medium", "Hard"] 
          },
          category: { 
            type: Type.STRING, 
            enum: ["Plugin", "Hosting", "Code", "Configuration"] 
          },
          impact: { 
            type: Type.STRING, 
            enum: ["High", "Medium", "Low"] 
          },
          instructions: { 
            type: Type.STRING, 
            description: "Detailed, step-by-step instructions on how to implement this fix. Be specific about plugin names or settings." 
          },
          tools: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of specific plugins (e.g., WP Rocket, Autoptimize) or tools needed."
          }
        },
        required: ["title", "difficulty", "category", "impact", "instructions", "tools"]
      }
    }
  },
  required: ["estimatedCurrentScore", "summary", "tasks"]
};

export const generateSpeedPlan = async (
  siteUrl: string,
  hosting: string,
  extraDetails: string
): Promise<SpeedAuditPlan> => {
  const prompt = `
    Role: You are a World-Class WordPress Performance Engineer specializing in Elementor and Core Web Vitals.
    Task: Create a comprehensive step-by-step speed optimization plan for a WordPress site running Elementor.
    
    Site Context:
    - URL: ${siteUrl}
    - Hosting Provider: ${hosting || "Unknown/Generic Shared Hosting"}
    - Additional Context: ${extraDetails || "Standard Elementor setup"}
    
    Requirements:
    1. List every possible improvement from easiest to most difficult.
    2. Focus specifically on Elementor compatibility (e.g., "Regenerate CSS/Data", "Experiment features", "Asset loading").
    3. Suggest specific plugins (prioritize free ones unless paid is necessary like WP Rocket).
    4. Include hosting level optimizations (PHP version, caching).
    5. Be extremely detailed in the instructions.
    
    Cross-reference accuracy: Ensure recommended plugins are compatible with Elementor.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: auditSchema,
        temperature: 0.3,
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(response.text);
    return {
        siteUrl,
        ...data
    } as SpeedAuditPlan;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
