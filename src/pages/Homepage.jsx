import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import LoginPage from './LoginPage';

function HomePage() {
  const { setRole } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isNew, setIsNew] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsNew(null);
  };

  const handleNew = () => {
    setIsNew(true);
    // Navigate to registration pages
    if (selectedRole === 'customer') {
      navigate('/customer/register');
    } else if (selectedRole === 'host') {
      navigate('/host/register');
    }
  };

  const handleExisting = () => {
    setIsNew(false);
  };

  // If user has selected a role and wants to sign in, show login page
  if (selectedRole && isNew === false) {
    return <LoginPage selectedRole={selectedRole} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Homestay Management
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Discover amazing places to stay or list your property with our trusted homestay platform
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Role Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            How would you like to continue?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleRoleSelect('customer')}
              className={`p-8 rounded-xl border-2 transition-all duration-300 ${
                selectedRole === 'customer'
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Find a Stay</h3>
              <p className="text-gray-600">Browse and book amazing homestays around the world</p>
            </button>
            
            <button
              onClick={() => handleRoleSelect('host')}
              className={`p-8 rounded-xl border-2 transition-all duration-300 ${
                selectedRole === 'host'
                  ? 'border-green-500 bg-green-50 shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">List Property</h3>
              <p className="text-gray-600">Host your property and earn money from travelers</p>
            </button>
          </div>
        </div>

        {/* New/Existing Selection */}
        {selectedRole && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Are you a new or existing {selectedRole}?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleNew}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="text-lg font-semibold">I'm New</div>
                <div className="text-sm opacity-90">Get started now</div>
              </button>
              <button
                onClick={handleExisting}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="text-lg font-semibold">I Have an Account</div>
                <div className="text-sm opacity-90">Sign in to continue</div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-gray-600">
        <p>&copy; 2024 Homestay Management Platform. All rights reserved.</p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default HomePage;