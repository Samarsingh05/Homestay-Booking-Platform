import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import simpleData from '../services/simpleData';

function HostDashboard() {
  const { hostId, logout, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [homestays, setHomestays] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!hostId) {
      navigate('/host/register');
    }
  }, [hostId, navigate]);

  // Fetch host data when component mounts
  useEffect(() => {
    if (hostId) {
      try {
        const hostHomestays = simpleData.getHostHomestays(hostId);
        const hostBookings = simpleData.getHostBookings(hostId);
        setHomestays(hostHomestays);
        setBookings(hostBookings);
      } catch (error) {
        console.error('Failed to fetch host data:', error);
      }
    }
  }, [hostId]);

  if (!hostId) {
    return <div className="text-center p-4">Redirecting to registration...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🏠</div>
              <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
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
          <p className="text-gray-600 text-lg">Manage your properties and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{homestays.length}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <div className="text-xl">🏘️</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <div className="text-xl">📅</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$0</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <div className="text-xl">💰</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/host/homestays/new" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">➕</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  Add Property
                </h3>
              </div>
              <p className="text-gray-600">List a new homestay</p>
            </div>
          </Link>

          <Link to="/host/rooms/new" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">🛏️</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Add Room
                </h3>
              </div>
              <p className="text-gray-600">Add rooms to properties</p>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <div className="text-2xl">📊</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Analytics</h3>
            </div>
            <p className="text-gray-600">View performance metrics</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 rounded-lg p-3 mr-4">
                <div className="text-2xl">💬</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
            </div>
            <p className="text-gray-600">Manage guest reviews</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h3>
            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.slice(0, 3).map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Booking #{booking.id}</p>
                      <p className="text-sm text-gray-600">{booking.status}</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {booking.status === 'confirmed' ? 'Active' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bookings yet</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Properties</h3>
            {homestays.length > 0 ? (
              <div className="space-y-3">
                {homestays.slice(0, 3).map(homestay => (
                  <div key={homestay.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{homestay.name || 'Property'}</p>
                      <p className="text-sm text-gray-600">{homestay.location || 'Location'}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No properties yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostDashboard;