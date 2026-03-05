# 🗳️ PollPulse – Real-Time Polling App

A full-stack polling app built with React, Node.js, Express, MongoDB, and Socket.io.

## Features
- User registration & login (JWT auth)
- Create polls with multiple options
- Vote once per poll (duplicate vote prevention)
- Real-time vote updates via Socket.io
- Bar chart results using Recharts

## Tech Stack
React | Node.js | Express | MongoDB | Socket.io | JWT | Recharts

## Setup

### Backend
cd server
npm install
node server.js

### Frontend
cd client
npm install
npm start

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/polls | Get all polls |
| GET | /api/polls/:id | Get one poll |
| POST | /api/polls | Create poll (auth) |
| POST | /api/polls/:id/vote | Vote on poll (auth) |
| DELETE | /api/polls/:id | Delete poll (auth) |
