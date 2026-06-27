import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import MainLayout    from "@/layouts/MainLayout"
import LandingPage   from "@/pages/LandingPage"
import Login         from "@/pages/Login"
import Dashboard     from "@/pages/Dashboard"

// Pages placeholder — à remplacer par les vraies pages
const Formations    = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>🎓 Formations — En construction</div>
const Etudiants     = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>👨‍🎓 Étudiants — En construction</div>
const Planning      = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>📅 Planning — En construction</div>
const Inscriptions  = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>📋 Inscriptions — En construction</div>
const Utilisateurs  = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>👥 Utilisateurs — En construction</div>
const Centres       = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>🏢 Centres — En construction</div>
const Cahier        = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>📖 Cahier de texte — En construction</div>
const Statistiques  = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>📊 Statistiques — En construction</div>
const Messagerie    = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>💬 Messagerie — En construction</div>
const Audit         = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>🔒 Audit & Logs — En construction</div>
const Configuration = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>⚙️ Configuration — En construction</div>
const Paiements     = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>💰 Paiements — En construction</div>
const Documents     = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>📄 Documents — En construction</div>
const Cours         = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>📚 Cours — En construction</div>
const Notes         = () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>📝 Notes — En construction</div>
const Disponibilites= () => <div className="p-8 text-2xl font-bold" style={{ color:"#0D2B6B" }}>🕐 Disponibilités — En construction</div>
const NotFound      = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <p className="text-8xl font-black" style={{ color:"#0D2B6B" }}>404</p>
    <p className="text-xl text-gray-500">Page introuvable</p>
    <a href="/" className="px-6 py-3 rounded-xl text-white font-bold" style={{ background:"#1E8A3C" }}>Retour à l'accueil</a>
  </div>
)

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Routes publiques ─────────────────────────────── */}
        <Route path="/"      element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* ── Routes protégées avec MainLayout ─────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard"      element={<Dashboard />} />
            <Route path="/formations"     element={<Formations />} />
            <Route path="/etudiants"      element={<Etudiants />} />
            <Route path="/planning"       element={<Planning />} />
            <Route path="/inscriptions"   element={<Inscriptions />} />
            <Route path="/utilisateurs"   element={<Utilisateurs />} />
            <Route path="/centres"        element={<Centres />} />
            <Route path="/cahier"         element={<Cahier />} />
            <Route path="/statistiques"   element={<Statistiques />} />
            <Route path="/messagerie"     element={<Messagerie />} />
            <Route path="/audit"          element={<Audit />} />
            <Route path="/configuration"  element={<Configuration />} />
            <Route path="/paiements"      element={<Paiements />} />
            <Route path="/documents"      element={<Documents />} />
            <Route path="/cours"          element={<Cours />} />
            <Route path="/notes"          element={<Notes />} />
            <Route path="/disponibilites" element={<Disponibilites />} />
          </Route>
        </Route>

        {/* ── 404 ──────────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
