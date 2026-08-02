import { Link } from "react-router";
import { Plus, Sparkles } from "lucide-react";

const Navbar = () => {
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

        <Link
          to="/create"
          className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:-translate-y-0.5 hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/60 active:translate-y-0"
        >
          <Plus className="size-4" />
          <span>New Note</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
