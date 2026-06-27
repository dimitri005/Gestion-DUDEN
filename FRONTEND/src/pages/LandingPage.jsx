import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  GraduationCap, Globe, Monitor, PenTool, Briefcase, BarChart2,
  Users, Award, Building2, TrendingUp, Star, CheckCircle2,
  MapPin, Phone, Mail, Clock, ChevronRight, ChevronLeft,
  Menu, X, ArrowRight, Sparkles, Shield, Target, BookOpen
} from "lucide-react"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"

const C = {
  navy:      "#0D2B6B",
  green:     "#1E8A3C",
  greenLight:"#25A84A",
  navyLight: "#1A3F8F",
}

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function AnimatedStat({ value, suffix, label, icon: Icon, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(value.replace(/\D/g, ""))
  const count = useCounter(num, 2000, inView)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
        style={{ background: "rgba(30,138,60,0.15)" }}>
        <Icon size={24} style={{ color: C.green }} />
      </div>
      <span className="text-4xl font-black text-white">{count.toLocaleString()}{suffix}</span>
      <span className="text-blue-200 text-sm font-medium text-center">{label}</span>
    </motion.div>
  )
}

function SectionTitle({ eyebrow, title, highlight, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} className="text-center mb-12"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}>
      {eyebrow && <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: C.green }}>{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: C.navy }}>
        {title} {highlight && <span style={{ color: C.green }}>{highlight}</span>}
      </h2>
      {subtitle && <p className="text-gray-500 max-w-xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}

const NAV_LINKS = ["Accueil", "À propos", "Formations", "Nos centres", "Actualités", "Contact"]

const FORMATIONS = [
  { icon: Globe,      title: "Langues Étrangères",     desc: "Allemand, Anglais, Espagnol, Français",                    color: "#4F46E5", bg: "#EEF2FF", image: "/src/assets/images/formation-langues.jpg" },
  { icon: Monitor,    title: "Informatique",            desc: "Bureautique, Programmation, Réseaux, Développement",        color: "#0891B2", bg: "#E0F7FA", image: "/src/assets/images/formation-info.jpg" },
  { icon: PenTool,    title: "Infographie & Design",   desc: "Graphisme, Web Design, Montage Vidéo",                     color: "#7C3AED", bg: "#F5F3FF", image: "/src/assets/images/formation-design.jpg" },
  { icon: Briefcase,  title: "Secrétariat & Gestion",  desc: "Secrétariat, Comptabilité, Gestion des entreprises",       color: "#EA580C", bg: "#FFF7ED", image: "/src/assets/images/formation-secretariat.jpg" },
  { icon: BarChart2,  title: "Commerce & Management",  desc: "Marketing, Communication, Entrepreneuriat",                color: "#CA8A04", bg: "#FEFCE8", image: "/src/assets/images/formation-commerce.jpg" },
]

const STATS = [
  { value: "12000", suffix: "+", label: "Étudiants formés",    icon: Users },
  { value: "150",   suffix: "+", label: "Formateurs experts",  icon: GraduationCap },
  { value: "4",     suffix: "",  label: "Centres modernes",    icon: Building2 },
  { value: "98",    suffix: "%", label: "Taux de réussite",    icon: TrendingUp },
  { value: "15",    suffix: "+", label: "Années d'expérience", icon: Award },
]

const POURQUOI = [
  { icon: Shield,    title: "Qualité & Excellence",      desc: "Des programmes conformes aux standards internationaux." },
  { icon: Users,     title: "Encadrement Personnalisé",  desc: "Un suivi individualisé pour garantir votre réussite." },
  { icon: Building2, title: "Environnement Moderne",     desc: "Des infrastructures et équipements à la pointe de la technologie." },
  { icon: Award,     title: "Certification Reconnue",    desc: "Des diplômes valorisés sur le marché national et international." },
  { icon: Target,    title: "Insertion Professionnelle", desc: "Nous vous préparons pour une carrière réussie." },
]

const CENTRES = [
  { ville: "Yaoundé",   type: "Centre Principal",  image: "/src/assets/images/centre-yaounde.jpg",   phone: "+237 6 12 34 56 78" },
  { ville: "Douala",    type: "Centre Secondaire", image: "/src/assets/images/centre-douala.jpg",    phone: "+237 6 23 45 67 89" },
  { ville: "Bafoussam", type: "Centre Régional",   image: "/src/assets/images/centre-bafoussam.jpg", phone: "+237 6 34 56 78 90" },
  { ville: "Garoua",    type: "Centre Régional",   image: "/src/assets/images/centre-garoua.jpg",    phone: "+237 6 45 67 89 01" },
]

const TEMOIGNAGES = [
  { nom: "Marie Nguema",     formation: "Allemand B2",  note: 5, texte: "DUDEN m'a ouvert les portes de l'Europe. Mes formateurs étaient exceptionnels et la méthode d'enseignement très efficace." },
  { nom: "Jean-Paul Mbarga", formation: "Informatique", note: 5, texte: "J'ai obtenu mon emploi 2 mois après ma formation grâce aux compétences acquises à DUDEN. Je recommande vivement !" },
  { nom: "Aïcha Hamidou",    formation: "Secrétariat",  note: 5, texte: "Une formation complète et professionnelle. Le suivi personnalisé m'a vraiment aidée à progresser rapidement." },
]

// Placeholder image générique
function ImgWithFallback({ src, alt, className, style, fallbackContent }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <div className={className} style={{ ...style, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "white" }}>
        {fallbackContent}
      </div>
    )
  }
  return <img src={src} alt={alt} className={className} style={style} onError={() => setError(true)} />
}

export default function LandingPage() {
  const navigate   = useNavigate()
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [temoIndex, setTemoIndex] = useState(0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // auto-rotate temoignages
  useEffect(() => {
    const t = setInterval(() => setTemoIndex(i => (i + 1) % TEMOIGNAGES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(255,255,255,0.97)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "none",
          backdropFilter: "blur(12px)",
          transition: "box-shadow 0.3s"
        }}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-sm border border-gray-100">
                <img src="/src/assets/images/logo-duden.png" alt="Logo DUDEN"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.parentElement.style.background = C.navy
                    e.target.parentElement.innerHTML = '<span style="color:white;font-weight:900;font-size:18px">D</span>'
                  }} />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase leading-none" style={{ color: C.green }}>Institut de Langues</p>
                <p className="text-base font-black leading-tight" style={{ color: C.navy }}>DUDEN</p>
                <p className="text-xs leading-none" style={{ color: C.green }}>Excellence · Rigueur · Réussite</p>
              </div>
            </div>

            {/* Links desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <a key={link} href={`#${link.toLowerCase().replace(/\s/g,"-").replace("à","a")}`}
                  className="text-sm font-semibold transition-colors relative"
                  style={{ color: i === 0 ? C.green : C.navy }}>
                  {link}
                  {i === 0 && <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ background: C.green }} />}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.button onClick={() => navigate("/login")}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <GraduationCap size={16} /> Se connecter
              </motion.button>
              <button className="lg:hidden p-2" onClick={() => setMenuOpen(o => !o)} style={{ color: C.navy }}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 px-4 py-4">
              {NAV_LINKS.map(l => (
                <a key={l} href="#" className="block py-3 text-sm font-semibold border-b border-gray-50"
                  style={{ color: C.navy }} onClick={() => setMenuOpen(false)}>{l}</a>
              ))}
              <button onClick={() => navigate("/login")} className="mt-4 w-full py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: C.green }}>Se connecter</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16"
        style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0a1f52 55%, #061440 100%)` }}>

        {/* Décorations */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
          style={{ background: C.green, transform: "translate(35%,-25%)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
          style={{ background: C.green, transform: "translate(-35%,35%)" }} />
        {[
          { top:"20%", left:"15%", delay:0 },
          { top:"60%", right:"20%", delay:1.5 },
          { top:"40%", left:"55%", delay:0.8 },
        ].map((pos, i) => (
          <motion.div key={i} className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{ ...pos, background: C.green }}
            animate={{ scale:[1,2.5,1], opacity:[0.4,1,0.4] }}
            transition={{ repeat:Infinity, duration:3+i, delay:pos.delay }} />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Texte */}
            <motion.div initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8 }}>
              <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                style={{ background:"rgba(30,138,60,0.2)", color:"#4ade80", border:"1px solid rgba(30,138,60,0.3)" }}>
                <Sparkles size={14} /> Leader en formation linguistique et professionnelle
              </motion.div>

              <div className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
                {[
                  { text:"FORMEZ-VOUS.", delay:0.4, color:"white" },
                  { text:"ÉLEVEZ VOTRE AVENIR.", delay:0.5, color:"white" },
                  { text:"DEVENEZ INCONTOURNABLE.", delay:0.6, color:"#4ade80" },
                ].map(({ text, delay, color }) => (
                  <motion.div key={text} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay }}
                    style={{ color }}>{text}</motion.div>
                ))}
              </div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                className="text-blue-200 text-lg leading-relaxed mb-8 max-w-lg">
                L'Institut de Langues DUDEN vous accompagne vers l'excellence avec des formations de qualité, des formateurs experts et un encadrement sur mesure.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}>
                <motion.button className="flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-sm shadow-xl"
                  style={{ background:`linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}
                  whileHover={{ scale:1.05, boxShadow:"0 12px 32px rgba(30,138,60,0.5)" }} whileTap={{ scale:0.97 }}>
                  Découvrir nos formations <ArrowRight size={16} />
                </motion.button>
                <motion.button onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-sm border-2"
                  style={{ borderColor:"rgba(255,255,255,0.3)" }}
                  whileHover={{ background:"rgba(255,255,255,0.1)" }} whileTap={{ scale:0.97 }}>
                  <GraduationCap size={18} /> Se connecter
                </motion.button>
              </motion.div>

              <motion.div className="flex flex-wrap gap-6 mt-10" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}>
                {[
                  { icon:Users,        label:"Formateurs experts" },
                  { icon:CheckCircle2, label:"Suivi personnalisé" },
                  { icon:Award,        label:"Certification reconnue" },
                  { icon:Building2,    label:"4 Centres modernes" },
                ].map(({ icon:Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={15} style={{ color:"#4ade80" }} />
                    <span className="text-blue-200 text-xs font-medium">{label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image hero */}
            <motion.div className="relative hidden lg:block"
              initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.3 }}>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ height:520, border:"2px solid rgba(255,255,255,0.1)" }}>
                <div className="w-full h-full flex flex-col items-center justify-center"
                  style={{ background:`linear-gradient(135deg, ${C.navyLight}, ${C.green}30)` }}>
                  <img src="/src/assets/images/hero-etudiants.jpg" alt="Étudiants DUDEN"
                    className="w-full h-full object-cover absolute inset-0"
                    onError={(e) => e.target.style.display = "none"} />
                  {/* Placeholder si pas d'image */}
                  <GraduationCap size={80} color="rgba(255,255,255,0.2)" />
                  <p className="text-white/40 text-sm mt-4 font-medium">hero-etudiants.jpg</p>
                  <p className="text-white/30 text-xs">📁 src/assets/images/</p>
                </div>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:"linear-gradient(to top, rgba(13,43,107,0.5) 0%, transparent 60%)" }} />

                {/* Badge taux réussite */}
                <motion.div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-4 shadow-xl"
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:C.green+"20" }}>
                      <TrendingUp size={20} style={{ color:C.green }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Taux de réussite 2025</p>
                      <p className="text-xl font-black" style={{ color:C.navy }}>98% de nos étudiants</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Card logo flottante */}
              <motion.div className="absolute -top-5 -right-5 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-3"
                animate={{ y:[0,-10,0] }} transition={{ repeat:Infinity, duration:3.5, ease:"easeInOut" }}>
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center bg-white">
                  <img src="/src/assets/images/logo-duden.png" alt="DUDEN" className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.parentElement.style.background = C.navy
                      e.target.parentElement.innerHTML = '<span style="color:white;font-weight:900">D</span>'
                    }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color:C.navy }}>Institut DUDEN</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={C.green} style={{ color:C.green }} />)}
                  </div>
                </div>
              </motion.div>

              {/* Badge nb étudiants */}
              <motion.div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-3"
                animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:4, ease:"easeInOut", delay:1 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:C.navy+"15" }}>
                  <Users size={18} style={{ color:C.navy }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Étudiants actifs</p>
                  <p className="font-black text-sm" style={{ color:C.navy }}>12 000+</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Vague */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── FORMATIONS ─────────────────────────────────────────────── */}
      <section id="formations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Nos Formations" title="Des formations pour" highlight="tous vos objectifs"
            subtitle="Linguistique ou professionnelle, trouvez la formation qui vous propulse plus loin." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {FORMATIONS.map((f, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true })
              return (
                <motion.div key={f.title} ref={ref}
                  initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
                  transition={{ delay:i*0.1, duration:0.5 }}
                  whileHover={{ y:-8, boxShadow:"0 20px 40px rgba(0,0,0,0.12)" }}
                  className="rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group bg-white">
                  {/* Image / placeholder */}
                  <div className="h-36 relative overflow-hidden flex items-center justify-center" style={{ background:f.bg }}>
                    <img src={f.image} alt={f.title}
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => e.target.style.display = "none"} />
                    <f.icon size={48} style={{ color:f.color, opacity:0.25 }} />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-md z-10"
                      style={{ background:"white" }}>
                      <f.icon size={18} style={{ color:f.color }} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-1" style={{ color:C.navy }}>{f.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{f.desc}</p>
                    <button className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color:C.green }}>
                      Voir plus <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <motion.button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg"
              style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.navyLight})` }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
              <BookOpen size={18} /> Voir toutes les formations
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #0a1f52 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p className="text-center text-xs font-bold tracking-widest uppercase mb-10"
            style={{ color:C.green }} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
            DUDEN en chiffres
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {STATS.map((s,i) => <AnimatedStat key={s.label} {...s} delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* ── POURQUOI ───────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Pourquoi choisir DUDEN ?" title="L'excellence au cœur de" highlight="notre mission" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {POURQUOI.map((p,i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once:true })
              return (
                <motion.div key={p.title} ref={ref}
                  initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:i*0.1 }}
                  whileHover={{ y:-6 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:border-green-200 transition-all">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background:C.green+"15" }}>
                    <p.icon size={26} style={{ color:C.green }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color:C.navy }}>{p.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CENTRES ────────────────────────────────────────────────── */}
      <section id="nos-centres" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Nos Centres" title="4 centres, une même" highlight="vision d'excellence" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CENTRES.map((c,i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once:true })
              return (
                <motion.div key={c.ville} ref={ref}
                  initial={{ opacity:0, scale:0.95 }} animate={inView ? { opacity:1, scale:1 } : {}} transition={{ delay:i*0.1 }}
                  whileHover={{ y:-8 }}
                  className="rounded-2xl overflow-hidden shadow-md border border-gray-100 group cursor-pointer">
                  <div className="h-48 relative overflow-hidden flex items-center justify-center"
                    style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.navyLight})` }}>
                    <img src={c.image} alt={`Centre ${c.ville}`}
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => e.target.style.display = "none"} />
                    <Building2 size={56} color="rgba(255,255,255,0.15)" />
                    <p className="absolute bottom-16 text-white/40 text-xs font-medium">{c.image.split("/").pop()}</p>
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background:"linear-gradient(to top, rgba(13,43,107,0.7) 0%, transparent 60%)" }} />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-black text-sm">DUDEN — {c.ville}</p>
                      <p className="text-white/60 text-xs">{c.type}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} style={{ color:C.green }} />
                      <h3 className="font-black text-sm" style={{ color:C.navy }}>DUDEN — {c.ville}</h3>
                    </div>
                    <p className="text-xs text-gray-400 font-medium mb-3">{c.type}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone size={12} /><span>{c.phone}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Témoignages" title="Ils nous font" highlight="confiance" />
          <AnimatePresence mode="wait">
            <motion.div key={temoIndex}
              initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration:0.4 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill={C.green} style={{ color:C.green }} />)}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed italic mb-8">
                "{TEMOIGNAGES[temoIndex].texte}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg"
                  style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.green})` }}>
                  {TEMOIGNAGES[temoIndex].nom[0]}
                </div>
                <div className="text-left">
                  <p className="font-bold" style={{ color:C.navy }}>{TEMOIGNAGES[temoIndex].nom}</p>
                  <p className="text-sm" style={{ color:C.green }}>{TEMOIGNAGES[temoIndex].formation}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center items-center gap-3 mt-8">
            <button onClick={() => setTemoIndex(i => (i-1+TEMOIGNAGES.length)%TEMOIGNAGES.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all"
              style={{ borderColor:C.navy, color:C.navy }}>
              <ChevronLeft size={18} />
            </button>
            {TEMOIGNAGES.map((_,i) => (
              <button key={i} onClick={() => setTemoIndex(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{ background: i===temoIndex ? C.green : "#D1D5DB" }} />
            ))}
            <button onClick={() => setTemoIndex(i => (i+1)%TEMOIGNAGES.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all"
              style={{ borderColor:C.navy, color:C.navy }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #061440 100%)` }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Prêt à transformer <span style={{ color:"#4ade80" }}>votre avenir ?</span>
            </h2>
            <p className="text-blue-200 mb-8 text-lg">Rejoignez des milliers d'étudiants qui nous font déjà confiance.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-xl"
                style={{ background:`linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
                <Users size={18} /> S'inscrire maintenant
              </motion.button>
              <motion.button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold border-2 text-white"
                style={{ borderColor:"rgba(255,255,255,0.3)" }} whileHover={{ background:"rgba(255,255,255,0.1)" }}>
                <Mail size={18} /> Nous contacter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white overflow-hidden flex items-center justify-center">
                  <img src="/src/assets/images/logo-duden.png" alt="DUDEN" className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.parentElement.style.background = C.navy
                      e.target.parentElement.innerHTML = '<span style="color:white;font-weight:900;font-size:18px">D</span>'
                    }} />
                </div>
                <div>
                  <p className="text-white font-black text-xs">INSTITUT DE LANGUES DUDEN</p>
                  <p className="text-xs" style={{ color:C.green }}>Excellence · Rigueur · Réussite</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5">Votre partenaire de confiance pour une formation professionnelle d'excellence au Cameroun.</p>
              <div className="flex gap-3">
                {[FaFacebook, FaInstagram, FaLinkedin, FaYoutube].map((Icon, i) => (
                  <motion.a key={i} href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-800 transition-colors"
                    whileHover={{ scale:1.1, backgroundColor:C.green }}>
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Liens utiles</h4>
              {["À propos","Formations","Nos centres","Bafoussam","Contact"].map(l => (
                <a key={l} href="#" className="block text-sm py-1.5 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Nos centres</h4>
              {["Yaoundé","Douala","Bafoussam","Garoua"].map(c => (
                <a key={c} href="#" className="flex items-center gap-2 text-sm py-1.5 hover:text-white transition-colors">
                  <MapPin size={12} style={{ color:C.green }} />{c}
                </a>
              ))}
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Contact</h4>
              <div className="space-y-3">
                {[
                  { icon:Phone, text:"+237 6 12 34 56 78" },
                  { icon:Mail,  text:"contact@duden.com" },
                  { icon:Clock, text:"Lun – Ven : 07h30 – 17h00" },
                ].map(({ icon:Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm">
                    <Icon size={14} style={{ color:C.green }} /><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2026 Institut de Langues DUDEN. Tous droits réservés.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0 }}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl z-40"
            style={{ background:`linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}>
            <ChevronLeft size={20} style={{ transform:"rotate(90deg)" }} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}
