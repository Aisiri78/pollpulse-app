import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PollDetail from './pages/PollDetail';
import CreatePoll from './pages/CreatePoll';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ maxWidth: 800, margin: '20px auto', padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={localStorage.getItem('token') ? <CreatePoll /> : <Navigate to="/login" />} />
          <Route path="/poll/:id" element={<PollDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}