"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-soft-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-primary-sage" />
        </div>

        <h1 className="text-6xl font-light text-deep-forest mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-deep-forest mb-4">
          Page Not Found
        </h2>

        <p className="text-gentle-gray mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track with your emotional well-being journey.
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-sage text-white rounded-xl hover:bg-primary-sage/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-gentle-gray border border-primary-sage/20 rounded-xl hover:bg-primary-sage/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-8 text-sm text-gentle-gray">
          <p>Need help? Check out these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link
              href="/mood"
              className="text-primary-sage hover:text-primary-sage/80 transition-colors"
            >
              Mood Check-In
            </Link>
            <Link
              href="/journal"
              className="text-primary-sage hover:text-primary-sage/80 transition-colors"
            >
              Journal
            </Link>
            <Link
              href="/chat"
              className="text-primary-sage hover:text-primary-sage/80 transition-colors"
            >
              AI Companion
            </Link>
            <Link
              href="/session"
              className="text-primary-sage hover:text-primary-sage/80 transition-colors"
            >
              8-Minute Session
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
