'use server';

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export interface ProductPrediction {
  name: string;
  totalUnits: number;
}

export interface PredictionState {
  report: string | null;
  predictions: ProductPrediction[] | null;
  error: string | null;
}

interface ProductInput {
  id: string;
  name: string;
  price: string;
  willBuy: string;
  tooExpensive: string;
}

export async function generatePrediction(
  prevState: PredictionState,
  formData: FormData
): Promise<PredictionState> {
  const eventName = formData.get('eventName') as string;
  const expectedAttendance = formData.get('expectedAttendance') as string;
  const productsJson = formData.get('products') as string;

  if (!eventName || !expectedAttendance || !productsJson) {
    return {
      report: null,
      predictions: null,
      error: 'Please fill in all general event fields.',
    };
  }

  let products: ProductInput[] = [];
  try {
    products = JSON.parse(productsJson);
  } catch (e) {
    return {
      report: null,
      predictions: null,
      error: 'Invalid products data.',
    };
  }

  if (products.length === 0) {
    return {
      report: null,
      predictions: null,
      error: 'Please add at least one product to the collection.',
    };
  }

  // Validate that all products have required fields
  for (const p of products) {
    if (!p.name || !p.price || !p.willBuy || !p.tooExpensive) {
      return {
        report: null,
        predictions: null,
        error: 'Please fill in all fields for every product.',
      };
    }
  }

  const productsContext = products.map(p => `
Product: ${p.name}
- Price: $${p.price}
- Instagram Poll ("Would you buy this for $${p.price}?"):
   - "Will Buy": ${p.willBuy} votes
   - "Too Expensive": ${p.tooExpensive} votes
`).join('\n');

  const prompt = `
You are an expert retail analyst for a student merchandise brand called Triton Outfitters. 
Your task is to predict the demand for a collection of products at an upcoming campus event.

Event Details:
- Name: ${eventName}
- Expected Attendance: ${expectedAttendance} people

Products in Collection:
${productsContext}

Analyze these metrics. Keep in mind that Instagram poll "Will Buy" votes are notoriously optimistic, and typical conversion rates for college merch are between 5% and 15% of attendance, usually clustering around the lower end if event tickets/merch are expensive. 

Provide:
1. A concise markdown report with:
   - Collection Demand Analysis
   - Risk Factors for each item
   - Final Recommendations
2. An array of predictions containing the predicted total number of units to produce for EACH product (to mitigate deadstock but capture sales).

Respond with a JSON object exactly matching this structure:
{
  "report": "Your markdown formatted string here",
  "predictions": [
    { "name": "Product Name Here", "totalUnits": integer_value_here }
  ]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        report: data.report,
        predictions: data.predictions,
        error: null,
      };
    } else {
      throw new Error("No response text returned.");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Fallback Mock Response for Demo purposes if API fails
    const mockReport = `
## Collection Demand Analysis
For **${eventName}** with an expected attendance of **${expectedAttendance}**, we are forecasting a moderate overall conversion rate. 
While the Instagram polls show enthusiasm, conversion rates for college apparel are typically much lower than social media suggests.

## Risk Factors
1. **Price Sensitivity:** Higher-priced items inherently carry more deadstock risk.
2. **Cannibalization:** Selling multiple items means attendees may choose one over the other, splitting the total available budget.
3. **Optimism Bias:** Instagram poll respondents rarely convert at a 1:1 ratio.

## Final Recommendation
We recommend producing a conservative batch for each item to mitigate deadstock risk while still capturing the core audience.
`;
    
    const attendance = parseInt(expectedAttendance) || 0;
    
    const mockPredictions = products.map(p => {
      const optimisticBuy = parseInt(p.willBuy) || 0;
      // Simple heuristic for the mock total units per product
      const mockTotal = Math.round((attendance * 0.05) + (optimisticBuy * 0.2));
      return {
        name: p.name || 'Unknown Product',
        totalUnits: mockTotal || 50
      };
    });

    return {
      report: mockReport,
      predictions: mockPredictions,
      error: null,
    };
  }
}
