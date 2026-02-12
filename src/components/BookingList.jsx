import { useState, useEffect, useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import simpleData from '../services/simpleData';

function BookingList() {
  const { customerId } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    if (!customerId) return;
    
    setLoading(true);
    try {
      // Use simple data service instead of microservices
      const data = simpleData.getUserBookings(customerId);
      setBookings(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (id) => {
    try {
      // Update booking status in simple data service
      const bookingIndex = bookings.findIndex(b => b.id === id);
      if (bookingIndex !== -1) {
        bookings[bookingIndex].status = 'canceled';
        simpleData.bookings = bookings;
        simpleData.saveBookings();
        alert('Booking canceled');
        fetchBookings(); // Refetch bookings after cancellation
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return <div className="text-center p-4">Loading bookings...</div>;
  if (error) return <div className="text-center p-4">Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white p-4 rounded shadow">
          <p className="text-gray-700">Room ID: {booking.room_id}</p>
          <p className="text-gray-700">Start Date: {booking.start_date}</p>
          <p className="text-gray-700">End Date: {booking.end_date}</p>
          <p className="text-gray-700">Status: {booking.status}</p>
          {booking.status === 'confirmed' && (
            <button
              onClick={() => handleCancel(booking.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookingList;