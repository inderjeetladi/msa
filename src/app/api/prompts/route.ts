import { NextRequest, NextResponse } from 'next/server'
import { PromptsService } from '@/services/promptsService'

// GET /api/prompts - Get all prompts
export async function GET() {
  try {
    const { data, error } = await PromptsService.getAllPrompts()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ prompts: data })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/prompts - Save a new prompt
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, promptResult, userId } = body
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }
    
    const { data, error } = await PromptsService.savePrompt(prompt, promptResult, userId)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ prompt: data })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
