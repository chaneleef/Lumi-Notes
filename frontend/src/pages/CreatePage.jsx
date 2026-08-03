import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import { useNotesStore } from "../lib/notesStore";

const CreatePage = () => {
  const store = useNotesStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }

    setSaving(true);
    try {
      await store.create({ title, content });
      toast.success("Note created");
      navigate("/");
    } catch (error) {
      console.error("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests — please slow down.");
      } else if (error.response?.status !== 401) {
        toast.error("Failed to create note.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-pink-500"
      >
        <ArrowLeft className="size-4" />
        Back to notes
      </Link>

      <div className="mt-6 rounded-[2rem] border border-white/70 bg-white/70 p-7 shadow-sm shadow-pink-100 backdrop-blur">
        <h1 className="font-display text-2xl font-extrabold text-slate-800">
          new note
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          write down whatever&apos;s on your mind
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-600">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="give it a title"
              className="w-full rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-600">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="start writing..."
              rows={8}
              className="w-full resize-y rounded-2xl border border-pink-100 bg-white/80 px-4 py-2.5 text-slate-700 placeholder:text-slate-300 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-300/50 transition hover:-translate-y-0.5 hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Create note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
