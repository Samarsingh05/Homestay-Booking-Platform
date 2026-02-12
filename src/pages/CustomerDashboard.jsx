import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import simpleData from '../services/simpleData';

function CustomerDashboard() {
  const { customerId, logout, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // Fetch user's bookings when component mounts
  useEffect(() => {
    const fetchUserBookings = async () => {
      if (customerId) {
        try {
          // Use simple data service instead of microservices
          const userBookings = simpleData.getUserBookings(customerId);
          setBookings(userBookings);
        } catch (error) {
          console.error('Failed to fetch bookings:', error);
        }
      }
    };

    fetchUserBookings();
  }, [customerId]);

  // Calculate dynamic stats
  const totalBookings = bookings.length;
  const upcomingStays = bookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.start_date) > new Date()
  ).length;
  const savedPlaces = 0; // This would come from a saved places service

  if (!customerId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in as a customer to access this dashboard.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🏖️</div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600 text-lg">Find your perfect stay and manage your bookings</p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/homestays" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">🔍</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Browse Homestays
                </h3>
              </div>
              <p className="text-gray-600">Discover amazing places to stay around the world</p>
              <div className="mt-4 flex items-center text-blue-600">
                <span className="text-sm font-semibold">Explore Now</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link to="/bookings" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">📅</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  My Bookings
                </h3>
              </div>
              <p className="text-gray-600">View and manage your current and past bookings</p>
              <div className="mt-4 flex items-center text-green-600">
                <span className="text-sm font-semibold">View Bookings</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <div className="text-2xl">💳</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
            </div>
            <p className="text-gray-600">Manage your payment methods and billing information</p>
            <div className="mt-4">
              <button className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                Manage →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <div className="text-xl">📊</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Stays</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingStays}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <div className="text-xl">🗓️</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Places</p>
                <p className="text-2xl font-bold text-gray-900">{savedPlaces}</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <div className="text-xl">⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;