import Nav from "./components/nav/Nav" 
import Home from "./components/Home"
import { Route, Routes } from 'react-router'
import Features from "./components/Features"
import GetStarted from "./components/audio_remove/GetStarted"
import EditPage from "./components/audio_remove/EditPage"



function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route path="edit" element={<EditPage />} />
      </Routes>
    </>
  )
}

export default App
