export default function StaffFacingProfile() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Member Profile</h1>
            <p className="text-gray-600 mt-1">Comprehensive staff view of member data and interactions</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit profile
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border p-8" style={{ borderColor: '#e8e8e8' }}>
          {/* Member Basic Information */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start space-x-6">
              {/* Profile Picture */}
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Member Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Sarah Mitchell</h2>
                <p className="text-gray-700 mb-2">Mitchell Family Farms LLC</p>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                  High Priority
                </span>
              </div>
            </div>

            {/* Member Status */}
            <div className="text-right text-gray-600">
              <p className="mb-1">Member ID: MB-2024-001</p>
              <p className="mb-1">Joined: March 2023</p>
              <p>Last Active: 2 hours ago</p>
            </div>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t" style={{ borderColor: '#e8e8e8' }}>
            {/* Location */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-bold text-gray-900">Des Moines, Iowa</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <p className="font-bold text-gray-900">Farm Owner/Operator</p>
              </div>
            </div>

            {/* Commodities */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-gray-500 mb-1">Commodities</p>
                <p className="font-bold text-gray-900">Corn, Soybeans, Wheat</p>
              </div>
            </div>

            {/* Advocacy Interests */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-gray-500 mb-1">Advocacy Interests</p>
                <p className="font-bold text-gray-900">Crop Insurance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement History Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Engagement History</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Questions Asked Card */}
            <div className="bg-purple-100 rounded-lg p-6 relative">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Questions Asked</h4>
                <div className="text-3xl font-bold text-gray-900">47</div>
              </div>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>

            {/* Policy Alerts Opened Card */}
            <div className="bg-blue-100 rounded-lg p-6 relative">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Policy Alerts Opened</h4>
                <div className="text-3xl font-bold text-gray-900">23</div>
              </div>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 102.828 2.828L10.828 12H4.828V7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
              </div>
            </div>

            {/* Events Attended Card */}
            <div className="bg-purple-100 rounded-lg p-6 relative">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Events Attended</h4>
                <div className="text-3xl font-bold text-gray-900">8</div>
              </div>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l3 3 6-6" />
                </svg>
              </div>
            </div>

            {/* Platform Usage Card */}
            <div className="bg-blue-100 rounded-lg p-6 relative">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Platform Usage</h4>
                <div className="text-3xl font-bold text-gray-900">156h</div>
              </div>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Questions and Policy Alerts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Questions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Questions</h3>
            
            <div className="space-y-4">
              {/* Question 1 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium mb-1">New EPA regulations on water runoff compliance</h4>
                    <p className="text-sm text-gray-600">Jan 20, 2024</p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    Environmental
                  </span>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium mb-1">USDA crop insurance deadlines for spring planting</h4>
                    <p className="text-sm text-gray-600">Jan 20, 2024</p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    Insurance
                  </span>
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium mb-1">State tax implications for new equipment purchases</h4>
                    <p className="text-sm text-gray-600">Feb 2, 2024</p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    Tax Policy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Policy Alerts */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Policy Alerts</h3>
            
            <div className="space-y-4">
              {/* Alert 1 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium mb-1">Updated FSMA Produce Safety Rule</h4>
                    <p className="text-sm text-gray-600">Jan 20, 2024</p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    opened
                  </span>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium mb-1">New Farm Bill Conservation Programs</h4>
                    <p className="text-sm text-gray-600">Jan 20, 2024</p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    Acknowledge
                  </span>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium mb-1">Drought Emergency Declarations</h4>
                    <p className="text-sm text-gray-600">Feb 2, 2024</p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    Opened
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internal Staff Notes and Communication History Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Internal Staff Notes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Internal Staff Notes</h3>
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                + Add note
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Note 1 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">John Smith</h4>
                  <span className="text-sm text-gray-600">2024-01-15</span>
                </div>
                <p className="text-gray-700">High-value member - very engaged with regulatory updates.</p>
              </div>

              {/* Note 2 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">Maria Garcia</h4>
                  <span className="text-sm text-gray-600">2024-01-10</span>
                </div>
                <p className="text-gray-700">Interested in conservation program opportunities.</p>
              </div>

              {/* Note 3 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">John Smith</h4>
                  <span className="text-sm text-gray-600">2024-01-08</span>
                </div>
                <p className="text-gray-700">Prefers phone communication over email.</p>
              </div>
            </div>

            {/* Add New Note */}
            <div className="bg-gray-50 rounded-lg p-6" style={{ borderColor: '#e8e8e8' }}>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Add New Note</h4>
              <textarea
                placeholder="Enter Internal Staff notes..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              ></textarea>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Save note
              </button>
            </div>
          </div>

          {/* Communication History */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Communication History</h3>
            
            <div className="space-y-4">
              {/* Communication 1 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">Follow-up on EPA compliance question</h4>
                  <span className="text-sm text-gray-600">2024-01-15</span>
                </div>
                <p className="text-gray-700 mb-3">Provided detailed guidance on new water quality standards. Member satisfied with response.</p>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>

              {/* Communication 2 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">Crop insurance consultation call</h4>
                  <span className="text-sm text-gray-600">2024-01-15</span>
                </div>
                <p className="text-gray-700 mb-3">30-minute call discussing USDA crop insurance options. Scheduled follow-up for next week.</p>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>

              {/* Communication 3 */}
              <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">Quick reminder: Tax filing deadline</h4>
                  <span className="text-sm text-gray-600">2024-01-15</span>
                </div>
                <p className="text-gray-700 mb-3">SMS reminder about upcoming tax deadline for agricultural equipment purchases.</p>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
