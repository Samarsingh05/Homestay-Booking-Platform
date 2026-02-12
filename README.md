# Homestay Booking Platform

A modern React-based homestay booking application with customer and host dashboards.

## 🚀 Features

- **Customer Dashboard**: Browse properties, view bookings, manage stays
- **Host Dashboard**: Manage properties, track bookings, view analytics
- **Authentication**: Secure login and registration for both roles
- **Local Storage**: Works completely offline with data persistence
- **Modern UI**: Beautiful responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router
- **Styling**: Tailwind CSS
- **Data**: Local Storage (no backend required)
- **Deployment**: GitHub Pages

## 🏠 Live Demo

[View Live Application](https://samarsingh05.github.io/Homestay-Booking-Platform/)

## 📱 How to Use

### For Customers:
1. Select "Customer" role
2. Register or login
3. Browse available homestays
4. View property details
5. Make bookings

### For Hosts:
1. Select "Host" role  
2. Register or login
3. Add properties
4. Manage bookings
5. Track revenue

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/samarsingh05/Homestay-Booking-Platform.git
cd Homestay-Booking-Platform

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🧹 Clear Data

To clear all application data (fresh start):
```javascript
// Open browser console and run:
localStorage.clear()
```

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── context/       # React context for state management
├── pages/         # Page components
├── services/      # Data services and API calls
└── styles/        # CSS and styling files
```

## 🎯 Key Features

- ✅ Role-based authentication (Customer/Host)
- ✅ Property management system
- ✅ Booking management
- ✅ Local data persistence
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ No backend required

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
