import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

// Pages (on les créera après)
// import Login from "../pages/Login"
// import Dashboard from "../pages/Dashboard"
// import Formations from "../pages/Formations"
// import Etudiants from "../pages/Etudiants"

// Placeholder temporaire
const Login      = () => <div className="p-8 text-2xl font-bold text-blue-600">Page Login 🔐</div>
const Dashboard  = () => <div className="p-8 text-2xl font-bold text-green-600">Dashboard 📊</div>
const Formations = () => <div className="p-8 text-2xl font-bold text-purple-600">Formations 🎓</div>
const Etudiants  = () => <div className="p-8 text-2xl font-bold text-orange-600">Etudiants 👨‍🎓</div>
const NotFound   = () => <div className="p-8 text-2xl font-bold text-red-600">404 - Page introuvable ❌</div>

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/"            element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/formations"  element={<Formations />} />
          <Route path="/etudiants"   element={<Etudiants />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes