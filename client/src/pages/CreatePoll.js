import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const nav = useNavigate();
  const submit = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/polls', { question, options }, { headers: { Authorization: `Bearer ${token}` } });
    nav('/');
  };
  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>Create Poll</h2>
      <input placeholder="Your question" style={inp} value={question} onChange={e => setQuestion(e.target.value)} />
      <h4>Options</h4>
      {options.map((o, i) => (
        <input key={i} placeholder={`Option ${i+1}`} style={inp} value={o} onChange={e => { const a=[...options]; a[i]=e.target.value; setOptions(a); }} />
      ))}
      <button style={{ ...btn, background: '#666', marginBottom: 8 }} onClick={() => setOptions([...options, ''])}>+ Add Option</button><br/>
      <button style={btn} onClick={submit}>Create Poll</button>
    </div>
  );
}
const inp = { width: '100%', padding: 10, margin: '6px 0', borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' };
const btn = { background: '#4f46e5', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 6, cursor: 'pointer', width: '100%', marginTop: 8 };