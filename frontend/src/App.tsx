import Nav from "./components/nav/Nav" 
import Home from "./components/Home"
import { Route, Routes } from 'react-router'
import Features from "./components/Features"
import GetStarted from "./components/audio_remove/GetStarted"
import AudioEditor from "./components/audio_remove/AudioEditor"

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route path="editor" element={<AudioEditor />} />
      </Routes>
    </>
  )
}

export default App
