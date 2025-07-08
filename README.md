# Lucidify - Frontend Authentication System

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4)](https://tailwindcss.com/)

An AI-driven mobile application designed to support the emotional well-being of young adults in Sri Lanka. This repository contains the Next.js frontend with a comprehensive authentication system featuring multilingual support, accessibility features, and security best practices.

## 🌟 Features

### Authentication System

- **Email/Password Authentication** - Secure login and signup
- **JWT Token Management** - Stateless authentication
- **Protected Routes** - Automatic redirection for unauthorized access
- **Form Validation** - Real-time client-side validation with Zod
- **Password Strength Indicator** - Visual feedback for password security

### Accessibility & Internationalization

- **Multilingual Support** - English, Sinhala (සිංහල), Tamil (தமிழ்)
- **WCAG 2.1 Compliant** - Screen reader compatible with ARIA attributes
- **Responsive Design** - Mobile-first approach for all devices
- **Low Bandwidth Optimized** - Minimal data usage for rural connectivity

### Security Features

- **Client-side Validation** - Input sanitization and validation
- **Secure Token Storage** - Best practices for JWT handling
- **HTTPS Enforcement** - Secure data transmission
- **Error Handling** - Graceful error states with user feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Backend API server (Express.js with MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/lucidify-fe.git
   cd lucidify-fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── FormInput.tsx    # Form input with validation
│   │   ├── LoadingSpinner.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── ProtectedRoute.tsx
│   ├── lib/                 # Utility libraries and configurations
│   │   ├── api.ts          # API client and authentication functions
│   │   ├── auth-context.tsx # Authentication context provider
│   │   ├── i18n.ts         # Internationalization utilities
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── validation.ts   # Zod validation schemas
│   ├── pages/              # Authentication pages
│   │   ├── loginPage/
│   │   └── signupPage/
│   ├── dashboard/          # Protected dashboard page
│   ├── globals.css         # Global styles and CSS variables
│   └── layout.tsx          # Root layout with providers
├── public/                 # Static assets
└── README.md
```

## 🔐 Authentication Flow

### User Registration

1. User fills signup form with email, password, and confirmation
2. Client-side validation using Zod schemas
3. Password strength indicator provides real-time feedback
4. API call to `/api/auth/register` endpoint
5. Success redirects to login page with confirmation message

### User Login

1. User enters email and password
2. Client-side validation
3. API call to `/api/auth/login` endpoint
4. JWT token stored in localStorage
5. Redirect to dashboard upon successful authentication

### Protected Routes

1. `ProtectedRoute` component checks authentication status
2. Unauthenticated users redirected to login page
3. Loading spinner shown during authentication checks
4. Context provides user data throughout the application

## 🌐 API Integration

### Backend Requirements

The frontend expects the following API endpoints:

#### Authentication Endpoints

**POST `/api/auth/register`**

```typescript
// Request Body
{
  email: string;
  password: string;
  confirmPassword: string;
}

// Response
{
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    createdAt: string;
  };
}
```

**POST `/api/auth/login`**

```typescript
// Request Body
{
  email: string;
  password: string;
}

// Response
{
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    createdAt: string;
  };
  token?: string;
}
```

**GET `/api/auth/verify`**

```typescript
// Headers
Authorization: Bearer <jwt_token>

// Response
{
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    createdAt: string;
  };
}
```

**POST `/api/auth/logout`**

```typescript
// Headers
Authorization: Bearer<jwt_token>;

// Response
{
  success: boolean;
  message: string;
}
```

### Error Handling

API responses should include appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `409` - Conflict (email already exists)
- `500` - Internal Server Error

## 🎨 UI Components

### FormInput Component

Reusable form input with validation, accessibility, and password toggle functionality.

```tsx
<FormInput
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email?.message}
  loading={isLoading}
  {...register("email")}
/>
```

### LanguageSelector Component

Dropdown for switching between supported languages.

### ProtectedRoute Component

Higher-order component for route protection.

```tsx
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>
```

## 🌍 Internationalization

### Supported Languages

- **English** (en) - Default
- **Sinhala** (si) - සිංහල
- **Tamil** (ta) - தமிழ்

### Adding Translations

1. Update `src/app/lib/i18n.ts`
2. Add translations to the `translations` object
3. Use `getTranslation(language, key)` in components

### Language Detection

- Checks localStorage for saved preference
- Falls back to browser language detection
- Defaults to English if unsupported language

## 🎯 Accessibility Features

### WCAG 2.1 Compliance

- Semantic HTML structure
- ARIA attributes for screen readers
- Keyboard navigation support
- Color contrast compliance
- Focus management

### Form Accessibility

- Proper label associations
- Error announcements with `aria-live`
- Loading state indicators
- Clear validation messages

## 📱 Mobile Optimization

### Responsive Design

- Mobile-first CSS approach
- Touch-friendly interface elements
- Optimized for small screens
- Fast loading on slow connections

### Low Bandwidth Features

- Minimal JavaScript bundles
- Optimized images and assets
- Efficient API calls
- Graceful offline handling

## 🛡️ Security Considerations

### Client-Side Security

- Input validation and sanitization
- XSS prevention
- CSRF protection
- Secure token storage best practices

### Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Set the following environment variables for production:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXTAUTH_SECRET=your-production-secret
```

### Recommended Hosting

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Railway

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Email: support@lucidify.com
- Documentation: [docs.lucidify.com](https://docs.lucidify.com)

## 🗺️ Roadmap

### Phase 1 (Current)

- ✅ Authentication system
- ✅ Multilingual support
- ✅ Responsive design

### Phase 2 (Planned)

- [ ] Mood check-in interface
- [ ] AI companion chat
- [ ] Digital journaling
- [ ] Offline mode

### Phase 3 (Future)

- [ ] Push notifications
- [ ] Data analytics
- [ ] Social features
- [ ] Professional support integration

---

**Built with ❤️ for the mental health and well-being of young adults in Sri Lanka.**
