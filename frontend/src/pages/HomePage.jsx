import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimitedUI";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this little note? 🥺")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted 🌸");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {isRateLimited && <RateLimitedUI />}

      {loading ? (
        <div className="flex flex-col items-center gap-3 py-20">
          <span className="animate-float text-4xl">🌸</span>
          <p className="font-display text-slate-400">loading your notes...</p>
        </div>
      ) : notes.length === 0 && !isRateLimited ? (
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/70 bg-white/70 px-6 py-16 text-center shadow-sm shadow-pink-100 backdrop-blur">
          <span className="mb-2 inline-block animate-float text-6xl">📝</span>
          <h2 className="font-display mt-2 text-2xl font-bold text-slate-800">
            no notes yet~
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            your board is a blank canvas. let&apos;s make the first one! 💕
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
