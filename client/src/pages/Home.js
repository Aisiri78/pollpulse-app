import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Home() {
  const [polls, setPolls] = useState([]);
  useEffect(() => { axios.get('http://localhost:5000/api/polls').then(r => setPolls(r.data)); }, []);
  return (
    <div>
      <h2>All Polls</h2>
      {polls.length === 0 && <p>No polls yet. <Link to="/create">Create one!</Link></p>}
      {polls.map(p => (
        <Link to={`/poll/${p._id}`} key={p._id} style={{ textDecoration: 'none' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12, background: '#f9f9f9' }}>
            <h3 style={{ margin: 0 }}>{p.question}</h3>
            <p style={{ color: '#888', margin: '4px 0 0' }}>by {p.creator?.username} · {p.options.reduce((s, o) => s + o.votes, 0)} votes</p>
          </div>
        </Link>
      ))}
    </div>
  );
}