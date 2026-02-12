// Mock data service for development without Docker

const mockHomestays = [];

const mockRooms = [];

const mockBookings = [];

const mockHosts = [];

// Simulate API delays
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Homestay endpoints
  getHomestays: async () => {
    await delay();
    return mockHomestays;
  },
  
  getHomestay: async (id) => {
    await delay();
    return mockHomestays.find(h => h.id === parseInt(id));
  },
  
  createHomestay: async (data) => {
    await delay();
    const newHomestay = { id: mockHomestays.length + 1, ...data };
    mockHomestays.push(newHomestay);
    return newHomestay;
  },

  // Room endpoints
  getRooms: async (homestayId) => {
    await delay();
    return mockRooms.filter(r => r.homestay_id === parseInt(homestayId));
  },
  
  getRoom: async (id) => {
    await delay();
    return mockRooms.find(r => r.id === parseInt(id));
  },
  
  getRoomAvailability: async (id) => {
    await delay();
    const room = mockRooms.find(r => r.id === parseInt(id));
    return room ? room.availability : {};
  },
  
  createRoom: async (data) => {
    await delay();
    const newRoom = { id: mockRooms.length + 1, ...data };
    mockRooms.push(newRoom);
    return newRoom;
  },

  // Booking endpoints
  getBookings: async (userId) => {
    await delay();
    if (userId) {
      return mockBookings.filter(b => b.user_id === parseInt(userId));
    }
    return mockBookings;
  },
  
  getBooking: async (id) => {
    await delay();
    return mockBookings.find(b => b.id === parseInt(id));
  },
  
  createBooking: async (data) => {
    await delay();
    const newBooking = { id: mockBookings.length + 1, ...data };
    mockBookings.push(newBooking);
    return newBooking;
  },

  // Host endpoints
  getHosts: async () => {
    await delay();
    return mockHosts;
  },
  
  getHost: async (id) => {
    await delay();
    return mockHosts.find(h => h.id === parseInt(id));
  },
  
  createHost: async (data) => {
    await delay();
    const newHost = { id: mockHosts.length + 1, ...data };
    mockHosts.push(newHost);
    return newHost;
  }
};
