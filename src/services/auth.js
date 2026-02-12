// Simple authentication service for demo purposes
// In production, this would connect to a real backend

const DEMO_USERS = {
  customers: [],
  hosts: []
};

class AuthService {
  constructor() {
    this.currentUser = this.loadUser();
  }

  // Load user from localStorage
  loadUser() {
    try {
      const userData = localStorage.getItem('homestay_user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  // Save user to localStorage
  saveUser(user) {
    try {
      localStorage.setItem('homestay_user', JSON.stringify(user));
      this.currentUser = user;
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  }

  // Clear user session
  logout() {
    try {
      localStorage.removeItem('homestay_user');
      this.currentUser = null;
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  // Customer login
  async loginCustomer(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const customer = DEMO_USERS.customers.find(
      user => user.email === email && user.password === password
    );

    if (customer) {
      const userSession = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        role: 'customer',
        loginTime: new Date().toISOString()
      };
      this.saveUser(userSession);
      return { success: true, user: userSession };
    }

    return { success: false, error: 'Invalid email or password' };
  }

  // Host login
  async loginHost(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const host = DEMO_USERS.hosts.find(
      user => user.email === email && user.password === password
    );

    if (host) {
      const userSession = {
        id: host.id,
        name: host.name,
        email: host.email,
        role: 'host',
        loginTime: new Date().toISOString()
      };
      this.saveUser(userSession);
      return { success: true, user: userSession };
    }

    return { success: false, error: 'Invalid email or password' };
  }

  // Customer registration
  async registerCustomer(userData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingCustomer = DEMO_USERS.customers.find(
      user => user.email === userData.email
    );

    if (existingCustomer) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new customer (in real app, this would be saved to database)
    const newCustomer = {
      id: Math.floor(Math.random() * 1000) + 100,
      name: userData.name,
      email: userData.email,
      role: 'customer',
      loginTime: new Date().toISOString()
    };

    this.saveUser(newCustomer);
    return { success: true, user: newCustomer };
  }

  // Host registration
  async registerHost(userData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingHost = DEMO_USERS.hosts.find(
      user => user.email === userData.email
    );

    if (existingHost) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new host
    const newHost = {
      id: Math.floor(Math.random() * 100) + 10,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: 'host',
      loginTime: new Date().toISOString()
    };

    this.saveUser(newHost);
    return { success: true, user: newHost };
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null;
  }

  // Check user role
  isCustomer() {
    return this.currentUser?.role === 'customer';
  }

  isHost() {
    return this.currentUser?.role === 'host';
  }
}

export default new AuthService();
