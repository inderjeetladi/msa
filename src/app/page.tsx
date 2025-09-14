import Image from "next/image";

export default function Home() {
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
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-left transition-colors">
                What are the latest changes in biotech labeling requirements?
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-left transition-colors">
                How do I navigate USDA-APHIS notification process?
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-left transition-colors">
                What documentation is needed for clinical trial applications?
              </button>
            </div>

            {/* AI Search Box */}
            <div className="relative max-w-4xl mx-auto">
              <div className="flex  bg-gray-100 rounded-lg p-5 h-[187px] flex-col justify-between ">
                {/* Plus button */}
                <input
                  type="text"
                  placeholder="Type your question here ..."
                  className="bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
                />
                <div className="flex justify-end">
                {/* <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center mr-4 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button> */}
                
                {/* Input field */}
                
                <div className="flex gap-x-3">
                {/* Audio button */}
                {/* <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center mr-4 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button> */}
                
                {/* Send button */}
                <button className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
                </div>
                </div>
              </div>
            </div>
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
              <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#e8e8e8' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather & Planting Alert</h3>
               <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
  <li className=" items-center">
    Rainfall forecast: 2.8&quot; over next 5 days
  </li>

  <li className=" items-center">
    Soil temperature: 47°F (below ideal)
  </li>
   <li className=" items-center">
    Recommendation: Hold soybean planting until early next week
  </li>
</ul>

                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">5-Day Forecast</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun-icon lucide-sun mr-2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                        <span className="text-gray-700">Mon: 65°F — Sunny</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                       <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                       </svg>
                        <span className="text-gray-700">Tue: 61°F — Cloudy</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-rain-wind-icon lucide-cloud-rain-wind mr-2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m9.2 22 3-7"/><path d="m9 13-3 7"/><path d="m17 13-3 7"/></svg>
                        <span className="text-gray-700">Wed: 58°F — Rain</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-rain-wind-icon lucide-cloud-rain-wind mr-2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m9.2 22 3-7"/><path d="m9 13-3 7"/><path d="m17 13-3 7"/></svg>                      
                        <span className="text-gray-700">Thu: 60°F — Rain</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun-icon lucide-sun mr-2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                        <span className="text-gray-700">Fri: 67°F — Sunny</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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