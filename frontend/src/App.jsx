import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import LoadingBear from "./components/LoadingBear";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuth } from "./context/AuthContext";

// App routes need the user to be logged in OR browsing as a guest.
const RequireAccess = ({ children }) => {
  const { mode } = useAuth();
  return mode === "authed" || mode === "guest" ? children : <Navigate to="/login" replace />;
};

// Auth pages should bounce to home if you're already in.
const AuthOnly = ({ children }) => {
  const { mode } = useAuth();
  return mode === "anon" ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { mode } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-pink-50 to-pink-100 text-slate-700">
      {/* soft pink decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-1/3 size-72 rounded-full bg-pink-200/40 blur-3xl" />

      <div className="relative z-10">
        <Navbar />
        <main>
          {mode === "loading" ? (
            <LoadingBear label="warming up Lumi Notes..." />
          ) : (
            <Routes>
              <Route path="/login" element={<AuthOnly><LoginPage /></AuthOnly>} />
              <Route path="/signup" element={<AuthOnly><SignupPage /></AuthOnly>} />
              <Route path="/" element={<RequireAccess><HomePage /></RequireAccess>} />
              <Route path="/create" element={<RequireAccess><CreatePage /></RequireAccess>} />
              <Route path="/note/:id" element={<RequireAccess><NoteDetailPage /></RequireAccess>} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
