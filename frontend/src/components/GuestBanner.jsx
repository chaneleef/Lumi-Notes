import { Link } from "react-router";

const GuestBanner = () => {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 rounded-3xl border border-pink-200 bg-white/70 p-4 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left">
      <p className="text-sm text-slate-600">
        <span className="font-semibold text-pink-500">You&apos;re a guest</span> — your
        notes are saved only in this browser and won&apos;t sync anywhere.
      </p>
      <Link
        to="/signup"
        className="shrink-0 rounded-full bg-pink-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:bg-pink-500"
      >
        Sign up to save them
      </Link>
    </div>
  );
};

export default GuestBanner;
