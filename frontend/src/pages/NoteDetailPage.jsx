import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft, Trash2 } from "lucide-react";

import api from "../lib/axios";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note", error);
        if (error.response?.status === 404) {
          toast.error("Note not found.");
          navigate("/");
        } else {
          toast.error("Failed to load note.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in both fields 🥺");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated 🌸");
      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this little note? 🥺")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted 🌸");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-20">
        <span className="animate-float text-4xl">🌸</span>
        <p className="font-display text-slate-400">loading...</p>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-pink-500"
        >
          <ArrowLeft className="size-4" />
          Back to notes
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-50"
        >
          <Trash2 className="size-4" />
          Delete
        </button>
      </div>

      <div className="mt-6 rounded-[2rem] border border-white/70 bg-white/70 p-7 shadow-sm shadow-pink-100 backdrop-blur">
        <h1 className="font-display text-2xl font-extrabold text-slate-800">
          edit note 🖊️
        </h1>

        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-600">
              Title
            </label>
            <input
              type="text"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-600">
              Content
            </label>
            <textarea
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              rows={8}
              className="w-full resize-y rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:-translate-y-0.5 hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving... 🌷" : "Save changes 💕"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
