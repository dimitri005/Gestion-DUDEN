# 📚 Documentation Projet — Plateforme de Gestion FORMATION DUDEN

> **Client :** Institut de Formation Professionnelle DUDEN  
> **Prestataire :** NOVA-TECH-SOLUTION  
> **Stack :** React + Tailwind CSS + Spring Boot + PostgreSQL  
> **Date :** 25 juin 2026  
> **Version :** 1.1 — Mise à jour du modèle métier

---

## 📋 Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Modèle métier détaillé](#2-modèle-métier-détaillé)
3. [Création du projet React + Tailwind](#3-création-du-projet-react--tailwind)
4. [Structure des dossiers](#4-structure-des-dossiers)
5. [Librairies installées](#5-librairies-installées)
6. [Configuration des fichiers](#6-configuration-des-fichiers)
7. [Palette de couleurs](#7-palette-de-couleurs)
8. [Animations](#8-animations)
9. [Routing — React Router](#9-routing--react-router)
10. [Composants UI — Shadcn & Aceternity](#10-composants-ui--shadcn--aceternity)
11. [Pages créées](#11-pages-créées)
12. [Commandes utiles](#12-commandes-utiles)

---

## 1. Présentation du projet

### Contexte
L'Institut de Formation Professionnelle DUDEN opère sur **4 centres géographiques** distincts. La plateforme centralise la gestion de tous les centres.

### Formations proposées
- **Linguistiques :** italien, allemand, anglais, espagnol
- **Professionnelles :** secrétariat, bureautique, infographie, gestion administrative

### 5 rôles utilisateurs

| Rôle | Responsabilités |
|------|----------------|
| **Étudiant** | Consulter, s'inscrire, accéder au planning et aux notes |
| **Formateur** | Gérer ses disponibilités, son planning, noter les étudiants |
| **Secrétaire** | Gérer les inscriptions et documents administratifs |
| **Admin Centre** | Gérer son centre, utilisateurs, formations et plannings |
| **Admin Système** | Supervision globale des 4 centres, audit, config générale |

### 9 modules fonctionnels
1. Gestion multi-centres
2. Gestion des formations et des cours
3. Gestion des utilisateurs et des rôles
4. Système d'inscription en ligne
5. Gestion des disponibilités des formateurs
6. **Système de planification automatique** ← module le plus complexe
7. Interfaces personnalisées par rôle
8. Module administrateur et suivi temps réel (KPI)
9. Système de communication et notifications

---

## 2. Création du projet React + Tailwind

### Étape 1 — Créer le projet Vite + React
```bash
cd FRONTEND
npm create vite@latest . -- --template react
```
> Choisir **No (Oxlint)** pour le linter — plus rapide, recommandé pour les nouveaux projets

### Étape 2 — Installer les dépendances
```bash
npm install
```

### Étape 3 — Installer Tailwind CSS
```bash
npm install -D tailwindcss @tailwindcss/vite
```

### Étape 4 — Configurer `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Étape 5 — Configurer `src/index.css`
```css
@import "tailwindcss";
```

### Étape 6 — Lancer le serveur
```bash
npm run dev
# → http://localhost:5173
```

---

## 3. Structure des dossiers

### Création de la structure complète
```bash
mkdir -p src/ui src/components src/pages src/layouts src/api src/services \
         src/lib src/hooks src/context src/routes src/store src/animations \
         src/styles src/config src/assets/images src/assets/icons

touch src/animations/variants.js src/animations/transitions.js
touch src/lib/axios.js src/lib/utils.js src/lib/constants.js
touch src/config/theme.js src/config/tanstack.js
touch src/context/AuthContext.jsx
touch src/routes/index.jsx src/routes/ProtectedRoute.jsx
touch src/store/authSlice.js
touch src/styles/animations.css src/styles/globals.css
```

### Structure finale
```
FRONTEND/
└── src/
    ├── animations/         ← Framer Motion variants + transitions
    │   ├── variants.js
    │   ├── transitions.js
    │   ├── loading.json    ← Animation Lottie spinner
    │   ├── success.json    ← Animation Lottie succès
    │   └── error.json      ← Animation Lottie erreur
    ├── api/                ← Appels HTTP vers le backend
    ├── assets/
    │   ├── images/
    │   └── icons/
    ├── components/         ← Composants UI & métier DUDEN
    │   ├── aceternity/     ← Composants Aceternity UI (effets visuels avancés)
    │   │   ├── background-gradient.jsx
    │   │   ├── card-hover-effect.jsx
    │   │   ├── animated-tooltip.jsx
    │   │   └── sparkles.jsx
    │   └── ui/             ← Composants Shadcn/ui (base design system)
    │       ├── button.jsx
    │       ├── card.jsx
    │       └── ...
    ├── config/             ← Config librairies (theme, tanstack)
    │   ├── theme.js
    │   └── tanstack.js
    ├── context/            ← Contextes React globaux
    │   └── AuthContext.jsx
    ├── hooks/              ← Hooks custom React
    ├── layouts/            ← Gabarits de mise en page
    ├── lib/                ← Utilitaires techniques
    │   ├── axios.js
    │   ├── utils.js
    │   └── constants.js
    ├── pages/              ← Pages complètes
    │   └── Login.jsx
    ├── routes/             ← Navigation et protection
    │   ├── index.jsx
    │   └── ProtectedRoute.jsx
    ├── services/           ← Logique métier
    ├── store/              ← État global (Redux/Zustand)
    │   └── authSlice.js
    ├── styles/             ← CSS global et animations
    │   ├── globals.css
    │   └── animations.css
    ├── ui/                 ← Composants UI basiques
    ├── App.jsx
    └── main.jsx
```

### Description de chaque dossier

| Dossier | Rôle |
|---------|------|
| `components/aceternity/` | Effets visuels avancés — BackgroundGradient, CardHoverEffect, AnimatedTooltip, Sparkles |
| `components/ui/` | Design system Shadcn — Button, Card, Input, Modal, Badge, Dialog, etc. |
| `pages/` | Pages complètes — une par route (Login, Dashboard, Formations, Etudiants) |
| `layouts/` | Gabarits de mise en page — MainLayout (sidebar), AuthLayout (login) |
| `api/` | Appels HTTP — une fonction par ressource (getFormations, login, etc.) |
| `services/` | Logique métier — calculs, transformations, validations avant/après API |
| `lib/` | Utilitaires techniques — axios configuré, formatDate, constants |
| `hooks/` | Hooks React custom (useAuth, useFormations, usePagination) |
| `context/` | Contextes globaux React (AuthContext, ThemeContext) |
| `routes/` | Toutes les routes + ProtectedRoute |
| `store/` | État global Redux/Zustand (optionnel) |
| `animations/` | Framer Motion variants + fichiers JSON Lottie |
| `styles/` | CSS global, variables, keyframes custom |
| `config/` | Config des librairies (React Query, thème Tailwind) |
| `assets/` | Images, icônes, ressources statiques |

### Flux de données
```
pages/
  └── utilise → layouts/ + components/ + ui/
                    └── appelle → services/
                                    └── appelle → api/
                                                    └── utilise → lib/axios.js
```

---

## 4. Librairies installées

### Commandes d'installation
```bash
# Animations
npm install framer-motion
npm install lottie-react

# Navigation + HTTP
npm install react-router-dom axios

# Shadcn/ui — initialisation (à faire une seule fois)
npx shadcn@latest init
# → Choisir style : Default | Base color : Slate | CSS variables : Yes

# Shadcn — ajouter des composants au besoin
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add badge
# etc.

# Aceternity UI — prérequis (si pas déjà fait)
npm install tailwindcss-animate clsx tailwind-merge
```

> **Note Aceternity :** Les composants Aceternity sont copiés directement dans `src/components/aceternity/`.
> Ils ne s'installent pas via npm — on les copie depuis [ui.aceternity.com](https://ui.aceternity.com).

### Récapitulatif des librairies

| Librairie | Usage | Statut |
|-----------|-------|--------|
| **framer-motion** | Animations UI (hover, transitions, modals) | ✅ installé |
| **lottie-react** | Animations JSON (loading, succès, erreur) | ✅ installé |
| **react-router-dom** | Navigation entre pages | ✅ installé |
| **axios** | Appels HTTP vers le backend Spring Boot | ✅ installé |
| **shadcn/ui** | Composants UI accessibles et stylisés (Radix UI) | ✅ initialisé |
| **aceternity/ui** | Effets visuels avancés (gradient, sparkles, tooltip) | ✅ composants copiés |
| **tailwindcss-animate** | Animations CSS pour Shadcn | ✅ installé |
| **clsx + tailwind-merge** | Fusion conditionnelle de classes Tailwind | ✅ installé |

### Différence entre les deux librairies UI

| Critère | Shadcn/ui (`components/ui/`) | Aceternity UI (`components/aceternity/`) |
|---------|------------------------------|------------------------------------------|
| **Source** | `npx shadcn@latest add` | Copier-coller depuis ui.aceternity.com |
| **Usage** | Composants fonctionnels (boutons, formulaires, cards) | Effets décoratifs (gradients, sparkles, tooltips animés) |
| **Base** | Radix UI + Tailwind | Framer Motion + Tailwind |
| **Accessibilité** | ✅ ARIA, keyboard nav | ⚠️ Décoratif uniquement |
| **Quand l'utiliser** | Partout dans l'app pour la structure | Sections hero, landing, dashboards, KPIs |

### Librairies d'animation — comparatif

| Librairie | Quand l'utiliser |
|-----------|-----------------|
| **Framer Motion** | Animations UI quotidiennes — hover, transitions de pages, modals |
| **Aceternity** | Effets visuels spectaculaires — backgrounds animés, cards holographiques |
| **Lottie** | Animations illustrées — loading, succès, erreurs, icônes animées |

> Pour ce projet : **Shadcn** (composants de base) + **Aceternity** (effets visuels) + **Framer Motion** (transitions) + **Lottie** (états loading/succès)

---

## 5. Configuration des fichiers

### `src/lib/axios.js`
```js
import axios from "axios"
import { API_URL } from "./constants"

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
})

// Ajoute le token automatiquement
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Gère les erreurs 401 globalement
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default instance
```

### `src/lib/constants.js`
```js
export const API_URL = "http://localhost:5000/api"

export const ROLES = {
  ADMIN: "admin",
  FORMATEUR: "formateur",
  ETUDIANT: "etudiant"
}

export const STATUS = {
  ACTIF: "actif",
  INACTIF: "inactif",
  EN_COURS: "en_cours",
  TERMINE: "termine"
}
```

### `src/lib/utils.js`
```js
export const formatDate = (date) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric"
  })

export const formatPrice = (price) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency", currency: "XAF"
  }).format(price)

export const truncate = (text, length = 100) =>
  text.length > length ? text.substring(0, length) + "..." : text
```

### `src/animations/variants.js`
```js
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.3 }
}

export const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 40 },
  transition: { duration: 0.4 }
}

export const slideLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -60 },
  transition: { duration: 0.4 }
}

export const zoomIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.85 },
  transition: { duration: 0.3 }
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}
```

### `src/animations/transitions.js`
```js
export const spring = { type: "spring", stiffness: 300, damping: 20 }
export const smooth = { type: "tween", duration: 0.4, ease: "easeInOut" }
export const fast   = { type: "tween", duration: 0.2, ease: "easeOut" }
```

### `src/context/AuthContext.jsx`
```jsx
import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  )

  const login = (userData, token) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
```

### `src/routes/ProtectedRoute.jsx`
```jsx
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  const token = localStorage.getItem("token")
  if (!token) return <Navigate to="/login" replace />
  return <Outlet />
}

export default ProtectedRoute
```

### `src/routes/index.jsx`
```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Login from "../pages/Login"

// Placeholders — à remplacer par les vraies pages
const Dashboard  = () => <div>Dashboard 📊</div>
const Formations = () => <div>Formations 🎓</div>
const Etudiants  = () => <div>Etudiants 👨‍🎓</div>
const NotFound   = () => <div>404 ❌</div>

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/"            element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/formations"  element={<Formations />} />
          <Route path="/etudiants"   element={<Etudiants />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
```

### `src/App.jsx`
```jsx
import AppRoutes from "./routes"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
```

---

## 6. Palette de couleurs

Basée sur le logo DUDEN (bleu marine + vert émeraude) :

| Couleur | HEX | Usage |
|---------|-----|-------|
| 🔵 **Bleu Marine** | `#0D2B6B` | Sidebar, header, boutons primaires |
| 🟢 **Vert Émeraude** | `#1E8A3C` | Accents, badges, liens |
| ⚪ **Gris clair** | `#F8F9FA` | Background général |
| ⚫ **Texte** | `#212529` | Texte principal |

```js
// src/config/theme.js
export const theme = {
  colors: {
    primary: {
      600: "#0D2B6B",   // Bleu Marine principal
      700: "#091F52",
    },
    secondary: {
      600: "#1E8A3C",   // Vert Émeraude principal
      700: "#166B2E",
    }
  }
}
```

### Application des couleurs par élément

| Élément UI | Couleur |
|-----------|---------|
| Sidebar | Bleu Marine `#0D2B6B` |
| Boutons primaires | Bleu Marine `#0D2B6B` |
| Accents / badges | Vert Émeraude `#1E8A3C` |
| Header | Bleu Marine |
| Cards actives | Bordure Vert Émeraude |
| Background | Gris clair `#F8F9FA` |

---

## 7. Animations

### Framer Motion — 5 props essentielles

| Prop | Rôle |
|------|------|
| `initial` | État de départ |
| `animate` | État final |
| `exit` | Animation à la disparition |
| `whileHover` | Animation au survol |
| `transition` | Durée et type d'animation |

### Lottie — fichiers JSON créés

| Fichier | Animation | Usage |
|---------|-----------|-------|
| `loading.json` | ⏳ Spinner bleu | Pendant chargement |
| `success.json` | ✅ Cercle vert + checkmark | Après action réussie |
| `error.json` | ❌ Cercle rouge + croix | En cas d'erreur |

---

## 8. Routing — React Router

### Version utilisée
**React Router v6** (`react-router-dom`)

### Imports principaux

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useNavigate }    from "react-router-dom"  // navigation programmatique
import { useParams }      from "react-router-dom"  // paramètres URL (/formations/:id)
import { Link, NavLink }  from "react-router-dom"  // liens
import { Outlet }         from "react-router-dom"  // affiche la page enfant
```

### Routes du projet

| URL | Page | Protection |
|-----|------|-----------|
| `/login` | Login | 🔓 Publique |
| `/dashboard` | Dashboard | 🔒 Protégée |
| `/formations` | Formations | 🔒 Protégée |
| `/etudiants` | Etudiants | 🔒 Protégée |
| `*` | 404 | 🔓 Publique |

### ProtectedRoute — fonctionnement
```
Utilisateur accède à /dashboard
  └── ProtectedRoute vérifie localStorage.getItem("token")
        ├── Token présent → affiche la page ✅
        └── Pas de token  → redirige vers /login 🔒
```

---

## 9. Pages créées

### ✅ `src/pages/Login.jsx`

**Fonctionnalités :**
- Split screen : panneau gauche bleu marine + panneau droit formulaire
- Animations Framer Motion : slide depuis gauche/droite au chargement
- Validation des champs email + mot de passe avec messages d'erreur animés
- Affichage/masquage du mot de passe
- Spinner animé pendant la connexion
- Message d'erreur API animé
- Badges des 5 rôles DUDEN
- Footer NOVA-TECH-SOLUTION
- Connexion via Axios → `POST /auth/login`

**Couleurs utilisées :**
- Panneau gauche : `#0D2B6B` (bleu marine)
- Accents : `#1E8A3C` (vert émeraude)
- Stats affichées : 4 Centres · 5 Rôles · 9 Modules

---

## 10. Composants UI — Shadcn & Aceternity

### Architecture des composants

```
src/components/
├── aceternity/              ← Effets visuels spectaculaires
│   ├── background-gradient.jsx   ← Fond dégradé animé (login, hero)
│   ├── card-hover-effect.jsx     ← Cards avec effet 3D au survol
│   ├── animated-tooltip.jsx      ← Tooltip avec avatar animé
│   └── sparkles.jsx              ← Particules/étoiles animées
└── ui/                      ← Design system Shadcn (Radix UI)
    ├── button.jsx            ← Bouton (variants: default, outline, ghost…)
    ├── card.jsx              ← Card, CardHeader, CardContent, CardFooter
    └── ...                   ← dialog, input, badge, select, table…
```

---

### Composants Aceternity

#### `background-gradient.jsx`
Enveloppe n'importe quel contenu d'un dégradé animé en bordure.

```jsx
import { BackgroundGradient } from "@/components/aceternity/background-gradient"

// Utilisation typique — carte de formation en vedette
<BackgroundGradient className="rounded-2xl p-4 bg-white dark:bg-zinc-900">
  <h3 className="text-lg font-bold">Allemand — Niveau A1</h3>
  <p className="text-sm text-gray-500">12 places disponibles</p>
</BackgroundGradient>
```

**Usage DUDEN recommandé :** Cards de formations en vedette, page d'accueil, KPIs importants du Dashboard.

---

#### `card-hover-effect.jsx`
Grille de cards avec effet de lumière et survol 3D.

```jsx
import { HoverEffect } from "@/components/aceternity/card-hover-effect"

const formations = [
  { title: "Allemand A1", description: "Débutant — 3 mois", link: "/formations/all-a1" },
  { title: "Secrétariat",  description: "Professionnel — 6 mois", link: "/formations/sec" },
]

// Utilisation
<HoverEffect items={formations} />
```

**Usage DUDEN recommandé :** Grille des formations, liste des modules sur le Dashboard, catalogue.

---

#### `animated-tooltip.jsx`
Tooltip qui affiche une carte flottante animée avec avatar.

```jsx
import { AnimatedTooltip } from "@/components/aceternity/animated-tooltip"

const formateurs = [
  { id: 1, name: "Prof. Mbarga", designation: "Allemand", image: "/avatars/mbarga.jpg" },
  { id: 2, name: "Prof. Ngo",    designation: "Anglais",  image: "/avatars/ngo.jpg" },
]

// Afficher les formateurs d'une classe
<AnimatedTooltip items={formateurs} />
```

**Usage DUDEN recommandé :** Liste des formateurs dans les détails de classe, page Planning (qui enseigne quoi).

---

#### `sparkles.jsx`
Effet de particules scintillantes sur du texte ou une section.

```jsx
import { SparklesCore } from "@/components/aceternity/sparkles"

// En-tête animé sur la page de connexion
<div className="relative">
  <SparklesCore
    background="transparent"
    minSize={0.4}
    maxSize={1}
    particleDensity={120}
    particleColor="#1A3F8A"
  />
  <h1 className="relative z-10 text-4xl font-bold text-center">
    Bienvenue sur DUDEN
  </h1>
</div>
```

**Usage DUDEN recommandé :** Page de connexion (hero), bannière de bienvenue Dashboard, sections titre.

---

### Composants Shadcn/ui

> Les composants Shadcn sont dans `src/components/ui/` et s'importent via l'alias `@/components/ui/`.

#### Composants disponibles

| Composant | Import | Usage DUDEN |
|-----------|--------|-------------|
| `Button` | `@/components/ui/button` | Tous les boutons de l'app |
| `Card` | `@/components/ui/card` | Cards étudiants, formations, stats |
| `Input` | `@/components/ui/input` | Formulaires inscription, login |
| `Badge` | `@/components/ui/badge` | Statut inscription, niveau, rôle |
| `Dialog` | `@/components/ui/dialog` | Modals confirmation, détails |
| `Select` | `@/components/ui/select` | Filtres centre, niveau, année |
| `Table` | `@/components/ui/table` | Liste étudiants, planning, paiements |
| `Tabs` | `@/components/ui/tabs` | Navigation dans les pages détail |
| `Avatar` | `@/components/ui/avatar` | Photo formateur, étudiant |
| `Toast` | `@/components/ui/toast` | Notifications succès/erreur |

#### Exemple — Card étudiant avec Badge

```jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function EtudiantCard({ etudiant }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-3">
        <img src={etudiant.photo} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{etudiant.nom} {etudiant.prenom}</p>
          <p className="text-sm text-gray-500">{etudiant.matricule}</p>
        </div>
        <Badge variant={etudiant.statut === "VALIDEE" ? "default" : "outline"}>
          {etudiant.statut}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Niveau : {etudiant.niveau}</p>
        <p className="text-sm">Centre : {etudiant.centre}</p>
        <Button size="sm" className="mt-3 w-full">Voir le profil</Button>
      </CardContent>
    </Card>
  )
}
```

---

### Règle d'utilisation — quand choisir quoi ?

```
Besoin d'un bouton, input, select, table ?
  → Shadcn/ui  (src/components/ui/)

Besoin d'un effet visuel fort (gradient, hover 3D, sparkles) ?
  → Aceternity (src/components/aceternity/)

Besoin d'une animation de transition, fade, slide ?
  → Framer Motion (directement dans le composant)

Besoin d'un loader, animation succès/erreur ?
  → Lottie (src/animations/*.json)
```

---

### Utilitaire `cn()` — fusion de classes Tailwind

Shadcn installe automatiquement `clsx` + `tailwind-merge`. L'utilitaire `cn()` est dans `src/lib/utils.js` :

```js
// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

```jsx
// Utilisation — classes conditionnelles sans conflits Tailwind
<div className={cn(
  "rounded-lg p-4 border",
  isActive && "border-blue-500 bg-blue-50",
  isError  && "border-red-500 bg-red-50"
)}>
```

---



### Démarrer le projet
```bash
cd FRONTEND
npm run dev
# → http://localhost:5173
```

### Installer une nouvelle librairie
```bash
npm install nom-librairie
```

### Vérifier les librairies installées
```bash
cat package.json
```

### Build pour la production
```bash
npm run build
```

---

## 🗺️ Prochaines étapes

- [ ] Créer le **Layout principal** (Sidebar + Navbar)
- [ ] Créer la page **Dashboard** avec KPIs
- [ ] Créer la page **Formations**
- [ ] Créer la page **Etudiants**
- [ ] Créer la page **Planning**
- [ ] Configurer le **Backend Spring Boot**
- [ ] Connecter la **base de données PostgreSQL**

---

*Document mis à jour le 25 juin 2026 — v1.2 · Projet DUDEN · NOVA-TECH-SOLUTION*
