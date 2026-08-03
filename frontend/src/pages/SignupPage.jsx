import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const { register, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setBusy(true);
    try {
      await register(name, email, password);
      toast.success("Account created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create account.");
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
            join Lumi Notes
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            make an account to keep your notes safe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>
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
              placeholder="at least 6 characters"
              className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-pink-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Creating..." : "Sign up"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-pink-500 hover:underline">
            Log in
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

export default SignupPage;
