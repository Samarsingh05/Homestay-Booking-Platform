import { useState, useEffect } from 'react';
import simpleData from '../services/simpleData';
import { Link } from 'react-router-dom';

function HomestayList() {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomestays = async () => {
      setLoading(true);
      try {
        // Use simple data service instead of microservices
        const data = simpleData.getAllHomestays();
        setHomestays(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomestays();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
        <p className="font-semibold">Error loading homestays</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {homestays.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No homestays available</h3>
          <p className="text-gray-500">Check back later for amazing places to stay!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestays.map((homestay) => (
            <Link 
              to={`/homestays/${homestay.id}`} 
              key={homestay.id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:scale-105">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 relative overflow-hidden">
                  {homestay.image ? (
                    <img 
                      src={homestay.image} 
                      alt={homestay.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-6xl opacity-50">🏠</div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                    Available
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {homestay.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <div className="text-lg mr-2">📍</div>
                    <span className="text-sm">{homestay.location}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {homestay.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-600">
                      <span className="text-sm font-semibold">View Details</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-sm ml-1 text-gray-600">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomestayList;
