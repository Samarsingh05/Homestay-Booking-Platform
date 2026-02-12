import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function LoginPage({ selectedRole }) {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Attempt login
    const result = await login(formData, selectedRole);
    
    if (result.success) {
      // Navigate based on role
      if (selectedRole === 'customer') {
        navigate('/customer');
      } else if (selectedRole === 'host') {
        navigate('/host');
      }
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br flex items-center justify-center py-12 px-4 ${
      selectedRole === 'customer' 
        ? 'from-blue-50 to-indigo-100' 
        : 'from-green-50 to-emerald-100'
    }`}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">
              {selectedRole === 'customer' ? '🏖️' : '🏠'}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign In as {selectedRole === 'customer' ? 'Customer' : 'Host'}
            </h1>
            <p className="text-gray-600">
              {selectedRole === 'customer' 
                ? 'Welcome back! Find your perfect stay'
                : 'Welcome back! Manage your properties'
              }
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none transition-all ${
                  selectedRole === 'customer'
                    ? 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    : 'focus:border-green-500 focus:ring-2 focus:ring-green-200'
                }`}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none transition-all ${
                  selectedRole === 'customer'
                    ? 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    : 'focus:border-green-500 focus:ring-2 focus:ring-green-200'
                }`}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedRole === 'customer'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => selectedRole === 'customer' 
                  ? navigate('/customer/register') 
                  : navigate('/host/register')
                }
                className={`font-semibold ${
                  selectedRole === 'customer'
                    ? 'text-blue-600 hover:text-blue-700'
                    : 'text-green-600 hover:text-green-700'
                }`}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
