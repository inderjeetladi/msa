'use client';

import { useState } from 'react';

export default function StaffFacing() {
  const [activeTab, setActiveTab] = useState('engagement-dashboard');

  const tabs = [
    { id: 'engagement-dashboard', name: 'Engagement Dashboard' },
    { id: 'member-directory', name: 'Member Directory' },
    { id: 'communications-hub', name: 'Communications Hub' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'engagement-dashboard':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Engagement Dashboard</h2>
            
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Members Card */}
              <div className="bg-purple-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Total Members</h3>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">456</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">+11.01%</span>
                </div>
              </div>

              {/* Active This Week Card */}
              <div className="bg-blue-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Active This Week</h3>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">246</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">-0.03%</span>
                </div>
              </div>

              {/* Questions Asked Card */}
              <div className="bg-purple-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Questions Asked</h3>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">564</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">+23%</span>
                </div>
              </div>

              {/* Advocacy Actions Card */}
              <div className="bg-blue-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Advocacy Actions</h3>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">89</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">+15%</span>
                </div>
              </div>
            </div>

            {/* Questions and Events Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Questions Asked */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Top Questions Asked</h3>
                <p className="text-sm text-gray-600 mb-6">Most frequently asked questions this month</p>
                
                <div className="space-y-4">
                  {/* Question 1 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-white">1</span>
                      </div>
                      <p className="text-gray-900 font-medium">What are the new FSMA requirements?</p>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-white">2</span>
                      </div>
                      <p className="text-gray-900 font-medium">How to implement organic certification?</p>
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-white">3</span>
                      </div>
                      <p className="text-gray-900 font-medium">Export documentation for dairy products</p>
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-white">4</span>
                      </div>
                      <p className="text-gray-900 font-medium">Labor compliance regulations update</p>
                    </div>
                  </div>

                  {/* Question 5 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-white">5</span>
                      </div>
                      <p className="text-gray-900 font-medium">Pesticide usage reporting requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Events</h3>
                <p className="text-sm text-gray-600 mb-6">Member events and participation tracking</p>
                
                <div className="space-y-4">
                  {/* Event 1 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">FSMA Training Webinar</h4>
                        <p className="text-sm text-gray-600">Jan 20, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        234 registered
                      </span>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Regional Farm Visit</h4>
                        <p className="text-sm text-gray-600">Jan 20, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        67 registered
                      </span>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Advocacy Day Planning</h4>
                        <p className="text-sm text-gray-600">Feb 2, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        89 registered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Alerts & Quick Links Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Staff Alerts & Quick Links</h3>
              <p className="text-sm text-gray-600 mb-6">Important notifications and frequently accessed resources</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Regulatory Database Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Regulatory Database</h4>
                      <p className="text-sm text-gray-600">Access latest regulations</p>
                    </div>
                  </div>
                </div>

                {/* Member Onboarding Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Member Onboarding</h4>
                      <p className="text-sm text-gray-600">New member setup tools</p>
                    </div>
                  </div>
                </div>

                {/* Analytics Reports Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#dddddd' }}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Analytics Reports</h4>
                      <p className="text-sm text-gray-600">Detailed engagement metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'member-directory':
        return (
          <div className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Member Directory</h2>
              <p className="text-gray-600">Content for Member Directory will be added here.</p>
            </div>
          </div>
        );
      case 'communications-hub':
        return (
          <div className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Communications Hub</h2>
              <p className="text-gray-600">Content for Communications Hub will be added here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6" style={{ borderColor: '#dddddd' }}>
          <div className="flex border-b" style={{ borderColor: '#dddddd' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-black text-white border-b-2 border-black'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={{
                  borderBottomColor: activeTab === tab.id ? '#000000' : 'transparent'
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: '#dddddd' }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
