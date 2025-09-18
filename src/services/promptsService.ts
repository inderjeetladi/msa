import { supabase } from '@/lib/supabase'

export interface Prompt {
  id?: number
  created_at?: string
  propmt: string
  prompt_result?: string
  user_id?: string
}

export class PromptsService {
  /**
   * Save a prompt to the database
   * @param prompt - The prompt text to save
   * @param promptResult - The response/result text to save
   * @param userId - Optional user ID (can be null for anonymous users)
   * @returns Promise with the saved prompt data or error
   */
  static async savePrompt(prompt: string, promptResult?: string, userId?: string): Promise<{ data: Prompt | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .insert([
          {
            propmt: prompt,
            prompt_result: promptResult || null,
            user_id: userId || null
          }
        ])
        .select()
        .single()

      return { data, error }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  /**
   * Get all prompts for a specific user
   * @param userId - The user ID to get prompts for
   * @returns Promise with array of prompts or error
   */
  static async getUserPrompts(userId: string): Promise<{ data: Prompt[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      return { data, error }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  /**
   * Get all prompts (for admin purposes)
   * @returns Promise with array of all prompts or error
   */
  static async getAllPrompts(): Promise<{ data: Prompt[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false })

      return { data, error }
    } catch (err) {
      return { data: null, error: err }
    }
  }
}
