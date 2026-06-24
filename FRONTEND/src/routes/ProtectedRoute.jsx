import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  const token = localStorage.getItem("token")

  // Si pas de token → redirige vers login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Sinon → affiche la page demandée
  return <Outlet />
}

export default ProtectedRoute