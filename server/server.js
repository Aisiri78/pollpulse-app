require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/polls', require('./routes/polls'));

io.on('connection', (socket) => {
  socket.on('vote', (pollId) => io.emit('pollUpdated', pollId));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => server.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`)))
  .catch(err => console.log(err));