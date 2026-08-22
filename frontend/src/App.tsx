import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import HomePage from './pages/HomePage';

function App() {

  const location = useLocation();

  return (
    <>
      {
        location.pathname === '/' ? <HomePage /> : (
        <>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/subscriptions/:id" element={<SubscriptionPage/>} />
          </Routes>
        </>
        )
      }
    </>
  )
}

export default App
