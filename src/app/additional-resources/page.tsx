"use client";

import { useState, useEffect, useRef } from "react";
import WeatherCard from "@/components/weather/WeatherCard";
import USDAProgramReminder from "@/components/usda/USDAProgramReminder";
import EPAHerbicideUpdate from "@/components/epa/EPAHerbicideUpdate";
import InputCostAnalysis from "@/components/input-cost/InputCostAnalysis";

export default function AdditionalResources() {
  const [showCustomizeDropdown, setShowCustomizeDropdown] = useState(false);
  const [enabledAlerts, setEnabledAlerts] = useState<Record<string, boolean>>({
    'weather': true,
    'grain-bids': true,
    'usda-program': true,
    'epa-herbicide': true,
    'input-cost': true
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load user preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('alert-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setEnabledAlerts(preferences);
      } catch (err) {
        console.error('Error loading alert preferences:', err);
      }
    }
  }, []);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCustomizeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCustomizeDropdown = () => {
    setShowCustomizeDropdown(!showCustomizeDropdown);
  };

  const toggleAlert = (alertKey: string) => {
    const newEnabledAlerts = {
      ...enabledAlerts,
      [alertKey]: !enabledAlerts[alertKey]
    };
    setEnabledAlerts(newEnabledAlerts);
    localStorage.setItem('alert-preferences', JSON.stringify(newEnabledAlerts));
  };

  const alertOptions = [
    { key: 'weather', label: 'Weather & Planting Alert' },
    { key: 'grain-bids', label: 'Grain Bids Nearby' },
    { key: 'usda-program', label: 'USDA Program Reminder' },
    { key: 'epa-herbicide', label: 'EPA Herbicide Update' },
    { key: 'input-cost', label: 'Input Cost Analysis' }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Section 1 - Policy Alerts Dashboard */}
          <div className="bg-[#F9F9FA] p-6" style={{ borderColor: '#e8e8e8' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Policy Alerts</h2>
                <p className="text-gray-600 mt-1">Stay informed about regulatory changes, program deadlines, and <br/>advocacy opportunities that impact your farming operations.</p>
              </div>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={toggleCustomizeDropdown}
                  className="flex items-center px-4 py-2 bg-white border border-[#ddd] hover:bg-gray-200 rounded-lg transition-colors" 
                  id="customize-alerts"
                >
                  <span className="text-gray-700 mr-2">Customize Alerts</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${showCustomizeDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCustomizeDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Alerts to Display</h3>
                      <div className="space-y-2">
                        {alertOptions.map((option) => (
                          <label key={option.key} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={enabledAlerts[option.key]}
                              onChange={() => toggleAlert(option.key)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weather & Planting Alert */}
              {enabledAlerts['weather'] && <WeatherCard />}

              {/* Grain Bids Nearby */}
              {enabledAlerts['grain-bids'] && (
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
              )}

              {/* USDA Program Reminder */}
              {enabledAlerts['usda-program'] && <USDAProgramReminder county="Boone County" state="Missouri" />}

              {/* EPA Herbicide Update */}
              {enabledAlerts['epa-herbicide'] && <EPAHerbicideUpdate county="Boone County" state="Missouri" />}

              {/* Input Cost Analysis */}
              {enabledAlerts['input-cost'] && <InputCostAnalysis region="Central MO" crop="soybean" />}
            </div>
          </div>

          {/* Section 2 - Agricultural Resources & Farmer Community */}
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

