import { supabase } from '@/lib/supabase'

export interface Prompt {
  id?: number
  created_at?: string
  propmt: string
  prompt_result?: string
  user_id?: string
}

export interface ServiceError {
  message: string
  details?: string
  hint?: string
  code?: string
}

export type ServiceResult<T> = {
  data: T | null
  error: ServiceError | null
}

export class PromptsService {
  /**
   * Save a prompt to the database
   * @param prompt - The prompt text to save
   * @param promptResult - The response/result text to save
   * @param userId - Optional user ID (can be null for anonymous users)
   * @returns Promise with the saved prompt data or error
   */
  static async savePrompt(prompt: string, promptResult?: string, userId?: string): Promise<ServiceResult<Prompt>> {
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

      if (error) {
        return { 
          data: null, 
          error: {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          }
        }
      }

      return { data, error: null }
    } catch (err) {
      return { 
        data: null, 
        error: {
          message: err instanceof Error ? err.message : 'Unknown error occurred',
          details: 'Database operation failed'
        }
      }
    }
  }

  /**
   * Get all prompts for a specific user
   * @param userId - The user ID to get prompts for
   * @returns Promise with array of prompts or error
   */
  static async getUserPrompts(userId: string): Promise<ServiceResult<Prompt[]>> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        return { 
          data: null, 
          error: {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          }
        }
      }

      return { data: data || [], error: null }
    } catch (err) {
      return { 
        data: null, 
        error: {
          message: err instanceof Error ? err.message : 'Unknown error occurred',
          details: 'Database operation failed'
        }
      }
    }
  }

  /**
   * Get all prompts (for admin purposes)
   * @returns Promise with array of all prompts or error
   */
  static async getAllPrompts(): Promise<ServiceResult<Prompt[]>> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return { 
          data: null, 
          error: {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          }
        }
      }

      return { data: data || [], error: null }
    } catch (err) {
      return { 
        data: null, 
        error: {
          message: err instanceof Error ? err.message : 'Unknown error occurred',
          details: 'Database operation failed'
        }
      }
    }
  }
}
