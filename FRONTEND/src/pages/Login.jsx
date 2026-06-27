import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/lib/axios"

// ─────────────────────────────────────────────────────────────
//  ICÔNES SVG INLINE
// ─────────────────────────────────────────────────────────────
const IcoMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const IcoLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const IcoEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const IcoEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const IcoGlobe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const IcoChevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)
const IcoArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IcoShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IcoGrad = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)
const IcoChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <path d="M6 14l3-3 3 3 4-4"/>
  </svg>
)
const IcoCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// ─────────────────────────────────────────────────────────────
//  VALIDATION
// ─────────────────────────────────────────────────────────────
const validate = (email, password) => {
  const e = {}
  if (!email) e.email = "L'adresse e-mail est requise"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Adresse e-mail invalide"
  if (!password) e.password = "Le mot de passe est requis"
  else if (password.length < 6) e.password = "Minimum 6 caractères"
  return e
}

// ─────────────────────────────────────────────────────────────
//  COMPOSANT
// ─────────────────────────────────────────────────────────────
export default function Login() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [email,      setEmail]      = useState("")
  const [password,   setPassword]   = useState("")
  const [showPass,   setShowPass]   = useState(false)
  const [remember,   setRemember]   = useState(false)
  const [errors,     setErrors]     = useState({})
  const [apiError,   setApiError]   = useState("")
  const [loading,    setLoading]    = useState(false)
  const [langOpen,   setLangOpen]   = useState(false)
  const [lang,       setLang]       = useState("Français")

  const LANGS = ["Français","English","Deutsch","Español"]

  const onChange = (field, val) => {
    if (field === "email") setEmail(val)
    else setPassword(val)
    if (errors[field]) setErrors(p => ({ ...p, [field]:"" }))
    if (apiError) setApiError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(email, password)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true); setApiError("")
    try {
      const { data } = await axiosInstance.post("/auth/login", { email, password })
      login(data.user, data.token)
      navigate("/dashboard")
    } catch (err) {
      setApiError(err.response?.data?.message || "Identifiants incorrects.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col"
      style={{ background:"#F0F2F8", fontFamily:"'Inter','Poppins',sans-serif" }}>

      {/* ── SÉLECTEUR LANGUE ───────────────────────────────── */}
      <div className="absolute top-5 right-6 z-50">
        <div className="relative">
          <button onClick={() => setLangOpen(o => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-sm font-semibold text-gray-700"
            style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.08)", border:"1px solid #E8EBF0" }}>
            <IcoGlobe />
            <span>{lang}</span>
            <motion.span animate={{ rotate: langOpen ? 180 : 0 }} transition={{ duration:0.2 }}>
              <IcoChevron />
            </motion.span>
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div initial={{ opacity:0, y:6, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:6, scale:0.97 }} transition={{ duration:0.15 }}
                className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl overflow-hidden z-50"
                style={{ boxShadow:"0 8px 24px rgba(0,0,0,0.12)" }}>
                {LANGS.map(l => (
                  <button key={l} onClick={() => { setLang(l); setLangOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: l===lang ? "#22B14C" : "#374151", fontWeight: l===lang ? 700 : 500 }}>
                    {l}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── LAYOUT PRINCIPAL ───────────────────────────────── */}
      <div className="flex-1 flex items-stretch min-h-screen relative overflow-hidden">

        {/* ════════════════════════════════════════════════════
            PANNEAU GAUCHE — bleu marine foncé
        ════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col justify-between relative overflow-hidden"
          style={{
            width:"42%",
            background:"linear-gradient(155deg, #072B5A 0%, #0A376E 45%, #0E457F 100%)",
            minHeight:"100vh"
          }}>

          {/* Image bâtiment en fond (très sombre, texture) */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ opacity:0.08 }}>
            <img src="/src/assets/images/batiment-duden.jpg" alt=""
              className="w-full h-full object-cover"
              onError={e => e.target.style.display="none"} />
          </div>

          {/* Grille de points verts — haut gauche */}
          <div className="absolute top-6 left-6 pointer-events-none"
            style={{
              width:90, height:90,
              backgroundImage:"radial-gradient(circle, #22B14C 1.5px, transparent 1.5px)",
              backgroundSize:"14px 14px",
              opacity:0.7
            }}/>

          {/* CONTENU TEXTE */}
          <div className="relative z-10 px-12 pt-14 flex-1">
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
              {/* Titre */}
              <p className="font-extrabold tracking-wide mb-1"
                style={{ color:"#22B14C", fontSize:28, lineHeight:1.1, letterSpacing:1 }}>
                BIENVENUE À
              </p>
              <h1 className="font-black text-white leading-none mb-5"
                style={{ fontSize:48, lineHeight:1.05, letterSpacing:"-0.5px" }}>
                L'INSTITUT DE<br/>LANGUES DUDEN
              </h1>

              {/* Ligne verte */}
              <div style={{ width:72, height:5, borderRadius:99, background:"#22B14C", marginBottom:28 }}/>

              {/* Paragraphe */}
              <p style={{ color:"#C8D8F0", fontSize:15.5, lineHeight:1.75, maxWidth:380, marginBottom:48 }}>
                La plateforme numérique pour gérer efficacement les formations, les étudiants,
                les plannings et toutes les activités de notre institut.
              </p>
            </motion.div>

            {/* Features */}
            <div style={{ display:"flex", flexDirection:"column", gap:36 }}>
              {[
                {
                  icon:<IcoGrad/>,
                  bg:"#22B14C",
                  border:false,
                  title:"Gestion complète",
                  desc:"Formations, étudiants, cours et planning tout en un seul endroit."
                },
                {
                  icon:<IcoShield/>,
                  bg:"rgba(255,255,255,0.07)",
                  border:true,
                  title:"Sécurisé & Fiable",
                  desc:"Vos données sont protégées avec les plus hauts standards de sécurité."
                },
                {
                  icon:<IcoChart/>,
                  bg:"#22B14C",
                  border:false,
                  title:"Performant",
                  desc:"Une plateforme rapide et moderne conçue pour votre productivité."
                }
              ].map((f,i) => (
                <motion.div key={f.title} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.3+i*0.15, duration:0.5 }}
                  style={{ display:"flex", alignItems:"flex-start", gap:20 }}>
                  {/* Cercle icône */}
                  <div style={{
                    width:56, height:56, borderRadius:"50%", flexShrink:0,
                    background:f.bg,
                    border: f.border ? "1.5px solid rgba(255,255,255,0.25)" : "none",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"white",
                    boxShadow:"0 4px 16px rgba(0,0,0,0.25)"
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <p style={{ color:"white", fontWeight:700, fontSize:16, marginBottom:4 }}>{f.title}</p>
                    <p style={{ color:"#A8C0DC", fontSize:13.5, lineHeight:1.6 }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── VAGUE VERTE BAS + COURBE BLANCHE DE SÉPARATION ── */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height:"38%" }}>
            <svg viewBox="0 0 600 300" preserveAspectRatio="none"
              style={{ width:"100%", height:"100%", display:"block" }}>
              {/* Vague verte foncée derrière */}
              <path d="M0,300 L0,160 Q80,80 180,130 Q280,180 360,100 Q440,20 600,80 L600,300 Z"
                fill="#1A8F3C" opacity="0.6"/>
              {/* Vague verte principale */}
              <path d="M0,300 L0,200 Q100,120 220,160 Q340,200 420,130 Q500,60 600,100 L600,300 Z"
                fill="#22B14C"/>
              {/* Vague verte claire devant */}
              <path d="M0,300 L0,240 Q120,180 240,210 Q360,240 460,180 Q530,140 600,160 L600,300 Z"
                fill="#35C45E" opacity="0.5"/>
            </svg>
          </div>

          {/* Courbe blanche organique de séparation droite */}
          <div className="absolute top-0 right-0 bottom-0 pointer-events-none"
            style={{ width:80 }}>
            <svg viewBox="0 0 80 900" preserveAspectRatio="none"
              style={{ width:"100%", height:"100%", display:"block" }}>
              <path d="M80,0 Q20,150 50,300 Q80,450 30,600 Q0,750 60,900 L80,900 L80,0 Z"
                fill="#F0F2F8"/>
            </svg>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            PANNEAU DROIT — fond gris très clair
        ════════════════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center relative px-6 py-10"
          style={{ background:"#F0F2F8" }}>

          {/* Feuilles décoratives fond droite bas */}
          <div className="absolute bottom-10 right-10 pointer-events-none" style={{ opacity:0.07 }}>
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
              <ellipse cx="110" cy="110" rx="100" ry="45" fill="#0D2B6B" transform="rotate(-25 110 110)"/>
              <ellipse cx="110" cy="110" rx="100" ry="45" fill="#0D2B6B" transform="rotate(25 110 110)"/>
              <ellipse cx="110" cy="110" rx="100" ry="45" fill="#0D2B6B" transform="rotate(75 110 110)"/>
            </svg>
          </div>

          {/* Points décoratifs gris discrets */}
          <div className="absolute bottom-24 right-32 pointer-events-none"
            style={{
              width:70, height:70,
              backgroundImage:"radial-gradient(circle, #B0B8CC 1px, transparent 1px)",
              backgroundSize:"12px 12px",
              opacity:0.4
            }}/>

          {/* ── CARD BLANCHE FORMULAIRE ── */}
          <motion.div
            initial={{ opacity:0, y:32, scale:0.97 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ duration:0.6, ease:"easeOut" }}
            style={{
              background:"white",
              borderRadius:30,
              width:"100%",
              maxWidth:580,
              padding:"52px 56px 40px",
              boxShadow:"0 20px 80px rgba(10,40,100,0.10), 0 4px 20px rgba(0,0,0,0.05)",
              position:"relative",
              zIndex:10
            }}>

            {/* Logo */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
              <div style={{ width:160, height:160, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <img
                  src="/src/assets/images/logo-duden.png"
                  alt="Institut de Langues DUDEN"
                  style={{ width:"100%", height:"100%", objectFit:"contain" }}
                  onError={(e) => {
                    e.target.style.display = "none"
                    const parent = e.target.parentElement
                    parent.style.background = "#072B5A"
                    parent.style.borderRadius = "50%"
                    parent.innerHTML = '<span style="color:white;font-size:48px;font-weight:900;display:flex;align-items:center;justify-content:center;width:100%;height:100%">D</span>'
                  }}
                />
              </div>
            </div>

            {/* Titre Connexion */}
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <h2 style={{ color:"#072B5A", fontSize:32, fontWeight:800, margin:0, lineHeight:1.2 }}>
                Connexion
              </h2>
              <p style={{ color:"#8B95A8", fontSize:14, marginTop:8, lineHeight:1.5 }}>
                Veuillez saisir vos identifiants pour accéder à votre compte
              </p>
            </div>

            {/* Erreur API */}
            <AnimatePresence>
              {apiError && (
                <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  style={{
                    background:"#FEE2E2", color:"#DC2626", border:"1px solid #FECACA",
                    borderRadius:12, padding:"12px 16px", fontSize:13, fontWeight:500, marginBottom:16
                  }}>
                  {apiError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORMULAIRE */}
            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", color:"#1E2B3C", fontWeight:700, fontSize:14, marginBottom:8 }}>
                  Adresse e-mail
                </label>
                <div style={{
                  display:"flex", alignItems:"center", gap:12,
                  border: errors.email ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                  borderRadius:14, padding:"0 16px", height:56,
                  background: errors.email ? "#FEF2F2" : "white",
                  transition:"border-color 0.2s",
                }}>
                  <span style={{ color:"#9CA3AF", flexShrink:0 }}><IcoMail/></span>
                  <input
                    type="email" value={email}
                    onChange={e => onChange("email", e.target.value)}
                    placeholder="exemple@duden.com"
                    autoComplete="email"
                    style={{
                      flex:1, border:"none", outline:"none", fontSize:14,
                      color:"#27334D", background:"transparent",
                      fontFamily:"inherit"
                    }}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      style={{ color:"#EF4444", fontSize:12, marginTop:6, marginLeft:4 }}>
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Mot de passe */}
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <label style={{ color:"#1E2B3C", fontWeight:700, fontSize:14 }}>Mot de passe</label>
                  <button type="button"
                    style={{ color:"#22B14C", fontSize:13, fontWeight:600, background:"none", border:"none", cursor:"pointer" }}>
                    Mot de passe oublié ?
                  </button>
                </div>
                <div style={{
                  display:"flex", alignItems:"center", gap:12,
                  border: errors.password ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                  borderRadius:14, padding:"0 16px", height:56,
                  background: errors.password ? "#FEF2F2" : "white",
                  transition:"border-color 0.2s"
                }}>
                  <span style={{ color:"#9CA3AF", flexShrink:0 }}><IcoLock/></span>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => onChange("password", e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    style={{
                      flex:1, border:"none", outline:"none", fontSize:15,
                      color:"#27334D", background:"transparent",
                      fontFamily:"inherit", letterSpacing: showPass ? "normal" : "3px"
                    }}
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    style={{ color:"#9CA3AF", background:"none", border:"none", cursor:"pointer", flexShrink:0,
                      display:"flex", alignItems:"center" }}>
                    {showPass ? <IcoEye/> : <IcoEyeOff/>}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      style={{ color:"#EF4444", fontSize:12, marginTop:6, marginLeft:4 }}>
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Se souvenir de moi */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
                <button type="button" onClick={() => setRemember(r => !r)}
                  style={{
                    width:20, height:20, borderRadius:5, flexShrink:0, cursor:"pointer",
                    border: remember ? "none" : "1.8px solid #D1D5DB",
                    background: remember ? "#22B14C" : "white",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    transition:"all 0.2s"
                  }}>
                  {remember && <IcoCheck/>}
                </button>
                <span onClick={() => setRemember(r => !r)}
                  style={{ fontSize:14, color:"#4B5563", cursor:"pointer", userSelect:"none" }}>
                  Se souvenir de moi
                </span>
              </div>

              {/* Bouton Se connecter */}
              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}
                style={{
                  width:"100%", height:60, borderRadius:16, border:"none",
                  background: loading
                    ? "#1A9940"
                    : "linear-gradient(135deg, #1E9E3E 0%, #22B14C 60%, #28C957 100%)",
                  color:"white", fontWeight:700, fontSize:18,
                  cursor: loading ? "not-allowed" : "pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:12,
                  boxShadow:"0 6px 24px rgba(34,177,76,0.45)",
                  transition:"box-shadow 0.2s",
                  fontFamily:"inherit", marginBottom:16
                }}>
                {loading ? (
                  <>
                    <motion.span
                      style={{ width:20, height:20, border:"2.5px solid white", borderTopColor:"transparent",
                        borderRadius:"50%", display:"inline-block" }}
                      animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:0.8, ease:"linear" }}
                    />
                    Connexion en cours…
                  </>
                ) : (
                  <>
                    <IcoArrow/>
                    Se connecter
                  </>
                )}
              </motion.button>

              {/* Séparateur ou */}
              <div style={{ display:"flex", alignItems:"center", gap:14, margin:"4px 0 16px" }}>
                <div style={{ flex:1, height:1, background:"#E9ECF0" }}/>
                <span style={{ color:"#9CA3AF", fontSize:13, fontWeight:500 }}>ou</span>
                <div style={{ flex:1, height:1, background:"#E9ECF0" }}/>
              </div>

              {/* Bouton SSO */}
              <motion.button type="button"
                whileHover={{ borderColor:"#072B5A", color:"#072B5A", background:"#F8FAFF" }}
                whileTap={{ scale:0.98 }}
                style={{
                  width:"100%", height:56, borderRadius:14,
                  border:"1.5px solid #E5E7EB", background:"white",
                  color:"#374151", fontWeight:600, fontSize:15,
                  cursor:"pointer", display:"flex", alignItems:"center",
                  justifyContent:"center", gap:10, fontFamily:"inherit",
                  transition:"all 0.2s", marginBottom:20
                }}>
                <IcoShield/>
                Connexion SSO (Interne)
              </motion.button>

              {/* Lien administrateur */}
              <p style={{ textAlign:"center", color:"#6B7280", fontSize:13.5, margin:0 }}>
                Vous n'avez pas de compte ? Contactez{" "}
                <button type="button"
                  style={{ color:"#22B14C", fontWeight:700, background:"none", border:"none",
                    cursor:"pointer", fontSize:"inherit", textDecoration:"underline", textDecorationColor:"#22B14C" }}>
                  l'administrateur.
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:20,
        textAlign:"center", padding:"12px",
        background:"transparent", pointerEvents:"none"
      }}>
        <p style={{ color:"#8B95A8", fontSize:12.5, margin:0 }}>
          © 2026 Institut de Langues DUDEN. Tous droits réservés.
        </p>
      </div>

      {/* Ferme dropdown langue */}
      {langOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:40 }}
          onClick={() => setLangOpen(false)}/>
      )}
    </div>
  )
}
