import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage.jsx';
import CustomerRegister from './pages/CustomerRegister.jsx';
import HostRegister from './pages/HostRegister.jsx';
import CustomerDashboard from './pages/CustomerDashboard';
import HostDashboard from './pages/HostDashboard';
import HomestayListPage from './pages/HomestayListPage';
import HomestayDetail from './pages/HomestayDetail';
import RoomDetail from './pages/RoomDetail';
import BookingListPage from './pages/BookingListPage';
import HostForm from './pages/HostForm';
import HomestayForm from './pages/HomestayForm';
import RoomForm from './pages/RoomForm';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/host/register" element={<HostRegister />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/homestays" element={<HomestayListPage />} />
          <Route path="/homestays/:id" element={<HomestayDetail />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/bookings" element={<BookingListPage />} />
          <Route path="/host/homestays/new" element={<HomestayForm />} />
          <Route path="/host/rooms/new" element={<RoomForm />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;