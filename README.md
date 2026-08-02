# 🐻 Lumi Notes

A cute, kawaii-styled notes app built with the **MERN** stack (MongoDB, Express, React, Node).
Create, view, edit, and delete little notes — with a soft pink & white theme and a walking bear loader. ✨

## Tech stack

- **Frontend:** React 19 + Vite, React Router, Tailwind CSS v4, react-hot-toast, lucide-react
- **Backend:** Node + Express, Mongoose (MongoDB)
- **Rate limiting (optional):** Upstash Redis

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account (for the database)

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/chaneleef/Lumi-Notes.git
cd Lumi-Notes
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env      # on Windows: copy .env.example .env
```

Open `.env` and fill in your own **MongoDB connection string** (`MONGO_URI`).
You get this from Atlas → your cluster → **Connect → Drivers**. Keep `PORT=5002`.

Then start the API:

```bash
npm run dev
```

You should see `MONGODB CONNECTED SUCCESSFULLY!` and `Server started on PORT: 5002`.

### 3. Set up the frontend (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**) and start making notes! 🌸

## Notes on configuration

- **Your own database = your own notes.** Each person who runs this uses their own
  MongoDB, so you'll only ever see the notes in your own database.
- **No accounts/login.** Everyone connected to the *same* database shares the *same*
  notes. This is a learning project, not a multi-user product.
- **Upstash is optional.** If you don't set the `UPSTASH_REDIS_*` values, rate limiting
  simply turns off (the app "fails open") and everything else works normally. To enable
  it, create a free database at [Upstash](https://console.upstash.com/) and paste the
  REST URL + token into `.env`.

## Environment variables

See [`backend/.env.example`](backend/.env.example) for the full list:

| Variable                    | Required | Description                                  |
| --------------------------- | -------- | -------------------------------------------- |
| `MONGO_URI`                 | ✅       | MongoDB Atlas connection string              |
| `PORT`                      | ✅       | API port — keep at `5002`                    |
| `CLIENT_URL`                | ➖       | Frontend origin for CORS (default `:5173`)   |
| `UPSTASH_REDIS_REST_URL`    | ➖       | Upstash Redis REST URL (rate limiting)       |
| `UPSTASH_REDIS_REST_TOKEN`  | ➖       | Upstash Redis REST token (rate limiting)     |

> ⚠️ Never commit your real `.env` — it's already in `.gitignore`.
