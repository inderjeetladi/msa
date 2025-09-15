import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { county = 'Boone County', state = 'Missouri' } = await request.json();
    console.log('EPA Herbicide Update request for:', county, state);

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Create a specialized prompt for EPA herbicide information
    const systemPrompt = `You are an EPA herbicide compliance specialist AI assistant. Your role is to provide accurate, up-to-date information about EPA herbicide regulations, particularly:

    - Endangered Species Act (ESA) restrictions
    - County-specific herbicide bans and restrictions
    - Dicamba and other herbicide compliance requirements
    - State and federal herbicide regulations
    - Compliance actions required for farmers
    
    When providing EPA herbicide information:
    1. Provide **specific, factual information** about current restrictions and bans
    2. Include **county-specific data** when available
    3. Give **clear action items** for compliance
    4. Use **official EPA terminology** and regulation names
    5. If you don't have current data, clearly state this and recommend checking the official EPA website
    6. Keep responses **concise and actionable** - farmers need practical compliance information
    7. Focus on recent changes and current restrictions
    
    Current date context: ${new Date().toLocaleDateString()}
    Focus on: ${county}, ${state}`;

    const userPrompt = `Provide current EPA herbicide update information for ${county}, ${state}. 

    Format your response EXACTLY as follows (4 lines only):
    [Recent restriction or update]
    [Specific county bans or restrictions]
    [Status for ${county}]
    Action: [What farmers need to do]
    
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
        max_tokens: 300,
        temperature: 0.3, // Lower temperature for more factual responses
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to get EPA herbicide information';
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
    const epaInfo = data.choices[0]?.message?.content || 'No EPA herbicide information available';

    return NextResponse.json({ 
      epaInfo,
      county,
      state,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('EPA Herbicide API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
