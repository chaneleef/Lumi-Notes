import { Link } from "react-router";
import { Heart, Trash2 } from "lucide-react";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const NoteCard = ({ note, onDelete }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="group flex flex-col rounded-3xl border border-pink-200/80 bg-white p-5 shadow-sm shadow-pink-100 transition duration-200 hover:-translate-y-1 hover:rotate-[-1deg] hover:border-pink-300 hover:shadow-lg hover:shadow-pink-200/60"
    >
      <h3 className="font-display line-clamp-1 text-lg font-bold text-slate-800">
        {note.title}
      </h3>
      <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-500">
        {note.content}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-pink-100 pt-3">
        <span className="flex items-center gap-1 text-xs font-medium text-pink-400">
          <Heart className="size-3.5 fill-current" />
          {formatDate(note.createdAt)}
        </span>
        <button
          type="button"
          aria-label="Delete note"
          onClick={(e) => {
            // don't let the wrapping Link navigate
            e.preventDefault();
            onDelete(note._id);
          }}
          className="rounded-full p-1.5 text-slate-300 transition hover:bg-pink-50 hover:text-pink-500"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </Link>
  );
};

export default NoteCard;
