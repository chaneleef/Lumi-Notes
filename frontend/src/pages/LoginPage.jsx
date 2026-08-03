import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not log in.");
    } finally {
      setBusy(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate("/");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-sm shadow-pink-100 backdrop-blur">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-pink-400 text-white shadow-sm shadow-pink-300/50">
            <Sparkles className="size-6" />
          </span>
          <h1 className="font-display mt-3 text-2xl font-extrabold text-slate-800">
            welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">log in to see your notes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-pink-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-pink-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <button
        onClick={handleGuest}
        className="mx-auto mt-5 text-sm font-semibold text-slate-400 transition hover:text-pink-500"
      >
        or keep looking around as a guest →
      </button>
    </div>
  );
};

export default LoginPage;
