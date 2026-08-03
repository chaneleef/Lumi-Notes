import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import NoteCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimitedUI";
import LoadingBear from "../components/LoadingBear";
import GuestBanner from "../components/GuestBanner";
import { useAuth } from "../context/AuthContext";
import { useNotesStore } from "../lib/notesStore";

const HomePage = () => {
  const { mode } = useAuth();
  const store = useNotesStore();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    // only reveal the bear if the fetch takes longer than 3 seconds
    const loaderTimer = setTimeout(() => setShowLoader(true), 3000);

    const fetchNotes = async () => {
      try {
        const data = await store.getAll();
        setNotes(data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else if (error.response?.status !== 401) {
          // 401 is handled globally (redirect to login); don't toast it here
          toast.error("Failed to load notes.");
        }
      } finally {
        clearTimeout(loaderTimer);
        setLoading(false);
      }
    };

    fetchNotes();

    return () => clearTimeout(loaderTimer);
  }, [store]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await store.remove(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {mode === "guest" && <GuestBanner />}
      {isRateLimited && <RateLimitedUI />}

      {loading ? (
        showLoader ? <LoadingBear label="loading your notes..." /> : null
      ) : notes.length === 0 && !isRateLimited ? (
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/70 bg-white/70 px-6 py-16 text-center shadow-sm shadow-pink-100 backdrop-blur">
          <h2 className="font-display text-2xl font-bold text-slate-800">
            no notes yet
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            your board is a blank canvas. make the first one.
          </p>
          <Link
            to="/create"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:-translate-y-0.5 hover:bg-pink-500"
          >
            <Plus className="size-4" />
            Create a note
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
