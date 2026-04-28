/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { LegalAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5-6 bullet points capturing purpose, parties, nature, and obligations."
    },
    businessSummary: {
      type: Type.STRING,
      description: "Simple, non-legal explanation of what it means for the company."
    },
    keyClauses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          extract: { type: Type.STRING },
          impact: { type: Type.STRING }
        },
        required: ["name", "extract", "impact"]
      }
    },
    risks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          classification: { 
            type: Type.STRING,
            enum: ["High Risk", "Medium Risk", "Low Risk"]
          }
        },
        required: ["title", "description", "classification"]
      }
    },
    datesAndCommitments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          details: { type: Type.STRING }
        },
        required: ["label", "details"]
      }
    },
    parties: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          role: { type: Type.STRING },
          responsibilities: { type: Type.STRING },
          financials: { type: Type.STRING }
        },
        required: ["name", "role", "responsibilities"]
      }
    },
    actionableInsights: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    plainLanguageVersion: {
      type: Type.STRING
    },
    multilingualSummary: {
      type: Type.OBJECT,
      properties: {
        english: { type: Type.STRING },
        hindi: { type: Type.STRING },
        marathi: { type: Type.STRING }
      },
      required: ["english", "hindi", "marathi"]
    }
  },
  required: [
    "executiveSummary",
    "businessSummary",
    "keyClauses",
    "risks",
    "datesAndCommitments",
    "parties",
    "actionableInsights",
    "plainLanguageVersion",
    "multilingualSummary"
  ]
};

export async function analyzeDocument(fileBase64: string, mimeType: string): Promise<LegalAnalysis> {
  const prompt = `
    You are an advanced AI system specialized in analyzing corporate and business legal documents.
    Task: Process the attached PDF document and extract structured insights.

    🚫 Do NOT treat this as a court case or litigation document.
    🚫 Do NOT generate legal advice.
    ✅ Focus on business insights, risks, obligations, and clarity for decision-making.

    Analyze:
    - Service Agreements, Vendor Contracts, NDAs, Employment Contracts, Leases, Partnership Agreements, Corporate Reports.

    Special Handling:
    - Financial report -> extract KPIs, revenue, costs, trends.
    - Vendor contract -> highlight payment risk and dependency.
    - Employment contract -> highlight obligations and restrictions.

    If something is not present, use "Not Found".
    Prioritize clarity, brevity, and business usefulness.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: fileBase64
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA as any,
      }
    });

    if (!response.text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(response.text) as LegalAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
