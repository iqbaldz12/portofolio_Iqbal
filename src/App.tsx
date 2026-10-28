import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Terminal } from './components/ui/Terminal'
import { Home } from './pages/Home'
import { ProjectsPage } from './pages/ProjectsPage'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminLayout } from './pages/admin/AdminLayout'
import { ProtectedRoute } from './pages/admin/ProtectedRoute'
import { Dashboard } from './pages/admin/Dashboard'
import { HeroEditor } from './pages/admin/editors/HeroEditor'
import { AboutEditor } from './pages/admin/editors/AboutEditor'
import { ExperienceEditor } from './pages/admin/editors/ExperienceEditor'
import { ProjectsEditor } from './pages/admin/editors/ProjectsEditor'
import { SkillsEditor } from './pages/admin/editors/SkillsEditor'
import { EducationEditor } from './pages/admin/editors/EducationEditor'
import { ContactEditor } from './pages/admin/editors/ContactEditor'

// Public-facing portfolio layout (navbar + floating terminal widget).
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="w-full min-h-screen bg-theme-bg font-sans selection:bg-theme-purple/30 selection:text-white text-white overflow-x-hidden">
    <Navbar />
    {children}
    <Terminal />
  </main>
)

// basename agar routing cocok dengan base path Vite (mis. "/portofolio_Iqbal").
// BASE_URL punya trailing slash; dibuang agar react-router tidak dobel slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="experience" element={<ExperienceEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="skills" element={<SkillsEditor />} />
          <Route path="education" element={<EducationEditor />} />
          <Route path="contact" element={<ContactEditor />} />
          {/* Sub-route admin yang tidak dikenal -> kembali ke dashboard */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Route lain yang tidak dikenal -> kembali ke beranda */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
