# 🐻 Lumi Notes

A cute, kawaii-styled notes app built with the **MERN** stack (MongoDB, Express, React, Node).
Create, view, edit, and delete notes — with a soft pink & white theme and a walking bear loader. ✨

## Features

- ✍️ Create, view, edit, and delete notes
- 👤 Accounts — sign up / log in, with each user's notes kept private
- 🔒 Secure auth — bcrypt-hashed passwords + JWT in an httpOnly cookie
- 🧸 Guest mode — try it without an account (notes saved only in your browser)
- 🐻 Walking-bear loading animation (shown only if loading takes over 3s)
- 🚦 Optional Redis rate limiting (fails open when not configured)
- 🌸 Responsive pink & white UI (Tailwind CSS v4, Fredoka font)
- 🔔 Toast notifications for actions

## Tech stack

React 19 · Vite · React Router · Tailwind CSS v4 · react-hot-toast · lucide-react · Node.js · Express · MongoDB · Mongoose · JWT · bcrypt · Upstash Redis

## Getting started

**You'll need:** [Node.js](https://nodejs.org/) 18+ and a free [MongoDB Atlas](https://www.mongodb.com/atlas) account.

```bash
# 1. Clone
git clone https://github.com/chaneleef/Lumi-Notes.git
cd Lumi-Notes

# 2. Backend — then add your MONGO_URI and a JWT_SECRET to .env
cd backend
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run dev                 # API on http://localhost:5002

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev                 # open the URL Vite prints, usually http://localhost:5173
```

Then sign up, log in, or continue as a guest, and start making notes.

## Notes on configuration

- **Accounts keep notes private.** Sign up to get your own account — your notes are
  stored on the server and visible only to you. Passwords are hashed with bcrypt and the
  login session uses a JWT stored in an httpOnly cookie.
- **Guest mode.** You can also use the app without an account. Guest notes are saved only
  in your browser (localStorage) and are not synced anywhere.
- **Upstash is optional.** If you don't set the `UPSTASH_REDIS_*` values, rate limiting
  simply turns off (the app "fails open") and everything else works normally. To enable
  it, create a free database at [Upstash](https://console.upstash.com/) and paste the
  REST URL + token into `.env`.

## Environment variables

See [`backend/.env.example`](backend/.env.example) for the full list:

| Variable                   | Required | Description                                |
| -------------------------- | -------- | ------------------------------------------ |
| `MONGO_URI`                | ✅       | MongoDB Atlas connection string            |
| `PORT`                     | ✅       | API port — keep at `5002`                  |
| `JWT_SECRET`               | ✅       | Secret used to sign login tokens (JWT)     |
| `CLIENT_URL`               | ➖       | Frontend origin for CORS (default `:5173`) |
| `UPSTASH_REDIS_REST_URL`   | ➖       | Upstash Redis REST URL (rate limiting)     |
| `UPSTASH_REDIS_REST_TOKEN` | ➖       | Upstash Redis REST token (rate limiting)   |

> ⚠️ Never commit your real `.env` — it's already in `.gitignore`.

## Project structure

```
Lumi-Notes/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── db.js              # MongoDB connection
│       │   └── upstash.js         # Upstash Redis client (rate limiting)
│       ├── controllers/
│       │   ├── authController.js  # register, login, logout, me
│       │   └── notesController.js # notes CRUD, scoped to the owner
│       ├── lib/
│       │   └── token.js           # sign / clear the JWT auth cookie
│       ├── middleware/
│       │   ├── protectRoute.js    # verifies the auth cookie
│       │   └── rateLimiter.js     # rate limit (fails open)
│       ├── models/
│       │   ├── Note.js            # note schema (title, content, owner)
│       │   └── User.js            # user schema (name, email, password hash)
│       ├── routes/
│       │   ├── authRoutes.js      # /api/auth/*
│       │   └── notesRoutes.js     # /api/notes/* (protected)
│       └── server.js              # Express app entry
└── frontend/
    └── src/
        ├── components/            # Navbar, NoteCard, LoadingBear, GuestBanner, RateLimitedUI
        ├── context/
        │   └── AuthContext.jsx    # auth state + guest mode
        ├── lib/
        │   ├── axios.js           # API client (sends the auth cookie)
        │   └── notesStore.js      # server store vs. guest localStorage store
        ├── pages/                 # Home, Create, NoteDetail, Login, Signup
        ├── App.jsx                # routes + route protection
        └── main.jsx               # app entry (providers)
```

## API reference

Base URL: `http://localhost:5002/api`

**Auth**

| Method | Endpoint         | Auth | Description                     |
| ------ | ---------------- | ---- | ------------------------------- |
| POST   | `/auth/register` | —    | Create an account (sets cookie) |
| POST   | `/auth/login`    | —    | Log in (sets cookie)            |
| POST   | `/auth/logout`   | —    | Clear the auth cookie           |
| GET    | `/auth/me`       | ✅   | Get the current user            |

**Notes** (all require auth)

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/notes`     | List your notes          |
| GET    | `/notes/:id` | Get one of your notes    |
| POST   | `/notes`     | Create a note            |
| PUT    | `/notes/:id` | Update one of your notes |
| DELETE | `/notes/:id` | Delete one of your notes |

## Future plans

- 🔗 Deploy a public link so anyone can use the app independently (hosted frontend + backend + database).
- 🔔 An in-app reminders tab that detects when a note mentions a future due date or event, suggests adding a reminder, and sends notifications when they're due.

## AI assistance

Built with help from [Claude](https://claude.com/claude-code) (Anthropic): the front-end styling/CSS and the sign-up/authorization layer. Everything else — the notes API, data models, Express server, project structure, navbar, and font — was built by me.
