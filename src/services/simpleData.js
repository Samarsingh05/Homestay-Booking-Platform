// Simple data service for development
// This provides mock data when microservices are not available

class SimpleDataService {
  constructor() {
    this.bookings = this.loadBookings();
    this.homestays = this.loadHomestays();
    this.rooms = this.loadRooms();
    
    // No sample data - completely fresh start
    // Users will create their own properties
  }

  // Load data from localStorage
  loadBookings() {
    try {
      const bookings = localStorage.getItem('homestay_bookings');
      return bookings ? JSON.parse(bookings) : [];
    } catch {
      return [];
    }
  }

  loadHomestays() {
    try {
      const homestays = localStorage.getItem('homestay_homestays');
      return homestays ? JSON.parse(homestays) : [];
    } catch {
      return [];
    }
  }

  loadRooms() {
    try {
      const rooms = localStorage.getItem('homestay_rooms');
      return rooms ? JSON.parse(rooms) : [];
    } catch {
      return [];
    }
  }

  // Save data to localStorage
  saveBookings() {
    try {
      localStorage.setItem('homestay_bookings', JSON.stringify(this.bookings));
    } catch (error) {
      console.error('Failed to save bookings:', error);
    }
  }

  saveHomestays() {
    try {
      localStorage.setItem('homestay_homestays', JSON.stringify(this.homestays));
    } catch (error) {
      console.error('Failed to save homestays:', error);
    }
  }

  saveRooms() {
    try {
      localStorage.setItem('homestay_rooms', JSON.stringify(this.rooms));
    } catch (error) {
      console.error('Failed to save rooms:', error);
    }
  }

  // Get bookings for a user
  getUserBookings(userId) {
    return this.bookings.filter(booking => booking.user_id == userId);
  }

  // Get homestays for a host
  getHostHomestays(hostId) {
    return this.homestays.filter(homestay => homestay.host_id == hostId);
  }

  // Get bookings for a host
  getHostBookings(hostId) {
    return this.bookings.filter(booking => {
      const homestay = this.homestays.find(h => h.id == booking.homestay_id);
      return homestay && homestay.host_id == hostId;
    });
  }

  // Get rooms for a homestay
  getHomestayRooms(homestayId) {
    return this.rooms.filter(room => room.homestay_id == homestayId);
  }

  // Create new booking
  createBooking(bookingData) {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    this.bookings.push(newBooking);
    this.saveBookings();
    return newBooking;
  }

  // Create new homestay
  createHomestay(homestayData) {
    const newHomestay = {
      id: Date.now(),
      ...homestayData,
      created_at: new Date().toISOString()
    };
    this.homestays.push(newHomestay);
    this.saveHomestays();
    return newHomestay;
  }

  // Create new room
  createRoom(roomData) {
    const newRoom = {
      id: Date.now(),
      ...roomData,
      created_at: new Date().toISOString()
    };
    this.rooms.push(newRoom);
    this.saveRooms();
    return newRoom;
  }

  // Get all homestays
  getAllHomestays() {
    return this.homestays;
  }

  // Get all rooms
  getAllRooms() {
    return this.rooms;
  }
}

export default new SimpleDataService();
