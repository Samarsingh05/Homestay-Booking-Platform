import { useState, useEffect } from 'react';
import simpleData from '../services/simpleData';
import { Link } from 'react-router-dom';

function RoomList({ homestayId }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        // Use simple data service instead of microservices
        const data = simpleData.getHomestayRooms(homestayId);
        setRooms(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [homestayId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
        <p className="font-semibold">Error loading rooms</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <div className="text-6xl mb-4">🛏️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No rooms available</h3>
        <p className="text-gray-500">Check back later for available rooms in this property.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <Link 
          to={`/rooms/${room.id}`} 
          key={room.id}
          className="group"
        >
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:scale-105">
            {/* Room Image */}
            <div className="h-48 bg-gradient-to-br from-green-100 to-blue-200 relative overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="text-6xl opacity-50">🛏️</div>
              </div>
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                {room.capacity} Guests
              </div>
            </div>
            
            {/* Room Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {room.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {room.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <div className="text-lg mr-2">👥</div>
                  <span className="text-sm">Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-semibold">Available</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-2xl font-bold text-gray-900">
                  ${room.price}
                  <span className="text-sm font-normal text-gray-600">/night</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RoomList;