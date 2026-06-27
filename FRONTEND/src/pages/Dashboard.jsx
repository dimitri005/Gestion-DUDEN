import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import {
  Users, GraduationCap, Building2, TrendingUp, BookOpen,
  ClipboardList, Calendar, BarChart2, ArrowUp, ArrowDown,
  Eye, Plus, ChevronRight, Clock, CheckCircle2, AlertCircle,
  Star, MapPin
} from "lucide-react"

const C = {
  navy:      "#0D2B6B",
  navyLight: "#1A3F8F",
  green:     "#1E8A3C",
  greenLight:"#25A84A",
}

// ── Données mock (structure identique à l'API Spring Boot) ────
const MOCK_STATS = {
  ADMIN_SYSTEM: [
    { label:"Total Étudiants",   value:"1 247", change:+12, icon:Users,         color:C.navy,      bg:"#E8EEF8" },
    { label:"Formations actives",value:"24",     change:+3,  icon:GraduationCap, color:C.green,     bg:"#E8F5EC" },
    { label:"Centres actifs",    value:"4",      change:0,   icon:Building2,     color:"#7C3AED",   bg:"#F5F3FF" },
    { label:"Taux de réussite",  value:"98%",    change:+2,  icon:TrendingUp,    color:"#EA580C",   bg:"#FFF7ED" },
    { label:"Inscriptions/mois", value:"89",     change:+18, icon:ClipboardList, color:"#0891B2",   bg:"#E0F7FA" },
    { label:"Cours planifiés",   value:"142",    change:+7,  icon:Calendar,      color:"#CA8A04",   bg:"#FEFCE8" },
  ],
  ADMIN_CENTRE: [
    { label:"Étudiants du centre",value:"312",   change:+8,  icon:Users,         color:C.navy,      bg:"#E8EEF8" },
    { label:"Classes actives",    value:"18",    change:+2,  icon:BookOpen,      color:C.green,     bg:"#E8F5EC" },
    { label:"Formateurs",         value:"24",    change:+1,  icon:GraduationCap, color:"#7C3AED",   bg:"#F5F3FF" },
    { label:"Inscriptions/mois",  value:"27",    change:+5,  icon:ClipboardList, color:"#EA580C",   bg:"#FFF7ED" },
  ],
  SECRETAIRE: [
    { label:"Dossiers en attente",value:"12",    change:-3,  icon:ClipboardList, color:"#EA580C",   bg:"#FFF7ED" },
    { label:"Inscriptions validées",value:"89",  change:+11, icon:CheckCircle2,  color:C.green,     bg:"#E8F5EC" },
    { label:"Paiements du jour",  value:"5",     change:+2,  icon:TrendingUp,    color:C.navy,      bg:"#E8EEF8" },
    { label:"Documents générés",  value:"34",    change:+8,  icon:BarChart2,     color:"#7C3AED",   bg:"#F5F3FF" },
  ],
  FORMATEUR: [
    { label:"Mes classes",        value:"6",     change:0,   icon:BookOpen,      color:C.navy,      bg:"#E8EEF8" },
    { label:"Séances cette semaine",value:"12",  change:+2,  icon:Calendar,      color:C.green,     bg:"#E8F5EC" },
    { label:"Mes étudiants",      value:"87",    change:+4,  icon:Users,         color:"#7C3AED",   bg:"#F5F3FF" },
    { label:"Taux présence",      value:"91%",   change:+3,  icon:TrendingUp,    color:"#EA580C",   bg:"#FFF7ED" },
  ],
  ETUDIANT: [
    { label:"Mes cours",          value:"4",     change:0,   icon:BookOpen,      color:C.navy,      bg:"#E8EEF8" },
    { label:"Séances cette semaine",value:"8",   change:+1,  icon:Calendar,      color:C.green,     bg:"#E8F5EC" },
    { label:"Présences",          value:"94%",   change:+2,  icon:CheckCircle2,  color:"#7C3AED",   bg:"#F5F3FF" },
    { label:"Moyenne générale",   value:"15.4",  change:+0.8,icon:Star,          color:"#CA8A04",   bg:"#FEFCE8" },
  ],
}

const INSCRIPTIONS_RECENTES = [
  { nom:"Marie Nguema",     formation:"Allemand A1",     centre:"Yaoundé",  statut:"VALIDEE",    date:"25/06/2026", avatar:"M" },
  { nom:"Jean-Paul Mbarga", formation:"Informatique",    centre:"Douala",   statut:"EN_ATTENTE", date:"25/06/2026", avatar:"J" },
  { nom:"Aïcha Hamidou",    formation:"Secrétariat",     centre:"Garoua",   statut:"VALIDEE",    date:"24/06/2026", avatar:"A" },
  { nom:"Paul Eto'o",       formation:"Anglais B2",      centre:"Yaoundé",  statut:"ANNULEE",    date:"24/06/2026", avatar:"P" },
  { nom:"Sophie Kamga",     formation:"Infographie",     centre:"Bafoussam",statut:"VALIDEE",    date:"23/06/2026", avatar:"S" },
]

const SEANCES_AUJOURD_HUI = [
  { heure:"07h30", cours:"Grammaire Allemande A1", classe:"ALL-A1-A",  salle:"Salle 101", formateur:"M. Dupont",   statut:"EN_COURS" },
  { heure:"09h30", cours:"Bureautique Avancée",    classe:"INFO-AN1-B",salle:"Labo Info", formateur:"Mme Foko",    statut:"PLANIFIEE" },
  { heure:"11h00", cours:"Communication orale",    classe:"ENG-B2-A",  salle:"Salle 203", formateur:"Mr. Smith",   statut:"PLANIFIEE" },
  { heure:"14h00", cours:"Secrétariat général",    classe:"SEC-AN1-A", salle:"Salle 102", formateur:"Mme Mvogo",   statut:"PLANIFIEE" },
  { heure:"16h00", cours:"Espagnol débutant",      classe:"ESP-A1-A",  salle:"Salle 201", formateur:"M. Garcia",   statut:"PLANIFIEE" },
]

const CENTRES_STATS = [
  { ville:"Yaoundé",   etudiants:412, formations:8, taux:98, couleur:C.navy },
  { ville:"Douala",    etudiants:356, formations:7, taux:97, couleur:C.green },
  { ville:"Bafoussam", etudiants:289, formations:6, taux:95, couleur:"#7C3AED" },
  { ville:"Garoua",    etudiants:190, formations:5, taux:96, couleur:"#EA580C" },
]

const STATUT_CONFIG = {
  VALIDEE:    { label:"Validée",    bg:"#D1FAE5", color:"#065F46" },
  EN_ATTENTE: { label:"En attente", bg:"#FEF3C7", color:"#92400E" },
  ANNULEE:    { label:"Annulée",    bg:"#FEE2E2", color:"#991B1B" },
  EN_COURS:   { label:"En cours",   bg:"#DBEAFE", color:"#1E40AF" },
  PLANIFIEE:  { label:"Planifiée",  bg:"#F3F4F6", color:"#374151" },
  TERMINEE:   { label:"Terminée",   bg:"#D1FAE5", color:"#065F46" },
}

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay:index*0.07, duration:0.4 }}
      whileHover={{ y:-4, boxShadow:"0 12px 30px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background:stat.bg }}>
          <stat.icon size={22} style={{ color:stat.color }} />
        </div>
        {stat.change !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full
            ${stat.change > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            {stat.change > 0 ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
            {Math.abs(stat.change)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-black mb-1" style={{ color:C.navy }}>{stat.value}</p>
      <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
    </motion.div>
  )
}

const ROLE_LABELS = {
  ADMIN_SYSTEM:"Admin Système", ADMIN_CENTRE:"Admin Centre",
  SECRETAIRE:"Secrétaire", FORMATEUR:"Formateur", ETUDIANT:"Étudiant"
}

export default function Dashboard() {
  const { user } = useAuth()
  const role     = user?.role || "ADMIN_SYSTEM"
  const stats    = MOCK_STATS[role] || MOCK_STATS.ADMIN_SYSTEM

  const heure = new Date().getHours()
  const salut = heure < 12 ? "Bonjour" : heure < 18 ? "Bon après-midi" : "Bonsoir"

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">

      {/* ── En-tête ─────────────────────────────────────────── */}
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black" style={{ color:C.navy }}>
            {salut}, {user?.prenom || "Utilisateur"} 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
            {" · "}<span style={{ color:C.green }}>{ROLE_LABELS[role]}</span>
          </p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg self-start sm:self-auto"
          style={{ background:`linear-gradient(135deg, ${C.green}, ${C.greenLight})` }}
          whileHover={{ scale:1.04, boxShadow:"0 8px 24px rgba(30,138,60,0.4)" }}
          whileTap={{ scale:0.97 }}>
          <Plus size={16} /> Nouvelle action
        </motion.button>
      </motion.div>

      {/* ── Cartes stats ────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
      </div>

      {/* ── Grille principale ───────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Inscriptions récentes — 2/3 */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-black text-base" style={{ color:C.navy }}>Inscriptions récentes</h3>
              <p className="text-xs text-gray-400">5 dernières inscriptions</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold" style={{ color:C.green }}>
              Voir tout <ChevronRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {INSCRIPTIONS_RECENTES.map((insc, i) => {
              const s = STATUT_CONFIG[insc.statut]
              return (
                <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.3 + i*0.07 }}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                    style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.navyLight})` }}>
                    {insc.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color:C.navy }}>{insc.nom}</p>
                    <p className="text-xs text-gray-400 truncate">{insc.formation} · {insc.centre}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-xs text-gray-400">{insc.date}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background:s.bg, color:s.color }}>{s.label}</span>
                  <button className="hidden group-hover:flex items-center gap-1 text-xs font-medium p-1.5 rounded-lg transition-colors"
                    style={{ color:C.green }}>
                    <Eye size={14} />
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Séances aujourd'hui — 1/3 */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-black text-base" style={{ color:C.navy }}>Séances du jour</h3>
              <p className="text-xs text-gray-400">{SEANCES_AUJOURD_HUI.length} séances planifiées</p>
            </div>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:C.navy+"10" }}>
              <Clock size={16} style={{ color:C.navy }} />
            </div>
          </div>
          <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
            {SEANCES_AUJOURD_HUI.map((s, i) => {
              const st = STATUT_CONFIG[s.statut]
              return (
                <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4+i*0.06 }}
                  className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className="text-center shrink-0 mt-0.5">
                    <p className="text-xs font-black" style={{ color:C.navy }}>{s.heure}</p>
                  </div>
                  <div className="w-0.5 self-stretch rounded-full shrink-0"
                    style={{ background:s.statut==="EN_COURS" ? C.green : "#E5E7EB" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color:C.navy }}>{s.cours}</p>
                    <p className="text-xs text-gray-400 truncate">{s.classe} · {s.salle}</p>
                    <p className="text-xs text-gray-400 truncate">{s.formateur}</p>
                    <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background:st.bg, color:st.color }}>{st.label}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Stats centres (Admin Système seulement) ─────────── */}
      {role === "ADMIN_SYSTEM" && (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-black text-base" style={{ color:C.navy }}>Performance par centre</h3>
              <p className="text-xs text-gray-400">Vue consolidée des 4 centres DUDEN</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold" style={{ color:C.green }}>
              Rapport complet <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {CENTRES_STATS.map((c, i) => (
              <motion.div key={c.ville} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.5+i*0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background:c.couleur+"15" }}>
                    <MapPin size={16} style={{ color:c.couleur }} />
                  </div>
                  <p className="font-black text-sm" style={{ color:C.navy }}>DUDEN — {c.ville}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Étudiants</span>
                    <span className="font-bold" style={{ color:C.navy }}>{c.etudiants}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Formations</span>
                    <span className="font-bold" style={{ color:C.navy }}>{c.formations}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Taux réussite</span>
                    <span className="font-bold" style={{ color:C.green }}>{c.taux}%</span>
                  </div>
                  {/* Barre de progression */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ background:c.couleur }}
                        initial={{ width:0 }}
                        animate={{ width:`${c.taux}%` }}
                        transition={{ delay:0.6+i*0.1, duration:0.8 }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Alertes / Actions rapides ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Alertes */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-black text-base mb-4" style={{ color:C.navy }}>Alertes & À traiter</h3>
          <div className="space-y-3">
            {[
              { icon:AlertCircle, text:"12 dossiers d'inscription en attente de validation",   color:"#EA580C", bg:"#FFF7ED" },
              { icon:Clock,       text:"3 formateurs sans disponibilité cette semaine",         color:"#CA8A04", bg:"#FEFCE8" },
              { icon:CheckCircle2,text:"Cahier de texte non signé — Séance ALL-A1 du 24/06",  color:C.green,   bg:"#E8F5EC" },
            ].map(({ icon:Icon, text, color, bg }, i) => (
              <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                transition={{ delay:0.6+i*0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background:bg }}>
                <Icon size={16} style={{ color }} className="shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed" style={{ color }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions rapides */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-black text-base mb-4" style={{ color:C.navy }}>Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon:Plus,         label:"Nouvelle inscription",  color:C.green,   bg:"#E8F5EC" },
              { icon:Calendar,     label:"Planifier une séance",  color:C.navy,    bg:"#E8EEF8" },
              { icon:Users,        label:"Ajouter un étudiant",   color:"#7C3AED", bg:"#F5F3FF" },
              { icon:BarChart2,    label:"Générer un rapport",    color:"#EA580C", bg:"#FFF7ED" },
            ].map(({ icon:Icon, label, color, bg }) => (
              <motion.button key={label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all"
                style={{ background:bg }}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background:color+"20" }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <span className="text-xs font-semibold leading-tight" style={{ color }}>{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
