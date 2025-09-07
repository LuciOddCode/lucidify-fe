# Lucidify Frontend - Comprehensive Documentation

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB)](https://reactjs.org/)

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Authentication System](#authentication-system)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Styling & Design System](#styling--design-system)
10. [Internationalization](#internationalization)
11. [Accessibility](#accessibility)
12. [Development Workflow](#development-workflow)
13. [Deployment](#deployment)
14. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Lucidify** is an AI-driven mental health application designed to support the emotional well-being of young adults in Sri Lanka. The frontend is built with Next.js 15 and provides a comprehensive platform for mood tracking, journaling, AI companionship, and emotional wellness support.

### Key Objectives

- Provide accessible mental health support for young adults
- Offer multilingual support (English, Sinhala, Tamil)
- Create an intuitive, mobile-first user experience
- Integrate AI-powered emotional support features
- Ensure privacy and data security

---

## 🛠 Technology Stack

### Core Framework

- **Next.js 15.3.2** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5.x** - Type safety and development experience

### Styling & UI

- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Custom CSS Variables** - Design system implementation

### State Management

- **Zustand 4.5.5** - Lightweight state management
- **React Context** - Authentication and global state
- **React Hook Form 7.58.1** - Form state management

### Validation & Data

- **Zod 3.25.67** - Schema validation
- **Axios 1.10.0** - HTTP client
- **Recharts 2.12.7** - Data visualization

### Authentication

- **NextAuth.js 4.24.11** - Authentication framework
- **JWT** - Token-based authentication
- **Google OAuth** - Social authentication

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Turbopack** - Fast development builds

---

## 📁 Project Structure

```
lucidify-fe/
├── public/                          # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/                         # Next.js App Router
│       ├── components/              # Reusable UI components
│       │   ├── BackendStatus.tsx   # Backend connectivity indicator
│       │   ├── ErrorBoundary.tsx   # Error handling component
│       │   ├── FormInput.tsx       # Reusable form input
│       │   ├── LanguageSelector.tsx # Language switching
│       │   ├── LoadingSpinner.tsx  # Loading states
│       │   ├── Navigation.tsx      # Sidebar navigation
│       │   ├── ProtectedLayout.tsx # Layout wrapper
│       │   ├── ProtectedRoute.tsx  # Route protection
│       │   └── ...
│       ├── lib/                     # Core utilities and configurations
│       │   ├── api.ts              # API client and endpoints
│       │   ├── auth-context.tsx    # Authentication context
│       │   ├── i18n.ts             # Internationalization
│       │   ├── types.ts            # TypeScript definitions
│       │   └── validation.ts       # Zod schemas
│       ├── pages/                   # Authentication pages
│       │   ├── loginPage/
│       │   └── signupPage/
│       ├── dashboard/               # Main dashboard
│       ├── mood/                    # Mood tracking
│       ├── journal/                 # Digital journaling
│       ├── chat/                    # AI companion
│       ├── coping/                  # Coping strategies
│       ├── analytics/               # Data analytics
│       ├── session/                 # 8-minute sessions
│       ├── settings/                # User settings
│       ├── api/                     # API routes
│       │   └── auth/
│       │       └── [...nextauth]/
│       ├── globals.css              # Global styles
│       ├── layout.tsx               # Root layout
│       └── page.tsx                 # Home page
├── .env.local                       # Environment variables
├── .env.example.txt                 # Environment template
├── next.config.ts                   # Next.js configuration
├── tailwind.config.js               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.mjs                # ESLint configuration
├── postcss.config.mjs               # PostCSS configuration
└── package.json                     # Dependencies and scripts
```

---

## ✨ Core Features

### 1. Authentication System

- **Email/Password Authentication** - Secure login and registration
- **Google OAuth Integration** - Social login support
- **JWT Token Management** - Stateless authentication
- **Protected Routes** - Automatic access control
- **Password Strength Validation** - Real-time security feedback

### 2. Dashboard

- **Mood Analytics** - Visual mood tracking and trends
- **Journal Entries** - Writing statistics and insights
- **Quick Actions** - Fast access to main features
- **Motivational Quotes** - AI-generated encouragement
- **Real-time Data** - Live updates and synchronization

### 3. Mood Tracking

- **1-10 Scale Rating** - Simple mood assessment
- **Emotion Selection** - Multiple emotion tagging
- **Voice Transcription** - Audio mood logging
- **Sentiment Analysis** - AI-powered mood analysis
- **Historical Data** - Mood pattern visualization

### 4. Digital Journaling

- **Rich Text Editor** - Enhanced writing experience
- **AI Prompts** - Guided writing suggestions
- **Mood Integration** - Link entries to mood data
- **Tagging System** - Organize entries by themes
- **Privacy Controls** - Secure data handling

### 5. AI Companion

- **Conversational Interface** - Natural language chat
- **Contextual Responses** - Mood-aware interactions
- **Crisis Detection** - Safety monitoring
- **Session Management** - Conversation history
- **Multilingual Support** - Localized AI responses

### 6. Coping Strategies

- **Personalized Techniques** - AI-recommended strategies
- **Category-based Organization** - Mindfulness, CBT, etc.
- **Progress Tracking** - Strategy effectiveness
- **Custom Strategies** - User-defined techniques
- **Guided Exercises** - Step-by-step instructions

### 7. Analytics & Insights

- **Mood Trends** - Long-term emotional patterns
- **Journal Analytics** - Writing habit analysis
- **Emotion Frequency** - Most common emotions
- **Weekly Summaries** - AI-generated insights
- **Export Functionality** - Data portability

---

## 🔐 Authentication System

### Architecture Overview

The authentication system uses a hybrid approach combining NextAuth.js for OAuth and custom JWT implementation for email/password authentication.

```typescript
// Authentication Context Structure
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  language: Language;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (data: SignupFormData) => Promise<AuthResponse>;
  loginWithGoogle: () => Promise<AuthResponse>;
  verifyToken: () => Promise<boolean>;
  logout: () => Promise<void>;
  updateLanguage: (lang: Language) => void;
}
```

### Authentication Flow

#### 1. User Registration

```typescript
// Registration Process
1. User fills signup form
2. Client-side validation (Zod schemas)
3. Password strength validation
4. API call to /api/auth/register
5. Success → Redirect to login
6. Error → Display validation messages
```

#### 2. User Login

```typescript
// Login Process
1. User enters credentials
2. Client-side validation
3. API call to /api/auth/login
4. JWT token received and stored
5. User context updated
6. Redirect to dashboard
```

#### 3. Protected Routes

```typescript
// Route Protection
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>
```

### Security Features

- **JWT Token Storage** - Secure localStorage implementation
- **Token Verification** - Automatic token validation
- **Password Requirements** - Strong password enforcement
- **Input Sanitization** - XSS prevention
- **CSRF Protection** - Cross-site request forgery prevention

---

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── Layout (Root)
│   ├── AuthProvider
│   ├── ErrorBoundary
│   └── Toaster
├── ProtectedLayout
│   ├── Navigation (Sidebar)
│   └── Main Content
│       ├── Dashboard
│       ├── Mood Tracking
│       ├── Journal
│       ├── AI Chat
│       └── Other Pages
└── Public Pages
    ├── Login
    └── Signup
```

### Key Components

#### 1. FormInput Component

```typescript
interface FormInputProps {
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  error?: string;
  loading?: boolean;
  showPasswordToggle?: boolean;
  // ... other props
}
```

**Features:**

- Real-time validation feedback
- Accessibility attributes
- Password visibility toggle
- Loading states
- Error handling

#### 2. Navigation Component

```typescript
// Sidebar Navigation Features
- Responsive design (mobile/desktop)
- Active route highlighting
- User profile section
- Language selector
- Logout functionality
- Collapsible on mobile
```

#### 3. ProtectedRoute Component

```typescript
// Route Protection Logic
1. Check authentication status
2. Show loading spinner during check
3. Redirect to login if unauthenticated
4. Render children if authenticated
```

#### 4. ErrorBoundary Component

```typescript
// Error Handling
- Catch JavaScript errors
- Display user-friendly error messages
- Log errors for debugging
- Provide recovery options
```

---

## 📊 State Management

### State Architecture

The application uses a combination of React Context and Zustand for state management:

#### 1. Authentication Context

```typescript
// Global authentication state
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  language: "en",
  // ... methods
});
```

#### 2. Zustand Store (Future Implementation)

```typescript
// Planned global state management
interface AppState {
  // UI state
  sidebarOpen: boolean;
  theme: "light" | "dark";

  // Data state
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];

  // Actions
  toggleSidebar: () => void;
  addMoodEntry: (entry: MoodEntry) => void;
  // ... other actions
}
```

#### 3. Local Component State

```typescript
// Component-level state management
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
```

---

## 🌐 API Integration

### API Client Architecture

The application uses Axios as the HTTP client with centralized configuration:

```typescript
// API Client Configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request/Response Interceptors
api.interceptors.request.use(/* JWT token injection */);
api.interceptors.response.use(/* Error handling */);
```

### API Endpoints

#### Authentication Endpoints

```typescript
// Auth API Structure
export const authApi = {
  login: (data: LoginFormData) => Promise<AuthResponse>,
  signup: (data: SignupFormData) => Promise<AuthResponse>,
  verify: () => Promise<AuthResponse>,
  logout: () => Promise<AuthResponse>,
  refresh: () => Promise<AuthResponse>,
};
```

#### Data Endpoints

```typescript
// Mood API
export const moodApi = {
  getMoodAnalytics: () => Promise<ApiResponse<MoodAnalytics>>,
  getMoodEntries: () => Promise<ApiResponse<MoodEntry[]>>,
  createMoodEntry: (data: CreateMoodEntry) => Promise<ApiResponse<MoodEntry>>,
  updateMoodEntry: (id: string, data: UpdateMoodEntry) =>
    Promise<ApiResponse<MoodEntry>>,
  deleteMoodEntry: (id: string) => Promise<ApiResponse<void>>,
};

// Journal API
export const journalApi = {
  getJournalAnalytics: () => Promise<ApiResponse<JournalAnalytics>>,
  getJournalEntries: () => Promise<ApiResponse<JournalEntry[]>>,
  createJournalEntry: (data: CreateJournalEntry) =>
    Promise<ApiResponse<JournalEntry>>,
  updateJournalEntry: (id: string, data: UpdateJournalEntry) =>
    Promise<ApiResponse<JournalEntry>>,
  deleteJournalEntry: (id: string) => Promise<ApiResponse<void>>,
};
```

### Error Handling

```typescript
// Centralized Error Handling
const handleApiError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    // Handle unauthorized access
    logout();
    redirect("/login");
  } else if (error.response?.status === 500) {
    // Handle server errors
    showToast("Server error. Please try again.");
  } else {
    // Handle other errors
    showToast(error.response?.data?.message || "An error occurred");
  }
};
```

---

## 🎨 Styling & Design System

### Design Philosophy

The design system is built around mental health and wellness principles:

- **Calming Colors** - Soft, non-aggressive palette
- **Accessibility First** - WCAG 2.1 compliant
- **Mobile-First** - Responsive design approach
- **Minimalist** - Clean, distraction-free interface

### Color Palette

```css
:root {
  /* Primary Colors */
  --primary-sage: #7c9885; /* Main brand color */
  --secondary-sage: #a4b8a8; /* Secondary brand */

  /* Accent Colors */
  --soft-lavender: #b8a4c9; /* Calming accent */
  --calm-blue: #6b9bd1; /* Trust and stability */
  --serene-teal: #5fa5a5; /* Balance and harmony */
  --sunset-peach: #e8b4a0; /* Warmth and comfort */

  /* Neutral Colors */
  --warm-cream: #f7f5f3; /* Background */
  --soft-white: #fefefe; /* Card backgrounds */
  --gentle-gray: #8a8a8a; /* Secondary text */
  --deep-forest: #2d3e2d; /* Primary text */
}
```

### Typography

```css
/* Font Families */
--font-geist-sans: "Geist Sans", system-ui, sans-serif;
--font-geist-mono: "Geist Mono", Menlo, monospace;

/* Font Sizes */
text-xs: 0.75rem; /* 12px */
text-sm: 0.875rem; /* 14px */
text-base: 1rem; /* 16px */
text-lg: 1.125rem; /* 18px */
text-xl: 1.25rem; /* 20px */
text-2xl: 1.5rem; /* 24px */
text-3xl: 1.875rem; /* 30px */
```

### Component Styling

#### Card Components

```css
.card {
  @apply bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20;
}
```

#### Button Components

```css
.btn-primary {
  @apply bg-primary-sage text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-primary-sage/90 focus:outline-none focus:ring-2 focus:ring-primary-sage/50;
}
```

#### Form Components

```css
.form-input {
  @apply w-full px-4 py-3 border border-primary-sage/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-sage/50 focus:border-transparent transition-all duration-200;
}
```

### Responsive Design

```css
/* Mobile First Approach */
.container {
  @apply px-4 sm:px-6 lg:px-8;
}

.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.sidebar {
  @apply fixed top-0 left-0 h-full w-64 lg:translate-x-0;
}
```

---

## 🌍 Internationalization

### Supported Languages

1. **English (en)** - Default language
2. **Sinhala (si)** - සිංහල
3. **Tamil (ta)** - தமிழ்

### Implementation

```typescript
// Language Detection and Management
const getLanguage = (): Language => {
  // 1. Check localStorage for saved preference
  const saved = localStorage.getItem("language") as Language;
  if (saved && ["en", "si", "ta"].includes(saved)) {
    return saved;
  }

  // 2. Check browser language
  const browserLang = navigator.language.split("-")[0];
  if (["en", "si", "ta"].includes(browserLang)) {
    return browserLang as Language;
  }

  // 3. Default to English
  return "en";
};
```

### Translation System

```typescript
// Translation Object Structure
const translations = {
  en: {
    "auth.login.title": "Welcome Back",
    "auth.login.subtitle": "Sign in to your account",
    "auth.login.email": "Email Address",
    "auth.login.password": "Password",
    // ... more translations
  },
  si: {
    "auth.login.title": "ආයුබෝවන්",
    "auth.login.subtitle": "ඔබගේ ගිණුමට පිවිසෙන්න",
    "auth.login.email": "ඊමේල් ලිපිනය",
    "auth.login.password": "මුරපදය",
    // ... more translations
  },
  ta: {
    "auth.login.title": "வரவேற்கிறோம்",
    "auth.login.subtitle": "உங்கள் கணக்கில் உள்நுழையவும்",
    "auth.login.email": "மின்னஞ்சல் முகவரி",
    "auth.login.password": "கடவுச்சொல்",
    // ... more translations
  },
};
```

### Usage in Components

```typescript
// Using Translations in Components
const LoginPage = () => {
  const { language } = useAuth();

  return (
    <div>
      <h1>{getTranslation(language, "auth.login.title")}</h1>
      <p>{getTranslation(language, "auth.login.subtitle")}</p>
    </div>
  );
};
```

---

## ♿ Accessibility

### WCAG 2.1 Compliance

The application follows Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards:

#### 1. Semantic HTML

```html
<!-- Proper semantic structure -->
<main role="main">
  <section aria-labelledby="dashboard-title">
    <h1 id="dashboard-title">Dashboard</h1>
    <nav aria-label="Quick actions">
      <!-- Navigation items -->
    </nav>
  </section>
</main>
```

#### 2. ARIA Attributes

```tsx
// ARIA labels and descriptions
<button
  aria-label="Toggle password visibility"
  aria-expanded={showPassword}
  onClick={togglePasswordVisibility}
>
  {showPassword ? <EyeOff /> : <Eye />}
</button>
```

#### 3. Keyboard Navigation

```tsx
// Keyboard event handling
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleClick();
  }
};
```

#### 4. Focus Management

```tsx
// Focus management for modals and forms
useEffect(() => {
  if (isOpen) {
    const firstInput = modalRef.current?.querySelector("input");
    firstInput?.focus();
  }
}, [isOpen]);
```

#### 5. Screen Reader Support

```tsx
// Screen reader announcements
<div aria-live="polite" aria-atomic="true">
  {error && <span role="alert">{error}</span>}
</div>
```

### Color Contrast

All color combinations meet WCAG AA contrast requirements:

- **Normal text**: 4.5:1 contrast ratio
- **Large text**: 3:1 contrast ratio
- **UI components**: 3:1 contrast ratio

---

## 🚀 Development Workflow

### Getting Started

1. **Clone Repository**

   ```bash
   git clone https://github.com/your-org/lucidify-fe.git
   cd lucidify-fe
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example.txt .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Available Scripts

```json
{
  "dev": "next dev --turbopack", // Development server with Turbopack
  "build": "next build", // Production build
  "start": "next start", // Production server
  "lint": "next lint" // ESLint checking
}
```

### Development Tools

#### 1. TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 2. ESLint Configuration

```javascript
// eslint.config.mjs
export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      // ... other rules
    },
  },
];
```

### Code Organization

#### 1. File Naming Conventions

- **Components**: PascalCase (e.g., `FormInput.tsx`)
- **Pages**: kebab-case (e.g., `login-page.tsx`)
- **Utilities**: camelCase (e.g., `apiClient.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)

#### 2. Import Organization

```typescript
// 1. React imports
import React, { useState, useEffect } from "react";

// 2. Next.js imports
import Link from "next/link";
import { useRouter } from "next/navigation";

// 3. Third-party imports
import axios from "axios";
import { toast } from "react-hot-toast";

// 4. Local imports
import { useAuth } from "@/lib/auth-context";
import { FormInput } from "@/components/FormInput";
```

#### 3. Component Structure

```typescript
// Component Template
interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 1. State declarations
  const [state, setState] = useState();

  // 2. Effect hooks
  useEffect(() => {
    // Effect logic
  }, []);

  // 3. Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // 4. Render
  return <div>{/* JSX content */}</div>;
};

export default Component;
```

---

## 🚀 Deployment

### Production Build

1. **Build the Application**

   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

### Environment Variables

#### Development (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_SECRET=your-development-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Production

```env
NEXT_PUBLIC_API_URL=https://api.lucidify.com/api
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
```

### Deployment Platforms

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### 2. Netlify

```bash
# Build command
npm run build

# Publish directory
out
```

#### 3. AWS Amplify

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

### Performance Optimization

#### 1. Next.js Optimizations

- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: `npm run build` includes bundle analysis
- **Static Generation**: Pre-rendered pages where possible

#### 2. Custom Optimizations

```typescript
// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Errors

**Error**: `Module not found: Can't resolve '@/components/...'`

```bash
# Solution: Check tsconfig.json paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Error**: `'use client' directive required`

```typescript
// Solution: Add 'use client' to components using hooks
"use client";

import { useState } from "react";
```

#### 2. Runtime Errors

**Error**: `Cannot read property 'user' of null`

```typescript
// Solution: Add null checks
const { user } = useAuth();
if (!user) return <LoadingSpinner />;
```

**Error**: `ERR_CONNECTION_REFUSED`

```typescript
// Solution: Check API URL and backend status
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
```

#### 3. Authentication Issues

**Error**: `Invalid email or password` (when credentials are correct)

```typescript
// Solution: Check API response format
const response = await authApi.login(data);
// Handle both response formats
const user = response.user || response.data?.user;
const token = response.token || response.data?.token;
```

#### 4. Styling Issues

**Error**: Tailwind classes not working

```bash
# Solution: Check Tailwind config and restart dev server
npm run dev
```

**Error**: Custom CSS variables not applied

```css
/* Solution: Ensure CSS variables are defined in globals.css */
:root {
  --primary-sage: #7c9885;
}
```

### Debug Tools

#### 1. React Developer Tools

- Install browser extension
- Inspect component state and props
- Debug performance issues

#### 2. Next.js Debug Mode

```bash
# Enable debug mode
DEBUG=* npm run dev
```

#### 3. TypeScript Checking

```bash
# Run TypeScript check
npx tsc --noEmit
```

#### 4. ESLint Checking

```bash
# Run ESLint
npm run lint
```

### Performance Debugging

#### 1. Bundle Analysis

```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ for bundle analysis
```

#### 2. Lighthouse Audit

- Use Chrome DevTools Lighthouse
- Check Performance, Accessibility, Best Practices
- Optimize based on recommendations

#### 3. Network Monitoring

- Use Chrome DevTools Network tab
- Monitor API call performance
- Check for unnecessary requests

---

## 📚 Additional Resources

### Documentation Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)

### Best Practices

- [React Best Practices](https://react.dev/learn)
- [Next.js Best Practices](https://nextjs.org/docs/advanced-features/performance)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Accessibility Best Practices](https://www.w3.org/WAI/WCAG21/quickref/)

### Community Resources

- [Next.js GitHub](https://github.com/vercel/next.js)
- [React GitHub](https://github.com/facebook/react)
- [TypeScript GitHub](https://github.com/microsoft/TypeScript)

---

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow existing patterns and conventions
2. **TypeScript**: Use strict typing for all new code
3. **Testing**: Write tests for new features
4. **Documentation**: Update documentation for changes
5. **Accessibility**: Ensure WCAG compliance
6. **Performance**: Consider performance implications

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Components are accessible
- [ ] Performance is optimized
- [ ] Documentation is updated
- [ ] Tests pass (if applicable)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

For support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/your-org/lucidify-fe/issues)
- **Email**: support@lucidify.com
- **Documentation**: [docs.lucidify.com](https://docs.lucidify.com)

---

**Built with ❤️ for the mental health and well-being of young adults in Sri Lanka.**

---

_Last updated: January 2025_
_Version: 1.0.0_
