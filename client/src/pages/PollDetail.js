import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [msg, setMsg] = useState('');
  const load = () => axios.get(`http://localhost:5000/api/polls/${id}`).then(r => setPoll(r.data));
  useEffect(() => {
    load();
    socket.on('pollUpdated', (pid) => { if (pid === id) load(); });
    return () => socket.off('pollUpdated');
  }, [id]);
  const vote = async (i) => {
    const token = localStorage.getItem('token');
    if (!token) return setMsg('Please login to vote');
    try {
      await axios.post(`http://localhost:5000/api/polls/${id}/vote`, { optionIndex: i }, { headers: { Authorization: `Bearer ${token}` } });
      socket.emit('vote', id);
      load();
    } catch(e) { setMsg(e.response?.data?.msg || 'Error'); }
  };
  if (!poll) return <p>Loading...</p>;
  const total = poll.options.reduce((s, o) => s + o.votes, 0);
  return (
    <div>
      <h2>{poll.question}</h2>
      <p style={{ color: '#888' }}>by {poll.creator?.username} · {total} total votes</p>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <div style={{ marginBottom: 24 }}>
        {poll.options.map((o, i) => (
          <button key={i} onClick={() => vote(i)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', margin: '6px 0', borderRadius: 8, border: '1px solid #4f46e5', background: 'white', cursor: 'pointer', fontSize: 16 }}>
            {o.text} <span style={{ color: '#888', float: 'right' }}>{o.votes} votes ({total ? Math.round(o.votes/total*100) : 0}%)</span>
          </button>
        ))}
      </div>
      <h3>Results</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={poll.options.map(o => ({ name: o.text, votes: o.votes }))}>
          <XAxis dataKey="name" /><YAxis /><Tooltip />
          <Bar dataKey="votes" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}