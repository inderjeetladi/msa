'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function StaffFacing() {
  const [activeTab, setActiveTab] = useState('engagement-dashboard');
  
  // Group Email state
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  
  // Profiles state (for Group Email)
  interface Profile {
    email: string;
    full_name: string;
  }
  
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [profilesError, setProfilesError] = useState('');

  // Member Directory state
  const [memberDirectory, setMemberDirectory] = useState<Profile[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [membersError, setMembersError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch profiles from Supabase for Group Email
  useEffect(() => {
    const fetchProfiles = async () => {
      if (activeTab !== 'communications-hub') return;
      
      setLoadingProfiles(true);
      setProfilesError('');
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('email, full_name')
          .not('email', 'is', null);

        if (error) {
          throw error;
        }

        setProfiles(data || []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setProfilesError(error instanceof Error ? error.message : 'Failed to load profiles');
      } finally {
        setLoadingProfiles(false);
      }
    };

    fetchProfiles();
  }, [activeTab]);

  // Fetch profiles from Supabase for Member Directory
  useEffect(() => {
    const fetchMemberDirectory = async () => {
      if (activeTab !== 'member-directory') return;
      
      setLoadingMembers(true);
      setMembersError('');
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('email, full_name')
          .not('email', 'is', null)
          .order('full_name', { ascending: true });

        if (error) {
          throw error;
        }

        setMemberDirectory(data || []);
      } catch (error) {
        console.error('Error fetching member directory:', error);
        setMembersError(error instanceof Error ? error.message : 'Failed to load members');
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMemberDirectory();
  }, [activeTab]);

  // Filter members based on search query
  const filteredMembers = memberDirectory.filter((member) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      (member.full_name?.toLowerCase().includes(query)) ||
      (member.email?.toLowerCase().includes(query))
    );
  });

  // Handle email checkbox toggle
  const handleEmailToggle = (email: string) => {
    setSelectedEmails(prev => {
      if (prev.includes(email)) {
        return prev.filter(e => e !== email);
      } else {
        return [...prev, email];
      }
    });
    // Clear messages when changing selection
    setEmailError('');
    setEmailSuccess('');
  };

  // Handle form submission
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setEmailError('');
    setEmailSuccess('');

    // Validation
    if (selectedEmails.length === 0) {
      setEmailError('Please select at least one recipient');
      return;
    }

    if (!emailSubject.trim()) {
      setEmailError('Please enter a subject');
      return;
    }

    if (!emailMessage.trim()) {
      setEmailError('Please enter a message');
      return;
    }

    setIsSendingEmail(true);

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: selectedEmails,
          subject: emailSubject,
          message: emailMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      // Success
      setEmailSuccess(`Email sent successfully to ${data.sent || selectedEmails.length} recipient(s)`);
      
      // Clear form
      setSelectedEmails([]);
      setEmailSubject('');
      setEmailMessage('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setEmailSuccess('');
      }, 5000);

    } catch (error) {
      setEmailError(error instanceof Error ? error.message : 'Failed to send email. Please try again.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const tabs = [
    { id: 'engagement-dashboard', name: 'Engagement Dashboard' },
    { id: 'member-directory', name: 'Member Directory' },
    { id: 'communications-hub', name: 'Communications Hub' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'engagement-dashboard':
        return (
          <div className="p-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Engagement Dashboard</h2>
            
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Members Card */}
              <div className="bg-[#EDEEFC] rounded-lg p-6">
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
              <div className="bg-[#E6F1FD] rounded-lg p-6">
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
              <div className="bg-[#EDEEFC] rounded-lg p-6">
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
              <div className="bg-[#E6F1FD] rounded-lg p-6">
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
              <div className="bg-[#F9F9FA] p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Top Questions Asked</h3>
                <p className="text-sm text-gray-600 mb-6">Most frequently asked questions this month</p>
                
                <div className="space-y-4">
                  {/* Question 1 */}
                  <div className="bg-white rounded-lg p-4 border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#f0f0f0] rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-black">1</span>
                      </div>
                      <p className="text-gray-900 font-medium">What are the new FSMA requirements?</p>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="bg-white rounded-lg p-4 border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#f0f0f0] rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-black">2</span>
                      </div>
                      <p className="text-gray-900 font-medium">How to implement organic certification?</p>
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="bg-white rounded-lg p-4 border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#f0f0f0] rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-black">3</span>
                      </div>
                      <p className="text-gray-900 font-medium">Export documentation for dairy products</p>
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div className="bg-white rounded-lg p-4 border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#f0f0f0] rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-black">4</span>
                      </div>
                      <p className="text-gray-900 font-medium">Labor compliance regulations update</p>
                    </div>
                  </div>

                  {/* Question 5 */}
                  <div className="bg-white rounded-lg p-4 border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#f0f0f0] rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-black">5</span>
                      </div>
                      <p className="text-gray-900 font-medium">Pesticide usage reporting requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-[#F9F9FA] p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Events</h3>
                <p className="text-sm text-gray-600 mb-6">Member events and participation tracking</p>
                
                <div className="space-y-4">
                  {/* Event 1 */}
                  <div className="bg-white rounded-lg p-4  border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">FSMA Training Webinar</h4>
                        <p className="text-sm text-gray-600">Jan 20, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-[3px]">
                        234 registered
                      </span>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="bg-white rounded-lg p-4  border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Regional Farm Visit</h4>
                        <p className="text-sm text-gray-600">Jan 20, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-[3px]">
                        67 registered
                      </span>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="bg-white rounded-lg p-4  border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Advocacy Day Planning</h4>
                        <p className="text-sm text-gray-600">Feb 2, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-[3px]">
                        89 registered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Alerts & Quick Links Section */}
            <div className="mt-8 bg-[#F9F9FA] p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Staff Alerts & Quick Links</h3>
              <p className="text-sm text-gray-600 mb-6">Important notifications and frequently accessed resources</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Regulatory Database Card */}
                <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#f0f0f0' }}>
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
                <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#f0f0f0' }}>
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
                <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#f0f0f0' }}>
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
          <div className="bg-[#F9F9FA] p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Member Directory</h2>
            <p className="text-gray-600 mb-6">Search and filter members by region, commodity, and engagement level</p>
            
            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members..."
                  className="w-full bg-white pl-10 pr-4 py-3 border border-[#e8e8e8] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* All Regions Dropdown */}
              <div className="relative">
                <select className="appearance-none bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All regions</option>
                  <option>Northeast</option>
                  <option>Southeast</option>
                  <option>Midwest</option>
                  <option>West</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* All Commodities Dropdown */}
              <div className="relative">
                <select className="appearance-none bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Commodities</option>
                  <option>Dairy</option>
                  <option>Grain</option>
                  <option>Livestock</option>
                  <option>Vegetables</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Member List */}
            {loadingMembers ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-3"></div>
                <span className="text-gray-600">Loading members...</span>
              </div>
            ) : membersError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-800">Error loading members: {membersError}</p>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  {searchQuery ? 'No members found matching your search.' : 'No members found.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.email} className="bg-white rounded-lg p-6  border" style={{ borderColor: '#e8e8e8' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{member.full_name || 'No name'}</h3>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-[3px]">Active</span>
                        </div>
                        <p className="text-gray-600 mb-1">{member.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 rounded-[3px] border border-[#e8e8e8] flex items-center justify-center hover:bg-gray-50">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-[3px] border border-[#e8e8e8] flex items-center justify-center hover:bg-gray-50">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-[3px] border border-[#e8e8e8] flex items-center justify-center hover:bg-gray-50">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'communications-hub':
        return (
          <div className="p-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Communications Hub</h2>
            
            {/* Messaging Sections - Email Campaigns and Multi-Channel Messaging commented out */}
            {/* 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#F9F9FA] p-6 rounded-lg " style={{ borderColor: '#e8e8e8' }}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email Campaigns</h3>
                <p className="text-sm text-gray-600 mb-6">Send targeted emails to member segments</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Audience</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Choose member segment</option>
                        <option>All Members</option>
                        <option>Active Members</option>
                        <option>High Engagement</option>
                        <option>Northeast Region</option>
                        <option>Dairy Farmers</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Template</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Choose template</option>
                        <option>Newsletter Template</option>
                        <option>Event Invitation</option>
                        <option>Policy Update</option>
                        <option>Welcome Message</option>
                        <option>Custom Template</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                    Send Campaign
                  </button>
                </div>
              </div>

              <div className="bg-[#F9F9FA] p-6 rounded-lg" style={{ borderColor: '#e8e8e8' }}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Channel Messaging</h3>
                <p className="text-sm text-gray-600 mb-6">Send messages via email, SMS, and social media</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Select message type</option>
                        <option>Announcement</option>
                        <option>Event Reminder</option>
                        <option>Policy Update</option>
                        <option>Emergency Alert</option>
                        <option>Marketing Campaign</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Channels</label>
                    <div className="flex space-x-3">
                      <label className="flex-1 cursor-pointer">
                        <input type="radio" name="channel" value="email" className="sr-only" defaultChecked />
                        <div className="bg-white border-2 border-[#e8e8e8] rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors ">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">Email</span>
                        </div>
                      </label>

                      <label className="flex-1 cursor-pointer">
                        <input type="radio" name="channel" value="sms" className="sr-only" />
                        <div className="bg-white border-2 border-[#e8e8e8] rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">SMS</span>
                        </div>
                      </label>

                      <label className="flex-1 cursor-pointer">
                        <input type="radio" name="channel" value="social" className="sr-only" />
                        <div className="bg-white border-2 border-[#e8e8e8] rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">Social</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                    Create Multi Channel Campaign
                  </button>
                </div>
              </div>
            </div>
            */}

            {/* Group Email Feature */}
            <div className="bg-[#F9F9FA] p-6 rounded-lg mb-8" style={{ borderColor: '#e8e8e8' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Group Email</h3>
              <p className="text-sm text-gray-600 mb-6">
                Send email to selected recipients
                {selectedEmails.length > 0 && (
                  <span className="ml-2 text-gray-500">({selectedEmails.length} selected)</span>
                )}
              </p>
              
              <form onSubmit={handleSendEmail}>
                <div className="space-y-6">
                  {/* Email Recipients */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Recipients</label>
                    <div className="bg-white rounded-lg border" style={{ borderColor: '#e8e8e8' }}>
                      {loadingProfiles ? (
                        <div className="p-4 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                          <span className="text-gray-600 text-sm">Loading profiles...</span>
                        </div>
                      ) : profilesError ? (
                        <div className="p-4 text-red-600 text-sm">
                          Error loading profiles: {profilesError}
                        </div>
                      ) : profiles.length === 0 ? (
                        <div className="p-4 text-gray-600 text-sm text-center">
                          No profiles found
                        </div>
                      ) : (
                        <div className="p-4 space-y-3">
                          {profiles.map((profile) => (
                            <label 
                              key={profile.email}
                              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                            >
                              <input 
                                type="checkbox"
                                checked={selectedEmails.includes(profile.email)}
                                onChange={() => handleEmailToggle(profile.email)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                disabled={isSendingEmail}
                              />
                              <div className="flex flex-col">
                                <span className="text-gray-900 font-medium">{profile.full_name || 'No name'}</span>
                                <span className="text-gray-600 text-sm">{profile.email}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Enter email subject"
                      className="w-full bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSendingEmail}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={6}
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      placeholder="Enter your message here..."
                      className="w-full bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      disabled={isSendingEmail}
                    ></textarea>
                  </div>

                  {/* Error Message */}
                  {emailError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-800 text-sm">{emailError}</span>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {emailSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-800 text-sm">{emailSuccess}</span>
                      </div>
                    </div>
                  )}

                  {/* Send Message Button */}
                  <button 
                    type="submit"
                    disabled={isSendingEmail || selectedEmails.length === 0 || !emailSubject.trim() || !emailMessage.trim()}
                    className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSendingEmail ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Recent Communications Section */}
            <div className="bg-[#F9F9FA] p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Communications</h3>
              <p className="text-sm text-gray-600 mb-6">Track sent messages and engagement rates</p>
              
              <div className="space-y-4">
                {/* FSMA Compliance Update */}
                <div className="bg-white rounded-lg p-6  border" style={{ borderColor: '#e8e8e8' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">FSMA Compliance Update</h4>
                      <p className="text-sm text-gray-600 mt-1">Sent: 2024-01-15</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center flex gap-x-1">
                        <div className="text-[13px] font-bold text-gray-900">89%</div>
                        <div className="text-[13px] text-gray-600">Opens</div>
                      </div>
                      <div className="text-center flex gap-x-1">
                        <div className="text-[13px] font-bold text-gray-900">34%</div>
                        <div className="text-[13px] text-gray-600">Clicks</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Meeting Invitation */}
                <div className="bg-white rounded-lg p-6  border" style={{ borderColor: '#e8e8e8' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Regional Meeting Invitation</h4>
                      <p className="text-sm text-gray-600 mt-1">Sent: 2024-01-14</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center flex gap-x-1">
                        <div className="text-[13px] font-bold text-gray-900">76%</div>
                        <div className="text-[13px] text-gray-600">Opens</div>
                      </div>
                      <div className="text-center flex gap-x-1">
                        <div className="text-[13px] font-bold text-gray-900">24%</div>
                        <div className="text-[13px] text-gray-600">Clicks</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Regulatory Alert */}
                <div className="bg-white rounded-lg p-6  border" style={{ borderColor: '#e8e8e8' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">New Regulatory Alert</h4>
                      <p className="text-sm text-gray-600 mt-1">Sent: 2024-01-13</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center flex gap-x-1">
                        <div className="text-[13px] font-bold text-gray-900">79%</div>
                        <div className="text-[13px] text-gray-600">Opens</div>
                      </div>
                      <div className="text-center flex gap-x-1">
                        <div className="text-[13px] font-bold text-gray-900">74%</div>
                        <div className="text-[13px] text-gray-600">Clicks</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
        <div className="bg-[#F9F9FA] rounded-lg  mb-6">
          <div className="flex" >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 w-[33.33%] rounded-sm py-4 text-[14px] font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-black text-white border-b-2 border-black'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={{
                  borderBottomColor: activeTab === tab.id ? '#000000' : 'white'
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg " style={{ borderColor: '#e8e8e8' }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
