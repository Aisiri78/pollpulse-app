import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const logout = () => { localStorage.clear(); navigate('/login'); };
  return (
    <nav style={{ background: '#4f46e5', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: 20, textDecoration: 'none' }}>🗳️ PollPulse</Link>
      <div style={{ display: 'flex', gap: 16 }}>
        {username ? <>
          <span style={{ color: 'white' }}>Hi, {username}</span>
          <Link to="/create" style={{ color: 'white' }}>Create Poll</Link>
          <button onClick={logout} style={{ background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer', borderRadius: 4, padding: '2px 10px' }}>Logout</button>
        </> : <>
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
          <Link to="/register" style={{ color: 'white' }}>Register</Link>
        </>}
      </div>
    </nav>
  );
}