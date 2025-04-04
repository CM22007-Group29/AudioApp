import { Route, Routes } from "react-router";
import Features from "./components/Features";
import Home from "./components/Home";
import Login from "./components/Login";
import GetStarted from "./components/audio_remove/GetStarted";
import Nav from "./components/nav/Nav";
import { useAuth } from "./context/AuthContext";
import AudioEditor from "./components/audio_remove/AudioEditor";
import EditPage from "./components/audio_remove/EditPage";
import { AudioContextProvider } from "./components/AudioProvider";

function App() {
  const { user } = useAuth();

  return (
    <AudioContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="login" element={<Login />} />
        <Route path="get-started" element={user ? <GetStarted /> : <Login />} />
        <Route path="editor" element={<AudioEditor />} />
        <Route path="edit" element={<EditPage />} />
      </Routes>
    </AudioContextProvider>
  );
}

export default App;