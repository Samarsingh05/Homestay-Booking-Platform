import HomestayList from '../components/HomestayList';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import simpleData from '../services/simpleData';

function HomestayListPage() {
  const navigate = useNavigate();
  const [homestays, setHomestays] = useState([]);

  useEffect(() => {
    // Get actual homestay count
    const allHomestays = simpleData.getAllHomestays();
    setHomestays(allHomestays);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/customer')}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="text-2xl mr-3">🏖️</div>
              <h1 className="text-2xl font-bold text-gray-900">Available Homestays</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, name, or amenities..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none">
                <option>Price Range</option>
                <option>$0 - $100</option>
                <option>$100 - $200</option>
                <option>$200 - $500</option>
                <option>$500+</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none">
                <option>Property Type</option>
                <option>Entire Place</option>
                <option>Private Room</option>
                <option>Shared Room</option>
              </select>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{homestays.length} propert{homestays.length !== 1 ? 'ies' : 'y'}</span> available
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
        
        <HomestayList />
      </div>
    </div>
  );
}

export default HomestayListPage;