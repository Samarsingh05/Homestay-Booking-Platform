// Simple fallback authentication service for development
// This will work without requiring the user microservice

class SimpleAuthService {
  constructor() {
    this.users = this.loadUsers();
    this.currentUser = this.loadCurrentUser();
  }

  // Load users from localStorage
  loadUsers() {
    try {
      const users = localStorage.getItem('homestay_users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  }

  // Save users to localStorage
  saveUsers() {
    try {
      localStorage.setItem('homestay_users', JSON.stringify(this.users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  // Load current user from localStorage
  loadCurrentUser() {
    try {
      const user = localStorage.getItem('homestay_current_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  // Save current user to localStorage
  saveCurrentUser(user) {
    try {
      localStorage.setItem('homestay_current_user', JSON.stringify(user));
      this.currentUser = user;
    } catch (error) {
      console.error('Failed to save current user:', error);
    }
  }

  // Register new user
  register(userData) {
    // Check if email already exists
    const existingUser = this.users.find(user => user.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now(), // Simple ID generation
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this would be hashed
      role: userData.role,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();
    this.saveCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  // Login user
  login(credentials, role) {
    const user = this.users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password &&
      u.role === role
    );

    if (user) {
      this.saveCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: 'Invalid email or password' };
  }

  // Logout user
  logout() {
    localStorage.removeItem('homestay_current_user');
    this.currentUser = null;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null;
  }
}

export default new SimpleAuthService();
