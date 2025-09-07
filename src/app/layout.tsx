import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/auth-context";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
// import { BackendStatus } from "./components/BackendStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucidify - Your 8-Minute Companion for Emotional Well-Being",
  description:
    "An AI-driven mobile application designed to support the emotional well-being of young adults in Sri Lanka with mood check-ins, AI companion, and digital journaling.",
  keywords:
    "mental health, emotional well-being, AI companion, mood tracking, digital journal, Sri Lanka",
  authors: [{ name: "Lucidify Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>
            {/* <BackendStatus /> */}
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "var(--soft-white)",
                  color: "var(--deep-forest)",
                  border: "1px solid var(--primary-sage)",
                },
              }}
            />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
