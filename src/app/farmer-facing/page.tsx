"use client";

import Image from "next/image";
import { useState } from "react";
import WeatherCard from "@/components/weather/WeatherCard";

export default function FarmerFacing() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequestTime, setLastRequestTime] = useState(0);

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
              <div className="flex items-center justify-center mb-4 gap-x-2">
                 <Image  src="/assets/images/star.png" 
                  alt="Agriculture AI"
                  width={20} 
                  height={20}
                  className="mb-2"
                />
                <h1 className="text-lg font-medium text-gray-700">AI-Powered Agricultural Intelligence</h1>
              </div>
              
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
                LinkCurrent makes complex agricultural compliance simple and actionable.
              </p>
            </div>

            {/* Suggested Question Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
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

          {/* Section 2 - Policy Alerts Dashboard */}
          <div className="bg-[#F9F9FA] p-6" style={{ borderColor: '#e8e8e8' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Policy Alerts</h2>
                <p className="text-gray-600 mt-1">Stay informed about regulatory changes, program deadlines, and <br/>advocacy opportunities that impact your farming operations.</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-white border border-[#ddd] hover:bg-gray-200 rounded-lg transition-colors">
                <span className="text-gray-700 mr-2">Customize Alerts</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weather & Planting Alert */}
              <WeatherCard />

              {/* Grain Bids Nearby */}
              <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#e8e8e8' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Grain Bids Nearby</h3>
                   <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
  <li className=" items-center">
    ADM Columbia: $12.47/bu (basis -05)
  </li>

  <li className=" items-center">
   Cargill Jefferson City: $12.32/bu (basis -12)
  </li>
   <li className=" items-center">
   MFA Mexico: $12.40/bu (basis -08)
  </li>
   <li className="flex items-center mt-2">
 ✅ ADM Columbia currently best net price.
  </li>
</ul>
              </div>

              {/* USDA Program Reminder */}
              <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#e8e8e8' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">USDA Program Reminder</h3>
                                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
  <li className=" items-center">
    Signup deadline: March 15
  </li>

  <li className=" items-center">
  ARC-CO projected payout: $21/acre (Boone County)
  </li>
   <li className=" items-center">
  PLC projected payout: $5/acre
  </li>
   <li className="items-center mt-2">
Recommendation: ARC-CO likely better protection this year
  </li>
</ul>
              </div>

              {/* EPA Herbicide Update */}
              <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#e8e8e8' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">EPA Herbicide Update</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
  <li className=" items-center">
   New ESA restrictions released
  </li>
  <li className=" items-center">
 Dicamba banned in Callaway & Cole counties
  </li>
   <li className=" items-center">
Boone County remains unrestricted
  </li>
   <li className="items-center mt-2">
Action: Review compliance requirements before spraying
  </li>
</ul>
              </div>

              {/* Input Cost Analysis */}
              <div className="bg-white rounded-lg p-6 border lg:col-span-2" style={{ borderColor: '#e8e8e8' }}>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4"> Input Cost Analysis</h3>
                                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
  <li className=" items-center">
Fertilizer prices: down 8% YoY in Central MO
  </li>
  <li className=" items-center">
Avg soybean input costs: $412/acre (vs $450 in 2024)
  </li>
   <li className=" items-center">
Breakeven: $11.20/bu at 55 bu/acre yield
  </li>
  
</ul>
              </div>
            </div>
          </div>

          {/* Section 3 - Agricultural Resources & Farmer Community */}
          <div className="" style={{ borderColor: '#e8e8e8' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Agricultural Resources Section */}
              <div className="bg-[#F9F9FA] p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Agricultural Resources</h2>
                <p className="text-gray-600 mb-6">Practical guides, regulatory information, and tools to help you navigate the complex landscape of modern agriculture.</p>
                
                {/* Resource Cards */}
                <div className="space-y-4 mb-6 flex gap-x-4">
                  {/* Best Practices Guides Card */}
                  <div className="border rounded-lg p-6" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-500">Guides</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Practices Guides</h3>
                    <p className="text-gray-600 mb-4">Comprehensive guides for crop management, soil health, and sustainable farming practices.</p>
                    <ul className="space-y-1 mb-4">
                      <li className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        Integrated Pest Management
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        Soil Conservation
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        Water Management
                      </li>
                    </ul>
                    <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                      Explore resources
                    </button>
                  </div>

                  {/* USDA Programs Card */}
                  <div className="border rounded-lg p-6" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-500">Federal</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">USDA Programs</h3>
                    <p className="text-gray-600 mb-4">Access information about federal programs, subsidies, and conservation initiatives.</p>
                    <ul className="space-y-1 mb-4">
                      <li className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        EQIP Applications
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        Crop Insurance
          </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        Conservation Programs
          </li>
                    </ul>
                    <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                      Explore resources
                    </button>
                  </div>
                </div>

                {/* View all Resources Button */}
                <button className="bg-white max-w-64 m-auto table w-full border border-[#000] text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  View all Resources
                </button>
              </div>

              {/* Farmer Community Section */}
              <div className="bg-[#F9F9FA] p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Farmer Community</h2>
                <p className="text-gray-600 mb-6">Connect with fellow farmers, share experiences, and stay updated on industry events and educational opportunities.</p>
                
                {/* Discussion Cards */}
                <div className="space-y-4">
                  {/* Discussion Card 1 */}
                  <div className="border rounded-lg p-4" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-700">MT</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Dicamba Drift Issues - Best Practices Discussion</h3>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span>Mike Thompson</span>
                          <span className="mx-2">•</span>
                          <span>23 replies</span>
                          <span className="mx-2">•</span>
                          <span>2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Pest Management</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discussion Card 2 */}
                  <div className="border rounded-lg p-4" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-700">SJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">CRP Enrollment Success Stories and Tips</h3>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span>Sarah Johnson</span>
                          <span className="mx-2">•</span>
                          <span>23 replies</span>
                          <span className="mx-2">•</span>
                          <span>2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Conservation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discussion Card 3 */}
                  <div className="border rounded-lg p-4" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-700">DC</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Organic Certification Process - Q&A</h3>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span>David Chen</span>
                          <span className="mx-2">•</span>
                          <span>23 replies</span>
                          <span className="mx-2">•</span>
                          <span>2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Certification</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
