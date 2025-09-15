import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { region = 'Central MO', crop = 'soybean' } = await request.json();
    console.log('Input Cost Analysis request for:', region, crop);

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Create a specialized prompt for input cost analysis
    const systemPrompt = `You are an agricultural economics specialist AI assistant. Your role is to provide accurate, up-to-date information about agricultural input costs, particularly:

    - Fertilizer price trends and year-over-year changes
    - Crop input cost analysis (seeds, fertilizer, chemicals, fuel, etc.)
    - Breakeven price calculations for different crops
    - Regional cost variations and market trends
    - Yield expectations and cost per unit analysis
    
    When providing input cost information:
    1. Provide **specific, factual data** about current input costs and trends
    2. Include **year-over-year comparisons** when available
    3. Give **breakeven calculations** based on current market conditions
    4. Use **realistic yield expectations** for the region
    5. If you don't have current data, clearly state this and recommend checking official sources
    6. Keep responses **concise and actionable** - farmers need practical cost information
    7. Focus on recent trends and current market conditions
    
    Current date context: ${new Date().toLocaleDateString()}
    Focus on: ${region}, ${crop}`;

    const userPrompt = `Provide current input cost analysis information for ${crop} in ${region}. 

    Format your response EXACTLY as follows (3 lines only):
    Fertilizer prices: [trend and percentage change] in ${region}
    Avg ${crop} input costs: $[amount]/acre (vs $[previous year amount] in [previous year])
    Breakeven: $[price]/bu at [yield] bu/acre yield
    
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
        max_tokens: 250,
        temperature: 0.3, // Lower temperature for more factual responses
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to get input cost information';
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
    const inputCostInfo = data.choices[0]?.message?.content || 'No input cost information available';

    return NextResponse.json({ 
      inputCostInfo,
      region,
      crop,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Input Cost API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
