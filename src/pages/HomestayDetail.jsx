import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import simpleData from '../services/simpleData';
import RoomList from '../components/RoomList';

function HomestayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [homestay, setHomestay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomestay = async () => {
      setLoading(true);
      try {
        // Use simple data service instead of microservices
        const allHomestays = simpleData.getAllHomestays();
        const data = allHomestays.find(h => h.id == id);
        setHomestay(data || null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomestay();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center max-w-md">
          <p className="font-semibold">Error loading homestay</p>
          <p className="text-sm">{error.message}</p>
          <button 
            onClick={() => navigate('/homestays')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Homestays
          </button>
        </div>
      </div>
    );
  }

  if (!homestay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Homestay not found</h2>
          <button 
            onClick={() => navigate('/homestays')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Browse Homestays
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/homestays')}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{homestay.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-200 relative">
            {homestay.image ? (
              <img 
                src={homestay.image} 
                alt={homestay.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-8xl opacity-50">🏠</div>
              </div>
            )}
            <div className="absolute bottom-6 left-6 bg-white bg-opacity-95 px-4 py-2 rounded-full">
              <div className="flex items-center text-yellow-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="ml-1 font-semibold text-gray-900">4.8</span>
                <span className="ml-1 text-gray-600">(24 reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{homestay.name}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg">{homestay.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">$250<span className="text-lg font-normal text-gray-600">/night</span></div>
                <div className="text-sm text-gray-500">Average per room</div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">About this property</h3>
              <p className="text-gray-600 leading-relaxed">{homestay.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <div className="text-xl">🏠</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Entire Property</div>
                  <div className="text-sm text-gray-600">You'll have the place to yourself</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <div className="text-xl">👨‍👩‍👧‍👦</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Family Friendly</div>
                  <div className="text-sm text-gray-600">Great for kids</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <div className="text-xl">🚗</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Free Parking</div>
                  <div className="text-sm text-gray-600">On-site parking available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
          <RoomList homestayId={id} />
        </div>
      </div>
    </div>
  );
}

export default HomestayDetail;