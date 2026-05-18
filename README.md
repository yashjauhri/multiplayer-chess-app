# Multiplayer Chess App ♟️

A real-time multiplayer chess application built using React, TypeScript, Node.js, WebSockets, and chess.js.

---

# Features

- Real-time multiplayer gameplay
- WebSocket communication
- Matchmaking system
- Turn validation
- Board rotation for black player
- Opponent disconnect handling
- Live game synchronization

---

# Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- chess.js

## Backend
- Node.js
- TypeScript
- ws (WebSocket library)
- chess.js

---

# Clone Repository

```bash
git clone https://github.com/yourusername/multiplayer-chess-app.git
```

---

# Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install chess.js:

```bash
npm install chess.js
```

Run frontend:

```bash
npm run dev
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Install required packages:

```bash
npm install chess.js ws
```

Install TypeScript types for ws:

```bash
npm install -D @types/ws
```

Build backend:

```bash
npx tsc -b
```

Run backend:

```bash
node dist/index.js
```

---

# Screenshots

## Multiplayer Gameplay

![first page](./Screenshots/Screenshot%202026-05-18%20233258.png)
![first player(white)](./Screenshots/Screenshot%202026-05-18%20233659.png)
![second player(black)](./Screenshots/Screenshot%202026-05-18%20233716.png)

---

# Future Improvements

- Chess timers
- Authentication
- Online rooms
- Game history
- ELO rating system
- Deployment
