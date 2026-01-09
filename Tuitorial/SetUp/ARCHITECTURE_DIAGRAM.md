# 🎯 Navigation System Architecture Diagram

## Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER OPENS APP                          │
└────────────────────────────┬──────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────────┐
                    │   IntroMask.jsx    │
                    │  (Intro Animation) │
                    └────────┬───────────┘
                             │
                  (Animation completes)
                             │
                             ▼
                    ┌────────────────────┐
                    │   showContent = true│
                    └────────┬───────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   <Router>                   │
              │     <AppRoutes />            │
              │   </Router>                  │
              └──────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    ┌──────────┐        ┌──────────┐      ┌──────────┐
    │    /     │        │  /posts  │      │ /login   │
    └──────────┘        └──────────┘      └──────────┘
         │                   │                  │
         ▼                   ▼                  ▼
   MainContent         AllPosts            LoginPage
  + Navbar comp      + Navbar comp       + Navbar comp
     (Home)            (All Posts)        (Login Form)
```

## Component Hierarchy

```
App.jsx (Router wrapper)
│
├── IntroMask.jsx
│   └── Animation plays...
│
└── AppRoutes.jsx (Routes config)
    │
    ├── Route: "/"
    │   └── MainContent.jsx
    │       ├── Navbar.jsx
    │       │   ├── Logo button → navigate("/")
    │       │   ├── All Post button → navigate("/posts")
    │       │   ├── Login button → navigate("/login")
    │       │   ├── Sign in button → navigate("/signin")
    │       │   └── Create/Logout button
    │       │
    │       └── Parallax animations + Character graphics
    │
    ├── Route: "/posts"
    │   └── AllPosts.jsx
    │       ├── Navbar.jsx
    │       └── Blog posts grid
    │
    ├── Route: "/login"
    │   └── LoginPage.jsx
    │       ├── Navbar.jsx
    │       └── Login form
    │
    ├── Route: "/signin"
    │   └── SignInPage.jsx
    │       ├── Navbar.jsx
    │       └── Sign in form
    │
    ├── Route: "/register"
    │   └── RegisterPage.jsx
    │       ├── Navbar.jsx
    │       └── Register form
    │
    ├── Route: "/create"
    │   └── RegisterPage.jsx
    │       ├── Navbar.jsx
    │       └── Register form (create blog)
    │
    └── Route: "/logout"
        └── LogoutPage.jsx
            ├── Navbar.jsx
            └── Logout handler
```

## Navigation Flow (Data & State)

```
┌───────────────────────────────────────────────────────────┐
│                  NAVBAR COMPONENT                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  useNavigate() {                                         │
│    - navigate("/")      → MainContent                   │
│    - navigate("/posts") → AllPosts                      │
│    - navigate("/login") → LoginPage                     │
│    - navigate("/signin") → SignInPage                   │
│    - navigate("/create") → RegisterPage                 │
│  }                                                       │
│                                                           │
│  useLocation() {                                         │
│    - Get current path → location.pathname               │
│    - Check if active → isActive(path)                   │
│    - Highlight button → "text-yellow-400"               │
│  }                                                       │
│                                                           │
│  localStorage {                                          │
│    - Check login: authToken                             │
│    - Show Logout if logged in                           │
│    - Show Create Blog if not logged in                  │
│  }                                                       │
└───────────────────────────────────────────────────────────┘
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────┐
│                    localStorage                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │ Key: "authToken"                          │        │
│  ├────────────────────────────────────────────┤        │
│  │ Value: JWT token (if logged in)           │        │
│  │        undefined (if not logged in)       │        │
│  └────────────────────────────────────────────┘        │
│                   │                                    │
│                   ▼                                    │
│         Check in Navbar.jsx                           │
│         ├─ if (authToken) → Show Logout              │
│         └─ if (!authToken) → Show Create Blog        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Active Route Detection Flow

```
User clicks "All Post" button
        │
        ▼
useNavigate("/posts")
        │
        ▼
Browser URL changes to /posts
        │
        ▼
useLocation() detects change
        │
        ▼
location.pathname === "/posts" ? true : false
        │
        ▼
isActive("/posts") returns:
├─ true → "text-yellow-400" (HIGHLIGHTED)
└─ false → "text-white" (NORMAL)
        │
        ▼
AllPosts page renders
with "All Post" button highlighted in YELLOW
```

## File Dependencies Diagram

```
src/
│
├── App.jsx
│   ├── import Router from "react-router-dom"
│   ├── import IntroMask from "./components/IntroMask"
│   └── import AppRoutes from "./route/routes"
│
├── route/
│   └── routes.jsx
│       ├── import MainContent from "./components/MainContent"
│       ├── import AllPosts from "./pages/AllPosts"
│       ├── import LoginPage from "./pages/LoginPage"
│       ├── import SignInPage from "./pages/SignInPage"
│       ├── import RegisterPage from "./pages/RegisterPage"
│       └── import LogoutPage from "./pages/LogoutPage"
│
├── components/
│   ├── Navbar.jsx (NEW)
│   │   └── import { useNavigate, useLocation } from "react-router-dom"
│   ├── MainContent.jsx
│   │   ├── import Navbar from "./Navbar"
│   │   └── import { useNavigate } from "react-router-dom"
│   └── IntroMask.jsx
│
└── pages/
    ├── AllPosts.jsx (NEW)
    │   └── import Navbar from "../components/Navbar"
    ├── LoginPage.jsx
    │   └── import Navbar from "../components/Navbar"
    ├── SignInPage.jsx
    │   └── import Navbar from "../components/Navbar"
    ├── RegisterPage.jsx
    │   └── import Navbar from "../components/Navbar"
    └── LogoutPage.jsx
        └── import Navbar from "../components/Navbar"
```

## Button Click Event Chain

```
User Interaction:
    │
    └─ Clicks "All Post" button in Navbar
            │
            ▼
    onClick event triggers:
            │
            ▼
    navigate("/posts") executes
            │
            ▼
    React Router updates:
    - URL bar: "/" → "/posts"
    - Current route in memory
            │
            ▼
    Triggers re-render:
    - AppRoutes checks current route
    - Matches "/posts" → renders AllPosts.jsx
            │
            ▼
    AllPosts component mounts:
    - Includes <Navbar /> component
    - Navbar detects new location
    - location.pathname === "/posts" → true
    - isActive("/posts") → "text-yellow-400"
            │
            ▼
    Page displays:
    - All blog posts in grid
    - "All Post" button highlighted YELLOW
    - Other buttons remain WHITE
```

## Responsive Styling Flow

```
Page loads with URL "/posts"
        │
        ▼
useLocation() hook:
location = { pathname: "/posts", ... }
        │
        ▼
isActive() function:
location.pathname === "/posts"
        │
        ▼
Result: true
        │
        ▼
CSS Classes applied to button:
┌────────────────────────────────┐
│ px-3 py-2 text-3xl font-medium │
│ text-yellow-400                │
│ hover:text-yellow-400          │
│ transition                     │
└────────────────────────────────┘
        │
        ▼
BUTTON HIGHLIGHTED IN YELLOW ✨
```

---

**Architecture Complete! All navigation flows properly mapped.** ✅
