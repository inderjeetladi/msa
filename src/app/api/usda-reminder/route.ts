import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { county = 'Boone County', state = 'Missouri' } = await request.json();
    console.log('USDA Reminder request for:', county, state);

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Create a specialized prompt for USDA program information
    const systemPrompt = `You are a USDA program specialist AI assistant. Your role is to provide accurate, up-to-date information about USDA programs, particularly:

    - ARC-CO (Agriculture Risk Coverage - County) program details
    - PLC (Price Loss Coverage) program details
    - Program signup deadlines and requirements
    - Projected payouts and coverage recommendations
    - County-specific program information
    
    When providing USDA program information:
    1. Provide **specific, factual information** about program deadlines, requirements, and projected payouts
    2. Include **county-specific data** when available
    3. Give **clear recommendations** based on current market conditions and program parameters
    4. Use **official USDA terminology** and program names
    5. If you don't have current data, clearly state this and recommend checking the official USDA website
    6. Keep responses **concise and actionable** - farmers need practical information
    7. Format the response as a structured list with clear bullet points
    
    Current date context: ${new Date().toLocaleDateString()}
    Focus on: ${county}, ${state}`;

    const userPrompt = `Provide current USDA program reminder information for ${county}, ${state}. 

    Format your response EXACTLY as follows (4 lines only):
    Signup deadline: [date]
    ARC-CO projected payout: $[amount]/acre (${county})
    PLC projected payout: $[amount]/acre
    Recommendation: [which program is better] this year
    
    Use the exact format above with no additional text, bullet points, or explanations.`;

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
            content: userPrompt
          }
        ],
        max_tokens: 400,
        temperature: 0.3, // Lower temperature for more factual responses
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to get USDA program information';
      try {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        
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
    const usdaInfo = data.choices[0]?.message?.content || 'No USDA program information available';

    return NextResponse.json({ 
      usdaInfo,
      county,
      state,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('USDA Reminder API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
