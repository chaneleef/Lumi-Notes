import api from "./axios";
import { useAuth } from "../context/AuthContext";

// ===== Logged-in users: notes live on the server, private to their account =====
const serverStore = {
  getAll: async () => (await api.get("/notes")).data,
  getById: async (id) => (await api.get(`/notes/${id}`)).data,
  create: async (data) => (await api.post("/notes", data)).data,
  update: async (id, data) => (await api.put(`/notes/${id}`, data)).data,
  remove: async (id) => {
    await api.delete(`/notes/${id}`);
  },
};

// ===== Guests: notes live ONLY in this browser (localStorage), never saved to an account =====
const GUEST_NOTES_KEY = "lumi-guest-notes";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(GUEST_NOTES_KEY)) || [];
  } catch {
    return [];
  }
};
const save = (notes) => localStorage.setItem(GUEST_NOTES_KEY, JSON.stringify(notes));

const guestStore = {
  getAll: async () =>
    load().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  getById: async (id) => load().find((n) => n._id === id) || null,
  create: async ({ title, content }) => {
    const now = new Date().toISOString();
    const note = { _id: crypto.randomUUID(), title, content, createdAt: now, updatedAt: now };
    save([note, ...load()]);
    return note;
  },
  update: async (id, { title, content }) => {
    const notes = load();
    const i = notes.findIndex((n) => n._id === id);
    if (i === -1) return null;
    notes[i] = { ...notes[i], title, content, updatedAt: new Date().toISOString() };
    save(notes);
    return notes[i];
  },
  remove: async (id) => save(load().filter((n) => n._id !== id)),
};

// Pick the right store based on how the person is using the app.
export const useNotesStore = () => {
  const { mode } = useAuth();
  return mode === "guest" ? guestStore : serverStore;
};
