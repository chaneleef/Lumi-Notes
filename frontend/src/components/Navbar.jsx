import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LogOut, Plus, Sparkles } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { mode, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-pink-400 text-white shadow-sm shadow-pink-300/50 transition group-hover:rotate-6">
            <Sparkles className="size-5" />
          </span>
          <span className="font-display text-2xl font-extrabold text-pink-500">
            Lumi Notes
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* logged-in: greeting + new note + logout */}
          {mode === "authed" && (
            <>
              <span className="hidden text-sm font-semibold text-slate-500 sm:inline">
                hi, {user?.name?.split(" ")[0]}
              </span>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:-translate-y-0.5 hover:bg-pink-500"
              >
                <Plus className="size-4" />
                <span className="hidden sm:inline">New Note</span>
              </Link>
              <button
                onClick={handleLogout}
                aria-label="Log out"
                className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-3 py-2 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
              >
                <LogOut className="size-4" />
              </button>
            </>
          )}

          {/* guest: new note + sign up */}
          {mode === "guest" && (
            <>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:-translate-y-0.5 hover:bg-pink-500"
              >
                <Plus className="size-4" />
                <span className="hidden sm:inline">New Note</span>
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-pink-200 bg-white/70 px-4 py-2 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
              >
                Sign up
              </Link>
            </>
          )}

          {/* signed out: log in + sign up */}
          {mode === "anon" && (
            <>
              <Link
                to="/login"
                className="rounded-full border border-pink-200 bg-white/70 px-4 py-2 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-pink-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:-translate-y-0.5 hover:bg-pink-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
