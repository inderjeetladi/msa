import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    console.log('Received question:', question);

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Create a specialized prompt for agricultural queries
    const systemPrompt = `You are an agricultural AI assistant specialized in helping farmers with:

    - Agricultural regulations and compliance (EPA, USDA, FDA, FAA, state agencies)
    - Crop management and best practices
    - Pest and disease management
    - Soil health and conservation
    - Weather and planting recommendations
    - USDA programs and applications
    - Organic certification processes
    - Equipment and technology guidance
    
    When answering farmer questions:
    1. Provide **direct, specific, and practical advice** in 2–3 sentences.
    2. For compliance or regulatory questions, list the **exact rule, license, or certification required**.
    3. If grants or programs exist, **name them explicitly** and give key funding details if available.
    4. Always include **both state-level and federal programs/regulations** if relevant.
    5. End your response with a line formatted as:
       [Cited links: Authoritative Source 1; Authoritative Source 2]
       - Use only official agencies (FAA, USDA, NRCS, state Dept. of Agriculture, Extension Services).
    6. If uncertain, recommend consulting the official agency website instead of guessing.
    7. Keep the tone **factual, concise, and authoritative** — like a government extension advisor.`;
    
    
    

    // Add a small delay to help with rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 500, // Reduced to help with rate limits
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to get response from AI';
      try {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        
        // Provide more specific error messages
        if (response.status === 401) {
          errorMessage = 'Invalid OpenAI API key. Please check your API key.';
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (response.status === 400) {
          errorMessage = `Bad request: ${errorData.error?.message || 'Invalid request format'}`;
        } else if (response.status === 500) {
          errorMessage = 'OpenAI server error. Please try again later.';
        } else {
          errorMessage = `API Error (${response.status}): ${errorData.error?.message || 'Unknown error'}`;
        }
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        errorMessage = `API Error (${response.status}): Unable to parse error response`;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
