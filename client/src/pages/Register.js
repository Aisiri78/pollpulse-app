import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const submit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      nav('/');
    } catch(e) { setErr(e.response?.data?.msg || 'Error'); }
  };
  return (
    <div style={{ maxWidth: 400, margin: '60px auto' }}>
      <h2>Register</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <input placeholder="Username" style={inp} value={form.username} onChange={e => setForm({...form, username: e.target.value})} /><br/>
      <input placeholder="Password" type="password" style={inp} value={form.password} onChange={e => setForm({...form, password: e.target.value})} /><br/>
      <button style={btn} onClick={submit}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
const inp = { width: '100%', padding: 10, margin: '8px 0', borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' };
const btn = { background: '#4f46e5', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 6, cursor: 'pointer', width: '100%' };