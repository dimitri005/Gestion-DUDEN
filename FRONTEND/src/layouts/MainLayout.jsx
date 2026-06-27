import { useState, useEffect } from "react"
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import {
  LayoutDashboard, GraduationCap, Users, Calendar, BookOpen,
  ClipboardList, FileText, Settings, Bell, Search, Menu, X,
  ChevronDown, LogOut, User, ChevronRight, Building2,
  BarChart2, MessageSquare, Shield, Home
} from "lucide-react"

// ── Couleurs DUDEN ────────────────────────────────────────────
const C = {
  navy:      "#0D2B6B",
  navyDark:  "#091F52",
  navyLight: "#1A3F8F",
  green:     "#1E8A3C",
  greenLight:"#25A84A",
}

// ── Navigation par rôle ───────────────────────────────────────
const NAV_BY_ROLE = {
  ADMIN_SYSTEM: [
    { label: "Tableau de bord",  icon: LayoutDashboard, path: "/dashboard" },
    { label: "Centres",          icon: Building2,        path: "/centres" },
    { label: "Formations",       icon: GraduationCap,    path: "/formations" },
    { label: "Utilisateurs",     icon: Users,            path: "/utilisateurs" },
    { label: "Étudiants",        icon: User,             path: "/etudiants" },
    { label: "Planning",         icon: Calendar,         path: "/planning" },
    { label: "Inscriptions",     icon: ClipboardList,    path: "/inscriptions" },
    { label: "Cahier de texte",  icon: BookOpen,         path: "/cahier" },
    { label: "Statistiques",     icon: BarChart2,        path: "/statistiques" },
    { label: "Messagerie",       icon: MessageSquare,    path: "/messagerie" },
    { label: "Audit & Logs",     icon: Shield,           path: "/audit" },
    { label: "Configuration",    icon: Settings,         path: "/configuration" },
  ],
  ADMIN_CENTRE: [
    { label: "Tableau de bord",  icon: LayoutDashboard, path: "/dashboard" },
    { label: "Formations",       icon: GraduationCap,    path: "/formations" },
    { label: "Utilisateurs",     icon: Users,            path: "/utilisateurs" },
    { label: "Étudiants",        icon: User,             path: "/etudiants" },
    { label: "Planning",         icon: Calendar,         path: "/planning" },
    { label: "Inscriptions",     icon: ClipboardList,    path: "/inscriptions" },
    { label: "Cahier de texte",  icon: BookOpen,         path: "/cahier" },
    { label: "Statistiques",     icon: BarChart2,        path: "/statistiques" },
    { label: "Messagerie",       icon: MessageSquare,    path: "/messagerie" },
  ],
  SECRETAIRE: [
    { label: "Tableau de bord",  icon: LayoutDashboard, path: "/dashboard" },
    { label: "Étudiants",        icon: User,             path: "/etudiants" },
    { label: "Inscriptions",     icon: ClipboardList,    path: "/inscriptions" },
    { label: "Paiements",        icon: FileText,         path: "/paiements" },
    { label: "Planning",         icon: Calendar,         path: "/planning" },
    { label: "Documents",        icon: FileText,         path: "/documents" },
    { label: "Messagerie",       icon: MessageSquare,    path: "/messagerie" },
  ],
  FORMATEUR: [
    { label: "Tableau de bord",  icon: LayoutDashboard, path: "/dashboard" },
    { label: "Mon planning",     icon: Calendar,         path: "/planning" },
    { label: "Mes cours",        icon: BookOpen,         path: "/cours" },
    { label: "Cahier de texte",  icon: ClipboardList,    path: "/cahier" },
    { label: "Mes étudiants",    icon: Users,            path: "/etudiants" },
    { label: "Disponibilités",   icon: Calendar,         path: "/disponibilites" },
    { label: "Messagerie",       icon: MessageSquare,    path: "/messagerie" },
  ],
  ETUDIANT: [
    { label: "Tableau de bord",  icon: LayoutDashboard, path: "/dashboard" },
    { label: "Mes cours",        icon: BookOpen,         path: "/cours" },
    { label: "Mon planning",     icon: Calendar,         path: "/planning" },
    { label: "Mes notes",        icon: BarChart2,        path: "/notes" },
    { label: "Mes documents",    icon: FileText,         path: "/documents" },
    { label: "Messagerie",       icon: MessageSquare,    path: "/messagerie" },
  ],
}

const ROLE_LABELS = {
  ADMIN_SYSTEM: "Admin Système",
  ADMIN_CENTRE: "Admin Centre",
  SECRETAIRE:   "Secrétaire",
  FORMATEUR:    "Formateur",
  ETUDIANT:     "Étudiant",
}

// ── Sidebar Item ──────────────────────────────────────────────
function SidebarItem({ item, collapsed, onClick }) {
  return (
    <NavLink to={item.path} onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
         ${isActive
           ? "text-white font-semibold"
           : "text-blue-200 hover:text-white hover:bg-white/10"
         }`
      }
      style={({ isActive }) => isActive ? {
        background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
        boxShadow: `0 4px 15px rgba(30,138,60,0.4)`
      } : {}}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div layoutId="activeNav"
              className="absolute inset-0 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <item.icon size={18} className="relative z-10 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}
                className="relative z-10 text-sm whitespace-nowrap overflow-hidden">
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          {/* Tooltip si collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-medium text-white
              opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50"
              style={{ background: C.navyDark, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
              {item.label}
            </div>
          )}
        </>
      )}
    </NavLink>
  )
}

// ── Composant principal ───────────────────────────────────────
export default function MainLayout() {
  const { user, logout }      = useAuth()
  const navigate              = useNavigate()
  const location              = useLocation()
  const [collapsed, setCollapsed]     = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [notifOpen, setNotifOpen]     = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchVal, setSearchVal]     = useState("")

  const role    = user?.role || "ETUDIANT"
  const navItems = NAV_BY_ROLE[role] || NAV_BY_ROLE.ETUDIANT

  // Ferme dropdowns au changement de route
  useEffect(() => {
    setMobileOpen(false)
    setNotifOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Notifications mock
  const NOTIFS = [
    { id:1, title:"Nouvelle inscription", desc:"Marie Nguema s'est inscrite en Allemand A1", time:"Il y a 5 min", unread:true },
    { id:2, title:"Paiement reçu",        desc:"Paiement de 25 000 FCFA confirmé",           time:"Il y a 1h",   unread:true },
    { id:3, title:"Planning mis à jour",  desc:"Séance de mardi annulée par M. Dupont",       time:"Il y a 3h",   unread:false },
  ]
  const unreadCount = NOTIFS.filter(n => n.unread).length

  // Titre de page courant
  const currentNav = navItems.find(n => n.path === location.pathname)
  const pageTitle  = currentNav?.label || "Tableau de bord"

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ── SIDEBAR DESKTOP ──────────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col h-full shrink-0 relative z-30"
        style={{ background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navyDark} 100%)` }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-lg">
            <img src="/src/assets/images/logo-duden.png" alt="DUDEN"
              className="w-full h-full object-contain p-0.5"
              onError={(e) => {
                e.target.style.display = "none"
                e.target.parentElement.style.background = C.green
                e.target.parentElement.innerHTML = '<span style="color:white;font-weight:900;font-size:16px">D</span>'
              }} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:-10 }} transition={{ duration:0.2 }}
                className="overflow-hidden">
                <p className="text-white font-black text-sm leading-none">DUDEN</p>
                <p className="text-xs leading-none mt-0.5" style={{ color: C.green }}>Institut de Langues</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profil utilisateur */}
        <div className="px-3 py-4 border-b border-white/10">
          <div className={`flex items-center gap-3 p-2 rounded-xl ${collapsed ? "justify-center" : ""}`}
            style={{ background:"rgba(255,255,255,0.07)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
              style={{ background:`linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}>
              {user?.prenom?.[0] || user?.nom?.[0] || "U"}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="overflow-hidden min-w-0">
                  <p className="text-white text-xs font-bold truncate">{user?.prenom} {user?.nom}</p>
                  <p className="text-xs truncate" style={{ color:C.green }}>{ROLE_LABELS[role]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide">
          {!collapsed && (
            <p className="text-xs font-bold tracking-widest uppercase mb-3 px-2"
              style={{ color:"rgba(255,255,255,0.3)" }}>Navigation</p>
          )}
          {navItems.map(item => (
            <SidebarItem key={item.path} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Bas sidebar */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <SidebarItem item={{ label:"Accueil", icon:Home, path:"/" }} collapsed={collapsed} />
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-red-500/20 transition-all duration-200 group">
            <LogOut size={18} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  className="text-sm">Déconnexion</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Toggle collapse */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-2"
          style={{ background:C.navy, borderColor:"rgba(255,255,255,0.2)" }}
        >
          <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration:0.3 }}>
            <ChevronRight size={12} />
          </motion.div>
        </button>
      </motion.aside>

      {/* ── SIDEBAR MOBILE ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x:-280 }} animate={{ x:0 }} exit={{ x:-280 }}
              transition={{ type:"spring", stiffness:300, damping:30 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden flex flex-col"
              style={{ background:`linear-gradient(180deg, ${C.navy} 0%, ${C.navyDark} 100%)` }}
            >
              {/* Header mobile */}
              <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                    <img src="/src/assets/images/logo-duden.png" alt="DUDEN"
                      className="w-full h-full object-contain p-0.5"
                      onError={(e) => {
                        e.target.style.display="none"
                        e.target.parentElement.style.background=C.green
                        e.target.parentElement.innerHTML='<span style="color:white;font-weight:900">D</span>'
                      }} />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">DUDEN</p>
                    <p className="text-xs" style={{ color:C.green }}>Institut de Langues</p>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Profil mobile */}
              <div className="px-3 py-4 border-b border-white/10">
                <div className="flex items-center gap-3 p-2 rounded-xl" style={{ background:"rgba(255,255,255,0.07)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                    style={{ background:`linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}>
                    {user?.prenom?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">{user?.prenom} {user?.nom}</p>
                    <p className="text-xs" style={{ color:C.green }}>{ROLE_LABELS[role]}</p>
                  </div>
                </div>
              </div>

              {/* Nav mobile */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navItems.map(item => (
                  <SidebarItem key={item.path} item={item} collapsed={false} onClick={() => setMobileOpen(false)} />
                ))}
              </nav>

              <div className="px-3 py-4 border-t border-white/10 space-y-1">
                <SidebarItem item={{ label:"Accueil", icon:Home, path:"/" }} collapsed={false} onClick={() => setMobileOpen(false)} />
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-red-500/20 transition-all">
                  <LogOut size={18} /><span className="text-sm">Déconnexion</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── NAVBAR TOP ───────────────────────────────────────── */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-4 shrink-0 z-20 shadow-sm">

          {/* Burger mobile */}
          <button onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            style={{ color:C.navy }}>
            <Menu size={20} />
          </button>

          {/* Titre page */}
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-base sm:text-lg font-black truncate" style={{ color:C.navy }}>
              {pageTitle}
            </h1>
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
              <ChevronRight size={14} />
              <span>{ROLE_LABELS[role]}</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Recherche */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 w-56 focus-within:border-blue-300 focus-within:bg-white transition-all">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
              placeholder="Rechercher..."
              className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              style={{ color:C.navy }}>
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background:C.green, fontSize:9 }}>{unreadCount}</span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div initial={{ opacity:0, y:8, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, y:8, scale:0.97 }} transition={{ duration:0.2 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <p className="font-bold text-sm" style={{ color:C.navy }}>Notifications</p>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ background:C.green }}>{unreadCount} nouvelles</span>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                    {NOTIFS.map(n => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${n.unread ? "bg-blue-50/50" : ""}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? "bg-green-500" : "bg-gray-300"}`} />
                          <div>
                            <p className="text-xs font-bold" style={{ color:C.navy }}>{n.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.desc}</p>
                            <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <button className="w-full text-xs font-semibold text-center" style={{ color:C.green }}>
                      Voir toutes les notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profil dropdown */}
          <div className="relative">
            <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.navyLight})` }}>
                {user?.prenom?.[0] || "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-none" style={{ color:C.navy }}>{user?.prenom} {user?.nom}</p>
                <p className="text-xs leading-none mt-0.5" style={{ color:C.green }}>{ROLE_LABELS[role]}</p>
              </div>
              <motion.div animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration:0.2 }}>
                <ChevronDown size={14} className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div initial={{ opacity:0, y:8, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, y:8, scale:0.97 }} transition={{ duration:0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {/* Header profil */}
                  <div className="px-4 py-3 border-b border-gray-100"
                    style={{ background:`linear-gradient(135deg, ${C.navy}08, ${C.green}08)` }}>
                    <p className="text-sm font-black" style={{ color:C.navy }}>{user?.prenom} {user?.nom}</p>
                    <p className="text-xs" style={{ color:C.green }}>{ROLE_LABELS[role]}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  {/* Items */}
                  {[
                    { icon:User,     label:"Mon profil",    action:() => navigate("/profil") },
                    { icon:Settings, label:"Paramètres",    action:() => navigate("/parametres") },
                    { icon:Home,     label:"Accueil",       action:() => navigate("/") },
                  ].map(({ icon:Icon, label, action }) => (
                    <button key={label} onClick={action}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                      <Icon size={15} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{label}</span>
                    </button>
                  ))}
                  <div className="border-t border-gray-100">
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left group">
                      <LogOut size={15} className="text-gray-400 group-hover:text-red-500" />
                      <span className="text-sm text-gray-600 group-hover:text-red-500">Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* ── PAGE CONTENT ─────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.3, ease:"easeOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Ferme dropdowns si clic extérieur */}
      {(notifOpen || profileOpen) && (
        <div className="fixed inset-0 z-30" onClick={() => { setNotifOpen(false); setProfileOpen(false) }} />
      )}
    </div>
  )
}
