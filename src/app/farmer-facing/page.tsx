"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PromptsService, Prompt } from "@/services/promptsService";

export default function FarmerFacing() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);
  const [loadingPrompts, setLoadingPrompts] = useState(true);

  // Fetch saved prompts on component mount
  useEffect(() => {
    const fetchSavedPrompts = async () => {
      try {
        const { data, error } = await PromptsService.getUserPrompts('a6f9830f-7507-44ad-88f4-ed02ab3a41e0');
        if (error) {
          console.error('Error fetching prompts:', error);
        } else {
          setSavedPrompts(data || []);
        }
      } catch (err) {
        console.error('Error fetching prompts:', err);
      } finally {
        setLoadingPrompts(false);
      }
    };

    fetchSavedPrompts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Rate limiting: prevent requests more than once every 2 seconds
    const now = Date.now();
    if (now - lastRequestTime < 2000) {
      setError("Please wait a moment before asking another question.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse("");
    setLastRequestTime(now);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setResponse(data.answer);
      
      // Save the prompt and response to the database
      try {
        await PromptsService.savePrompt(question, data.answer, 'a6f9830f-7507-44ad-88f4-ed02ab3a41e0');
        console.log('Prompt and response saved successfully');
        
        // Refresh the saved prompts list
        const { data: updatedPrompts } = await PromptsService.getUserPrompts('a6f9830f-7507-44ad-88f4-ed02ab3a41e0');
        if (updatedPrompts) {
          setSavedPrompts(updatedPrompts);
        }
      } catch (saveError) {
        console.error('Failed to save prompt:', saveError);
        // Don't show error to user as this is a background operation
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (suggestedQuestion: string) => {
    setQuestion(suggestedQuestion);
  };
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* AI-Powered Agricultural Intelligence Section */}
        <div className="space-y-6">
          {/* Section 1 - AI-Powered Agricultural Intelligence */}
          <div className="bg-white p-8" style={{ borderColor: '#e8e8e8' }}>
            {/* Header with star icon */}
            <div className="text-center mb-8">
              {/* <div className="flex items-center justify-center mb-4 gap-x-2">
                 <Image  src="/assets/images/star.png" 
                  alt="Agriculture AI"
                  width={20} 
                  height={20}
                  className="mb-2"
                />
                <h1 className="text-lg font-medium text-gray-700">AI-Powered Agricultural Intelligence</h1>
              </div> */}
              
              {/* Main headings */}
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                From Regulations to Resources
              </h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Get the Information You Need
              </h3>
              
              {/* Description */}
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Get instant answers about regulations, programs, and crop guidance. From EPA rules to USDA programs, 
                Missouri Soybean Association makes complex agricultural compliance simple and actionable.
              </p>
            </div>

            {/* Suggested Question Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center" id="suggested-questions">
              {loadingPrompts ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="ml-2 text-gray-600">Loading your previous questions...</span>
                </div>
              ) : savedPrompts.length > 0 ? (
                savedPrompts.slice(0, 3).map((prompt, index) => (
                  <button 
                    key={prompt.id || index}
                    onClick={() => handleSuggestedQuestion(prompt.prompt)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-left transition-colors"
                    title={`Asked on ${new Date(prompt.created_at || '').toLocaleDateString()}`}
                  >
                    {prompt.prompt}
                  </button>
                ))
              ) : (
                // Fallback to static questions if no saved prompts
                <>
                  <button 
                    onClick={() => handleSuggestedQuestion("What are the latest changes in biotech labeling requirements?")}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-left transition-colors"
                  >
                    What are the latest changes in biotech labeling requirements?
                  </button>
                  <button 
                    onClick={() => handleSuggestedQuestion("How do I navigate USDA-APHIS notification process?")}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-left transition-colors"
                  >
                    How do I navigate USDA-APHIS notification process?
                  </button>
                  <button 
                    onClick={() => handleSuggestedQuestion("What documentation is needed for clinical trial applications?")}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-left transition-colors"
                  >
                    What documentation is needed for clinical trial applications?
                  </button>
                </>
              )}
            </div>

            {/* AI Search Box */}
            <div className="relative max-w-4xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex bg-gray-100 rounded-lg p-5 h-[187px] flex-col justify-between">
                  {/* Input field */}
                  <input
                    id="farmer-question"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here ..."
                    className="bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
                    disabled={isLoading}
                  />
                  <div className="flex justify-end">
                    {/* <button 
                      type="button"
                      className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center mr-4 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button> */}
                    
                    <div className="flex gap-x-3">
                      {/* Audio button */}
                      {/* <button 
                        type="button"
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center mr-4 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button> */}
                      
                      {/* Send button */}
                      <button 
                        type="submit"
                        disabled={isLoading || !question.trim()}
                        className="w-10 h-10 bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* AI Response Display */}
            {(response || error || isLoading) && (
              <div className="mt-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#e8e8e8' }}>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Agricultural Assistant</h3>
                  </div>
                  
                  {isLoading && (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-gray-600">Thinking about your agricultural question...</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-800 font-medium">Error:</span>
                      </div>
                      <p className="text-red-700 mt-1">{error}</p>
                    </div>
                  )}
                  
                  {response && !isLoading && (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {response}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
