"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LanguageSelector } from "../components/LanguageSelector";
import { useAuth } from "../lib/auth-context";
import { getTranslation } from "../lib/i18n";

export default function Dashboard() {
  const { user, logout, language } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/pages/loginPage");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Header */}
        <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">Lucidify</h1>
              </div>

              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">{user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    {getTranslation(language, "signOut")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome to your Dashboard
            </h2>
            <p className="text-gray-400">
              Your journey to emotional well-being starts here.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mood Check-In Card */}
            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/40 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">😊</span>
                </div>
                <h3 className="text-xl font-semibold text-white ml-4">
                  Mood Check-In
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Log your emotional state and track your well-being over time.
              </p>
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                Start Check-In
              </button>
            </div>

            {/* AI Companion Card */}
            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/40 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-white ml-4">
                  AI Companion
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Chat with your AI companion for emotional support and guidance.
              </p>
              <button className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200">
                Start Conversation
              </button>
            </div>

            {/* Journal Card */}
            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/40 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-white ml-4">
                  Digital Journal
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Write and reflect on your thoughts in your private journal.
              </p>
              <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
                Open Journal
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">
              Recent Activity
            </h3>
            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              <p className="text-gray-400 text-center py-8">
                No recent activity. Start your emotional well-being journey by
                using one of the features above.
              </p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
