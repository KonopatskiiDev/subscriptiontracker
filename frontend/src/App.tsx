import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import SubscriptionPage from './pages/SubscriptionPage' 
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/subscriptions/:id" element={<SubscriptionPage/>} />
    </Routes>
  )
}

export default App
