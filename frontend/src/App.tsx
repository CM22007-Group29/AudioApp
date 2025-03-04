import Nav from "./components/nav/Nav" 
import Home from "./components/Home"
import { Route, Routes } from 'react-router-dom'
import Features from "./components/Features"
import GetStarted from "./components/audio_remove/GetStarted"

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </>
  )
}

export default App
