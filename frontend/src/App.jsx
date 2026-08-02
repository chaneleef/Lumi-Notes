import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-pink-50 to-pink-100 text-slate-700">
      {/* soft pink decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-1/3 size-72 rounded-full bg-pink-200/40 blur-3xl" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/note/:id" element={<NoteDetailPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
