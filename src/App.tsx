import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Terminal } from './components/ui/Terminal'
import { Home } from './pages/Home'
import { ProjectsPage } from './pages/ProjectsPage'

function App() {
  return (
    <Router>
      <main className="w-full min-h-screen bg-theme-bg font-sans selection:bg-theme-purple/30 selection:text-white text-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Terminal />
      </main>
    </Router>
  )
}

export default App
